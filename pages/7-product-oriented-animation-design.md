---
layout: default
clicks: 7
---
<br/>


# 產品導向的動畫設計

**不要為了動畫而動畫，讓動畫真正提升產品體驗**

- 動畫需要有目的性
動畫不只是裝飾，而是要幫助使用者了解系統行為。
<br/>


<!-- 第一步：顯示影片 -->
<div v-if="$slidev.nav.clicks <= 1">
  <SlidevVideo controls class="w-[56%] mx-auto pt-4">
    <source src="/cursor-demo.mp4" type="video/mp4" />
  </SlidevVideo>
  <span v-mark.red="1" class="absolute bottom-15 left-20">
  tip: 讓動畫設計除了美觀外，同時也能傳遞產品的重要資訊。
  </span>
</div>



<!-- 第二步：顯示按鈕 -->
<div v-if="$slidev.nav.clicks === 2 || $slidev.nav.clicks === 3" >

  <div class="flex gap-8 justify-center m-20">

  <button class="cursor-pointer bg-blue-600 text-white px-12 py-6 rounded-md hover:bg-blue-500">Click me</button>

  <button class="cursor-pointer bg-blue-600 text-white px-12 py-6 rounded-md active:bg-blue-500 hover:bg-blue-500 active:scale-[0.95] transition-all duration-300">Click me</button>

  </div>
    <span v-mark.red="3" class="absolute bottom-15 left-20">
  tip: 透過模擬物理壓感回饋，強化操作的直覺與觸感。
  </span>
</div>

<!-- 第三步：顯示 toast -->
<div v-if="$slidev.nav.clicks === 4 || $slidev.nav.clicks === 5" >
<div class="flex justify-center m-24 gap-8">
  <React is="toast-button" variant="excessive" />
  <React is="toast-button" variant="appropriate" />
</div>
<span v-mark.red="5" class="absolute bottom-15 left-20">
  tip: 動畫要有「來自哪裡」而不是「憑空出現」的感覺。
</span>
</div>


<!-- 第四步：高頻率操作的動畫要勁量簡潔 -->
<div v-if="$slidev.nav.clicks === 6 || $slidev.nav.clicks === 7">
<div class="flex justify-center gap-8">
  <React is="list" variant="excessive" />
  <React is="list" variant="appropriate" />
</div>
<div v-mark.red="7" class="absolute bottom-15 left-20">
  tip: 高頻率操作行為有關的動畫要盡量簡潔快速，或根本不要用動畫
</div>
</div>


<!--
這一頁我想講的是產品導向的動畫設計，
以產品角度，動畫的設計應該要能夠提升產品體驗。而不是為了酷

先看一段影片，這是 cursor 的首頁動畫。我應該不用介紹 cursor 是什麼吧？我想大家應該都很熟悉了。畢竟在攻程菁英上出現過這麼多次了


-->