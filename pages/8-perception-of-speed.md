---
layout: default
clicks: 6
---
<br/>


# 速度的感知

<!-- 第一步：顯示 loading spinner -->
<div v-if="$slidev.nav.clicks <= 3 && $slidev.nav.clicks > 0" class="flex flex-col mt-24">
  <div class="flex justify-center gap-12">
    <div v-click="1" class="flex flex-col items-center">
      <React is="loading-spinner" speed="slow" />
      <p>感覺網站跑很慢</p>
    </div>
    <div v-click="2" class="flex flex-col items-center">
      <React is="loading-spinner" speed="fast" />
      <p>看久了讓人煩躁</p>
    </div>
    <div v-click="3" class="flex flex-col items-center">
      <React is="loading-spinner" speed="medium" />
      <p>最舒服的速度</p>
    </div>
  </div>
</div>

<!-- 第二步：顯示 dropdown menu -->
<div class="flex flex-col">
  <div v-if="$slidev.nav.clicks >=4" v-click="4" class="flex justify-center gap-48 pt-24">
    <div class="flex flex-col items-center">
      <React is="dropdown-menu" duration="slow" />
    </div>
    <div class="flex flex-col items-center">
      <React is="dropdown-menu" duration="fast" />
    </div>
  </div>
  <div v-if="$slidev.nav.clicks >= 5" v-click="5" class="flex justify-center gap-48">
    <div class="flex flex-col items-center">
      <p class="w-56">400ms 的動畫設計，會造成使用者有種延遲的不舒服感</p>
    </div>
    <div class="flex flex-col items-center">
      <p class="w-56">適當的動畫速度(180ms)能讓使用者感到舒適，也不會有物件憑空出現的感覺</p>
    </div>
  </div>
</div>


<div v-if="$slidev.nav.clicks >= 5" v-mark.red="6" class="absolute bottom-15 left-20">
  tip: 用戶感知的速度比實際速度更重要
</div>



<!--
在這個例子當中，cursor 大可選擇靜態圖片，或是一些酷炫的動畫效果，但他選擇了在他的首頁中最顯眼的位置展示 cursor 是一個什麼樣的工具。

讓按下按鈕時，做微微縮小的動畫效果，這樣可以讓使用者知道按鈕被按下，並且感受到按鈕的反饋。雖然只是個小細節，但卻能讓介面感覺更加靈動些。

突然出現一個 toast 圖示會顯得突兀，所以我們設計了動畫效果。 且讓它從同一方向出現和消失，因此營造了空間上的一致性，使下滑關閉的手勢更加直觀。
-->