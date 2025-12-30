---
layout: default
---

<br/>

# 品味是能夠訓練

<div class="grid grid-cols-2 gap-10 mt-8">

  <!-- 左邊：定義什麼是「受過訓練的直覺」 -->
  <div class="text-left space-y-4">
    <h3>以前端開發為例：</h3>
    <div v-click="1" class="space-y-2">
      <h4 class="text-orange-400 font-bold flex items-center">
        學習先問「為什麼」
      </h4>
      <p class="leading-relaxed opacity-90 text-lg">
          開發前先判斷目的，動畫是為了：<br/>
        1. <b>吸引注意</b> <br/>
        2. <b>幫助用戶理解網站功能</b> <br/>
        3. <b>傳達產品價值</b> <br/>
      </p>
    </div>
    <div v-click="2" class="space-y-2">
      <h4 class="text-orange-400 font-bold flex items-center gap-2">
        實際動手做動畫
      </h4>
      <p class="leading-relaxed opacity-90 text-lg">
        一般人只感覺「順」或「卡」。
        <b>受過訓練的直覺</b> 能直接看穿原因：<br/>
        <span class="opacity-60">是 <b>Easing</b> 選錯？還是 <b>Duration</b> 太長？</span>
      </p>
    </div>

  </div>

  <!-- 右邊：這種直覺在動畫上的具體展現 -->
  <div v-click="3" class="bg-gray-800/50 border border-gray-700 p-6 rounded-lg relative">
    <div class="absolute -top-5 left-4 px-3 py-1 bg-gray-900 border border-gray-700 rounded-md text-base text-orange-400 font-mono shadow-lg">
      例子：讓畫面上這個物件變不見
    </div>
    <React is="taste-comparison" variant="with-taste" class="absolute top-3 right-4"/>
    <div class="space-y-8 mt-3">
      <!-- 對比 A：沒有品味的直覺 -->
      <div >
        <div class="text-base font-mono mb-1">❌ 沒有品味的做法</div>
        <div class="p-2 bg-gray-700 rounded text-base border-l-2 border-red-500">
          "就讓它透明度從 <b>0</b> 變成 <b>1</b>。我很棒，搞定！"
        </div>
      </div>
      <!-- 對比 B：有品味的直覺 -->
      <div v-click="4">
        <div class="text-base font-mono mb-1 text-green-400">✅ 有品味的做法</div>
        <div class="p-2 bg-gray-700 rounded text-base border-l-2 border-green-400">
          "讓物件慢慢縮小來暗示遠近的變化，並讓物件慢慢變透明來表現離場感。"
        </div>
      </div>
    </div>
    <div v-click="5" class="mt-6 text-center opacity-80 text-base">
      「<b>動畫效果</b>」就是前端開發者證明自己品味的方式
    </div>
    
  </div>

</div>

<!--
接下來我想跟大家分享怎麼訓練「品味」
以我熟悉的前端開發為例。

第一個訓練方式是：學習先問「為什麼」。
開發前先判斷目的，常見的目的有三個：
第一，吸引注意
第二，幫助用戶理解網站功能
第三，傳達產品價值

(點一下)

第二個訓練方式是：實際動手做動畫。
一般人看到動畫只會覺得「順」或「卡」。
但當你有實際動手做的經驗，你更能知道這個動畫為什麼看起來怪怪的，原因是什麼，該如何調整。

(點一下)

右邊我用一個例子來幫助大家理解有品味和沒有品味的區別是什麼
假設有一天你老闆跟你說，我要讓這玩意兒在畫面上「消失」。

沒有品味的做法可能是這樣：
"就讓它透明度從 0 變成 1。我很棒，搞定！"

(點一下)

有品味的做法可能是這樣：
"讓物件慢慢縮小來暗示遠近的變化，並讓物件慢慢變透明來表現離場感。"

如果大家還是沒感覺，讓我們看一下範例

(demo 範例)

(點一下)

所以我們可以發現動畫效果就是前端開發者其中一種證明自己品味的方式

(點一下)
-->