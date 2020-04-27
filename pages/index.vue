<template>
  <ArticleList v-if="!isLoading" :articles="articles" />
    <div v-else>
      <span>Chargement des articles en cours...</span>
    </div>
</template>

<script>
  import ArticleList from '~/components/articleList.vue'

  export default {
    data () {
      return {
        isLoading: true
      }
    },
    async asyncData ({ params }) {
      let articles = [];
      let index = 0;

      const files = require.context('@/articles', true, /.*\.md$/);
      const articleFiles = files.keys();
      
      for (const articleFile of articleFiles) {
        let fileName = articleFile.substr(2, articleFile.length);

        const fileContent = await import(`~/articles/${fileName}`);
            
        articles.push({
            index: index++,
            title: fileContent.attributes.title,
            author: fileContent.attributes.author,
            author_link: fileContent.attributes.author_link,
            published_date: fileContent.attributes.published_date,
            description: fileContent.attributes.description,
            tags: fileContent.attributes.tags.split(','),
            file_name: fileName,
            route: `/${ fileName.substr(0, fileName.lastIndexOf('.')) }`
        });
      }

      return {
        articles: articles,
        isLoading: false
      }
    },
    components: {
      ArticleList
    }
  }
</script>
