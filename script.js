// Cursor trail that appears only when hovering the text container
(function(){
  const container = document.getElementById('textWrap');
  let active = false;

  function makeTrail(x,y){
    const el = document.createElement('div');
    el.className = 'trail';
    const size = 6 + Math.random()*18; // vary size
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    const hue = 30 + Math.random()*20; // warm tone
    const alpha = 0.6 + Math.random()*0.25;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.background = `radial-gradient(circle at 35% 30%, rgba(255,255,255,${alpha}) 0%, rgba(210,180,140,${alpha*0.9}) 30%, rgba(180,150,100,${alpha*0.6}) 100%)`;
    el.style.boxShadow = `0 2px 10px rgba(120,80,40,0.08)`;
    el.style.animation = `trailFade 700ms ease-out forwards`;
    document.body.appendChild(el);
    // cleanup after animation
    setTimeout(()=>{
      el.remove();
    },750);
  }

  function onMove(e){
    if(!active) return;
    // create a couple of particles per move for a fuller trail
    const touches = 2 + Math.floor(Math.random()*2);
    for(let i=0;i<touches;i++){
      const rx = (Math.random()-0.5)*18;
      const ry = (Math.random()-0.5)*18;
      makeTrail(e.clientX + rx, e.clientY + ry);
    }
  }

  container.addEventListener('mouseenter', ()=>{ active = true; });
  container.addEventListener('mouseleave', ()=>{ active = false; });
  container.addEventListener('mousemove', onMove);

  // Also support touch interactions (touchmove over the container)
  container.addEventListener('touchstart', ()=>{ active = true; }, {passive:true});
  container.addEventListener('touchend', ()=>{ active = false; });
  container.addEventListener('touchmove', function(ev){
    if(!active) return;
    const touch = ev.touches[0];
    if(touch) onMove({clientX: touch.clientX, clientY: touch.clientY});
  }, {passive:true});
})();
