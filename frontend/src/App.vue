<template>
  <div id="app">
    <NavbarTransparent />
    <transition name="fade" mode="out-in" >
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import NavbarTransparent from './components/NavbarTransparent';
import Axios from 'axios'
export default {
  data() {
    return {
      loading: false,
    }
  },
  components: {
    NavbarTransparent
  },
 
}
</script>

<style lang="scss">
@import "scss/base/base";

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease-in-out,transform .3s ease;
}

.fade-enter,.fadel-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.fade-enter-to,.fade-leave {
  opacity: 1;
}

</style>


