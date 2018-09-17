---
ID: 3450
post_title: >
  Meteor + ReactJS 學習筆記（一）
  Hello World
author: user
post_excerpt: ""
layout: post
permalink: 'https://www.coryma.me/2018/05/09/meteor-reactjs-%e5%ad%b8%e7%bf%92%e7%ad%86%e8%a8%98-1-meteor-helloworld/'
published: true
post_date: 2018-05-09 18:48:15
---
<a href="https://www.meteor.com/" target="_blank" rel="noopener">Meteor</a>  是 Full-Stack Development (全端開發) 的 JavaScript 平台，用來開發 Web 或是 Mobile 應用。前端主要可使用 React、Blaze 或 Angular Javascript framework，後端是 Node.js。 Meteor 已經直接將 MongoDB 整合在平台內了，也包含打包工具 (build tool) 。相信如果要做 Full-Stack Development ， Meteor 會是一個很好的選擇。本文主要是說明如何 Meteor + ReactJS 完成 Hello World 範例。
<h4>Step 1: Install Meteor</h4>
用 Windows 可以先安裝  <a href="https://chocolatey.org/" target="_blank" rel="noopener">Chocolatey</a>，然後打開<strong>命令提示字元</strong>（太久沒用 Windows 了，覺得<strong>命令提示字元</strong>這名字取的好奇怪），執行以下指令

[sourcecode language="plain" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
choco install meteor
[/sourcecode]

如果是使用 Linux or Mac，在 terminal 中輸入以下指令：

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
https://install.meteor.com/ | sh
[/sourcecode]

等待安裝完畢:

[sourcecode language="plain" firstline="1" gutter="false" htmlscript="false" light="false" padlinenumbers="false"] 
% Total % Received % Xferd Average Speed Time Time Time Current
Dload Upload Total Spent Left Speed
100 7786 0 7786 0 0 3741 0 --:--:-- 0:00:02 --:--:-- 3743
Downloading Meteor distribution
######################################################################## 100.0%
[/sourcecode]

<h4>Step 2: Create Meteor project</h4>
輸入以下指令建立一個 Meteor project

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
meteor create helloworld-meteor
[/sourcecode]

<h4>Step 3: 啟動 Meteor project</h4>
切換至 meteor project 目錄，輸入 meteor 即可啟動 project

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"] 
cd helloworld-meteor
meteor
[/sourcecode]


[sourcecode language="plain" firstline="1" gutter="false" htmlscript="false" light="false" padlinenumbers="false"]
[[[[[ ~/GitHub/helloworld-meteor ]]]]]                    

=&gt; Started proxy.                             
=&gt; Started MongoDB.                           
=&gt; Started your app.                          

=&gt; App running at: http://localhost:3000/

[/sourcecode]

用瀏覽器打開 http://localhost:3000/ ，可以看到 Meteor 的基礎範例已經順利執行了
<img class="alignnone size-portfolio" src="https://farm1.staticflickr.com/965/41946928652_51d01dcbf0_z_d.jpg" width="440" height="515" />

Meteor project 主要會有兩部分的程式，client 端的程式會放在 client 目錄下，server 端的程式會放在 server 附錄下，基本檔案如下

[sourcecode language="bash" firstline="1" gutter="false" htmlscript="false" light="false" padlinenumbers="false"]
client/main.js # client 端是從這支Javascript開始執行的
client/main.html # 若是使用 React, main.html 裡面基本上就只會放一個 div element 供 React DOM使用
client/main.css # a CSS file to define your app's styles
server/main.js # server 端是從這支Javascript開始執行
package.json # a control file for installing NPM packages
package-lock.json # Describes the NPM dependency tree
.meteor # internal Meteor files
.gitignore # a control file for git
[/sourcecode]

<h4>Step 4: 安裝 React modules</h4>
原本執行 Meteor project 的 terminal (or 視窗) 不要關閉，另外打開一個 terminal，一樣回到 meteor project 所在的目錄，執行以下指令安裝 React 相關 modules

[sourcecode language="bash" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"]
meteor npm install --save react react-dom
[/sourcecode]

<h4>Step 5: 修改 main.js and main.html</h4>

[sourcecode language="html" title="main.html" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"]
&lt;head&gt;
  &lt;meta charset=&quot;utf-8&quot;&gt;
  &lt;title&gt;Hello World&lt;/title&gt;
  
&lt;/head&gt;

&lt;body&gt;
  
&lt;div id=&quot;react-root&quot;&gt;&lt;/div&gt;

&lt;/body&gt;
[/sourcecode]


[sourcecode language="js" title="main.js" firstline="1" gutter="true" htmlscript="false" light="false" padlinenumbers="false"]

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

Meteor.startup(() =&gt; render(
&lt;div&gt;Hello World&lt;/div&gt;

, document.getElementById('react-root')));
[/sourcecode]

<h4>Step 6: Hello World 完成</h4>
等待 meteor project refreshing 結束

[sourcecode language="plain" firstline="1" gutter="false" htmlscript="false" light="false" padlinenumbers="false"]
=&gt; App running at: http://localhost:3000/
=&gt; Client modified -- refreshing 
[/sourcecode]

回到瀏覽器，不需要 reload 可以看到 Hello World 顯示
<img class="alignnone" src="https://farm1.staticflickr.com/882/42404414641_425ed16328_z_d.jpg" alt="Meteor HelloWorld" width="440" height="515" />