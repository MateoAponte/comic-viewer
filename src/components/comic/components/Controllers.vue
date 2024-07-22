<template>
  <div class="comic-controller">
    <span
      class="comic-controller__control comic-controller__control--left"
      @click="previousComic"
    >
      <span class="comic-controller__control-text"> Anterior </span>
    </span>
    <span
      class="comic-controller__control comic-controller__control--center"
      @click="randomComic"
    >
      <McRandomFill />
    </span>
    <span
      class="comic-controller__control comic-controller__control--right"
      @click="nextComic"
    >
      <span class="comic-controller__control-text"> Siguiente </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { McRandomFill } from '@kalimahapps/vue-icons';
import { PropType } from 'vue';

defineProps({
  nextComic: { type: Function as PropType<() => void>, required: true },
  randomComic: { type: Function as PropType<() => void>, required: true },
  previousComic: { type: Function as PropType<() => void>, required: true },
});
</script>
