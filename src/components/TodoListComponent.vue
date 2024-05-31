<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  todos: Array
});
</script>

<template>
  <div class="flex flex-col items-center justify-center my-8">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>
    <table class="table-fixed w-full">
      <thead class="bg-gray-200">
      <tr>
        <th class="w-1/4 px-4 py-2">No</th>
        <th class="w-1/2 px-4 py-2">Title</th>
        <th class="w-1/4 px-4 py-2">Completed</th>
        <th class="w-1/4 px-4 py-2">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in props.todos" :key="todo.id" class="text-center">
        <td class="border px-4 py-2">{{ index + 1 }}</td>
        <td class="border px-4 py-2">{{ todo.title }}</td>
        <td class="border px-4 py-2">{{ todo.completed }}</td>
        <td class="border px-4 py-2">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>