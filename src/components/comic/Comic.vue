<template>
  <section class="comic__container">
    <Preview
      :comicData="getComicData"
      :skeleton="checkProperties"
      :controlData="comicControllers"
    >
      <template #rating>
        <Rating
          @update:rating="updateRating"
          previewRate
          :rate="getComicRate"
        />
      </template>
      <template #loader>
        <Loader :trigger="comicLoader" />
      </template>
      <template #skeleton>
        <Skeleton />
      </template>
    </Preview>
    <Controller
      :nextComic="handlerNextComic"
      :previousComic="handlerPreviousComic"
      :randomComic="handlerRandomComic"
      :controlData="comicControllers"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useComicStore } from '../../store';
import { storeToRefs } from 'pinia';
import Preview from './components/Preview.vue';
import Controller from './components/Controllers.vue';
import Skeleton from './components/Skeleton.vue';
import Loader from './components/Loader.vue';
import Rating from './components/Rating.vue';
import { ComicData } from '../../interfaces/store/ComicData';
// import ComicSettings from './components/ComicSettings.vue';

const comicStore = useComicStore();
const { comicData, comicNumber, comicLoader, comicControllers } =
  storeToRefs(comicStore);

const checkProperties = computed(() => {
  return comicData.value !== null;
});

const getComicData = computed((): ComicData => {
  return comicData.value
    ? comicData.value
    : {
        rating: 0,
        title: '',
        img: '',
        date: '',
        description: '',
        num: '',
        link: '',
      };
});
const getComicRate = computed(() => {
  return comicData.value ? comicData.value.rating : 0;
});

const updateRating = (evt: number) => {
  comicStore.updateComicRating(comicData.value, evt);
};

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
  comicStore.updateComicNumber(comicControllers.value.first);
  comicStore.fetchAndUpdateComicData(comicControllers.value.first);
};
</script>
