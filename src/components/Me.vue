<template>
  <div class="me">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'me',
  data () {
    return {
      msg: 'Welcome to Me Area'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
