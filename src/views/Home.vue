<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!isLoggedIn">Login</router-link><span v-if="!isLoggedIn"> | </span>
      <router-link to="/register" v-if="!isLoggedIn">Register</router-link><span v-if="!isLoggedIn"> | </span>
      <router-link to="/guessing" v-if="isLoggedIn"> Play Quiz</router-link><span v-if="isLoggedIn"> | </span>
    </div>
    <HomeComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeComponent from '@/components/HomeComponent.vue'; 

@Component({
  components: {
    HomeComponent,
  },
})
export default class Home extends Vue {
  get isLoggedIn() { 
    return this.$store.getters.isLoggedIn 
  }     
}
</script>
