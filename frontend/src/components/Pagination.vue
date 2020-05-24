<template>
  <div class="pagination_row">
      <button :disabled="getSkip==0" class="pagination_button"  @click="getPrevious">Previous</button>
      <span v-for="(item,index) in getTotalPages" :key="index" >
         <button @click="getPage(index + 1)" :class="['pagination_button', getCurrentPage == index + 1? 'active' : '']">{{index + 1}}</button> 
      </span>   
      <button :disabled="getCurrentPage >= getTotalPages"  class="pagination_button" @click="getNext">Next</button>
  </div>
</template>

<script>
export default {
computed : {
    getTotalPages() {
        return this.$store.getters.getTotalPages
    },
    getSkip() {
       return this.$store.getters.getSkip
    },
    getCurrentPage() {
         return this.$store.getters.getCurrentPage
    }
  },
    methods : {
        getPage(page) {
            this.$store.commit('setCurrentPage',page)
            this.$router.push({path: this.$route.path, query: {
                page
            }})
            let skip = 9 * page - 9
            this.$store.commit('setSkip',skip)
            this.$store.dispatch('GET_COMMENTS',this.$route.params.id)

        },
        getNext() {
            this.$store.commit('setCurrentPage',this.getCurrentPage + 1)
            this.$router.push({path: this.$route.path, query: {
                page : Number(this.getCurrentPage)
            }})
            console.log(this.getCurrentPage)
            this.$store.commit('setSkip',this.$store.getters.getSkip + 9)
            this.$store.dispatch('GET_COMMENTS',this.$route.params.id)
        },
        getPrevious() {
            this.$store.commit('setCurrentPage',this.getCurrentPage - 1)
             this.$router.push({path: this.$route.path, query: {
                page : Number(this.getCurrentPage)
            }})
            this.$store.commit('setSkip',this.$store.getters.getSkip - 9)
            this.$store.dispatch('GET_COMMENTS',this.$route.params.id)

        }
    },
    created() {
        this.$store.commit('setCurrentPage',this.$route.query.page || 1)
        this.$store.commit('setSkip', Number(this.$route.query.page) * 9 - 9 || 0)
    }
}
</script>

<style lang="scss">
.pagination-row {
    display: block;
    width: 100%;
    padding: 2rem 4rem;
    text-align: center;
}
.pagination_button {
    display: inline-block;
    padding: 2rem 2rem;
    background: $color-secondary;
    color: $color-white;
    border: none;
    border-radius: .3rem;
    cursor: pointer;
    margin-left: 1rem;
    font-size: 1.5rem;

    &.active {
        background: $color-gray-dark;
        cursor: auto;
    }

    &:disabled {
        cursor: auto;
        background: #e95454;
    }
}

</style>