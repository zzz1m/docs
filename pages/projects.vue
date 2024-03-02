<script lang='ts' setup>
const { data: page } = await useAsyncData('projects', () => queryContent('/projects').findOne())
console.log(page)
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
    <ULandingSection :title="page.title" :description="page.description" :icon="page.icon">
      <UPageGrid>
        <ULandingCard v-for="(item, index) of page.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection>
  </div>
</template>
