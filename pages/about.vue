<template>
  <div>
    <ULandingSection
      headline="About Me"
      title="关于我"
      description="97年男生，北漂程序员"
      :links="[{
        label: '查看简历',
        color: 'gray',
        trailingIcon: 'i-heroicons-arrow-up-right-20-solid',
        size: 'lg'
      }]"
      align="left"
    >
      <img
        src="https://picsum.photos/id/357/3888/2592"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </ULandingSection>
    <ULandingSection
      headline="About This Site"
      title="关于本站"
      description="2024年上线，取自我的名字，曾一鸣"
      :links="[{ label: '开发日志', color: 'gray', trailingIcon: 'i-heroicons-arrow-up-right-20-solid', size: 'lg' }]"
      align="right"
    >
      <img
        src="https://picsum.photos/id/119/3264/2176"
        class="w-full rounded-md shadow-xl ring-1 ring-gray-300 dark:ring-gray-700"
      >
    </ULandingSection>
  </div>
</template>
