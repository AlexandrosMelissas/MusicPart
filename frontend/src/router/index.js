import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Logout from '../components/Logout.vue'
import Home  from '../views/Home.vue'
import Profile from "../views/Profile.vue"
import Upload from "../views/Upload.vue"
import Song from "../views/Song.vue"
import Message from "../views/Message.vue"
import Conversation from '../components/Conversation.vue'
import Profiles from '../views/Profiles.vue'
import Index from '../views/Index.vue'
import store from '../store' 

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/tracks',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/users',
    name: 'Profiles',
    component: Profiles
  },
  {
    path: '/song/:id',
    name: 'Song',
    component: Song
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    children : [
      {
        path: 'conversation/:id',
        component: Conversation
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' 
  && to.name !== 'Register' 
  && to.name !== 'Index' 
  && to.name !== 'Song'  
  && to.name !== 'Home'
  && to.name !== 'Profiles'
  && to.name !== 'Profile'
  && !store.getters.isAuthenticated){
    next({ name: 'Login' })
  } else {
    next()
  }
})

router.beforeEach((to,from,next) => {
  if((store.getters.isAuthenticated && to.name === 'Login')) {
   return next({ name: 'Home'})
  } else if (store.getters.isAuthenticated && to.name === 'Register') {
    return next({ name : 'Home'})
  }

  next()
})

export default router
