<template>
  <div class="bottom_player">
    <div class="playing_song-info">
      <img v-if="getPlayingSongObject != {}"
        style="width: 10rem; border-radius: 0.7rem"
        :src="$api + '/song/' + getPlayingSongObject._id + '/image'"
        alt=""
      />
         <h1 style="margin-right:2rem" v-if="getPlayingSongObject != {}">
        {{ getPlayingSongObject.title }}
      </h1>
      <h1 v-if="getPlayingSongObject.owner">by {{ getPlayingSongObject.owner.name }}</h1>
   
    </div>
    <div class="player-play player-button">
      <ion-icon
        class="player-icon player-click"
        @click="playPauseSong"
        ref="bottomicon"
        :name="this.getPlayingSongPaused ? 'play' : 'pause'"
      ></ion-icon>
    </div>
    <div @click.capture="stopSong" class="player-stop player-button">
      <ion-icon class="player-icon" name="stop"></ion-icon>
    </div>

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

    <ion-icon
      class="bottom_player-close"
      @click="removeSong"
      name="close-outline"
    ></ion-icon>
  </div>
</template>

<script>
export default {
  computed: {
    getPlayingSong() {
      return this.$store.getters.getPlayingSong;
    },
    getPlayingSongPaused() {
      if (this.$store.getters.getPlayingSong !== null) {
        return this.$store.getters.getPlayingSong.paused;
      } else {
        return true;
      }
    },
    getPlayingSongObject() {
      return this.$store.getters.getPlayingSongObject;
    },
    getSecondsDuration() {
      return this.$store.getters.getSecondsDuration;
    },
    getMinutesDuration() {
      return this.$store.getters.getMinutesDuration;
    },
    getSecondsCurrent() {
      return this.$store.getters.getSecondsCurrent;
    },
    getMinutesCurrent() {
      return this.$store.getters.getMinutesCurrent;
    },
  },
  methods: {
    stopSong() {
      this.$store.dispatch("stopSong");
    },
    adjustTime() {
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
        this.$refs.bottomicon.name = 'play'
      } else {
        this.$refs.bottomicon.name = 'pause'
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
    playPauseSong() {
      if (this.getPlayingSong.paused) {
        this.$store.dispatch("playSong");
      } else {
        this.$store.dispatch("pauseSong");
      }
    },
    removeSong() {
      // this.getPlayingSong.removeEventListener("timeupdate", this.adjustTime);
      this.$store.commit("setBottomPlayer", false);
      // this.$store.commit('setPlayingSong',null)
    },
  },
  beforeUpdate() {
    if (this.getPlayingSong)
      //     this.getPlayingSong.addEventListener("timeupdate", this.adjustTime);
      this.getPlayingSong.addEventListener("timeupdate", this.adjustTime);
      this.$store.getters.getPlayingSong
      this.$store.getters.getSong
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/components/player";

.bottom_player {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  box-shadow: 0 2rem 4rem rgba($color-black, 0.4);

  transition: all 0.3s ease;
  height: 7vh;

  &-close {
    font-size: 5rem;
    position: absolute;
    right: 2rem;
    color: black;
    cursor: pointer;
  }
}

.player-duration {
  color: black !important;
  top: 40%;
}

.playing_song-info {
  position: absolute;
  width: 25%;
  display : flex;
  align-items: center;
  justify-content: space-evenly;
  left: 10%;
}
</style>