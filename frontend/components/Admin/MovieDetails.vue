<template>
  <div>
  <div class=" container mx-auto grid  sm:grid-cols-3 gap-4">
    <div class="col-span-2 ...">
      <div class="w-full p-2 lg:w-100">
        <div class="p-8 bg-white rounded shadow-md">
          <div class="flex justify-between">
          <h2 class="text-2xl font-bold text-gray-800">{{movieDetails.name}}</h2>
            <h1> <i class="fa fa-star"></i> {{movieDetails.ratings.length}} </h1>
          </div>
          <img src="../../assets/images/movie3.jpeg" width="100%" height="15%">
          <iframe width="560" height="315" :src="movieDetails.trailer_link" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       <h2><b>Description</b></h2>
          <p>{{movieDetails.description}}</p>
          <star-rating @rating-selected ="setRating"></star-rating>
          <button @click="toggleShowNotificationForm"
              class=" mt-5  block text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            CREATE NOTIFICATION
          </button>
          <form v-if="isShowNotificationForm" @submit.prevent="dispatchNotifications()" class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="">
          <div>
            <label class="text-sm font-medium text-gray-900 block mb-2 mt-2 ">Notification Body</label>
            <textarea type="description" name="description"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Write the message to share here" required v-model="notificationMessage" rows="3"> </textarea>
          </div>

            <button type="submit"
                    class="w-full text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              DISPATCH NOTIFICATION TO SUBSCRIBERS
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="...">

      <div class="w-full p-2 lg:w-100 ">
        <div class="p-8 bg-white rounded shadow-md bg-blue-100">
          <h1>{{movieDetails.episodes.length}}</h1>
          <h2 class="text-2xl font-bold text-gray-800">Episodes</h2>
          <div>
            <i class="fa fa-video"></i>
          </div>
          <button @click="toggleEpisodeForm">ADD EPISODE</button>
         <i  class=" fa fa-plus"></i>

          <form v-if="isAddEpisode"  class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="#">
            <div>
              <label class="text-sm font-medium text-gray-900 block mb-2 ">Trailer Link</label>
              <input type="name" name="name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="name" required v-model="episodeForm.trailer_link">
            </div>

            <div>
              <label class="text-sm font-medium text-gray-900 block mb-2 ">Description</label>
              <textarea type="description" name="description" id="description"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="egenre description" required v-model="episodeForm.description" rows="3"> </textarea>
            </div>


            <button type="submit" @click.prevent="createEpisode()"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              SUBMIT
            </button>

          </form>
        </div>

      </div>

      <div class="w-full p-2 lg:w-100">
        <div class="p-8 bg-white rounded shadow-md bg-green-50">
          <h2 class="text-2xl font-bold text-gray-800">Subscribers</h2>
          <div>
            <i class="fa fa-rocket"></i>
            <h1>{{subscriptions.length}}</h1>
          </div>
        </div>
      </div>

      <div class="w-full p-2 lg:w-100">
        <div class="p-8 bg-white rounded shadow-md bg-blue-200 bg-gradient-to-r">
          <h1>{{movieDetails.actors.length}}</h1>
          <h2 class="text-2xl font-bold text-gray-800">Actors</h2>
          <div>
            <i class="fa fa-users"></i>
            <button @click="toggleActorForm">ADD ACTOR</button>
          </div>

          <form  v-if="isAddActor" class=" space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="#">
            <div>
              <label class="text-sm font-medium text-gray-900 block mb-2 ">Name</label>
              <input type="name" name="name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="name" required v-model="actorForm.name">
            </div>



            <div>
              <label class="text-sm font-medium text-gray-900 block mb-2 ">Description</label>
              <textarea type="description" name="description"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="egenre description" required v-model="actorForm.description" rows="3"> </textarea>
            </div>


            <button type="submit" @click.prevent="createActor()"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              SUBMIT
            </button>

          </form>

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
                   <template v-if="movieDetails.comments.length > 0">
                     <div v-for="(comment , index) in movieDetails.comments"  class="w-full p-2 lg:w-100">
                       <div class="p-8 bg-white rounded shadow-md">
                         <p class="text-gray-600">{{comment.description}}</p>
                         <p class="text-gray-600">{{comment.createdAt}}</p>

                       </div>
                     </div>
                   </template>
                    <template v-else>
                      <button class="w-full  container mx-40 bg-green-200 m-20 p-20 ">NO COMMENTS AVAILABLE</button>
                    </template>
                  </div>


                      </div>



                                  </template>

                                  <script>
                                  import axios from "axios";
                                  import Swal from "sweetalert2";
                                  import StarRating from 'vue-star-rating'
                                  export default {
                                    name: "MovieDetails",

                                    components: {
                                      StarRating
                                    },
                                    data(){
                                      return{
                                        movieDetails:'',
                                        isAddEpisode:false,
                                        isAddActor:false,
                                        isShowEpisodes:false,
                                        isShowComments:false,
                                        isShowActors:true,
                                        isShowNotificationForm:false,
                                        notificationMessage:'',
                                        subscriptions:'',
                                        rating:'',
                                        episodeForm: {
                                          trailer_link: '',
                                          description: '',
                                        },
                                        actorForm: {
                                          name: '',
                                          description: '',
                                        },
                                      }

                                    },

                                  beforeMount() {
                                      let movieId=this.$route.params.id;
                                    axios.get(`http://localhost:3000/api/v1/movies/${movieId}`)
                                        .then((response) => {
                                          // console.log(response);
                                          this.movieDetails=response.data;
                                          // console.log(response.data);
                                          console.log(this.movieDetails.episodes);
                                        })
                                        .catch(function (error) {
                                          console.log(error);

                                        })
                                  },
                                    mounted(){
                                      let movieId=this.$route.params.id;
                                      axios.get(`http://localhost:3000/api/v1/movies/subscriptions/${movieId}`)
                                          .then((response) => {
                                            this.subscriptions=response.data;

                                          })
                                          .catch(function (error) {
                                            console.log(error);

                                          })
                                    },
                                    methods:{
                                      toggleEpisodeForm(){
                                       this. isAddEpisode=! this.isAddEpisode;
                                        this.isAddActor=false;
                                      },
                                      toggleShowNotificationForm(){
                                          this.isShowNotificationForm= ! this.isShowNotificationForm;
                                      },

                                      toggleActorForm(){
                                        this. isAddActor=! this.isAddActor;
                                        this.isAddEpisode=false;
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


                                      dispatchNotifications(){
                                        axios.post(`http://localhost:3000/api/v1/notifications/send-notification-to-subscribers/${this.movieDetails.id}`, {message:this.notificationMessage}).then((response) => {

                                          if(response.status==200) {
                                            Swal.fire({

                                              title: 'Success!',
                                              text: 'Notification Email added successfully',
                                              icon: 'success',
                                              confirmButtonText: 'Ok'
                                            })

                                          }

                                          this.isShowNotificationForm=false;
                                        }).catch((error) => {
                                          console.log(error);
                                        })
                                      },

                                      createEpisode(){
                                        axios.post(`http://localhost:3000/api/v1/episodes/create/${this.movieDetails.id}`, this.episodeForm).then((response) => {
                                          Swal.fire({
                                            title: 'Success!',
                                            text: 'Episode added successfully',
                                            icon: 'success',
                                            confirmButtonText: 'Ok'
                                          })
                                          this.isAddEpisode=false;
                                        }).catch((error) => {
                                          console.log(error);
                                        })
                                      },

                                      createActor(){
                                        axios.post(`http://localhost:3000/api/v1/actors/create/${this.movieDetails.id}`, this.actorForm).then((response) => {
                                          Swal.fire({
                                            title: 'Success!',
                                            text: 'Actor added successfully',
                                            icon: 'success',
                                            confirmButtonText: 'Ok'
                                          })
                                          this.isAddActor=false;
                                        }).catch((error) => {
                                          console.log(error);
                                        })
                                      },

                                    }
                                    }
                                  </script>

                                  <style scoped>

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
                                  .fa-plus{
                                    background-color: lightseagreen;
                                    border-radius: 50%;
                                    color:white;
                                    padding: 3%;
                                  }

                                  .fa-star{
                                    color: green;
                                    font-size: 40px;
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