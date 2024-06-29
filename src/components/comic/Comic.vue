<template>
  <div> A comic here {{ name }} </div>
  <button @click="changeName()"> Click meee </button>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');

const changeName = () => {
  name.value = 'New name';
};
</script>
