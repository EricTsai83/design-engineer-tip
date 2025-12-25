---
layout: default
clicks: 3
---
<br/>


# 產品導向的動畫設計

**不要為了動畫而動畫，讓動畫真正提升產品體驗**

- 動畫需要有目的性

動畫不該只是好看，而是要幫助使用者了解系統行為。
<br/>


<!-- 第一步：顯示影片 -->
<div v-if="$slidev.nav.clicks === 1">
  <SlidevVideo controls class="w-3/4 mx-auto">
    <source src="/cursor-demo.mp4" type="video/mp4" />
  </SlidevVideo>
</div>

<!-- 第二步：顯示按鈕 -->
<div v-if="$slidev.nav.clicks === 2" class="flex gap-8 justify-center m-24">

  <button class="cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-500">Click me</button>

  <button class="cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-md active:bg-blue-500 hover:bg-blue-500 active:scale-[0.97] transition-all duration-300">Click me</button>
</div>

<!-- 第二步：顯示 toast -->
<div v-if="$slidev.nav.clicks === 3" class="flex justify-center m-24 gap-8">
<React is="wrong-toast-button" />
<React is="toast-button" />


</div>



<!--
在這個例子當中，cursor 大可選擇靜態圖片，或是一些酷炫的動畫效果，但他選擇了在他的首頁中最顯眼的位置展示 cursor 是一個什麼樣的工具。

讓按下按鈕時，做微微縮小的動畫效果，這樣可以讓使用者知道按鈕被按下，並且感受到按鈕的反饋。雖然只是個小細節，但卻能讓介面感覺更加靈動些。

突然出現一個 toast 圖示會顯得突兀，所以我們設計了動畫效果。 且讓它從同一方向出現和消失，因此營造了空間上的一致性，使下滑關閉的手勢更加直觀。
-->