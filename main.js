// ========== 农历 ==========
const lunarInfo=[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x16a95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06aa0,0x1a6c4,0x0aae0,0x092e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a4d0,0x0d150,0x0f252,0x0d520];
const lunarMonthStr=['正','二','三','四','五','六','七','八','九','十','冬','腊'];
const lunarDayStr=['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
function lYearDays(y){let s=348;for(let i=0x8000;i>0x8;i>>=1)s+=(lunarInfo[y-1900]&i)?1:0;return s+lLeapDays(y)}
function lLeapDays(y){if(lLeapMonth(y))return(lunarInfo[y-1900]&0x10000)?30:29;return 0}
function lLeapMonth(y){return lunarInfo[y-1900]&0xf}
function lMonthDays(y,m){return(lunarInfo[y-1900]&(0x10000>>m))?30:29}
function solarToLunar(yy,mm,dd){let offset=Math.floor((Date.UTC(yy,mm,dd)-Date.UTC(1900,0,31))/86400000);let y=1900;for(;y<2101&&offset>0;y++){let d=lYearDays(y);if(offset<d)break;offset-=d}if(offset<0){offset+=lYearDays(--y)}let leap=lLeapMonth(y),isLeap=false,m=1;for(;m<13&&offset>0;m++){if(leap>0&&m===(leap+1)&&!isLeap){--m;isLeap=true;let d=lLeapDays(y);if(offset<d)break;offset-=d;isLeap=false;}else{let d=lMonthDays(y,m);if(offset<d)break;offset-=d;}}return{month:m,day:offset+1,isLeap}}
function getLunarDayText(y,m,d){const l=solarToLunar(y,m,d);if(l.day===1)return(l.isLeap?'闰':'')+lunarMonthStr[l.month-1]+'月';return lunarDayStr[l.day-1]}
function lunarToSolar(year,lm,ld){let offset=0;for(let m=1;m<lm;m++){offset+=lMonthDays(year,m);if(lLeapMonth(year)===m)offset+=lLeapDays(year)}offset+=ld-1;let t=0;for(let y=1900;y<year;y++)t+=lYearDays(y);t+=offset;return new Date(Date.UTC(1900,0,31)+t*86400000)}

// ========== 数据层 ==========
function getModules(){return JSON.parse(localStorage.getItem('dashModules')||'["calendar","countdown","workoff"]')}
function saveModules(m){localStorage.setItem('dashModules',JSON.stringify(m))}
function getLinks(){return JSON.parse(localStorage.getItem('shortcutLinks')||'[]')}
function saveLinks(l){localStorage.setItem('shortcutLinks',JSON.stringify(l))}
function getCategories(){return JSON.parse(localStorage.getItem('linkCategories')||'[]')}
function saveCategories(c){localStorage.setItem('linkCategories',JSON.stringify(c))}
function getAllCatNames(){const cats=getCategories();const linkCats=getLinks().map(l=>l.category||'').filter(c=>c&&!cats.includes(c));return [...cats,...linkCats]}
function getEvents(){return JSON.parse(localStorage.getItem('customEvents')||'[]')}
function saveEvents(l){localStorage.setItem('customEvents',JSON.stringify(l))}
function getMemos(){return JSON.parse(localStorage.getItem('memos')||'[]')}
function saveMemos(l){localStorage.setItem('memos',JSON.stringify(l))}
function diffDays(a,b){return Math.ceil((a-b)/86400000)}

// ========== 事件系统 ==========
function getNextOccurrence(evt){
  const now=new Date();now.setHours(0,0,0,0);
  if(evt.cycle==='monthly'){let d=new Date(now.getFullYear(),now.getMonth(),evt.day);d.setHours(0,0,0,0);if(d<now)d=new Date(now.getFullYear(),now.getMonth()+1,evt.day);return d}
  if(evt.cycle==='yearly-lunar'){for(let y=now.getFullYear();y<=now.getFullYear()+1;y++)for(let ly=y-1;ly<=y;ly++){try{const d=lunarToSolar(ly,evt.month,evt.day);d.setHours(0,0,0,0);if(d>=now)return d}catch(e){}}return null}
  let d=new Date(now.getFullYear(),evt.month-1,evt.day);d.setHours(0,0,0,0);if(d<now)d=new Date(now.getFullYear()+1,evt.month-1,evt.day);return d
}
function getEventSolarDay(evt,cY,cM){
  if(evt.cycle==='monthly')return evt.day;
  if(evt.cycle==='yearly-lunar'){for(let ly=cY-1;ly<=cY+1;ly++){try{const d=lunarToSolar(ly,evt.month,evt.day);if(d.getFullYear()===cY&&d.getMonth()===cM)return d.getDate()}catch(e){}}return null}
  return evt.month===cM+1?evt.day:null
}

// ========== 右键菜单 ==========
let ctxTarget=null;
document.addEventListener('click',()=>{document.getElementById('ctxMenu').style.display='none'});
document.addEventListener('contextmenu',e=>{
  const menu=document.getElementById('ctxMenu');
  const card=e.target.closest('.module-card');
  if(card){e.preventDefault();const id=card.dataset.moduleId;const idx=parseInt(card.dataset.moduleIdx);
    let items='';
    if(id==='calendar')items='<div class="ctx-item" data-action="openMemo">📝 备忘录</div>';
    if(id==='countdown')items='<div class="ctx-item" data-action="openEvt">✎ 管理事件</div>';
    if(id==='workoff')items='<div class="ctx-item" data-action="openWork">⚙️ 设置</div>';
    if(items){menu.innerHTML=items;showCtx(menu,e);bindCtxActions();}return}
  const link=e.target.closest('.link-item:not(.add-link)');
  if(link){e.preventDefault();const idx=parseInt(link.dataset.linkIdx);
    menu.innerHTML='<div class="ctx-item" data-action="editLink" data-idx="'+idx+'">✎ 编辑</div><div class="ctx-item danger" data-action="removeLink" data-idx="'+idx+'">🗑️ 删除</div>';
    showCtx(menu,e);bindCtxActions();return}
  const catHeader=e.target.closest('.cat-header');
  if(catHeader){e.preventDefault();const cat=catHeader.dataset.cat;
    menu.innerHTML='<div class="ctx-item" data-action="renameCat" data-cat="'+cat+'">✎ 重命名</div><div class="ctx-item danger" data-action="removeCat" data-cat="'+cat+'">🗑️ 删除分类</div>';
    showCtx(menu,e);bindCtxActions();return}
  const panel=e.target.closest('.right-panel');
  if(panel){e.preventDefault();
    menu.innerHTML='<div class="ctx-item" data-action="addLink">🔗 添加网址</div><div class="ctx-item" data-action="addCat">📁 添加分类</div>';
    showCtx(menu,e);bindCtxActions();return}
});
function showCtx(menu,e){menu.style.display='block';menu.style.left=e.clientX+'px';menu.style.top=e.clientY+'px';
  const r=menu.getBoundingClientRect();if(r.right>window.innerWidth)menu.style.left=(e.clientX-r.width)+'px';if(r.bottom>window.innerHeight)menu.style.top=(e.clientY-r.height)+'px'}
function bindCtxActions(){
  document.querySelectorAll('.ctx-item').forEach(el=>{
    el.addEventListener('click',function(){
      const action=this.dataset.action;
      const idx=parseInt(this.dataset.idx);
      const cat=this.dataset.cat;
      if(action==='openMemo')openMemoModal();
      if(action==='openEvt')openEvtModal();
      if(action==='openWork')openWorkModal();
      if(action==='editLink')openLinkModal(idx);
      if(action==='removeLink')removeLink(idx);
      if(action==='addLink')openLinkModal(-1);
      if(action==='addCat')openCatModal('');
      if(action==='renameCat')openCatModal(cat);
      if(action==='removeCat')removeCat(cat);
    });
  });
}

// ========== 模块管理 ==========
function addModule(type){const m=getModules();m.push(type);saveModules(m);closeAddModule();renderAll()}
function removeModule(idx){const m=getModules();m.splice(idx,1);saveModules(m);renderAll()}
function openAddModule(){document.getElementById('addModuleOverlay').style.display='block';document.getElementById('addModuleModal').style.display='block'}
function closeAddModule(){document.getElementById('addModuleOverlay').style.display='none';document.getElementById('addModuleModal').style.display='none'}

// ========== 渲染模块 ==========
let calYear,calMonth;
(function(){const n=new Date();calYear=n.getFullYear();calMonth=n.getMonth()})();
function changeMonth(d){calMonth+=d;if(calMonth<0){calMonth=11;calYear--}if(calMonth>11){calMonth=0;calYear++}renderAll()}

function renderModules(){
  const colLeft=document.getElementById('colLeft');
  const colMid=document.getElementById('colMid');
  const modules=getModules();
  let leftHtml='',midHtml='';
  modules.forEach((type,i)=>{
    if(type==='calendar') leftHtml+=renderCalendarCard(i);
    if(type==='countdown') midHtml+=renderCountdownCard(i);
    if(type==='workoff') midHtml+=renderWorkoffCard(i);
  });
  colLeft.innerHTML=leftHtml;
  colMid.innerHTML=midHtml;
  // 绑定日历导航按钮
  document.querySelectorAll('[data-cal-action]').forEach(el=>{
    el.addEventListener('click',function(){
      const act=this.dataset.calAction;
      if(act==='prev')changeMonth(-1);
      if(act==='next')changeMonth(1);
      if(act==='memo')openMemoModal();
    });
  });
  // 绑定倒计时设置按钮
  document.querySelectorAll('[data-cd-action]').forEach(el=>{
    el.addEventListener('click',function(){
      if(this.dataset.cdAction==='openEvt')openEvtModal();
    });
  });
  // 绑定下班倒计时设置按钮
  document.querySelectorAll('[data-work-action]').forEach(el=>{
    el.addEventListener('click',function(){
      if(this.dataset.workAction==='openWork')openWorkModal();
    });
  });
  // 悬浮提示
  document.querySelectorAll('.day[data-tags]').forEach(el=>{el.addEventListener('mouseenter',showTooltip);el.addEventListener('mousemove',moveTooltip);el.addEventListener('mouseleave',hideTooltip)});
}

function renderCalendarCard(idx){
  const events=getEvents(),memos=getMemos();
  const today=new Date();today.setHours(0,0,0,0);
  const my=`${calYear}年${calMonth+1}月`;
  const weekdays=['日','一','二','三','四','五','六'];
  let grid=weekdays.map(w=>`<div style="font-size:1.1vw;color:#555;display:flex;align-items:center;justify-content:center;">${w}</div>`).join('');
  const firstDay=new Date(calYear,calMonth,1).getDay();
  const dim=new Date(calYear,calMonth+1,0).getDate();
  const prevDays=new Date(calYear,calMonth,0).getDate();
  const pm=calMonth===0?11:calMonth-1,py=calMonth===0?calYear-1:calYear;
  for(let i=firstDay-1;i>=0;i--){const d=prevDays-i;grid+=`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;color:#333;"><span style="font-size:1.1vw;">${d}</span><span style="font-size:0.7vw;color:#222;">${getLunarDayText(py,pm,d)}</span></div>`}
  for(let d=1;d<=dim;d++){
    let bg='transparent',border='none',color='#ccc',tags=[];
    const isToday=calYear===today.getFullYear()&&calMonth===today.getMonth()&&d===today.getDate();
    if(isToday){bg='#f5c542';color='#000';tags.push('今天')}
    let evtColor=null;
    events.forEach(evt=>{const sd=getEventSolarDay(evt,calYear,calMonth);if(sd===d){tags.push(evt.name);if(!evtColor)evtColor=evt.color}});
    const dk=`${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    memos.filter(m=>m.date===dk).forEach(m=>{tags.push('📝 '+m.text);if(!evtColor)evtColor=m.color||'#5c6bc0'});
    if(evtColor)border=`2px solid ${evtColor}`;
    grid+=`<div class="day" data-tags="${tags.join(' / ')}" style="display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:8px;background:${bg};color:${color};border:${border};cursor:default;"><span style="font-size:1.1vw;">${d}</span><span style="font-size:0.7vw;color:${isToday?'#555':'#555'};">${getLunarDayText(calYear,calMonth,d)}</span></div>`
  }
  const tc=firstDay+dim,rem=(7-tc%7)%7;const nm=calMonth===11?0:calMonth+1,ny=calMonth===11?calYear+1:calYear;
  for(let i=1;i<=rem;i++){grid+=`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;color:#333;"><span style="font-size:1.1vw;">${i}</span><span style="font-size:0.7vw;color:#222;">${getLunarDayText(ny,nm,i)}</span></div>`}

  return `<div class="module-card" data-module-id="calendar" data-module-idx="${idx}" style="height:calc(50vh - 32px);display:flex;flex-direction:column;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <button data-cal-action="prev" style="background:none;border:1px solid #333;color:#ccc;border-radius:8px;padding:4px 14px;cursor:pointer;font-size:15px;">◀</button>
      <span style="font-size:18px;font-weight:600;color:#ddd;">${my}</span>
      <div style="display:flex;gap:8px;align-items:center;">
        <button data-cal-action="memo" style="background:none;border:1px solid #222;color:#666;border-radius:8px;padding:3px 10px;cursor:pointer;font-size:12px;">📝</button>
        <button data-cal-action="next" style="background:none;border:1px solid #333;color:#ccc;border-radius:8px;padding:4px 14px;cursor:pointer;font-size:15px;">▶</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;flex:1;">${grid}</div>
  </div>`;
}

function renderCountdownCard(idx){
  const now=new Date();now.setHours(0,0,0,0);
  let items=[];
  getEvents().forEach(evt=>{if(evt.hidden)return;const next=getNextOccurrence(evt);if(!next)return;const d=diffDays(next,now);items.push({label:evt.name,days:d,color:evt.color,icon:evt.icon||'📌'})});
  items.sort((a,b)=>a.days-b.days);
  const content=items.length?items.map(i=>{
    const dt=i.days===0?'今天！':`${i.days}<small style="font-size:11px;color:#888;margin-left:3px;">天</small>`;
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#1a1a1a;border-radius:8px;">
      <span style="font-size:13px;display:flex;align-items:center;gap:5px;"><span style="width:8px;height:8px;border-radius:50%;background:${i.color};flex-shrink:0;"></span>${i.icon} ${i.label}</span>
      <span style="font-size:20px;font-weight:700;color:${i.color};">${dt}</span>
    </div>`}).join(''):'<div style="color:#555;font-size:12px;text-align:center;padding:16px;">右键管理事件</div>';
  return `<div class="module-card" data-module-id="countdown" data-module-idx="${idx}" style="height:calc(50vh - 32px);display:flex;flex-direction:column;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <h3 style="margin:0;">📅 倒计时</h3>
      <button data-cd-action="openEvt" style="background:none;border:1px solid #222;color:#666;border-radius:8px;padding:3px 10px;cursor:pointer;font-size:12px;">⚙️</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;flex:1;overflow-y:auto;">${content}</div>
  </div>`;
}

// ========== 网址 ==========
let editingLinkIdx=-1,pendingIconImg=null;
const emojiList=['🔍','🌐','🐙','📺','💬','🛒','📰','🤖','🎵','📚','🏠','⭐','❤️','🔥','💡','🎮','🎬','📷','✈️','🚀','💻','📱','🖥️','⌨️','🖱️','💾','📁','📝','✏️','📌','📎','🔗','📧','💰','🏦','🛍️','🎁','🎉','🎂','🍕','🍔','☕','🍺','🌈','☀️','🌙','⚡','🔔','🔒','🔑','⚙️','🛠️','🧪','📊','📈','🗓️','⏰','🌍','🏢','🎓','📖','📕','📗','📘','🔖','💎','🎯','🏆'];

function renderLinks(){
  const links=getLinks(),cats=getCategories();
  const grid=document.getElementById('linksGrid');
  // group links by category
  const grouped={};
  links.forEach((l,i)=>{if(!l)return;const c=l.category||'';if(!grouped[c])grouped[c]=[];grouped[c].push({link:l,idx:i})});
  let html='';
  // uncategorized first
  if(grouped['']&&grouped[''].length){
    html+=`<div class="cat-section" data-cat=""><div class="cat-links" data-drop-cat="">`;
    grouped[''].forEach(item=>{html+=renderLinkItem(item.link,item.idx)});
    html+=`</div></div>`;
  }
  // then each category
  cats.forEach(cat=>{
    html+=`<div class="cat-section" data-cat="${cat}"><div class="cat-header" data-cat="${cat}"><span>📁 ${cat}</span></div><div class="cat-links" data-drop-cat="${cat}">`;
    if(grouped[cat]){grouped[cat].forEach(item=>{html+=renderLinkItem(item.link,item.idx)})}
    html+=`</div></div>`;
  });
  grid.innerHTML=html;
  bindLinkDrag();
}

function renderLinkItem(l,i){
  const icon=l.iconImg?`<img src="${l.iconImg}" style="width:30px;height:30px;border-radius:6px;object-fit:cover;">`:(l.icon||'🔗');
  return `<a class="link-item" href="${l.url}" target="_blank" rel="noopener" data-link-idx="${i}" draggable="true"><div class="link-icon">${icon}</div><span>${l.name||'未命名'}</span></a>`;
}

let dragFromIdx=null;
function bindLinkDrag(){
  const items=document.querySelectorAll('.link-item[data-link-idx]');
  items.forEach(el=>{
    el.addEventListener('dragstart',function(e){
      dragFromIdx=parseInt(this.dataset.linkIdx);
      this.style.opacity='0.4';
      e.dataTransfer.effectAllowed='move';
      e.dataTransfer.setData('text/plain',dragFromIdx);
    });
    el.addEventListener('dragend',function(){
      this.style.opacity='1';
      document.querySelectorAll('.link-item').forEach(x=>x.classList.remove('drag-over'));
      document.querySelectorAll('.cat-links').forEach(x=>x.classList.remove('drag-over-cat'));
    });
    el.addEventListener('dragover',function(e){
      e.preventDefault();e.dataTransfer.dropEffect='move';
      this.classList.add('drag-over');
    });
    el.addEventListener('dragleave',function(){this.classList.remove('drag-over')});
    el.addEventListener('drop',function(e){
      e.preventDefault();e.stopPropagation();
      this.classList.remove('drag-over');
      const toIdx=parseInt(this.dataset.linkIdx);
      if(dragFromIdx===null||dragFromIdx===toIdx)return;
      const links=getLinks();
      // match target's category
      const targetCat=links[toIdx].category||'';
      links[dragFromIdx].category=targetCat;
      const [moved]=links.splice(dragFromIdx,1);
      const newToIdx=links.indexOf(links[toIdx>dragFromIdx?toIdx-1:toIdx]);
      links.splice(toIdx>dragFromIdx?toIdx:toIdx,0,moved);
      saveLinks(links);renderLinks();
    });
  });
  // category drop zones
  document.querySelectorAll('.cat-links[data-drop-cat]').forEach(zone=>{
    zone.addEventListener('dragover',function(e){e.preventDefault();e.dataTransfer.dropEffect='move';this.classList.add('drag-over-cat')});
    zone.addEventListener('dragleave',function(e){if(!this.contains(e.relatedTarget))this.classList.remove('drag-over-cat')});
    zone.addEventListener('drop',function(e){
      e.preventDefault();this.classList.remove('drag-over-cat');
      if(dragFromIdx===null)return;
      const cat=this.dataset.dropCat;
      const links=getLinks();
      links[dragFromIdx].category=cat;
      saveLinks(links);renderLinks();
    });
  });
}



function openLinkModal(idx){
  editingLinkIdx=idx;pendingIconImg=null;
  const links=getLinks(),l=idx>=0?links[idx]:null;
  document.getElementById('linkName').value=l?(l.name||''):'';
  document.getElementById('linkUrl').value=l?(l.url||''):'';
  document.getElementById('linkIcon').value=(l&&!l.iconImg)?(l.icon||''):'';
  document.getElementById('emojiPicker').style.display='none';
  const p=document.getElementById('iconPreview');
  if(l&&l.iconImg){pendingIconImg=l.iconImg;p.innerHTML=`<img src="${l.iconImg}" style="width:24px;height:24px;border-radius:4px;vertical-align:middle;"> 当前`}else{p.innerHTML=''}
  // populate category dropdown
  const sel=document.getElementById('linkCatSelect');
  const cats=getCategories();
  sel.innerHTML='<option value="">未分类</option>'+cats.map(c=>`<option value="${c}">${c}</option>`).join('');
  if(l&&l.category)sel.value=l.category;
  document.getElementById('linkCatNew').value='';
  document.getElementById('linkModalTitle').textContent=idx>=0?'编辑网址':'添加网址';
  document.getElementById('linkModal').style.display='block';document.getElementById('linkModalOverlay').style.display='block';
  document.getElementById('linkName').focus();
}
function closeLinkModal(){document.getElementById('linkModal').style.display='none';document.getElementById('linkModalOverlay').style.display='none';editingLinkIdx=-1;pendingIconImg=null}
function saveLinkModal(){
  const name=document.getElementById('linkName').value.trim();let url=document.getElementById('linkUrl').value.trim();const emoji=document.getElementById('linkIcon').value.trim();
  if(!url){alert('请输入网址');return}if(!/^https?:\/\//i.test(url))url='https://'+url;
  // determine category
  const newCat=document.getElementById('linkCatNew').value.trim();
  let category=document.getElementById('linkCatSelect').value;
  if(newCat){category=newCat;const cats=getCategories();if(!cats.includes(newCat)){cats.push(newCat);saveCategories(cats)}}
  const links=getLinks(),entry={name:name||'未命名',url,category:category||''};
  if(pendingIconImg){entry.iconImg=pendingIconImg;entry.icon=''}else{entry.icon=emoji||'🔗';entry.iconImg=''}
  if(editingLinkIdx>=0){links[editingLinkIdx]=entry}else{links.push(entry)}
  saveLinks(links);closeLinkModal();renderAll();
}
function removeLink(idx){const links=getLinks();links.splice(idx,1);saveLinks(links);renderAll()}
function toggleEmojiPicker(){const p=document.getElementById('emojiPicker');if(p.style.display==='none'){document.getElementById('emojiGrid').innerHTML=emojiList.map(e=>`<span class="emoji-pick" data-emoji="${e}" style="font-size:22px;cursor:pointer;padding:4px 6px;border-radius:6px;">${e}</span>`).join('');bindEmojiPicks();p.style.display='block'}else{p.style.display='none'}}
function pickEmoji(e){document.getElementById('linkIcon').value=e;document.getElementById('emojiPicker').style.display='none';pendingIconImg=null;document.getElementById('iconPreview').innerHTML=''}
function bindEmojiPicks(){document.querySelectorAll('#emojiGrid .emoji-pick').forEach(el=>{el.addEventListener('click',function(){pickEmoji(this.dataset.emoji)});el.addEventListener('mouseenter',function(){this.style.background='#333'});el.addEventListener('mouseleave',function(){this.style.background='transparent'})})}
function onIconFileChange(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{pendingIconImg=ev.target.result;document.getElementById('linkIcon').value='';document.getElementById('iconPreview').innerHTML=`<img src="${pendingIconImg}" style="width:24px;height:24px;border-radius:4px;vertical-align:middle;"> 已选择`};r.readAsDataURL(f)}

// ========== 事件管理弹窗 ==========
function openEvtModal(){document.getElementById('evtModal').style.display='block';document.getElementById('evtModalOverlay').style.display='block';renderEvtList()}
function closeEvtModal(){document.getElementById('evtModal').style.display='none';document.getElementById('evtModalOverlay').style.display='none'}
function addEvent(){
  const name=document.getElementById('evtName').value.trim(),icon=document.getElementById('evtIcon').value.trim(),cycle=document.getElementById('evtCycle').value,month=parseInt(document.getElementById('evtMonth').value),day=parseInt(document.getElementById('evtDay').value),color=document.getElementById('evtColor').value;
  if(!name){alert('请输入名称');return}
  if(cycle==='monthly'){if(!day||day<1||day>31){alert('请输入正确日期');return}}else{if(!month||!day||month<1||month>12||day<1||day>31){alert('请输入正确月日');return}}
  const list=getEvents();list.push({name,icon:icon||'📌',cycle,month:month||0,day,color,hidden:false});saveEvents(list);
  document.getElementById('evtName').value='';document.getElementById('evtIcon').value='';document.getElementById('evtMonth').value='';document.getElementById('evtDay').value='';
  document.getElementById('evtEmojiPicker').style.display='none';renderEvtList();renderAll();
}
function removeEvent(i){const l=getEvents();l.splice(i,1);saveEvents(l);renderEvtList();renderAll()}
function toggleEventHidden(i){const l=getEvents();l[i].hidden=!l[i].hidden;saveEvents(l);renderEvtList();renderAll()}
function renderEvtList(){
  const el=document.getElementById('evtList'),list=getEvents();
  if(!list.length){el.innerHTML='<div style="color:#555;font-size:12px;">暂无事件</div>';return}
  el.innerHTML=list.map((e,i)=>{
    const cl=e.cycle==='monthly'?'每月':(e.cycle==='yearly-lunar'?'每年农历':'每年');
    const ds=e.cycle==='monthly'?`${e.day}日`:(e.cycle==='yearly-lunar'?`${lunarMonthStr[e.month-1]}月${lunarDayStr[e.day-1]}`:`${e.month}月${e.day}日`);
    return `<div style="background:#1a1a1a;padding:6px 12px;border-radius:8px;display:flex;align-items:center;gap:8px;border:1px solid #222;font-size:13px;margin-bottom:6px;${e.hidden?'opacity:.4':''}">
      <span style="font-size:16px;">${e.icon||'📌'}</span><span style="width:10px;height:10px;border-radius:50%;background:${e.color};flex-shrink:0;"></span>
      <span style="flex:1;">${e.name} · ${cl}${ds}</span>
      <button class="evt-toggle" data-evt-idx="${i}" style="background:none;border:none;cursor:pointer;font-size:13px;color:#888;">${e.hidden?'显示':'隐藏'}</button>
      <button class="evt-remove" data-evt-idx="${i}" style="background:none;border:none;cursor:pointer;font-size:14px;color:#e91e63;">✕</button>
    </div>`}).join('');
  document.querySelectorAll('.evt-toggle').forEach(el=>{el.addEventListener('click',function(){toggleEventHidden(parseInt(this.dataset.evtIdx))})});
  document.querySelectorAll('.evt-remove').forEach(el=>{el.addEventListener('click',function(){removeEvent(parseInt(this.dataset.evtIdx))})});
}
function toggleEvtEmojiPicker(){const p=document.getElementById('evtEmojiPicker');if(p.style.display==='none'){document.getElementById('evtEmojiGrid').innerHTML=emojiList.map(e=>`<span class="evt-emoji-pick" data-emoji="${e}" style="font-size:20px;cursor:pointer;padding:3px 5px;border-radius:6px;">${e}</span>`).join('');bindEvtEmojiPicks();p.style.display='block'}else{p.style.display='none'}}
function pickEvtEmoji(e){document.getElementById('evtIcon').value=e;document.getElementById('evtEmojiPicker').style.display='none'}
function bindEvtEmojiPicks(){document.querySelectorAll('#evtEmojiGrid .evt-emoji-pick').forEach(el=>{el.addEventListener('click',function(){pickEvtEmoji(this.dataset.emoji)});el.addEventListener('mouseenter',function(){this.style.background='#333'});el.addEventListener('mouseleave',function(){this.style.background='transparent'})})}

// ========== 备忘录弹窗 ==========
const memoColors=['#5c6bc0','#ef5350','#ab47bc','#26a69a','#ffa726','#42a5f5','#ec407a','#66bb6a','#8d6e63','#78909c'];
function openMemoModal(){document.getElementById('memoModal').style.display='block';document.getElementById('memoModalOverlay').style.display='block';const t=new Date();document.getElementById('memoDate').value=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;renderMemoList()}
function closeMemoModal(){document.getElementById('memoModal').style.display='none';document.getElementById('memoModalOverlay').style.display='none'}
function addMemo(){const date=document.getElementById('memoDate').value,text=document.getElementById('memoText').value.trim();if(!date||!text){alert('请选择日期并输入内容');return}const l=getMemos();l.push({date,text,color:memoColors[Math.floor(Math.random()*memoColors.length)]});l.sort((a,b)=>a.date.localeCompare(b.date));saveMemos(l);document.getElementById('memoText').value='';renderMemoList();renderAll()}
function removeMemo(i){const l=getMemos();l.splice(i,1);saveMemos(l);renderMemoList();renderAll()}
function renderMemoList(){
  const el=document.getElementById('memoList'),list=getMemos(),today=new Date();today.setHours(0,0,0,0);
  if(!list.length){el.innerHTML='<div style="color:#555;font-size:12px;">暂无备忘</div>';return}
  el.innerHTML=list.map((m,i)=>{const d=new Date(m.date);d.setHours(0,0,0,0);return `<div style="background:#1a1a1a;padding:6px 12px;border-radius:8px;display:flex;align-items:center;gap:8px;border:1px solid #222;font-size:13px;margin-bottom:6px;${d<today?'opacity:.4':''}">
    <span style="width:10px;height:10px;border-radius:50%;background:${m.color||'#5c6bc0'};flex-shrink:0;"></span>
    <span style="color:${m.color||'#5c6bc0'};font-size:12px;white-space:nowrap;">${m.date.replace(/-/g,'/')}</span>
    <span style="flex:1;">${m.text}</span>
    <button class="memo-remove" data-memo-idx="${i}" style="background:none;border:none;cursor:pointer;font-size:14px;color:#e91e63;">✕</button>
  </div>`}).join('');
  document.querySelectorAll('.memo-remove').forEach(el=>{el.addEventListener('click',function(){removeMemo(parseInt(this.dataset.memoIdx))})});
}

// ========== 悬浮提示 ==========
const tooltip=document.getElementById('dayTooltip');
function showTooltip(e){const t=e.currentTarget.getAttribute('data-tags');if(!t)return;tooltip.textContent=t;tooltip.style.display='block';moveTooltip(e)}
function moveTooltip(e){tooltip.style.left=(e.clientX+12)+'px';tooltip.style.top=(e.clientY-36)+'px'}
function hideTooltip(){tooltip.style.display='none'}

// ========== 下班倒计时 ==========
function getWorkSettings(){return JSON.parse(localStorage.getItem('workSettings')||'{"start":"09:00:00","end":"18:00:00","img":""}')}
function saveWorkSettingsData(d){localStorage.setItem('workSettings',JSON.stringify(d))}
let pendingWorkImg=null;

function openWorkModal(){
  const s=getWorkSettings();
  document.getElementById('workStart').value=s.start||'09:00:00';
  document.getElementById('workEnd').value=s.end||'18:00:00';
  pendingWorkImg=null;
  const p=document.getElementById('workImgPreview');
  p.innerHTML=s.img?`<img src="${s.img}" style="width:24px;height:24px;border-radius:4px;vertical-align:middle;"> 当前`:'';
  if(s.img)pendingWorkImg=s.img;
  document.getElementById('workModal').style.display='block';document.getElementById('workModalOverlay').style.display='block';
}
function closeWorkModal(){document.getElementById('workModal').style.display='none';document.getElementById('workModalOverlay').style.display='none';pendingWorkImg=null}
function onWorkImgChange(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{pendingWorkImg=ev.target.result;document.getElementById('workImgPreview').innerHTML=`<img src="${pendingWorkImg}" style="width:24px;height:24px;border-radius:4px;vertical-align:middle;"> 已选择`};r.readAsDataURL(f)}
function saveWorkSettings(){
  const start=document.getElementById('workStart').value,end=document.getElementById('workEnd').value;
  if(!start||!end){alert('请设置上下班时间');return}
  const s=getWorkSettings();s.start=start;s.end=end;if(pendingWorkImg)s.img=pendingWorkImg;
  saveWorkSettingsData(s);closeWorkModal();renderAll();
}

function renderWorkoffCard(idx){
  const s=getWorkSettings();
  const now=new Date();
  const [eh,em,es]=(s.end||'18:00:00').split(':').map(Number);
  const [sh,sm,ss]=(s.start||'09:00:00').split(':').map(Number);
  const endTime=new Date(now);endTime.setHours(eh,em,es||0,0);
  const startTime=new Date(now);startTime.setHours(sh,sm,ss||0,0);

  let statusText='',countdownText='',progressPct=0;
  if(now<startTime){
    statusText='还没上班呢 😴';countdownText='';
  }else if(now>=endTime){
    statusText='已下班 🎉';countdownText='自由时间！';progressPct=100;
  }else{
    statusText='努力搬砖中...';
    const remain=endTime-now;
    const h=Math.floor(remain/3600000),m=Math.floor((remain%3600000)/60000),sec=Math.floor((remain%60000)/1000);
    countdownText=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    const total=endTime-startTime;progressPct=Math.min(100,((now-startTime)/total*100)).toFixed(1);
  }

  const imgHtml=s.img?`<div style="flex:2;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:12px;"><img src="${s.img}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:12px;"></div>`
    :'<div style="flex:2;display:flex;align-items:center;justify-content:center;color:#333;font-size:13px;">右键设置图片</div>';

  return `<div class="module-card" data-module-id="workoff" data-module-idx="${idx}" style="height:calc(50vh - 40px);display:flex;flex-direction:column;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <h3 style="margin:0;">⏰ 下班倒计时</h3>
      <button data-work-action="openWork" style="background:none;border:1px solid #222;color:#666;border-radius:8px;padding:3px 10px;cursor:pointer;font-size:12px;">⚙️</button>
    </div>
    <div style="flex:1;display:flex;flex-direction:column;gap:8px;min-height:0;">
      ${imgHtml}
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;">
        <div style="font-size:13px;color:#888;">${statusText}</div>
        <div style="font-size:2.2vw;font-weight:700;color:#f5c542;font-variant-numeric:tabular-nums;" id="workCountdown">${countdownText}</div>
        <div style="width:100%;height:6px;background:#1a1a1a;border-radius:3px;overflow:hidden;">
          <div style="height:100%;width:${progressPct}%;background:linear-gradient(90deg,#4caf50,#f5c542);border-radius:3px;transition:width 1s;"></div>
        </div>
        <div style="font-size:11px;color:#555;">${s.start} — ${s.end}</div>
      </div>
    </div>
  </div>`;
}

// 每秒更新下班倒计时
setInterval(()=>{
  const el=document.getElementById('workCountdown');
  if(!el)return;
  const s=getWorkSettings(),now=new Date();
  const [eh,em,es]=(s.end||'18:00:00').split(':').map(Number);
  const [sh,sm,ss]=(s.start||'09:00:00').split(':').map(Number);
  const endTime=new Date(now);endTime.setHours(eh,em,es||0,0);
  const startTime=new Date(now);startTime.setHours(sh,sm,ss||0,0);
  if(now<startTime){el.textContent=''}
  else if(now>=endTime){el.textContent='自由时间！'}
  else{const r=endTime-now;const h=Math.floor(r/3600000),m=Math.floor((r%3600000)/60000),sec=Math.floor((r%60000)/1000);el.textContent=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`}
},1000);

// ========== 分类管理 ==========
let editingCatName='';
function openCatModal(oldName){
  editingCatName=oldName;
  document.getElementById('catModalTitle').textContent=oldName?'重命名分类':'添加分类';
  document.getElementById('catNameInput').value=oldName;
  document.getElementById('catModal').style.display='block';document.getElementById('catModalOverlay').style.display='block';
  document.getElementById('catNameInput').focus();
}
function closeCatModal(){document.getElementById('catModal').style.display='none';document.getElementById('catModalOverlay').style.display='none';editingCatName=''}
function saveCatModal(){
  const name=document.getElementById('catNameInput').value.trim();
  if(!name){alert('请输入分类名称');return}
  const cats=getCategories();
  if(editingCatName){
    // rename
    const idx=cats.indexOf(editingCatName);
    if(idx>=0)cats[idx]=name;
    // update links
    const links=getLinks();
    links.forEach(l=>{if(l.category===editingCatName)l.category=name});
    saveLinks(links);
  }else{
    if(cats.includes(name)){alert('分类已存在');return}
    cats.push(name);
  }
  saveCategories(cats);closeCatModal();renderAll();
}
function removeCat(cat){
  const cats=getCategories();
  const idx=cats.indexOf(cat);
  if(idx>=0)cats.splice(idx,1);
  saveCategories(cats);
  // move links in this category to uncategorized
  const links=getLinks();
  links.forEach(l=>{if(l.category===cat)l.category=''});
  saveLinks(links);
  renderAll();
}

// ========== 设置 ==========
function toggleSettings(){const o=document.getElementById('settingsOverlay'),m=document.getElementById('settingsModal');const show=o.style.display==='none';o.style.display=show?'block':'none';m.style.display=show?'block':'none';if(show)initFontUI()}
function applyFont(){document.body.style.fontFamily=localStorage.getItem('customFont')||"'Microsoft YaHei',sans-serif"}
function saveFont(){const s=document.getElementById('fontSelect').value;localStorage.setItem('customFont',s);applyFont()}
function initFontUI(){const saved=localStorage.getItem('customFont')||"'Microsoft YaHei',sans-serif",sel=document.getElementById('fontSelect');for(const o of sel.options){if(o.value===saved){o.selected=true;break}}}
function exportConfig(){const data={shortcutLinks:localStorage.getItem('shortcutLinks'),linkCategories:localStorage.getItem('linkCategories'),customEvents:localStorage.getItem('customEvents'),memos:localStorage.getItem('memos'),dashModules:localStorage.getItem('dashModules'),customFont:localStorage.getItem('customFont'),workSettings:localStorage.getItem('workSettings'),_exportTime:new Date().toISOString()};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='网页小助手_配置.json';a.click();URL.revokeObjectURL(a.href)}
function importConfig(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);['shortcutLinks','linkCategories','customEvents','memos','dashModules','customFont','workSettings'].forEach(k=>{if(d[k])localStorage.setItem(k,d[k])});renderAll();alert('导入成功！')}catch(err){alert('导入失败')}e.target.value=''};r.readAsText(f)}

// ========== 初始化 & 事件绑定 ==========
function bindStaticEvents(){
  // 添加模块弹窗
  document.getElementById('addModuleOverlay').addEventListener('click',closeAddModule);
  document.querySelectorAll('[data-add-module]').forEach(el=>{
    el.addEventListener('click',function(){addModule(this.dataset.addModule)});
  });

  // 编辑网址弹窗
  document.getElementById('linkModalOverlay').addEventListener('click',closeLinkModal);
  document.getElementById('linkIcon').addEventListener('click',toggleEmojiPicker);
  document.getElementById('linkIconFile').addEventListener('change',onIconFileChange);
  document.getElementById('linkSaveBtn').addEventListener('click',saveLinkModal);
  document.getElementById('linkCancelBtn').addEventListener('click',closeLinkModal);

  // 事件管理弹窗
  document.getElementById('evtModalOverlay').addEventListener('click',closeEvtModal);
  document.getElementById('evtAddBtn').addEventListener('click',addEvent);
  document.getElementById('evtCloseBtn').addEventListener('click',closeEvtModal);
  document.getElementById('evtIcon').addEventListener('click',toggleEvtEmojiPicker);
  document.getElementById('evtCycle').addEventListener('change',function(){document.getElementById('evtMonth').style.display=this.value==='monthly'?'none':''});

  // 下班倒计时设置弹窗
  document.getElementById('workModalOverlay').addEventListener('click',closeWorkModal);
  document.getElementById('workImgFile').addEventListener('change',onWorkImgChange);
  document.getElementById('workSaveBtn').addEventListener('click',saveWorkSettings);
  document.getElementById('workCancelBtn').addEventListener('click',closeWorkModal);

  // 备忘录弹窗
  document.getElementById('memoModalOverlay').addEventListener('click',closeMemoModal);
  document.getElementById('memoAddBtn').addEventListener('click',addMemo);
  document.getElementById('memoCloseBtn').addEventListener('click',closeMemoModal);

  // 设置弹窗
  document.getElementById('settingsOverlay').addEventListener('click',toggleSettings);
  document.getElementById('settingsCloseBtn').addEventListener('click',toggleSettings);
  document.getElementById('settingsAddLinkBtn').addEventListener('click',function(){openLinkModal(-1);toggleSettings()});
  document.getElementById('fontSelect').addEventListener('change',saveFont);
  document.getElementById('exportBtn').addEventListener('click',exportConfig);
  document.getElementById('importFile').addEventListener('change',importConfig);

  // 右下角设置按钮
  document.getElementById('settingsFloatBtn').addEventListener('click',toggleSettings);

  // 分类弹窗
  document.getElementById('catModalOverlay').addEventListener('click',closeCatModal);
  document.getElementById('catCancelBtn').addEventListener('click',closeCatModal);
  document.getElementById('catSaveBtn').addEventListener('click',saveCatModal);
}

function renderAll(){applyFont();renderModules();renderLinks()}
bindStaticEvents();
renderAll();
