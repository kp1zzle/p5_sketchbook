(()=>{"use strict";var e,r={4063:(e,r,t)=>{var n=t(4035),o=t(7019),i=[[100,150],[150,220],[50,220]];new n((function(e){function r(e,r){for(var t=0,n=[],i=0;i<3;i++)n[i]=o.ZP.segment(r[i][0],r[i][1],r[(i+1)%3][0],r[(i+1)%3][1]),t+=n[i].length;var a=t/e,u=[],s=0,l=0;for(i=0;i<e;i++){var c=i*a-l,f=n[s].pointAtLength(c);null!=f?u[i]=f:(l+=n[s].length,s+=1,i--)}return u}e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight,e.SVG)},e.draw=function(){e.background(0),e.stroke(255),e.noFill();for(var t=r(150,[[500,200],[700,250],[300,750]]),n=r(150,i),o=0;o<150;o++)e.strokeWeight(.7*e.sin(.3*o)+1),e.beginShape(),e.vertex(t[o].x,t[o].y),e.vertex(t[o].x,t[o].y),e.curveVertex(t[o].x+4*o,t[o].y-10/o),e.curveVertex(n[o].x-2/o,n[o].y+2*o),e.vertex(n[o].x,n[o].y),e.vertex(n[o].x,n[o].y),e.endShape()},e.mousePressed=function(){return e.clear(0,0,0,0),i=[[e.mouseX,e.mouseY],[e.mouseX+100,e.mouseY+100],[e.mouseX-200,e.mouseY+200]],!1}}),document.body)}},t={};function n(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return r[e](i,i.exports,n),i.exports}n.m=r,e=[],n.O=(r,t,o,i)=>{if(!t){var a=1/0;for(c=0;c<e.length;c++){for(var[t,o,i]=e[c],u=!0,s=0;s<t.length;s++)(!1&i||a>=i)&&Object.keys(n.O).every((e=>n.O[e](t[s])))?t.splice(s--,1):(u=!1,i<a&&(a=i));if(u){e.splice(c--,1);var l=o();void 0!==l&&(r=l)}}return r}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[t,o,i]},n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={3770:0};n.O.j=r=>0===e[r];var r=(r,t)=>{var o,i,[a,u,s]=t,l=0;if(a.some((r=>0!==e[r]))){for(o in u)n.o(u,o)&&(n.m[o]=u[o]);if(s)var c=s(n)}for(r&&r(t);l<a.length;l++)i=a[l],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(c)},t=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var o=n.O(void 0,[4035,7019],(()=>n(4063)));o=n.O(o)})();