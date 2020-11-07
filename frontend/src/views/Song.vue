<template>
<div class="song-section" ref="section">
    <Loader />
    <div v-if="getSong.owner" class="song">
        <div v-if="getSong.owner" class="song_container">
            <div class="song_info">
                <h1  class="song_info-author">{{  getSong.owner.name  }}</h1>
                <h1 class="song_info-title">{{  getSong.title }} </h1>
                <h1 class="song_info-genre">{{  getSong.genre }} </h1>
            </div>
            <div class="song_playback">
                <app-player></app-player>
            </div>
            <div class="edit_song">
                <img v-if="isLoggedIn" v-bind:class="{'liked': getLiked}" @click.prevent="likeUnlikeSong" 
                 class="edit_song-like" src="../assets/icons/favourite.svg" alt="" srcset="">
                 <h2 style="font-size:2rem;color:#333" v-else>Sign in to like</h2>
                 <input @change="changeImage" style="display:none" type="file" name="" id="image">
                 <label  for="image" class="edit_song-image" v-if="isLoggedIn && getSong.owner && getMyProfile.owner && getSong.owner._id == getMyProfile.owner._id">Change image</label>
                 <button @click="deleteTrack" class="edit_song-delete" v-if="isLoggedIn && getSong.owner && getMyProfile.owner && getSong.owner._id == getMyProfile.owner._id" >Delete track</button>
            </div>
            
        </div>
           <div v-if="getSong.owner.profile" class="author_container">
                <img  class="author_image" v-bind:src="$api + '/profile/' + getSong.owner.profile[0]._id + '/avatar'" >
                <div class="author_description-container">
                <h2 class="author_heading">Description</h2>
                <p class="author_description">{{ getSong.description }}</p>
            </div>

         
        </div>
        <app-comment></app-comment>

    </div>
</div>
</template>

<script>
import Comment from "../components/Comment.vue";
import Player from "../components/Player.vue";
import Loader from '../components/Loader.vue';
export default {
     components : {
        appComment : Comment,
        appPlayer : Player,
        Loader
    },
    computed: {
        getSong(){
            return this.$store.getters.getSong
        },
        getLiked() {
            return this.$store.getters.getLiked
        },
        getImage() {
        return this.$store.getters.getImage
        },
        isLoggedIn() {
            return this.$store.getters.isAuthenticated
        },
        getMyProfile() {
            return this.$store.getters.getMyProfile
        }
    },
    methods : {
      likeUnlikeSong (){
            if(!this.getLiked){
                this.$store.dispatch('LIKE_SONG',this.$route.params.id)
            } else {
                this.$store.dispatch('UNLIKE_SONG',this.$route.params.id)
            }
        },
      deleteTrack () {
          if(confirm('Are you sure?')){
              this.$store.dispatch('DELETE_SONG',this.$route.params.id).then((success) => {
              this.$router.push('/tracks')
         })
          }
         
      },
      changeImage(event) {
          let form_data = new FormData()
          form_data.append('upload',event.target.files[0])
          this.$store.dispatch('UPLOAD_SONG_IMAGE', {
              id: this.$route.params.id,
              image: form_data
          })
      }
         
    },
    created() {
         this.$store.dispatch('GET_SONG',this.$route.params.id)
         this.$store.dispatch('CHECK_LIKE',this.$route.params.id)
    },
    onUpdate() {
        this.scroll()
    }

}
</script>

<style lang="scss" scoped>
@import '../scss/components/song';

</style>