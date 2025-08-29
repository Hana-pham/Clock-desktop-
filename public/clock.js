(function(){
  const elTime = document.getElementById('time');
  const elDate = document.getElementById('date');

  const state = {
    showSeconds: JSON.parse(localStorage.getItem('hp_showSeconds') ?? 'true'),
    showDate: JSON.parse(localStorage.getItem('hp_showDate') ?? 'true'),
    is12h: JSON.parse(localStorage.getItem('hp_is12h') ?? 'false')
  };

  const fmt = () => ({
    hour: '2-digit',
    minute: '2-digit',
    second: state.showSeconds ? '2-digit' : undefined,
    hour12: state.is12h
  });

  function tick(){
    const now = new Date();
    elTime.textContent = now.toLocaleTimeString([], fmt());
    if(state.showDate){
      elDate.style.display = '';
      elDate.textContent = now.toLocaleDateString([], { weekday:'short', day:'numeric', month:'short' });
    }else{
      elDate.style.display = 'none';
    }
  }

  setInterval(tick, 1000); tick();

  document.querySelector('[data-action="toggle-format"]').addEventListener('click', ()=>{
    state.is12h = !state.is12h; localStorage.setItem('hp_is12h', JSON.stringify(state.is12h)); tick();
  });
  document.querySelector('[data-action="toggle-seconds"]').addEventListener('click', ()=>{
    state.showSeconds = !state.showSeconds; localStorage.setItem('hp_showSeconds', JSON.stringify(state.showSeconds)); tick();
  });
  document.querySelector('[data-action="toggle-date"]').addEventListener('click', ()=>{
    state.showDate = !state.showDate; localStorage.setItem('hp_showDate', JSON.stringify(state.showDate)); tick();
  });

  window.addEventListener('keydown', (e)=>{
    if(e.key.toLowerCase()==='t'){ state.is12h=!state.is12h; localStorage.setItem('hp_is12h', JSON.stringify(state.is12h)); tick(); }
    if(e.key.toLowerCase()==='s'){ state.showSeconds=!state.showSeconds; localStorage.setItem('hp_showSeconds', JSON.stringify(state.showSeconds)); tick(); }
    if(e.key.toLowerCase()==='d'){ state.showDate=!state.showDate; localStorage.setItem('hp_showDate', JSON.stringify(state.showDate)); tick(); }
    if(e.key==='Escape'){ window.close(); }
  });
})();
