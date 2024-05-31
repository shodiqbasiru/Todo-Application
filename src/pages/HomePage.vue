<script setup>
import TodoListComponent from "@/components/TodoListComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import TodoService from "@/services/TodoService";
import {onMounted, ref, computed} from "vue";

const data = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const todoService = TodoService();

onMounted(async () => {
  data.value = await todoService.getTodos();
});

const todos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return data.value.slice(start, end);
});

const onPageChanged = (newPage) => {
  currentPage.value = newPage;
};

</script>

<template>
  <router-link to="/todo" class="bg-blue-500 text-white p-4 rounded">Create Todo</router-link>
  <TodoListComponent :todos="todos"/>
  <PaginationComponent
      :currentPage="currentPage"
      :totalPages="Math.ceil(data.length / itemsPerPage)"
      :perPage="itemsPerPage"
      :maxVisibleButtons="5"
      @page-changed="onPageChanged"/>
</template>