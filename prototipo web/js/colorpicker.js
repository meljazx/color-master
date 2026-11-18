/* colorpicker.js
   Selector de color estilo Photoshop: rueda cromática (matiz = ángulo, saturación = radio),
   deslizador de valor (brillo), código hex y colores recientes. Reemplaza los colores predeterminados.
   Uso: const pk = ColorPicker(elemento, hex => ...); pk.hex(); pk.setHex("#rrggbb"); pk.use(); */
function ColorPicker(el,onChange){let h=8,s=75,v=90;const R=76,C=80,rec=[],q=x=>el.querySelector(x);
 el.classList.add("pk");
 el.innerHTML=`<canvas width="160" height="160"></canvas><div class="pkg"></div><label>Valor <input type="range" class="pkv" min="0" max="100" value="90" style="width:100%"></label><div style="display:flex;gap:6px;align-items:center"><div class="pks"></div><input type="text" class="pkh" maxlength="7"></div><div class="pkr"></div>`;
 const cv=q("canvas"),hex=()=>"#"+hsv(h,s,v).map(n=>n.toString(16).padStart(2,"0")).join("");
 const toHsv=(r,g,b)=>{r/=255;g/=255;b/=255;const m=Math.max(r,g,b),n=Math.min(r,g,b),d=m-n;let H=0;if(d){H=m==r?((g-b)/d)%6:m==g?(b-r)/d+2:(r-g)/d+4;H*=60;if(H<0)H+=360}return[H,m?d/m*100:0,m*100]};
 const draw=(emit=1)=>{const x=cv.getContext("2d"),im=x.createImageData(160,160);
  for(let j=0;j<160;j++)for(let i=0;i<160;i++){const dx=i-C,dy=j-C,d=Math.hypot(dx,dy);if(d>R)continue;im.data.set([...hsv((Math.atan2(dx,-dy)*180/Math.PI+360)%360,d/R*100,v),255],(j*160+i)*4)}
  x.clearRect(0,0,160,160);x.putImageData(im,0,0);x.beginPath();x.arc(C,C,R,0,7);x.lineWidth=3;x.strokeStyle="#fff";x.stroke();
  const px=C+R*s/100*Math.sin(h*Math.PI/180),py=C-R*s/100*Math.cos(h*Math.PI/180);x.beginPath();x.arc(px,py,7,0,7);x.lineWidth=3;x.strokeStyle="#fff";x.stroke();x.lineWidth=1;x.strokeStyle="#000";x.stroke();
  q(".pks").style.background=hex();q(".pkh").value=hex();q(".pkg").style.background=`linear-gradient(90deg,#000,${css(hsv(h,s,100))})`;if(emit&&onChange)onChange(hex())};
 const pick=e=>{const b=cv.getBoundingClientRect(),dx=(e.clientX-b.left)*160/b.width-C,dy=(e.clientY-b.top)*160/b.height-C;h=(Math.atan2(dx,-dy)*180/Math.PI+360)%360;s=Math.min(100,Math.hypot(dx,dy)/R*100);draw()};
 let dr=0;cv.onpointerdown=e=>{dr=1;cv.setPointerCapture(e.pointerId);pick(e)};cv.onpointermove=e=>{if(dr)pick(e)};cv.onpointerup=()=>dr=0;
 q(".pkv").oninput=e=>{v=+e.target.value;draw()};
 const setHex=x=>{if(!/^#[0-9a-f]{6}$/i.test(x))return;const n=parseInt(x.slice(1),16);[h,s,v]=toHsv(n>>16&255,n>>8&255,n&255);q(".pkv").value=Math.round(v);draw()};
 q(".pkh").onchange=e=>setHex(e.target.value);
 const use=()=>{const x=hex();const i=rec.indexOf(x);if(i>=0)rec.splice(i,1);rec.unshift(x);if(rec.length>8)rec.pop();q(".pkr").innerHTML=rec.map(c=>`<i data-c="${c}" style="background:${c}"></i>`).join("")};
 draw(0);return{hex,setHex,use}}
