<template>
  <div>
    <div class="max-w-2xl mx-auto">


      <button
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button" @click="toggleAddUserForm">
        <i class="fa fa-plus "></i> ADD USER
      </button>



            <form  v-if="isShowAddUserForm" class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">CREATE NEW USER</h3>
              <div>
                <label for="name" class="text-sm font-medium text-gray-900 block mb-2 ">Names</label>
                <input type="name" name="name" id="name"
                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       placeholder="name" required v-model="form.name">
              </div>

              <div>
                <label for="email" class="text-sm font-medium text-gray-900 block mb-2 ">Email</label>
                <input type="email" name="email" id="email"
                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       placeholder="email@gmail.com" required v-model="form.email">
              </div>

              <div>
                <label for="tel" class="text-sm font-medium text-gray-900 block mb-2 ">Phone Number</label>
                <input type="tel" name="email" id="tel"
                       class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                       placeholder="email@gmail.com" required v-model="form.tel">
              </div>

              <button type="submit"  @click.prevent="createUser()"
                      class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                SUBMIT
              </button>

            </form>
</div>


    <div class="container mx-auto">
      <div class="flex flex-col">
        <div class="w-full">
          <div class="p-4 border-b border-gray-200 shadow">
            <!-- <table> -->
            <table id="dataTable" class="p-4">
              <thead class="bg-gray-50">
              <tr>
                <th class="p-8 text-xs text-gray-500">
                  Name
                </th>
                <th class="p-8 text-xs text-gray-500">
                  Email
                </th>
                <th class="p-8 text-xs text-gray-500">
                  Phone Number
                </th>
                <th class="p-8 text-xs text-gray-500">
                  Created_at
                </th>

                <th class="px-6 py-2 text-xs text-gray-500">
                  Delete
                </th>
              </tr>
              </thead>
              <tbody class="bg-white">
              <tr class="whitespace-nowrap" v-for="(user, index) in users">

                <td class="px-6 py-4 text-center">
                  <div class="text-sm text-gray-900">
                    {{user.name}}
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="text-sm text-gray-500">
                    {{user.email}}
                  </div>
                </td>

                <td class="px-6 py-4 text-center">
                  <div class="text-sm text-gray-900">
                    {{user.tel}}
                  </div>
                </td>

                <td class="px-6 py-4 text-sm text-center text-gray-500">

                  {{moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}}
                </td>

                <td class="px-6 py-4 text-center">
                  <a href="#" class="px-4 py-1 text-sm text-white bg-red-400 rounded" @click.prevent="deleteUser(user)">Delete</a>
                </td>
              </tr>


              </tbody>
            </table>
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
  name: "Users",

  data() {
    return {
      users: [],
      isShowAddUserForm:false,
      form: {
        name: '',
        email: '',
        tel: '',
      },

    }
  },

  beforeMount() {
    axios.get('http://localhost:3000/api/v1/users/')
        .then((response) => {
          this.users=response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log('error adding post');

        })

  },

  methods: {
    createUser() {
      axios.post('http://localhost:3000/api/v1/users/create/', this.form).then((response) => {
        this.users.unshift(response.data.user);
        Swal.fire({
          title: 'Success!',
          text: 'User added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }).catch((error) => {

        console.log(error);
      })
    },

    deleteUser(user) {
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
          axios.delete(`http://localhost:3000/api/v1/users/delete/${user.id}`).then((response) => {

            if (response.status == 200) {
              console.log(response);
               this.users = this.users.filter(response => response.id !== user.id)
              Swal.fire('Deleted!', 'User has been deleted.', 'success')
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
    toggleAddUserForm(){
      this.isShowAddUserForm=!this.isShowAddUserForm;

    },

  }

}


</script>

<style scoped>

</style>