<template>
    
</template>
<script>
export default {

beforeMount(){
    this.$store.dispatch('LOGOUT').then((success) => {
    this.$router.push('/login')
    })}

}
</script>
