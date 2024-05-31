<script setup>
import TodoListComponent from "@/components/TodoComponent/TodoListComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import {onMounted} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import useTodos from "@/composables/useTodos";

const {
  data,
  computed: {dataPage, totalPages},
  methods: {getTodos, onPageChanged, searchTodo}
} = useTodos();


onMounted(() => {
  getTodos()
});

</script>

<template>
  <div class="px-14">
    <h1 class="text-2xl font-bold mb-4">Todo List</h1>
    <div class="flex justify-between mb-4 items-center">
      <router-link to="/todo" class="bg-orange-500 hover:bg-orange-600 py-2 px-5 rounded text-white">
        <font-awesome-icon icon="plus" class="me-2"/>
        Create
      </router-link>
      <div>
        <input type="text" class="border border-gray-300 rounded-s px-4 py-2 outline-orange-500"
               placeholder="Search Todo" @input="searchTodo" v-model="data.search"/>
        <button class="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-e text-white">
          <font-awesome-icon icon="search" class="me-2"/>
        </button>
      </div>
    </div>
    <TodoListComponent :todos="dataPage"/>
    <PaginationComponent
        :currentPage="data.currentPage"
        :totalPages="totalPages"
        :perPage="data.itemsPerPage"
        :maxVisibleButtons="5"
        @page-changed="onPageChanged"/>
  </div>

</template>