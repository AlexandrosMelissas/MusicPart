<template>
  <div v-if="getError" class="error">
      <p class="error_message">{{getError}}</p>
  </div>
</template>

<script>
export default {

    computed : {
        getError() {
            return this.$store.getters.getError
        }
    },
    beforeDestroy() {
        this.$store.commit('setError','')
    }
   
}
</script>

<style>

</style>