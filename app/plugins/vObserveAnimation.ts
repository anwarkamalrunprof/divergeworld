import vObserveAnimation from '~/directives/observeAnimation'

export default defineNuxtPlugin( ( nuxtApp ) => {
  // @ts-expect-error
  nuxtApp.vueApp.directive( 'observe-animation', vObserveAnimation )
} )