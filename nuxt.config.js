export default {
    env: {
        apikey: process.env.VUE_APP_YTAPI,
    },
    plugins: ['@/plugins/bootstrap-vue', ],
    css: [
        '~/assets/css/main.css'
    ]
}