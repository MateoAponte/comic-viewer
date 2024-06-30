<template>
  <section class="comic__container">
    <ComicPreview :comicData="comicData" :skeleton="checkProperties">
      <template #loader>
        <ComicLoader :trigger="comicLoader" />
      </template>
      <template #skeleton>
        <ComicSkeleton />
      </template>
    </ComicPreview>
    <ComicController :nextComic="handlerNextComic" :previousComic="handlerPreviousComic" :randomComic="handlerRandomComic" />
    <ComicRating />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useComicStore } from '../../store';
import { storeToRefs } from 'pinia';
import ComicPreview from './components/ComicPreview.vue';
import ComicController from './components/ComicControllers.vue';
import ComicSkeleton from './components/ComicSkeleton.vue';
import ComicLoader from './components/ComicLoader.vue';
import ComicRating from './components/ComicRating.vue';

const comicStore = useComicStore();
const { comicData, comicNumber, comicLoader } = storeToRefs(comicStore);

const checkProperties = computed(() => {
  return comicData.value !== null;
});

const handlerRandomComic = () => {
  comicStore.updateComicNumber();
  comicStore.fetchAndUpdateComicData();
};

const handlerNextComic = () => {
  const newVal = comicNumber.value + 1;
  comicStore.updateComicNumber(newVal);
  comicStore.fetchAndUpdateComicData();
};

const handlerPreviousComic = () => {
  const newVal = comicNumber.value - 1;
  comicStore.updateComicNumber(newVal);
  comicStore.fetchAndUpdateComicData();
};

onMounted(() => {
  handlerRandomComic();
});
</script>
