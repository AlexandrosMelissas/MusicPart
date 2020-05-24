<template>
<div>
        <img class="player-background" :src="$api + '/song/' + $route.params.id + '/image'" alt="">
        <div class="player-buttons">
        <div @click.capture="playSong" v-bind:data-source="$api + '/song/' + 
        $route.params.id + '/songFile'"  class="player-play player-button">
        <ion-icon  class="player-icon" name="play"></ion-icon>
        </div>

        <div @click.capture="stopSong"  class="player-stop player-button">
            <ion-icon class="player-icon" name="stop"></ion-icon>
        </div>

        <div  class="player-volume player-button">
            <ion-icon @click="muteUnmuteSong" class="player-icon" name="volume-high"></ion-icon>
            <div class="volume_container">
                <div class="volume_slider-con" @mousedown="mouseClicked">
                    <div class="volume_slider">
                        <div class="volume_knob"></div>
                        </div> 
                    </div>        
            </div>
        </div>
        </div>
        <div class="player-time">
        </div>

        <h2 class="player-duration">{{ this.minutesCurrent + ':' + this.secondsCurrent + "/" + this.minutesDuration + ":" + this.secondsDuration }}</h2>
        </div>
</template>

<script>
export default {
     data() {
        return {
            song : new Audio(),
            mouseDown: false,
            muted: false,
            minutesDuration : '00',
            secondsDuration : '00',
            minutesCurrent : '00',
            secondsCurrent : '00'
        }
    },
    computed : {
        getSong(){
            return this.$store.getters.getSong
        }
    },
    methods : {
        playSong(event) {

            this.song.addEventListener('timeupdate',this.adjustTime)
            const icon = document.querySelector('.player-icon')
            const div = document.querySelector('.player-button')
            const name = icon.name
            if(this.song.src == '') {
                if(event.target==div){
                         let src = event.target.getAttribute('data-source')
                         this.song.src = src
                } else {
                    let src = event.target.parentElement.getAttribute('data-source')
                    this.song.src = src
                }
        
            }
            
            if(name === 'play') { 
                this.song.play()
                icon.name = "pause"
            } else {
                this.song.pause()
                icon.name = "play"
            }
            
        },
        stopSong () {
            this.song.pause()
            this.song.currentTime = 0;

            document.querySelector('.player-icon').name = "play"
        },
        muteUnmuteSong(event) {
            const slider = document.querySelector('.volume_slider')
            if(this.muted==false) {
                event.target.name = 'volume-mute'
                this.song.volume = 0 
                this.muted = true
                slider.style.width = 0
                
            } else {
                 event.target.name = 'volume-high'
                 this.song.volume = 50 / 100
                 this.muted = false
                 slider.style.width = 50 + '%'

            }
           
        },
        adjustTime () {
            let position = this.song.currentTime / this.song.duration
            document.querySelector('.player-time').style.width = `${position * 100 + '%'}`

            this.minutesDuration =  Math.floor(this.song.duration /60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            this.secondsDuration = (this.song.duration.toFixed(0) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

            this.minutesCurrent = Math.floor(this.song.currentTime / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            this.secondsCurrent = (this.song.currentTime.toFixed(0) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        },
        mouseClicked(event) {
             this.mouseDown = true;
            this.updateBar(event.clientX);  
        },
         updateBar (x) {
            const volume = document.querySelector('.volume_slider-con');
            const eInner = document.querySelector('.volume_slider');
            let percentage
                let volumeRect = volume.getBoundingClientRect();
                let left = volumeRect.left + document.body.scrollLeft
                let position = x - left
                percentage = 100 * position / volume.clientWidth;
  
                if (percentage > 100) {
                percentage = 100;
                }
                if (percentage < 0) {
                percentage = 0;
                }

            //update volume bar and video volume
            eInner.style.width = percentage +'%';
            this.song.volume = percentage / 100;
            }
        },
        created() {
        // this.$store.dispatch('GET_SONG',this.$route.params.id)
        let that = this

        const mouseUp = function() {
            that.mouseDown = false
        }

        const mouseMove = function(event) {
            if(that.mouseDown) {
                that.updateBar(event.clientX)
            }
        }

        document.addEventListener('mouseup',mouseUp);

        document.addEventListener('mousemove',mouseMove)       
    },
    beforeDestroy(){
        this.song.pause();
        this.song.currentTime = 0;
        this.$store.commit('removeSongOne')
        document.removeEventListener('mouseup',this.mouseUp)
        document.removeEventListener('mouseup',this.mouseMove)

    }
}
</script>

<style lang='scss' scoped>
@import '../scss/components/player';
</style>