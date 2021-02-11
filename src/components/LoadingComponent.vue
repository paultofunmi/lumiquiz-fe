<template>
  <div class="widget">
    <div class="loader" :style="{width: width + 'px', height: width + 'px'}"></div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';


@Component
export default class LoadingComponent extends Vue {
    @Prop({default: 30}) private width!: number
}
</script>


<style lang="scss">
.widget {margin: 20px;height: 50px;text-align: center;}
.loader {animation: spin 1s linear infinite;-webkit-animation: spin 1s linear infinite;margin: auto;border-radius: 50%;background: transparent;border: 5px solid #ddd;border-top: 5px solid #3490dc;}
@-webkit-keyframes spin {
  to {
    border-top-color: #e3342f;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  to {
    border-top-color: #e3342f;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>