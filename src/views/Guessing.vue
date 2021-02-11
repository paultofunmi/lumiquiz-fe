<template>
    <section class="quiz-results">
         <navbar-component></navbar-component> 

        <div class="content container">
            <div class="row" v-if="guessMode == 'SEARCH'">
                <movie-search></movie-search>
            </div>

            <div class="row" v-if="guessMode == 'PLAY'">
                <movie-view></movie-view>
            </div>

            <div class="row" v-if="guessMode == 'RESULT'">
                <movie-result></movie-result>
            </div>
        </div>
    
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MovieSearch from '@/components/MovieSearch.vue';
import MovieView from '@/components/MovieView.vue';
import MovieResult from '@/components/MovieResult.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';

@Component({
  components: {
    MovieSearch,
    MovieView,
    MovieResult,
    NavbarComponent
  },
})
export default class Guessing extends Vue {

    get guessMode() {
        return this.$store.getters.guessMode;
    }
}
</script>

<style lang="scss">
</style>