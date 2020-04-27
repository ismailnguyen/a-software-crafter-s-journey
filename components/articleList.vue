<template>
  <section class="section" :style="`background-color: ${ backgroundColor };`">
    <div class="container">

      <div class="columns">
        <div class="column">
          <h1 class="title">{{ lastArticlesTitle }}</h1>
        </div>
        <div class="column is-narrow">
          <div class="field has-addons">
            <div class="control has-icons-left">
              <input class="input is-rounded" type="text" placeholder="Rechercher ..." v-model="searchQuery">
                <span class="icon is-small is-left">
                  <fa :icon="fas.faSearch"/>
                </span>
              </div>
            </div>
        </div>
      </div>

      <div class="columns is-mobile is-multiline is-centered">
        <div class="column is-half-desktop is-half-tablet is-full-mobile" v-for="(article, i) in sortedArticles" :key="i">
          <Article :article="article" />
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import { fas } from '@fortawesome/free-solid-svg-icons'
  import Article from '~/components/articleCard.vue'

  export default {
    props: ['articles'],
    components: {
      Article
    },
    data () {
      return {
        lastArticlesTitle: 'Derniers articles',
        backgroundColor: process.env.bodyBackgroundColor,
        searchQuery: ''
      }
    },
    methods: {
      isPublished: function (article) {
        const today = new Date();
        return new Date(article.published_date) <= today;
      },

      onlyPastArticles: function (articles) {
        return articles.filter(article => this.isPublished(article));
      },

      sortByNewest: function (articles) {
        return articles.slice().sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
      },

      filterBySearch: function (articles) {
        if (!this.searchQuery)
          return articles;

        const lowerCaseQuery = this.searchQuery.toLowerCase();

        return articles.filter(article => 
          (article.tags.length && article.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)))
          || (article.title && article.title.toLowerCase().includes(lowerCaseQuery))
          || (article.description && article.description.toLowerCase().includes(lowerCaseQuery))
        );
      }
    },
    computed: {
      sortedArticles: function () {
        return this.filterBySearch(
            this.sortByNewest(
              this.onlyPastArticles(
                this.articles
            )
          )
        );
      },
      fas: function () {
         return fas
      }
    }
  }
</script>
