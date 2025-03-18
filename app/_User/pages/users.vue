<script lang="ts" setup>

definePageMeta({
  title: 'Home',
  description: 'Home page',
  layout: 'users',
})

const userCards = ref([
  {
    title: 'Dashboard',
    icon: 'material-symbols:dashboard',
    href: '/',
  },
  {
    title: 'Users',
    icon: 'solar:users-group-rounded-linear',
    href: '/users',
  },
  {
    title: 'Holidays',
    icon: 'solar:tea-cup-bold-duotone',
    href: '/holidays',
  },
  {
    title: 'Settings',
    icon: 'material-symbols:settings-outline-rounded',
    href: '/settings',
  },
])
</script>

<template>
  <main class=" flex h-full flex-col justify-between gap-6">
    <div class=" between gap-2">
      <BaseInput placeholder="Search users" />
      <BaseButton>Add new User</BaseButton>
    </div>
    <div class="card__grid__layout grow">
      kknmdskaskdnkj
    </div>
    <div class=" flex justify-end mb-4">
      <Pagination />
    </div>
  </main>
</template>

<style scoped>
.card__grid__layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
