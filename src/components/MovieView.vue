<template>

    <section class="movie-view w-50 mx-auto mt-3">

        <h2>Movies</h2>
        <div>
            <h1 class="h5 movie-view__movie-position"> Movie {{ currentIndex + 1 }} out of {{ moviesTermData.length }}</h1>
            <p> <strong> Movie Title</strong>: {{ moviesTermData[currentIndex].Title }}</p>

            <img :src="moviesTermData[currentIndex].Poster" class="img-fluid img-thumbnail">
            <h2 class="heading">Plot Description</h2>
            <p class="current-movie__movie-plot">
                {{ moviesTermData[currentIndex].plot }}
            </p>
            <form action="" method="post">
                <input type="text" placeholder="Guess the IMDB score" v-model="guess" class="form-control" required>
                <input type="submit" value="Submit" class="btn btn-primary mt-3" @click.prevent="submitScore">
            </form>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {
    
  },
})
export default class MovieView extends Vue{

guess = '';
    currentIndex = 0;
    scores: any[] = [];

    get moviesTermData() {
        return JSON.parse(this.$store.getters.movies)
    }
      
    submitScore(): void {
        
        if(this.guess.length == 0) return;
        
        if(this.currentIndex < this.moviesTermData.length ) {
            const currentData = {
                movieId: this.moviesTermData[this.currentIndex].imdbID,
                rating: this.guess
            }

            this.scores.push(currentData);
            this.guess = '';
        }

        if(this.currentIndex + 1 < this.moviesTermData.length){
            ++this.currentIndex;
        }
        else {
            const actionPayload = {
                submissions: this.scores,
            }
            this.$store.dispatch('scoreQuiz', actionPayload)
        }
        
    }
}
</script>

<style>

</style>