(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8759],{98759:(t,e,r)=>{Promise.resolve().then(r.bind(r,6768)),Promise.resolve().then(r.bind(r,25023)),Promise.resolve().then(r.bind(r,78829)),Promise.resolve().then(r.bind(r,80307))},41634:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});let n=Object.freeze([])},55256:(t,e,r)=>{"use strict";r.d(e,{Z:()=>n});let n=(0,r(11964).createContext)(null)},6650:(t,e,r)=>{"use strict";r.d(e,{Z:()=>a});var n=r(77491),o=r(11964),i=r(55256);function l(t){return t.toString(16).padStart(2,"0")}function s(t){return`#${t.map(l).join("")}`}function u(t,e,r){let o;let i=(0,n.c)(4);return i[0]!==r||i[1]!==e||i[2]!==t?(o=n=>{let o=r.toString(),i=e.toString(),l=n.toString(),s=t.toString();return`rgba(${s}, ${i}, ${o}, ${l})`},i[0]=r,i[1]=e,i[2]=t,i[3]=o):o=i[3],o}function a(){let t,e,r,l,a;let f=(0,n.c)(17),c=(0,o.useContext)(i.Z);if(null===c)throw Error("Expected a theme to be provided.");let{foreground:d,primary:h,secondary:g}=c;f[0]!==c.background?(t=s(c.background),f[0]=c.background,f[1]=t):t=f[1];let v=u(...d);f[2]!==d?(e=s(d),f[2]=d,f[3]=e):e=f[3];let b=u(...h);f[4]!==h?(r=s(h),f[4]=h,f[5]=r):r=f[5];let m=u(...g);return f[6]!==g?(l=s(g),f[6]=g,f[7]=l):l=f[7],f[8]!==c||f[9]!==t||f[10]!==v||f[11]!==e||f[12]!==b||f[13]!==r||f[14]!==m||f[15]!==l?(a={...c,backgroundHex:t,foregroundAlpha:v,foregroundHex:e,primaryAlpha:b,primaryHex:r,secondaryAlpha:m,secondaryHex:l},f[8]=c,f[9]=t,f[10]=v,f[11]=e,f[12]=b,f[13]=r,f[14]=m,f[15]=l,f[16]=a):a=f[16],a}},80307:(t,e,r)=>{"use strict";r.d(e,{default:()=>g});var n=r(11416),o=r(77491),i=r(11964),l=r(6650),s=r(19522);function u(t){let e,r,i,l;let s=(0,o.c)(8),{actions:u,children:a}=t;return s[0]===Symbol.for("react.memo_cache_sentinel")?(e={fontSize:"1rem",lineHeight:"1rem",fontWeight:"bold",marginBottom:"1rem",marginLeft:0,marginRight:0,marginTop:0},s[0]=e):e=s[0],s[1]!==a?(r=(0,n.jsx)("h2",{style:e,children:a}),s[1]=a,s[2]=r):r=s[2],s[3]!==u?(i=void 0!==u&&(0,n.jsx)("div",{children:u}),s[3]=u,s[4]=i):i=s[4],s[5]!==r||s[6]!==i?(l=(0,n.jsxs)("header",{children:[r,i]}),s[5]=r,s[6]=i,s[7]=l):l=s[7],l}var a=r(56343),f=r.n(a);let c=(0,s.Z)(f().footer),d=(0,s.Z)(f().section),h=function(){return Math.floor(0*Math.random())+-2};function g(t){let e,r,s,a,f,g,v,b,m;let p=(0,o.c)(21),{actions:y,children:x,header:j}=t,{foregroundHex:_}=(0,l.Z)(),[S,E]=(0,i.useState)(0);p[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{E(h)},r=[],p[0]=e,p[1]=r):(e=p[0],r=p[1]),(0,i.useLayoutEffect)(e,r);let $=`rotate(${S}deg)`;p[2]!==_||p[3]!==$?(s={color:_,transform:$},p[2]=_,p[3]=$,p[4]=s):s=p[4];let k=`rotate(${-1*S}deg)`;return p[5]!==k?(a={transform:k},p[5]=k,p[6]=a):a=p[6],p[7]!==j?(f=void 0!==j&&(0,n.jsx)(u,{children:j}),p[7]=j,p[8]=f):f=p[8],p[9]!==x?(g=(0,n.jsx)("div",{children:x}),p[9]=x,p[10]=g):g=p[10],p[11]!==y?(v=void 0!==y&&(0,n.jsx)("footer",{className:c,children:y}),p[11]=y,p[12]=v):v=p[12],p[13]!==a||p[14]!==f||p[15]!==g||p[16]!==v?(b=(0,n.jsxs)("div",{style:a,children:[f,g,v]}),p[13]=a,p[14]=f,p[15]=g,p[16]=v,p[17]=b):b=p[17],p[18]!==s||p[19]!==b?(m=(0,n.jsx)("section",{className:d,style:s,children:b}),p[18]=s,p[19]=b,p[20]=m):m=p[20],m}},19522:(t,e,r)=>{"use strict";r.d(e,{Z:()=>i});var n=r(41634);let o=t=>{let e=typeof t;return"undefined"===e?"undefined":`${e} ${JSON.stringify(t)}`};function i(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.Z;return!function(t,e,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n.Z;if(t)return;let l=o(e);if(0===i.length)throw Error(`Expected ${r}, but received ${l}.`);let s=i.join(".");throw Error(`Expected property "${s}" to be ${r}, but received ${l}.`)}("string"==typeof t,t,"a string",e),t}},56343:t=>{t.exports={footer:"section_footer__aU65r",section:"section_section__wbwT0"}},90960:(t,e,r)=>{"use strict";var n=r(11964).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;e.c=function(t){return n.H.useMemoCache(t)}},77491:(t,e,r)=>{"use strict";t.exports=r(90960)},6768:(t,e,r)=>{"use strict";r.d(e,{default:()=>s});var n=r(11416),o=r(11964),i=r(51797),l=r(92047);function s(t){let{children:e,...r}=t,s=(0,o.useContext)(i.Z),u=(0,l.Z)()(Array.isArray(e)?e.join(""):e.toString(),r);return void 0===u?(0,n.jsx)(s,{}):(0,n.jsx)(n.Fragment,{children:u})}},1777:(t,e,r)=>{"use strict";r.d(e,{Z:()=>o});var n=r(11416);function o(){return(0,n.jsx)(n.Fragment,{children:"..."})}},25023:(t,e,r)=>{"use strict";r.d(e,{default:()=>x});var n=r(11416),o=r(11964),i=r(1777),l=r(51797),s=r(78829),u=r(22776);function a(t){let[e,r]=t;return"string"==typeof e&&"string"==typeof r}function f(t){return!!(0,u.Uy)(t)&&!(t instanceof Promise)&&Object.entries(t).every(a)}function c(t){return function(t){if(!(0,u.Uy)(t))return!1;let e=Object.keys(t);return 1===e.length&&"default"===e[0]}(t)&&f(t.default)}let d=Object.freeze({});class h{#t=new Map;emit(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];let o=this.#t.get(t);if(void 0!==o)for(let t of o)t(...r)}on(t,e){let r=this.#t.get(t);void 0===r?this.#t.set(t,[e]):r.push(e)}}function g(t){return"boolean"==typeof t||"number"==typeof t||"string"==typeof t}function v(t,e){return(0,n.jsx)(o.Fragment,{children:t},e)}function b(t,e){if(void 0===e)return t;let r=[t];for(let[t,n]of Object.entries(e))for(let e=0;e<r.length;e+=2){let o=r[e].split(`$${t}`);if(o.length>1){for(let t=0;t<o.length-1;t+=2)o.splice(t+1,0,n);r.splice(e,1,...o),e+=o.length-1}}return r.every(g)?r.join(""):(0,n.jsx)(n.Fragment,{children:r.map(v)})}class m extends h{#e;#r;constructor({fallbackTranslations:t,translations:e}){super(),this.#e=t,this.#r=e,this.run=this.run.bind(this)}run(t,e){if(void 0===this.#r){this.emit("loadTranslations",t);return}let r=this.#r[t];if(void 0!==r)return b(r,e);if(void 0===this.#e){this.emit("loadFallbackTranslations",t);return}let n=this.#e[t];if(void 0!==n)return b(n,e);this.emit("notFound",t)}}function p(t){throw Error(`Fallback translation not found: ${t}`)}let y=Object.freeze({}),x=(0,o.memo)(function(t){let{LoadingComponent:e,children:r,onLoadError:u,fallbackLocale:a,locale:h,translations:g}=t,{translate:v}=function(t){let{fallbackLocale:e,locale:r,onLoadError:n,translationsRecord:i}=t;if(void 0===i[r])throw Error(`Translations do not exist for locale: ${String(r)}`);if("string"==typeof e&&void 0===i[e])throw Error(`Translations do not exist for fallback locale: ${e}`);let l=(0,o.useRef)(null),s=(0,o.useRef)(null),[u,a]=(0,o.useState)(()=>(function(t){let e=d;for(let[r,n]of Object.entries(t))c(n)&&(e={...e,[r]:n.default}),f(n)&&(e={...e,[r]:n});return e})(i)),h=function(t){let{onLoad:e,onLoadError:r,translationsRecord:n}=t,i=(0,o.useRef)(y);return(0,o.useCallback)(t=>{if(!0===i.current[t])return null;i.current={...i.current,[t]:!0};let o=n[t];if(void 0===o)throw Error(`Locale not found: ${String(t)}`);if(f(o))return e(t,o),null;if(c(o))return e(t,o.default),null;let l=o();return f(l)?(e(t,l),null):c(l)?(e(t,l.default),null):l.then(r=>{if(c(r)){e(t,r.default);return}e(t,r)}).catch(e=>{if(void 0===r)throw e;r(t,e)})},[e,r,n])}({onLoadError:n,translationsRecord:i,onLoad:(0,o.useCallback)((t,e)=>{a(r=>({...r,[t]:e}))},[])}),g=(()=>{if(void 0!==e)return u[e]})(),v=u[r];return{asyncLoadFallbackTranslationsEffect:l,asyncLoadTranslationsEffect:s,translate:(0,o.useMemo)(()=>{let t=new m({fallbackTranslations:g,translations:v});return t.on("loadFallbackTranslations",t=>{if(void 0===e)throw Error(`Translation not found: ${t}`);l.current=h(e)}),t.on("loadTranslations",()=>{s.current=h(r)}),t.on("notFound",p),t.run.bind(t)},[e,h,g,v,r])}}({fallbackLocale:a,locale:h,onLoadError:u,translationsRecord:g});return(0,n.jsx)(l.Z.Provider,{value:e??i.Z,children:(0,n.jsx)(s.default.Provider,{value:v,children:r})})})},51797:(t,e,r)=>{"use strict";r.d(e,{Z:()=>i});var n=r(11964),o=r(1777);let i=(0,n.createContext)(o.Z)},78829:(t,e,r)=>{"use strict";r.d(e,{default:()=>n});let n=(0,r(11964).createContext)(function(t){return t})},92047:(t,e,r)=>{"use strict";r.d(e,{Z:()=>i});var n=r(11964),o=r(78829);function i(){return(0,n.useContext)(o.default)}},22776:(t,e,r)=>{"use strict";function n(t){if(void 0===t)return"undefined";if("string"==typeof t)return t;if(t instanceof Error)return t.message;if(Array.isArray(t))return JSON.stringify(t);if("object"==typeof t&&null!==t&&"toString"in t&&"function"==typeof t.toString)try{let e=t.toString();if("string"==typeof e&&"[object Object]"!==e)return e}catch(t){}return JSON.stringify(t)}function o(t,e){return t-e}function i(t){return function(e,r){return function(t,e){if("number"==typeof t&&"number"==typeof e)return t-e;let r=n(t),o=n(e);return r.localeCompare(o)}(e[t],r[t])}}function l(t){return function(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return!t(...r)}}function s(t){return l(function(e){return t===e})}function u(t){return"object"==typeof t&&null!==t}function a(t){return u(t)}r.d(e,{Ym:()=>s,Kn:()=>u,Uy:()=>a,lI:()=>n,ff:()=>l,hA:()=>f,MM:()=>o});let f=i(0);i(1)}}]);
//# sourceMappingURL=8759-7b9947930f9e81cd.js.map