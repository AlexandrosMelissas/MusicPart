<template>
<div class="index">
  <!-- <Loader /> -->

  <div class="index-section">
      <div class="heading">
        <h2 class="heading_primary margin-bottom-medium">MusicPart</h2>
        <h5 class="heading_secondary">Share your passion.Share your music.</h5>
        <router-link to="/login" class="btn-primary btn_animated">Get Started</router-link>
       </div>
  </div>
  <TopSongs />
  <UploadSection />
  <ConnectSection />
  <Footer />
</div>
</template>

<script>
import TopSongs from '../views/TopSongs';
import UploadSection from '../views/UploadSection';
import ConnectSection from '../views/ConnectSection';
import Footer from '../views/Footer';
import Loader from '../components/Loader'
export default {

 components : {
   TopSongs,
   UploadSection,
   ConnectSection,
   Footer,
   Loader
 },
 

}
</script>

<style lang="scss" scoped>
@import "../scss/components/index";
</style>