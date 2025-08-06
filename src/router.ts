import { createMemoryHistory, createRouter } from "vue-router";

import Home from "./pages/home/Home.vue";
import TaskManager from "./pages/taskManager/TaskManager.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/taskmanager", component: TaskManager },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
