<template>
  <ComicPreview v-if="checkProperties" :comicData="comicData" />
  <ComicSkeleton v-else />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useComicStore } from '../../store';
import { storeToRefs } from 'pinia';
import ComicPreview from './components/ComicPreview.vue';

const comicStore = useComicStore();
const { comicData } = storeToRefs(comicStore);

const checkProperties: Boolean = computed(() => {
  return comicData.value !== null;
});

const getComic: void = () => {
  comicStore.updateComicNumber();
  comicStore.fetchAndUpdateComicData();
};

onMounted(() => {
  getComic();
});
</script>
