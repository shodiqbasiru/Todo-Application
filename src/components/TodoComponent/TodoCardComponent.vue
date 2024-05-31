<script setup>
import {defineProps, defineEmits} from "vue";
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
  <CardComponent :title="props.title">
    <template #content>
      <div v-for="(todo, index) in props.todos" :key="todo.id">
        <div class="flex flex-col sm:flex-row items-start sm:items-center bg-white mb-8 p-5 rounded">
          <div class="w-full md:w-1/12 mb-4 sm:mb-0">{{ index + 1 }}</div>
          <div class="w-full md:w-1/3 mb-4 sm:mb-0 ">{{ todo.title }}</div>
          <div class="w-full md:w-1/4 mb-4 sm:mb-0 flex justify-center">
            <span :class="{
            'bg-green-500 text-white': todo.completed,
            'bg-red-500 text-white': !todo.completed
          }" class=" py-1 px-3 rounded-lg ">
          {{ todo.completed ? "Completed" : "Uncompleted" }}
          </span>
          </div>
          <div class="w-full md:w-1/3 flex gap-x-4 justify-center">
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
