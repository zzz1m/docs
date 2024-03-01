<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})
</script>

<template>
  <div>
    <ULandingHero v-if="page.hero" v-bind="page.hero">
      <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="ml-1 w-4 h-4 pointer-events-none" />
        </UBadge>
      </template>

      <template #title>
        <MDC :value="page.hero.title" />
      </template>

      <MDC :value="page.hero.code" tag="pre" class="prose prose-primary dark:prose-invert mx-auto" />
    </ULandingHero>

    <UBlogList orientation="vertical" class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <UBlogPost
        title="Nuxt 3.9"
        description="Nuxt 3.9 is out - a Christmas gift from the Nuxt team bringing Vite 5, interactive..."
      />
      <UBlogPost
        title="Nuxt DevTools 1.0"
        description="Nuxt DevTools v1.0 is out, generally available to all Nuxt projects!"
      />
      <UBlogPost
        title="Nuxt 3.8"
        description="Nuxt 3.8 is out, bringing built-in DevTools, automatic Nuxt Image install, a new app..."
      />
    </UBlogList>

    <ULandingSection :title="page.features.title" :links="page.features.links">
      <UPageGrid>
        <ULandingCard v-for="(item, index) of page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
