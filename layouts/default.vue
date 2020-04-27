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
    data () {
      return {
        bodyBackgroundColor: process.env.BODY_BACKGROUND_COLOR
      }
    },
    components: {
      Navbar,
      Footer
    },
    beforeCreate () {
      if (process.client) {
        document.body.style = `${this.bodyBackgroundColor} !important`;
      }
    }
  }
</script>

<style>
  body {
    min-height: 100vh;
  }
</style>
