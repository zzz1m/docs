<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

// import type { NavItem } from '@nuxt/content/dist/runtime/types'

definePageMeta({
  layout: 'docs',
})

const route = useRoute()
const { toc, seo } = useAppConfig()

const { data: post } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!post.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent()
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path)))

useSeoMeta({
  title: post.value.title,
  ogTitle: `${post.value.title} - ${seo?.siteName}`,
  description: post.value.description,
  ogDescription: post.value.description,
})

defineOgImage({
  component: 'Docs',
  title: post.value.title,
  description: post.value.description,
})

const headline = computed(() => findPageHeadline(post.value))
// const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
// const breadcrumb = computed(() => findPageBreadcrumb(navigation.value, post.value)?.map(t => ({ label: t.title, to: t._path })))

const links = computed(() => [toc?.bottom?.edit && {
  icon: 'i-heroicons-pencil-square',
  label: 'Edit this post',
  to: `${toc.bottom.edit}/${post?.value?._file}`,
  target: '_blank',
}, ...(toc?.bottom?.links || [])].filter(Boolean))
</script>

<template>
  <UPage>
    <UPageHeader :title="post.title" :description="post.description" :links="post.links" :headline="headline">
      <template #headline>
        <UBadge v-if="post.badge" v-bind="post.badge" variant="subtle" />
        <span v-if="post.badge && post.date" class="text-gray-500 dark:text-gray-400">&middot;</span>
        <time v-if="post.date" class="text-gray-500 dark:text-gray-400">{{ new Date(post.date).toLocaleDateString('cn', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
      </template>
    </UPageHeader>

    <UPageBody prose>
      <ContentRenderer v-if="post.body" :value="post" />

      <hr v-if="surround?.length">

      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="post.toc !== false" #right>
      <UContentToc :title="toc?.title" :links="post.body?.toc?.links">
        <template v-if="toc?.bottom" #bottom>
          <div class="hidden lg:block space-y-6" :class="{ '!mt-6': post.body?.toc?.links?.length }">
            <UDivider v-if="post.body?.toc?.links?.length" type="dashed" />

            <UPageLinks :title="toc.bottom.title" :links="links" />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
