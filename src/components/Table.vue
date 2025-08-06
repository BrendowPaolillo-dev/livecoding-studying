<template>
    <div class="p-4">
      <div class="mb-4 flex space-x-2">
        <el-button type="primary" @click="createTask">Create</el-button>
        <el-button type="warning" :disabled="!selectedRow" @click="editTask">Edit</el-button>
        <el-button type="danger" :disabled="!selectedRow" @click="deleteTask">Delete</el-button>
      </div>
  
      <el-table
        :data="tasks"
        style="width: 100%"
        @row-click="handleRowClick"
        highlight-current-row
      >
        <el-table-column type="index" width="50" label="#" />
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="status" label="Status" />
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'done'
}

const tasks = ref<Task[]>([
  { id: 1, title: 'Buy groceries', description: 'Milk, Bread, Eggs', status: 'pending' },
  { id: 2, title: 'Walk the dog', description: '30 min in the park', status: 'done' },
  { id: 3, title: 'Read book', description: 'Finish Vue 3 guide', status: 'pending' }
])

const selectedRow = ref<Task | null>(null)

function handleRowClick(row: Task) {
  selectedRow.value = row
}

function createTask() {
  ElMessage({ message: 'Create action clicked', type: 'info' })
}

function editTask() {
  if (selectedRow.value) {
    ElMessage({ message: `Edit "${selectedRow.value.title}"`, type: 'warning' })
  }
}

function deleteTask() {
  if (selectedRow.value) {
    ElMessageBox.confirm(
      `Are you sure you want to delete "${selectedRow.value.title}"?`,
      'Confirm Deletion',
      { type: 'warning' }
    )
      .then(() => {
        tasks.value = tasks.value.filter(t => t.id !== selectedRow.value!.id)
        selectedRow.value = null
        ElMessage({ message: 'Task deleted', type: 'success' })
      })
      .catch(() => {
      })
  }
}
</script>