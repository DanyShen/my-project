<template>
  <div class="shoppingCart">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'shoppingCart',
  data () {
    return {
      msg: 'Welcome to ShoppingCart'
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
