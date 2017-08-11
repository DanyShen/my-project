<template>
  <!-- <div class="hello">
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div> -->
  <div class="hello">
    <div class="section">
      <book-list :books="latestUpdated" heading="Latest Updated" @onBookSelect="preview"></book-list>
    </div>
    <div class="section">
      <book-list :books="recommended" heading="Recommended" @onBookSelect="preview"></book-list>
    </div>
    <modal-dialog ref="dialog">
      <div slot="header"><span>test heading</span></div>
      <span>
        <div v-if="selected">
          <h2>{{ selected.title }}</h2>
        </div>
      </span>
      <span>test</span>
    </modal-dialog>
  </div>
</template>

<script>
import BookList from '@/components/BookList'
import ModalDialog from '@/components/Dialog'
import faker from '../util/faker'

export default {
  name: 'hello',
  data () {
    return {
      latestUpdated: [],
      recommended: [],
      selected: undefined
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    var booklist = faker.getBookListData()

    this.latestUpdated = booklist.latestUpdated
    this.recommended = booklist.recommended
    // var self = this
    // this.$http.get('apiurl').then(function (result) {
    //   self.latestUpdated = result.latestUpdated
    //   self.recommended = result.recommended
    // })
  },
  components: {
    'book-list': BookList,
    'modal-dialog': ModalDialog
  },
  methods: {
    preview: function (book, arg, event) {
      console.log(arg)
      // if (!event) {
      //   alert(book.title)
      // }
      this.selected = book
      this.$refs.dialog.open()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  /*text-align: center;*/

  .section {
    margin-bottom: 1rem;
  }
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
