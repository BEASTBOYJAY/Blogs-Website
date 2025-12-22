/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "reactbits.dev",
            },
            {
                protocol: "https",
                hostname: "cdn-images-1.medium.com",
            },
        ],
    },
};

export default nextConfig;
