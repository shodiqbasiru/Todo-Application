<script setup>
import { defineProps, defineEmits } from "vue";
import CardComponent from "@/components/CardComponent.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps({
  todos: Array,
  title: String
});

const emit = defineEmits(["edit-todo", "delete-todo", "complete-todo"]);

const onEditTodo = (todo) => {
  emit("edit-todo", todo);
};

const onDeleteTodo = (id) => {
  emit("delete-todo", id);
};

const onCompleteTodo = (id) => {
  emit("complete-todo", id);
};
</script>

<template>
  <CardComponent>
    <template #title>
      <h1 class="text-2xl font-bold mb-4">{{ props.title }}</h1>
    </template>
    <template #content>
      <div v-for="(todo, index) in props.todos" :key="todo.id">
        <div class="flex items-center bg-white mb-8 py-5 rounded">
          <div class="w-1/4 px-4 py-2">{{ index + 1 }}</div>
          <div class="w-1/2 px-4 py-2">{{ todo.title }}</div>
          <div class="w-1/4 px-4 py-2">{{ todo.completed }}</div>
          <div class="w-1/4 px-4 py-2 flex gap-x-4">
            <button @click="onEditTodo(todo)"
                    class="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon="edit"/>
            </button>
            <button @click="onDeleteTodo(todo.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon="trash"/>
            </button>
            <button v-if="!todo.completed"
                    @click="onCompleteTodo(todo.id)"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon="check"/>
            </button>
          </div>
        </div>
      </div>
    </template>
  </CardComponent>

</template>

<style scoped>

</style>