<template>
<div class="pagination--container">
  <div class="pagination">
    <div class="pagination--item" :class="{disabled : currentPage === 1 || !currentPage}" @click="changePage(1)">first</div>

    <div class="pagination--item" :class="{disabled : currentPage === 1 || !currentPage}" @click="changePage(currentPage - 1)">prev</div>
    
    <div class="pagination--item" :class="{active : currentPage === page}" v-for="page in pages" :key="page" @click="changePage(page)">{{page}}</div>

     <div class="pagination--item" v-if="showDots">...</div>

    <div class="pagination--item" :class="{disabled : currentPage + 1 > numberOfPages}" @click="changePage(currentPage + 1)">next</div>

    <div class="pagination--item" :class="{disabled : currentPage === numberOfPages}" @click="changePage(numberOfPages)">last</div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    numberOfPages: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pages() {
      let pages = []
      for(let p = 0; p < 4; p++) {
        if (this.currentPage + p <= this.numberOfPages) {
          pages.push(this.currentPage + p)
        }
      }
      return pages
    },
    showDots() {
      return this.pages[this.pages.length - 1] !== this.numberOfPages
    }
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    }
  }
}
</script>