<script lang="ts" setup>
import { computed, onMounted, PropType, ref, watch } from 'vue';
import { FlStarEmphasis } from '@kalimahapps/vue-icons';
import { FlFilledStarEmphasis } from '@kalimahapps/vue-icons';
import { useComicStore } from '../../../store';
import { storeToRefs } from 'pinia';

const emits = defineEmits(['update:rating']);

const props = defineProps({
  previewRate: { type: Boolean, default: false },
  rate: { type: Number, default: 0 },
});

const getPosition = computed(() => {
  return props.previewRate ? 'row--positioned' : '';
});

const stars = ref<number[]>([0, 1, 2, 3, 4]);
const activeStar = ref<number | null>(null);
const hoveredStar = ref<number | null>(null);

const comicStore = useComicStore();
const { comicNumber } = storeToRefs(comicStore);

watch(
  () => props.rate,
  (newVal, oldVal) => {
    if (oldVal !== newVal) {
      activeStar.value = newVal;
    }
  }
);
watch(comicNumber, (newVal, oldVal) => {
  if (props.previewRate && oldVal !== newVal) {
    hoveredStar.value = null;
    activeStar.value = null;
  }
});

const starClass = (index: number) => {
  // This one firts check if a star is hovered to modify the styles
  if (hoveredStar.value !== null) {
    return stars.value[index] <= hoveredStar.value ? 'fa-star' : 'fa-star-o';
    // If doesnt are hovered but if they are clicked to update the active stars this one gonna modify again the styles
  } else if (activeStar.value !== null) {
    return stars.value[index] <= activeStar.value ? 'fa-star' : 'fa-star-o';
  } else {
    return 'fa-star-o';
  }
};

const checkStars = (index: number) => {
  // Check if a star is hovered or is checked to determine if the star gonna be print complete or only the layout
  // In other words, if is active, gonna print the fill star
  // If not, print the bordered star
  return (
    (activeStar.value !== null && activeStar.value >= stars.value[index]) ||
    (hoveredStar.value !== null && hoveredStar.value >= stars.value[index])
  );
};

const hoverStar = (index: number) => {
  hoveredStar.value = index;
};

const resetStars = () => {
  hoveredStar.value = null;
};

const selectStar = (index: number) => {
  activeStar.value = index;
  emits('update:rating', activeStar.value);
};

onMounted(() => {
  activeStar.value = props.rate;
});
</script>

<template>
  <div :class="['row', getPosition]">
    <span class="row__text">
      <span class="row__text-label">
        {{ !!activeStar ? activeStar + 1 : 'No' }}</span
      >
      <span class="row__text-sublabel">Rating</span>
    </span>
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
