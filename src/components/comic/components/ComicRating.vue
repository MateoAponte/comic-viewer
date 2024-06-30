<template>
  <div class="row">
    <span
      v-for="(_, index) in stars"
      :key="index"
      class="fa"
      :class="starClass(index)"
      @mouseover="hoverStar(index)"
      @mouseout="resetStars"
      @click="selectStar(index)"
    >
      <FlFilledStarEmphasis aria-hidden="true" v-if="checkStars(index)" />
      <FlStarEmphasis aria-hidden="true" v-else />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { FlStarEmphasis } from '@kalimahapps/vue-icons';
import { FlFilledStarEmphasis } from '@kalimahapps/vue-icons';
import { useComicStore } from '../../../store';
import { storeToRefs } from 'pinia';

const stars = ref<number[]>([0, 1, 2, 3, 4]);
const activeStar = ref<number | null>(null);
const hoveredStar = ref<number | null>(null);

const comicStore = useComicStore();
const { comicNumber } = storeToRefs(comicStore);

watch(comicNumber, (newVal, oldVal) => {
  if (oldVal !== newVal) {
    hoveredStar.value = null;
    activeStar.value = null;
  }
});

const starClass = (index: number) => {
  if (hoveredStar.value !== null) {
    return index <= hoveredStar.value ? 'fa-star' : 'fa-star-o';
  } else if (activeStar.value !== null) {
    return index <= activeStar.value ? 'fa-star' : 'fa-star-o';
  } else {
    return 'fa-star-o';
  }
};

const checkStars = (index: number) => {
  return (activeStar.value !== null && activeStar.value >= index) || (hoveredStar.value !== null && hoveredStar.value >= index);
};

const hoverStar = (index: number) => {
  hoveredStar.value = index;
};

const resetStars = () => {
  hoveredStar.value = null;
};

const selectStar = (index: number) => {
  activeStar.value = index;
};
</script>
