<script setup>
import NavigationBar from "@/layouts/NavigationBar.vue";
import Footer from "@/layouts/FooterLayout.vue";
</script>

<template>
    <NavigationBar/>
    <main class="p-4">
      <router-view/>
    </main>
    <Footer/>
</template>
