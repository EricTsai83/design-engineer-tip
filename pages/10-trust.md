---
layout: default
clicks: 4
---
<br/>


# 動畫不只是讓人開心，還能讓人放心
### 使用者會信任「看得懂、可預期、會回應」的系統

<div v-if="$slidev.nav.clicks <= 2" class="flex flex-col pt-3">
  <div class="flex justify-center gap-4">
    <div class="flex flex-col items-center">
      <React is="submit-form" mode="no-feedback" />
    </div>
     <div class="flex flex-col items-center">
      <React is="submit-form" mode="with-feedback" />
    </div>
  </div>
  <div v-click="1" class="flex justify-center gap-22">
     <div class="flex flex-col items-center">
      <p class="w-48">按下送出後無UI回饋，使用者可能不知道系統是否收到請求</p>
    </div>
    <div class="flex flex-col items-center">
      <p class="w-48">有loading狀態回饋，讓使用者知道系統正在處理，增加信任感</p>
    </div>
  </div>
</div>

<div v-if="$slidev.nav.clicks >= 1 && $slidev.nav.clicks < 3" v-mark.red="2" class="absolute bottom-15 left-20">
  tip: 動畫能給予使用者行為即時的回饋，增加使用者對於系統的信任感
</div>

<!-- 第二個例子：列表到詳情頁過渡 -->
<div v-if="$slidev.nav.clicks >= 3" class="flex flex-col pt-3">
  <div class="flex justify-center gap-36">
    <React is="list-to-detail"  mode="static"/>
    <React is="list-to-detail"  mode="animated"/>

  </div>
</div>

<div v-if="$slidev.nav.clicks >= 3" v-mark.red="4" class="absolute bottom-15 left-20">
  tip: 動畫能建立視覺連續性，讓使用者清楚知道「從哪裡來，到哪裡去」
</div>



<!--
為什麼建立信任？

你可以直接這樣說：

沒有即時回饋，使用者會開始懷疑：
是我沒點到？還是系統壞了？

Design Engineer 解讀

這不是動畫

這是「input 有被系統接收」的視覺證據
-->