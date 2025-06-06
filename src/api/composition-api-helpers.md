# Composition API: Helpers {#composition-api-helpers}

## useAttrs() {#useattrs}

Returns the `attrs` object from the [Setup Context](/api/composition-api-setup#setup-context), which includes the [fallthrough attributes](/guide/components/attrs#fallthrough-attributes) of the current component. This is intended to be used in `<script setup>` where the setup context object is not available.

- **Typ**

  ```ts
  function useAttrs(): Record<string, unknown>
  ```

## useSlots() {#useslots}

Returns the `slots` object from the [Setup Context](/api/composition-api-setup#setup-context), which includes parent passed slots as callable functions that return Virtual DOM nodes. This is intended to be used in `<script setup>` where the setup context object is not available.

If using TypeScript, [`defineSlots()`](/api/sfc-script-setup#defineslots) should be preferred instead.

- **Typ**

  ```ts
  function useSlots(): Record<string, (...args: any[]) => VNode[]>
  ```

## useModel() {#usemodel}

This is the underlying helper that powers [`defineModel()`](/api/sfc-script-setup#definemodel). If using `<script setup>`, `defineModel()` should be preferred instead.

- Only available in 3.4+

- **Typ**

  ```ts
  function useModel(
    props: Record<string, any>,
    key: string,
    options?: DefineModelOptions
  ): ModelRef

  type DefineModelOptions<T = any> = {
    get?: (v: T) => any
    set?: (v: T) => any
  }

  type ModelRef<T, M extends PropertyKey = string, G = T, S = T> = Ref<G, S> & [
    ModelRef<T, M, G, S>,
    Record<M, true | undefined>
  ]
  ```

- **Exempel**

  ```js
  export default {
    props: ['count'],
    emits: ['update:count'],
    setup(props) {
      const msg = useModel(props, 'count')
      msg.value = 1
    }
  }
  ```

- **Detaljer**

  `useModel()` can be used in non-SFC components, e.g. when using raw `setup()` function. It expects the `props` object as the first argument, and the model name as the second argument. The optional third argument can be used to declare custom getter and setter for the resulting model ref. Note that unlike `defineModel()`, you are responsible for declaring the props and emits yourself.

## useTemplateRef() <sup class="vt-badge" data-text="3.5+" /> {#usetemplateref}

Returns a shallow ref whose value will be synced with the template element or component with a matching ref attribute.

- **Typ**

  ```ts
  function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
  ```

- **Exempel**

  ```vue
  <script setup>
  import { useTemplateRef, onMounted } from 'vue'

  const inputRef = useTemplateRef('input')

  onMounted(() => {
    inputRef.value.focus()
  })
  </script>

  <template>
    <input ref="input" />
  </template>
  ```

- **Se även**
  - [Guide - Template Refs](/guide/essentials/template-refs)
  - [Guide - Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [Guide - Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## useId() <sup class="vt-badge" data-text="3.5+" /> {#useid}

Used to generate unique-per-application IDs for accessibility attributes or form elements.

- **Typ**

  ```ts
  function useId(): string
  ```

- **Exempel**

  ```vue
  <script setup>
  import { useId } from 'vue'

  const id = useId()
  </script>

  <template>
    <form>
      <label :for="id">Name:</label>
      <input :id="id" type="text" />
    </form>
  </template>
  ```

- **Detaljer**

  IDs generated by `useId()` are unique-per-application. It can be used to generate IDs for form elements and accessibility attributes. Multiple calls in the same component will generate different IDs; multiple instances of the same component calling `useId()` will also have different IDs.

  IDs generated by `useId()` are also guaranteed to be stable across the server and client renders, so they can be used in SSR applications without leading to hydration mismatches.

  If you have more than one Vue application instance of the same page, you can avoid ID conflicts by giving each app an ID prefix via [`app.config.idPrefix`](/api/application#app-config-idprefix).
