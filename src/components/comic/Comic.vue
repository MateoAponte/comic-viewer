<template>
  <section class="comic__container">
    <Preview :comicData="comicData" :skeleton="checkProperties">
      <!-- <template #settings>
        <ComicSettings />
      </template> -->
      <template #rating>
        <Rating />
      </template>
      <template #loader>
        <Loader :trigger="comicLoader" />
      </template>
      <template #skeleton>
        <Skeleton />
      </template>
    </Preview>
    <Controller :nextComic="handlerNextComic" :previousComic="handlerPreviousComic" :randomComic="handlerRandomComic" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useComicStore } from '../../store';
import { storeToRefs } from 'pinia';
import Preview from './components/Preview.vue';
import Controller from './components/Controllers.vue';
import Skeleton from './components/Skeleton.vue';
import Loader from './components/Loader.vue';
import Rating from './components/Rating.vue';
// import ComicSettings from './components/ComicSettings.vue';

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
