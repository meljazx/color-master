/* levels.js
   Diálogo de Niveles (como Ctrl+L en Photoshop): histograma de la capa activa y tres controles
   (punto negro, medios/gamma y punto blanco) con vista previa en vivo. onOpen se llama antes de modificar
   (para guardar el estado en el historial de deshacer). */
function levelsDialog(cv,onOpen){const o=$("#ov2"),x=cv.getContext("2d"),W=cv.width,H=cv.height,src=x.getImageData(0,0,W,H),hg=new Array(256).fill(0);
 for(let i=0;i<src.data.length;i+=4)if(src.data[i+3]>0)hg[Math.round(.2126*src.data[i]+.7152*src.data[i+1]+.0722*src.data[i+2])]++;
 const mx=Math.max(1,...hg);if(onOpen)onOpen();
 o.innerHTML=`<div class="tile" style="width:min(420px,92vw);text-align:center"><h3 style="margin:0 0 6px">Niveles</h3><canvas id="hgc" width="256" height="80" style="width:100%;background:#fff;border-radius:8px"></canvas><div class="ctl" id="lvs"></div><small>Se aplica a la capa activa. Negro y blanco recortan; medios aclara u oscurece.</small><button id="lvc">Cancelar</button> <button class="pri" id="lva">Aplicar</button></div>`;o.classList.add("on");
 const g=$("#hgc").getContext("2d");g.fillStyle="#6b7c86";hg.forEach((n,i)=>g.fillRect(i,80-n/mx*78,1,n/mx*78));
 const lut=v=>{const t=new Uint8Array(256);for(let i=0;i<256;i++){let u=Math.max(0,Math.min(1,(i-v.b)/Math.max(1,v.w-v.b)));t[i]=Math.round(255*Math.pow(u,1/(v.g/100)))}return t};
 sliders($("#lvs"),[["b","Negro",0,254,0],["g","Medios",20,300,100],["w","Blanco",1,255,255]],v=>{const t=lut(v),d=x.createImageData(W,H);for(let i=0;i<src.data.length;i+=4){d.data[i]=t[src.data[i]];d.data[i+1]=t[src.data[i+1]];d.data[i+2]=t[src.data[i+2]];d.data[i+3]=src.data[i+3]}x.putImageData(d,0,0)});
 $("#lvc").onclick=()=>{x.putImageData(src,0,0);o.classList.remove("on")};$("#lva").onclick=()=>{o.classList.remove("on");toast("Niveles aplicados")}}
