(()=>{"use strict";var e,n={2077:(e,n,o)=>{var t=o(8302),i=o.n(t),r=o(4035);function a(){return document.title+"_"+(new Date).toISOString()}function s(e,n,o,t,i){void 0===t&&(t=e.windowWidth),void 0===i&&(i=e.windowHeight);var r=e.min(t/n,i/o);e.resizeCanvas(r*n,r*o)}var c=o(363),u={numPts:75,spacing:8,zoom:25,color1:"#0773ff",color2:"#e236ff",minCircleD:1,maxCircleDMult:.9,background:"#000000",xOffset:0,yOffset:0,colors:'["#0773ff", "#e236ff"]'},f=o.n(c)().create(10,10,"settings");f.hide(),f.bindNumber("numPts",0,1e3,u.numPts,1,u),f.bindRange("spacing",0,100,u.spacing,1,u),f.bindRange("zoom",1,100,u.zoom,1,u),f.bindRange("minCircleD",0,3,u.minCircleD,.05,u),f.bindRange("maxCircleDMult",0,1,u.maxCircleDMult,.05,u),f.bindColor("background",u.background,u),f.bindText("colors",u.colors,u),i()(r);var d=function(e){e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight),f.addButton("Randomize Noise",(function(){e.noiseSeed()}))},e.draw=function(){e.background(u.background),e.noFill(),e.translate(e.width/2-u.numPts*u.spacing/2,e.height/2-u.numPts/11*14*u.spacing/2);for(var n=JSON.parse(u.colors),o=function(o){e.translate(o%2*5,(o+1)%2*5),e.stroke(n[o]),function(e,n,o){for(var t=0;t<n;t++)for(var i=0;i<e;i++)o(i,t)}(u.numPts,u.numPts/11*14,(function(n,t){var i=function(e,n,o){return{x:n*e,y:o*e}}(u.spacing,n,t),r=function(n,o,t){var i=e.noise((u.xOffset+n)/u.zoom,(u.yOffset+o)/u.zoom,10*t);return e.max(u.minCircleD,i*u.maxCircleDMult*u.spacing)}(n,t,o);e.noise((u.xOffset+n)/u.zoom,(u.yOffset+t)/u.zoom,40*o)>.6&&e.circle(i.x,i.y,r)}))},t=0;t<n.length;t++)o(t)},e.mouseClicked=function(){},e.mouseDragged=function(){u.xOffset+=(e.pmouseX-e.mouseX)/3,u.yOffset+=(e.pmouseY-e.mouseY)/3},e.keyPressed=function(){(function(e,n){"s"===e.key?function(e){var n=a();e.save(n.concat(".png"))}(e):"S"===e.key?function(e,n){var o=a(),t=document.createElement("div");t.id="hidden_div",t.style.display="none",document.body.appendChild(t);var i=new r(n,t);i.setup=function(){i.createCanvas(e.width,e.height,e.SVG)},i.setup(),i.draw(),i.save(o.concat(".svg")),i.remove(),t.remove()}(e,n):"1"===e.key?e.resizeCanvas(e.windowWidth,e.windowHeight):"2"===e.key?s(e,11,14):"3"===e.key&&s(e,9,16)})(e,d),e.keyCode===e.ESCAPE&&f.toggleVisibility()}};new r(d,document.body)}},o={};function t(e){var i=o[e];if(void 0!==i)return i.exports;var r=o[e]={exports:{}};return n[e](r,r.exports,t),r.exports}t.m=n,e=[],t.O=(n,o,i,r)=>{if(!o){var a=1/0;for(f=0;f<e.length;f++){for(var[o,i,r]=e[f],s=!0,c=0;c<o.length;c++)(!1&r||a>=r)&&Object.keys(t.O).every((e=>t.O[e](o[c])))?o.splice(c--,1):(s=!1,r<a&&(a=r));if(s){e.splice(f--,1);var u=i();void 0!==u&&(n=u)}}return n}r=r||0;for(var f=e.length;f>0&&e[f-1][2]>r;f--)e[f]=e[f-1];e[f]=[o,i,r]},t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={3445:0};t.O.j=n=>0===e[n];var n=(n,o)=>{var i,r,[a,s,c]=o,u=0;if(a.some((n=>0!==e[n]))){for(i in s)t.o(s,i)&&(t.m[i]=s[i]);if(c)var f=c(t)}for(n&&n(o);u<a.length;u++)r=a[u],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(f)},o=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))})();var i=t.O(void 0,[4035,8302,363],(()=>t(2077)));i=t.O(i)})();