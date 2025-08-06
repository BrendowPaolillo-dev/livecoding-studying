
<template>
  <header>
    <Header :showBack="$route.path === '/' ? false : true"></Header>
  </header>
  <main>
    <RouterView></RouterView>
  </main>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute()
console.log(route.path);

</script>
