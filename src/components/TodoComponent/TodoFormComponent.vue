<script setup>
import useTodos from "@/composables/useTodos";
import CardComponent from "@/components/CardComponent.vue";

const {
  methods: {onSubmit},
  data
} = useTodos();
</script>

<template>
  <CardComponent :title="data.form.formTitle">
    <template #content>
        <form @submit="onSubmit"  >
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
    </template>
  </CardComponent>

</template>
