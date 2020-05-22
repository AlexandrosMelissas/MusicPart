<template>
<div >
        <nav class="navigation" :class="[$route.name==='Index' ? 'navigation_transparent margin-top-small' : 'navigation_dark']">
             <router-link to="/"><img class="navigation_logo" src="../assets/images/logo-light.png" /></router-link>
            <ul class="navigation_list">
                <li class="navigation_item navigation_item-tracks"><router-link to="/tracks" class="navigation_link">Tracks</router-link></li>
                <li class="navigation_item navigation_item-musicians"><router-link to="/users" class="navigation_link">Users</router-link></li>
                <li v-if="!isLoggedIn && (this.$route.name === 'Index' || this.$route.name !== 'Login')" class="navigation_item"><router-link to="/login" class="navigation_link navigation_link-login">Login</router-link></li>
                <li v-if="!isLoggedIn && this.$route.name === 'Index'" class="navigation_item navigation_item-register"><router-link to="/register" class="navigation_link navigation_link-register">Sign up</router-link></li>
                <li v-if="!isLoggedIn && this.$route.name === 'Login'" class="navigation_item"><router-link to="/register" class="navigation_link">Sign up</router-link></li>
                <li v-if="isLoggedIn" class="navigation_item"><router-link to="/message" class="navigation_link">Messages</router-link></li>
                <li v-if="isLoggedIn" class="navigation_item"><router-link v-bind:to="'/profile/' + getMyProfile._id" class="navigation_link">Profile</router-link></li>
                <li v-if="isLoggedIn" class="navigation_item"><router-link to="/upload" class="navigation_link">Upload</router-link></li>
                <li v-if="isLoggedIn" class="navigation_item"><router-link to="/logout" class="navigation_link">Logout</router-link></li>
            </ul>
        </nav>
</div>
</template>

<script>
export default {

    data(){
        return {
            logo_light: '../assets/images/logo-light.png',
            logo_dark: '@/assets/images/logo-dark.png'
        }
    },
    computed: {
        isLoggedIn(){
          return this.$store.getters.isAuthenticated
        },
        getMyProfile() {
            return this.$store.getters.getMyProfile
        }
    },
    mounted() {
        if(this.isLoggedIn){
            this.$store.dispatch('GET_MY_PROFILE')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/layout/navbarTransparent";

</style>