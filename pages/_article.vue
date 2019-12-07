<template>
    <section class="section has-background-light">
        <div class="container is-widescreen">
            
            <h1 class="title has-text-centered">{{ metadata.title }}</h1>
            <p class="subtitle is-6 has-text-centered">
                <small>
                    par {{ metadata.author }}
                    -
                    <time :datetime="metadata.published_date">{{ metadata.published_date }}</time>
                </small>
            </p>

            <div class="box">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <span class="tag level-item" v-for="(tag, index) in tags" :key="index">
                                        {{ tag }}
                                    </span>
                                </div>
                                <div class="level-right">
                                    <a class="level-item" aria-label="like" :href="twitterShareUrl" target="_blank">
                                        <span class="icon is-small">
                                            <i class="fab fa-twitter" aria-hidden="true"></i>
                                        </span>
                                        &nbsp;Partager
                                    </a>
                                </div>
                            </nav>
                            <p>
                                {{ metadata.short_description }}
                            </p>
                            <hr class="divider" />

                            <div v-html="htmlContent" class="has-text-justified	"></div>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <span class="tag level-item" v-for="(tag, index) in tags" :key="index">
                                    {{ tag }}
                                </span>
                            </div>
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
            </div>
            
        </div>
  </section>
</template>

<script>
    export default {
        async asyncData({params}) {
            const fileContent = await import(`~/articles/${params.article}.md`);
            
            return {
                metadata: fileContent.attributes,
                htmlContent: fileContent.html
            };
        },
        computed: {
            tags: function () {
                return this.metadata.tags.split(',');
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