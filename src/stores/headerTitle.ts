import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useHeaderTitleStore = defineStore("headerTitle", () => {
  const title = ref<String>("blank");
  const titleHistory = ref<String[]>([]);

  function changeTitle(newTitle: String) {
    title.value = newTitle;
    titleHistory.value.push(newTitle);
  }

  const countTitleHistory = computed(() => titleHistory.value.length);

  return {
    changeTitle,
    countTitleHistory,
    title,
  };
});
