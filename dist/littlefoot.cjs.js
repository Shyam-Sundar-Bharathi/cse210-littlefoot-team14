"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@pacote/get-style"),e=require("@pacote/pixels"),n=require("@pacote/throttle"),o=function(){return o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},o.apply(this,arguments)};function r(t,e){t.classList.add(e)}function i(t,e){t.classList.remove(e)}function u(t,e){return t.classList.contains(e)}"function"==typeof SuppressedError&&SuppressedError;var c="littlefoot__tooltip";function a(e){var n=Number.parseFloat(t.getStyle(e,"marginLeft")),o=e.offsetWidth-n;return(e.getBoundingClientRect().left+o/2)/window.innerWidth}function l(e,n,o){var u=function(e,n){var o=Number.parseInt(t.getStyle(n,"marginTop"),10),r=2*o+n.offsetHeight,i=e.getBoundingClientRect().top+e.offsetHeight/2,u=window.innerHeight-i;return u>=r||u>=i?["below",u-o-15]:["above",i-o-15]}(n,e),c=u[0],l=u[1];if(o!==c){i(e,"is-"+o),r(e,"is-"+c);var s=100*a(n)+"%",f="above"===c?"100%":"0";e.style.transformOrigin=s+" "+f}return[c,l]}var s="is-active",f="is-changing",d="is-scrollable";function v(n){var o=n.id,v=n.button,p=n.content,m=n.host,h=n.popover,g=n.wrapper,y=0,b="above",x=function(){return document.body.contains(h)};return{id:o,activate:function(n){var o;v.setAttribute("aria-expanded","true"),r(v,f),r(v,s),v.insertAdjacentElement("afterend",h),h.style.maxWidth=document.body.clientWidth+"px",o=p,y=Math.round(e.pixels(t.getStyle(o,"maxHeight"),o)),null==n||n(h,v)},dismiss:function(t){v.setAttribute("aria-expanded","false"),r(v,f),i(v,s),i(h,s),null==t||t(h,v)},isActive:function(){return u(v,s)},isReady:function(){return!u(v,f)},ready:function(){r(h,s),i(v,f)},remove:function(){h.remove(),i(v,f)},reposition:function(){if(x()){var t=l(h,v,b),e=t[0],n=t[1];b=e,p.style.maxHeight=Math.min(y,n)+"px",h.offsetHeight<p.scrollHeight?(r(h,d),p.setAttribute("tabindex","0")):(i(h,d),p.removeAttribute("tabindex"))}},resize:function(){x()&&(h.style.left=function(e,n){var o=e.offsetWidth;return-a(n)*o+Number.parseInt(t.getStyle(n,"marginLeft"),10)+n.offsetWidth/2}(p,v)+"px",g.style.maxWidth=p.offsetWidth+"px",function(t,e){var n=t.querySelector("."+c);n&&(n.style.left=100*a(e)+"%")}(h,v))},destroy:function(){return m.remove()}}}var p="is-fully-scrolled",m=function(t){return function(e){var n=e.currentTarget,o=-e.deltaY;o>0&&i(t,p),n&&o<=0&&o<n.clientHeight+n.scrollTop-n.scrollHeight&&r(t,p)}};var h="littlefoot__content",g="littlefoot__wrapper",y="littlefoot--print",b=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return t.forEach((function(t){return r(t,y)}))};function x(t,e){return Array.from(t.querySelectorAll(e))}function w(t,e){return t.querySelector("."+e)||t.firstElementChild||t}function E(t){var e=document.createElement("div");e.innerHTML=t;var n=e.firstElementChild;return n.remove(),n}function S(t){return void 0!==t}function A(t){var e=t.parentElement,n=x(e,":scope > :not(."+y+")"),o=n.filter((function(t){return"HR"===t.tagName}));n.length===o.length&&(b.apply(void 0,o.concat(e)),A(e))}function D(t,e){var n=t.parentElement;t.remove(),n&&n!==e&&!n.innerHTML.replace(/(\[\]|&nbsp;|\s)/g,"")&&D(n,e)}function T(t,e){var n=t[0],o=t[1],r=t[2],i=E(r.outerHTML);x(i,'[href$="#'+n+'"]').forEach((function(t){return D(t,i)}));var u=i.innerHTML.trim();return[o,r,{id:String(e+1),number:e+1,reference:"lf-"+n,content:u.startsWith("<")?u:"<p>"+u+"</p>"}]}function H(t){return function(e){return t.replace(/<%=?\s*(\w+?)\s*%>/g,(function(t,n){var o;return String(null!==(o=e[n])&&void 0!==o?o:"")}))}}function O(t,e){var o=H(t),r=H(e);return function(t){var e=t[0],i=t[1],u=i.id,c=E('<span class="littlefoot">'+o(i)+"</span>"),a=c.firstElementChild;a.setAttribute("aria-expanded","false"),a.dataset.footnoteButton="",a.dataset.footnoteId=u;var l=E(r(i));l.dataset.footnotePopover="",l.dataset.footnoteId=u;var s=w(l,g),f=w(l,h);return function(t,e){t.addEventListener("wheel",n.throttle(m(e),16))}(f,l),e.insertAdjacentElement("beforebegin",c),{id:u,button:a,host:c,popover:l,content:f,wrapper:s}}}function _(t){var e,n,r,u=t.allowDuplicates,c=t.anchorParentSelector,a=t.anchorPattern,l=t.buttonTemplate,s=t.contentTemplate,f=t.footnoteSelector,d=t.numberResetSelector,p=t.scope,m=function(t,e,n){return x(t,n+' a[href*="#"]').filter((function(t){return(t.href+t.rel).match(e)}))}(document,a,p).map(function(t,e,n,o){var r=[];return function(i){var u,c=i.href.split("#")[1];if(c){var a=null===(u=x(t,"#"+window.CSS.escape(c)).find((function(t){return e||!r.includes(t)})))||void 0===u?void 0:u.closest(o);if(a){r.push(a);var l=i.closest(n)||i;return[l.id||i.id,l,a]}}}}(document,u,c,f)).filter(S).map(T).map(d?(e=d,n=0,r=null,function(t){var i=t[0],u=t[1],c=t[2],a=i.closest(e);return n=r===a?n+1:1,r=a,[i,u,o(o({},c),{number:n})]}):function(t){return t}).map((function(t){var e=t[0],n=t[1],o=t[2];return b(e,n),A(n),[e,o]})).map(O(l,s)).map(v);return{footnotes:m,unmount:function(){m.forEach((function(t){return t.destroy()})),x(document,"."+y).forEach((function(t){return i(t,y)}))}}}var L="[data-footnote-id]",M=function(t){var e;if(t){console.log("found a copy button for footnode id: ",t);var n=null===(e=document.getElementById(t))||void 0===e?void 0:e.innerText;n&&navigator.clipboard.writeText(n).then((function(){console.log("Footnote content copied: ",n),alert("Footnote copied to clipboard!")})).catch((function(t){console.error("Failed to copy text: ",t)}))}},C=function(t,e){return t.target.closest(e)},R=function(t){return null==t?void 0:t.dataset.footnoteId},W=function(t){return function(e){e.preventDefault();var n=C(e,L),o=R(n);o&&t(o)}},k=document.addEventListener,q=window.addEventListener,P=function(t,e,n,o){return k(t,(function(t){var o=t.target;(null==o?void 0:o.closest(e))&&n.call(o,t)}),o)};var z={activateDelay:100,activateOnHover:!1,allowDuplicates:!0,allowMultiple:!1,anchorParentSelector:"sup",anchorPattern:/(fn|footnote|note)[:\-_\d]/gi,dismissDelay:100,dismissOnUnhover:!1,dismissOnDocumentTouch:!0,footnoteSelector:"li",hoverDelay:250,numberResetSelector:"",scope:"",contentTemplate:'<aside class="littlefoot__popover" id="fncontent:<% id %>"><div class="'.concat(g,'"><div class="').concat(h,'"><% content %></div></div><div class="').concat(c,'"></div></aside>'),buttonTemplate:'<button class="littlefoot__button" id="<% reference %>" title="See Footnote <% number %>"><svg role="img" aria-labelledby="title-<% reference %>" viewbox="0 0 31 6" preserveAspectRatio="xMidYMid"><title id="title-<% reference %>">Footnote <% number %></title><circle r="3" cx="3" cy="3" fill="white"></circle><circle r="3" cx="15" cy="3" fill="white"></circle><circle r="3" cx="27" cy="3" fill="white"></circle></svg></button>'};function F(t){void 0===t&&(t={});var e=o(o({},z),t),r=function(t,e){var n,o=t.footnotes,r=t.unmount,i=function(t){return function(n){n.isReady()&&(n.dismiss(e.dismissCallback),setTimeout(n.remove,t))}},u=function(t){return function(n){e.allowMultiple||o.filter((function(t){return t.id!==n.id})).forEach(i(e.dismissDelay)),n.isReady()&&(n.activate(e.activateCallback),n.reposition(),n.resize(),setTimeout(n.ready,t))}},c=function(t){return function(e){var n=o.find((function(t){return t.id===e}));n&&t(n)}},a=function(){return o.forEach(i(e.dismissDelay))};return{activate:function(t,e){return c(u(e))(t)},dismiss:function(t,e){return c(i(e))(t)},dismissAll:a,touchOutside:function(){e.dismissOnDocumentTouch&&a()},repositionAll:function(){return o.forEach((function(t){return t.reposition()}))},resizeAll:function(){return o.forEach((function(t){return t.resize()}))},toggle:c((function(t){return t.isActive()?i(e.dismissDelay)(t):u(e.activateDelay)(t)})),hover:c((function(t){n=t.id,e.activateOnHover&&!t.isActive()&&u(e.hoverDelay)(t)})),unhover:c((function(t){t.id===n&&(n=null),e.dismissOnUnhover&&setTimeout((function(){return o.filter((function(t){return t.id!==n})).forEach(i(e.dismissDelay))}),e.hoverDelay)})),unmount:r}}(_(e),e),i=function(t){var e=function(e){var n=C(e,"[data-footnote-button]"),o=R(n);o?(e.preventDefault(),t.toggle(o)):C(e,"[data-footnote-popover]")||t.touchOutside()},o=n.throttle(t.repositionAll,16),r=n.throttle(t.resizeAll,16),i=W(t.hover),u=W(t.unhover),c=new AbortController,a={signal:c.signal};return k("touchend",e,a),k("click",(function(e){if(C(e,"[data-footnote-popover]")){var n=document.querySelector(".copy-footnote");if(n){var o=n.getAttribute("footnote-id");M(o)}else t.touchOutside()}}),a),k("click",e,a),k("keyup",(function(e){27!==e.keyCode&&"Escape"!==e.key&&"Esc"!==e.key||t.dismissAll()}),a),k("gestureend",o,a),q("scroll",o,a),q("resize",r,a),P("mouseover",L,i,a),P("mouseout",L,u,a),function(){c.abort()}}(r);return{activate:function(t,n){void 0===n&&(n=e.activateDelay),r.activate(t,n)},dismiss:function(t,n){void 0===n&&(n=e.dismissDelay),void 0===t?r.dismissAll():r.dismiss(t,n)},unmount:function(){i(),r.unmount()},getSetting:function(t){return e[t]},updateSetting:function(t,n){e[t]=n}}}exports.default=F,exports.littlefoot=F;
