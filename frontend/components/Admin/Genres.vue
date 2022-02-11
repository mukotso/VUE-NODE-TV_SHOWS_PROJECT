<template>
<div>


  <div class="max-w-2xl mx-auto">


    <button
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button" @click="toggleAddGenreForm">
      <i class="fa fa-plus "></i> ADD GENRE
    </button>



          <form v-if="isShowAddGenreForm" class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="#">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">{{isEditGenre ? "UPDATE GENRE DETAILS" : "CREATE A MOVIE GENRE"}}</h3>
            <div>
              <label for="name" class="text-sm font-medium text-gray-900 block mb-2 ">Name</label>
              <input type="name" name="name"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                     placeholder="name" required v-model="form.name">
            </div>

            <div>
              <label  class="text-sm font-medium text-gray-900 block mb-2 ">Description</label>
              <textarea type="description" name="description" id="description"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="egenre description" required v-model="form.description" rows="5"> </textarea>
            </div>



            <button type="submit" @click.prevent="isEditGenre ? updateGenre() : createGenre()"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {{isEditGenre ? "UPDATE DETAILS" : "SUBMIT"}}
            </button>

          </form>


  </div>







  <section class="container px-6 py-4 mx-auto">
    <div class="grid gap-6 mb-8 md:grid-cols-1 lg:grid-cols-2">

      <div v-for="(genre ,index) in genres">
      <div class="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg shadow-sm ">
        <div id="body" class="flex flex-col ml-5">
          <h4 id="name" class="text-xl font-semibold mb-2">{{genre.name}}</h4>
          <p id="job" class="text-gray-800 mt-2">{{genre.description}}</p>
          <h3><i class="fa fa-video">{{genre.movie}}</i></h3>
          <div class="flex mt-5">

              <button @click="editGenre(genre)"
                      class=" m-3 block text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                EDIT
              </button>

              <button
                  class="m-3 block text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click.prevent="deleteGenre(genre)">
                DELETE
              </button>
          </div>
        </div>
      </div>
      </div>


    </div>
  </section>
</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Genres",

  data(){
    return{
      genres:[],
      isShowAddGenreForm:false,
      isEditGenre:false,
      form: {
        'name': '',
        description: '',
        id:'',
      }
    }

  },
  beforeMount() {
    axios.get('http://localhost:3000/api/v1/genres')
        .then((response) => {
          console.log(response);
          this.genres=response.data;
        })
        .catch(function (error) {
          console.log('error adding post');

        })


  },

  methods: {
    createGenre() {
      axios.post('http://localhost:3000/api/v1/genres/create/', this.form).then((response) => {
        this.genres.unshift(response.data.genre);
        Swal.fire({
          title: 'Success!',
          text: 'Genre added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }).catch((error) => {

        console.log(error);
      })
    },

    updateGenre() {
      let id=this.form.id;
      axios.put(`http://localhost:3000/api/v1/genres/update/${id}`, this.form).then((response) => {
        console.log(response.data);
        if(response.status===200){
          this.genres = this.genres.map((genre) => {
            if (genre.id === id) {
              return response.data.genre;
            }
            return genre;
          });
        }
        Swal.fire({
          title: 'Success!',
          text: 'Genre Details Updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }).catch((error) => {
        console.log(error);
      })
      this.isShowAddGenreForm=false;
    },

    deleteGenre(genre) {
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
          axios.delete(`http://localhost:3000/api/v1/genres/delete/${genre.id}`).then((response) => {

            if (response.status == 200) {
              console.log(response);
              this.genres = this.genres.filter(response => response.id !== genre.id)
              Swal.fire('Deleted!', 'Genre has been deleted.', 'success')
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

    toggleAddGenreForm(){
      this.isShowAddGenreForm =! this.isShowAddGenreForm;
    },
    editGenre(genre){
      this.isEditGenre=true;
      this.isShowAddGenreForm=true;
      this.form={...genre};
    }

  }

}
</script>

<style scoped>

</style>