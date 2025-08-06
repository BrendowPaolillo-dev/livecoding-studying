<template>
  <div class="p-4">
    <!-- Action Buttons -->
    <div class="mb-4 flex space-x-2">
      <el-button type="primary" @click="createTask">Create</el-button>
      <el-button type="warning" :disabled="!selectedRow" @click="editTask">Edit</el-button>
      <el-button type="danger" :disabled="!selectedRow" @click="deleteTask">Delete</el-button>
    </div>

    <!-- Tasks Table -->
    <el-table
      :data="tasks"
      style="width: 100%"
      @row-click="handleRowClick"
      highlight-current-row
    >
      <el-table-column type="index" width="50" label="#" />
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="status" label="Status" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'

interface Task {
  id: number
  title: string
  status: 'pending' | 'done'
}

const STORAGE_KEY = 'tasks_storage'

const tasks = ref<Task[]>([])
const selectedRow = ref<Task | null>(null)

// Fetch tasks and merge with localStorage for persistence
async function fetchTasks() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
      params: { _limit: 10 }
    })
    const fetched = response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      status: item.completed ? 'done' : 'pending'
    }))
    const local = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Task[]
    tasks.value = [
      ...local,
      ...fetched.filter((ft: any) => !local.some(lt => lt.id === ft.id))
    ]
  } catch (error) {
    ElMessage({ message: 'Failed to load tasks', type: 'error' })
  }
}

watch(tasks, (newTasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
}, { deep: true })

onMounted(fetchTasks)

function handleRowClick(row: Task) {
  selectedRow.value = row
}

async function createTask() {
  try {
    const { value: title } = await ElMessageBox.prompt(
      'Enter task title',
      'Create Task',
      { inputPattern: /\S+/, inputErrorMessage: 'Title is required' }
    )
    await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    const newTask: Task = {
      id: Date.now(),
      title,
      status: 'pending'
    }
    tasks.value.unshift(newTask)
    ElMessage({ message: 'Task created', type: 'success' })
  } catch (err: any) {
    if (err !== 'cancel') ElMessage({ message: 'Creation cancelled', type: 'info' })
  }
}

async function editTask() {
  if (!selectedRow.value) return
  try {
    const { value: title } = await ElMessageBox.prompt(
      'Edit task title',
      'Edit Task',
      {
        inputValue: selectedRow.value.title,
        inputPattern: /\S+/, inputErrorMessage: 'Title is required'
      }
    )
    await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${selectedRow.value.id}`,
      {
        title,
        completed: selectedRow.value.status === 'done'
      }
    )
    selectedRow.value.title = title
    ElMessage({ message: 'Task updated', type: 'success' })
  } catch (err: any) {
    if (err !== 'cancel') ElMessage({ message: 'Edit cancelled', type: 'info' })
  }
}

async function deleteTask() {
  if (!selectedRow.value) return
  try {
    await ElMessageBox.confirm(
      `Are you sure you want to delete "${selectedRow.value.title}"?`,
      'Confirm Deletion',
      { type: 'warning' }
    )
    await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${selectedRow.value.id}`
    )
    tasks.value = tasks.value.filter(t => t.id !== selectedRow.value!.id)
    selectedRow.value = null
    ElMessage({ message: 'Task deleted', type: 'success' })
  } catch (err: any) {
    if (err !== 'cancel') ElMessage({ message: 'Deletion cancelled', type: 'info' })
  }
}
</script>