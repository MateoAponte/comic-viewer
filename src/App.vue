<script setup lang="ts">
import Comic from './components/comic/Comic.vue';
</script>

<template>
  <section class="comic">
    <div className="comic-title__header">
      <h3 class="comic-title">
        <span class="comic-title--colored">Com</span>ic
      </h3>
      <h3 class="comic-title comic-title--moved">
        <span class="comic-title--colored">Vi</span>ewer
      </h3>
    </div>
    <Comic />
  </section>
</template>
