<template>
  <div ref="section" class="comment_section">
      <h2 class="comment_section-heading">Comments</h2>
    
      <div class="insert_comment" v-if="isLoggedIn">
         <img class="insert_comment-img" v-bind:src="$api + '/profile/' + getMyProfile._id + '/avatar'" >
         <form @submit.prevent="insertComment"  class="insert_comment-form">
            <input type="text" id="input" v-model="comment" class="insert_comment-input" placeholder="Insert your comment">
            <button class="insert_comment-btn">Create</button>
         </form>
      </div>

    <h2 class="none" v-else>Log in to comment!</h2>
    <div class="comments">
            <Loader v-if="getComments.length != 0" />
    <div v-for="comment in getComments" :key="comment._id" class="comment">
        <img class="comment_img" v-bind:src="$api + '/profile/' + comment.owner.profile[0]._id + '/avatar'" >
        <div class="comment_content">
          <div class="comment_info">
            <h2 class="comment_author">{{ comment.owner.name }}</h2>
            <h2 class="comment_date">{{  comment.createdAt }}</h2>
          </div>
        <p class="comment_text">{{ comment.comment }}</p>
        <button class="comment_delete" v-if="isLoggedIn && comment.owner._id === getMyProfile.owner._id" @click="deleteComment(comment._id)" >Delete</button>
        </div>
    </div>
    </div>
    <Pagination v-if="getComments.length != 0" style="margin-top:4rem" />

  </div>
</template>

<script>
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
export default {
    data() {
        return {
            comment : '',
            }
    },
    components : {
        Pagination,
        Loader
    },
    computed : {
        getComments() {
            return this.$store.getters.getComments
        },
        getMyProfile() {
            return this.$store.getters.getMyProfile
        },
        isLoggedIn () {
            return this.$store.getters.isAuthenticated
        }
    },
    methods : {
        insertComment () {
            this.$store.dispatch('INSERT_COMMENT', { 
                id : this.$route.params.id,
                comment : this.comment,
                createdAt: new Date().toLocaleString('en-GB').replace(',','')
            }).then((success) => {
                this.$store.dispatch('GET_COMMENTS',this.$route.params.id)
            })
            this.comment = ""
        },
        deleteComment (id) {
            if(confirm('Are you sure?')){
          this.$store.dispatch('DELETE_COMMENT',{
              song: this.$route.params.id,
              comment: id
          }).then((success) => {
             this.$store.dispatch('GET_COMMENTS',this.$route.params.id)
          })
            }
        }
    },
    mounted () {
        this.$store.dispatch('GET_COMMENTS',this.$route.params.id)

    },
    beforeDestroy() {
        this.$store.commit('deleteComments')
    },
    onUpdate() {
        this.$store.commit('deleteComments')
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/components/comment";

</style>