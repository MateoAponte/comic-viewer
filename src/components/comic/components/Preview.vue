<template>
  <div class="comic-preview" v-if="skeleton">
    <div class="comic-preview__header">
      <span class="comic-preview__header-num">{{ comicData.num }}</span>
      <h5 class="comic-preview__header-title">{{ comicData.title }}</h5>
      <!-- <span v-if="isCurrentComic"> Comic del día </span> -->
      <slot name="settings" />
    </div>
    <div class="comic-preview__content">
      <div class="comic-preview__content-image">
        <img
          class="comic-preview__content-image-preview"
          :src="comicData.img"
          :alt="comicData.description"
        />
        <slot name="rating" />
      </div>
      <div class="comic-preview__content-date">
        <span class="comic-preview__content-value">
          {{ comicData.date }}
        </span>
      </div>
      <span class="comic-preview__content-description">
        {{ comicData.description }}
      </span>
    </div>
    <slot name="loader" />
  </div>
  <slot v-else name="skeleton" />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { ComicData } from '../../../interfaces/store/ComicData';
import { ComicControllers } from '../../../types/ComicDataStore';

const props = defineProps({
  comicData: { type: Object as PropType<ComicData>, required: true },
  skeleton: { type: Boolean, required: true },
  controlData: { type: Object as PropType<ComicControllers>, required: true },
});

const isCurrentComic = computed(
  () => props.controlData.last === props.controlData.current
);
</script>
