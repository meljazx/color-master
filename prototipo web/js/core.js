/* core.js
   Utilidades base: helpers DOM, estado guardado (localStorage) y matemática de color (HSV, OKLab, distancia, puntaje, kelvin). */
const $=s=>document.querySelector(s),rnd=(a,b)=>a+Math.random()*(b-a),ri=(a,b)=>Math.round(rnd(a,b));
let S={},WK=[];try{S=JSON.parse(localStorage.getItem("cm3")||"{}");WK=JSON.parse(localStorage.getItem("cm3w")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("cm3",JSON.stringify(S));localStorage.setItem("cm3w",JSON.stringify(WK))}catch(e){}};
function hsv(h,s,v){s/=100;v/=100;const f=n=>{const k=(n+h/60)%6;return v-v*s*Math.max(0,Math.min(k,4-k,1))};return[f(5),f(3),f(1)].map(x=>Math.round(x*255))}
const css=c=>`rgb(${c})`;
function lab(c){const l=c.map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4}),L=Math.cbrt(.4122214708*l[0]+.5363325363*l[1]+.0514459929*l[2]),M=Math.cbrt(.2119034982*l[0]+.6806995451*l[1]+.1073969566*l[2]),X=Math.cbrt(.0883024619*l[0]+.2817188376*l[1]+.6299787005*l[2]);return[.2104542553*L+.793617785*M-.0040720468*X,1.9779984951*L-2.428592205*M+.4505937099*X,.0259040371*L+.7827717662*M-.808675766*X]}
const dist=(a,b)=>{const x=lab(a),y=lab(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])};
const sc=d=>Math.max(0,Math.min(100,Math.round(100-Math.max(0,d-.02)*450))),grade=s=>s>=95?"Perfecto":s>=85?"Muy bien":s>=70?"Bien":s>=50?"Regular":"Flojo";
function hint(t,u){const a=lab(t),b=lab(u),o=[],ca=Math.hypot(a[1],a[2]),cb=Math.hypot(b[1],b[2]);
 if(b[0]>a[0]+.03)o.push("más claro"); else if(b[0]<a[0]-.03)o.push("más oscuro");
 if(cb>ca+.03)o.push("más vivo"); else if(cb<ca-.03)o.push("más apagado");
 return o.length?"Brújula: tu color es "+o.join(" y ")+".":"Brújula: valor y viveza correctos."}
function K(k){k/=100;const r=k<=66?255:329.7*Math.pow(k-60,-.1332),g=k<=66?99.47*Math.log(k)-161.12:288.12*Math.pow(k-60,-.0755),b=k>=66?255:k<=19?0:138.52*Math.log(k-10)-305.04;return[r,g,b].map(x=>Math.max(0,Math.min(255,Math.round(x))))}
