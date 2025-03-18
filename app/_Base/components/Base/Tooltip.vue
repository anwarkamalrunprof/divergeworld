<template>
	<div
		@mouseover="isTooltipVisible = true"
		@mouseleave="isTooltipVisible = false"
		class="relative inline group:">
		<slot name="trigger" />
		<div
			v-if="isTooltipVisible"
			class="absolute  left-1/2 transform -translate-x-1/2 bg-white text-dark text-sm p-2 rounded shadow-lg  transition-opacity duration-500" :class="bottom?'top-full':'bottom-full'">
			<slot name="body" />
		</div>
	</div>
</template>

<script setup>
const isTooltipVisible = ref( false );

	const props = defineProps({
		bottom: {
			type: Boolean,
			defalut: false,
		},
		

	});
</script>

<style scoped></style>
