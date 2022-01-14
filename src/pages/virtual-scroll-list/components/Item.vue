<template>
  <div class="item">
    <div class="id">{{ props.source.id }} - {{ props.source.text }}</div>
  </div>
</template>

<script lang="ts" setup>
import { TextInfo } from "_utils/data";
const props = defineProps<{
  source: TextInfo;
}>();
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgrey;
  padding: 1em;
}
</style>
