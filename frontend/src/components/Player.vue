<template>
  <div>
    <img
      class="player-background"
      :src="$api + '/song/' + $route.params.id + '/image'"
      alt=""
    />
    <div class="player-buttons">
      <div
        @click.capture="playSong"
        v-bind:data-source="$api + '/song/' + $route.params.id + '/songFile'"
        class="player-play player-button"
      >
        <ion-icon
          class="player-icon player-click"
          ref="playericon"
          :name="
            this.getPlayingSongPaused ||
            this.getSong._id != this.getPlayingSongObject._id
              ? 'play'
              : 'pause'
          "
        ></ion-icon>
      </div>

      <div @click.capture="stopSong" class="player-stop player-button">
        <ion-icon class="player-icon" name="stop"></ion-icon>
      </div>

      <div class="player-volume player-button">
        <ion-icon
          @click="muteUnmuteSong"
          class="player-icon"
          name="volume-high"
        ></ion-icon>
        <div class="volume_container">
          <div class="volume_slider-con" @mousedown="mouseClicked">
            <div class="volume_slider">
              <div class="volume_knob"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="player-time"></div>

    <h2 class="player-duration">
      {{
        this.getMinutesCurrent +
        ":" +
        this.getSecondsCurrent +
        "/" +
        this.getMinutesDuration +
        ":" +
        this.getSecondsDuration
      }}
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseDown: false,
      muted: false,
    };
  },
  computed: {
    getSong() {
      return this.$store.getters.getSong;
    },
    getPlayingSong() {
      return this.$store.getters.getPlayingSong;
    },
    getPlayingSongObject() {
      return this.$store.getters.getPlayingSongObject;
    },
    getPlayingSongPaused() {
      if (this.$store.getters.getPlayingSong !== null) {
        return this.$store.getters.getPlayingSong.paused;
      } else {
        return true;
      }
    },
    getSecondsDuration() {
      if (this.getSong._id == this.getPlayingSongObject._id) {
        return this.$store.getters.getSecondsDuration;
      } else {
        return "00";
      }
    },
    getMinutesDuration() {
      if (this.getSong._id == this.getPlayingSongObject._id) {
        return this.$store.getters.getMinutesDuration;
      } else {
        return "00";
      }
    },
    getSecondsCurrent() {
      if (this.getSong._id == this.getPlayingSongObject._id) {
        return this.$store.getters.getSecondsCurrent;
      } else {
        return "00";
      }
    },
    getMinutesCurrent() {
      if (this.getSong._id == this.getPlayingSongObject._id) {
        return this.$store.getters.getMinutesCurrent;
      } else {
        return "00";
      }
    },
  },
  methods: {
    playSong(event) {
      const icon = document.querySelector(".player-icon");
      const div = document.querySelector(".player-button");
      const song = new Audio();

      if (song.src == "") {
        if (event.target == div) {
          let src = event.target.getAttribute("data-source");
          song.src = src;
        } else {
          let src = event.target.parentElement.getAttribute("data-source");
          song.src = src;
        }
      }
      if (this.getPlayingSong == null || this.getPlayingSongObject._id !== this.getSong._id) {
        if(this.getPlayingSong !== null) {
          this.$store.dispatch('stopSong')
        }
   
        this.$store.commit("setPlayingSong", song);
        this.$store.commit("setPlayingSongObject", this.getSong);
        this.getPlayingSong.addEventListener("timeupdate", this.adjustTime);
      }

      if (this.getPlayingSong.paused) {
        this.$store.dispatch("playSong");
        this.$store.commit("setBottomPlayer", true);
      } else {
        this.$store.dispatch("pauseSong");
      }
    },
    stopSong() {
      if(this.getPlayingSongObject._id == this.getSong._id)
      this.$store.dispatch("stopSong");
    },
    muteUnmuteSong(event) {
      const slider = document.querySelector(".volume_slider");
      if (this.muted == false) {
        event.target.name = "volume-mute";
        this.getPlayingSong.volume = 0;
        this.muted = true;
        slider.style.width = 0;
      } else {
        event.target.name = "volume-high";
        this.getPlayingSong.volume = 50 / 100;
        this.muted = false;
        slider.style.width = 50 + "%";
      }
    },
    adjustTime() {
      let position =
        this.getPlayingSong.currentTime / this.getPlayingSong.duration;
      document.querySelector(".player-time").style.width = `${
        position * 100 + "%"
      }`;

      this.$store.commit(
        "setMinutesDuration",
        Math.floor(this.getPlayingSong.duration / 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      );
      this.$store.commit(
        "setSecondsDuration",
        (this.getPlayingSong.duration.toFixed(0) % 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
      );

      this.$store.commit(
        "setMinutesCurrent",
        Math.floor(this.getPlayingSong.currentTime / 60).toLocaleString(
          "en-US",
          {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }
        )
      );
      this.$store.commit(
        "setSecondsCurrent",
        (this.getPlayingSong.currentTime.toFixed(0) % 60).toLocaleString(
          "en-US",
          {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }
        )
      );

      if(this.getPlayingSong.paused) {
        this.$refs.playericon.name = 'play'
      } else {
        this.$refs.playericon.name = 'pause'
      }

      // if (this.getPlayingSong.paused) {
      //   document.querySelectorAll(".player-click").forEach((icon) => {
      //     icon.name = "play";
      //   });
      // } else {
      //   document.querySelectorAll(".player-click").forEach((icon) => {
      //     icon.name = "pause";
      //   });
      // }
    },
    mouseClicked(event) {
      this.mouseDown = true;
      this.updateBar(event.clientX);
    },
    updateBar(x) {
      const volume = document.querySelector(".volume_slider-con");
      const eInner = document.querySelector(".volume_slider");
      let percentage;
      let volumeRect = volume.getBoundingClientRect();
      let left = volumeRect.left + document.body.scrollLeft;
      let position = x - left;
      percentage = (100 * position) / volume.clientWidth;

      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }

      //update volume bar and video volume
      eInner.style.width = percentage + "%";
      this.getPlayingSong.volume = percentage / 100;
    },
  },
  mounted() {
    // this.$store.dispatch('GET_SONG',this.$route.params.id)
    if(this.getPlayingSongObject._id == this.getSong._id) {
        this.getPlayingSong.addEventListener("timeupdate", this.adjustTime);

    }
    let that = this;

    const mouseUp = function () {
      that.mouseDown = false;
    };

    const mouseMove = function (event) {
      if (that.mouseDown) {
        that.updateBar(event.clientX);
      }
    };

    document.addEventListener("mouseup", mouseUp);

    document.addEventListener("mousemove", mouseMove);
  },
  beforeDestroy() {
    // this.song.pause();
    // this.song.currentTime = 0;
    this.$store.commit("removeSongOne");
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mouseup", this.mouseMove);
    this.getPlayingSong.removeEventListener("timeupdate", this.adjustTime);
  },
};
</script>

<style lang='scss'>
@import "../scss/components/player";
</style>