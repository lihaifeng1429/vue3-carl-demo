let shouldTrack = true;
// 当前激活的 effect
let activeEffect;
// 原始数据对象 map
const targetMap = new WeakMap();
function track(target, type, key) {
  if (!shouldTrack || activeEffect === undefined) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 每个 target 对应一个 depsMap
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    // 每个 key 对应一个 dep 集合
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    // 收集当前激活的 effect 作为依赖
    dep.add(activeEffect);
    // 当前激活的 effect 收集 dep 集合作为依赖
    activeEffect.deps.push(dep);
  }
}

//----------------------------

const targetMap = new WeakMap();
function trigger(target, type, key) {
  // 通过 targetMap 拿到 target 对应的依赖集合
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    // 没有依赖，直接返回
    return;
  }
  // 创建运行的 effects 集合
  const effects = new Set();
  // 添加 effects 的函数
  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect) => {
        effects.add(effect);
      });
    }
  };
  // SET | ADD | DELETE 操作之一，添加对应的 effects
  if (key !== void 0) {
    add(depsMap.get(key));
  }
  const run = (effect) => {
    // 调度执行
    if (effect.options.scheduler) {
      effect.options.scheduler(effect);
    } else {
      // 直接运行
      effect();
    }
  };
  // 遍历执行 effects
  effects.forEach(run);
}
// ----------
import { reactive } from "vue";
const counter = reactive({
  num: 0,
});
function logCount() {
  console.log(counter.num);
}
function count() {
  counter.num++;
}
logCount();
count();
// --------------
function wrapper(fn) {
  const wrapped = function (...args) {
    activeEffect = fn;
    fn(...args);
  };
  return wrapped;
}
const wrappedLog = wrapper(logCount);
wrappedLog();

//--------------------------------------
// 全局 effect 栈
const effectStack = [];
// 当前激活的 effect
let activeEffect;
function effect(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    // 如果 fn 已经是一个 effect 函数了，则指向原始函数
    fn = fn.raw;
  }
  // 创建一个 wrapper，它是一个响应式的副作用的函数
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) {
    // lazy 配置，计算属性会用到，非 lazy 则直接执行一次
    effect();
  }
  return effect;
}
function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effect.active) {
      // 非激活状态，则判断如果非调度执行，则直接执行原始函数。
      return options.scheduler ? undefined : fn();
    }
    if (!effectStack.includes(effect)) {
      // 清空 effect 引用的依赖
      cleanup(effect);
      try {
        // 开启全局 shouldTrack，允许依赖收集
        enableTracking();
        // 压栈
        effectStack.push(effect);
        activeEffect = effect;
        // 执行原始函数
        return fn();
      } finally {
        // 出栈
        effectStack.pop();
        // 恢复 shouldTrack 开启之前的状态
        resetTracking();
        // 指向栈最后一个 effect
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect.id = uid++;
  // 标识是一个 effect 函数
  effect._isEffect = true;
  // effect 自身的状态
  effect.active = true;
  // 包装的原始函数
  effect.raw = fn;
  // effect 对应的依赖，双向指针，依赖包含对 effect 的引用，effect 也包含对依赖的引用
  effect.deps = [];
  // effect 的相关配置
  effect.options = options;
  return effect;
}
