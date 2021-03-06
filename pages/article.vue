<template>
    <section v-if="article" class="section" :style="`background-color: ${ backgroundColor }`">
        <div class="container is-widescreen">
            
            <nuxt-link to="/" class="button is-danger is-light is-hidden-touch">{{ goBackLabel }}</nuxt-link>
            
            <h1 class="title has-text-centered">{{ article.title }}</h1>

            <p class="subtitle is-6 has-text-centered">
                <small>
                    {{ publishedByLabel }} <a v-if="article.author_link" :href="article.author_link" target="_blank" rel="noopener">{{ article.author }}</a> <span v-else>{{ article.author }}</span>
                    -
                    <time :datetime="article.published_date">{{ publishedDate }}</time>
                </small>
            </p>

            <div class="box">
                <article class="media">
                    <div class="media-content">
                        <client-only>
                            <div class="content">
                                <nav class="level is-mobile">
                                    <div class="level-left">
                                        <Tags :article="article" />
                                    </div>
                                    <div class="level-right">
                                        <TwitterShareLink :article="article" :showLabel="false" />
                                        <LinkedinShareLink :article="article" :showLabel="false" />
                                    </div>
                                </nav>

                                <p>
                                    {{ article.description }}
                                </p>

                                <hr class="divider" />

                                <div v-html="article.content" class="has-text-justified"></div>
                            </div>
                            
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <Tags :article="article" />
                                </div>
                                <div class="level-right">
                                    <TwitterShareLink :article="article" :showLabel="false" />
                                    <LinkedinShareLink :article="article" :showLabel="false" />
                                </div>
                            </nav>
                        </client-only>
                    </div>
                </article>
            </div>
            
        </div>
    </section>

    <section v-else class="hero is-large has-background-light">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">
                    404
                </h1>
                <h2 class="subtitle">
                    Oups, l'article demand&eacute; n'existe pas !
                </h2>
                <h3>
                    <nuxt-link to="/">
                        Retour &agrave; l'accueil
                    </nuxt-link>
                </h3>
            </div>
        </div>
    </section>
</template>

<script>
    import TwitterShareLink from '~/components/twitterShareLink.vue'
    import LinkedinShareLink from '~/components/linkedinShareLink.vue'
    import Tags from '~/components/tags.vue'

    export default {
        components: {
            LinkedinShareLink,
            TwitterShareLink,
            Tags
        },
        async asyncData({ route }) {
            try {  
                const fileName = `${ route.path }.md`;
                const fileContent = await import(`~/articles${ fileName }`);
                        
                return {
                    article: {
                        title: fileContent.attributes.title,
                        author: fileContent.attributes.author,
                        author_link: fileContent.attributes.author_link,
                        published_date: fileContent.attributes.published_date,
                        description: fileContent.attributes.description,
                        tags: fileContent.attributes.tags.split(','),
                        file_name: fileName,
                        content: fileContent.html,
                        route: route.path
                    }
                };
            } catch (err) {
                return {
                    article: null
                };
            }
        },
        data () {
            return {
                goBackLabel: 'Retour aux articles',
                publishedByLabel: 'par ',
                backgroundColor: process.env.bodyBackgroundColor
            }
        },
        head () {
            return {
                title: `${ this.article ? this.article.title : 'Erreur 404' } - ${ process.env.siteName }`,
            }
        },
        computed: {
            publishedDate: function () {
                return new Date(this.article.published_date).toDateString();
            }
        }
    }
</script>

<style scoped>
    .media-right {
        display: flex;
    }

    .media-right > * {
        padding-left: 10px;
    }

    .level-item {
        align-items: flex-start;
    }

    .level-left {
        display: contents !important;
    }
</style>
