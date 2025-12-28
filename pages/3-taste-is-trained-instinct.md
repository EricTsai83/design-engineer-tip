---
layout: default
---

<br/>

# 品味是訓練出來的直覺

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
        透視表面參數
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
        <div class="text-base font-mono mb-1">❌ 沒有品味的直覺</div>
        <div class="p-2 bg-gray-700 rounded text-base border-l-2 border-red-500">
          "就讓它透明度從 <b>0</b> 變成 <b>1</b>。我很棒，搞定！"
        </div>
      </div>
      <!-- 對比 B：有品味的直覺 -->
      <div v-click="4">
        <div class="text-base font-mono mb-1 text-green-400">✅ 有品味的直覺</div>
        <div class="p-2 bg-gray-700 rounded text-base border-l-2 border-green-400">
          "稍微讓物件縮小來暗示遠近的變化，並讓物件慢慢變透明來表現離場感。"
        </div>
      </div>
    </div>
    <div v-click="5" class="mt-6 text-center opacity-80 text-base">
      「<b>動畫效果</b>」就是前端開發者證明自己品味的方式
    </div>
    
  </div>

</div>

<!--
講者備註:
1. 這一頁我們要定義標題。為什麼說品味是「訓練」出來的直覺？
2. (左邊) 因為高手看到的不是「好不好看」，而是「參數對不對」。透過大量觀察，我們訓練大腦去識別物理慣性、時間差。
3. (右邊) 當這種直覺應用在開發時，差異就出來了。
4. 沒有品味的開發者只在乎有沒有動；有品味的開發者在乎這個動態代表的「物理意義」是什麼。這就是我們接下來要 demo 的重點。
品味是一種能辨別「哪裡好」和「哪裡不好」的能力
-->