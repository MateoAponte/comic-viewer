<script lang="ts" setup>
import { computed, onMounted, PropType, ref } from 'vue';
import { TabInfo } from '../../interfaces/components/tabs/tabs';

const emit = defineEmits(['update:selection']);

const props = defineProps({
  tabs: Array as PropType<Array<TabInfo>>,
  selection: {
    type: Number,
    default: 0,
  },
});

const isActive = computed(() => {
  return selected.value === props.selection ? selected.value : 0;
});

const selected = ref<number>(0);
const updateSelection = (val: number) => {
  selected.value = val;
  emit('update:selection', val);
};

onMounted(() => {
  selected.value = props.selection;
});
</script>

<template>
  <div class="tab">
    <div class="tab__activator">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="updateSelection(index)"
        :class="[
          isActive === index && 'tab__activator-element--selected',
          'tab__activator-element',
        ]"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="tab__content">
      <div
        class="tab__content-element"
        v-for="(tab, index) in tabs"
        v-show="selected === index"
      >
        <component
          :is="tab.component"
          @update:selection="(evt: any) => updateSelection(evt)"
        ></component>
      </div>
    </div>
  </div>
</template>
