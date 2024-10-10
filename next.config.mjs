/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true, // Игнорировать ошибки ESLint при сборке
    },
};

export default nextConfig;
