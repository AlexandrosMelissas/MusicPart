<template>
<div class="upload-section">

    <div class="section section_producer">
        <div class="section_heading">
            <h2 class="section_heading-title section_producer-title">Are you a producer?</h2>
            <p class="section_heading-text  section_producer-text">
                Have you ever felt that all you want to do is to produce songs but you haven't met many musicians?
                Grab the chance and explore the top musicians of the world with the help of MusicPart. 
                Listen to their tracks. If you happen to love an artist, feel free to send him a message.
            </p>
            <router-link class="section_btn section_producer-btn" to="/profiles">Discover musicians</router-link>
        </div>
        <img class="section_image" src="../assets/images/producer1.jpg" alt="">
    </div>

    <div class="section section_musician">
        <img class="section_image" src="../assets/images/musician.jpg" alt="">

        <div class="section_heading section_musician_heading">
            <h2 class="section_heading-title section_musician-title">Are you a musician?</h2>
            <p class="section_heading-text section_musician-text">
                Listen to other people's tracks. Maybe you will get inspired. 
                If you are not in the mood of listening to tracks, make your own and upload it in MusicPart.
                Thousand of people are going to be able to listen to it and give you their opinion.
                Everyone has the right to share their music. Do it now!
            </p>
            <router-link class="section_btn section_musician-btn" to="/upload">Upload songs</router-link>
        </div>
    </div>

</div>
  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../scss/components/uploadSection";

</style>