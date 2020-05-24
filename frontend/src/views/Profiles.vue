<template>
<div>
    <Search />
    <div v-if="getProfiles.length != 0" class="profiles-section">
      <Loader v-if="getProfiles[0].owner" />
    <router-link :to="'profile/' + profile._id" tag="div" v-for="profile in getProfiles" :key="profile._id">
    <div class="profile" v-if="profile.owner != null">
        <img class="profile_avatar" :src="$api + '/profile/' + profile._id + '/avatar'" alt="">
        <h1 v-if="profile.owner" class="profile_name">{{ profile.owner.name }}</h1>
        <p v-if="profile.owner" class="profile_type">{{ profile.owner.type }}</p>
    </div>
    </router-link>
    </div>
  </div>
</template>

<script>
import Search from '../components/Search'
import Loader from '../components/Loader'
export default {
  components : {
    Search,
    Loader
  },
 computed :{
   getProfiles() {
       return this.$store.getters.getProfiles
   }

 },
 created() {
     this.$store.dispatch('GET_PROFILES')
 }
}
</script>

<style lang="scss" scoped>
@import '../scss/components/profiles';
</style>