<template>

  <div>


    <div class="max-w-2xl mx-auto">

      <!-- Modal toggle -->
      <button
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button" @click="showAddMovieForm()">
        <i class="fa fa-plus "></i> NEW MOVIE
      </button>


            <form v-if="isShowAddMovieForm" @submit.prevent=" isEdit ? updateMovie(): createMovie()" class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action=""  method="post">

              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                {{isEdit ? "UPDATE MOVIE DETAILS": "CREATE A NEW MOVIE"}}
              </h3>
              <div>
                <label class="text-sm font-medium text-gray-900 block mb-2 ">Name</label>
                <input type="name" name="name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       placeholder="name" required v-model="form.name">
              </div>


              <div>
                <label class="text-sm font-medium text-gray-900 block mb-2 ">Genre</label>
                <select v-model="form.genre_id" id="genre"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option  v-model="genre_id" v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                </select>
              </div>



              <div>
                <label class="text-sm font-medium text-gray-900 block mb-2 ">Trailer Link</label>
                <input type="text" name="trailer_link"
                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       placeholder="name" required v-model="form.trailer_link">
              </div>

              <div>
                <label class="text-sm font-medium text-gray-900 block mb-2 ">Description</label>
                <textarea type="description" name="description" id="description"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="egenre description" required v-model="form.description" rows="5"> </textarea>
              </div>


              <button type="submit"
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {{isEdit ? "UPDATE MOVIE DETAILS": "ADD MOVIE"}}
              </button>

            </form>


    </div>


    <div class="grid lg:grid-cols-4">
      <div v-for="(movie ,index) in movies">

        <div class="w-full p-2 lg:w-100">
          <div class="p-8 bg-white rounded shadow-md">
            <h2 class="text-2xl font-bold text-gray-800">{{ movie.name }}</h2>
            <iframe width="100%" height="215" :src="movie.trailer_link" title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>

            <div id="movieBtn">
              <router-link :to="{name:'movieDetails', params: { id: movie.id }}">

                <button
                    class=" movieBtn block text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  MORE DETAILS
                </button>
              </router-link>

              <button @click="editMovie(movie)"
                  class=" movieBtn block text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                EDIT
              </button>

              <button
                  class="movieBtn block text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click.prevent="deleteMovie(movie)">
                DELETE
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
const axios = require('axios');
const Swal = require('sweetalert2');

export default {
  name: "Movies",

  data() {
    return {
      movies: null,
      genres: null,
      isShowAddMovieForm:false,
      isEdit:false,
      form: {
        name: '',
        description: '',
        trailer_link: '',
        genre_id: '',
        id:'',
      }
    }

  },


  beforeMount() {
    axios.get('http://localhost:3000/api/v1/movies')
        .then((response) => {
          this.movies = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);

        })

    axios.get('http://localhost:3000/api/v1/genres')
        .then((response) => {
          this.genres = response.data;
        })
        .catch(function (error) {
          console.log(error);

        })

  },

  methods: {

    updatePhoto(files) {
      if (!files.length) return;

      // Store the file data
      this.poster = {
        name: files[0].name,
        data: files[0]
      };
    },
    showAddMovieForm(){
      this.isShowAddMovieForm = ! this.isShowAddMovieForm;
    },
    createMovie() {
      axios.post('http://localhost:3000/api/v1/movies/create/', this.form).then((response) => {
        this.movies.unshift(response.data.movie);
        Swal.fire({
          title: 'Success!',
          text: 'Movie added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }).catch((error) => {
        console.log(error);
      })
      this.isShowAddMovieForm=false;
    },

    updateMovie() {
      let id=this.form.id;
      axios.put(`http://localhost:3000/api/v1/movies/update/${id}`, this.form).then((response) => {
        console.log(response.data.movie);
        this.movies = this.movies.map((movie) => {
          if (movie.id === id) {
            return response.data.movie;
          }
          return movie;
        });
        Swal.fire({
          title: 'Success!',
          text: 'Movie Details Updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }).catch((error) => {
        console.log(error);
      })
      this.isShowAddMovieForm=false;
      this.isEdit=true;
    },
    editMovie(movie){
      this.isEdit=true;
      this.form={...movie};
      this.isShowAddMovieForm=true;

    },

    deleteMovie(movie) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3000/api/v1/movies/delete/${movie.id}`).then((response) => {

            if (response.status == 200) {
              console.log(response);
              this.movies = this.movies.filter(response => response.id !== movie.id)
              Swal.fire('Deleted!', 'MOVIE has been deleted.', 'success')
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
            }
          }).catch((error) => {
            console.log('An error occured');
          })
        }
      })

    },


  }
}
</script>

<style scoped>
#video {
  font-size: 450%;
  display: flex;
  justify-content: center;
  color: lightseagreen;
}

#movieBtn {
  display: flex;
  margin: 5px;
}

.movieBtn {
  margin: 10px;
}
</style>