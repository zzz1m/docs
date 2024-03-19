<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const { headerLinks } = useNavigation()
const links = computed(() => headerLinks.value.find(link => link.to === '/docs')?.children ?? [])

const route = useRoute()

const { navPageFromPath } = useContentHelpers()

const navigationLinks = computed(() => {
  const path = ['/docs', route.params.slug?.[0]].filter(Boolean).join('/')
  return mapContentNavigation(navPageFromPath(path, navigation.value)?.children || [])
})

</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside :links="links">
          <UDivider type="dashed" class="mb-6" />
          <UNavigationTree :links="navigationLinks" />
        </UAside>
      </template>
      <NuxtPage />
    </UPage>
  </UContainer>
</template>
