import{getStyle as t}from"@pacote/get-style";import{pixels as e}from"@pacote/pixels";import{throttle as o}from"@pacote/throttle";function n(t,e){t.classList.add(e)}function i(t,e){t.classList.remove(e)}function r(t,e){return t.classList.contains(e)}const s="littlefoot__tooltip";function c(e){const o=Number.parseFloat(t(e,"marginLeft")),n=e.offsetWidth-o;return(e.getBoundingClientRect().left+n/2)/window.innerWidth}function l(e,o,r){const[s,l]=function(e,o){const n=Number.parseInt(t(o,"marginTop"),10),i=2*n+o.offsetHeight,r=e.getBoundingClientRect().top+e.offsetHeight/2,s=window.innerHeight-r;return s>=i||s>=r?["below",s-n-15]:["above",r-n-15]}(o,e);if(r!==s){i(e,"is-"+r),n(e,"is-"+s);const t=100*c(o)+"%",l="above"===s?"100%":"0";e.style.transformOrigin=t+" "+l}return[s,l]}const a="is-active",d="is-changing",u="is-scrollable";function f({id:o,button:f,content:m,host:p,popover:v,wrapper:h}){let g=0,b="above";const y=()=>document.body.contains(v);return{id:o,activate:o=>{var i;f.setAttribute("aria-expanded","true"),n(f,d),n(f,a),f.insertAdjacentElement("afterend",v),v.style.maxWidth=document.body.clientWidth+"px",i=m,g=Math.round(e(t(i,"maxHeight"),i)),null==o||o(v,f)},dismiss:t=>{f.setAttribute("aria-expanded","false"),n(f,d),i(f,a),i(v,a),null==t||t(v,f)},isActive:()=>r(f,a),isReady:()=>!r(f,d),ready:()=>{n(v,a),i(f,d)},remove:()=>{v.remove(),i(f,d)},reposition:()=>{if(y()){const[t,e]=l(v,f,b);b=t,m.style.maxHeight=Math.min(g,e)+"px",v.offsetHeight<m.scrollHeight?(n(v,u),m.setAttribute("tabindex","0")):(i(v,u),m.removeAttribute("tabindex"))}},resize:()=>{y()&&(v.style.left=function(e,o){const n=e.offsetWidth;return-c(o)*n+Number.parseInt(t(o,"marginLeft"),10)+o.offsetWidth/2}(m,f)+"px",h.style.maxWidth=m.offsetWidth+"px",function(t,e){const o=t.querySelector("."+s);o&&(o.style.left=100*c(e)+"%")}(v,f))},destroy:()=>p.remove()}}const m="is-fully-scrolled",p=t=>e=>{const o=e.currentTarget,r=-e.deltaY;r>0&&i(t,m),o&&r<=0&&r<o.clientHeight+o.scrollTop-o.scrollHeight&&n(t,m)};const v="littlefoot__content",h="littlefoot__wrapper",g="littlefoot--print",b=(...t)=>t.forEach((t=>n(t,g)));function y(t,e){return Array.from(t.querySelectorAll(e))}function w(t,e){return t.querySelector("."+e)||t.firstElementChild||t}function x(t){const e=document.createElement("div");e.innerHTML=t;const o=e.firstElementChild;return o.remove(),o}function E(t){return void 0!==t}function A(t){const e=t.parentElement,o=y(e,":scope > :not(."+g+")"),n=o.filter((t=>"HR"===t.tagName));o.length===n.length&&(b(...n.concat(e)),A(e))}function D(t,e){const o=t.parentElement;t.remove(),o&&o!==e&&!o.innerHTML.replace(/(\[\]|&nbsp;|\s)/g,"")&&D(o,e)}function T([t,e,o],n){const i=x(o.outerHTML);y(i,'[href$="#'+t+'"]').forEach((t=>D(t,i)));const r=i.innerHTML.trim();return[e,o,{id:String(n+1),number:n+1,reference:"lf-"+t,content:r.startsWith("<")?r:"<p>"+r+"</p>"}]}function S(t){return e=>t.replace(/<%=?\s*(\w+?)\s*%>/g,((t,o)=>{var n;return String(null!==(n=e[o])&&void 0!==n?n:"")}))}function H(t,e){const n=S(t),i=S(e);return([t,e])=>{const r=e.id,s=x('<span class="littlefoot">'+n(e)+"</span>"),c=s.firstElementChild;c.setAttribute("aria-expanded","false"),c.dataset.footnoteButton="",c.dataset.footnoteId=r;const l=x(i(e));l.dataset.footnotePopover="",l.dataset.footnoteId=r;const a=w(l,h),d=w(l,v);return function(t,e){t.addEventListener("wheel",o(p(e),16))}(d,l),t.insertAdjacentElement("beforebegin",s),{id:r,button:c,host:s,popover:l,content:d,wrapper:a}}}function O({allowDuplicates:t,anchorParentSelector:e,anchorPattern:o,buttonTemplate:n,contentTemplate:r,footnoteSelector:s,numberResetSelector:c,scope:l}){const a=function(t,e,o){return y(t,o+' a[href*="#"]').filter((t=>(t.href+t.rel).match(e)))}(document,o,l).map(function(t,e,o,n){const i=[];return r=>{var s;const c=r.href.split("#")[1];if(!c)return;const l=null===(s=y(t,"#"+window.CSS.escape(c)).find((t=>e||!i.includes(t))))||void 0===s?void 0:s.closest(n);if(!l)return;i.push(l);const a=r.closest(o)||r;return[a.id||r.id,a,l]}}(document,t,e,s)).filter(E).map(T).map(c?function(t){let e=0,o=null;return([n,i,r])=>{const s=n.closest(t);return e=o===s?e+1:1,o=s,[n,i,Object.assign(Object.assign({},r),{number:e})]}}(c):t=>t).map((([t,e,o])=>(b(t,e),A(e),[t,o]))).map(H(n,r)).map(f);return{footnotes:a,unmount(){a.forEach((t=>t.destroy())),y(document,"."+g).forEach((t=>i(t,g)))}}}const L="[data-footnote-id]",_=t=>{var e;if(t){console.log("found a copy button for footnode id: ",t);const o=null===(e=document.getElementById(t))||void 0===e?void 0:e.innerText;o&&navigator.clipboard.writeText(o).then((()=>{console.log("Footnote content copied: ",o),alert("Footnote copied to clipboard!")})).catch((t=>{console.error("Failed to copy text: ",t)}))}},C=(t,e)=>t.target.closest(e),M=t=>null==t?void 0:t.dataset.footnoteId,R=t=>e=>{e.preventDefault();const o=C(e,L),n=M(o);n&&t(n)},W=document.addEventListener,k=window.addEventListener,j=(t,e,o,n)=>W(t,(t=>{const n=t.target;(null==n?void 0:n.closest(e))&&o.call(n,t)}),n);const z={activateDelay:100,activateOnHover:!1,allowDuplicates:!0,allowMultiple:!1,anchorParentSelector:"sup",anchorPattern:/(fn|footnote|note)[:\-_\d]/gi,dismissDelay:100,dismissOnUnhover:!1,dismissOnDocumentTouch:!0,footnoteSelector:"li",hoverDelay:250,numberResetSelector:"",scope:"",contentTemplate:`<aside class="littlefoot__popover" id="fncontent:<% id %>"><div class="${h}"><div class="${v}"><% content %></div></div><div class="${s}"></div></aside>`,buttonTemplate:'<button class="littlefoot__button" id="<% reference %>" title="See Footnote <% number %>"><svg role="img" aria-labelledby="title-<% reference %>" viewbox="0 0 31 6" preserveAspectRatio="xMidYMid"><title id="title-<% reference %>">Footnote <% number %></title><circle r="3" cx="3" cy="3" fill="white"></circle><circle r="3" cx="15" cy="3" fill="white"></circle><circle r="3" cx="27" cy="3" fill="white"></circle></svg></button>'};function F(t={}){const e=Object.assign(Object.assign({},z),t),n=function({footnotes:t,unmount:e},o){let n;const i=t=>e=>{e.isReady()&&(e.dismiss(o.dismissCallback),setTimeout(e.remove,t))},r=e=>n=>{o.allowMultiple||t.filter((t=>t.id!==n.id)).forEach(i(o.dismissDelay)),n.isReady()&&(n.activate(o.activateCallback),n.reposition(),n.resize(),setTimeout(n.ready,e))},s=e=>o=>{const n=t.find((t=>t.id===o));n&&e(n)},c=()=>t.forEach(i(o.dismissDelay));return{activate:(t,e)=>s(r(e))(t),dismiss:(t,e)=>s(i(e))(t),dismissAll:c,touchOutside:()=>{o.dismissOnDocumentTouch&&c()},repositionAll:()=>t.forEach((t=>t.reposition())),resizeAll:()=>t.forEach((t=>t.resize())),toggle:s((t=>t.isActive()?i(o.dismissDelay)(t):r(o.activateDelay)(t))),hover:s((t=>{n=t.id,o.activateOnHover&&!t.isActive()&&r(o.hoverDelay)(t)})),unhover:s((e=>{e.id===n&&(n=null),o.dismissOnUnhover&&setTimeout((()=>t.filter((t=>t.id!==n)).forEach(i(o.dismissDelay))),o.hoverDelay)})),unmount:e}}(O(e),e),i=function(t){const e=e=>{const o=C(e,"[data-footnote-button]"),n=M(o);n?(e.preventDefault(),t.toggle(n)):C(e,"[data-footnote-popover]")||t.touchOutside()},n=o(t.repositionAll,16),i=o(t.resizeAll,16),r=R(t.hover),s=R(t.unhover),c=new AbortController,l={signal:c.signal};return W("touchend",e,l),W("click",(e=>{if(C(e,"[data-footnote-popover]")){const e=document.querySelector(".copy-footnote");if(e){const t=e.getAttribute("footnote-id");_(t)}else t.touchOutside()}}),l),W("click",e,l),W("keyup",(e=>{27!==e.keyCode&&"Escape"!==e.key&&"Esc"!==e.key||t.dismissAll()}),l),W("gestureend",n,l),k("scroll",n,l),k("resize",i,l),j("mouseover",L,r,l),j("mouseout",L,s,l),()=>{c.abort()}}(n);return{activate(t,o=e.activateDelay){n.activate(t,o)},dismiss(t,o=e.dismissDelay){void 0===t?n.dismissAll():n.dismiss(t,o)},unmount(){i(),n.unmount()},getSetting:t=>e[t],updateSetting(t,o){e[t]=o}}}export{F as default,F as littlefoot};
