<template>
    <section class="section has-background-light">
        <div class="container is-widescreen">
            
            <h1 class="title has-text-centered">{{ article.title }}</h1>

            <p class="subtitle is-6 has-text-centered">
                <small>
                    par {{ article.author }}
                    -
                    <time :datetime="article.published_date">{{ article.published_date }}</time>
                </small>
            </p>

            <div class="box">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <nav class="level is-mobile">
                                <div class="level-left">
                                    <Tags :article="article" />
                                </div>
                                <div class="level-right">
                                    <TwitterShareLink :article="article" />
                                </div>
                            </nav>

                            <p>
                                {{ article.description }}
                            </p>

                            <hr class="divider" />

                            <div v-html="article.content" class="has-text-justified	"></div>
                        </div>
                        
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <Tags :article="article" />
                            </div>
                            <div class="level-right">
                                <TwitterShareLink :article="article" />
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
            
        </div>
  </section>
</template>

<script>
    import TwitterShareLink from '~/components/twitterShareLink.vue'
    import Tags from '~/components/tags.vue'

    export default {
        components: {
            TwitterShareLink,
            Tags
        },
        async asyncData({params}) {
            const fileName = `${params.article}.md`;
            const fileContent = await import(`~/articles/${fileName}`);
            
            return {
                article: {
                    title: fileContent.attributes.title,
                    author: fileContent.attributes.author,
                    published_date: fileContent.attributes.published_date,
                    description: fileContent.attributes.description,
                    tags: fileContent.attributes.tags.split(','),
                    file_name: fileName,
                    content: fileContent.html
                }
            };
        }
    }
</script>