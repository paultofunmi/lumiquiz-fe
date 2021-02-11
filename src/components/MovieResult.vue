<template>
   <section class="movie-result w-50 mx-auto mt-3">
       <h1 class="heading-3">Result</h1>
       <div class="movie-result__display-area border p-4">
           <h2>Success rate: {{ score }} out of {{ total }} guesses</h2>
           <p>  {{ percentage }} % </p>
       </div>
       <button class="btn btn-primary mt-3" @click.prevent="reset"> Play Again </button>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class MovieResult extends Vue{

   get score() {
     return this.$store.getters.score
   }

   get total() {
     return this.$store.getters.total
   }

   get percentage() {
     return this.$store.getters.percentage
   }

   reset() {
     this.$store.dispatch('resetQuiz')
   }
}
</script>

<style>

</style>