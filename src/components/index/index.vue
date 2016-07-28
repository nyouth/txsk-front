<template>
  <nv-head></nv-head>
  <div class="myslide">
    <nv-slide></nv-slide>
  </div>
  <div class="news-list">
    <nv-news></nv-news>
  </div>
</template>
<script>
  export default {
    components: {
      'nvHead': require('./header.vue'),
      'nvSlide': require('./slide.vue'),
      'nvNews': require('./news.vue')
    }
}
</script>

<style>
body {
  font-family: "Microsoft Yahei",Arial,Helvetica;
}
.myslide {
  width: 100%;
  margin: 0;
}
</style>
