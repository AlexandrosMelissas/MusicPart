<template>
  <div id="app">
    <NavbarTransparent />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <transition name="fade" mode="out-in">

              <BottomPlayer v-show="getBottomPlayer" ref="bottom-player"></BottomPlayer>
    </transition>

  </div>
</template>

<script>
import NavbarTransparent from "./components/NavbarTransparent";
import Axios from "axios";
import BottomPlayer from "./components/BottomPlayer.vue";
export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    NavbarTransparent,
    BottomPlayer,
  },
  computed : {
    getBottomPlayer() {
      return this.$store.getters.getBottomPlayer
    }
  }
};
</script>

<style lang="scss">
@import "scss/base/base";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease;
}

.fade-enter,
.fadel-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>


