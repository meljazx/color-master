/* lightlab.js
   Esfera de luz en 2D (canvas) y mini laboratorio de luz usado en teoría. */
function sphere(cv,o){const x=cv.getContext("2d"),W=cv.width,H=cv.height,cx=W/2-20,cy=H/2-15,R=70,m=[235,235,235],L=K(o.k),A=K(o.a),mul=(c,v,i)=>c.map((q,j)=>Math.round(m[j]*q/255*i*v));
 const fl=x.createLinearGradient(0,0,0,H);fl.addColorStop(0,"#e8eef1");fl.addColorStop(1,"#cfd9de");x.fillStyle=fl;x.fillRect(0,0,W,H);
 x.save();x.filter=`blur(${o.h}px)`;x.fillStyle=css(mul(A,.25,1));x.globalAlpha=.7;x.beginPath();x.ellipse(cx+75,cy+R-6,85,18,0,0,7);x.fill();x.restore();
 const g=x.createRadialGradient(cx-25,cy-28,6,cx,cy,R*1.1),i=o.i/100;g.addColorStop(0,css(mul(L,1,i)));g.addColorStop(.55,css(mul(L,.62,i)));g.addColorStop(1,css(mul(A,.3,1)));
 x.fillStyle=g;x.beginPath();x.arc(cx,cy,R,0,7);x.fill()}
function lab7(el){el.innerHTML='<canvas id="sp" width="360" height="220"></canvas><div class="ctl" id="sc2"></div>';
 sliders($("#sc2"),[["k","Luz (K)",1900,9000,2700],["a","Ambiente (K)",3000,12000,9500],["i","Intensidad",30,100,90],["h","Suavidad",0,20,6]],v=>sphere($("#sp"),v))}
