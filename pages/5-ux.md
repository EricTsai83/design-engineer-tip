---
layout: default
clicks: 2
---
<br/>


# 根據情境調整動畫

<div class="flex flex-col pt-3">
  <div class="flex justify-center gap-36">
    <div class="flex flex-col items-center">
      <React is="google-tabs"  />
    </div>
    <div class="flex flex-col items-center">
      <React is="google-tabs" skipDelayOnContinuousHover="enabled" />
    </div>
  </div>
  <div v-click="1" class="flex justify-center gap-36">
    <div class="flex flex-col items-center">
      <p class="w-56">400ms 的動畫設計，會造成使用者有種延遲的不舒服感</p>
    </div>
    <div class="flex flex-col items-center">
      <p class="w-56">適當的動畫速度(180ms)能讓使用者感到舒適，也不會有物件憑空出現的感覺</p>
    </div>
  </div>
</div>

<div v-if="$slidev.nav.clicks >= 1" v-mark.red="2" class="absolute bottom-15 left-20">
  tip: 動畫需要跟使用者的行為進行調整，來極大化使用者體驗
</div>



<!--
在這個例子當中，cursor 大可選擇靜態圖片，或是一些酷炫的動畫效果，但他選擇了在他的首頁中最顯眼的位置展示 cursor 是一個什麼樣的工具。

讓按下按鈕時，做微微縮小的動畫效果，這樣可以讓使用者知道按鈕被按下，並且感受到按鈕的反饋。雖然只是個小細節，但卻能讓介面感覺更加靈動些。

突然出現一個 toast 圖示會顯得突兀，所以我們設計了動畫效果。 且讓它從同一方向出現和消失，因此營造了空間上的一致性，使下滑關閉的手勢更加直觀。
-->