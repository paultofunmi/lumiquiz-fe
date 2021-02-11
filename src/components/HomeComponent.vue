<template>
  <div class="home">
        <section class="home__app-info">
            <h1>LumiQuiz</h1>
            <p>Rate Movies &amp; Rank on Leaderboard</p>
        </section>
  </div>    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeComponent extends Vue {

}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
