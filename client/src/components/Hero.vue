<template>
  <div class="">
    <section class="slider-section">
      <div class="tp-banner-container">
        <div class="tp-banner">
          <div class="h-screen"
            style="background: url(images/home.jpg); background-repeat: no-repeat; background-size: cover; z-index: 9; max-width: auto; max-height: auto; white-space: nowrap;"
            data-bgrepeat="no-repeat" data-bgposition="center top" data-bgfit="cover">

            <div class="pt-40  break-words mx-auto py-2 text-center rounded-lg text-xl text-white bg-transparent">
              {{quote.text}} - {{quote.author}}
              <!-- An investment in knowledge pays the best interest. -Benjamin Franklin- -->
            </div>

            <div @click="goToCourse"
              class="mt-10 h-16 mx-auto py-3 px-4 w-60 text-center align-middle rounded-lg text-2xl text-white bg-aqua-700 hover:bg-aqua-800">
              Start Learning
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Hero',
    components: {},
    data() {
      return {
      }
    },
    computed: {
      quote() {
        //console.log(this.$store.state.quote.text.length);
        // while (this.$store.state.quote.text.length > 100) {
        //   this.$store.dispatch('getQuote')
        // }
        return this.$store.state.quote
      },
    },
    methods: {
      goToCourse() {
        this.$router.push('/courses')
      },
    },
    created() {
      this.$store.dispatch('getQuote')
    }
  }
</script>