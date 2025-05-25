---
# ============================================================
# You can also start simply with 'default'
# ============================================================
theme: ./theme
# ============================================================
# some information about your slides (markdown enabled)
# ============================================================
title: Slidev Starter Template
favicon: /favicon.webp
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
# class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
# transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
# seoMeta:
#  ogImage: https://cover.sli.dev

# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev

twoslash: true
fonts:
  sans: Inter
  serif: Inter
  mono: JetBrains Mono

# defaults:
#   layout: center
# class: prose mx-auto
colorSchema: dark
lineNumbers: true
---

# Slidev Starter Template

Presentation slides for developers

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
src: ./pages/2-what-is-slidev.md
hide: false
---
---
src: ./pages/3-navigation.md
hide: false
---
---
src: ./pages/4-table-of-contents.md
hide: false
---
---
src: ./pages/5-code.md
hide: false
---
---
src: ./pages/6-shiki-magic-move.md
hide: false
---
---
src: ./pages/7-components.md
hide: false
---
---
src: ./pages/8-themes.md
hide: false
---
---
src: ./pages/9-clicks-animations.md
hide: false
---
---
src: ./pages/10-motions.md
hide: false
---
---
src: ./pages/11-latex.md
hide: false
---
---
src: ./pages/12-diagrams.md
hide: false
---
---
src: ./pages/13-draggable-elements.md
hide: false
---
---
src: ./pages/14-monaco-editor.md
hide: false
---
---
src: ./pages/15-learn-more.md
hide: false
---
---
src: ./pages/16-question.md
hide: false
---

