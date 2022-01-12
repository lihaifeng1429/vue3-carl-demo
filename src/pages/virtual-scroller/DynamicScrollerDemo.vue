<template>
  <div class="dynamic-scroller-demo">
    <div class="toolbar">
      <input v-model="search" placeholder="Filter..." />
    </div>

    <DynamicScroller
      :items="filteredItems"
      :min-item-size="54"
      class="scroller"
    >
      <template #before>
        <div class="notice">The message heights are unknown.</div>
      </template>

      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.message]"
          :data-index="index"
          :data-active="active"
          :title="`Click to change message ${index}`"
          class="message"
          @click="changeMessage(item)"
        >
          <div class="avatar">
            <img :key="item.avatar" :src="avatar" alt="avatar" class="image" />
          </div>
          <div class="text" v-html="item.message"></div>
          <div class="index">
            <span>{{ item.id }} (id)</span>
            <span>{{ index }} (index)</span>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>
<script lang="ts" setup>
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import { reactive, ref, computed } from "vue";
import { generateMessage, MsgInfo } from "@/utils/data";
import avatar from "img/virtual-scroller/avatar.png";

const data: (MsgInfo & { id: number })[] = [];
for (let i = 0; i < 1000; i++) {
  data.push({
    id: i,
    ...generateMessage(),
  });
}
console.log(data);
const items = reactive(data);
const changeMessage = (message: MsgInfo) => {
    console.log(message);
  Object.assign(message, generateMessage());
};

const search = ref("");
const filteredItems = computed(() => {
  if (!search.value) return items;
  const lowerCaseSearch = search.value.toLowerCase();
  return items.filter((i) => i.message.toLowerCase().includes(lowerCaseSearch));
});
</script>

<style scoped>
.dynamic-scroller-demo,
.scroller {
  height: 100%;
}

.dynamic-scroller-demo {
  overflow: hidden;
}

.notice {
  padding: 24px;
  font-size: 20px;
  color: #999;
}

.message {
  display: flex;
  min-height: 32px;
  padding: 12px;
  box-sizing: border-box;
}

.avatar {
  flex: auto 0 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
}

.avatar .image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
}

.index,
.text {
  flex: 1;
}

.text {
  max-width: 400px;
}

.index {
  opacity: 0.5;
}

.index span {
  display: inline-block;
  width: 160px;
  text-align: right;
}
</style>
