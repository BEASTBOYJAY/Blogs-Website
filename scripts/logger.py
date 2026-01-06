"""Structured logging configuration."""

import structlog
import logging
import sys


def get_logger(name: str = None) -> structlog.BoundLogger:
    """Get a structured logger instance."""

    # Configure structlog
    if not structlog.is_configured():
        structlog.configure(
            processors=[
                structlog.contextvars.merge_contextvars,
                structlog.processors.add_log_level,
                structlog.processors.TimeStamper(fmt="iso"),
                structlog.processors.JSONRenderer(),
            ],
            logger_factory=structlog.PrintLoggerFactory(),
            cache_logger_on_first_use=True,
        )
    return structlog.get_logger(name)
