<template>
  <div class="comic-preview">
    <div class="comic-preview__header">
      <span class="comic-preview__header-num"></span>
      <h5 class="comic-preview__header-title"> - </h5>
    </div>
    <div class="comic-preview__content">
      <img class="comic-preview__content-image--loader" :src="Loader" alt="Loader skeleton image" />
      <span class="comic-preview__content-num">###</span>
      <span class="comic-preview__content-description"> - </span>
    </div>
  </div>
</template>

<script setup>
import Loader from '../../../assets/image/loader.png'; // => or relative path
</script>
