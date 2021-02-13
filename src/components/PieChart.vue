<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["labels", "scores"],

  data () {
     return {
        chartData: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: this.labels,
          datasets: [
            {
              label: "Data One",
              backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
              data: this.scores
            }
          ]
        }
     }
  }, 
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, {
      borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px"
    });
  }
};

</script>