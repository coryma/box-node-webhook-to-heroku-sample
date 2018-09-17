---
ID: 387
post_title: >
  10分鐘完成你的第一支 Watson
  Workspace bot
author: Cory Ma
post_excerpt: >
  IBM Watson Workspace 是一個類似
  Slack or Microsoft Team
  的「團隊溝通平台」＋「即時通訊軟體」。底層稱為
  Watson Works Services，已經內建IBM
  Watson  NLU 及 IBM Watson NLC
layout: post
permalink: >
  https://www.coryma.me/2018/04/18/10mins-build-watson-workspace-bot/
published: true
post_date: 2018-04-18 08:28:26
---
IBM Watson Workspace 是一個類似 Slack or Microsoft Team 的「團隊溝通平台」＋「即時通訊軟體」。它的底層稱為 Watson Works Services，已經內建IBM Watson  NLU (Natural Language Understanding 自然語言理解) 及 IBM Watson NLC  (Natual Language Classfier 自然語言分類)。簡單來說，在 Watson Workspace 的每句對話的背後，到底這句話是一個命令動作 (ex: 你需要於星期五前完成這個專案)，或是是個問句 (ex: 你知道哪裡可以找到簡報檔嗎?)，或是這句話裡面有談到關於地域、食物、天氣、情緒、人名........，Watson Workspace都已經會有這些資料可以直皆提供給開發 Watson Workspace bot 的 developer 。

本文說明如何使用 node.js 從 0 打造一個最簡單的 Watson Workspace bot，傳送訊息到 Watson Workspace 中。知道如何傳送訊息到 Watson Workspace 中之後，能應用範圍就會很廣了，例如可以建立一個客服的後台系統，把前台不管來自網站的 chat bot 或是 line chat bot 的訊息都拋轉給後台的客服人員，客服人員可以使用  Watson Workspace 處理從不同管道進來的訊息，決定在前台 chat bot 無法自動處理客戶訊息的時候，人工介入來幫客戶處理問題。

<strong>Step 1: 註冊或登入 Watson Workspace</strong>

若還沒有 Watson Workspace 帳號，可於<a href="https://www.ibm.com/collaboration/collaboration-tools/watson-work/workspace" target="_blank" rel="noopener">註冊一個免費帳號</a>來玩玩

[caption id="" align="alignnone" width="694"]<a title="2018-04-18_10-59-29" href="https://www.ibm.com/collaboration/collaboration-tools/watson-work/workspace" target="_blank" rel="noopener"><img src="https://farm1.staticflickr.com/937/39724201710_4f71b0aaba_c.jpg" alt="2018-04-18_10-59-29" width="694" height="355" /></a> 開始試用 Watson Workspace[/caption]

接下來你可以下載 Desktop 版的 Watson Workspace 使用，也可以直接使用 Web 版的。

<strong>Step 2: 建立一個 Space</strong>

如果已經有Space了，可以跳過這個步驟。

進入 Watson Workspace 後，點選畫面中的 Spaces 旁的 + icon，建立一個 Space

https://youtu.be/nxcOhZSziuQ

<strong>Step 3: 建立一個 Watson Work Services App</strong>

進入 <a href="https://developer.watsonwork.ibm.com/apps" target="_blank" rel="noopener">Watson Work Services App console</a>

[caption id="" align="alignnone" width="616"]<a title="2018-04-18_15-24-32" href="https://developer.watsonwork.ibm.com/apps" target="_blank" rel="noopener"><img class="" src="https://farm1.staticflickr.com/887/40640492835_1e30c04895_c.jpg" alt="2018-04-18_15-24-32" width="616" height="455" /></a> 打開 Watson Work Services Apps 管理介面[/caption]

建立一個新的 App

https://youtu.be/hYrk8Weq3CY

&nbsp;

為你的 Bot 取個名字，為避免跟別人的Bot名字重複，建議在 App Name 最後加入你的名字的縮寫之類的

建立好之後，把 App ID 及 App secret 記下來（很重要，因為App secret 只會出現一次）

<a title="2018-04-18_11-17-21" href="https://www.flickr.com/photos/coryma/41534206941/in/dateposted/"><img class="" src="https://farm1.staticflickr.com/923/41534206941_33494d44ea_c.jpg" alt="2018-04-18_11-17-21" width="472" height="421" /></a>

<strong>Step 4: 將 App 加入 Space 中</strong>

到 Space Settings 中 把 Step 2 中建立的 App 加入你的 Space

https://youtu.be/zSuItJlLOKQ

<strong>Step 5: 複製 Space ID</strong>

回到 Space Settings 中，選擇 Audio &amp; Video，將畫面中 Meeting Link 的 URL，meeting/ 之後的那段編碼 copy 下來，這個就是每個 Space 的 unique ID，將它記錄起來

<a title="SpaceID" href="https://www.flickr.com/photos/coryma/40639880645/in/photostream/"><img src="https://farm1.staticflickr.com/861/40639880645_462f07b9b6_c.jpg" alt="SpaceID" width="800" height="449" /></a>

<strong>Step 6: 建立 nodejs project</strong>

建立一個新的Folder

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
mkdir wws-bot-nodejs
cd wws-bot-nodejs
[/sourcecode]

初始化 nodejs project

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
npm inits
[/sourcecode]

這邊我是使用 <a href="https://www.npmjs.com/package/watsonworkspace-sdk" target="_blank" rel="noopener">watsonworkspace-sdk</a>，這不是官方的 sdk，但是因為 Watson Works Services 的 API 呼叫大多數是透過GraphQL，這個非官方的 sdk 把呼叫 GrapQL 這段都封裝起來了，所以使用上會簡單非常的多，程式也會簡潔易懂多

watsonworkspace-sdk 除了能傳送訊息之外，也可以處理接收到的訊息，詳細可以參考 <a href="https://www.npmjs.com/package/watsonworkspace-sdk" target="_blank" rel="noopener">watsonworkspace-sdk</a>

安裝 watsonworkspace-sdk

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
npm install watsonworkspace-sdk —save
[/sourcecode]

建立 index.js
source code 如下

[sourcecode language="js" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"]
const wwsdk = require('watsonworkspace-sdk')
const ww = new wwsdk(&quot;&lt;Step 2中的 APP ID&gt;&quot;,&quot;&lt;Step 2中的 APP secret&gt;&quot;)

const msg = &quot;Hello World!!&quot;
ww.authenticate()
.then(token =&gt;; {
ww.sendMessage('&lt;Step 5中的 Space ID&gt;', msg)
})[/sourcecode]

<strong>Step 7: 測試</strong>

執行

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
node .
[/sourcecode]

回到 Watson Workspace，可以看到訊息已經傳送到 Space 中了。 第一支 Watson Workspace bot 完成！

<a title="ww_bot_result" href="https://www.flickr.com/photos/coryma/39724201980/in/photostream/"><img class="alignnone" src="https://farm1.staticflickr.com/877/39724201980_7245b4c821_c.jpg" alt="Watson Workspace bot" width="800" height="424" /></a>

&nbsp;

[av_hr class='custom' height='50' shadow='no-shadow' position='center' custom_border='av-border-thin' custom_width='50px' custom_border_color='' custom_margin_top='30px' custom_margin_bottom='30px' icon_select='yes' custom_icon_color='' icon='ue8c2' font='entypo-fontello' admin_preview_bg='']