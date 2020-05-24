<template>
  <div class="register-form">
   <form @submit.prevent="register">
     <div class="form-group">
       <h2 class="heading_form">Create an account</h2>
     </div>
    <div class="form_group">
      <input type="text" id="username" maxlength="15" minlength="5" v-model="form.username" class="form_input" placeholder="Username" required>
      <label class="form_label" for="username">Username</label>
    </div>

    <div class="form_group">
      <input type="password" id="password" minlength="8" maxlength="15" v-model="form.password" class="form_input" placeholder="Password" required>
      <label for="password" class="form_label">Password</label>
    </div>

    <div class="form_group">
      <input type="text" id="name" v-model="form.name" minlength="5" maxlength="15" class="form_input" placeholder="Name" required>
      <label class="form_label" for="name">Name</label>
    </div>

     <div class="form_group">
      <input type="email" id="email" v-model="form.email" class="form_input" placeholder="Email" required>
      <label for="email" class="form_label">Email</label>
    </div>
    <div class="form_group">
             <div class="form_select-container">
              <select id="genre" class="form_select" v-model="form.type" required>
                    <option value="" disabled hidden selected>Select your type : </option>
                    <option value="Musician">Musician</option>
                    <option value="Producer">Producer</option>
              </select>
              <ion-icon class="form_select-arrow" name="caret-down-outline"></ion-icon>
             </div>
     </div>

      <div class="form_group">
      <input type="submit" class="form_submit" value="Register">
       </div>

         <div class="form_group">
      <router-link class="form_already" to="/login">Already have an account? Sign in!</router-link>
    </div>
  </form>
  
  </div>
 
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      form: {
        name : '',
        username: '',
        password: '',
        email: '',
        type: ''
        },
    }
  }
  ,
  methods:{
    register() {
      this.$store.dispatch("REGISTER",this.form).then((success) => {
        Object.keys(this.form).forEach(key => this.form[key] = '')
        this.$router.push('/tracks')
      })
    }
  }
  
}
</script>

<style lang="scss" scoped>
@import "../scss/components/form";
.register-form {
    margin: 5rem auto;
    width: 20%;
}
</style>
