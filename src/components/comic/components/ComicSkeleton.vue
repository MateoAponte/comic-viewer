<template>
  <div class="comic-preview">
    <div class="comic-preview__header">
      <span class="comic-preview__header-num">#</span>
      <h5 class="comic-preview__header-title--skeleton"> </h5>
    </div>
    <div class="comic-preview__content">
      <div class="comic-preview__content-image--loader">
        <grid-loader :loading="trigger" color="#454655" size="50px" margin="5px"></grid-loader>
      </div>
      <span class="comic-preview__content-date--skeleton"></span>
      <span class="comic-preview__content-description--skeleton"> </span>
    </div>
  </div>
</template>

<script setup>
import GridLoader from 'vue-spinner/src/GridLoader.vue';
</script>
