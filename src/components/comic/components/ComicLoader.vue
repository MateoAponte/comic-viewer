<template>
  <div class="comic-loader" v-show="trigger">
    <pacman-loader class="comic-spinner" :loading="trigger" color="#F9F871"></pacman-loader>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue';

defineProps({
  trigger: { type: Object as PropType<boolean>, required: true },
});
</script>
