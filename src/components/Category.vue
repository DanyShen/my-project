<template>
  <div class="category">
    <h1>{{ msg }}</h1>
    <div class="testContent">
      <input type="search" v-model="terms" class="search-box" placeholder="please input" />
    </div>
    <div>{{ terms }}</div>
  </div>
</template>

<script>
export default {
  name: 'category',
  data () {
    return {
      msg: 'Welcome to Category',
      terms: ''
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
