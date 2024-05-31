<script setup>

import {defineProps} from 'vue';

const props = defineProps({
  title: String
});
</script>

<template>
  <div class="flex flex-col bg-gray-200 shadow rounded p-4 mb-8">
    <div class="text-2xl font-bold mb-4">
      <slot name="title">
        <h1 class="text-2xl font-bold mb-4">{{ props.title }}</h1>
      </slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<style scoped>

</style>