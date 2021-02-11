<script>
  import { Pie } from 'vue-chartjs'

  export default {
    extends: Pie,

    props: {
        labels: {
            type: Array
        },
        scores: {
            type: Array
        }
    },

    data () {
      return {
        chartData: {
          labels: this.labels,
          datasets: [{
              borderWidth: 0.5,
              borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(23, 42, 248, 0.3)',
              'rgba(142, 110, 222, 0.7)',
              'rgba(126, 232, 120, 0.8)',
              'rgba(247, 41, 95, 0.9)',
              'rgba(139, 152, 159, 0.3)',
              'rgba(219, 14, 168, 0.6)'            
              ],
              backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',    
              'rgba(23, 42, 248, 0.3)',
              'rgba(142, 110, 222, 0.7)',
              'rgba(126, 232, 120, 0.8)',
              'rgba(247, 41, 95, 0.9)',
              'rgba(139, 152, 159, 0.3)',
              'rgba(219, 14, 168, 0.6)'             
              ],
              data: this.scores
            }]
        },
        options: {
          legend: {
            display: true
          },
          // responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style>
    #pie-chart {
      box-sizing: border-box;
    }
</style>