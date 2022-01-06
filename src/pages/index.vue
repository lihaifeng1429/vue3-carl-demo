<template>
  <div v-for="(item, index) in routes" :key="index">
    <t-button style="margin: 8px;" theme="primary" @click="onClick(item.path)">
      <!-- <router-link :to="item.path"> -->
      {{ item.name }}
      <!-- </router-link> -->
    </t-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const routes = router.options.routes;
const onClick = (path: string) => {
  router.push({
    path,
  });
};
</script>
