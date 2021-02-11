<template>
    <header>
            <div class="navbar navbar-dark bg-primary shadow-sm">
                <div class="container">
                    <router-link class="navbar-brand d-flex align-items-center" to="/">
                        <strong>LumiQuiz</strong>
                    </router-link>
                    
                    <nav class="my-2 d-flex flex-column flex-md-row align-items-center navbar__items">
                        <router-link class="p-2" to="/guessing">Guessing</router-link>
                        <router-link class="p-2" to="/results">Results</router-link>
                        <a class="p-2" href="#" v-if="isLoggedIn" @click="logout">Logout</a>
                    </nav>
                </div>
            </div>
        </header>   
</template>




<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NavbarComponent extends Vue {

    get isLoggedIn(): boolean {
      return this.$store.getters.isLoggedIn
    }

    logout(): void {
      this.$store.dispatch('logout')
       .then(() => {
          this.$router.push('/')
        })
       .catch(err => { 
           //do nothing 
        })
    }
}
</script>

<style>

</style>