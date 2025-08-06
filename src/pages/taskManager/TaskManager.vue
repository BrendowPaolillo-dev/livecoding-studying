<template>
    <Table></Table>
</template>
<script setup lang="ts">
import Table from '../../components/Table.vue';
import { useHeaderTitleStore } from '../../stores/headerTitle';

const store = useHeaderTitleStore()
store.changeTitle("Task Manager")
</script>
<style></style>