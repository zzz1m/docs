<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'
import type { HeaderLink } from '#ui-pro/types'

defineProps<{
  links?: HeaderLink[]
}>()

const navigation = inject<NavItem[]>('navigation', [])

const { header } = useAppConfig()
const { metaSymbol } = useShortcuts()
</script>

<template>
  <UHeader
    :links="links" :class="{
      'lg:border-0': $route.path === '/',
      // 'border-primary-200/75 dark:border-primary-900/50': $route.path === '/',
      // 'border-gray-200 dark:border-gray-800': $route.path !== '/'
    }"
  >
    <template #logo>
      <template v-if="header?.logo?.dark || header?.logo?.light">
        <UColorModeImage v-bind="{ class: 'h-6 w-auto', ...header?.logo }" />
      </template>
      <template v-else>
        Z1M <UBadge label="DEV" variant="subtle" class="mb-0.5" />
      </template>
    </template>

    <template #right>
      <UTooltip v-if="header?.search" text="Search" :shortcuts="[metaSymbol, 'K']" :popper="{ strategy: 'absolute' }">
        <UContentSearchButton :label="null" />
      </UTooltip>

      <ColorPicker v-if="header?.colorPicker" />

      <UColorModeButton v-if="header?.colorMode" />

      <!-- <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'gray', variant: 'ghost', ...link }"
        />
      </template> -->
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
