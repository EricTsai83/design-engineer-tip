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

-->