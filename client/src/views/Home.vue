<template>
  <div class="">
    <Header></Header>
    <Hero></Hero>
    <Card></Card>
    <Testimonial></Testimonial>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "@/components/Header.vue"
  import Footer from "@/components/Footer.vue"
  import Hero from "@/components/Hero.vue"
  import Card from "@/components/Card.vue"
  import Testimonial from "@/components/Testimonial.vue"

  export default {
    name: 'Home',
    components: { Header, Footer, Hero, Card, Testimonial },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    created() {

    }
  }
</script>