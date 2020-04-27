<template>
  <div class="main">
    <Navbar />
    <nuxt/>
    <Footer />
  </div>
</template>

<script>
  import Navbar from '~/components/navbar.vue'
  import Footer from '~/components/footer.vue'

  export default {
    components: {
      Navbar,
      Footer
    },
    beforeCreate () {
      if (process.client) {
        document.body.style = `background-color: ${ process.env.bodyBackgroundColor };`;
      }
    }
  }
</script>

<style>
  body {
    min-height: 100vh;
  }
</style>
