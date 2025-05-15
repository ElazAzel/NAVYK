/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Удаляем неподдерживаемые опции
    // optimizeFonts и optimizeImages больше не используются
  }
}

module.exports = nextConfig