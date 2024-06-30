<template>
  <section class="comic__container">
    <ComicPreview :comicData="comicData" :skeleton="checkProperties">
      <!-- <template #settings>
        <ComicSettings />
      </template> -->
      <template #rating>
        <ComicRating />
      </template>
      <template #loader>
        <ComicLoader :trigger="comicLoader" />
      </template>
      <template #skeleton>
        <ComicSkeleton />
      </template>
    </ComicPreview>
    <ComicController :nextComic="handlerNextComic" :previousComic="handlerPreviousComic" :randomComic="handlerRandomComic" />
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
import ComicSettings from './components/ComicSettings.vue';

const comicStore = useComicStore();
const { comicData, comicNumber, comicLoader } = storeToRefs(comicStore);

const checkProperties = computed(() => {
  return comicData.value !== null;
});

const handlerRandomComic = () => {
  comicStore.updateComicNumber();
  comicStore.fetchAndUpdateComicData(comicNumber.value);
};

const handlerNextComic = () => {
  const newVal = comicNumber.value + 1;
  comicStore.updateComicNumber(newVal);
  comicStore.fetchAndUpdateComicData(newVal);
};

const handlerPreviousComic = () => {
  const newVal = comicNumber.value - 1;
  comicStore.updateComicNumber(newVal);
  comicStore.fetchAndUpdateComicData(newVal);
};

onMounted(() => {
  handlerRandomComic();
});
</script>
