<script setup>

</script>

<template>
  <div class="flex flex-col bg-gray-200 shadow rounded p-4 mb-8 w-fit">
    <div class="text-2xl font-bold mb-4">
      <slot name="title"></slot>
    </div>
      <slot name="content"></slot>
  </div>
</template>

<style scoped>

</style>