import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*storyblok.com',
                port: '',
            },
        ],
    },
};

module.exports = nextConfig;
