<script setup>
import { ref, onMounted } from 'vue'
import { data } from './errors.data.ts'
import ErrorsTable from './ErrorsTable.vue'

const highlight = ref()
onMounted(() => {
  highlight.value = location.hash.slice(1)
})
</script>

# Referens för felkoder i produktion {#error-reference}

## Körningsfel {#runtime-errors}

I produktionsbyggen kommer det tredje argumentet som skickas till följadne felhanterings-API:er vara en kortkod istället för den fullständiga informationssträngen:

- [`app.config.errorHandler`](/api/application#app-config-errorhandler)
- [`onErrorCaptured`](/api/composition-api-lifecycle#onerrorcaptured) (Composition API)
- [`errorCaptured`](/api/options-lifecycle#errorcaptured) (Options API)

Följande tabell visar koderna och de ursprungliga fullständiga informationssträngarna de motsvarar.

<ErrorsTable kind="runtime" :errors="data.runtime" :highlight="highlight" />

## Kompileringsfel {#compiler-errors}

Följande tabell visar en översikt av produktionskompilatorns felkoder och deras ursprungliga meddelanden.

<ErrorsTable kind="compiler" :errors="data.compiler" :highlight="highlight" />
