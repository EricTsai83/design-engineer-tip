---
layout: default
clicks: 2
---
<br/>


# 細節決定成敗

<div class="flex flex-col pt-3">
  <div class="flex justify-center gap-4">
    <div class="flex flex-col items-center">
      <React is="copy-button" mode="none" />
    </div>
     <div class="flex flex-col items-center">
      <React is="copy-button" mode="opacity" />
    </div>
    <div class="flex flex-col items-center">
      <React is="copy-button" mode="opacity-blur" />
    </div>
  </div>
  <div v-click="1" class="flex justify-center gap-22">
     <div class="flex flex-col items-center">
      <p class="w-48">無過渡效果，直接切換，可能產生殘影</p>
    </div>
    <div class="flex flex-col items-center">
      <p class="w-48">有 opacity 過渡，但無模糊效果，轉換時可能留下殘影</p>
    </div>
    <div class="flex flex-col items-center">
      <p class="w-48">結合 opacity 與模糊效果，模糊可掩蓋殘影，過渡更流暢自然</p>
    </div>
  </div>
</div>

<div v-if="$slidev.nav.clicks >= 1" v-mark.red="2" class="absolute bottom-15 left-20">
  tip: 動畫過渡時期的設計，正是區分優秀動畫與普通動畫的關鍵。使用者可能說不出哪裡好，但能感受到差異。
</div>



<!--

-->