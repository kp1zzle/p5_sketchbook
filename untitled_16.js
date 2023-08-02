(()=>{"use strict";var e,n={17:(e,n,i)=>{var r=i(302),t=i.n(r),o=i(35);var a=i(363),s={numLines:75,spacing:10,lineLen:1e3,ptsPerLine:10,disturbance:100,color1:"#018f14",color2:"#002afd",zoom:100,weight:1},c=i.n(a)().create(10,10,"settings");c.hide(),c.bindNumber("numLines",0,1e3,s.numLines,1,s),c.bindRange("spacing",0,100,s.spacing,.5,s),c.bindRange("lineLen",0,2e3,s.lineLen,1,s),c.bindRange("ptsPerLine",0,100,s.ptsPerLine,1,s),c.bindRange("disturbance",0,300,s.disturbance,1,s),c.bindRange("zoom",0,300,s.zoom,1,s),c.bindRange("weight",0,10,s.weight,.1,s),t()(o),new o((function(e){e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight)},e.draw=function(){e.background(0),e.translate(e.windowWidth/2-s.numLines*s.spacing/2,e.windowHeight/2-s.lineLen/2),e.noFill(),e.stroke(s.color1),e.strokeWeight(s.weight);for(var n=0;n<s.numLines;n++){e.beginShape();for(var i=0;i<s.ptsPerLine;i++){var r=n*s.spacing,t=i*s.lineLen/s.ptsPerLine;e.curveVertex(r+s.disturbance*e.noise(r/s.zoom,t/s.zoom),t)}e.endShape()}for(e.translate(s.spacing/2,0),e.stroke(s.color2),n=0;n<s.numLines;n++){for(e.beginShape(),i=0;i<s.ptsPerLine;i++)r=n*s.spacing,t=i*s.lineLen/s.ptsPerLine,e.curveVertex(r+s.disturbance*e.noise(r/s.zoom,t/s.zoom),t);e.endShape()}},e.mouseClicked=function(){},e.keyPressed=function(){(function(e){"s"===e.key?function(e){var n=(new Date).toISOString();e.save(n.concat(".png"))}(e):"S"===e.key&&function(e){var n=(new Date).toISOString();e.createCanvas(window.innerWidth,window.innerHeight,e.SVG),e.draw(),e.save(n.concat(".svg")),e.createCanvas(window.innerWidth,window.innerHeight),e.draw()}(e)})(e),e.keyCode===e.ESCAPE&&c.toggleVisibility()}}),document.body)}},i={};function r(e){var t=i[e];if(void 0!==t)return t.exports;var o=i[e]={exports:{}};return n[e](o,o.exports,r),o.exports}r.m=n,e=[],r.O=(n,i,t,o)=>{if(!i){var a=1/0;for(u=0;u<e.length;u++){for(var[i,t,o]=e[u],s=!0,c=0;c<i.length;c++)(!1&o||a>=o)&&Object.keys(r.O).every((e=>r.O[e](i[c])))?i.splice(c--,1):(s=!1,o<a&&(a=o));if(s){e.splice(u--,1);var d=t();void 0!==d&&(n=d)}}return n}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[i,t,o]},r.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return r.d(n,{a:n}),n},r.d=(e,n)=>{for(var i in n)r.o(n,i)&&!r.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={305:0};r.O.j=n=>0===e[n];var n=(n,i)=>{var t,o,[a,s,c]=i,d=0;if(a.some((n=>0!==e[n]))){for(t in s)r.o(s,t)&&(r.m[t]=s[t]);if(c)var u=c(r)}for(n&&n(i);d<a.length;d++)o=a[d],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},i=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];i.forEach(n.bind(null,0)),i.push=n.bind(null,i.push.bind(i))})();var t=r.O(void 0,[35,302,363],(()=>r(17)));t=r.O(t)})();