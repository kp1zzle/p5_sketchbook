(()=>{"use strict";var e,n={761:(e,n,t)=>{var r=t(35);function i(e,n,t){return{x:(n.x-n.z)*e.cos(t),y:-1*n.y-(n.x+n.z)*e.sin(t)}}function o(e,n,t,r,i,o){a(e,[{x:n,y:t,z:r},{x:n+i,y:t,z:r},{x:n+i,y:t+i,z:r},{x:n,y:t+i,z:r}],o),a(e,[{x:n,y:t,z:r},{x:n,y:t,z:r+i},{x:n,y:t+i,z:r+i},{x:n,y:t+i,z:r}],o),a(e,[{x:n+i,y:t+i,z:r},{x:n+i,y:t+i,z:r+i},{x:n,y:t+i,z:r+i},{x:n,y:t+i,z:r}],o)}function a(e,n,t){e.beginShape();for(var r=0;r<=n.length;r++){var o=i(e,n[r%n.length],t);e.vertex(o.x,o.y)}e.endShape()}var s=function(e){function n(n,t){return 300*e.noise(n/244,t/250)+50*e.sin(n)}e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight-4)},e.draw=function(){e.angleMode(e.DEGREES),e.background(0),e.stroke(255),e.translate(e.windowWidth/2,e.windowHeight/2),e.noFill();for(var t=[],r=0;r<=500;r+=10)for(var i=0;i<=500;i+=10)t.push({x:r,y:-n(r,i),z:i});for(var a=t.length-1;a>0;a--)t[a].y,o(e,t[a].x,t[a].y,t[a].z,10,30)},e.keyPressed=function(){!function(e,n){if("s"===e.key)!function(e){var n=(new Date).toISOString();e.save(n.concat(".png"))}(e);else if("S"===e.key)!function(e,n){var t=(new Date).toISOString(),i=document.createElement("div");i.id="hidden_div",i.style.display="none",document.body.appendChild(i);var o=new r(n,i);o.setup=function(){o.createCanvas(e.width,e.height,e.SVG)},o.setup(),o.draw(),o.save(t.concat(".svg")),o.remove(),i.remove()}(e,n);else if("1"===e.key)e.resizeCanvas(e.windowWidth,e.windowHeight);else if("2"===e.key){var t=e.min(e.windowWidth/11,e.windowHeight/14);e.resizeCanvas(11*t,14*t)}}(e,s)}};new r(s,document.body)}},t={};function r(e){var i=t[e];if(void 0!==i)return i.exports;var o=t[e]={exports:{}};return n[e](o,o.exports,r),o.exports}r.m=n,e=[],r.O=(n,t,i,o)=>{if(!t){var a=1/0;for(u=0;u<e.length;u++){for(var[t,i,o]=e[u],s=!0,c=0;c<t.length;c++)(!1&o||a>=o)&&Object.keys(r.O).every((e=>r.O[e](t[c])))?t.splice(c--,1):(s=!1,o<a&&(a=o));if(s){e.splice(u--,1);var d=i();void 0!==d&&(n=d)}}return n}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[t,i,o]},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={682:0};r.O.j=n=>0===e[n];var n=(n,t)=>{var i,o,[a,s,c]=t,d=0;if(a.some((n=>0!==e[n]))){for(i in s)r.o(s,i)&&(r.m[i]=s[i]);if(c)var u=c(r)}for(n&&n(t);d<a.length;d++)o=a[d],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},t=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var i=r.O(void 0,[35],(()=>r(761)));i=r.O(i)})();