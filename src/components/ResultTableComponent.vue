<template>
  <section class="mb-5">
    <table class="table table-bordered" v-if="data.length > 0">        
        <thead>
            <tr>
                <th v-for=" (col, index) in columns" v-on:click="sortTable(col)" :key="index">{{ format(col) }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in data" :key="index">
                <td v-for="(col, index) in columns" :key="index">{{ format (row[col]) }}</td>
            </tr>
        </tbody> 
    </table>
    <div v-else>
        <p class="mt-4 font-weight-bold"> No data exists </p>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ResultsTable extends Vue {
    
    @Prop() data!: any[];
    
    ascending = false;
    sortColumn = '';

    format(inputString: string): string {
        if(inputString == 'created_at') return 'Done at';
        return Vue.lodash.capitalize(inputString);
    }

    sortTable(col: string): void { 
        if (this.sortColumn === col) {
            this.ascending = !this.ascending;
        } else {
            this.ascending = true;
            this.sortColumn = col;
        }

        const ascending = this.ascending;

        this.data.sort(function(a, b) {
            if (a[col] > b[col]) {
                return ascending ? 1 : -1
            } else if (a[col] < b[col]) {
                return ascending ? -1 : 1
            }
            return 0;
        })
    }
    
    get columns(): any [] { 
        if (this.data.length == 0) {
            return [];
        }

        return Object.keys(this.data[0]);
    }
}
</script>