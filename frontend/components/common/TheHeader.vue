<template>


  <header class="bg-blue-900 py-6">
    <div class="container mx-auto flex justify-between items-center px-6">
      <div>
        <a href="" class="text-lg font-semibold text-gray-100 no-underline">
          MOVIE TRACKER
        </a>
      </div>

        <div class="topnav" id="myTopnav">
            <a class="no-underline hover:underline" href="">Menu</a>
            <a href="#"></a>
          <a class="no-underline hover:underline">
            <router-link :to="{name:'login'}">Login</router-link>
          </a>
          <a class="no-underline hover:underline">
            <router-link :to="{name:'register'}">Register</router-link>
          </a>

          <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
          </a>
        </div>
    </div>
  </header>


</template>

<script>
export default {
  name: "TheHeader"
}

methods:{
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}
</script>

<style scoped>
/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 22px;
  font-weight: 400;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}


.topnav .icon {
  display: none;
}

@media screen and (max-width: 700px) {
  .topnav a:not(:first-child) {
    display: none;
  }

  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 700px) {
  .topnav.responsive {
    position: relative;
  }

  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }

  .topnav.responsive a {
    float: none;
    display: block;
    text-align: center;
  }
}
</style>