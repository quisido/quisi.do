(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1457,2338,4473,5068],{92611:(e,t,r)=>{Promise.resolve().then(r.bind(r,80307))},41634:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});let n=Object.freeze([])},55256:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});let n=(0,r(11964).createContext)(null)},6650:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(77491),o=r(11964),i=r(55256);function c(e){return e.toString(16).padStart(2,"0")}function l(e){return`#${e.map(c).join("")}`}function s(e,t,r){let o;let i=(0,n.c)(4);return i[0]!==r||i[1]!==t||i[2]!==e?(o=n=>{let o=r.toString(),i=t.toString(),c=n.toString(),l=e.toString();return`rgba(${l}, ${i}, ${o}, ${c})`},i[0]=r,i[1]=t,i[2]=e,i[3]=o):o=i[3],o}function a(){let e,t,r,c,a;let u=(0,n.c)(17),d=(0,o.useContext)(i.Z);if(null===d)throw Error("Expected a theme to be provided.");let{foreground:f,primary:h,secondary:_}=d;u[0]!==d.background?(e=l(d.background),u[0]=d.background,u[1]=e):e=u[1];let g=s(...f);u[2]!==f?(t=l(f),u[2]=f,u[3]=t):t=u[3];let m=s(...h);u[4]!==h?(r=l(h),u[4]=h,u[5]=r):r=u[5];let p=s(..._);return u[6]!==_?(c=l(_),u[6]=_,u[7]=c):c=u[7],u[8]!==d||u[9]!==e||u[10]!==g||u[11]!==t||u[12]!==m||u[13]!==r||u[14]!==p||u[15]!==c?(a={...d,backgroundHex:e,foregroundAlpha:g,foregroundHex:t,primaryAlpha:m,primaryHex:r,secondaryAlpha:p,secondaryHex:c},u[8]=d,u[9]=e,u[10]=g,u[11]=t,u[12]=m,u[13]=r,u[14]=p,u[15]=c,u[16]=a):a=u[16],a}},80307:(e,t,r)=>{"use strict";r.d(t,{default:()=>_});var n=r(11416),o=r(77491),i=r(11964),c=r(6650),l=r(19522);function s(e){let t,r,i,c;let l=(0,o.c)(8),{actions:s,children:a}=e;return l[0]===Symbol.for("react.memo_cache_sentinel")?(t={fontSize:"1rem",lineHeight:"1rem",fontWeight:"bold",marginBottom:"1rem",marginLeft:0,marginRight:0,marginTop:0},l[0]=t):t=l[0],l[1]!==a?(r=(0,n.jsx)("h2",{style:t,children:a}),l[1]=a,l[2]=r):r=l[2],l[3]!==s?(i=void 0!==s&&(0,n.jsx)("div",{children:s}),l[3]=s,l[4]=i):i=l[4],l[5]!==r||l[6]!==i?(c=(0,n.jsxs)("header",{children:[r,i]}),l[5]=r,l[6]=i,l[7]=c):c=l[7],c}var a=r(56343),u=r.n(a);let d=(0,l.Z)(u().footer),f=(0,l.Z)(u().section),h=function(){return Math.floor(0*Math.random())+-2};function _(e){let t,r,l,a,u,_,g,m,p;let x=(0,o.c)(21),{actions:v,children:b,header:E}=e,{foregroundHex:S}=(0,c.Z)(),[y,$]=(0,i.useState)(0);x[0]===Symbol.for("react.memo_cache_sentinel")?(t=()=>{$(h)},r=[],x[0]=t,x[1]=r):(t=x[0],r=x[1]),(0,i.useLayoutEffect)(t,r);let N=`rotate(${y}deg)`;x[2]!==S||x[3]!==N?(l={color:S,transform:N},x[2]=S,x[3]=N,x[4]=l):l=x[4];let j=`rotate(${-1*y}deg)`;return x[5]!==j?(a={transform:j},x[5]=j,x[6]=a):a=x[6],x[7]!==E?(u=void 0!==E&&(0,n.jsx)(s,{children:E}),x[7]=E,x[8]=u):u=x[8],x[9]!==b?(_=(0,n.jsx)("div",{children:b}),x[9]=b,x[10]=_):_=x[10],x[11]!==v?(g=void 0!==v&&(0,n.jsx)("footer",{className:d,children:v}),x[11]=v,x[12]=g):g=x[12],x[13]!==a||x[14]!==u||x[15]!==_||x[16]!==g?(m=(0,n.jsxs)("div",{style:a,children:[u,_,g]}),x[13]=a,x[14]=u,x[15]=_,x[16]=g,x[17]=m):m=x[17],x[18]!==l||x[19]!==m?(p=(0,n.jsx)("section",{className:f,style:l,children:m}),x[18]=l,x[19]=m,x[20]=p):p=x[20],p}},19522:(e,t,r)=>{"use strict";r.d(t,{Z:()=>i});var n=r(41634);let o=e=>{let t=typeof e;return"undefined"===t?"undefined":`${t} ${JSON.stringify(e)}`};function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.Z;return!function(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n.Z;if(e)return;let c=o(t);if(0===i.length)throw Error(`Expected ${r}, but received ${c}.`);let l=i.join(".");throw Error(`Expected property "${l}" to be ${r}, but received ${c}.`)}("string"==typeof e,e,"a string",t),e}},56343:e=>{e.exports={footer:"section_footer__aU65r",section:"section_section__wbwT0"}},90960:(e,t,r)=>{"use strict";var n=r(11964).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;t.c=function(e){return n.H.useMemoCache(e)}},77491:(e,t,r)=>{"use strict";e.exports=r(90960)}},e=>{var t=t=>e(e.s=t);e.O(0,[3670,233,7914,1744],()=>t(92611)),_N_E=e.O()}]);
//# sourceMappingURL=page-05aadb4f5a80d0dd.js.map