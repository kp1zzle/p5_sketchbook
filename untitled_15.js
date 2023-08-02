(()=>{"use strict";var n,e={828:(n,e,o)=>{var t=o(302),r=o.n(t),i=o(35);function a(n,e,o){for(var t=0;t<e;t++)for(var r=0;r<n;r++)o(r,t)}function c(n,e,o){return{x:e*n,y:o*n}}var s=o(363),u={numPts:75,spacing:10,zoom:15,color1:"#018f14",color2:"#002afd"},d=o.n(s)().create(10,10,"settings");d.hide(),d.bindNumber("numPts",0,1e3,u.numPts,1,u),d.bindRange("spacing",0,100,u.spacing,1,u),d.bindRange("zoom",1,100,u.zoom,1,u),r()(i),new i((function(n){n.setup=function(){n.createCanvas(n.windowWidth,n.windowHeight)},n.draw=function(){n.background(0),n.noFill(),n.translate(n.windowWidth/2-u.numPts*u.spacing/2,n.windowHeight/2-u.numPts/11*14*u.spacing/2),n.stroke(u.color1),a(u.numPts,u.numPts/11*14,(function(e,o){var t=c(u.spacing,e,o);n.circle(t.x,t.y,n.noise(e/u.zoom,o/u.zoom)*u.spacing/2)})),n.translate(u.spacing/2,u.spacing/2),n.stroke(u.color2),a(u.numPts,u.numPts/11*14,(function(e,o){var t=c(u.spacing,e,o);n.circle(t.x,t.y,u.spacing/2-n.noise(e/u.zoom,o/u.zoom)*u.spacing/2)}))},n.mouseClicked=function(){},n.keyPressed=function(){(function(n){"s"===n.key?function(n){var e=(new Date).toISOString();n.save(e.concat(".png"))}(n):"S"===n.key&&function(n){var e=(new Date).toISOString();n.createCanvas(window.innerWidth,window.innerHeight,n.SVG),n.draw(),n.save(e.concat(".svg")),n.createCanvas(window.innerWidth,window.innerHeight),n.draw()}(n)})(n),n.keyCode===n.ESCAPE&&d.toggleVisibility()}}),document.body)}},o={};function t(n){var r=o[n];if(void 0!==r)return r.exports;var i=o[n]={exports:{}};return e[n](i,i.exports,t),i.exports}t.m=e,n=[],t.O=(e,o,r,i)=>{if(!o){var a=1/0;for(d=0;d<n.length;d++){for(var[o,r,i]=n[d],c=!0,s=0;s<o.length;s++)(!1&i||a>=i)&&Object.keys(t.O).every((n=>t.O[n](o[s])))?o.splice(s--,1):(c=!1,i<a&&(a=i));if(c){n.splice(d--,1);var u=r();void 0!==u&&(e=u)}}return e}i=i||0;for(var d=n.length;d>0&&n[d-1][2]>i;d--)n[d]=n[d-1];n[d]=[o,r,i]},t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n={299:0};t.O.j=e=>0===n[e];var e=(e,o)=>{var r,i,[a,c,s]=o,u=0;if(a.some((e=>0!==n[e]))){for(r in c)t.o(c,r)&&(t.m[r]=c[r]);if(s)var d=s(t)}for(e&&e(o);u<a.length;u++)i=a[u],t.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return t.O(d)},o=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var r=t.O(void 0,[35,302,363],(()=>t(828)));r=t.O(r)})();