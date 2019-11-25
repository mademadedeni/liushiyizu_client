const pkg = require('./package');
const isDev = process.env.NODE_ENV == "development" || process.env.NODE_ENV == undefined;

module.exports = {
    mode: 'universal',
    env: {
        baseUrl: isDev ? 'http://localhost:3000' : 'http://www.liushiyizu.top',
        apiUrl: isDev ? 'http://localhost:4000' : 'http://www.liushiyizu.top',
    },
    server: isDev ? undefined : {
        port: 8686,
        host: 'localhost',
    },

    router: {
        middleware: 'checkEnv'
    },

    /*
    ** Headers of the page
    */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /*
    ** Global CSS
    */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'assets/css/common.css',
        'assets/css/main.css',
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/element-ui',
        { src: '~/plugins/ckeditor', ssr: false }
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
    ],

    /*
    ** Build configuration
    */
    build: {
        transpile: [/^element-ui/],

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
}
