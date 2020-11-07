<template>
  <div class="home">
    <Loader />
      <router-link
        :to="'/song/' + song._id"
        tag="div"
        class="song"
        v-for="(song, index) in getAllSongs[0]"
        :key="index"
      >
        <img
          class="song_image"
          v-bind:src="$api + '/song/' + song._id + '/image'"
        />
        <h2 class="song_title">{{ song.title }}</h2>
        <h2 class="song_genre">{{ song.genre }}</h2>
        <div class="song_likes">
          <img
            class="song_likes-icon"
            src="../assets/icons/favourite.svg"
            alt=""
          />
          <span class="song_likes-number">{{ song.likes }}</span>
          </div>
      </router-link>
  </div>
</template>

<script>
import Loader from "../components/Loader";
export default {
  components: {
    Loader,
  },
  computed: {
    getAllSongs() {
      return this.$store.getters.getAllSongs;
    },
  },
  mounted() {
    this.$store.dispatch("GET_MY_PROFILE");
    this.$store.dispatch("GET_ALL_SONGS");
  },
  beforeDestroy() {
    this.$store.dispatch("EMPTY_ALL_SONGS");
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/components/home";


</style>