<template>
  <div>
    <virtual-list
      style="height: 360px; overflow-y: auto"
      :data-key="'uid'"
      :data-sources="items"
      :data-component="Item"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Item from "./components/Item.vue";
import VirtualList from "vue-virtual-scroll-list";
import { getListData } from "_utils/data";

const items = reactive(getListData(1000));
</script>
