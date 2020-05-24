<template>
  <div class="footer">
      <router-link to="/"><img class="footer_logo" src="../assets/images/logo-dark.png" alt=""></router-link>
      <div class="container">
          <ul class="navigation">
              <li class="navigation_item"><router-link to="/" class="navigation_link">Index</router-link></li>
              <li class="navigation_item"><router-link to="/tracks" class="navigation_link">Tracks</router-link></li>
              <li class="navigation_item"><router-link to="/users" class="navigation_link">Users</router-link></li>
              <li class="navigation_item"><router-link to="/upload" class="navigation_link">Upload</router-link></li>
              <li class="navigation_item"><router-link to="/messages" class="navigation_link">Messages</router-link></li>
          </ul>
          <div class="text-container">
                <p class="footer_text">
                    Designed,created and deployed by <a href="https://github.com/AlexandrosMelissas">Alex Melissas</a> <br/>
                    Copyright &copy; 2020 All rights reserved. <br/>
                </p>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../scss/components/footer";

</style>