<template>
  <div class="font-sans antialiased" id="app">
    <nav class="flex items-center justify-between flex-wrap bg-green-200 p-6">
      <div class="flex items-center flex-no-shrink text-blue-400 mr-6">
         <span class="font-bold text-2xl tracking-tight">MOVIE TRACKER</span>
      </div>
      <div class="block sm:hidden">
        <button @click="toggle" class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="open ? 'block': 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="text-sm sm:flex-grow">

        </div>

        <div v-if="!authState.loggedIn">
          <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
            <router-link :to="{name:'register'}">Register</router-link>
          </a>
          <a href="#responsive-header" class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white">
            <router-link :to="{name:'login'}">Login</router-link>
          </a>


        </div>

<!--        admin-->
        <div v-if="user.role_id ==1">



          <div v-if="authState.loggedIn">
            <a href="#responsive-header" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
              <i class="fa fa-users text-blue-400 "></i>
              <router-link :to="{name:'users'}">Users</router-link>
            </a>
            <a href="#responsive-header" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
              <i class="fa fa-list-check text-blue-400"></i>
              <router-link :to="{name:'genres'}">Genres</router-link>
            </a>
            <a href="#responsive-header" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
              <i class="fa fa-video text-blue-400"></i>
              <router-link :to="{name:'movies'}">Movies</router-link>
            </a>
            <a href="#responsive-header" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white">
              <i class="fa fa-user text-blue-400"></i> {{user.name}}
            </a>

          <a href="#"  @click.prevent="logOutUser" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded  text-2xl hover:text-teal hover:bg-maroon mt-4 sm:mt-0">
              <i class=" fa fa-signout"></i>Logout
          </a>
            </div>
        </div>



<!--        //user-->



        <div v-if="user.role_id ==2">



          <div v-if="authState.loggedIn">
            <a href="#responsive-header" @click.prevent="" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
              <i class="fa fa-building text-blue-400"></i>
              <router-link :to="{name:'user-dashboard'}">Dashboard</router-link>
            </a>
            <a href="#responsive-header" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
              <i class="fa fa-video text-blue-400"></i>
              <router-link :to="{name:'user-movies'}">Movies</router-link>
            </a>
            <a href="#responsive-header" @click.prevent="" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
              <i class="fa fa-heart text-red-500"></i>
              <router-link :to="{name:'user-favourites'}"> My Favorites</router-link>
            </a>
            <a href=""  @click.prevent="" class="  text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4">
              <i class="fa fa-rocket text-blue-400"></i>
              <router-link :to="{name:'user-subscriptions'}">My Subscriptions</router-link>
            </a>
            <a href="#responsive-header" @click.prevent="" class=" text-2xl no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white">
              <i class="fa fa-user text-blue-400"></i> {{user.name}}
            </a>

            <a href="#"  @click.prevent="logOutUser" class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded  text-2xl hover:text-teal hover:bg-maroon mt-4 sm:mt-0">
              <i class=" fa fa-signout"></i>Logout
            </a>
          </div>
        </div>




      </div>
    </nav>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "NavBar",

  data(){
    return{
      open: false,
    }

  },
  computed: {
    ...mapGetters('auth', {
      authState: 'authState',
      user: 'user'
    })
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
    ,
    logOutUser(){
      this.$router.push('/logout');
      this.$store.dispatch('auth/logout');
    }
  }

}
</script>

<style scoped>

</style>