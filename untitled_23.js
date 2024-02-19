(()=>{"use strict";var e,n={8199:(e,n,t)=>{var i=t(8302),o=t.n(i),r=t(4035);function a(){return document.title+"_"+(new Date).toISOString()}function d(e,n,t,i,o){void 0===i&&(i=e.windowWidth),void 0===o&&(o=e.windowHeight);var r=e.min(i/n,o/t);e.resizeCanvas(r*n,r*t)}var s=t(363),u=t.n(s),c=t(7019),v=c.ZP.circle,l=c.ZP.point,p={numLines:3,pointsPerLine:20,diameter:600,zoom:10},f=u().create(10,10,"settings");f.hide(),f.bindNumber("numLines",0,1e3,p.numLines,1,p),f.bindRange("pointsPerLine",2,100,p.pointsPerLine,1,p),f.bindRange("diameter",1,1e3,p.diameter,1,p),f.bindNumber("zoom",0,5,p.zoom,.1,p),o()(r);var h=function(e){e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight),f.addText("Aspect Ratio","11x14",(function(n){!function(e,n,t,i){var o=n.split(":");if(2!==o.length&&(o=n.split("x")),2===o.length){var r=parseFloat(o[0]);if(!isNaN(r)){var a=parseFloat(o[1]);isNaN(a)||d(e,r,a,void 0,void 0)}}}(e,n)}))},e.draw=function(){var n=["#809BCE","#95B8D1","#B8E0D2","#D6EADF","#EAC4D5"];e.background(0),e.angleMode(e.DEGREES),e.noFill(),e.translate(e.width/2,e.height/2);for(var t=v(l(0,0),p.diameter/2).toArc(),i=0;i<p.numLines;i++){e.stroke(n[i%n.length]),e.rotate(180*e.noise(i)),e.beginShape();for(var o=0;o<p.pointsPerLine;o++){var r=e.noise(i*p.zoom,o*p.zoom)*t.length;o%2==0&&(r=t.length-r);var a=t.pointAtLength(r);e.vertex(a.x,a.y)}e.endShape()}},e.mouseClicked=function(){},e.keyPressed=function(){(function(e,n){"s"===e.key?function(e){var n=a();e.save(n.concat(".png"))}(e):"S"===e.key?function(e,n){var t=a(),i=document.createElement("div");i.id="hidden_div",i.style.display="none",document.body.appendChild(i);var o=new r(n,i);o.setup=function(){o.createCanvas(e.width,e.height,e.SVG)},o.setup(),o.draw(),o.save(t.concat(".svg")),o.remove(),i.remove()}(e,n):"1"===e.key?e.resizeCanvas(e.windowWidth,e.windowHeight):"2"===e.key?d(e,11,14):"3"===e.key&&d(e,9,16)})(e,h),e.keyCode===e.ESCAPE&&f.toggleVisibility()}};new r(h,document.body)}},t={};function i(e){var o=t[e];if(void 0!==o)return o.exports;var r=t[e]={exports:{}};return n[e](r,r.exports,i),r.exports}i.m=n,e=[],i.O=(n,t,o,r)=>{if(!t){var a=1/0;for(c=0;c<e.length;c++){for(var[t,o,r]=e[c],d=!0,s=0;s<t.length;s++)(!1&r||a>=r)&&Object.keys(i.O).every((e=>i.O[e](t[s])))?t.splice(s--,1):(d=!1,r<a&&(a=r));if(d){e.splice(c--,1);var u=o();void 0!==u&&(n=u)}}return n}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[t,o,r]},i.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return i.d(n,{a:n}),n},i.d=(e,n)=>{for(var t in n)i.o(n,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={8418:0};i.O.j=n=>0===e[n];var n=(n,t)=>{var o,r,[a,d,s]=t,u=0;if(a.some((n=>0!==e[n]))){for(o in d)i.o(d,o)&&(i.m[o]=d[o]);if(s)var c=s(i)}for(n&&n(t);u<a.length;u++)r=a[u],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(c)},t=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var o=i.O(void 0,[4035,8302,363,7019],(()=>i(8199)));o=i.O(o)})();