/* demos.js
   Demos interactivas de la pantalla de Teoría de cada módulo. */
/* ===== demos de teoría ===== */
const d1=el=>{el.innerHTML='<div class="lights" id="lt">'+["#f00","#0f0","#00f"].map((c,i)=>`<i style="background:${c};left:${[8,66,37][i]}px;top:${[8,8,56][i]}px"></i>`).join("")+'</div><small style="text-align:center">Toca cada luz: R + G + B = blanco</small>';$("#lt").onclick=e=>{if(e.target.tagName=="I")e.target.style.opacity=e.target.style.opacity=="0.1"?1:.1}};
const d2=el=>{el.innerHTML='<div class="sw" id="dsw"></div><div class="ctl" id="dc"></div>';sliders($("#dc"),[["h","Matiz",0,360,200],["s","Saturación",0,100,70],["v","Brillo",0,100,80]],v=>$("#dsw").style.background=css(hsv(v.h,v.s,v.v)))};
const d3=el=>{el.innerHTML='<div class="chips" id="ch">'+[0,60,120,180,240,300].map(h=>`<i style="background:${css(hsv(h,100,100))}"></i>`).join("")+'</div><div class="ctl btns"><button id="gr">Ver en grises</button></div><small style="text-align:center">Mismo brillo de slider (100 %), valores muy distintos</small>';$("#gr").onclick=()=>$("#ch").classList.toggle("g")};
const d4=el=>{let si=0;el.innerHTML='<div class="chips" id="ch"></div><div class="ctl" id="dc"></div><div class="ctl btns">'+SCH.map((s,i)=>`<button data-i="${i}">${s[0]}</button>`).join("")+"</div>";
 let g;const up=()=>{const h=g();$("#ch").innerHTML=[0,...SCH[si][1]].map(o=>`<i style="background:${css(hsv((h.h+o+360)%360,85,95))}"></i>`).join("")};g=sliders($("#dc"),[["h","Matiz base",0,359,20]],up);el.onclick=e=>{if(e.target.dataset.i){si=+e.target.dataset.i;up()}}};
