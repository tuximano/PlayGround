(() => {
  'use strict';
  // Compact arcade FPS controller + hand-built perspective renderer (no engine/dependencies).
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d', { alpha: false });
  const $ = (id) => document.getElementById(id);
  const hud = $('hud'), mission = $('mission-card'), startBtn = $('start-button');
  const keys = new Set(), touch = new Set();
  const player = { x: 0, z: 5, y: 0, vx: 0, vz: 0, vy: 0, yaw: 0, pitch: 0, grounded: true,
    sliding: false, slideTime: 0, mantling: 0, bob: 0, landPulse: 0 };
  const cfg = { walk: 7.5, sprint: 12.2, slide: 15.8, jump: 8.6, gravity: 22, fov: 90, targetFov: 90 };
  const obstacles = [
    {x:0,z:-10,w:4.7,d:1.4,h:.65,kind:'bar'}, {x:-1.6,z:-18,w:1.6,d:1.5,h:1.15,kind:'block'},
    {x:1.4,z:-25,w:1.8,d:1.5,h:.82,kind:'bar'}, {x:0,z:-34,w:5.4,d:1.5,h:1.45,kind:'wall'},
    {x:-1.7,z:-43,w:1.7,d:1.4,h:.75,kind:'bar'}, {x:1.5,z:-52,w:1.8,d:1.5,h:1.25,kind:'block'},
    {x:0,z:-62,w:5,d:1.5,h:.72,kind:'bar'}, {x:-1.3,z:-72,w:1.7,d:1.4,h:1.35,kind:'block'}
  ];
  const cores = [-6,-15,-24,-39,-58].map((z,i)=>({x:[0,1.3,-1.3,1.3,-1.2][i], y:[1.15,1.55,1.3,1.75,1.45][i], z, got:false, phase:i*1.7}));
  const decor = [];
  for(let i=0;i<34;i++) { const side=i%2?1:-1; decor.push({x:side*(8+(i%4)*1.8),z:4-i*5.2,w:1.2+(i%3)*.65,d:1.4+(i%2),h:2.2+(i%5)*.8,kind:'tower'}); }
  let W=0,H=0,dpr=1,last=0,elapsed=0,started=false,paused=false,finished=false,coreCount=0,toastTimer=0;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);}
  addEventListener('resize',resize); resize();
  const isDown=(...names)=>names.some(k=>keys.has(k)||touch.has(k));
  function reset(){Object.assign(player,{x:0,z:5,y:0,vx:0,vz:0,vy:0,yaw:0,pitch:0,grounded:true,sliding:false,slideTime:0,mantling:0,bob:0,landPulse:0});cores.forEach(c=>c.got=false);coreCount=0;elapsed=0;finished=false;paused=false;started=true;document.body.classList.add('playing');hud.classList.add('active');$('finish-card').classList.remove('show');$('pause-card').classList.remove('show');$('run-state').textContent='RUNNING';$('objective').innerHTML='NÚCLEOS <i>00</i> <small>/ 05</small>';}
  function start(){if(!started)reset();else if(finished)reset();canvas.requestPointerLock?.();}
  startBtn.addEventListener('click',start);$('again-button').addEventListener('click',()=>{reset();canvas.requestPointerLock?.();});$('resume-button').addEventListener('click',()=>{paused=false;$('pause-card').classList.remove('show');$('run-state').textContent='RUNNING';canvas.requestPointerLock?.();});
  document.addEventListener('pointerlockchange',()=>{if(started&&!document.pointerLockElement&&!finished){paused=true;$('pause-card').classList.add('show');$('run-state').textContent='PAUSED';}});
  document.addEventListener('mousemove',e=>{if(!started||paused||!document.pointerLockElement)return;player.yaw+=e.movementX*.00235;player.pitch=clamp(player.pitch-e.movementY*.0017,-.72,.72);});
  document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();keys.add(k);if(k==='escape'&&started&&!finished&&!paused){paused=true;$('pause-card').classList.add('show');$('run-state').textContent='PAUSED';}if(k===' '&&!e.repeat)jump();if(k==='control'||k==='c')beginSlide();});
  document.addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());});
  canvas.addEventListener('click',()=>{if(started&&!paused&&!document.pointerLockElement)canvas.requestPointerLock?.();});
  // Touch pad buttons are held controls, while drag on the scene emulates mouse look.
  document.querySelectorAll('[data-move]').forEach(b=>{const name=b.dataset.move;const k={forward:'w',back:'s',left:'a',right:'d'}[name];b.addEventListener('pointerdown',e=>{e.preventDefault();touch.add(k);});['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>touch.delete(k)));});
  document.querySelectorAll('[data-action]').forEach(b=>{const a=b.dataset.action;b.addEventListener('pointerdown',e=>{e.preventDefault();if(a==='jump')jump();else if(a==='slide')beginSlide();else touch.add('shift');});['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>{if(a==='sprint')touch.delete('shift');}));});
  let drag=null;canvas.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&started&&!paused){drag={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId);}});canvas.addEventListener('pointermove',e=>{if(drag&&e.pointerId===drag.id){player.yaw+=(e.clientX-drag.x)*.004;player.pitch=clamp(player.pitch-(e.clientY-drag.y)*.003,-.72,.72);drag.x=e.clientX;drag.y=e.clientY;}});canvas.addEventListener('pointerup',()=>drag=null);
  function beginSlide(){if(!started||paused)return;if(player.grounded&&Math.hypot(player.vx,player.vz)>5.7){player.sliding=true;player.slideTime=0;}}
  function jump(){if(!started||paused||finished)return;if(player.grounded){tryMantle();if(player.mantling>0)return;player.grounded=false;player.vy=cfg.jump;player.sliding=false;player.landPulse=.12;}
    // Buffered bunny-hop: pressing jump during landing immediately preserves horizontal momentum.
    else player.jumpBuffer=.12;
  }
  function closestObstacle(ahead){const fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw);let best=null,dist=99;for(const o of obstacles){const dx=o.x-player.x,dz=o.z-player.z,d=dx*fx+dz*fz;if(d>0&&d<ahead&&Math.abs(dx*Math.cos(player.yaw)-dz*Math.sin(player.yaw))<o.w*.5+.7){best=o;dist=d;}}return best?{o:best,d:dist}:null;}
  // Mantle checks a low lip in front, then eases the player onto its far side.
  function tryMantle(){if(!player.grounded||player.mantling>0)return;const hit=closestObstacle(1.35);if(hit&&hit.o.h<1.6&&hit.o.h>.38){player.mantling=.24;player.mantleTarget={x:player.x-Math.sin(player.yaw)*(hit.d+hit.o.d*.5+.55),z:player.z-Math.cos(player.yaw)*(hit.d+hit.o.d*.5+.55)};player.vx*=.8;player.vz*=.8;player.vy=0;}}
  function update(dt){if(!started||paused||finished)return;elapsed+=dt;player.jumpBuffer=Math.max(0,(player.jumpBuffer||0)-dt);player.landPulse=Math.max(0,player.landPulse-dt);
    const forward=(isDown('w','arrowup','forward')?1:0)-(isDown('s','arrowdown','back')?1:0), side=(isDown('d','arrowright','right')?1:0)-(isDown('a','arrowleft','left')?1:0);
    const sprint=isDown('shift'), crouch=isDown('control','c','slide');if(crouch)beginSlide();
    const fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),rx=Math.cos(player.yaw),rz=-Math.sin(player.yaw);
    let ix=fx*forward+rx*side,iz=fz*forward+rz*side;const il=Math.hypot(ix,iz);if(il>0){ix/=il;iz/=il;}
    const speed=Math.hypot(player.vx,player.vz);const target=sprint?cfg.sprint:cfg.walk;
    if(player.grounded){if(player.sliding){player.slideTime+=dt; // Rotate the momentum vector while preserving its magnitude—even through a 180° turn.
        const momentum=Math.hypot(player.vx,player.vz),steer=Math.min(1,dt*2.7);if(il&&momentum>.01){let nx=player.vx/momentum*(1-steer)+ix*steer,nz=player.vz/momentum*(1-steer)+iz*steer,n=Math.hypot(nx,nz);if(n>.001){player.vx=nx/n*momentum;player.vz=nz/n*momentum;}}else{player.vx*=Math.pow(.997,dt*60);player.vz*=Math.pow(.997,dt*60);}if(!crouch&&player.slideTime>.34)player.sliding=false;
      }else if(il){const accel=sprint?31:24;player.vx+=(ix*target-player.vx)*Math.min(1,accel*dt);player.vz+=(iz*target-player.vz)*Math.min(1,accel*dt);}else{const friction=Math.pow(.0008,dt);player.vx*=friction;player.vz*=friction;}
    }else if(il){ // Air steering changes heading without a speed penalty (air-strafing).
      const airTurn=Math.min(1,dt*2.4);let nvx=player.vx+(ix*speed-player.vx)*airTurn,nvz=player.vz+(iz*speed-player.vz)*airTurn;const n=Math.hypot(nvx,nvz);if(n>speed){nvx*=speed/n;nvz*=speed/n;}player.vx=nvx;player.vz=nvz;
    }
    if(player.grounded&&player.jumpBuffer>0){player.jumpBuffer=0;player.grounded=false;player.vy=cfg.jump;player.sliding=false;}
    if(!player.grounded){player.vy-=cfg.gravity*dt;player.y+=player.vy*dt;if(player.y<=0){player.y=0;player.vy=0;player.grounded=true;player.landPulse=.12; // Landing never clamps sprint speed: bunny hops preserve velocity.
        if(player.jumpBuffer>0){player.grounded=false;player.vy=cfg.jump;player.jumpBuffer=0;}}}
    if(player.mantling>0){player.mantling-=dt;const t=1-clamp(player.mantling/.24,0,1);player.x+=(player.mantleTarget.x-player.x)*Math.min(1,dt*14);player.z+=(player.mantleTarget.z-player.z)*Math.min(1,dt*14);player.y=Math.sin(t*Math.PI)*.42;if(player.mantling<=0){player.y=0;player.grounded=false;player.vy=2.2;}}else if(isDown(' ')&&player.grounded)tryMantle();
    const oldX=player.x,oldZ=player.z,nextX=player.x+player.vx*dt,nextZ=player.z+player.vz*dt;
    // Simple swept-feel collision: block solid props unless a jump/mantle clears the top.
    let blocked=false;for(const o of obstacles){const inside=Math.abs(nextX-o.x)<o.w*.5+.32&&Math.abs(nextZ-o.z)<o.d*.5+.32;const clearsTop=player.y>o.h+.05;const slideUnder=player.sliding&&o.kind==='bar';if(inside&&!clearsTop&&!slideUnder){blocked=true;break;}}
    if(blocked){player.x=oldX;player.z=oldZ;player.vx*=.25;player.vz*=.25;}else{player.x=nextX;player.z=nextZ;}
    // Stay inside the training lane. Obstacles are low enough to slide or mantle over.
    player.x=clamp(player.x,-5.7,5.7);
    const actual=Math.hypot(player.vx,player.vz);player.bob+=dt*(5+actual*.7);
    cfg.targetFov=90+clamp((actual-5)*1.5,0,13)+(player.sliding?3:0);cfg.fov+=(cfg.targetFov-cfg.fov)*Math.min(1,dt*5);
    for(const c of cores){if(!c.got&&Math.hypot(player.x-c.x,player.z-c.z)<1.15&&Math.abs(player.y+.8-c.y)<1.4){c.got=true;coreCount++;$('objective').innerHTML=`NÚCLEOS <i>${String(coreCount).padStart(2,'0')}</i> <small>/ 05</small>`;toastTimer=1.1;$('collect-toast').classList.add('show');}}
    if(toastTimer>0){toastTimer-=dt;if(toastTimer<=0)$('collect-toast').classList.remove('show');}
    if(coreCount===cores.length){finished=true;$('final-time').textContent=formatTime(elapsed);$('finish-card').classList.add('show');$('run-state').textContent='COMPLETE';document.exitPointerLock?.();}
    updateHud(actual,sprint);
  }
  function formatTime(t){const m=Math.floor(t/60),s=(t%60).toFixed(2).padStart(5,'0');return `${String(m).padStart(2,'0')}:${s}`;}
  function updateHud(speed,sprint){$('timer').textContent=formatTime(elapsed);$('speed').textContent=String(Math.floor(speed)).padStart(2,'0');$('speed-bar').style.width=clamp(speed/17*100,0,100)+'%';$('fov-readout').textContent=`FOV ${Math.round(cfg.fov)}°`;$('mode').textContent=player.mantling>0?'MANTLE':player.sliding?'SLIDE':!player.grounded?'AIR':sprint&&speed>7?'SPRINT':'WALK';$('status-pill').textContent=player.mantling>0?'MANTLING':player.sliding?'INFINITE SLIDE':!player.grounded?'AIR STRAFE':sprint?'SPRINT':'READY';}
  // Perspective projection: yaw rotates the camera basis; dynamic FOV changes focal length.
  function project(x,y,z){const dx=x-player.x,dz=z-player.z,sy=Math.sin(player.yaw),cy=Math.cos(player.yaw);const right=dx*cy-dz*sy,forward=-(dx*sy+dz*cy);if(forward<.12)return null;const focal=(H*.5)/Math.tan(cfg.fov*Math.PI/360),camY=1.62+player.y+(player.sliding?-.48:0)+Math.sin(player.bob)*.018*(Math.hypot(player.vx,player.vz)>1?1:0);const relY=y-camY;const py=(relY*Math.cos(player.pitch)-forward*Math.sin(player.pitch));return{x:W*.5+right*focal/forward,y:H*.5-py*focal/forward+player.pitch*H*.15,z:forward,s:focal/forward};}
  function poly(points,color){if(points.some(p=>!p))return;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.closePath();ctx.fillStyle=color;ctx.fill();}
  function box(o){const x1=o.x-o.w/2,x2=o.x+o.w/2,z1=o.z-o.d/2,z2=o.z+o.d/2,h=o.h;const p=[project(x1,0,z1),project(x2,0,z1),project(x2,0,z2),project(x1,0,z2),project(x1,h,z1),project(x2,h,z1),project(x2,h,z2),project(x1,h,z2)];if(p.every(q=>!q))return;
    // Draw distant boxes first; color-coded planes make depth and edges readable.
    poly([p[4],p[5],p[6],p[7]],o.kind==='tower'?'#24383a':'#385052');poly([p[0],p[1],p[5],p[4]],o.kind==='tower'?'#17282d':'#253a3d');poly([p[1],p[2],p[6],p[5]],o.kind==='tower'?'#203438':'#2d4546');
    const top=[p[4],p[5],p[6],p[7]];if(top.every(Boolean)){ctx.beginPath();ctx.moveTo(top[0].x,top[0].y);top.slice(1).forEach(q=>ctx.lineTo(q.x,q.y));ctx.closePath();ctx.strokeStyle=o.kind==='tower'?'#436158':'#a3c35a';ctx.lineWidth=1;ctx.stroke();}
    if(o.kind!=='tower'){const edge=[project(x1,h,z1),project(x2,h,z1)];if(edge.every(Boolean)){ctx.beginPath();ctx.moveTo(edge[0].x,edge[0].y);ctx.lineTo(edge[1].x,edge[1].y);ctx.strokeStyle='#d5ff3f';ctx.globalAlpha=.72;ctx.lineWidth=2;ctx.stroke();ctx.globalAlpha=1;}}
  }
  function drawCore(c){const p=project(c.x,c.y+Math.sin(elapsed*2+c.phase)*.12,c.z);if(!p||p.z>38)return;const r=clamp(p.s*.12,2,20);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(elapsed*1.1+c.phase);ctx.shadowColor='#d5ff3f';ctx.shadowBlur=r*1.8;ctx.strokeStyle='#d5ff3f';ctx.lineWidth=Math.max(1,r*.14);ctx.beginPath();ctx.moveTo(0,-r);ctx.lineTo(r*.7,0);ctx.lineTo(0,r);ctx.lineTo(-r*.7,0);ctx.closePath();ctx.stroke();ctx.fillStyle='#edff8d';ctx.beginPath();ctx.arc(0,0,Math.max(1,r*.18),0,Math.PI*2);ctx.fill();ctx.restore();}
  function render(){const horizon=H*.49+player.pitch*H*.23;const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#12252b');sky.addColorStop(.55,'#304347');sky.addColorStop(1,'#66705f');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Distant industrial silhouettes and hazy light strip.
    ctx.fillStyle='#16282b';ctx.beginPath();ctx.moveTo(0,horizon+5);for(let x=0;x<=W+40;x+=40){const n=Math.sin(x*.021)*14+Math.sin(x*.009)*23;ctx.lineTo(x,horizon+18+n);}ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.fill();
    const ground=ctx.createLinearGradient(0,horizon,0,H);ground.addColorStop(0,'#536050');ground.addColorStop(.14,'#273b3b');ground.addColorStop(1,'#111f23');ctx.fillStyle=ground;ctx.fillRect(0,horizon,W,H-horizon);
    // Projected floor grid, runway rails, and lane dashes.
    ctx.lineWidth=1;for(let z=-2;z>-95;z-=2){const a=project(-7,.01,player.z+z),b=project(7,.01,player.z+z);if(a&&b&&a.z<85){ctx.strokeStyle=(Math.abs(z)%10<.1)?'rgba(213,255,63,.18)':'rgba(175,213,185,.09)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
    for(const x of [-6,-4,0,4,6]){let prev=null;for(let z=-1;z>-95;z-=2){const p=project(x,.015,player.z+z);if(p&&prev){ctx.strokeStyle=Math.abs(x)===6?'rgba(213,255,63,.32)':x===0?'rgba(213,255,63,.17)':'rgba(176,216,190,.09)';ctx.beginPath();ctx.moveTo(prev.x,prev.y);ctx.lineTo(p.x,p.y);ctx.stroke();}prev=p;}}
    // Render scene objects far-to-near for simple painter's ordering.
    const items=[...decor,...obstacles].map(o=>({o,d:Math.hypot(o.x-player.x,o.z-player.z)})).sort((a,b)=>b.d-a.d);for(const q of items)box(q.o);cores.forEach(c=>{if(!c.got)drawCore(c);});
    // Subtle edge vignette and speed streaks emphasize velocity without obscuring aim.
    const speed=Math.hypot(player.vx,player.vz);if(started&&speed>10){ctx.save();ctx.globalAlpha=clamp((speed-10)/26,0,.22);for(let i=0;i<8;i++){const y=H*(.22+i*.075),x=(i%2?W*.04:W*.82);ctx.strokeStyle='#d5ff3f';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(i%2?1:-1)*36,y-12);ctx.stroke();}ctx.restore();}
    const vg=ctx.createRadialGradient(W/2,H/2,H*.22,W/2,H/2,H*.78);vg.addColorStop(0,'transparent');vg.addColorStop(1,'rgba(0,0,0,.45)');ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
    // Stylized first-person gloves + compact sci-fi sidearm.
    ctx.save();const bob=Math.sin(player.bob)*Math.min(speed*.28,5),low=player.sliding?35:0;ctx.translate(0,bob+low);const gunX=W*.73,baseY=H*.91+player.y*30;
    ctx.fillStyle='#18252a';ctx.beginPath();ctx.moveTo(gunX-65,baseY+35);ctx.lineTo(gunX-24,baseY-52);ctx.lineTo(gunX+52,baseY-49);ctx.lineTo(gunX+90,baseY+80);ctx.lineTo(gunX+5,baseY+130);ctx.closePath();ctx.fill();
    ctx.fillStyle='#3e514f';ctx.beginPath();ctx.moveTo(gunX-33,baseY-42);ctx.lineTo(gunX+40,baseY-43);ctx.lineTo(gunX+57,baseY+5);ctx.lineTo(gunX-50,baseY+7);ctx.closePath();ctx.fill();ctx.fillStyle='#d5ff3f';ctx.fillRect(gunX-23,baseY-48,54,4);ctx.fillStyle='#11191b';ctx.fillRect(gunX-13,baseY-36,42,10);ctx.fillStyle='#d5ff3f';ctx.fillRect(gunX+3,baseY-34,12,3);
    ctx.fillStyle='#9c7658';ctx.beginPath();ctx.moveTo(gunX-68,baseY+32);ctx.quadraticCurveTo(gunX-31,baseY+13,gunX-8,baseY+31);ctx.lineTo(gunX-1,baseY+68);ctx.lineTo(gunX-38,baseY+86);ctx.closePath();ctx.fill();ctx.restore();
    if(player.landPulse>0){ctx.fillStyle=`rgba(213,255,63,${player.landPulse*.12})`;ctx.fillRect(0,0,W,H);}
  }
  function frame(now){const dt=Math.min(.04,(now-last)/1000||0);last=now;update(dt);render();requestAnimationFrame(frame);}requestAnimationFrame(frame);
})();
