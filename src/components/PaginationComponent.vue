<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true,
  },
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 5
  }
});

const emit = defineEmits(["page-changed"]);

const onClickFirstPage = () => {
  emit("page-changed", 1);
};

const onClickPreviousPage = () => {
  if (props.currentPage > 1) {
    emit("page-changed", props.currentPage - 1);
  }
};

const onClickPage = (page) => {
  emit("page-changed", page);
};

const onClickNextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("page-changed", props.currentPage + 1);
  }
};

const onClickLastPage = () => {
  emit("page-changed", props.totalPages);
};

const startPage = computed(() => {
  return Math.max(1, props.currentPage - Math.floor(props.maxVisibleButtons / 2));
});

const pages = computed(() => {
  return Array.from({ length: Math.min(props.maxVisibleButtons, props.totalPages) }, (_, index) => startPage.value + index);
});

const firstPage = computed(() => {
  return props.currentPage === 1;
});

const lastPage = computed(() => {
  return props.currentPage === props.totalPages;
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex gap-4">
      <button @click="onClickFirstPage" :disabled="firstPage" class="bg-blue-500 text-white p-2 rounded" :class="{ 'bg-gray-500 text-gray-200': firstPage }">First</button>
      <button @click="onClickPreviousPage" :disabled="firstPage" class="bg-blue-500 text-white p-2 rounded" :class="{ 'bg-gray-500 text-gray-200': firstPage }">Previous</button>
      <template v-for="page in pages" :key="page">
        <button v-if="page <= totalPages" @click="onClickPage(page)" :class="{ 'bg-blue-500 text-white': page === currentPage }" class="p-2 rounded">{{ page }}
        </button>
      </template>
      <button @click="onClickNextPage" :disabled="lastPage" class="bg-blue-500 text-white p-2 rounded" :class="{ 'bg-gray-500 text-gray-200': lastPage }">Next</button>
      <button @click="onClickLastPage" :disabled="lastPage" class="bg-blue-500 text-white p-2 rounded" :class="{ 'bg-gray-500 text-gray-200': lastPage }">Last</button>
    </div>
  </div>
</template>
