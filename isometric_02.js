(()=>{"use strict";var e,r={9849:(e,r,n)=>{var t=n(4035);function o(e,r,n){return{x:(r.x-r.z)*e.cos(n),y:-1*r.y-(r.x+r.z)*e.sin(n)}}var i=30,a=.1,x=[[255,0,0],[255,128,0],[255,255,0],[0,255,0],[0,0,255]];new t((function(e){function r(r,n){return 300*e.noise(r/244,n/250)+50*e.sin(r)}e.setup=function(){e.createCanvas(e.windowWidth,e.windowHeight-4,e.SVG)},e.draw=function(){e.angleMode(e.DEGREES),e.background(0),e.stroke(255),e.translate(e.windowWidth/2,e.windowHeight/2),e.noFill();for(var n=[],t=0;t<=500;t+=10){e.stroke(x[t/10%5]),e.beginShape();for(var p=0;p<=500;p+=10)n.push(o(e,{x:t,y:-r(t,p),z:p},i)),o(e,{x:t,y:-r(t,p),z:p},i);e.endShape()}e.noFill();for(var h,s=[{x:0,y:0},{x:500,y:0},{x:500,y:500},{x:0,y:500}],f=[],l=0;l<4;l++)f.push(-r(s[l].x,s[l].y));for(e.beginShape(),l=0;l<4;l++){var v=e.min(f),y=(t=s[l].x,p=s[l].y,o(e,{x:t,y:-r(t,p),z:p},i)),u=o(e,{x:t,y:v-50,z:p},i);e.line(y.x,y.y,u.x,u.y),e.vertex(u.x,u.y),0===l&&(h=u)}for(e.vertex(h.x,h.y),e.endShape(),e.beginShape(),l=0;l<=50;l++)e.vertex(n[51*l].x,n[51*l].y);for(e.endShape(),e.beginShape(),l=0;l<=50;l++)e.vertex(n[51*l+50].x,n[51*l+50].y);for(e.endShape(),l=n.length-1;l>0;l--)e.stroke(x[4]),e.strokeWeight(.7*e.sin(50*l)+1),e.fill(0),e.beginShape(),e.vertex(n[l].x,n[l].y),e.vertex(n[l].x,n[l].y+10),e.vertex(n[l].x+10,n[l].y+10),e.vertex(n[l].x+10,n[l].y),e.vertex(n[l].x,n[l].y),e.endShape();(i+a>30||i+a<0)&&(a*=-1),i+=a}}),document.body)}},n={};function t(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return r[e](i,i.exports,t),i.exports}t.m=r,e=[],t.O=(r,n,o,i)=>{if(!n){var a=1/0;for(s=0;s<e.length;s++){for(var[n,o,i]=e[s],x=!0,p=0;p<n.length;p++)(!1&i||a>=i)&&Object.keys(t.O).every((e=>t.O[e](n[p])))?n.splice(p--,1):(x=!1,i<a&&(a=i));if(x){e.splice(s--,1);var h=o();void 0!==h&&(r=h)}}return r}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[n,o,i]},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={9207:0};t.O.j=r=>0===e[r];var r=(r,n)=>{var o,i,[a,x,p]=n,h=0;if(a.some((r=>0!==e[r]))){for(o in x)t.o(x,o)&&(t.m[o]=x[o]);if(p)var s=p(t)}for(r&&r(n);h<a.length;h++)i=a[h],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(s)},n=self.webpackChunkp5_webpack_boilerplate=self.webpackChunkp5_webpack_boilerplate||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))})();var o=t.O(void 0,[4035],(()=>t(9849)));o=t.O(o)})();