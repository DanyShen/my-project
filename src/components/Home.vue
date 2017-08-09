<template>
  <div class="home">
    <div class="tabs">
      <ul>
        <router-link :to="{name: 'Hello'}" tag="li">
          <span>Home</span>
        </router-link>
        <router-link :to="{name: 'Category'}" tag="li">
          <span>Categories</span>
        </router-link>
        <router-link :to="{name: 'ShoppingCart'}" tag="li">
          <span>Shopping Cart</span>
        </router-link>
        <router-link :to="{name: 'Me'}" tag="li">
          <span>Me Area</span>
        </router-link>
      </ul>
    </div>
    <div class="content">
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home {
  .tabs {
    text-align: left;

    .router-link-exact-active {
      color: #42b983;
    }

    ul {
      list-style-type: none;

      li {
        cursor: pointer;
        display: inline-block;
        margin: 0 0.25rem;

        span:hover {
          border-bottom: 2px solid #42b983;
        }
      }
    }
  }

  .content {
    padding: 0 3rem;

    .slide-fade {
      &-enter-active {
        transition: all .3s ease;
      }

      &-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }

      &-enter,
      &-leave-active {
        transform: translateX(-430px);
        opacity: 0;
      }
    }
  }
}
</style>
