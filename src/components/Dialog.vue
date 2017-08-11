<template>
  <div class="dialog-wrapper" :class="{'open': isOpen}">
    <div class="overlay" @click="close"></div>
    <div>
      <div class="heading">
        <slot name="header"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isOpen: false
    }
  },
  methods: {
    open: function () {
      if (!this.isOpen) {
        this.$emit('dialogOpen')
      }
      this.isOpen = true
    },
    close: function () {
      if (this.isOpen) {
        this.$emit('dialogClose')
      }
      this.isOpen = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.dialog-wrapper {
  height: 100%;
  display: none;

  &.open {
    display: block;
  }
  
  & > .overlay {
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
    position: absolute;
    left: 0px;
    top: 0;
    right: 0;
    bottom: 0;
  }

  & > .dialog {
    z-index: 10;
    background: #fff;
    position: fixed;
    top: 24px;
    left: 24px;
    right: 24px;
    bottom: 24px;
    padding: 24px 14px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .8);
    & heading {
      padding: 12px;
    }
  }
}
</style>
