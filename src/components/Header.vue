<template>
  <header class="relative flex items-center justify-center h-16 px-4 bg-white border-b border-gray-200">
    <button
      v-if="showBack"
      class="absolute left-4 text-gray-600 hover:text-gray-800 focus:outline-none"
      @click="$router.back"
    >
      ← Back
    </button>
    <h1 class="text-xl font-medium">{{ store.title }}</h1>
    <div></div>
  </header>
</template>

<script lang="ts" setup>
import { useHeaderTitleStore } from '../stores/headerTitle';
const props = defineProps({
  showBack: {
    type: Boolean,
    default: true
  }
});

const store = useHeaderTitleStore()
</script>
