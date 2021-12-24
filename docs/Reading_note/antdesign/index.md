

```typeScript
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

export default function useMemo<T>(
  getValue: () => T,
  condition: any[],
  shouldUpdate?: (prev: any[], next: any[]) => boolean,
) {
  const cacheRef: Ref<T> = ref(getValue() as any);
  watch(condition, (next, pre) => {
    if (shouldUpdate) {
      if (shouldUpdate(next, pre)) {
        cacheRef.value = getValue();
      }
    } else {
      cacheRef.value = getValue();
    }
  });

  return cacheRef;
}

```

```typescript
import type { Ref } from 'vue';
import { onBeforeUpdate, ref } from 'vue';

export type UseRef = [(el: any, key: string | number) => void, Ref<any>];

export const useRef = (): UseRef => {
  const refs = ref<any>({});
  const setRef = (el: any, key: string | number) => {
    refs.value[key] = el;
  };
  onBeforeUpdate(() => {
    refs.value = {};
  });
  return [setRef, refs];
};
```


```typescript
function classNames(...args: any[]) {
  const classes = [];
  for (let i = 0; i < args.length; i++) {
    const value = args[i];
    if (!value) continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const inner = classNames(value[i]);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(' ');
}
```


```typescript
/**
 * source by `component-classes`
 * https://github.com/component/classes.git
 */

import indexOf from 'lodash-es/indexOf';

/**
 * Whitespace regexp.
 */
const re = /\s+/;

export class ClassList {
  el: Element;
  list: DOMTokenList;

  constructor(el: Element) {
    if (!el || !el.nodeType) {
      throw new Error('A DOM element reference is required');
    }
    this.el = el;
    this.list = el.classList;
  }

  // 将配字符串转为数组
  array() {
    const className = this.el.getAttribute('class') || '';
    const str = className.replace(/^\s+|\s+$/g, '');
    const arr = str.split(re);
    if ('' === arr[0]) arr.shift();
    return arr;
  }

  /**
   * Add class `name` if not already present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */
  // 添加类
  add(name: string): ClassList {
    // classList
    if (this.list) {
      this.list.add(name);
      return this;
    }

    // fallback
    const arr = this.array();
    const i = indexOf(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  }
  /**
   * Remove class `name` when present, or
   * pass a regular expression to remove
   * any which match.
   *
   * @param {String|RegExp} name
   * @return {ClassList}
   * @api public
   */
   // 移除任何匹配的类名
  remove(name: string | RegExp): ClassList {
    // 正则匹配
    if ('[object RegExp]' === toString.call(name)) {
      return this._removeMatching(name as RegExp);
    }

    // classList
    if (this.list) {
      this.list.remove(name as string);
      return this;
    }

    // fallback
    const arr = this.array();
    const i = indexOf(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  }
  /**
   * Remove all classes matching `re`.
   *
   * @param {RegExp} re
   * @return {ClassList}
   * @api private
   */
  // 私有方法，移除匹配的类
  _removeMatching(re: RegExp): ClassList {
    const arr = this.array();
    for (let i = 0; i < arr.length; i++) {
      if (re.test(arr[i])) {
        this.remove(arr[i]);
      }
    }
    return this;
  }

  /**
   * Toggle class `name`, can force state via `force`.
   *
   * For browsers that support classList, but do not support `force` yet,
   * the mistake will be detected and corrected.
   *
   * @param {String} name
   * @param {Boolean} force
   * @return {ClassList}
   * @api public
   */
  // 切换类
  toggle(name: string, force: boolean): ClassList {
    // classList
    if (this.list) {
      if ('undefined' !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name); // toggle again to correct
        }
      } else {
        this.list.toggle(name);
      }
      return this;
    }

    // fallback
    if ('undefined' !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }

    return this;
  }
  /**
   * Check if class `name` is present.
   *
   * @param {String} name
   * @api public
   */
  // 现在是否存在
  has(name: string) {
    return this.list ? this.list.contains(name) : !!~indexOf(this.array(), name);
  }
  /**
   * Check if class `name` is present.
   *
   * @param {String} name
   * @api public
   */
  // 
  contains(name: string) {
    return this.has(name);
  }
}

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */
// 工厂函数方法创建
export default function (el: Element): ClassList {
  return new ClassList(el);
}

```

创建链式函数
```typescript
export default function createChainedFunction() {
  const args = [].slice.call(arguments, 0);
  if (args.length === 1) {
    return args[0];
  }

  return function chainedFunction() {
    for (let i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments);
      }
    }
  };
}

```


```typescript
import { toRaw } from 'vue';

function shallowEqual(objA, objB, compare, compareContext) {
  let ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    const valueA = objA[key];
    const valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
}

export default function (value, other, customizer, thisArg) {
  return shallowEqual(toRaw(value), toRaw(other), customizer, thisArg);
}

```


```typescript

export default function throttleByAnimationFrame(fn: (...args: any[]) => void) {
  let requestId: number | null;

  const later = (args: any[]) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled = (...args: any[]) => {
    if (requestId == null) {
      requestId = requestAnimationFrame(later(args));
    }
  };

  (throttled as any).cancel = () => cancelAnimationFrame(requestId!);

  return throttled;
}
export function throttleByAnimationFrameDecorator() {
  // eslint-disable-next-line func-names
  return function (target: any, key: string, descriptor: any) {
    const fn = descriptor.value;
    let definingProperty = false;
    return {
      configurable: true,
      get() {
        // eslint-disable-next-line no-prototype-builtins
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return fn;
        }

        const boundFn = throttleByAnimationFrame(fn.bind(this));
        definingProperty = true;
        Object.defineProperty(this, key, {
          value: boundFn,
          configurable: true,
          writable: true,
        });
        definingProperty = false;
        return boundFn;
      },
    };
  };
}
```


```typescript
export function cloneElement(vnode, nodeProps = {}, override = true, mergeRef = false) {
  let ele = vnode;
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0];
  }
  if (!ele) {
    return null;
  }
  const node = cloneVNode(ele, nodeProps, mergeRef);

  // cloneVNode内部是合并属性，这里改成覆盖属性
  node.props = override ? { ...node.props, ...nodeProps } : node.props;
  warning(typeof node.props.class !== 'object', 'class must be string');
  return node;
}

export function cloneVNodes(vnodes, nodeProps = {}, override = true) {
  return vnodes.map(vnode => cloneElement(vnode, nodeProps, override));
}

```


```typescript
```


```typescript
```