<script setup lang="ts">

const switchLocalePath = useSwitchLocalePath()
const { localeProperties } = useI18n()

</script>

<template>
  <div>
    <NuxtLink class="localeButtonStyle"
      :to=" switchLocalePath( localeProperties.code === 'ar' ? 'en' : 'ar' ) ">
      <p class="flex items-center gap-2">
        <span>{{ localeProperties.name === 'عربي' ? 'English' : 'عربي' }}</span>
        <Icon name="circle-flags:ae" class="text-2xl" v-if=" localeProperties.name !== 'عربي' "/>
        <Icon name="emojione:flag-for-united-states" class="text-2xl" v-else />

      </p>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
