<script setup>
import TodoFormComponent from "@/components/TodoComponent/TodoFormComponent.vue";
import TodoCardComponent from "@/components/TodoComponent/TodoCardComponent.vue";
import useTodos from "@/composables/useTodos";
import {onMounted} from "vue";

const {
  computed: {uncompletedTodos, completedTodos},
  methods: {getTodos, handleCompleted, deleteTodo, setCurrentTodo}
} = useTodos();

onMounted(() => {
  getTodos();
});

const changeComplete = (id) => {
  handleCompleted(id);
};

const onEditTodo = (todo) => {
  setCurrentTodo(todo);
};

const onDeleteTodo = (id) => {
  if (!confirm("Are you sure want to delete this todo?")) return;
  deleteTodo(id);
};


</script>

<template>
  <div class="flex flex-col lg:flex-row items-start gap-x-4 justify-around">
    <div class="flex flex-col w-full lg:w-1/3">
      <TodoFormComponent/>
    </div>
    <div class="flex flex-col w-full lg:w-2/3">
      <TodoCardComponent
          :todos="uncompletedTodos"
          title="Uncompleted Todo List"
          @completeTodo="changeComplete"
          @edit-todo="onEditTodo"
          @delete-todo="onDeleteTodo"/>

      <TodoCardComponent
          :todos="completedTodos"
          title="Completed Todo List"
          @edit-todo="onEditTodo"
          @delete-todo="onDeleteTodo"/>
    </div>
  </div>
</template>

<style scoped>

</style>