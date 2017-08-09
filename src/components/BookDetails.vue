<template>
  <div class="bookDetails">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'bookDetail',
  data () {
    return {
      msg: 'Welcome to Book Details'
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
