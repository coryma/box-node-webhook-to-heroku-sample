---
ID: 3648
post_title: >
  使用 ES6+ 語法 Node.js 於 AWS
  Lambda
author: user
post_excerpt: ""
layout: post
permalink: 'https://coryma.winechamb.com/2018/07/19/%e4%bd%bf%e7%94%a8-es6-%e8%aa%9e%e6%b3%95-node-js-%e6%96%bc-aws-lambda/'
published: true
post_date: 2018-07-19 17:44:47
---
如果你有某種偏執狂，就是想要用最新版本的 Javascript ，無論是 ES6 ( ES2015 ) ES7 ( ES2016) 寫 node.js，而且計畫寫 Serverless 並且部署到  AWS Lambda  (例如: webhook)，那希望這篇文章對你有些幫助。
<h4>Step 1: 安裝 node-lambda</h4>
執行以下指令，安裝 node-lambda

[sourcecode language="shell"]
$ npm install -g node-lambda
[/sourcecode]

node-lambda 是一套 CLI (command line tool) 工具，可以讓開發者在本地端執行及測試 AWS Lambda 的 node.js 應用程式，並可將其部署到  <a href="http://aws.amazon.com/lambda/" rel="nofollow">Amazon Lambda</a> 上
<p class="package-description-redundant">詳細請參考 <a href="https://www.npmjs.com/package/node-lambda">https://www.npmjs.com/package/node-lambda</a></p>

<h4>Step 2: 下載 node-lambda-babel-template</h4>
有位善心人士把  <a href="http://webpack.github.io/" rel="nofollow">webpack</a> 及 <a href="https://babeljs.io/" rel="nofollow">Babel</a>  加入進了 <strong>@motdotla</strong>'s <a href="https://github.com/motdotla/node-lambda-template" rel="nofollow">node-lambda-template</a> 所做的 node.js 程式模板，讓我們可以使用最新版本的 Javascript 撰寫 node.js 跑在<a href="http://aws.amazon.com/lambda/" rel="nofollow">Amazon Lambda</a><a href="http://aws.amazon.com/lambda/" rel="nofollow"> </a>上

執行以下指令，下載 node-lambda-babel-template

[sourcecode language="shell"]
curl -o- https://ribjyr1g9l.execute-api.us-east-1.amazonaws.com/nodelambdababeltemplate/latest | bash
[/sourcecode]

將 node-lambda-babel-template 改為自己的專案名 (例:node-lambda-babel-hello-world)

[sourcecode language="shell"]
$ mv node-lambda-babel-template node-lambda-babel-hello-world
$ cd node-lambda-babel-hello-world
[/sourcecode]

<h4>Step 3: 修改 package.json</h4>
先開啟 package.json，將與專案名稱相關的內容，改為自己的專案名。再來由於 node-lambda v0.8 有一個小bug，所以需要將 package.json 中 node-lambda 設定，將版本改為 ^0.11.7

[sourcecode language="shell"]
&amp;quot;node-lambda&amp;quot;: &amp;quot;^0.11.7&amp;quot;,
[/sourcecode]

<h4>Step 4: 完成 node-lamba setup</h4>
執行以下指令

[sourcecode language="shell"]
$ npm install
[/sourcecode]

npm install 會執行 node-lambda setup，下載相關的node_modules並自動產生以下檔案<code>context.json</code>, <code>event.json</code>, <code>.env</code>, and <code>deploy.env</code>

可以參考 <a href="https://github.com/motdotla/node-lambda#setup" rel="nofollow">https://github.com/motdotla/node-lambda#setup</a> 了解更多內容

打開 .env 檔, 修改以下的欄位

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_ROLE_ARN=
AWS_REGION=

並且將  .env 檔中 AWS_DLQ_TARGET_ARN= 這行移除(否則會出問題)

<em>Note:</em>
<ul>
 	<li><em>AWS_ENVIRONMENT 與 AWS_HANDLER 定義在 package.json 中的 npm script，並不是在 .env 中定義，所以記得要是要改 handler name (預設是 default) 要去 package.json 中改 </em></li>
 	<li><em>關於 AWS Role 的設定可參考 </em><a href="https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example-create-iam-role.html"><em>https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example-create-iam-role.html</em></a></li>
</ul>
<h4>Step 5: 編寫程式</h4>
接下來就可以開始撰寫程式，預設的啟動程式是 index.js，所以開啟 index.js 加入你自己的程式 (當然是使用 ES6/ES7 語法)

<a href="http://webpack.github.io/" rel="nofollow">webpack</a> 會將 index.js 編譯轉碼至 dist/index.js

[sourcecode language="shell"]
$ npm start
[/sourcecode]

可以修改 webpack.config.js 及 .babelrc ，加入額外你需要的 plugins 及  presets.

使用下面指令，測試你的程式

[sourcecode language="shell"]
$ npm test
[/sourcecode]

修改 event.json 加入你要模擬的 event 事件
<h4>Step 6: 佈建至 AWS Lambda</h4>
使用下面指令，佈建你的程式至 AWS Lambda

[sourcecode language="shell"]
$ npm run deploy
[/sourcecode]


<hr />

參考:
<a href="https://github.com/motdotla/node-lambda">https://github.com/motdotla/node-lambda</a>
<a href="https://github.com/motdotla/node-lambda-template">https://github.com/motdotla/node-lambda-template</a>
<a href="https://www.npmjs.com/package/node-lambda-babel-template">https://www.npmjs.com/package/node-lambda-babel-template</a>