const withPWA = require('next-pwa')({
    dest: 'public',
})

module.exports = withPWA({
    typescript: {
        ignoreBuildErrors: true,
    },})

