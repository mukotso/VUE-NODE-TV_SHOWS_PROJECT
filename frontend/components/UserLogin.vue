<template>
  <div>


    <main class="sm:container sm:mx-auto sm:max-w-lg sm:mt-10">
      <div class="flex">
        <div class="w-full">
          <section class="flex flex-col break-words bg-white sm:border-1 sm:rounded-md sm:shadow-sm sm:shadow-lg">

            <header class="font-semibold bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
              Login
            </header>

            <form class="w-full px-6 space-y-6 sm:px-10 sm:space-y-8" method="POST" action="">


              <div class="flex flex-wrap">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                  E-Mail Address
                </label>

                <input id="email" type="email"
                       class="form-input w-full" name="email"
                        required autocomplete="email" autofocus  placeholder="Username" v-model="form.email">


              </div>

              <div class="flex flex-wrap">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                  Password
                </label>

                <input id="password" type="password"
                       class="form-input w-full"  name="password" placeholder="Password" v-model="form.password"
                       required>


              </div>


              <div class="flex flex-wrap">
                <button type="submit" id="loginBtn" @click.prevent="loginUser"
                        class="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-blue-500 hover:bg-blue-700 sm:py-4">
                  Login
                </button>

                <p class="w-full text-xs text-center text-gray-700 my-6 sm:text-sm sm:my-8">
                  Don't have an account?
                  <a class="text-blue-500 hover:text-blue-700 no-underline hover:underline" >
                    <router-link :to="{name:'register'}">Register</router-link>
                  </a>
                </p>
              </div>
            </form>

          </section>
        </div>
      </div>
    </main>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form:{
        email: "",
        password: "",
      },

      isUsernameSet: false,
      isPasswordSet: false
    };
  },

methods:{
    loginUser() {
      axios.post('http://localhost:3000/api/v1/auth/login/', this.form)
          .then((response) => {
            if((response.data.loggedInUser.role_id) ==1){
              this.$store.dispatch('auth/login', response.data);
              this.$router.push('/admin/movies');
            }
            if((response.data.loggedInUser.role_id) ==2){
              this.$store.dispatch('auth/login', response.data);
              this.$router.push('/user/dashboard');
            }
          })
          .catch(function (error) {
            console.log(error.response.data.message);

          })

    }
},
};


</script>

<style scoped>

input, #loginBtn {
  border: 1px solid #ccc;
  height: 50px;
  border-radius:50px;
  padding-left:20px;
}
label{
  color: black;
  font-size: 18px;
}

</style>