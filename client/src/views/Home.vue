<template>
  <div class="">
    <Header></Header>
    <Hero></Hero>

    <section class="grey section">
      <div class="container ">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title text-center">
              <h4>Available Courses</h4>
              <p>Temukan jalan ninjamu</p>
            </div>
          </div>
        </div>

        <Card></Card>

        <div class="flex justify-center">
          <button @click="goToCourse" class="mt-28 w-96 h-16 btn btn-default"><i class="mdi mdi-login"></i> Find much
            more
            ...</button>
        </div>


      </div>
    </section>

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
      goToCourse() {
        this.$router.push('/courses')
      },
    },
    created() {
      this.$store.dispatch('getProduct', { limit: 8 })
    }
  }
</script>