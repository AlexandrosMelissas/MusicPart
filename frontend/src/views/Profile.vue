<template>
  <div class="profile-section">
      <Loader />
      <div class="profile_container">
      <div class="profile">
          <div class="profile_avatar-container">
            <img :src=" $api + '/profile/' + getProfile._id + '/avatar'" class="profile_avatar"/>
             <input class="profile_avatar-change" id="avatar-img" v-if="$store.getters.isAuthenticated" type="file" @change="uploadImage">
             <label class="profile_avatar-btn" for="avatar-img">Change avatar</label>
          </div>
          <div v-if="getProfile.owner" class="profile_info">
            <p v-if="getProfile.owner"  class="profile_info-name">{{ getProfile.owner.name}}</p>
            <p v-if="getProfile.owner"  class="profile_info-type">{{ getProfile.owner.type}}</p>
            <p class="profile_info-text">Age : {{ getProfile.age ? getProfile.age : 'undefined' }}</p>
            <p class="profile_info-text">Location : {{ getProfile.city ? getProfile.city : 'undefined'}}</p>
            <p v-if="getProfile.instruments.length > 0" class="profile_info-text">Instruments : 
                <span class="instrument" v-for="(instrument,index) in getProfile.instruments" :key="instrument._id">
                    {{ index + 1 }} . {{ instrument.instrument }}
                </span>
            </p>
          </div>
      </div>
        <button class="profile_btn" v-if="$store.getters.isAuthenticated && getProfile._id != getMyProfile._id " @click="openModal('send')">Send Message</button>
        <button class="profile_btn" v-else-if="$store.getters.isAuthenticated" @click="openModal('edit')">Edit Profile</button>
        </div>
      
    <div class="latest_songs">
      <h2 class="profile_title">Latest uploads</h2>
      <div v-if="getProfileSongs.length != 0" class="latest_songs-container">
        <router-link v-bind:to="'/song/' + song._id" tag="div" v-for="song in getProfileSongs" :key="song._id" class="song">
            <img class="song_image" v-bind:src="$api + '/song/' + song._id + '/image'" >
            <h2 class="song_title">{{ song.title }}</h2>
            <h2 class="song_genre">{{ song.genre }}</h2>
        </router-link>
     </div>
     <h2 v-else class="none">No uploads from this user yet</h2>
    </div>

    <div class="latest_comments">
        <h2 class="profile_title">Latest comments</h2>
        <div v-if="getProfile.owner && getProfile.owner.comments != 0"  class="latest_comments-container">
            <div v-for="comment in getProfile.owner.comments" :key="comment._id" class="comment">
                <h2 class="comment_title">Commented on <router-link class="comment_song" v-bind:to="'/song/' + comment.song._id"> {{ comment.song.title }} </router-link> : </h2> 
                <p class="comment_text">{{ comment.comment }}</p> 
            </div>
        </div>
         <h2 v-else class="none">No comments from this user yet</h2>
    </div>

        <div class="modal_container" @click.self="closeModal('send')">
            <div class="modal_box modal_box-edit">
              <form @submit.prevent="updateProfile" class="update_profile-form">
                <h2 class="update_profile-heading">Edit your profile</h2>
                <div class="form_group update_profile-group">
                    <label for="age" class="update_profile-label">Age</label>
                    <input class="form_input update_profile-input" type="text" id="age" v-bind:value="`${getProfile.age}`">
                </div>

                <div class="form_group update_profile-group">
                    <label for="location" class="update_profile-label">Location</label>
                    <input class="form_input update_profile-input" type="text" :value="getProfile.city" id="location">
                </div>
                <div class="form_group update_profile-group update_profile-group-select">
                 <label for="select" class="update_profile-label">Instruments</label>
                <div class="form_select-container update_profile-select-container">
                <select id="select" class="form_select">
                <option v-for="(instrument,index) in getProfile.instruments" :key="index" value="">{{ instrument.instrument }}</option>
                </select>
                <ion-icon class="form_select-arrow" name="caret-down-outline"></ion-icon>
                </div>
                <button @click.prevent="removeInstrument" class="update_profile-btn update_profile-btn-red">Remove</button>
                         
                </div>
                    <div class="update_profile-group update_profile-group-add">
                    <input v-model="instrument" class="form_input update_profile-input update_profile-input-add" placeholder="Add an instrument" type="text" id="instrument">
                    <button @click.prevent="addInstrument" class="update_profile-btn update_profile-btn-gray">Add</button>  
                </div>
                <button  class="update_profile-save update_profile-btn update_profile-btn-gray">Save</button>
                <button @click.prevent="closeModal()" class="update_profile-save update_profile-btn margin-right-small update_profile-btn-red">Cancel</button>
              </form>
            </div>
            <div class="modal_box modal_box-send">
                <div class="recipient_info">
                    <img class="recipient_info-image" :src="'http://localhost:3000/api/profile/' + getProfile._id + '/avatar'" alt="">
                </div>
                <div v-if="getProfile.owner" class="send_message">
                    <h2 class="recipient_name">Send a message to {{ getProfile.owner.name }}</h2>
                    <form  @submit.prevent="sendMessage">
                    <input type="text" v-model="message" placeholder="Enter your message" class="recipient_message" required>
                    <button class="send_message-btn">Send</button>
                    </form>
                </div>
            <ion-icon class="modal_box-close" @click="closeModal('send')" name="close-outline"></ion-icon>
            </div>
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
            instrument: '',
        }
    },
    computed : {
        getProfile() {
            return this.$store.getters.getProfile
        },
        getMyProfile () {
            return this.$store.getters.getMyProfile
        },
        getProfileSongs(){
            return this.$store.getters.getProfileSongs
        },
        getImage() {
            return this.$store.getters.getImage
        }
      },  
    created() {
        this.$store.dispatch('GET_PROFILE',this.$route.params.id).then((profile) => {
            this.$store.dispatch('CHECK_IMAGE',profile._id)
            })
        this.$store.dispatch('GET_PROFILE_SONGS',this.$route.params.id)
    },
     beforeRouteUpdate (to, from, next) {
          this.$store.dispatch('GET_PROFILE',to.params.id).then((profile) => {
            this.$store.dispatch('CHECK_IMAGE',profile._id)
            })
          this.$store.dispatch('GET_PROFILE_SONGS',to.params.id)
         next()        
  },
    methods : {
        uploadImage(event) {
            var form_data = new FormData()
            var imageFile = event.target.files[0]
            form_data.append('avatar',imageFile)
            this.$store.dispatch('UPLOAD_IMAGE',form_data)
        },
        addInstrument () {
            this.$store.commit('addInstrument',this.instrument)
            this.instrument = ''
        },
        removeInstrument () {
            const select = document.querySelector('.form_select')
            this.$store.commit('removeInstrument',select.options[select.selectedIndex].text)
        },
        openModal(modal) {
            const modal_container = document.querySelector('.modal_container')
            if(modal == 'send') {
            const modal_box = document.querySelector('.modal_box-send')

            modal_container.style.display = 'flex'
            modal_box.style.display = 'flex'
            } else {
                const modal_box = document.querySelector('.modal_box-edit')
                modal_container.style.display = 'flex'
                modal_box.style.display = 'flex'
            }
        },
        closeModal(modal) {
            const modal_container = document.querySelector('.modal_container')
            if(modal=='send') {
                modal_container.style.display = 'none'
                document.querySelector('.modal_box-send').style.display = 'none'
            } else {
                modal_container.style.display = 'none'
                document.querySelector('.modal_box-edit').style.display = 'none'
            }
          
        },
        sendMessage() {
            this.$store.dispatch('SEND_MESSAGE',{
                message: this.message,
                recipient: this.$store.getters.getProfile.owner._id
            }).then((message) => {
                console.log(message)
                this.$router.push('/message/conversation/' + message.conversation)
            })
        },
        updateProfile () {
            let instruments = this.getProfile.instruments.map((instrument) => {
                delete instrument._id
                return instrument
            })
            this.$store.commit('setProfile',{
                city : document.querySelector('#location').value,
                age : document.querySelector('#age').value,
            })
            this.$store.dispatch('UPDATE_PROFILE', {
                city: this.getProfile.city,
                instruments,
                age: this.getProfile.age
            }).then((success) => {
                this.closeModal()
            })
        }
    }

}
</script>

<style lang="scss" scoped>
@import "../scss/components/profile";
@import "../scss/components/modal";

</style>