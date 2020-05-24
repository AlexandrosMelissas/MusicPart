<template>
<div class="login-form">
    <form class="form" @submit.prevent="login">
        <div class="form-group">
            <h2 class="heading_form">
                Login
            </h2>
        </div>
        <div class="form_group">
             <input type="text" v-model="username" placeholder="Username" id="username" required class="form_input">
             <label for="username" class="form_label">Username</label>
        </div>
        <div class="form_group">
              <input type="password" v-model="password" placeholder="Password" id="password" required class="form_input">
             <label for="password" class="form_label">Password</label>
        </div>

        <Error></Error>

        <div class="form_group">
            <input type="submit" class="form_submit" value="Login">
        </div>

        <div class="form_group">
            <router-link class="form_already" to="/register">Don't have an account? Create one here!</router-link>
        </div>
    </form>
</div>
</template>

<script>
import Error from '../components/Error';
export default {
    data(){
        return {
            username: '',
            password: '',
            error : ''
        }
    },
    components : {
        Error
    },
    methods : {
        login(){
            this.$store.dispatch('LOGIN',{
                username : this.username,
                password : this.password
            }).then((success) => {
                this.username = ''
                this.password = ''
                this.$router.push('/tracks')
            }).catch((error) => {
                this.error = 'Invalid credentials.Try again'
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/components/form";

.login-form {
    @include block-center;
    width: 20%;
}
  

</style>