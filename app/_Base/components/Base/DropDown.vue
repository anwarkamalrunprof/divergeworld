<script setup lang="ts">
import Select from 'primevue/select'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  label: {
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },

  wrapperClasses: {
    type: String,
    default: '',
  },

  haveFilter: {
    type: Boolean,
    default: false,
  },
  labelNote: { type: String, default: '' },

  name: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const fieldName = computed(() => props.name || `field-${Date.now()}`)

// const modelValuee = defineModel('modelValue');
const { value, errorMessage } = props.name
  ? useField(() => fieldName.value, undefined, { syncVModel: true })
  : { value: ref(''), errorMessage: ref('') }
</script>

<template>
  <div
    class="grid md:gap-2 gap-1 relative content-start"
    :class="wrapperClasses"
  >
    <BaseLabel :is-required="isRequired" :note="labelNote">
      {{ label }}
    </BaseLabel>
    <Select
      v-model="value"
      :disabled="disabled"
      :filter="haveFilter"
      class="!w-full !px-3 py-1.5 !rounded-sm !bg-white focus:!border-primary-400  hover:!border-primary-400 !border-2 !duration-300 !shadow-none !h-[53.6px]"
      :class="errorMessage ? '!border-error hover:!border-error ' : '!border-secondary-300'"
      :auto-filter-focus="haveFilter"
      v-bind="$attrs"
    >
      <template #option="slotProps">
        <slot name="option" v-bind="slotProps" />
      </template>
      <template #value="slotProps">
        <slot name="value" v-bind="slotProps" />
      </template>
    </Select>
    <span class="text-error text-sm h-1.5 -mt-1">{{ errorMessage }} </span>
  </div>
</template>

<style scoped></style>
