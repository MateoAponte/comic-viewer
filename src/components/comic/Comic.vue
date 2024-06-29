<template>
  <div> Helloo, let's go to review comics </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useComicStore } from '../../store';
import { storeToRefs } from 'pinia';

const comicStore = useComicStore();
const getComic = () => {
  comicStore.updateComicNumber();
  comicStore.fetchComic();
};

onMounted(() => {
  getComic();
});
</script>
