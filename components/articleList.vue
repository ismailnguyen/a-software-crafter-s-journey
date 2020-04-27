<template>
  <section class="section" :style="`background-color: ${ backgroundColor } !important;`">
    <div class="container">

      <h1 class="title">{{ lastArticlesTitle }}</h1>

      <div class="columns is-centered" v-for="(article, i) in sortedArticles" :key="i" v-if="i % 2 == 0">
        <div class="column">
          <Article :article="article" />
        </div>
        <div class="column" v-if="articles[i+1]">
          <Article :article="articles[i+1]" />
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import Article from '~/components/articleCard.vue'

  export default {
    props: ['articles'],
    components: {
      Article
    },
    data () {
      return {
        lastArticlesTitle: 'Derniers articles',
        backgroundColor: process.env.bodyBackgroundColor
      }
    },
    computed: {
      sortedArticles: function () {
        return this.articles.slice().sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
      }
    }
  }
</script>
