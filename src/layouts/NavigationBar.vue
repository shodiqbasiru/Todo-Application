<script setup>

</script>

<template>
  <nav class="bg-indigo-600 text-white flex items-center">
    <h1 class="text-xl font-bold px-16">MSFB | <i>Todo Application</i></h1>
    <div class="flex justify-center gap-x-8">
        <router-link to="/" class="hover:bg-orange-500 p-4" :class="{ 'bg-orange-500 ': $route.path === '/' }">Home</router-link>
        <router-link to="/todo" class="hover:bg-orange-500 p-4" :class="{ 'bg-orange-500 ': $route.path === '/todo' }">Todo</router-link>
    </div>
  </nav>
</template>