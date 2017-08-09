import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Hello from '@/components/Hello'
import Category from '@/components/Category'
import ShoppingCart from '@/components/ShoppingCart'
import Me from '@/components/Me'
import BookDetails from '@/components/BookDetails'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'hello',
          name: 'Hello',
          component: Hello
        }, {
          path: 'categories',
          name: 'Category',
          component: Category
        }, {
          path: 'shoppingCart',
          name: 'ShoppingCart',
          component: ShoppingCart
        }, {
          path: 'me',
          name: 'Me',
          component: Me
        }
      ]
    }, {
      path: '/books/:id',
      name: 'BookDetails',
      component: BookDetails
    }
  ]
})
