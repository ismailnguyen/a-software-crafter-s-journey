<template>
    <a class="level-item" aria-label="like" :href="linkedinShareUrl" target="_blank">
        <span class="icon is-small">
            <fa :icon="faLinkedinIn" />
        </span>
        &nbsp;
        <span v-if="showLabel">
            {{ shareLabel }}
        </span>
    </a>
</template>

<script>
    import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

    export default {
        props: {
            article: { type: Object}, 
            showLabel: { type: Boolean, default: true }
        },
        data () {
            return {
                shareLabel: 'Partager'
            }
        },
        computed: {
            articleUrl: function () {
                if (process.browser)
                    return `${ window.location.origin }${ this.article.route }`;

                return this.article.route;
            },
            linkedinShareUrl: function () {
                return 'https://www.linkedin.com/shareArticle?mini=false' +
                        `&url=${ encodeURIComponent(this.articleUrl) }` +
                        `&title=${ encodeURIComponent(this.article.title) }` +
                        `&summary=${ encodeURIComponent(this.article.tags) }` +
                        `&source=${ encodeURIComponent(process.env.siteUrl) }`;
            },
            faLinkedinIn: function() {
                return faLinkedinIn
            }
        }
    }
</script>