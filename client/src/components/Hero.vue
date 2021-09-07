<template>
  <div class="">
    <section class="slider-section">
      <div class="tp-banner-container">
        <div class="tp-banner">
          <div class="h-screen"
            style="background: url(images/home.jpg); background-repeat: no-repeat; background-size: cover; z-index: 9; max-width: auto; max-height: auto; white-space: nowrap;"
            data-bgrepeat="no-repeat" data-bgposition="center top" data-bgfit="cover">

            <div class="pt-40 mx-auto py-2 w-full text-center rounded-lg text-2xl text-aqua-800 bg-transparent">
              An investment in knowledge pays the best interest. -Benjamin Franklin-
            </div>

            <div @click="goToCourse"
              class="mt-10 h-16 mx-auto py-3 px-4 w-60 text-center align-middle rounded-lg text-2xl text-white bg-aqua-700 hover:bg-aqua-800">
              Start Learning
            </div>

            <!-- <div class="tp-caption slider_layer_02 text-center lft tp-resizeme" data-x="center" data-y="100"
                data-speed="1000" data-start="800" data-easing="Power3.easeInOut" data-splitin="none"
                data-splitout="none" data-elementdelay="0.1" data-endelementdelay="0.1" data-endspeed="1000"
                style="z-index: 9; max-width: auto; max-height: auto; white-space: nowrap;">An investment in knowledge
                pays the best interest. -Benjamin Franklin-
              </div>

              <div class="tp-caption text-center lft tp-resizeme" data-x="center" data-y="150" data-speed="1000"
                data-start="800" data-easing="Power3.easeInOut" data-splitin="none" data-splitout="none"
                data-elementdelay="0.1" data-endelementdelay="0.1" data-endspeed="1000"
                style="z-index: 9; max-width: auto; max-height: auto; white-space: nowrap;"><span href="#"
                  class="px-6 py-4 bg-aqua-800 text-2xl rounded-lg text-white hover:bg-aqua-700">Start Learning</span>
              </div> -->

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
    },
    methods: {
      goToCourse() {
        this.$router.push('/courses')
      },
    },
    created() {
    }
  }
</script>