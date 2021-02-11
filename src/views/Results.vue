<template>
    <section class="quiz-results">
        <navbar-component></navbar-component>

        <div class="content container mt-4">
            <div class="row">
                <div class="col-sm-12 mb-5">
                    <h3 class="heading">Top 10 Quiz Results</h3>
                    <pie-chart-component v-bind:labels="labels" v-bind:scores="scores"></pie-chart-component>                    
                </div>
                <hr />
                <div class="col-sm-12">
                    <h3 class="heading"> Results Leaderboard</h3>
                    <result-table-component :data="results"></result-table-component>
                </div>
            </div>
        </div>        
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PieChartComponent from '@/components/PieChartComponent.vue'; 
import ResultTableComponent from '@/components/ResultTableComponent.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import PieChart from '@/components/PieChart.vue';

@Component({
  components: {
    PieChartComponent,
    ResultTableComponent,
    NavbarComponent,
    PieChart
  },
})
export default class Results extends Vue {
    
    labels: string[] = [];
    scores: number[] = [];
    results: any[] = [];

    
    
    created(): void {

        this.$store.dispatch('fetchResults')
        .then((response) => {
            this.results = response.data;

            response.data.slice(0,10).forEach( (d: any) => {
                this.labels.push( Vue.lodash.capitalize(d.name) + ' - ' + Vue.lodash.capitalize(d.term))
                this.scores.push(d.score)
            });
        })
        .catch(err =>{
            //  console.log(err)
        })
    }

}
</script>

<style lang="scss">
    .navbar__items {
        a {
            text-decoration: none;
            color: #fff;
        }

        a:hover, a.active {
            color: #fff;
            text-decoration: none;
            border-bottom: 2px solid #fff;
        }
    } 
</style>