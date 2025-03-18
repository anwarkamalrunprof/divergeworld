<script setup lang="ts">
const currentYear = ref( new Date().getFullYear() )

</script>

<template>
	<footer class="bg-secondary-300 bg-opacity-20 border-t">
		<div class="container">
			<div
				class="text-center center  py-2.5">
					<p>
						{{ $t( "nav.copyright" ) }} &nbsp;{{ currentYear }}&nbsp;{{
							$t( "nav.rightsReserved" )
						}}
					</p>
					<p class="font-serif pt-1">
						{{ $t( "developed" ) }} &nbsp;
						<BaseTooltip>
							<template #trigger>
								<!-- Pop up trigger content -->
								<button @click=" showModal "
									class="text-gold-400 underline underline-offset-8 bg-transparent border-none cursor-pointer p-0">
									{{ $t( "AnwarKamal" ) }}
								</button>
							</template>
							<template #body>
								<div  class="whitespace-nowrap dark:text-secondary-200">anwark.code@gmail.com</div>
							</template>
						</BaseTooltip>
					</p>

			</div>
		</div>
	</footer>

</template>

<style scoped></style>
