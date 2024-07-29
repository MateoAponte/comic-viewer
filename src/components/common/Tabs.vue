<script lang="ts" setup>
import { onMounted, PropType, ref } from 'vue';
import { TabInfo } from '../../interfaces/components/tabs/tabs';

const emit = defineEmits(['update:selection']);

const props = defineProps({
  tabs: Array as PropType<Array<TabInfo>>,
  selection: {
    type: Number,
    default: 0,
  },
});

const selected = ref<number>(0);
const updateSelection = (val: number) => {
  console.log(val);

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
        class="tab__activator-element"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="updateSelection(index)"
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
