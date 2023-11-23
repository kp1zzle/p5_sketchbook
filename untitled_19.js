(()=>{"use strict";var e,n={129:(e,n,t)=>{var i=t(8302),o=t.n(i),r=t(4035);function a(){return document.title+"_"+(new Date).toISOString()}function s(e,n,t){var i=e.min(e.windowWidth/n,e.windowHeight/t);e.resizeCanvas(i*n,i*t)}function c(e,n,t){for(var i=0;i<n;i++)for(var o=0;o<e;o++)t(o,i)}function u(e,n,t){return{x:n*e,y:t*e}}var l=t(363),d={numPts:75,spacing:8,zoom:25,color1:"#0773ff",color2:"#e236ff",minCircleD:1,maxCircleDMult:.5,background:"#000000",xOffset:0,yOffset:0,redWeight:.2989,greenWeight:.587,blueWeight:.114},f=t.n(l)().create(10,10,"settings");f.hide(),f.bindNumber("numPts",0,1e3,d.numPts,1,d),f.bindRange("spacing",0,100,d.spacing,1,d),f.bindRange("zoom",1,100,d.zoom,1,d),f.bindRange("minCircleD",0,10,d.minCircleD,.1,d),f.bindRange("maxCircleDMult",0,1,d.maxCircleDMult,.05,d),f.bindColor("background",d.background,d),o()(r);var g=function(e){var n=null;e.setup=function(){var t=e.createCanvas(e.windowWidth,e.windowHeight);f.addButton("Randomize Noise",(function(){e.noiseSeed()})),t.drop((function(t){"image"===t.type?n=e.loadImage(t.data,(function(){n.resize(d.numPts,d.numPts/11*14),n.loadPixels()})):console.log("Not an image file!")}))},e.draw=function(){function t(t,i,o){var r=4*(t+i*d.numPts),a=n.pixels[r]/255*d.redWeight+n.pixels[r+1]/255*d.greenWeight+n.pixels[r+2]/255*d.blueWeight+e.noise((d.xOffset+t)/d.zoom,(d.yOffset+i)/d.zoom)-1,s=3;return o&&(s*=-1),e.max(d.minCircleD,s*a*d.maxCircleDMult*d.spacing)}e.background(d.background),null===n?(e.fill(255),e.noStroke(),e.textSize(24),e.textAlign(e.CENTER),e.text("Drag an image file onto the canvas.",e.width/2,e.height/2)):(e.noFill(),e.translate(e.width/2-d.numPts*d.spacing/2,e.height/2-d.numPts/11*14*d.spacing/2),e.stroke(d.color1),c(d.numPts,d.numPts/11*14,(function(n,i){var o=u(d.spacing,n,i);e.circle(o.x,o.y,t(n,i,!1))})),e.translate(d.spacing/2,d.spacing/2),e.stroke(d.color2),c(d.numPts,d.numPts/11*14,(function(n,i){var o=u(d.spacing,n,i);e.circle(o.x,o.y,t(n,i,!0))})))},e.mouseClicked=function(){},e.mouseDragged=function(){d.xOffset+=(e.pmouseX-e.mouseX)/3,d.yOffset+=(e.pmouseY-e.mouseY)/3},e.keyPressed=function(){(function(e,n){"s"===e.key?function(e){var n=a();e.save(n.concat(".png"))}(e):"S"===e.key?function(e,n){var t=a(),i=document.createElement("div");i.id="hidden_div",i.style.display="none",document.body.appendChild(i);var o=new r(n,i);o.setup=function(){o.createCanvas(e.width,e.height,e.SVG)},o.setup(),o.draw(),o.save(t.concat(".svg")),o.remove(),i.remove()}(e,n):"1"===e.key?e.resizeCanvas(e.windowWidth,e.windowHeight):"2"===e.key?s(e,11,14):"3"===e.key&&s(e,9,16)})(e,g),e.keyCode===e.ESCAPE&&f.toggleVisibility()}};new r(g,document.body)}},t={};function i(e){var o=t[e];if(void 0!==o)return o.exports;var r=t[e]={exports:{}};return n[e](r,r.exports,i),r.exports}i.m=n,e=[],i.O=(n,t,o,r)=>{if(!t){var a=1/0;for(l=0;l<e.length;l++){for(var[t,o,r]=e[l],s=!0,c=0;c<t.length;c++)(!1&r||a>=r)&&Object.keys(i.O).every((e=>i.O[e](t[c])))?t.splice(c--,1):(s=!1,r<a&&(a=r));if(s){e.splice(l--,1);var u=o();void 0!==u&&(n=u)}}return n}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[t,o,r]},i.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return i.d(n,{a:n}),n},i.d=(e,n)=>{for(var t in n)i.o(n,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={9300:0};i.O.j=n=>0===e[n];var n=(n,t)=>{var o,r,[a,s,c]=t,u=0;if(a.some((n=>0!==e[n]))){for(o in s)i.o(s,o)&&(i.m[o]=s[o]);if(c)var l=c(i)}for(n&&n(t);u<a.length;u++)r=a[u],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(l)},t=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var o=i.O(void 0,[4035,8302,363],(()=>i(129)));o=i.O(o)})();