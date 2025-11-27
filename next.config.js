/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Disable features not supported in static export
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
