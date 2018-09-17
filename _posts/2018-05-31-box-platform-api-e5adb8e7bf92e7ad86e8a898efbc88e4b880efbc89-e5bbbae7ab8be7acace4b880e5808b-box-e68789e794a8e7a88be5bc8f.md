---
ID: 3605
post_title: >
  Box Platform API 學習筆記（一）
  建立第一個 Box 應用程式
author: Cory Ma
post_excerpt: ""
layout: post
permalink: 'https://www.coryma.me/2018/05/31/box-platform-api-%e5%ad%b8%e7%bf%92%e7%ad%86%e8%a8%98%ef%bc%88%e4%b8%80%ef%bc%89-%e5%bb%ba%e7%ab%8b%e7%ac%ac%e4%b8%80%e5%80%8b-box-%e6%87%89%e7%94%a8%e7%a8%8b%e5%bc%8f/'
published: true
post_date: 2018-05-31 18:10:04
---
Box 比其他雲端硬碟（例如：Dropbox、GoogleDrive、OneDrive、百度雲)更厲害的地方，就是對於應用程式開發者來說，Box 提供了相當完整的 API 及 SDK，讓企業可將暨有的應用附加上 Box 的很多功能。甚至可以直接利用 BOX API 打造一個自己專屬的BOX 系統及介面。 BOX Platform API 能研究的東西實在太多了，這一篇主要先談如何在自己的應用裡面嵌入 BOX 的功能。

以下是幾種整合BOX功能至應用系統及服務的方式：
<ul>
 	<li><strong>獨立應用程式</strong>
具有 Box 內容服務的 Web 應用程式。例如:直接在應用裡面嵌入 BOX 介面、直接調取 BOX 檔案預覽功能預覽應用程式裡的檔案，或啟用及控制使用者權限及共同作業功能。</li>
 	<li><strong>企業整合功能</strong>
使用程式與後端整合功能來擴展你的 Box 功能。範例整合功能包含使用者、群組，和事件管理功能。</li>
 	<li><strong>合作夥伴整合功能</strong>
允許使用者在您的協力廠商應用程式中存取、編輯與儲存 Box 內容，並提供如電子簽名或專案管理服務等功能。</li>
</ul>
試想如果要在自己的一個應用系統裡面嵌入類似 Box 或 DropBox 這樣雲端硬碟功能，會是一件多蠻複雜的工程。這樣的系統至少要有以下幾個功能：
<ol>
 	<li>目錄結構</li>
 	<li>權限管控</li>
 	<li>檔案線上預覽</li>
 	<li>上傳及下載檔案</li>
</ol>
每個功能，光是要把它實作出來，就不知道要花多久的時間，所以 Box 有提供了現成的 Box UI 元件可供開發人員直接調用使用。

本文先以獨立Web應用程式作為一個開始，建立你第一個Box應用。最終你可以瞭解如何將Box的功能及UI元件直接嵌入到你的Web應用程式中：
<h4>Step 1: 建立 Box Platform 應用程式</h4>
要開始開發BOX應用，首先要先登入 Box 帳號 ，要是沒有 Box 帳號，可以依照<a href="http://www.coryma.me/2017/12/22/%e8%a8%bb%e5%86%8a%e5%85%8d%e8%b2%bbbox%e5%b8%b3%e8%99%9f-10gb-%e9%9b%b2%e7%ab%af%e7%a1%ac%e7%a2%9f/" target="_blank" rel="noopener">註冊免費box帳號</a>的說明，註冊一個免費的 Box 帳號，然後點選 Box Developers 網站 右上方的 Console 連結，登入 Box 開發人員主控台
<img class="alignnone" src="https://farm2.staticflickr.com/1734/41567389435_2d78f4fac7_z_d.jpg" alt="Box Platform" width="537" height="260" />
接下來進入開發人員主控台後，點選<strong>建立新應用程式</strong>
<img class="alignnone " src="https://farm2.staticflickr.com/1723/28597850528_17c20965d0_z_d.jpg" width="510" height="279" />
選擇<strong>自訂應用程式</strong>
<img class="alignnone " src="https://farm2.staticflickr.com/1753/41567700555_6d415021ef_z_d.jpg" width="521" height="307" />
選擇使用<strong> OAuth 2.0 搭配 JWT 方式進行驗證</strong>
<img class="alignnone " src="https://farm2.staticflickr.com/1744/40661580670_7125c5a54e_z_d.jpg" width="435" height="414" />

為應用程式取一個名字，按下<strong>建立應用程式</strong>
應用程式建立好之後。畫面上會出現如下圖的畫面。

<img class="alignnone " src="https://farm2.staticflickr.com/1757/28597850668_8a242eced3_z_d.jpg" width="463" height="336" />

你可以直接使用 curl 指令（ Mac有內建，<a href="https://curl.haxx.se/download.html#Win64" target="_blank" rel="noopener">Windows要另外裝</a>）測試 Box API 是否可以運作。要注意 curl 指令中的 Authorization: Bearer [憑證] ，憑證中的32字元字串是開發人員專用的暫時憑證，60分鐘就會到期。在開發階段，你可以先不用實作 OAuth 2.0 JWT 的 SSO ，只要先用暫時憑證，就可以測試應用程式了。暫時憑證的取得方式會在下一步驟 Step 2 說明。

接下來，點選<strong>檢視您的應用程式</strong>，進入應用程式組態的畫面

<hr />

<h4>Step 2: 設定 Box 應用程式組態</h4>
進入應用程式組態設定畫面後，會看到開發人員憑證的欄位，現在可以 Copy 下來，或等下再回來 Copy 讓你的應用程式使用
<img class="alignnone " src="https://farm2.staticflickr.com/1752/27600027347_c317d95a2a_z_d.jpg" width="521" height="241" />

到畫面下方，在 <a href="https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Access_control_CORS">CORS</a> 網域欄位中，填入你的 Web Server 網域名稱，若是要先在本機測試，填入 http://localhost 再來按下<strong>儲存變更</strong>

<img class="alignnone size-portfolio" src="https://farm1.staticflickr.com/886/42470708991_e55e9fd4e5_z_d.jpg" width="640" height="280" />

<hr />

<h4>Step 3: 撰寫HTML code</h4>
若是使用 Windows 本機測試，可以直接使用內建的 IIS HTTP Server。於 HTTP Server 根目錄加入以下的 HTML code 並啟動 HTTP Server。

若是你使用 Mac 內建的 Apache server 做測試，先到 Apache 根目錄 /Library/WebServer/Documents/ 建立一個新的 HTML 檔 (例如: boxdemo.html)，於 boxdemo.html 中使用下面的 html code

[sourcecode language="html" highlight="18,19" title="boxdemo.html" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"]

&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en-US&quot;&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot; /&gt;
&lt;title&gt;Box Content Explorer Demo&lt;/title&gt;

&lt;!-- polyfill.io only loads the polyfills your browser needs --&gt;
&lt;script src=&quot;https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,Intl&quot;&gt;&lt;/script&gt;

&lt;!-- Latest version of the explorer css for your locale --&gt;
&lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn01.boxcdn.net/platform/elements/1.1.0/en-US/explorer.css&quot; /&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class=&quot;container&quot; style=&quot;height:600px&quot;&gt;&lt;/div&gt;
&lt;!-- Latest version of the explorer js for your locale --&gt;
&lt;script src=&quot;https://cdn01.boxcdn.net/platform/elements/1.1.0/en-US/explorer.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
var folderId = '0';
var accessToken = 'xxxxxxxxxxxxxxxxxxxx';
var contentExplorer = new Box.ContentExplorer();
contentExplorer.show(folderId, accessToken, {
container: '.container'
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

[/sourcecode]

要注意 html code 第19行中的 accessToken，要使用 Step 2 中你自己的開發憑證。通常要是最後網頁跑不出來，不是因為憑證有問題(要記得，憑證效期只有60分鐘，要記得去取得新的憑證)，就是因為 CORS 網域沒設定對

<hr />

<h4>Step 4:完成</h4>
使用瀏覽器，打開 Step 3 所製作的網頁 （e.g. <a href="http://localhost/boxdemo.html" target="_blank" rel="noopener">http://localhost/boxdemo.html</a> ) ，可以看到 Box UI 元件直接嵌入你的 Web 應用程式中。網頁中直接列出你的 Box account 中，根目錄的所有檔案。你也可以直接瀏覽檔案，或是對檔案進行任何你有權限進行的處理。

<img class="alignnone " src="https://farm2.staticflickr.com/1734/41568414415_ac3c18d7a5_z_d.jpg" width="617" height="321" />
如果進一步，你想修改畫面左上方的 Logo，可參考這篇<a href="https://developer.box.com/docs/specifying-a-logo-for-box-ui-elements">文件說明</a>

<hr />

Box 有提供幾種 UI 元件可供開發者嵌入至自己的應用中，提供使用者在使用你應用的同時也可以同時享有使用 Box 中檔案及資料夾的使用體驗。
Box 提供給應用程式開發人員的 UI 元件如下:
<ul>
 	<li><a href="https://developer.box.com/v2.0/docs/box-content-preview">Box Content Preview</a> – 檔案Viewer，開發者可利用此元件，提供給使用者多達130種檔案（例如：Microsoft Office、PDF、Adobe Photoshop、Adobe AI、各種圖片檔及影像檔）線上的預覽功能</li>
 	<li><a href="https://developer.box.com/v2.0/docs/box-content-picker">Box Content Pickers</a> – 讓使用者可以選擇其 Box account 中特定的檔案或是資料夾</li>
 	<li><a href="https://developer.box.com/v2.0/docs/box-content-explorer">Box Content Explorer</a> – 讓使用者可以搜尋及瀏覽檔案及資料夾</li>
 	<li><a href="https://developer.box.com/v2.0/docs/box-content-uploader">Box Content Uploader</a> – 讓使用者可以直接上傳檔案或使用 drag-and-drop上 傳檔案</li>
</ul>
Box UI 元件可以單獨使用，也可以合併再一起使用。例如上傳檔案後在線上預覽檔案。
詳細的 Box UI Elements 的說明文件及範例可以參考 <a href="https://developer.box.com/v2.0/docs/box-ui-elements">https://developer.box.com/v2.0/docs/box-ui-elements</a>
也可參考 github <a href="https://github.com/box/box-ui-elements-demo">https://github.com/box/box-ui-elements-demo</a> or <a href="https://github.com/box/box-content-preview-demo">https://github.com/box/box-content-preview-demo</a>