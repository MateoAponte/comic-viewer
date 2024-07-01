<template>
  <div class="comic-controller">
    <span class="comic-controller__control comic-controller__control--left">
      <BsArrowLeftSquareFill @click="previousComic" />
    </span>
    <span class="comic-controller__control comic-controller__control--center">
      <McRandomFill @click="randomComic" />
    </span>
    <span class="comic-controller__control comic-controller__control--right">
      <BsArrowRightSquareFill @click="nextComic" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { BsArrowRightSquareFill } from '@kalimahapps/vue-icons';
import { BsArrowLeftSquareFill } from '@kalimahapps/vue-icons';
import { McRandomFill } from '@kalimahapps/vue-icons';
import { PropType } from 'vue';

defineProps({
  nextComic: { type: Function as PropType<() => void>, required: true },
  randomComic: { type: Function as PropType<() => void>, required: true },
  previousComic: { type: Function as PropType<() => void>, required: true },
});
</script>
