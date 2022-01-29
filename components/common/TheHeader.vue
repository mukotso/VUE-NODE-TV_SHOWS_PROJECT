<template>
  <div class="navigation">
    <div>
      <router-link to="/">Home</router-link>
      <router-link :to="{name:'login'}">Login</router-link>
      <router-link :to="{name:'register'}">Register</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader"
}
</script>

<style scoped>
.navigation{
  background-color:black;
  color:white;
  font-size:18px;
  width:100%  !important;
  padding: 40px;
  font-size:30px;
}
</style>