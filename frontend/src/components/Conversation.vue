<template>
<div>
<div class="conversation" ref="convo">
  <Loader />
  <div v-if="getMessages" class="messages">
     <div v-for="message in getMessages" :key="message._id">
       <div class="message" v-bind:class="message.recipient == getMyProfile.owner._id ? 'not-my_message' : 'my_message'">
         <div v-if="message.sender" class="message_info">
          <p v-if="message.sender.profile"  class="message_sender">{{ message.sender.name }}</p>
          <p class="message_date">{{ message.createdAt }}</p>
         </div>
          <p>{{ message.message }}</p>
          <ion-icon style="cursor:pointer;margin-top:1rem;font-size:2.5rem"  v-if="message.file" @click="playPauseSong" v-bind:data-source="$api + '/message/' + message._id + '/file'" name="play"></ion-icon>
      </div>
    </div>
  </div>
</div>

 <div class="send_message-container">
    <form>
      <input class="send_message-input" type="text" placeholder="Send a message" v-model="message">
      <button class="send_message-btn send_message-btn-gray" @click.prevent="sendMessage">Send Message</button>
      <input class="send_message-file" id="file" type="file" @change="sendTrack">
      <label class="send_message-btn send_message-btn-red" for="file">Send Track</label>
      <button @click.prevent="refresh" class="send_message-btn send_message-btn-blue">Refresh</button>
    </form>
  </div>
</div>
</template>

<script>
import Loader from '../components/Loader';
export default {
  components : {
    Loader
  },
    data() {
        return {
            message: '',
            file: '',
            audio: new Audio()
            }
    },
    computed : {
        getMessages(){
          return this.$store.getters.getMessages
        },
        getConversation() {
          return this.$store.getters.getConversation
        },
        getMyProfile() {
          return this.$store.getters.getMyProfile
        },
        to() {
          if(this.getMyProfile.owner._id === this.getConversation.sender) {
            return this.getConversation.recipient
          } else {
            return this.getConversation.sender
          }
        }
    },
    methods : {
        sendMessage() {
          if(this.message)
            this.$store.dispatch('SEND_MESSAGE',{
              message: this.message,
              recipient: this.to
              }).then((success) => {
              this.message = ''
              this.scrollToEnd()
            })         
       },
       scrollToEnd() {
         const conversation = this.$refs.convo
         conversation.scrollTop = conversation.scrollHeight
       },
         sendTrack() {
            this.file = event.target.files[0]
            console.log(this.file)
            let form_data = new FormData()
            const message = {
              message: this.file.name,
              recipient: this.to
            }
            form_data.append('message',JSON.stringify(message))
            form_data.append('upload',this.file)
            this.$store.dispatch('SEND_FILE',form_data).then((success) => {
              this.scrollToEnd()
            })
       },
       playPauseSong(event) {
         if(this.audio.src == ''){
             const src = event.target.getAttribute('data-source')
             this.audio.src = src
         } else if (this.audio.src != event.target.getAttribute('data-source')) {
             const src = event.target.getAttribute('data-source')
             this.audio.src = src
         }
         if(event.target.name == 'Play'){
            this.audio.play()
            event.target.name = 'Pause'
         } else {
           this.audio.pause()
           event.target.name = 'Play'
         }
       },
       refresh() {
          this.$store.dispatch('GET_MESSAGES',this.$route.params.id).then((success) => {
            this.scrollToEnd()
          })
       }
    },
    created() {
      this.$store.dispatch('GET_MESSAGES',this.$route.params.id).then((success) => { 
        this.$store.dispatch('GET_MY_PROFILE')
      this.$store.dispatch('GET_CONVERSATION',this.$route.params.id).then((success) => {
         this.scrollToEnd()
      })
                         
      })
      


   
    },
    beforeRouteUpdate(to,from,next) {
            this.$store.dispatch('GET_MESSAGES',to.params.id)
            next()
    }

}
</script>

<style lang="scss" scoped>
@import "../scss/components/conversation"
</style>