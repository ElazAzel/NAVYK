/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Удаляем неподдерживаемые опции
    // optimizeFonts и optimizeImages больше не используются
  },
  async redirects() {
    return [
      { source: '/students/:path*', destination: '/student/:path*', permanent: true },
      { source: '/employers/:path*', destination: '/employer/:path*', permanent: true },
      { source: '/universities/:path*', destination: '/university/:path*', permanent: true },
      { source: '/mentors/:path*', destination: '/mentor/:path*', permanent: true },
    ]
  },
}

module.exports = nextConfig