<template>
  <div class="price-range" @click="click">
    <span class="icon icon--dollar" :class="{active : price > 0}"></span>
    <span class="icon icon--dollar" :class="{active : price > 1}"></span>
    <span class="icon icon--dollar" :class="{active : price > 2}"></span>
    <span class="icon icon--dollar" :class="{active : price > 3}"></span>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>