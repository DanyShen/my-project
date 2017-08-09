<template>
  <div class="book-list">
    <div class="header">
      <span class="heading">{{ heading }}</span>
      <span class="more">More...</span>
    </div>
    <div class="book-items">
      <!-- <div class="book" v-for="book in books" @click="greet($event, book)"> -->
      <div class="book" v-for="book in books" @click="$emit('onBookSelect', book, 'test')">
        <!-- <div class="cover">
          <img :src="book.img_url" />
        </div> -->
        <div class="title">{{ book.title }}</div>
        <div class="authors">{{ book.authors | join }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['heading', 'books'],
  filters: {
    join (args) {
      return args.join(',')
    }
  },
  methods: {
    // greet: function (event, book) {
    //   if (event) {
    //     alert(book.title + ' is clicked!')
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header {
    span {
      margin-right: 1rem;
    }

    .heading {
      font-weight: bold;
    }
  }

  .book-items {
    .book {
      margin: 0.5rem 0;
    }
  }
</style>
