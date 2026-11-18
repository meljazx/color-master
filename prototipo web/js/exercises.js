/* exercises.js
   Ejercicios sueltos: mezcla de luz (m1), valor (m3), predice la sombra (m7), mood (m8), relatividad (m6) y asocia la paleta (m9). Cada uno devuelve una función comprobar() con {s, m}. */
/* ===== otros ejercicios ===== */
function m1(r,c){const t=[0,0,0].map(()=>ri(30,255));r.innerHTML=sw("Objetivo","t",css(t))+sw("Tu luz","u");
 const g=sliders(c,[["r","R",0,255,0],["g","G",0,255,0],["b","B",0,255,0]],v=>$("#u").style.background=css([v.r,v.g,v.b]));
 return()=>{const v=g(),u=[v.r,v.g,v.b];return{s:sc(dist(t,u)),m:`Objetivo: RGB(${t}). ${hint(t,u)}`}}}
function m3(r,c){const h=ri(0,360),gv=ri(60,200),t=[gv,gv,gv];r.innerHTML=sw("Gris objetivo","t",css(t))+sw("Tu color","u");
 const g=sliders(c,[["v","Brillo",10,100,60]],v=>$("#u").style.background=css(hsv(h,85,v.v)));
 return()=>{const u=hsv(h,85,g().v),d=Math.abs(lab(t)[0]-lab(u)[0]);return{s:Math.max(0,Math.round(100-d*400)),m:`${lab(u)[0]>lab(t)[0]?"Se percibe más claro.":"Se percibe más oscuro."} El brillo del slider no es el valor percibido.`}}}
function m7(r,c){const k=[1900,2700,3200,5500,6500,9500][ri(0,5)],ans=k<4500?0:k<=7000?1:2,opt=["Más fría (azulada)","Neutra","Más cálida"];let pick=-1;
 r.innerHTML=`<div class="tile" style="text-align:center"><p style="margin:0">Una esfera blanca recibe luz de <b>${k} K</b>.<br>¿Cómo será su sombra?</p><canvas id="sp" width="360" height="220" style="margin-top:8px"></canvas></div>`;
 const cv=$("#sp");cv.getContext("2d").fillStyle="#e3ebee";cv.getContext("2d").fillRect(0,0,360,220);
 c.className="ctl btns";c.innerHTML=opt.map((o,i)=>`<button data-i="${i}">${o}</button>`).join("");c.onclick=e=>{if(e.target.dataset.i){pick=+e.target.dataset.i;[...c.children].forEach(b=>b.classList.toggle("pri",b==e.target))}};
 return()=>{if(pick<0)return{s:0,m:"No elegiste a tiempo."};sphere(cv,{k,a:k<4500?10000:k>7000?3500:6500,i:90,h:6});return{s:pick==ans?100:0,m:`Respuesta: ${opt[ans]}. Luz cálida pide sombras frías y viceversa.`}}}
function m8(r,c){const B=[["acogedor","una cafetería acogedora",55,90,100],["inquietante","una escena de terror",-50,45,45],["alegre","una plaza alegre de día",20,110,160]][ri(0,2)];
 r.innerHTML=`<div class="tile" style="width:min(420px,90vw)"><p style="margin:0 0 8px">Encargo: <b>${B[1]}</b></p><div class="scene" id="sce"><div class="s"></div><div class="h"></div><div class="g"></div><div class="o" id="ov"></div></div></div>`;
 const g=sliders(c,[["t","Temperatura",-100,100,0],["v","Valor %",20,130,100],["s","Saturación %",0,200,100]],v=>{$("#sce").style.filter=`brightness(${v.v/100}) saturate(${v.s/100})`;$("#ov").style.cssText=`background:${v.t>0?"#ff9a2e":"#3b78ff"};opacity:${Math.abs(v.t)/250}`});
 return()=>{const v=g(),e=Math.max(0,Math.abs(v.t-B[2])-30)+Math.max(0,Math.abs(v.v-B[3])-20)+Math.max(0,Math.abs(v.s-B[4])-45);return{s:Math.max(0,Math.round(100-e*.8)),m:`Para “${B[0]}”: temperatura≈${B[2]}, valor≈${B[3]}, saturación≈${B[4]}.`}}}
/* ===== relatividad y asociación ===== */
function m6(r,c){const h=ri(0,359),vt=ri(45,75),dk=Math.random()<.5,bt=dk?12:88,bu=dk?88:12,ideal=Math.max(5,Math.min(100,vt+.15*(bu-bt)));
 const tl=(l,id,v,b)=>`<div class="tile"><small>${l}</small><div class="sw" style="background:${css(hsv(0,0,b))};display:grid;place-items:center"><div id="${id}" style="width:90px;height:90px;border-radius:12px;background:${css(hsv(h,60,v))}"></div></div></div>`;
 r.innerHTML=tl("Objetivo (fondo "+(dk?"oscuro":"claro")+")","ti",vt,bt)+tl("Tu color (fondo "+(dk?"claro":"oscuro")+")","ui",50,bu);
 const g=sliders(c,[["v","Valor",5,100,50]],v=>$("#ui").style.background=css(hsv(h,60,v.v)));
 return()=>{const v=g().v,d=Math.abs(v-ideal);return{s:Math.max(0,Math.round(100-Math.max(0,d-3)*5)),m:`Haz que se vean IGUAL, no que sean iguales. Sobre fondo ${dk?"claro":"oscuro"} un color se ve ${dk?"más oscuro":"más claro"}: hay que ${dk?"aclararlo":"oscurecerlo"}. Ajuste ideal ≈ ${Math.round(ideal)} (estimación).`}}}
function m9(r,c){const B=[["acogedor","una cafetería acogedora"],["inquietante","una escena de terror"],["alegre","una plaza alegre de día"]],P=[["#ffd9a0","#e8914f","#9b4a2a","#c98b4b"],["#2b3350","#3a3f66","#1a1a2b","#2c3a3a"],["#8fd8ff","#ffe066","#ff6b6b","#6bd45a"]],a=ri(0,2),order=[0,1,2].sort(()=>Math.random()-.5);let pick=-1;
 r.innerHTML=`<div class="tile" style="width:min(640px,94vw)"><p style="margin:0 0 8px">Encargo: <b>${B[a][1]}</b>. ¿Qué paleta lo comunica mejor?</p><div class="row" id="pl3">${order.map(i=>`<div data-i="${i}" style="width:170px;cursor:pointer;padding:4px;border-radius:16px"><div class="ms" style="background:${P[i][0]}"><i style="background:${P[i][3]}"></i><b style="background:${P[i][1]}"><u style="border-bottom-color:${P[i][2]}"></u></b></div></div>`).join("")}</div></div>`;
 $("#pl3").onclick=e=>{const t=e.target.closest("[data-i]");if(!t)return;pick=+t.dataset.i;[...$("#pl3").children].forEach(x=>x.style.background=x==t?"#bfe6f8":"")};c.innerHTML="";
 return()=>({s:pick==a?100:0,m:pick<0?"No elegiste paleta.":`Para “${B[a][0]}” funcionan ${["tonos cálidos, valor medio y poco contraste","tonos fríos, valor bajo y saturación contenida","colores saturados, valores altos y mucha variedad de matices"][a]}.`})}
