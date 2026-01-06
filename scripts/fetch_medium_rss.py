import os
import sys
import json
import re
import requests
from supabase import create_client, Client
from logger import get_logger
from dotenv import load_dotenv

logger = get_logger(__name__)

# Load .env.local from the project root (one level up from this script)
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
env_local_path = os.path.join(project_root, ".env.local")
env_path = os.path.join(project_root, ".env")

if os.path.exists(env_local_path):
    load_dotenv(env_local_path)
    logger.info(f"Loaded environment from {env_local_path}")
elif os.path.exists(env_path):
    load_dotenv(env_path)
    logger.info(f"Loaded environment from {env_path}")
else:
    logger.warning("No .env or .env.local file found.")

IMG_REGEX = re.compile(r'<img[^>]+src="([^">]+)"')


def get_medium_thumbnail(description: str) -> str:
    """Extracts the first image source from the HTML description."""
    if not description:
        return ""
    match = IMG_REGEX.search(description)
    return match.group(1) if match else ""


def get_env_variable(key: str) -> str:
    """Helper to get env vars or raise error if missing."""
    value = os.environ.get(key)
    if not value:
        # Fallback to check if we are in a different dir structure relative to env file
        # But load_dotenv should handle it.
        raise ValueError(f"Missing required environment variable: {key}")
    return value


def fetch_and_store():
    try:
        supabase_url = get_env_variable("SUPABASE_URL")
        supabase_key = get_env_variable("SUPABASE_SERVICE_ROLE_KEY")
        medium_url = get_env_variable("MEDIUM_URL")

        supabase: Client = create_client(supabase_url, supabase_key)

        logger.info("Starting Medium RSS fetch...", url=medium_url)

        response = requests.get(medium_url, timeout=10)
        response.raise_for_status()

        try:
            raw_data = response.json()
        except json.JSONDecodeError:
            logger.error("Failed to decode JSON", response_text=response.text[:500])
            return

        items = raw_data.get("items", [])
        if not items:
            logger.warning("No items found in RSS feed.")
            return

        logger.info("Parsed JSON response...", items_count=len(items))

        feed_guids = [item.get("guid") for item in items if item.get("guid")]

        if not feed_guids:
            logger.warning("No valid GUIDs found in feed items.")
            return

        existing_response = (
            supabase.table("blog_posts")
            .select("guid")
            .in_("guid", feed_guids)
            .execute()
        )

        existing_guids = {row["guid"] for row in existing_response.data}

        new_posts_to_insert = []

        for item in items:
            guid = item.get("guid")
            if not guid or guid in existing_guids:
                continue

            new_posts_to_insert.append(
                {
                    "guid": guid,
                    "title": item.get("title"),
                    "post_link": item.get("link"),
                    "pub_date": item.get("pubDate"),
                    "thumbnail_url": get_medium_thumbnail(item.get("description", "")),
                    "description": item.get("description"),
                    "content": item.get("content"),
                    "categories": item.get("categories", []),
                    "is_visible": True,
                }
            )

        skipped_count = len(items) - len(new_posts_to_insert)

        if new_posts_to_insert:
            result = supabase.table("blog_posts").insert(new_posts_to_insert).execute()
            inserted_count = len(result.data) if result.data else 0
            logger.info(f"Batch insert complete. Added {inserted_count} new posts.")
        else:
            inserted_count = 0
            logger.info("No new posts to insert.")

        logger.info(
            "Sync complete.",
            inserted=inserted_count,
            skipped=skipped_count,
            total_processed=len(items),
        )

    except ValueError as ve:
        logger.error(str(ve))
        raise
    except requests.RequestException as re_err:
        logger.exception("HTTP Request failed", error=str(re_err))
        raise
    except Exception as e:
        logger.exception("Unexpected error during sync", error=str(e))
        raise


if __name__ == "__main__":
    try:
        fetch_and_store()
    except Exception:
        sys.exit(1)
