var CW_EMAIL=()=>{var f=document.getElementById('homepage-contact');return (f&&f.dataset.email)||'info@codewareltd.com'};
/* Codeware homepage behaviours (menus, dialogs, carousels, showcase scene, tabs, form). Scoped to the .cw wrapper. */
try{
(()=>{'use strict';
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.querySelector('.cw');
 const icon=id=>`<svg aria-hidden="true"><use href="#${id}"/></svg>`;
 const osMotion=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width:900px), (max-height:619px)');
 let manualReduced=false,loopsPaused=false,heroVisible=true,sceneVisible=false,heroIndex=0,reelIndex=0,videoURL=null;
 const scene=$('#showcase'),flow=$('.scene-flow'),frame=$('#media-frame'),dock=$('#dock-slot'),intro=$('#services'),video=$('#local-video');
 const defaultVideo=video.getAttribute('src');videoURL=defaultVideo;
 let geometry=null,scheduled=false;
 const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n)),smooth=t=>{t=clamp(t);return t*t*(3-2*t)},mix=(a,b,t)=>a+(b-a)*t;
 const reduced=()=>manualReduced||osMotion.matches;
 function closeMenus(restore=false){let focus=null;$$('.nav-trigger').forEach(b=>{if(b.getAttribute('aria-expanded')==='true')focus=b;b.setAttribute('aria-expanded','false');document.getElementById(b.getAttribute('aria-controls')).hidden=true});if(restore&&focus)focus.focus();}
 function closeMobile(restore=false){$('#mobile-nav').hidden=true;$('#mobile-toggle').setAttribute('aria-expanded','false');$('#mobile-toggle').setAttribute('aria-label','Open navigation');$('#mobile-toggle').innerHTML=icon('menu');if(restore)$('#mobile-toggle').focus();}
 $$('.nav-trigger').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';closeMenus();b.setAttribute('aria-expanded',String(open));document.getElementById(b.getAttribute('aria-controls')).hidden=!open;}));
 // Hover opens desktop menus; touch and keyboard retain the existing click controls.
 const finePointer=matchMedia('(hover:hover) and (pointer:fine)');let hoverCloseTimer;
 $$('.nav-item').forEach(item=>{
  item.addEventListener('pointerenter',e=>{if(!finePointer.matches||e.pointerType==='touch')return;clearTimeout(hoverCloseTimer);closeMenus();const b=item.querySelector('.nav-trigger');b.setAttribute('aria-expanded','true');document.getElementById(b.getAttribute('aria-controls')).hidden=false;});
  item.addEventListener('pointerleave',()=>{if(!finePointer.matches)return;clearTimeout(hoverCloseTimer);hoverCloseTimer=setTimeout(()=>{if(!item.contains(document.activeElement))closeMenus();},180);});
 });
 document.addEventListener('click',e=>{if(!e.target.closest('.nav-item'))closeMenus();});
 $('.site-header').addEventListener('focusout',()=>queueMicrotask(()=>{if(!$('.site-header').contains(document.activeElement))closeMenus();}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenus(true);if(!$('#mobile-nav').hidden)closeMobile(true);}});
 $('#mobile-toggle').addEventListener('click',()=>{const open=$('#mobile-nav').hidden;$('#mobile-nav').hidden=!open;$('#mobile-toggle').setAttribute('aria-expanded',String(open));$('#mobile-toggle').setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#mobile-toggle').innerHTML=icon(open?'close':'menu');});
 const contact=$('#contact-dialog'),productDialog=$('#product-dialog');let dialogOpener=null;
 function openDialog(d,opener){dialogOpener=opener;closeMenus();closeMobile();d.showModal();}
 $$('.contact-trigger').forEach(b=>b.addEventListener('click',()=>{closeMenus();closeMobile();window.codewareEnquiry(b.dataset.contact==='call'?'Call request':'Build something new');}));
 $$('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close();});d.addEventListener('close',()=>{if(dialogOpener){if(dialogOpener.offsetParent!==null)dialogOpener.focus();else if(mobile.matches)$('#mobile-toggle').focus();else $$('.nav-trigger')[1].focus();}});});
 const productData={
 'CW ERP':['Business operations','Manage finance, inventory, HR, and operational workflows in one configurable system.'],
 'iDesk360':['Customer communication','Organize customer conversations, query assignment, tagging, and agent reporting through a central dashboard.'],
 'CW Ticketing':['Transport and reservations','Manage seat availability, bookings, and ticketing workflows for transport operations.'],
 'E-commerce Solution':['Online commerce','Build an online selling experience with product browsing, checkout, order handling, and payment options.']};
 $$('.product-trigger').forEach(b=>b.addEventListener('click',()=>{closeMenus();closeMobile();window.codewareProduct(b.dataset.product,true);}));
 // Content remains in document flow. Extra distance belongs to the full-size hold.
 // Scene-local scroll sequence: relocating the reel must not depend on hero height.
 const FULL_SIZE_HOLD=4*80;
 function measure(){
  cancelWheelMotion();
  const desktop=!mobile.matches&&!reduced();root.classList.toggle('motion-ready',desktop);root.classList.toggle('reduced-motion',reduced());
  intro.style.removeProperty('--dock-open');frame.style.transformOrigin=desktop?'0 0':'50% 0';
  if(desktop){
   const base=flow.getBoundingClientRect(),w=base.width,viewH=innerHeight;
   const h=Math.max(320,Math.min(720,viewH-112)),yFull=viewH-h-24,top=base.top+scrollY;
   const growthStart=top-viewH+h*.45,growthEnd=top-yFull+180,flightStart=growthEnd+FULL_SIZE_HOLD;
   const space=flightStart-top+viewH+24;
   scene.style.setProperty('--showcase-space',space+'px');
   frame.style.width=w+'px';frame.style.height=h+'px';
   const target=dock.getBoundingClientRect(),endW=parseFloat(getComputedStyle($('#services-title')).fontSize)*1.65,endH=endW*h/w;
   const endCX=target.left-base.left+endW/2,endCY=target.top+scrollY-top+target.height/2;
   const startCY=flightStart-top+yFull+h/2;
   const flightDistance=Math.max(viewH*.7,(endCY-startCY)*1.5);
   geometry={desktop:true,top,left:base.left,w,h,viewH,yFull,startScale:.82,startCX:w/2,startCY,endCX,endCY,endW,endH,scaleEnd:endW/w,growthStart,growthEnd,flightStart,flightEnd:flightStart+flightDistance};
  }else{
   scene.style.removeProperty('--showcase-space');['position','left','width','height','border-radius','transform','box-shadow'].forEach(p=>frame.style.removeProperty(p));geometry={desktop:false};
  }
  $('#motion-status').textContent=reduced()?'Reduced motion: native scrolling, static service layout and manual product/process tabs.':mobile.matches?'Mobile: in-flow reel and readable service pairs with native touch scrolling.':'Desktop: section-local reel expansion, four-step hold, direct title arrival and six sticky service stories.';
  update();syncVideo();
 }
 function update(){
  scheduled=false;if(!geometry)return;
  if(geometry.desktop){
   const g=geometry,travel=clamp((scrollY-g.flightStart)/(g.flightEnd-g.flightStart)),arrival=smooth(travel);
   const holding=scrollY>=g.growthEnd&&scrollY<g.flightStart;let scale,cx,cy;
   if(scrollY<g.growthEnd){
    const growth=clamp((scrollY-g.growthStart)/(g.growthEnd-g.growthStart));
    scale=mix(g.startScale,1,1-Math.pow(1-growth,3));cx=g.startCX;
    const screenTop=Math.max(g.top-scrollY,g.viewH-g.h*scale-24);
    cy=scrollY-g.top+screenTop+g.h*scale/2;
   }else if(holding){scale=1;cx=g.startCX;cy=g.yFull+g.h/2;}
   else{scale=mix(1,g.scaleEnd,arrival);cx=mix(g.startCX,g.endCX,arrival);cy=mix(g.startCY,g.endCY,arrival);}
   frame.style.position=holding?'fixed':'absolute';frame.style.left=holding?g.left+'px':'0px';
   frame.style.transform=`translate3d(${cx-g.w*scale/2}px,${cy-g.h*scale/2}px,0) scale(${scale})`;
   frame.style.borderRadius=(mix(24,6,arrival)/scale)+'px';
   const distance=Math.hypot(g.endCX-cx,g.endCY-cy),open=travel>.55?smooth(1-distance/Math.max(180,g.endH*3.6)):0;
   intro.style.setProperty('--dock-open',(g.endW+12)*open+'px');
   frame.style.boxShadow=`0 ${mix(18,2,arrival)}px ${mix(55,8,arrival)}px #08263b18`;
  }else frame.style.transform='';
 }
 // Smooth desktop wheel input without changing touch, zoom, keyboard or nested scrollers.
 let wheelFrame=0,wheelTarget=0,wheelTime=0;
 function cancelWheelMotion(){if(wheelFrame)cancelAnimationFrame(wheelFrame);wheelFrame=0;wheelTime=0;wheelTarget=scrollY;}
 function animateWheel(time){
  const dt=wheelTime?Math.min(48,time-wheelTime):16.67;wheelTime=time;
  wheelTarget=clamp(wheelTarget,0,Math.max(0,document.documentElement.scrollHeight-innerHeight));
  const difference=wheelTarget-scrollY,step=difference*(1-Math.exp(-dt/105));
  const next=scrollY+Math.sign(difference)*Math.min(Math.abs(difference),Math.max(1,Math.abs(step)));
  window.scrollTo({top:Math.abs(difference)<1.5?wheelTarget:next,behavior:'instant'});
  update();
  if(Math.abs(wheelTarget-scrollY)>1.5)wheelFrame=requestAnimationFrame(animateWheel);else{window.scrollTo({top:wheelTarget,behavior:'instant'});update();wheelFrame=0;wheelTime=0;}
 }
 function ownsWheel(target,delta){
  if(target.closest('input,textarea,select,[contenteditable="true"],dialog'))return true;
  for(let el=target;el&&el!==document.body;el=el.parentElement){
   if(el.scrollHeight>el.clientHeight+1&&/(auto|scroll)/.test(getComputedStyle(el).overflowY)){
    if((delta<0&&el.scrollTop>0)||(delta>0&&el.scrollTop+el.clientHeight<el.scrollHeight-1))return true;
   }
  }
  return false;
 }
 window.addEventListener('wheel',e=>{
  if(e.defaultPrevented||!finePointer.matches||mobile.matches||reduced()||e.ctrlKey||e.metaKey||e.altKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)||!e.deltaY||document.querySelector('dialog[open]'))return;
  if(!(e.target instanceof Element)||ownsWheel(e.target,e.deltaY))return;
  const delta=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1);
  if(!wheelFrame)wheelTarget=scrollY;
  wheelTarget=clamp(wheelTarget+delta,0,Math.max(0,document.documentElement.scrollHeight-innerHeight));
  e.preventDefault();if(!wheelFrame)wheelFrame=requestAnimationFrame(animateWheel);
 },{passive:false});
 ['pointerdown','touchstart','keydown'].forEach(type=>window.addEventListener(type,cancelWheelMotion,{passive:true}));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelWheelMotion();});
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update)}}
 window.addEventListener('scroll',schedule,{passive:true});let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(measure,120)},{passive:true});
 osMotion.addEventListener('change',measure);mobile.addEventListener('change',()=>{closeMenus();closeMobile();measure();});
 $('#motion-mode').addEventListener('click',()=>{manualReduced=!manualReduced;$('#motion-mode').setAttribute('aria-pressed',String(manualReduced));$('#motion-mode').textContent=manualReduced?'Use full motion':'Use reduced motion';measure();});
 function cycleReel(){reelIndex=(reelIndex+1)%3;$$('.reel-slide').forEach((el,i)=>el.classList.toggle('active',i===reelIndex));$$('.reel-dots i').forEach((el,i)=>el.classList.toggle('active',i===reelIndex));}
 setInterval(()=>{if(!reduced()&&!loopsPaused&&!document.hidden&&sceneVisible&&!videoURL)cycleReel();},4600);
 function syncVideo(){if(!videoURL)return;const play=!loopsPaused&&!document.hidden&&sceneVisible;if(play){const promise=video.play();if(promise)promise.catch(()=>{$('#video-status').textContent='Video playback is unavailable in this browser; the poster remains visible.';});}else video.pause();}
 const visibleObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.target.classList.contains('hero'))heroVisible=e.isIntersecting;else{sceneVisible=e.isIntersecting;scene.classList.toggle('is-near',e.isIntersecting);syncVideo();}}),{threshold:0});visibleObserver.observe($('.hero'));visibleObserver.observe(scene);
 document.addEventListener('visibilitychange',syncVideo);
 $('#loop-toggle').addEventListener('click',()=>{loopsPaused=!loopsPaused;$('#loop-toggle').setAttribute('aria-pressed',String(loopsPaused));$('#loop-toggle').innerHTML=icon(loopsPaused?'play':'pause')+'<span>'+(loopsPaused?'Resume loops':'Pause loops')+'</span>';root.classList.toggle('auto-paused',loopsPaused);syncVideo();});
 
 $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(!target)return;e.preventDefault();closeMenus();closeMobile();let y=target.getBoundingClientRect().top+scrollY-104;if(target.classList.contains('service-story'))y=target.getBoundingClientRect().top+scrollY-104;window.scrollTo({top:Math.max(0,y),behavior:reduced()?'instant':'smooth'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}));
 function resetVideo(){video.pause();if(videoURL&&videoURL.startsWith('blob:'))URL.revokeObjectURL(videoURL);videoURL=defaultVideo;video.src=defaultVideo;video.load();video.hidden=false;$('#reel').hidden=true;$('#reset-video').hidden=true;$('#video-upload').value='';$('#video-status').textContent='Supplied showcase video restored. Playback stays muted.';syncVideo();}
 $('#video-upload').addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;if(!file.type.startsWith('video/')){$('#video-status').textContent='Choose a video file.';return;}if(videoURL&&videoURL.startsWith('blob:'))URL.revokeObjectURL(videoURL);videoURL=URL.createObjectURL(file);video.src=videoURL;video.hidden=false;$('#reel').hidden=true;$('#reset-video').hidden=false;$('#video-status').textContent='Local video loaded: '+file.name+'. Scroll up to preview it; audio stays muted.';syncVideo();});$('#reset-video').addEventListener('click',resetVideo);video.addEventListener('error',()=>{$('#video-status').textContent='This video could not be decoded. Try an H.264 MP4 or restore the supplied video.';});
 measure();window.addEventListener('load',measure,{once:true});if(document.fonts)document.fonts.ready.then(measure);
})();
}catch(e){console.warn('[cw-runtime]',e)}
try{
(()=>{'use strict';
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.querySelector('.cw').classList.contains('reduced-motion');
 function jump(id,focus){const node=document.getElementById(id);window.scrollTo({top:Math.max(0,node.getBoundingClientRect().top+scrollY-104),behavior:reduced()?'instant':'smooth'});if(focus){focus.focus({preventScroll:true});}}
 // Accessible product and process tabs, with keyboard navigation.
 function tabs(buttons,panels,onChange){let current=0;function select(index,focus=false){current=(index+buttons.length)%buttons.length;buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===current));b.tabIndex=i===current?0:-1;panels[i].hidden=i!==current;panels[i].dataset.active=String(i===current);});if(focus)buttons[current].focus();if(onChange)onChange(current);}
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{let next;if(['ArrowRight','ArrowDown'].includes(e.key))next=i+1;else if(['ArrowLeft','ArrowUp'].includes(e.key))next=i-1;else if(e.key==='Home')next=0;else if(e.key==='End')next=buttons.length-1;else return;e.preventDefault();select(next,true);});});select(0);return {select,get current(){return current}};}
 let productElapsed=0;
 const productButtons=$$('.product-tab'),productPanels=$$('.product-pane');const productTabs=tabs(productButtons,productPanels,()=>{productElapsed=0;productButtons.forEach(b=>b.style.setProperty('--product-progress','0'));});
 window.codewareProduct=(name,scroll=false)=>{const i=productButtons.findIndex(b=>b.dataset.productName===name);if(i<0)return;productTabs.select(i);if(scroll)jump('products',productButtons[i]);};
 let processElapsed=0;
 const processButtons=$$('.process-nav [role=tab]'),processPhotos=$$('.process-image');
 const processTabs=tabs(processButtons,processPhotos,i=>{processElapsed=0;processButtons.forEach(b=>b.style.setProperty('--step-progress','0'));processPhotos.forEach((photo,n)=>{photo.classList.toggle('is-active',n===i);photo.tabIndex=n===i?0:-1;photo.inert=n!==i;photo.setAttribute('aria-hidden',String(n!==i));const credit=photo.querySelector('a');if(credit)credit.tabIndex=n===i?0:-1;});});
 $$('.filter-chip').forEach(b=>b.addEventListener('click',()=>{const category=b.dataset.workFilter;$$('.filter-chip').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('.work-grid').classList.toggle('is-filtered',category!=='all');let shown=0;$$('.work-card').forEach(card=>{const show=category==='all'||card.dataset.workCategory===category;card.hidden=!show;if(show)shown++;});$('#work-status').textContent=shown+' project'+(shown===1?'':'s')+' shown';}));
 // Contact form: no network submission or persistent storage.
 const form=$('#homepage-contact'),type=$('#contact-type'),product=$('#contact-product'),phoneCheck=$('#contact-phone-check'),phone=$('#contact-phone'),time=$('#call-time'),result=$('#draft-result');
 function updateFields(){const isProduct=type.value==='Explore a product',isCall=type.value==='Call request';$('#contact-product-field').hidden=!isProduct;product.disabled=!isProduct;$('#call-time-field').hidden=!isCall;time.disabled=!isCall;$('#contact-phone-field').hidden=!phoneCheck.checked;phone.disabled=!phoneCheck.checked;phone.required=phoneCheck.checked;}
 type.addEventListener('change',updateFields);phoneCheck.addEventListener('change',updateFields);updateFields();
 window.codewareEnquiry=(reason='General enquiry',productName='')=>{type.value=reason;updateFields();if(productName)product.value=productName;result.hidden=true;jump('contact',$('#contact-name'));};
 $$('.enquiry-shortcut').forEach(b=>b.addEventListener('click',()=>window.codewareEnquiry(b.dataset.enquiry,b.dataset.product||'')));
 // Enquiry service picker.
 const picker=$('#contact-service-picker'),trigger=$('#contact-services-trigger'),options=$('#contact-service-options'),checks=[...options.querySelectorAll('input')],chipHost=$('#contact-service-chips');
 function closePicker(focus=false){options.hidden=true;trigger.setAttribute('aria-expanded','false');if(focus)trigger.focus();}
 function renderServices(){const chosen=checks.filter(x=>x.checked);chipHost.replaceChildren();$('#contact-services-summary').textContent=chosen.length?chosen.length+' service'+(chosen.length===1?'':'s')+' selected':'Select services';$('#contact-services-status').textContent=chosen.length?chosen.map(x=>x.value).join(', '):'No services selected';chosen.forEach(input=>{const chip=document.createElement('span');chip.className='contact-chip';const label=document.createElement('span');label.textContent=input.value;const b=document.createElement('button');b.type='button';b.textContent='×';b.setAttribute('aria-label','Remove '+input.value);b.addEventListener('click',()=>{input.checked=false;renderServices();result.hidden=true;trigger.focus();});chip.append(label,b);chipHost.append(chip);});}
 trigger.addEventListener('click',()=>{const open=options.hidden;options.hidden=!open;trigger.setAttribute('aria-expanded',String(open));});trigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();options.hidden=false;trigger.setAttribute('aria-expanded','true');checks[0].focus();}});
 picker.addEventListener('keydown',e=>{if(e.key==='Escape'&&!options.hidden){e.preventDefault();closePicker(true);}});picker.addEventListener('focusout',()=>setTimeout(()=>{if(!picker.contains(document.activeElement))closePicker()},0));document.addEventListener('click',e=>{if(!picker.contains(e.target))closePicker()});checks.forEach(x=>x.addEventListener('change',renderServices));renderServices();
 function validate(field){let valid=field.disabled||!!field.value.trim();if(field.type==='email')valid=valid&&field.validity.valid;field.setAttribute('aria-invalid',String(!valid));const error=$('#'+field.id+'-error');if(error)error.hidden=valid;return valid;}
 const requiredFields=()=>[$('#contact-name'),$('#contact-email'),$('#contact-message'),...(phoneCheck.checked?[phone]:[])];
 form.addEventListener('submit',e=>{e.preventDefault();const errors=requiredFields().filter(x=>!validate(x));if(errors.length){result.hidden=true;errors[0].focus();return;}
 const selected=checks.filter(x=>x.checked).map(x=>x.value);const lines=['Name: '+$('#contact-name').value.trim(),'Email: '+$('#contact-email').value.trim(),'Company: '+($('#contact-company').value.trim()||'Not provided'),'Enquiry: '+type.value];if(!product.disabled)lines.push('Product: '+(product.value||'Help me choose'));if(selected.length)lines.push('Services: '+selected.join(', '));if(!time.disabled&&time.value.trim())lines.push('Preferred time: '+time.value.trim());if(phoneCheck.checked)lines.push('Preferred response: Phone','Phone: '+phone.value.trim());lines.push('','Project / question:',$('#contact-message').value.trim());const body=lines.join('\n');$('#draft-text').value=body;$('#draft-email').href='mailto:'+CW_EMAIL()+'?subject='+encodeURIComponent('Codeware enquiry — '+type.value+(product.disabled?'':' — '+(product.value||'Product advice')))+'&body='+encodeURIComponent(body);$('#draft-status').textContent='Review your enquiry below, then open it in your email app. It has not been sent.';result.hidden=false;result.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'nearest'});$('#draft-email').focus({preventScroll:true});});
 form.addEventListener('input',e=>{if(e.target.matches('input,textarea,select')&&e.target!==$('#draft-text')){result.hidden=true;if(e.target.getAttribute('aria-invalid')==='true')validate(e.target);}});form.addEventListener('change',()=>result.hidden=true);
 $('#copy-draft').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#draft-text').value);$('#draft-status').textContent='Enquiry copied. Paste it into an email to '+CW_EMAIL()+'. Nothing has been sent.';}catch{$('#draft-text').focus();$('#draft-text').select();$('#draft-status').textContent='Select and copy the draft, then paste it into your email app. Nothing has been sent.';}});
 // Continuous motion: one shared scheduler; no work while offscreen or paused.
 const root=document.querySelector('.cw'), motionToggle=$('#page-motion-toggle');
 const stopped=()=>reduced()||root.classList.contains('auto-paused')||document.hidden;
 let motionFrame=0,lastFrame=0;
 function wake(){if(!motionFrame){lastFrame=performance.now();motionFrame=requestAnimationFrame(animate);}}
 function watchRegion(node){const state={node,visible:!('IntersectionObserver' in window),hover:false,touch:false};
  node.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')state.hover=true;});node.addEventListener('pointerleave',()=>{state.hover=false;wake();});
  node.addEventListener('pointerdown',()=>state.touch=true);window.addEventListener('pointerup',()=>{if(state.touch){state.touch=false;wake();}},{passive:true});window.addEventListener('pointercancel',()=>{state.touch=false;wake();},{passive:true});
  node.addEventListener('focusin',()=>wake());node.addEventListener('focusout',()=>setTimeout(wake,0));
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{state.visible=entries[0].isIntersecting;wake();},{threshold:.01});observer.observe(node);}
  return state;
 }
 function canRun(state,ignoreHover=false){return state.visible&&(ignoreHover||!state.hover)&&!state.touch&&!state.node.contains(document.activeElement);}
 const rows=$$('[data-marquee]').map((node,rowIndex)=>{
  const originals=[...node.children];
  const clones=originals.map(item=>{const clone=item.cloneNode(true);clone.classList.add('marquee-clone');clone.setAttribute('aria-hidden','true');
   // SVG definitions are local to each card. Re-key every cloned ID and reference.
   const idMap=new Map();[clone,...clone.querySelectorAll('[id]')].forEach(el=>{if(el.id){idMap.set(el.id,el.id+'-loop-'+rowIndex);el.id=el.id+'-loop-'+rowIndex;}});
   [clone,...clone.querySelectorAll('*')].forEach(el=>{[...el.attributes].forEach(attr=>{let value=attr.value;idMap.forEach((next,previous)=>{value=value.split('url(#'+previous+')').join('url(#'+next+')');if((attr.name==='href'||attr.name==='xlink:href')&&value==='#'+previous)value='#'+next;if(['aria-labelledby','aria-describedby','aria-controls'].includes(attr.name))value=value.split(' ').map(v=>v===previous?next:v).join(' ');});if(value!==attr.value)el.setAttribute(attr.name,value);});});
   [clone,...clone.querySelectorAll('a,button,input,[tabindex]')].forEach(el=>{if(el.matches('a,button,input,[tabindex]'))el.tabIndex=-1;});node.append(clone);return clone;});
  const transformMode=node.classList.contains('logo-marquee');let track=null;if(transformMode){track=document.createElement('div');track.className='logo-track';[...originals,...clones].forEach(item=>track.append(item));node.append(track);}
  const state={node,track,transformMode,period:0,position:0,speed:Number(node.dataset.speed)||24,direction:node.dataset.marquee==='right'?-1:1,initialized:false,lastWritten:node.scrollLeft};
  function applyPosition(){if(transformMode)track.style.transform=`translate3d(${-state.position}px,0,0)`;else{node.scrollLeft=state.position;state.lastWritten=node.scrollLeft;}}
  state.applyPosition=applyPosition;
  function measureRow(){const period=clones[0].offsetLeft-originals[0].offsetLeft;if(period>0){const phase=state.period?state.position/state.period:0;state.period=period;state.position=state.initialized?phase*period:(state.direction<0?period:0);state.initialized=true;applyPosition();}wake();}
  // Share observer/pointer state rather than copying mutable flags.
  const region=watchRegion(node);state.region=region;
  node.addEventListener('scroll',()=>{if(!transformMode&&Math.abs(node.scrollLeft-state.lastWritten)>1.5)state.position=node.scrollLeft;},{passive:true});
  node.addEventListener('keydown',e=>{if(e.target===node&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();const distance=(e.key==='ArrowRight'?1:-1)*Math.min(320,node.clientWidth*.8);if(transformMode&&!reduced()){state.position=(state.position+distance+state.period)%state.period;applyPosition();}else node.scrollBy({left:distance,behavior:reduced()?'instant':'smooth'});}});
  if('ResizeObserver' in window)new ResizeObserver(measureRow).observe(node);else window.addEventListener('resize',measureRow,{passive:true});state.measure=measureRow;measureRow();return state;
 });
 const processRegion=watchRegion($('#process')),productRegion=watchRegion($('#products'));
 function animate(now){motionFrame=0;const dt=Math.min(64,Math.max(0,now-lastFrame));lastFrame=now;let running=false;
  if(!stopped()){
   rows.forEach(state=>{if(!canRun(state.region)||!state.period)return;running=true;state.position+=state.direction*state.speed*dt/1000;if(state.position>=state.period)state.position-=state.period;if(state.position<0)state.position+=state.period;state.applyPosition();});
   if(canRun(processRegion,true)){running=true;processElapsed+=dt;if(processElapsed>=5000){const carry=processElapsed-5000;processTabs.select(processTabs.current+1);processElapsed=carry;}processButtons[processTabs.current].style.setProperty('--step-progress',String(processElapsed/5000));}
   if(canRun(productRegion,true)){running=true;productElapsed+=dt;if(productElapsed>=4000){const carry=productElapsed-4000;productTabs.select(productTabs.current+1);productElapsed=carry;}productButtons[productTabs.current].style.setProperty('--product-progress',String(productElapsed/4000));}
  }
  if(running)motionFrame=requestAnimationFrame(animate);
 }
 function syncMotion(){rows.forEach(row=>{if(row.transformMode&&reduced()){row.track.style.transform='none';row.node.scrollLeft=0;}else row.measure();});const paused=root.classList.contains('auto-paused');motionToggle.setAttribute('aria-pressed',String(paused));motionToggle.textContent=paused?'Resume animations':'Pause animations';wake();}
 motionToggle.addEventListener('click',()=>$('#loop-toggle').click());new MutationObserver(syncMotion).observe(root,{attributes:true,attributeFilter:['class']});matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',syncMotion);document.addEventListener('visibilitychange',wake);syncMotion();

 // One open answer, including browsers without native details grouping.
 const faqs=$$('.faq-list details');
 faqs.forEach(item=>item.addEventListener('toggle',()=>{if(item.open)faqs.forEach(other=>{if(other!==item)other.open=false;});}));
 // A decorative cursor inside a real link: keyboard and touch keep the text CTA.
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 $$('.work-card').forEach(card=>{
  const cursor=card.querySelector('.project-cursor');let frame=0,rect=null,active=false,x=0,y=0,targetX=0,targetY=0,last=0;
  const enabled=()=>finePointer.matches&&!reduced();
  function draw(now){frame=0;const blend=1-Math.exp(-Math.min(64,Math.max(0,now-last))/65);last=now;x+=(targetX-x)*blend;y+=(targetY-y)*blend;cursor.style.transform=`translate3d(${x.toFixed(3)}px,${y.toFixed(3)}px,0)`;if(active&&(Math.abs(targetX-x)>.1||Math.abs(targetY-y)>.1))frame=requestAnimationFrame(draw);}
  function move(e){if(e.pointerType!=='mouse'||!enabled())return;if(!rect)rect=card.getBoundingClientRect();targetX=e.clientX-rect.left;targetY=e.clientY-rect.top;
   if(!active){active=true;x=targetX;y=targetY;cursor.style.transform=`translate3d(${x}px,${y}px,0)`;card.classList.add('cursor-active');}
   if(!frame){last=performance.now();frame=requestAnimationFrame(draw);}
  }
  function hide(){active=false;rect=null;card.classList.remove('cursor-active');if(frame){cancelAnimationFrame(frame);frame=0;}}
  function sync(){hide();card.classList.toggle('cursor-ready',enabled());}
  card.addEventListener('pointerenter',move);card.addEventListener('pointermove',move);card.addEventListener('pointerleave',hide);card.addEventListener('pointercancel',hide);card.addEventListener('focusin',hide);
  window.addEventListener('scroll',hide,{passive:true});window.addEventListener('resize',hide,{passive:true});finePointer.addEventListener('change',sync);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',sync);new MutationObserver(sync).observe(document.querySelector('.cw'),{attributes:true,attributeFilter:['class']});sync();
 });

})();

(()=>{const product=new URLSearchParams(location.search).get('product');if(product)window.codewareProduct(product,false);})();
}catch(e){console.warn('[cw-runtime]',e)}
try{
(()=>{'use strict';
 const layout=document.getElementById('service-layout');
 if(!layout)return;
 const clip=document.getElementById('service-text-window');
 const stories=[...layout.querySelectorAll('.service-story')];
 const summaries=stories.map(row=>row.querySelector('.service-summary'));
 const pairs=stories.map(row=>row.querySelector('.service-pair'));
 const desktop=matchMedia('(min-width: 901px) and (min-height: 620px)');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=false,frame=0;

 // Measured document scrolling drives a reversible slide inside one clip.
 // The bottom of each image pair meeting its CTA starts the text handoff.
 function servicePose(bottoms,clipTop,heights,rest,travel,duration){
  const clamp=v=>Math.max(0,Math.min(1,v));
  let index=0;
  while(index<bottoms.length-1&&bottoms[index]<=clipTop+rest+heights[index]-duration)index++;
  const raw=index===bottoms.length-1?0:clamp((clipTop+rest+heights[index]-bottoms[index])/duration);
  const eased=raw*raw*(3-2*raw);
  const positions=bottoms.map((_,i)=>i<index?rest-travel:rest+travel);
  positions[index]=rest-travel*eased;
  if(index+1<positions.length)positions[index+1]=rest+travel*(1-eased);
  return {positions,index,raw};
 }
 function draw(){
  frame=0;if(!enabled)return;
  const box=clip.getBoundingClientRect();
  const heights=summaries.map(node=>node.offsetHeight);
  const rest=Math.max(12,Math.min(40,(clip.clientHeight-Math.max(...heights))/2));
  const travel=clip.clientHeight+40;
  const pose=servicePose(pairs.map(node=>node.getBoundingClientRect().bottom),box.top,heights,rest,travel,260*8/6);
  const current=pose.raw<.5?pose.index:Math.min(pose.index+1,summaries.length-1);
  summaries.forEach((node,i)=>{
   const y=pose.positions[i],visible=y<clip.clientHeight&&y+heights[i]>0;
   node.style.transform=`translate3d(0,${y.toFixed(3)}px,0)`;
   node.setAttribute('aria-hidden',String(!visible));
   node.inert=i!==current;
  });
 }
 function schedule(){if(enabled&&!frame)frame=requestAnimationFrame(draw);}
 function sync(){
  const next=desktop.matches&&!preference.matches&&!document.querySelector('.cw').classList.contains('reduced-motion');
  if(next!==enabled){
   enabled=next;
   if(enabled){summaries.forEach(node=>clip.append(node));layout.classList.add('service-motion');}
   else{layout.classList.remove('service-motion');summaries.forEach((node,i)=>{stories[i].insertBefore(node,pairs[i]);node.style.removeProperty('transform');node.removeAttribute('aria-hidden');node.inert=false;});}
  }
  if(enabled){
   // Keep all copy readable at larger browser font sizes; 330px is the default.
   clip.style.height=Math.max(330,...summaries.map(node=>node.offsetHeight+32))+'px';
   schedule();
  }
 }
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',sync,{passive:true});
 desktop.addEventListener('change',sync);preference.addEventListener('change',sync);
 new MutationObserver(sync).observe(document.querySelector('.cw'),{attributes:true,attributeFilter:['class']});
 if('ResizeObserver' in window){const observer=new ResizeObserver(sync);summaries.forEach(node=>observer.observe(node));pairs.forEach(node=>observer.observe(node));}
 if(document.fonts)document.fonts.ready.then(sync);
 window.addEventListener('load',sync,{once:true});
 sync();
})();
}catch(e){console.warn('[cw-runtime]',e)}
try{
(()=>{'use strict';
 const viewport=document.querySelector('[data-hero-carousel]');if(!viewport)return;
 const track=viewport.querySelector('.hero-project-track'),cursor=document.querySelector('.hero-project-cursor'),root=document.querySelector('.cw');
 const originals=[...track.children],reduced=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
 const clones=originals.map(card=>{const clone=card.cloneNode(true);clone.classList.add('marquee-clone');clone.setAttribute('aria-hidden','true');clone.tabIndex=-1;track.append(clone);return clone;});
 const SPEED=42; // 40% faster, with fractional transforms rather than scrollLeft writes.
 let position=0,period=0,raf=0,last=0,visible=!('IntersectionObserver' in window),touch=false;
 let pointerInside=false,px=0,py=0,cx=0,cy=0,cursorActive=false;
 const isReduced=()=>reduced.matches||root.classList.contains('reduced-motion');
 const paused=()=>document.hidden||isReduced()||root.classList.contains('auto-paused')||touch||viewport.contains(document.activeElement);
 const wrap=(n,p)=>(n%p+p)%p;
 function apply(){track.style.transform=isReduced()?'none':`translate3d(${-position.toFixed(3)}px,0,0)`;}
 function hide(){cursorActive=false;cursor.classList.remove('is-active');}
 function wake(){if(!raf){last=0;raf=requestAnimationFrame(tick);}}
 function measure(){const next=clones[0].offsetLeft-originals[0].offsetLeft;if(next>0){position=period?position/period*next:0;period=next;}apply();wake();}
 function cursorTick(dt){
  if(!pointerInside||!fine.matches||isReduced()||document.hidden){hide();return false;}
  const target=document.elementFromPoint(px,py),card=target?.closest('.hero-project-card');
  if(!card||!viewport.contains(card)){hide();return false;}
  if(!cursorActive){cx=px;cy=py;cursorActive=true;cursor.classList.add('is-active');}
  const blend=1-Math.exp(-dt/60);cx+=(px-cx)*blend;cy+=(py-cy)*blend;
  cursor.style.transform=`translate3d(${cx.toFixed(3)}px,${cy.toFixed(3)}px,0)`;
  return Math.abs(cx-px)>.1||Math.abs(cy-py)>.1;
 }
 function tick(now){raf=0;const dt=last?Math.min(64,Math.max(0,now-last)):16.67;last=now;
  const moving=visible&&period>0&&!paused();
  if(moving){position=wrap(position+SPEED*dt/1000,period);apply();}
  const settling=cursorTick(dt);
  if(moving||settling)raf=requestAnimationFrame(tick);
 }
 viewport.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;pointerInside=true;px=e.clientX;py=e.clientY;wake();});
 viewport.addEventListener('pointerenter',e=>{if(e.pointerType!=='mouse')return;pointerInside=true;px=e.clientX;py=e.clientY;wake();});
 viewport.addEventListener('pointerleave',()=>{pointerInside=false;hide();});
 viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')touch=true;});
 ['pointerup','pointercancel'].forEach(type=>window.addEventListener(type,()=>{touch=false;wake();},{passive:true}));
 viewport.addEventListener('focusin',e=>{hide();const card=e.target.closest('.hero-project-card');if(card&&!isReduced()){position=wrap(card.offsetLeft-originals[0].offsetLeft,period||1);viewport.scrollLeft=0;apply();}wake();});
 viewport.addEventListener('focusout',()=>setTimeout(wake,0));
 viewport.addEventListener('keydown',e=>{if(e.target!==viewport||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const delta=(e.key==='ArrowRight'?1:-1)*Math.min(360,viewport.clientWidth*.75);if(isReduced())viewport.scrollBy({left:delta,behavior:'instant'});else if(period){position=wrap(position+delta,period);apply();}});
 // Native horizontal browsing when motion is disabled; automatic mode keeps its own fractional position.
 function sync(){hide();if(isReduced())viewport.scrollLeft=0;measure();}
 new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['class']});reduced.addEventListener('change',sync);fine.addEventListener('change',sync);
 document.addEventListener('visibilitychange',()=>{hide();wake();});window.addEventListener('scroll',()=>{hide();wake();},{passive:true});
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)hide();wake();},{threshold:0}).observe(viewport);
 if('ResizeObserver' in window)new ResizeObserver(measure).observe(viewport);else window.addEventListener('resize',measure,{passive:true});
 if(document.fonts)document.fonts.ready.then(measure);window.addEventListener('load',measure,{once:true});measure();
})();
}catch(e){console.warn('[cw-runtime]',e)}
try{
(()=>{const button=document.getElementById('explore-products'),catalog=document.getElementById('product-catalog');button.addEventListener('click',()=>{const open=catalog.hidden;catalog.hidden=!open;button.setAttribute('aria-expanded',String(open));});})();
}catch(e){console.warn('[cw-runtime]',e)}