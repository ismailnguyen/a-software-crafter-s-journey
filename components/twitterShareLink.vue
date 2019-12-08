<template>
    <a class="level-item" aria-label="like" :href="twitterShareUrl" target="_blank">
        <span class="icon is-small">
            <i class="fab fa-twitter" aria-hidden="true"></i>
        </span>
        &nbsp;
        <span v-if="showLabel">
            {{ shareLabel }}
        </span>
    </a>
</template>

<script>
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
                    return window.location.origin + '/' + this.articleFileNameWithoutExtension;

                return this.article.file_name;
            },
            articleFileNameWithoutExtension: function () {
                return this.article.file_name.substr(0, this.article.file_name.lastIndexOf('.'));
            },
            twitterShareUrl: function () {
                return 'https://twitter.com/intent/tweet' +
                        `?text=${ this.article.title }` +
                        `&url=${ this.articleUrl }` +
                        `&hashtags=${ this.article.tags }` +
                        '&via=LeLion_Vert';
            }
        }
    }
</script>