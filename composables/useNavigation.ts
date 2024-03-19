import { createSharedComposable } from '@vueuse/core'

const _useNavigation = () => {
  const headerLinks = computed(() => {
    const route = useRoute()

    return [
      {
        label: '文章',
        icon: 'i-ph-book-bookmark-duotone',
        to: '/docs',
        search: false,
        children: [
          {
            label: '技术',
            description: '基础、工程化、实践问题',
            icon: 'i-ph-rocket-launch-duotone',
            to: '/docs/fe',
            active: route.path.startsWith('/docs/fe'),
          },
          {
            label: '计算机',
            description: '计网、数据结构与算法',
            icon: 'i-ph-book-open-duotone',
            to: '/docs/basic',
            active: route.path.startsWith('/docs/basic'),
          },
          {
            label: '生活杂谈',
            description: 'Explore the Nuxt API.',
            icon: 'i-ph-code',
            to: '/docs/others',
            active: route.path.startsWith('/docs/others'),
          },
        ],
      },
      {
        label: '关于',
        icon: 'i-ph-newspaper-duotone',
        to: '/about',
      },
    ]
  })

  // const footerLinks = [{
  //   label: 'Community',
  //   children: [{
  //     label: 'Nuxters',
  //     to: 'https://nuxters.nuxt.com',
  //     target: '_blank'
  //   }, {
  //     label: 'Nuxt on GitHub',
  //     to: 'https://github.com/nuxt',
  //     target: '_blank'
  //   }, {
  //     label: 'Team',
  //     to: '/team'
  //   }, {
  //     label: 'Design Kit',
  //     to: '/design-kit'
  //   }]
  // }, {
  //   label: 'Enterprise',
  //   children: [{
  //     label: 'Support',
  //     to: '/enterprise/support'
  //   }, {
  //     label: 'Agencies',
  //     to: '/enterprise/agencies'
  //   }, {
  //     label: 'Jobs',
  //     to: '/enterprise/jobs'
  //   }, {
  //     label: 'Sponsors',
  //     to: '/enterprise/sponsors'
  //   }]
  // }, {
  //   label: 'Solutions',
  //   children: [{
  //     label: 'Nuxt Content',
  //     to: 'https://content.nuxt.com/',
  //     target: '_blank'
  //   }, {
  //     label: 'Nuxt DevTools',
  //     to: 'https://devtools.nuxt.com/',
  //     target: '_blank'
  //   }, {
  //     label: 'Nuxt Image',
  //     to: 'https://image.nuxt.com/',
  //     target: '_blank'
  //   }, {
  //     label: 'Nuxt UI',
  //     to: 'https://ui.nuxt.com/',
  //     target: '_blank'
  //   }]
  // }]

  // const searchLinks = computed(() => [...headerLinks.value.map(link => {
  //   // Remove `/docs` and `/enterprise` links from command palette
  //   if (link.search === false) {
  //     return {
  //       label: link.label,
  //       icon: link.icon,
  //       children: link.children
  //     }
  //   }

  //   return link
  // }).filter(Boolean), {
  //   label: 'Team',
  //   icon: 'i-ph-users-duotone',
  //   to: '/team'
  // }, {
  //   label: 'Design Kit',
  //   icon: 'i-ph-palette-duotone',
  //   to: '/design-kit'
  // }, {
  //   label: 'Newsletter',
  //   icon: 'i-ph-envelope-simple-duotone',
  //   to: '/newsletter'
  // }])

  // const searchGroups = [{
  //   key: 'modules-search',
  //   label: 'Modules',
  //   search: async (q) => {
  //     if (!q) {
  //       return []
  //     }

  //     const { modules, fetchList } = useModules()
  //     if (!modules.value.length) {
  //       await fetchList()
  //     }

  //     return modules.value
  //       .filter(module => ['name', 'npm', 'repo'].map(field => module[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
  //       .map(module => ({
  //         id: `module-${module.name}`,
  //         label: module.name,
  //         suffix: module.description,
  //         avatar: {
  //           src: moduleImage(module.icon)
  //         },
  //         to: `/modules/${module.name}`
  //       }))
  //   }
  // }, {
  //   key: 'hosting-search',
  //   label: 'Hosting',
  //   search: async (q) => {
  //     if (!q) {
  //       return []
  //     }

  //     const { providers, fetchList } = useHostingProviders()
  //     if (!providers.value.length) {
  //       await fetchList()
  //     }

  //     return providers.value
  //       .filter(hosting => ['title'].map(field => hosting[field]).filter(Boolean).some(value => value.search(searchTextRegExp(q)) !== -1))
  //       .map(hosting => ({
  //         id: `hosting-${hosting._path}`,
  //         label: hosting.title,
  //         suffix: hosting.description,
  //         icon: hosting.logoIcon,
  //         avatar: hosting.logoSrc ? {
  //           src: hosting.logoSrc
  //         } : undefined,
  //         to: hosting._path
  //       }))
  //   }
  // }, {
  //   key: 'articles-search',
  //   label: 'Articles',
  //   search: async (q) => {
  //     if (!q) {
  //       return []
  //     }

  //     const { articles, fetchList } = useBlog()
  //     if (!articles.value.length) {
  //       await fetchList()
  //     }

  //     return articles.value
  //       .filter(article => article.title.search(searchTextRegExp(q)) !== -1)
  //       .map(article => ({
  //         id: `article-${article._path}`,
  //         label: article.title,
  //         suffix: article.description,
  //         icon: 'i-ph-newspaper',
  //         to: article._path
  //       }))
  //   }
  // }]

  return {
    headerLinks,
    // footerLinks,
    // searchLinks,
    // searchGroups
  }
}

export const useNavigation = createSharedComposable(_useNavigation)
