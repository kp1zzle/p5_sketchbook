(()=>{"use strict";var e,n={6552:(e,n,t)=>{var r=t(4035);function o(e,n,t){return{x:(n.x-n.z)*e.cos(t),y:-1*n.y-(n.x+n.z)*e.sin(t)}}function i(e,n,t,r,o,i){a(e,[{x:n,y:t,z:r},{x:n+o,y:t,z:r},{x:n+o,y:t+o,z:r},{x:n,y:t+o,z:r}],i),a(e,[{x:n,y:t,z:r},{x:n,y:t,z:r+o},{x:n,y:t+o,z:r+o},{x:n,y:t+o,z:r}],i),a(e,[{x:n+o,y:t+o,z:r},{x:n+o,y:t+o,z:r+o},{x:n,y:t+o,z:r+o},{x:n,y:t+o,z:r}],i)}function a(e,n,t){e.beginShape();for(var r=0;r<=n.length;r++){var i=o(e,n[r%n.length],t);e.vertex(i.x,i.y)}e.endShape()}function c(){return document.title+"_"+(new Date).toISOString()}function u(e,n,t){var r=e.min(e.windowWidth/n,e.windowHeight/t);e.resizeCanvas(r*n,r*t)}var s=function(e){function n(n,t){return 300*e.noise(n/244,t/250)+50*e.sin(n)}e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight-4)},e.draw=function(){e.angleMode(e.DEGREES),e.background(0),e.stroke(255),e.translate(e.windowWidth/2,e.windowHeight/2),e.noFill();for(var t=[],r=0;r<=500;r+=10)for(var o=0;o<=500;o+=10)t.push({x:r,y:-n(r,o),z:o});for(var a=t.length-1;a>0;a--)t[a].y,i(e,t[a].x,t[a].y,t[a].z,10,30)},e.keyPressed=function(){!function(e,n){"s"===e.key?function(e){var n=c();e.save(n.concat(".png"))}(e):"S"===e.key?function(e,n){var t=c(),o=document.createElement("div");o.id="hidden_div",o.style.display="none",document.body.appendChild(o);var i=new r(n,o);i.setup=function(){i.createCanvas(e.width,e.height,e.SVG)},i.setup(),i.draw(),i.save(t.concat(".svg")),i.remove(),o.remove()}(e,n):"1"===e.key?e.resizeCanvas(e.windowWidth,e.windowHeight):"2"===e.key?u(e,11,14):"3"===e.key&&u(e,9,16)}(e,s)}};new r(s,document.body)}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return n[e](i,i.exports,r),i.exports}r.m=n,e=[],r.O=(n,t,o,i)=>{if(!t){var a=1/0;for(d=0;d<e.length;d++){for(var[t,o,i]=e[d],c=!0,u=0;u<t.length;u++)(!1&i||a>=i)&&Object.keys(r.O).every((e=>r.O[e](t[u])))?t.splice(u--,1):(c=!1,i<a&&(a=i));if(c){e.splice(d--,1);var s=o();void 0!==s&&(n=s)}}return n}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[t,o,i]},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={7682:0};r.O.j=n=>0===e[n];var n=(n,t)=>{var o,i,[a,c,u]=t,s=0;if(a.some((n=>0!==e[n]))){for(o in c)r.o(c,o)&&(r.m[o]=c[o]);if(u)var d=u(r)}for(n&&n(t);s<a.length;s++)i=a[s],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(d)},t=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var o=r.O(void 0,[4035],(()=>r(6552)));o=r.O(o)})();