<template>
  <div>
    <h1 class="text-5xl font-medium leading-tight mt-0 mb-2 text-blue-900">
      <the-header></the-header>
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>
import UserLogin from "./UserLogin";
export default {
  components: {UserLogin}
}
</script>


<style scoped>

</style>