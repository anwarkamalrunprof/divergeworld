<script setup lang="ts">
import type { CountryCode } from 'libphonenumber-js'
import googleLibPhone from 'google-libphonenumber'
import { getCountryCallingCode, getExampleNumber } from 'libphonenumber-js'
import examples from 'libphonenumber-js/mobile/examples'
// Import country and flag data
import countriesAr from '~/assets/data/countries/ar.json'
import countriesEn from '~/assets/data/countries/en.json'
import flags from '~/assets/data/countries/flags-24x24.json'
// Define prop types with improved type safety
interface PhoneInputProps {
  label?: string
  error?: string
  needVerification?: boolean
  showIsVerified?: boolean
  code?: string
  countryKey?: string
  isRequired?: boolean
  isValid?: boolean
  isChanged?: boolean
  disableVerify?: boolean
  showRequirement?: boolean
  disabled?: boolean
  info?: boolean
  showVerificationMark?: boolean
  forcePhoneVerify?: boolean
  phoneLogin?: boolean
  afterPhoneLinkingFn?: () => unknown
}
const props = withDefaults(defineProps<PhoneInputProps>(), {
  code: 'EG',
  countryKey: '+20',
  needVerification: false,
  showIsVerified: false,
  isRequired: false,
  isValid: true,
  isChanged: false,
  disableVerify: false,
  showRequirement: true,
  disabled: false,
  info: true,
  showVerificationMark: true,
  forcePhoneVerify: false,
  phoneLogin: false,
})
const emit = defineEmits([
  'update:modelValue',
  'update:countryKey',
  'update:isValid',
  'update:code',
  'update:isChanged',
])
const { locale, t } = useI18n()
// Reactive models with improved type handling
const code = defineModel<string>('code', {
  default: 'EG',
  set: (value: string) => value.toUpperCase(),
})
const phoneNumber = defineModel<string>('modelValue', {
  default: '',
  set: (value: string) => value.toString(),
})
// Computed country calling code
const countryCallingCode = computed(() => {
  const newCountryKey = getCountryCallingCode(code.value?.toUpperCase() as CountryCode)
  emit('update:countryKey', `+${newCountryKey}`)
  return `+${newCountryKey}`
})
// Phone number validation
const errorMessage = ref('')
const validNumber = ref(true)
const phoneInstance = googleLibPhone.PhoneNumberUtil.getInstance()
// Maximum length calculation
const maxPhoneLength = computed(() => {
  const hint = getHint(code.value)
  return hint.length
})
watch(
  phoneNumber,
  () => {
    try {
      // Skip validation for empty input
      if (!phoneNumber.value?.trim()) {
        validNumber.value = true
        errorMessage.value = ''
        // emit('update:isValid', true)
        return
      }
      // Validate phone number
      const number = phoneInstance.parse(phoneNumber.value, code.value)
      const isValid = phoneInstance.isValidNumber(number)
      emit('update:isValid', isValid)
      errorMessage.value = isValid
        ? ''
        : t('phone-number-must-be-in-a-valid-format')
      validNumber.value = isValid
    }
    catch (error) {
      consola.warn(error)
      errorMessage.value = t('phone-number-must-be-in-a-valid-format')
      validNumber.value = false
      emit('update:isValid', false)
    }
  },
  { deep: true, immediate: true },
)
// Utility functions
function getHint(countryCode: string): string {
  return getExampleNumber(countryCode?.toUpperCase() as CountryCode, examples)?.nationalNumber || ''
}
function validateNumberInput(event: Event): void {
  const input = event.target as HTMLInputElement
  // Remove non-numeric characters and respect maxlength
  input.value = input.value.replace(/\D/g, '').slice(0, maxPhoneLength.value)
  phoneNumber.value = input.value
}
// Computed error handling
const _error = computed(() => props.error || errorMessage.value)
// Country selection options
const countryOptions = computed(() =>
  locale.value === 'en' ? countriesEn : countriesAr,
)
</script>

<template>
  <div class="grid md:gap-2 gap-1 w-full">
    <BaseLabel
      :is-required="isRequired"
      :show-requirement="showRequirement"
      :disabled="disabled"
    >
      {{ useT("phoneNumber") }}
    </BaseLabel>
    <div
      dir="ltr"
      class="flex items-center gap-1 md:gap-3 border-2 hover:!border-primary-400 duration-300 relative h-[54px] overflow-clip focus-within:border-gold min-w-0"
      :class="{
        '!border-error hover:!border-primary-400 duration-300': _error,
      }"
    >
      <Select
        v-model.capitalize="code"
        aria-label="country select"
        :disabled="disabled"
        option-value="alpha2"
        filter
        :filter-fields="['name']"
        :auto-filter-focus="true"
        :options="countryOptions"
        :pt="{
          panel: '!border-none max-w-[370px]',
          root: `bg-transparent !border-none rounded-none py-2 relative min-w-[85px] ${_error ? '!border-error' : ''}`,
          list: 'py-2',
          filterInput: 'p-3',
        }"
        @change="phoneNumber = ''"
      >
        <template #option="{ option }">
          <div class="flex items-center gap-3">
            <img
              :src="flags[option.alpha2 as keyof typeof flags]"
              class="size-5"
            >
            <span>{{ option.name }}</span>
          </div>
        </template>
        <template #value="{ value }">
          <template v-if="!value" />
          <div v-else class="flex items-center justify-center lg:gap-2">
            <img
              :src="flags[value.toLowerCase() as keyof typeof flags]"
              class="size-5"
            >
            <span
              class="max-w-[30px] lg:max-w-[50px] truncate block text-foreground"
              :class="{ 'text-baseGray': disabled }"
            >
              {{ countryCallingCode }}
            </span>
          </div>
        </template>
      </Select>
      <input
        v-model="phoneNumber"
        :disabled="disabled"
        class="flex-auto bg-transparent p-0 focus-visible:outline-none disabled:text-secondary-300"
        type="tel"
        :placeholder="getHint(code)"
        @input="validateNumberInput"
      >
    </div>
    <span class="text-error text-sm h-1.5 -mt-1">{{ _error }}</span>
  </div>
</template>

<style scoped></style>
