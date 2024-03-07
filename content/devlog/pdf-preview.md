---
title: PDF预览组件
description: PDF.js介绍、自定义预览器、pdf转图片预览
---

## PDF.js库基本使用

> PDF.js是一个（Portable Document Format）PDF格式文件预览器<br/>
> PDF.js是一个基于Web标准的通用pdf文件解析与渲染库，社区驱动且受 Mozilla 支持

- Mozilla PDF.js官网：[https://mozilla.github.io/pdf.js](https://mozilla.github.io/pdf.js)
- Github地址：[https://github.com/mozilla/pdf.js](https://github.com/mozilla/pdf.js)
- 构建版本仓库：[https://github.com/mozilla/pdfjs-dist](https://github.com/mozilla/pdfjs-dist)
- cdn地址：[unpkg](https://unpkg.com/browse/pdfjs-dist@4.0.379/)、[cdnjs](https://cdnjs.com/libraries/pdf.js)

### 构建产物说明

pdfjs-dist目录：

- build
- cmaps
- image_decoders
- legacy
- lib
- standard_fonts
- types
- web

### API使用

## 基础功能

- 缩放
- 页码、跳页、进度
- 打印
- 排列布局：竖排、双排

## 交互问题

## PDF文件转图片预览

## 问题记录

### 使用 `pdfjs-dist@3.11.174` 报警告

::callout
The `--scale-factor` CSS-variable must be set, to the same value as `viewport.scale`, either on the `container`-element itself or higher up in the DOM.
::

### 字体缺失，需要指定 `cMapUrl`

::callout
Warning: Cannot load system font: STSong-Light, installing it could help to improve PDF rendering.
::

```typescript
pdfjsLib.getDocument({
  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/'
})
```

### `unexpected EOF in bcmap`

::callout
Warning: Error during font loading: unexpected EOF in bcmap
::

### 过时的 API 使用：`Deprecated API usage`

::callout
No "GlobalWorkerOptions.workerSrc" specified.
::

::callout
The TextLayerRender `textContent`/`textContentStream` parameters will be removed in the future, please use `textContentSource` instead.
::

### pageProxy 占用

同一个页同时进行了绘制，比如页面和缩略图同时绘制

::callout
Warning: Timer has not been started for Rendering
::

::callout
Warning: Timer has not been started for Overall
::
