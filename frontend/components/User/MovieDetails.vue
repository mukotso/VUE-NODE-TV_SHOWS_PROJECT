<template>
  <div>
    <div class=" container mx-auto grid  sm:grid-cols-3 gap-4">
      <div class="col-span-2 ...">
        <div class="w-full p-2 lg:w-100">
          <div class="p-8 bg-white rounded shadow-md">
            <div class="flex justify-between">
              <h2 class="text-2xl font-bold text-gray-800">{{movieDetails.name}}</h2>

              <star-rating read-only=true v-model="rating"></star-rating>

            </div>
            <iframe width="560" height="315" :src="movieDetails.trailer_link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h2><b>Description</b></h2>
            <p class="mb-5">{{movieDetails.description}}</p>
            <div class="flex" >
              <star-rating @rating-selected ="setRating"></star-rating>
              <button @click="rateMovie(movieDetails)" class=" mx-5  block text-white bg-green-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                ">RATE MOVIE</button>
            </div>
          </div>
        </div>
      </div>
      <div class="...">

        <div class="w-full p-2 lg:w-100">
          <div class="p-8 bg-white rounded shadow-md bg-blue-100">
            <h1 v-if="movieDetails.episodes.length >= 1">{{movieDetails.episodes.length}}</h1>
            <h1 v-else>0</h1>
            <h2 class="text-2xl font-bold text-gray-800">Episodes</h2>
            <div>
              <i class="fa fa-video"></i>
            </div>
          </div>

        </div>

        <div class="w-full p-2 lg:w-100">
          <div class="p-8 bg-white rounded shadow-md  bg-green-50">
            <h3>Get Notified Whenever a new Episode is Added</h3>
            <br>
            <div>
              <button   @click="subscribeToMovie(movieDetails)"
                  class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button" >
                <i class="fa fa-rocket"></i> SUBSCRIBE
              </button>
            </div>
          </div>
        </div>


        <div class="w-full p-2 lg:w-100">
          <div class="p-8 bg-white rounded shadow-md bg-blue-200 bg-gradient-to-r">
            <h2 class="text-2xl font-bold text-gray-800">FAVOURITE</h2>
            <div>
              <h2>Add Movie to your Favourite List for easy access and follow up</h2>
              <br>
              <button  @click="addToFavourites(movieDetails)"
                  class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button" >
                <i class="fa fa-heart"></i> ADD TO FAVOURITE
              </button>
            </div>
          </div>
        </div>


          </div>
        </div>


    <div class=" mt-5 flex justify-around">
      <h1  :class="isShowActors ? 'active' : 'tabs' " @click="toggleShowActors">ACTORS</h1>

      <h2 :class="isShowEpisodes ? 'active' : 'tabs' " @click="toggleShowEpisodes">EPISODES</h2>

      <h2 :class="isShowComments ? 'active' : 'tabs'  " @click="toggleShowComments">COMMENTS</h2>

    </div>
    <div v-if="isShowActors">
      <template v-if="movieDetails.actors.length > 0">

        <div class="grid lg:grid-cols-6">
          <div v-for="(actor ,index) in movieDetails.actors" class="w-full p-2 lg:w-100">
            <div class="p-8 bg-white rounded shadow-md">
              <div class="h-32 w-32">
                <img src="https://cdn.tuk.dev/assets/photo-1564061170517-d3907caa96ea.jfif" alt="User pic" role="img" class="rounded-full object-cover h-full w-full shadow-md" />

              </div>
              <h1 class="font-bold text-3xl text-center mb-1">{{actor.name}}</h1>
              <p class="text-gray-800 text-sm text-center">{{actor.description}}</p>
            </div>
          </div>
        </div>


      </template>

      <template v-else>
        <button class="w-full  container mx-40 bg-green-200 m-20 p-20 ">NO ACTORS AVAILABLE</button>
      </template>

    </div>
    <div v-if="isShowEpisodes">
      <template v-if="movieDetails.episodes.length >= 1">
        <div class="grid lg:grid-cols-4">
          <div v-for="(movieEpisode ,index) in movieDetails.episodes" class="w-full p-2 lg:w-100">
            <div class="p-8 bg-white rounded shadow-md">
              <h2 class="text-2xl font-bold text-gray-800">{{movieEpisode.description}}</h2>

              <iframe width="100%" height="215" :src="movieEpisode.trailer_link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <button class="w-full  container mx-40 bg-green-200 m-20 p-20 ">NO EPISODES AVAILABLE</button>
      </template>
    </div>

    <div v-if="isShowComments">
      <template  v-if="movieDetails.comments.length >= 1">
        <div v-for="(comment , index) in movieDetails.comments"  class="w-1/2 mx-auto  p-2 lg:w-100">
          <div class="p-8 bg-green-100 rounded shadow-md">
            <p class="text-gray-600">{{comment.comment}}</p>
            <p class="text-blue-500">{{comment.createdAt | formatDate}}</p>
            <p class="text-green-600"> <i>By {{comment.user.name}}</i></p>

          </div>
        </div>
        <form  @submit.prevent="commentToMovie(movieDetails)" class=" w-1/2 mx-auto space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="">
          <div>
            <label class="text-sm font-medium text-gray-900 block mb-2 mt-2 ">Comment Message</label>
            <textarea type="description" name="description"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Comment" required v-model="commentMessage" rows="5"> </textarea>
          </div>

          <button type="submit"
                  class="w-1/4 mx-30  text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            SEND
          </button>
        </form>
      </template>
      <template v-else>

        <form  @submit.prevent="commentToMovie(movieDetails)" class=" w-1/2 mx-auto space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="">
          <div>
            <label class="text-sm font-medium text-gray-900 block mb-2 mt-2 ">Comment Message</label>
            <textarea type="description" name="description"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Comment" required v-model="commentMessage" rows="5"> </textarea>
          </div>

          <button type="submit"
                  class="w-1/4 mx-30  text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            SEND
          </button>
        </form>
      </template>
    </div>


  </div>
</template>

<script>

import axios from "axios";
import Swal from "sweetalert2";
import {mapGetters} from "vuex";

import StarRating from 'vue-star-rating'
export default {
  name: "MovieDetails",


  data(){
    return{
      movieDetails:{},
      rating:0,
      selectedRating:1,
      isShowRatingStar:false,
      isAddCommentForm:false,
      isShowActors:true,
      isShowEpisodes:false,
      isShowComments:false,
      commentMessage:"",
      form: {
        name: '',
        email: '',
        tel: '',
      },
    }

  },

  components: {
    StarRating
  },

  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },

  beforeMount() {
    let movieId=this.$route.params.id;
    axios.get(`http://localhost:3000/api/v1/movies/${movieId}`)
        .then((response) => {
          this.movieDetails=response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);

        })


  },

  methods:{
    addToFavourites(movieDetails){
      axios.post(`http://localhost:3000/api/v1/favourites/make-favourite/${movieDetails.id}`, {'userId' : this.user.id})
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

    },

    rateMovie(movieDetails){
      axios.post(`http://localhost:3000/api/v1/ratings/rate-movie/${movieDetails.id}`, {'rating' : this.selectedRating, userId:this.user.id})
          .then((response) => {
            if (response.status == 200) {
              Swal.fire({
                title: 'Success!',
                text: 'You have successfully rated this movie',
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
       this.isShowRatingStar=false;
    },

    setRating: function(rating){
      this.selectedRating= rating;
    },

    toggleShowStarRating(rating){
      this.isShowRatingStar= ! this.isShowRatingStar;
    },
    toggleAddCommentForm(){
      this.isAddCommentForm= !this.isAddCommentForm;
    },
    toggleShowActors(){
      this. isShowEpisodes=false;
      this.isShowComments=false;
      this.isShowActors=true;
    },

    toggleShowEpisodes(){
      this.isShowEpisodes=true;
      this.isShowComments=false;
      this.isShowActors=false;
    },

    toggleShowComments(){
      this. isShowEpisodes=false;
      this.isShowActors=false;
      this.isShowComments=true;
    },

        subscribeToMovie(movieDetails){
       axios.post(`http://localhost:3000/api/v1/subscriptions/subscribe/${movieDetails.id}`, {'userId' : this.user.id})
      .then((response) => {
        if (response.status == 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Movie added to your subscriptions successfully',
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

},


    commentToMovie(movieDetails){
      axios.post(`http://localhost:3000/api/v1/comments/make-comment/${movieDetails.id}`, { 'userId' : this.user.id ,'comment':this.commentMessage})
          .then((response) => {
            if (response.status == 200) {
              Swal.fire({
                title: 'Success!',
                text: 'Comment Saved Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            }
          }).catch((error) => {
        Swal.fire({
          title: 'error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'TRY AGAIN'
        })
      })

    },




  },
}
</script>

<style scoped>

.fa-plus{
  background-color: lightseagreen;
  border-radius: 50%;
  color:white;
  padding: 3%;
}


.active{
  color:lightseagreen;
  font-size: 20px;
  font-weight: bolder;
  border-bottom: 2px solid darkgreen;
}
.tabs{
  color:black;
  font-size: 20px;
  font-weight: bolder;

}

.tab {
  overflow: hidden;
}
.tab-content {
  max-height: 0;
  transition: all 0.5s;
}
input:checked + .tab-label .test {
  background-color: #000;
}
input:checked + .tab-label .test svg {
  transform: rotate(180deg);
  stroke: #fff;
}
input:checked + .tab-label::after {
  transform: rotate(90deg);
}
input:checked ~ .tab-content {
  max-height: 100vh;
}
</style>