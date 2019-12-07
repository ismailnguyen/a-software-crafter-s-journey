<template>
    <a class="box" :href="articleUrl">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <p class="title is-4">{{ article.title }}</p>
                    <p class="subtitle is-6">
                        <small>
                            par {{ article.author }}
                            -
                            <time :datetime="article.published_date">{{ article.published_date }}</time>
                        </small>
                    </p>
                    <p>
                        {{ article.short_description }}
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <span class="tag level-item" v-for="(tag, index) in article.tags" :key="index">
                            {{ tag }}
                        </span>
                    </div>
                </nav>
                <nav class="level is-mobile">
                    <div class="level-right">
                        <a class="level-item" aria-label="like" :href="twitterShareUrl" target="_blank">
                            <span class="icon is-small">
                                <i class="fab fa-twitter" aria-hidden="true"></i>
                            </span>
                            &nbsp;Partager
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </a>
</template>

<script>
    export default {
        props: ['articleData'],
        data () {
            return {
                article: {
                    title: '',
                    author: '',
                    published_date: '',
                    short_description: '',
                    tags: [],
                    file_name: ''
                }
            }
        },
        mounted: function () {
            if (this.articleData != null)
                this.article = this.articleData;
        },
        computed: {
            articleUrl: function () {
                return `/${ this.article.file_name.substr(0, this.article.file_name.lastIndexOf('.')) }`;
            },
            twitterShareUrl: function () {
                return 'https://twitter.com/intent/tweet' +
                        '?original_referer=https%3A%2F%2Fwww.arolla.fr%2Fblog%2F' +
                        '&ref_src=twsrc%5Etfw' +
                        '&text=Passer%20%C3%A0%20la%20vitesse%20sup%C3%A9rieure%20gr%C3%A2ce%20%C3%A0%20la%20programmation%20r%C3%A9active' +
                        '&tw_p=tweetbutton' +
                        '&url=https%3A%2F%2Fwww.arolla.fr%2Fblog%2F2019%2F11%2Fpasser-a-vitesse-superieure-grace-a-programmation-reactive%2F' +
                        '&via=ArollaFr';
            }
        }
    }
</script>