<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
    },
    created() {
      if (!localStorage.access_token) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
</style>