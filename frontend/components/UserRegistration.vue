<<template>
  <div>

<!--    <form >-->

<!--      &lt;!&ndash; <text-field type="text" placeholder="Username" v-model="username"/> &ndash;&gt;-->
<!--      <input class="m-5 sm:w-1 md:w-1/2 text-black  border-gray-400  hover:bg-gray-200 border-black-200 rounded py-3 px-4 mb-5" type="text" id="name" placeholder="Full names" v-model="name"/>-->
<!--      <span class="usernameError"></span><br>-->
<!--      <input class="m-5 sm:w-1 md:w-1/2 text-black  border-gray-400  hover:bg-gray-200 border-black-200 rounded py-3 px-4 mb-5" type="password" id="password" placeholder="Password" v-model="password"/>-->
<!--      <br>-->

<!--      <input class="m-5 sm:w-1 md:w-1/2 text-black  border-gray-400  hover:bg-gray-200 border-black-200 rounded py-3 px-4 mb-5" type="username" id="username" placeholder="Username" v-model="username"/>-->
<!--      <br>-->
<!--      <input class="m-5 sm:w-1 md:w-1/2 text-black  border-gray-400  hover:bg-gray-200 border-black-200 rounded py-3 px-4 mb-5" type="text" id="address" placeholder="address" v-model="address"/>-->
<!--      <br>-->
<!--      <input class="m-5 sm:w-1 md:w-1/2 text-black  border-gray-400  hover:bg-gray-200 border-black-200 rounded py-3 px-4 mb-5" type="number"id="id_number" placeholder="id Number" v-model="id_number"/>-->
<!--      <br>-->
<!--      <button id="btnLogin" class=" mr-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">-->
<!--        <router-link :to="{name:'login'}">Login</router-link>-->
<!--      </button>-->
<!--      <button id="registerBtn"  class="mb-10  ml-30 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">-->
<!--        Register-->
<!--      </button>-->



<!--    </form>-->
    <main class="sm:container sm:mx-auto sm:max-w-lg sm:mt-10">
      <div class="flex">
        <div class="w-full">
          <section class="flex flex-col break-words bg-white sm:border-1 sm:rounded-md sm:shadow-sm sm:shadow-lg">

            <header class="font-semibold bg-gray-200 text-gray-700 py-5 px-6 sm:py-6 sm:px-8 sm:rounded-t-md">
              USER REGISTRATION FORM
            </header>

            <form class="w-full px-6 space-y-6 sm:px-10 sm:space-y-8" method="POST">

              <div class="flex flex-wrap">
                <label  class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                  Full Names
                </label>

                <input  type="text" class="form-input w-full"
                       name="name"  required autocomplete="name" autofocus v-model="form.name">

              </div>

              <div class="flex flex-wrap">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                  E-Mail Address
                </label>

                <input id="email" type="email"
                       class="form-input w-full" name="email"
                        required autocomplete="email" v-model="form.email">

              </div>

              <div class="flex flex-wrap">
                <label  class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                  Phone Number
                </label>

                <input id="tel" type="number" class="form-input w-full"
                       required  autofocus name="tel" v-model="form.tel">

              </div>



              <div class="flex flex-wrap">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                  Password
                </label>

                <input id="password" type="password"
                       class="form-input w-full" name="password"
                       required autocomplete="new-password" v-model="form.password">

              </div>

              <div class="flex flex-wrap">
                <label for="password-confirm" class="block text-gray-700 text-sm font-bold mb-2 sm:mb-4">
                  Confirm Password
                </label>

                <input id="password-confirm" type="password" class="form-input w-full"
                       name="password_confirmation" required autocomplete="new-password" v-model="form.passwordConfirm">
              </div>

              <div class="flex flex-wrap">
                <button type="submit" @click.prevent="createUser"
                        class="w-full select-none font-bold whitespace-no-wrap p-3 rounded-lg text-base leading-normal no-underline text-gray-100 bg-blue-500 hover:bg-blue-700 sm:py-4">
                  Register
                </button>

                <p class="w-full text-xs text-center text-gray-700 my-6 sm:text-sm sm:my-8">
                  Already have an account?
                  <a class="text-blue-500 hover:text-blue-700 no-underline hover:underline">
                    <router-link :to="{name:'login'}">Login</router-link>
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
  props:{
    formInfo:String
  },

  data() {
    return {
      form:{
        name:"",
        password:"",
        email:"",
        tel:"",
        passwordConfirm:""
      },

    };
  },


  methods:{
    createUser() {
      axios.post('http://localhost:3000/api/v1/auth/register', this.form)
          .then((response) => {
              this.$router.push('/login');

          })
          .catch(function (error) {
            // console.log(error.response.data.message);
            console.log('HAIKO');
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