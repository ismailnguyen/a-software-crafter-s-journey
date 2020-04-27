import glob from 'glob'
import environmentConfiguration from './config'

let files = glob.sync('**/*.md', { cwd: 'articles' })
files = files.map(file => file.substr(0, file.lastIndexOf('.')))

module.exports = {
  /*
  * Configuration
  */
  env: environmentConfiguration,
  /*
  ** Headers of the page
  */
  head: {
    title: `${environmentConfiguration.siteName} - ${environmentConfiguration.companyName}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,minimal-ui' },
      { hid: 'description', name: 'description', content: process.env.SITE_DESCRIPTION || "A Software Crafter's Journey" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: environmentConfiguration.progressBarColor },
  generate: {
    routes: files
  },
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/article.vue')
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      
      const hljs = require('highlight.js');
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          markdownIt: {
            langPrefix: 'language-',
            highlight: function (str, lang) {
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(lang, str).value;
                } catch (__) {}
              }
              return '';
            }
          }
        }
      })
    }
  },
  css: ['./vendor/hljs-syntax.css'],
  modules: [
      '@nuxtjs/bulma',
      '@nuxtjs/sitemap'
  ],
  sitemap: {
      hostname: environmentConfiguration.siteUrl
  }
}

