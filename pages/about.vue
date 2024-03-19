<script lang='ts' setup>
const { data: page } = await useAsyncData('about', () => queryContent('/about').findOne())

useSeoMeta({
  titleTemplate: '',
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
})
</script>

<template>
  <div>
    <ULandingSection
      v-for="item in page.items"
      :key="item.title"
      v-bind="item"
    >
      <img
        :src="item.img"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </ULandingSection>
  </div>
</template>
