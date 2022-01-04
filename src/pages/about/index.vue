<template>
  <div>index</div>
  <div>
      {{route.path}}
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
console.log(router);
console.log(route);
console.log(route.name);
console.log(route.params);
console.log(route.path);
console.log(Object.keys(route));
console.log(Object.values(route));
</script>
