<script setup lang="ts">
import Comic from './components/comic/Comic.vue';
import Header from './components/header/Header.vue';
import Footer from './components/footer/Footer.vue';
import Tabs from './components/common/Tabs.vue';
import { TabInfo } from './interfaces/components/tabs/tabs';
import { onMounted, ref } from 'vue';
import Rating from './components/rating/Rating.vue';
import SessionManagement from './helpers/SessionMagagement';

const tabInfo: TabInfo[] = [
  {
    name: 'Comic',
    component: Comic,
  },
  {
    name: 'Puntuados',
    component: Rating,
  },
];

const selected = ref<number>(0);
const changeSelection = (evt: number) => (selected.value = evt);

onMounted(() => {
  SessionManagement.init();
});
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
