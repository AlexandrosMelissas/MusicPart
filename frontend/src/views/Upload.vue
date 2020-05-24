<template>
  <div class="upload">
      <Loader />
      <form class="form" @submit.prevent="upload">
            <div class="form-group">
            <h2 class="heading_form">Upload a track</h2>
            </div>
          <div class="form_group">
              <input type="text" minlength="5" maxlength="30" id="title" v-model="form.title" placeholder="Title" class="form_input" required>
              <label for="title" class="form_label">Title</label>
          </div>
           <div class="form_group">
              <input type="text" minlength="10" maxlength="100" id="description" v-model="form.description" placeholder="Description" class="form_input" required>
              <label for="description" class="form_label">Description</label>
          </div>
           <div class="form_group">
             <div class="form_select-container">
              <select id="genre" class="form_select" v-model="form.genre" required>
                    <option value="" disabled hidden selected>Select genre : </option>
                    <option value="Rock">Rock</option>
                    <option value="Pop">Pop</option>
                    <option value="Metal">Metal</option>
                    <option value="Indie">Indie</option>
                    <option value="Alternative">Alternative</option>
                    <option value="Blues">Blues</option>
                    <option value="Folk">Folk</option>
                    <option value="Reggae">Reggae</option>
                    <option value="Classic">Classic</option>
              </select>
              <ion-icon class="form_select-arrow" name="caret-down-outline"></ion-icon>
             </div>
          </div>
              <input class="form_file" type="file" id="file" @change="getFile">
              <label class="form_file-label" for="file">Press to select your track</label>
              <label v-if="file" class="form_file-name">{{ this.file.name }}</label>
               <Error class="margin-top-small" />
              <input type="submit" value="Upload Track" class="form_submit margin-top-small">
      </form>
  </div>
</template>

<script>
import Axios from 'axios'
import Error from '../components/Error'
import Loader from '../components/Loader'
export default {
    components : {
        Error,
        Loader
    },
    data() {
        return {
            form : {
                title : '',
                description : '',
                genre : '',
                },
                file : ''
        }
    },
    methods : {
        getFile(event){
            this.file =  event.target.files[0]
        },
        upload() {

            if(this.file == '') { 
                let errorMessage = 'Please select a track'
                this.$store.commit('setError',errorMessage)
                return
            }
            var form_data = new FormData()
    
            form_data.append('song',JSON.stringify(this.form))
            form_data.append('upload',this.file)

            this.$store.dispatch('UPLOAD',form_data).then((success) => {
                this.form.title = ''
                this.form.description = ''
                this.form.genre = ''
                document.querySelector('.form_select').selected = 'Select genre : '
                this.file = ''
                this.$router.push('/tracks')
            }).catch((error) => {
                this.$store.commit('setError',error.response.data.error)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../scss/components/form";
@import "../scss/components/upload";

</style>