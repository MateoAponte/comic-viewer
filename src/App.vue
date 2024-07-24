<script setup lang="ts">
import Comic from './components/comic/Comic.vue';
import Header from './components/header/Header.vue';
import Footer from './components/footer/Footer.vue';
import Tabs from './components/common/Tabs.vue';
import { TabInfo } from './interfaces/components/tabs/tabs';
import { defineComponent, ref } from 'vue';

const tabInfo: TabInfo[] = [
  {
    name: 'Comic',
    component: Comic,
  },
  {
    name: 'Puntuados',
    component: defineComponent({
      template: `<div>Puntuados Component Content</div>`,
    }),
  },
];

const selected = ref<number>(0);
const changeSelection = (evt: number) => (selected.value = evt);
</script>

<template>
  <section class="comic">
    <Header />
    <Tabs
      :tabs="tabInfo"
      :selection="selected"
      @update:selection="changeSelection"
    />
    <Footer />
    <Tabs />
  </section>
</template>
