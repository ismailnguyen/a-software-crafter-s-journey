<template>
  <section class="section has-background-light">
    <div class="container">

      <h1 class="title">{{ lastArticlesTitle }}</h1>

      <div class="columns is-centered" v-for="(article, i) in articles" :key="i" v-if="i % 2 == 0">
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
        lastArticlesTitle: 'Derniers articles'
      }
    },
  }
</script>
