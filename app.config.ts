export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
      },
    },
    // header: {
    //   wrapper: 'lg:border-0'
    // },
  },
  seo: {
    siteName: 'Z1M - Tech Blog',
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    colorPicker: true,
    navLinks: [
      {
        label: '文章',
        icon: 'i-heroicons-bars-3-bottom-left-16-solid',
        to: '/blog',
      },
      // {
      //   label: '项目',
      //   icon: 'i-radix-icons-mix',
      //   to: '/projects',
      // },
      {
        label: '关于',
        icon: 'i-radix-icons-mix',
        to: '/about',
      },
    ],
    // links: [
    //   {
    //     icon: 'i-simple-icons-github',
    //     to: 'https://github.com/zzz1m',
    //     target: '_blank',
    //     'aria-label': 'My Profile On GitHub',
    //   },
    // ],
  },
  footer: {
    credits: 'Copyright © 2024',
    colorMode: false,
    links: [
      {
        'icon': 'i-ri-weibo-fill',
        'to': 'https://weibo.com/zzz1m',
        'target': '_blank',
        'aria-label': 'Weibo',
      },
      {
        'icon': 'i-ant-design-bilibili-outlined',
        'to': 'https://space.bilibili.com/474757039',
        'target': '_blank',
        'aria-label': 'Bilbili',
      },
      {
        'icon': 'i-ri-yuque-fill',
        'to': 'https://www.yuque.com/zzz1m',
        'target': '_blank',
        'aria-label': 'Yueque',
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/zzz1m',
        'target': '_blank',
        'aria-label': 'GitHub',
      },
    ],
  },
  toc: {
    title: '目录',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/nuxt-ui-pro/docs/edit/main/content',
      links: [
        {
          icon: 'i-heroicons-star',
          label: 'Star on GitHub',
          to: 'https://github.com/nuxt/ui',
          target: '_blank',
        },
        {
          icon: 'i-heroicons-book-open',
          label: 'Nuxt UI Pro docs',
          to: 'https://ui.nuxt.com/pro/guide',
          target: '_blank',
        },
        {
          icon: 'i-simple-icons-nuxtdotjs',
          label: 'Purchase a license',
          to: 'https://ui.nuxt.com/pro/purchase',
          target: '_blank',
        },
      ],
    },
  },
})
