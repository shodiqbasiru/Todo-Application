<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  todos: Array
});

</script>

<template>
  <div class="flex flex-col items-center justify-center">
      <table class="table-auto w-full">
      <thead class="bg-gray-200">
      <tr>
        <th class="w-1/4 px-4 py-2">No</th>
        <th class="w-1/2 px-4 py-2">Title</th>
        <th class="w-1/4 px-4 py-2">Completed</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(todo, index) in props.todos" :key="todo.id" class="text-center">
        <td class="border px-4 py-2">{{ index + 1 }}</td>
        <td class="border px-4 py-2">{{ todo.title }}</td>
        <td class="border px-4 py-2 ">
          <span :class="{
            'bg-green-500 text-white': todo.completed,
            'bg-red-500 text-white': !todo.completed
          }" class=" py-1 px-3  rounded-lg">
          {{ todo.completed ? "Completed" : "Uncompleted"}}
          </span>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>