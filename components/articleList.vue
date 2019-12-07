<template>
  <section class="section has-background-light">
    <div class="container">

      <h1 class="title">Derniers articles</h1>

      <div class="columns is-centered" v-for="(article, i) in articles" :key="i" v-if="i % 2 == 0">
        <div class="column" >
          <Article :articleData="article" />
        </div>
        <div class="column" v-if="articles[i+1]">
          <Article :articleData="articles[i+1]" />
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import Article from '~/components/articleCard.vue'

  export default {
    components: {
      Article
    },
    data () {
      return {
        articles: []
      }
    },
    mounted: function () {
      this.fetchArticles()
           .then(fetchedArticles => this.articles = fetchedArticles);
    },
    methods: {
      fetchArticles: async function () {
        const articleFiles = require.context(
          '@/articles',
          true,
          /^.*\.md$/
        );

        let articles = [];

        articleFiles.keys().forEach(articleFile => {
          let fileName = articleFile.substr(2, articleFile.length);

          this.fetchArticle(fileName)
              .then(article => articles.push(article));
        });
        
        return articles;
      },
      fetchArticle: async function (fileName) {
          const fileContent = await import(`~/articles/${fileName}`);
            
          return {
              title: fileContent.attributes.title,
              author: fileContent.attributes.author,
              published_date: fileContent.attributes.published_date,
              short_description: fileContent.attributes.short_description,
              tags: fileContent.attributes.tags.split(','),
              file_name: fileName
          };
      }
    }
  }
</script>
