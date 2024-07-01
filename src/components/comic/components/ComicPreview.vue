<template>
  <div class="comic-preview" v-if="skeleton">
    <div class="comic-preview__header">
      <span class="comic-preview__header-num">{{ comicData.num }}</span>
      <h5 class="comic-preview__header-title">{{ comicData.title }}</h5>
      <slot name="settings" />
    </div>
    <div class="comic-preview__content">
      <div class="comic-preview__content-image">
        <img class="comic-preview__content-image-preview" :src="comicData.img" :alt="comicData.description" />
        <slot name="rating" />
      </div>
      <span class="comic-preview__content-date">{{ comicData.date }}</span>
      <span class="comic-preview__content-description"> {{ comicData.description }} </span>
    </div>
    <slot name="loader" />
  </div>
  <slot v-else name="skeleton" />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ComicData } from '../../../interfaces/store/ComicData';

defineProps({
  comicData: { type: Object as PropType<ComicData>, required: true },
  skeleton: { type: Boolean, required: true },
});
</script>
