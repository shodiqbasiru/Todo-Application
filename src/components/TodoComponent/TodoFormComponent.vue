<script setup>
import useTodos from "@/composables/useTodos";

const {
  methods: {onSubmit},
  data
} = useTodos();
</script>

<template>
  <div class="flex flex-col justify-center w-full lg:w-1/3">
    <form @submit="onSubmit" class="bg-gray-200 rounded px-8 pt-6 pb-8 mb-4">
      <h1 class="text-2xl font-bold mb-4">{{ data.form.formTitle }}</h1>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          Title
        </label>
        <input
            class="border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-orange-500"
            id="title" type="text" v-model="data.title" placeholder="Add todo title">
      </div>
      <div class="flex items-center justify-between">
        <button
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
          {{ data.form.button }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>