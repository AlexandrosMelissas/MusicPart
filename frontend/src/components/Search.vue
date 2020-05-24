<template>
  <div class="search_container">
      <input v-model="name" class="search_input" @keyup="search" type="text" placeholder="Search by name">
  </div>
</template>

<script>
export default {
  data() {
    return {
      name : ''
      }
  },
  methods : {
    search() {
      this.$store.dispatch('GET_PROFILES',this.name)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../scss/components/search";

</style>