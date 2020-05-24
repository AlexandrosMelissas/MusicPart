<template>
  <div>
    <div class="top_songs">
      <h2 class="heading_section">Most popular tracks</h2>
    <div v-if="top_songs" class="songs">
     <router-link v-bind:to="'/song/' + song._id" tag="div" v-for="song in top_songs" :key="song._id" class="song">
        <img class="song_image" v-bind:src="$api + '/song/' + song._id + '/image'" >
        <h2 class="song_title">{{ song.title }}</h2>
        <h2 class="song_genre">{{ song.genre }}</h2>
     </router-link>
    </div>
    <router-link to="/home" class="songs_btn">Check more tracks</router-link>
   </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
        top_songs: []
        }
    },
    computed : {
        setSongs(songs) {
        this.top_songs = songs
        }
    },
    created() {
        axios.get('/songs/top').then(({status,data}) => {
        this.top_songs = data
        })
    }

}
</script>

<style lang="scss" scoped>
@import "../scss/components/topSongs";


</style>