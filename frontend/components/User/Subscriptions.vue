<template>

  <div>








    <div class="grid lg:grid-cols-4">
      <div v-for="(movie ,index) in movies" >

        <div class="w-full p-2 lg:w-100">
          <div class="p-8 bg-white rounded shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">{{movie.name}}</h2>
            <!--        <img src="assests/images/movie3.jpeg" width="100%" height="15%">-->
            <!--        <div id="video">-->
            <!--          <i class="fa fa-video"></i>-->
            <!--        </div>-->
            <iframe width="100%" height="215" src="https://www.youtube.com/embed/EhCYHcKzUWg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            <div id="movieBtn">
              <router-link :to="{name:'user-movieDetails', params: { id: movie.id }}">

                <button class=" movieBtn block text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  MORE DETAILS
                </button>
              </router-link>


            </div>
          </div>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
import {mapGetters} from "vuex";

const axios = require('axios');
const Swal = require('sweetalert2');
export default {
  name: "Movies",
  data() {
    return {
      movies: null,

    }

  },
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },


  beforeMount() {
    axios.post('http://localhost:3000/api/v1/subscriptions/my-subscriptions' ,{userId: this.user.id})
        .then((response) => {
          this.movies=response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);

        })

  },

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
</style>