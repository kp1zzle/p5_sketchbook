(()=>{"use strict";var e,n={4811:(e,n,r)=>{var t=r(8302),o=r.n(t),i=r(4035);function a(){return document.title+"_"+(new Date).toISOString()}function u(e,n,r){var t=e.min(e.windowWidth/n,e.windowHeight/r);e.resizeCanvas(t*n,t*r)}o()(i);var s=Array(2500).fill({x:window.innerWidth/2,y:window.innerHeight/2}),d=100,c=function(e){e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight)},e.draw=function(){function n(n,r,t){var o=r.x-n.x,i=r.y-n.y,a=e.sqrt(o*o+i*i);return{x:n.x+t*(o/a),y:n.y+t*(i/a)}}function r(e,n){return 50*e+n}function t(n,r){var t=r.x-n.x,o=r.y-n.y;return e.sqrt(t*t+o*o)}e.background(0),e.stroke(255),e.noFill();for(var o=window.innerWidth/2-375,i=window.innerHeight/2-375,a=0;a<50;a++){e.beginShape();for(var u=0;u<50;u++){var c={x:o+15*u,y:i+15*a};e.mouseIsPressed&&t(c,{x:e.mouseX,y:e.mouseY})<=d&&(s[r(a,u)]={x:e.mouseX,y:e.mouseY});var v=n(c,h=s[r(a,u)],-1*Math.min(1+Math.pow(t(c,h),1.5)/Math.pow(d,1.5)*30,30)/2);e.vertex(v.x,v.y)}e.endShape()}for(var f=0;f<50;f++){for(e.beginShape(),a=0;a<50;a++){c={x:o+15*f,y:i+15*a},e.mouseIsPressed&&t(c,{x:e.mouseX,y:e.mouseY})<=d&&(s[r(a,f)]={x:e.mouseX,y:e.mouseY});var h,w=n(c,h=s[r(a,f)],Math.min(1+Math.pow(t(c,h),1.5)/Math.pow(d,1.5)*30,30)/2);e.vertex(w.x,w.y)}e.endShape()}},e.keyPressed=function(){!function(e,n){"s"===e.key?function(e){var n=a();e.save(n.concat(".png"))}(e):"S"===e.key?function(e,n){var r=a(),t=document.createElement("div");t.id="hidden_div",t.style.display="none",document.body.appendChild(t);var o=new i(n,t);o.setup=function(){o.createCanvas(e.width,e.height,e.SVG)},o.setup(),o.draw(),o.save(r.concat(".svg")),o.remove(),t.remove()}(e,n):"1"===e.key?e.resizeCanvas(e.windowWidth,e.windowHeight):"2"===e.key?u(e,11,14):"3"===e.key&&u(e,9,16)}(e,c)},e.mouseWheel=function(e){(d-=e.delta/10)<=0&&(d=0)}};new i(c,document.body)}},r={};function t(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return n[e](i,i.exports,t),i.exports}t.m=n,e=[],t.O=(n,r,o,i)=>{if(!r){var a=1/0;for(c=0;c<e.length;c++){for(var[r,o,i]=e[c],u=!0,s=0;s<r.length;s++)(!1&i||a>=i)&&Object.keys(t.O).every((e=>t.O[e](r[s])))?r.splice(s--,1):(u=!1,i<a&&(a=i));if(u){e.splice(c--,1);var d=o();void 0!==d&&(n=d)}}return n}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[r,o,i]},t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={4493:0};t.O.j=n=>0===e[n];var n=(n,r)=>{var o,i,[a,u,s]=r,d=0;if(a.some((n=>0!==e[n]))){for(o in u)t.o(u,o)&&(t.m[o]=u[o]);if(s)var c=s(t)}for(n&&n(r);d<a.length;d++)i=a[d],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(c)},r=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))})();var o=t.O(void 0,[4035,8302],(()=>t(4811)));o=t.O(o)})();