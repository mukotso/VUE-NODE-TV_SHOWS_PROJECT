<template>
  <div>
    <h1>LOGIN FORM</h1>
    <form>
      <input
          className="m-5 sm:w-1 md:w-1/2 text-black  border-gray-400  hover:bg-gray-200 border-black-200 rounded py-3 px-4 mb-5"
          type="text" id="username" placeholder="Username" v-model="username"/>
      <span className="usernameError"></span><br>
      <input
          className="m-5 sm:w-1 md:w-1/2 text-black  border-gray-400  hover:bg-gray-200 border-black-200 rounded py-3 px-4 mb-5"
          type="password" id="password" placeholder="Password" v-model="password"/>
      <br>


      <button @click.prevent="login" id="loginBtn"
              class=" mr-20 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        LOGIN
      </button>

      <button id="registerBtn"
              className="mb-10  ml-30 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        <router-link :to="{name:'register'}">Register</router-link>
      </button>

    </form>

  </div>
</template>

<script>

export default {
  data() {
    return {
      username: "",
      password: "",
      isUsernameSet: false,
      isPasswordSet: false
    };
  },
};


</script>

<style scoped>

input {
  border: 1px solid #ccc;
}

</style>