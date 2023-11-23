(()=>{"use strict";var e,t={8972:(e,t,n)=>{var o=n(8302),r=n.n(o),i=n(4035);function a(){return document.title+"_"+(new Date).toISOString()}function s(e,t,n){var o=e.min(e.windowWidth/t,e.windowHeight/n);e.resizeCanvas(o*t,o*n)}var d=n(363),u={columns:20,rows:20,size:50},c=n.n(d)().create(10,10,"settings");c.hide(),c.bindNumber("columns",0,100,u.columns,1,u),c.bindNumber("rows",0,100,u.rows,1,u),c.bindNumber("size",0,100,u.size,1,u),r()(i);var v=function(e){e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight),c.addText("Aspect Ratio","11x14",(function(t){!function(e,t){var n=t.split(":");if(2!==n.length&&(n=t.split("x")),2===n.length){var o=parseFloat(n[0]);if(!isNaN(o)){var r=parseFloat(n[1]);isNaN(r)||s(e,o,r)}}}(e,t)})),e.frameRate(1)},e.draw=function(){function t(t,n,o,r,i,a,s,d){var u=d*o*r,c=u*s,v=u*(1-s),f=new Set;e.stroke(i);for(var l=0;l<c-1;l++){var h=void 0,p=void 0;do{h=Math.round(e.random(0,r-1)),p=Math.round(e.random(0,o-1))}while(f.has(h.toString()+","+p.toString()));f.add(h.toString()+","+p.toString()),e.point(t+h,n+p)}for(e.stroke(a),l=0;l<v-1;l++){h=void 0,p=void 0;do{h=Math.round(e.random(0,r-1)),p=Math.round(e.random(0,o-1))}while(f.has(h.toString()+","+p.toString()));f.add(h.toString()+","+p.toString()),e.point(t+h,n+p)}}e.background(0),e.strokeWeight(1.2);for(var n=0;n<=u.rows;n++)for(var o=0;o<=u.columns;o++)t(10+o*u.size,10+n*u.size,u.size,u.size,"#e236ff","#0773ff",o/u.columns,1-n/u.rows)},e.mouseClicked=function(){},e.keyPressed=function(){(function(e,t){"s"===e.key?function(e){var t=a();e.save(t.concat(".png"))}(e):"S"===e.key?function(e,t){var n=a(),o=document.createElement("div");o.id="hidden_div",o.style.display="none",document.body.appendChild(o);var r=new i(t,o);r.setup=function(){r.createCanvas(e.width,e.height,e.SVG)},r.setup(),r.draw(),r.save(n.concat(".svg")),r.remove(),o.remove()}(e,t):"1"===e.key?e.resizeCanvas(e.windowWidth,e.windowHeight):"2"===e.key?s(e,11,14):"3"===e.key&&s(e,9,16)})(e,v),e.keyCode===e.ESCAPE&&c.toggleVisibility()}};new i(v,document.body)}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,r,i)=>{if(!n){var a=1/0;for(c=0;c<e.length;c++){for(var[n,r,i]=e[c],s=!0,d=0;d<n.length;d++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](n[d])))?n.splice(d--,1):(s=!1,i<a&&(a=i));if(s){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[n,r,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={8938:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,i,[a,s,d]=n,u=0;if(a.some((t=>0!==e[t]))){for(r in s)o.o(s,r)&&(o.m[r]=s[r]);if(d)var c=d(o)}for(t&&t(n);u<a.length;u++)i=a[u],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(c)},n=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[4035,8302,363],(()=>o(8972)));r=o.O(r)})();