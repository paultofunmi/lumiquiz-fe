<template>
    <section class="movie-search w-50 mx-auto mt-3">
        <div class="alert alert-warning" role="alert" v-if="hasErrors && errors.length > 0">
            <ul>
                <li v-for="(error, index) in errors" :key="index"> {{ error }} </li>
            </ul>
        </div>
        <div class="movie-search__form">
            <h1 class="heading">Movie Search</h1>
            <form action="" class="">
                <input type="text" name="search" id="search" placeholder="Enter Movie Title..." class="form-control" required v-model="searchTerm">
                <button type="submit" class="btn btn-primary mt-3" @click.prevent="search" v-if="!awaitingResult"> Start </button>
                <button type="submit" class="btn btn-primary mt-3" v-if="awaitingResult"> <loading-component width="35"></loading-component> </button>
            </form>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import LoadingComponent from '@/components/LoadingComponent.vue'; 

@Component({
  components: {
     LoadingComponent
  },
})
export default class MovieSearch extends Vue {

    searchTerm = '';
    hasErrors = false;
    awaitingResult = false;
    errors: string[] = [];
    
    get moviesTerm(): [] {
        return JSON.parse(this.$store.getters.movies)
    }

    search(): void { 
        this.errors = [];
        this.hasErrors = false;

        if(this.searchTerm == ''){
            this.hasErrors = true;
            this.errors.push("Search Term cannot be empty");
        }

        if(this.hasErrors) return;

        this.awaitingResult = true;
        this.$store.dispatch('search', this.searchTerm)
        .then((response) => {            
            if(response.data.results == 0){
                this.hasErrors = true;
                this.errors.push("No Movie found with search term: " + this.searchTerm);

                setTimeout(() => {
                   this.hasErrors = false;
                   this.awaitingResult = false;
                   this.errors = [];
                },2000)
            }

            if(response.data.results.length > 0){            
                this.$store.dispatch('guessMode', 'PLAY');
            }
        })
        .catch(err => {
            this.hasErrors = true;
            this.awaitingResult = false;
            this.errors.push("Sorry can't process this action ");
        })
    }
}
</script>

<style lang="scss">
    .movie-search {
        .alert {
            ul {
                list-style-type: none;
            }
        }
    }
</style>