/* wheel.js
   Mecánica de la rueda cromática (estilo color.method.ac): matiz, saturación, complementarios, análogos, tríadas y tétradas. */
/* ===== rueda estilo color.method.ac ===== */
const TXT={hue:"Arrastra el punto por el aro hasta que el anillo exterior se confunda con el color central.",sat:"Arrastra el punto hacia dentro o fuera hasta igualar la saturación del centro.",comp:"Coloca el <b>complementario</b> del color base (punto blanco).",ana:"Coloca los 2 <b>análogos</b> (±30°) del color base.",tri:"Coloca los 2 colores de la <b>tríada</b> (120°).",tet:"Coloca los 3 colores de la <b>tétrada</b> (90°)."};
const SCH=[["Complementario",[180]],["Análogo",[-30,30]],["Tríada",[120,240]],["Tétrada",[90,180,270]]];
const wheel=key=>(r,c)=>{const lv={hue:[0],sat:[0],comp:[180],ana:[-30,30],tri:[120,240],tet:[90,180,270]}[key],n=lv.length,h=ri(0,359),s=ri(55,100),v=ri(75,100),Rr=130,Ri=62,C=150,col=(a,q)=>hsv(a,q,v),PI=Math.PI;
 const tg=lv.map(o=>({a:(h+o+360)%360,r:s})),hs=tg.map(()=>({a:key=="sat"?h:ri(0,359),r:key=="sat"?15:s}));
 const off=document.createElement("canvas");off.width=off.height=300;const ox=off.getContext("2d"),im=ox.createImageData(300,300);
 for(let j=0;j<300;j++)for(let i=0;i<300;i++){const dx=i-C,dy=j-C,d=Math.hypot(dx,dy);if(d>Rr||d<Ri)continue;im.data.set([...col((Math.atan2(dx,-dy)*180/PI+360)%360,(d-Ri)/(Rr-Ri)*100),255],(j*300+i)*4)}
 ox.putImageData(im,0,0);
 r.innerHTML=`<div class="tile" style="text-align:center"><p style="margin:0 auto 6px;max-width:330px">${TXT[key]}</p><canvas id="w" width="300" height="300"></canvas></div>`;c.innerHTML="<div class='row'><button id='ok2' class='pri'>Confirmar</button></div>";
 const cv=$("#w"),x=cv.getContext("2d");let sel=0,dr=0,fin=0;
 const P=(a,q)=>{const d=Ri+(Rr-Ri)*q/100;return[C+d*Math.sin(a*PI/180),C-d*Math.cos(a*PI/180)]},pt=e=>{const b=cv.getBoundingClientRect();return[(e.clientX-b.left)*300/b.width,(e.clientY-b.top)*300/b.height]},
 dot=(p,f,rad)=>{x.save();x.shadowColor="#0005";x.shadowBlur=8;x.shadowOffsetY=3;x.beginPath();x.arc(p[0],p[1],rad,0,7);x.fillStyle=f;x.fill();x.restore();x.lineWidth=3;x.strokeStyle="#fff";x.stroke()};
 const draw=()=>{x.clearRect(0,0,300,300);x.save();x.shadowColor="#2a7aa355";x.shadowBlur=16;x.drawImage(off,0,0);x.restore();x.lineWidth=7;x.lineCap="round";x.strokeStyle="#d5e3ea";x.beginPath();x.arc(C,C,Rr+10,0,7);x.stroke();
  if(TP!=null){x.strokeStyle=TP<.3?"#ee5a4a":"#2fa8e0";x.beginPath();x.arc(C,C,Rr+10,-PI/2,-PI/2+TP*2*PI);x.stroke()}
  const HM=key!="hue"&&key!="sat";if(HM){const w=[col(h,s),...hs.map(p=>col(p.a,p.r))];w.forEach((cc,i)=>{x.fillStyle=css(cc);x.beginPath();x.moveTo(C,C);x.arc(C,C,58,-PI/2+i*2*PI/w.length,-PI/2+(i+1)*2*PI/w.length);x.closePath();x.fill()});x.strokeStyle="#ffffffdd";x.lineWidth=2;x.setLineDash([6,5]);x.beginPath();[[h,s],...hs.map(p=>[p.a,p.r])].forEach((q,i)=>{const z=P(q[0],q[1]);i?x.lineTo(z[0],z[1]):x.moveTo(z[0],z[1])});x.closePath();x.stroke();x.setLineDash([])}else{x.fillStyle=css(col(h,s));x.beginPath();x.arc(C,C,40,0,7);x.fill()}
  if(!HM)hs.forEach((p,i)=>{x.strokeStyle=css(col(p.a,p.r));x.lineWidth=20;x.lineCap="butt";x.beginPath();x.arc(C,C,50,i*2*PI/n,(i+1)*2*PI/n);x.stroke()});
  x.lineWidth=3;x.strokeStyle="#fff";x.beginPath();x.arc(C,C,61,0,7);x.stroke();
  const g=x.createRadialGradient(C-14,C-18,2,C,C,40);g.addColorStop(0,"#ffffff88");g.addColorStop(1,"#fff0");x.fillStyle=g;x.beginPath();x.arc(C,C,40,0,7);x.fill();
  if(key!="hue"&&key!="sat")dot(P(h,s),"#fff",8);
  hs.forEach(p=>dot(P(p.a,p.r),css(col(p.a,p.r)),11));
  if(fin)tg.forEach(t=>{const q=P(t.a,t.r);x.strokeStyle="#111";x.lineWidth=3;x.beginPath();x.arc(q[0],q[1],16,0,7);x.stroke()})};
 const mv=e=>{const q=pt(e),dx=q[0]-C,dy=q[1]-C,p=hs[sel];if(key=="sat")p.r=Math.max(0,Math.min(100,(Math.hypot(dx,dy)-Ri)/(Rr-Ri)*100));else p.a=(Math.atan2(dx,-dy)*180/PI+360)%360};
 cv.onpointerdown=e=>{if(fin)return;const q=pt(e);let bd=1e9;hs.forEach((p,i)=>{const w=P(p.a,p.r),d=Math.hypot(w[0]-q[0],w[1]-q[1]);if(d<bd){bd=d;sel=i}});cv.setPointerCapture(e.pointerId);dr=1;mv(e);draw()};
 cv.onpointermove=e=>{if(dr&&!fin){mv(e);draw()}};cv.onpointerup=()=>dr=0;
 $("#ok2").onclick=()=>$("#ok").click();RD=draw;draw();
 return()=>{fin=1;const used=[];let tot=0;tg.forEach(t=>{let bi=0,bd=1e9;hs.forEach((p,i)=>{if(used.includes(i))return;const d=dist(col(p.a,p.r),col(t.a,t.r));if(d<bd){bd=d;bi=i}});used.push(bi);tot+=sc(bd)});
  draw();const q=Math.round(tot/n);return{s:q,m:`Los aros negros marcan la respuesta. ${hint(col(tg[0].a,tg[0].r),col(hs[used[0]].a,hs[used[0]].r))}`}}};
const mix=ks=>(r,c)=>wheel(ks[ri(0,ks.length-1)])(r,c);
