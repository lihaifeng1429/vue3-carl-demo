<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="null"
    sizeField="height"
    key-field="id"
    @visible="onVisible"
    @hidden="onHidden"
  >
   <template #before>
    Hey! I'm a message displayed before the items!
  </template>
    <template v-slot="props">
      <div class="user">
        <span class="name"
          >{{ props.item.value.name }} {{ props.item.index }}</span
        >
      </div>
    </template>
  </RecycleScroller>
</template>
<script lang="ts" setup>
import { RecycleScroller } from "vue-virtual-scroller";
import { reactive } from "vue";
import { getData, addItem } from "../../utils/data";
const data = getData(1000, false);
console.log(data);
const list = reactive(data);
const onVisible = () => {
  console.log("visible");
};

const onHidden = () => {
  console.log("hidden");
};
</script>
<style lang="less" scoped>
.scroller {
  height: 500px;
  position: relative;
  overflow: auto;
  /deep/.vue-recycle-scroller__item-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: transform;
  }
}

.user {
  border: 1px solid #ccc;
  height: 32px;
  line-height: 32px;
  text-align: center;
  padding: 0 12px;
}
// .scroller {
//   background: #fff;
//   height: 320px;
// }
// .user {
//   height: 32px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   .avatar {
//     width: 50px;
//     height: 50px;
//     margin-right: 12px;
//   }
// }
</style>
