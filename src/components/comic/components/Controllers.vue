<template>
  <div class="comic-controller">
    <button
      class="comic-controller__control comic-controller__control--left"
      @click="previousComic"
      :disabled="getPrev"
    >
      <span class="comic-controller__control-text"> Anterior </span>
    </button>
    <span
      class="comic-controller__control comic-controller__control--center"
      @click="randomComic"
    >
      <McRandomFill />
    </span>
    <button
      class="comic-controller__control comic-controller__control--right"
      @click="nextComic"
      :disabled="getMax"
    >
      <span class="comic-controller__control-text"> Siguiente </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { McRandomFill } from '@kalimahapps/vue-icons';
import { computed, PropType } from 'vue';
import { ComicControllers } from '../../../types/ComicDataStore';

const props = defineProps({
  nextComic: { type: Function as PropType<() => void>, required: true },
  randomComic: { type: Function as PropType<() => void>, required: true },
  previousComic: { type: Function as PropType<() => void>, required: true },
  controlData: { type: Object as PropType<ComicControllers>, required: true },
});

const getPrev = computed(() => {
  return props.controlData.first === 0;
});
const getMax = computed(() => {
  return props.controlData.current === props.controlData.last;
});
</script>
