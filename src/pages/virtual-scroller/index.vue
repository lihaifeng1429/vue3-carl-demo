<template>
    <RecycleScroller
        class="scroller"
        :items="list"
        :item-size="32"
        key-field="id"
        v-slot="{ item }"
    >
        <div class="user">{{ item.name }}</div>
    </RecycleScroller>
</template>
<script lang="ts" setup>
import { RecycleScroller } from 'vue-virtual-scroller'
import { reactive} from 'vue'
 const list = reactive([
     {
         name:'li'
     }
 ])
</script>
<style scoped>
.scroller{
    background: #fff;
}
</style>