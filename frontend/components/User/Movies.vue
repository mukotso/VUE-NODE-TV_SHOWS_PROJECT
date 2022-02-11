<template>

  <div>




    <div>
      <form class="m-4 flex justify-center">
        <input type="search" class="rounded-l-lg p-4 border-t mr-0  text-gray-800 border-gray-200 bg-white" v-model="searchQuery" placeholder="movie name"/>
        <button class="px-8 rounded-r-lg bg-green-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">SEARCH</button>
      </form>
    </div>



    <div class="grid lg:grid-cols-4">
      <div v-for="(movie ,index) in searchedMovies" >

        <div class="w-full p-2 lg:w-100">
          <div class="p-8 bg-white rounded shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">{{movie.name}}</h2>

            <iframe width="100%" height="215" :src="movie.trailer_link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            <div id="movieBtn">
              <router-link :to="{name:'user-movieDetails', params: { id: movie.id }}">

                <button class=" movieBtn block text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  DETAILS
                </button>

              </router-link>

              <button  @click="addToFavourites(movie)" class=" movieBtn block text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
              <i class="fa fa-heart"></i>  ADD TO FAVOURITES
              </button>


            </div>
          </div>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
import {mapGetters} from "vuex";
import StarRating from 'vue-star-rating'
const axios = require('axios');
const Swal = require('sweetalert2');
export default {
  name: "Movies",
  data() {
    return {
      movies: [],
      searchQuery:'',
      isSearching :false,
      searchedMovies:[],

    }

  },
  components: {
    StarRating
  },
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    }),

  },

  watch: {
    searchQuery: function(query) {
      this.isSearching = true;
      var vm=this;

      //set a function to run a function after 500ms
      setTimeout(function() {
        vm.searchedMovies = vm.movies.filter(movie => movie.name.includes(query))
        vm.isSearching=false;
      }, 500);
    }
  },

  beforeMount() {
    axios.get('http://localhost:3000/api/v1/movies')
        .then((response) => {
          this.movies=response.data;
          this.searchedMovies=response.data;
          console.log(response.data);
        })
        .catch( () =>{
          console.log(error);

        })

  },

  methods:{
    addToFavourites(movie){
      axios.post(`http://localhost:3000/api/v1/favourites/make-favourite/${movie.id}`, {'userId' : this.user.id})
    .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Movie added to Favourites successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
      }).catch((error) => {
        console.log('An error occured');
        Swal.fire({
          title: 'error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'TRY AGAIN'
        })
      })

    }
  }

}
</script>

<style scoped>
#video{
  font-size: 450%;
  display:flex;
  justify-content: center;
  color:lightseagreen;
}
#movieBtn{
  display:flex;
  margin:5px;
}
.movieBtn{
  margin: 10px;
}
.fa-heart{
  color:red;
  font-size: 20px;
}
</style>