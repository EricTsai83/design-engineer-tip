---
layout: default
clicks: 2
---
<br/>


# 根據情境調整動畫

<div class="flex flex-col pt-3">
  <div class="flex justify-center gap-4">
    <div class="flex flex-col items-center">
      <React is="google-tabs" tooltipDelay="none" />
    </div>
       <div class="flex flex-col items-center">
      <React is="google-tabs" tooltipDelay="default" />
    </div>
    <div class="flex flex-col items-center">
      <React is="google-tabs" tooltipDelay="skipOnContinuous" />
    </div>
  </div>
  <div v-click="1" class="flex justify-center gap-26">
    <div class="flex flex-col items-center">
      <p class="w-56">完全無延遲，立即顯示 tooltip</p>
    </div>
    <div class="flex flex-col items-center">
      <p class="w-56">預設或非連續 hover，使用正常 delay</p>
    </div>
     <div class="flex flex-col items-center">
      <p class="w-56">連續 hover，立即顯示 tooltip，無延遲</p>
    </div>
  </div>
</div>

<div v-if="$slidev.nav.clicks >= 1" v-mark.red="2" class="absolute bottom-15 left-20">
  tip: 動畫需根據使用者的行為進行調整，來極大化使用者體驗
</div>



<!--
在這個例子當中，cursor 大可選擇靜態圖片，或是一些酷炫的動畫效果，但他選擇了在他的首頁中最顯眼的位置展示 cursor 是一個什麼樣的工具。

讓按下按鈕時，做微微縮小的動畫效果，這樣可以讓使用者知道按鈕被按下，並且感受到按鈕的反饋。雖然只是個小細節，但卻能讓介面感覺更加靈動些。

突然出現一個 toast 圖示會顯得突兀，所以我們設計了動畫效果。 且讓它從同一方向出現和消失，因此營造了空間上的一致性，使下滑關閉的手勢更加直觀。
-->