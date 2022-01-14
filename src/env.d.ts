/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "vue-virtual-scroller" {
  import Vue, { ComponentOptions,  Component } from "vue";
  interface PluginOptions {
    installComponents?: boolean;
    componentsPrefix?: string;
  }


  export const RecycleScroller: Component<any, any, any, any>;
  export const DynamicScroller: Component<any, any, any, any>;
  export const DynamicScrollerItem: Component<any, any, any, any>;


}

declare module 'vue-virtual-scroll-list' {

}