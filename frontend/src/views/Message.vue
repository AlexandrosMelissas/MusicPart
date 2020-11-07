<template>
<div class="message-section">
        <div class="conversations">
            <div v-if="getMyProfile.owner">
                <router-link active class="conversation" tag="div" v-for="conversation in getConversations" :key="conversation._id"  v-bind:to="'/message/conversation/' + conversation._id">
                    <img class="conversation_img" v-bind:src="getMyProfile._id === conversation.sender.profile[0]._id ? $api + '/profile/' + conversation.recipient.profile[0]._id + '/avatar' : $api + '/profile/' + conversation.sender.profile[0]._id + '/avatar' ">
                    <h2 class="conversation_name">{{getMyProfile._id === conversation.sender.profile[0]._id ? conversation.recipient.name : conversation.sender.name }}</h2>
                </router-link>
            </div>       
    </div>
    <div class="messages">
        <h2 v-if="$route.name === 'Message' && getConversations.length != 0" class="messages_heading" >Click on a user to open a conversation</h2>
        <h2 v-else-if="$route.name === 'Message'" class="messages_heading">Go to someone's profile and send a message!</h2>
        <router-view style="height:100%">
        </router-view>
    </div>
</div>
</template>

<script>
import Conversation from '../components/Conversation'
export default {
    computed : {
        getConversations() {
            return this.$store.getters.getConversations
        },
        getMyProfile() {
            return this.$store.getters.getMyProfile
        }
    },
    created() {
        this.$store.dispatch('GET_MY_PROFILE')
        this.$store.dispatch('GET_CONVERSATIONS')
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/components/message";
</style>