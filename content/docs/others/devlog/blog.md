---
title: 博客
description: 本站（z1m.dev）的诞生记录
---

## 开发框架

本站基于 `nuxt@3` 构建，原因如下：

- 个人工作多年以来都是 `vue` 派，从19年开始使用 `nuxt@2`
- 生态丰富、社区活跃，官方和社区提供了很多[集成模块](https://nuxt.com/modules)，且自定义能力强
- 提供了 [`nuxt-content`](https://content.nuxt.com/)、[`nuxt-ui`](https://ui.nuxt.com/) 等模块，解决了文档 Api 和 UI 需求

另外一个好处是 `nuxt` 支持服务端渲染和静态生成，满足SEO需求。虽然本站目前仅作为个人的知识库，但SEO问题也算博客实践的一个重要部分。

## 部署环境

本站部署在 [Vercel](https://vercel.com/)，优势在于：

- 不需要租服务器
- 域名注册与 DNS 管理
- 自动部署：推送代码到 `master` 分支触发部署
- 网站分析：利用 [Vercel Web Analytics](https://vercel.com/docs/analytics)
- 性能监控：利用 [Speed Insights](https://vercel.com/docs/speed-insights)

存在的缺点就是 Vercel 因为国内政策缘故访问受限，需要科学上网，但就目前的需求来说并不算大问题，且避免了备案等问题，未来视情况可迁移到国内云服务商。

## 知识结构

在选择博客的结构方面，有传统的流式博客以及类wiki的文档树两种选择，各有优势：

- 文档流：按时间顺序发布，内容相对独立
- 文档树：结构化、有利于系统化的知识梳理

## 扩展

### 评论

基于 [`Giscus`](https://github.com/giscus/giscus)

### 白板

嵌入了 [`Excalidraw`](https://excalidraw.com/)

### 思维导图
