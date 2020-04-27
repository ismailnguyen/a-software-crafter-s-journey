<template>
    <client-only>
        <a v-if="article" class="box">
            <article class="media">
                <nuxt-link class="media-content has-text-dark" :to="article.route">
                    <div class="content">
                        <p class="title is-4">{{ article.title }}</p>

                        <p class="subtitle is-6">
                            <small>
                                {{ publishedByLabel }} {{ article.author }}
                                -
                                <time :datetime="article.published_date">{{ publishedDate }}</time>
                            </small>
                        </p>

                        <p>
                            {{ article.description }}
                        </p>
                    </div>

                    <nav class="level is-mobile">
                        <div class="level-left">
                            <Tags :article="article" />
                        </div>
                    </nav>
                </nuxt-link>

                <div class="media-right">
                    <LinkedinShareLink :article="article" :showLabel="false" />
                    <TwitterShareLink :article="article" :showLabel="false" />
                </div>
            </article>
        </a>
    </client-only>
</template>

<script>
    import TwitterShareLink from '~/components/twitterShareLink.vue'
    import LinkedinShareLink from '~/components/linkedinShareLink.vue'
    import Tags from '~/components/tags.vue'

    export default {
        props: ['article'],
        components: {
            LinkedinShareLink,
            TwitterShareLink,
            Tags
        },
        data () {
            return {
                publishedByLabel: 'par '
            }
        },
        mounted: function () {
            if (this.articleData != null)
                this.article = this.articleData;
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