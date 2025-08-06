<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 text-white px-4">
        <h1 class="text-5xl font-extrabold mb-4">Welcome to TaskMaster</h1>
        <p class="text-lg mb-8 opacity-90">Organize your tasks effortlessly and boost your productivity.</p>
        <el-button
        type="primary"
        size="large"
        class="shadow-lg transform hover:scale-105 transition-transform"
        @click="goToTaskManager"
        >
        Go to Task Manager
        </el-button>
    </div>
</template>
  
<script setup lang="ts">
import { useHeaderTitleStore } from '../../stores/headerTitle';
import { RouterLink, useRouter } from 'vue-router'

const store = useHeaderTitleStore()
store.changeTitle("Home Page")
const router = useRouter()

function goToTaskManager(){
    router.push("/taskmanager")
}
</script>
<style></style>