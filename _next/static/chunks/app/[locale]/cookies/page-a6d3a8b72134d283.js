(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1475,1566,2200,2674,4601,6174,6977,8177],{5169:(e,t,r)=>{"use strict";e.exports=r(62981)},11502:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>A});var n,o=r(61703),i=r(5169),s=r(34351),c=r(96550),l=r(29439),a=r(71728),d=r.n(a);let u=(0,l.A)(d().heading);function f(e){let t,r,n;let s=(0,i.c)(8),{actions:c,children:l,level:a}=e,d=`h${void 0===a?2:a}`;return s[0]!==d||s[1]!==l?(t=(0,o.jsx)(d,{className:u,children:l}),s[0]=d,s[1]=l,s[2]=t):t=s[2],s[3]!==c?(r=void 0!==c&&(0,o.jsx)("div",{children:c}),s[3]=c,s[4]=r):r=s[4],s[5]!==t||s[6]!==r?(n=(0,o.jsxs)("header",{children:[t,r]}),s[5]=t,s[6]=r,s[7]=n):n=s[7],n}let h=(0,s.createContext)(2);var _=r(11930),g=r.n(_);let v=(0,l.A)(g().footer),x=(0,l.A)(g().section),p=(n=0,function(){return Math.floor(4*Math.random())+-2});function A(e){let t,r,n,l,a,d,u,_,g,A,m;let b=(0,i.c)(27),{actions:S,children:$,header:E}=e,{foregroundHex:N}=(0,c.A)(),j=(0,s.use)(h),[y,O]=(0,s.useState)(0);b[0]===Symbol.for("react.memo_cache_sentinel")?(t=()=>{O(p)},r=[],b[0]=t,b[1]=r):(t=b[0],r=b[1]),(0,s.useLayoutEffect)(t,r);let k=(-1*y).toString(),C=y.toString(),H=`rotate(${C}deg)`;b[2]!==N||b[3]!==H?(n={color:N,transform:H},b[2]=N,b[3]=H,b[4]=n):n=b[4];let T=`rotate(${k}deg)`;return(b[5]!==T?(l={transform:T},b[5]=T,b[6]=l):l=b[6],b[7]!==j)?(a=Math.min(j+1,6),b[7]=j,b[8]=a):a=b[8],b[9]!==E||b[10]!==j?(d=void 0!==E&&(0,o.jsx)(f,{level:j,children:E}),b[9]=E,b[10]=j,b[11]=d):d=b[11],b[12]!==$?(u=(0,o.jsx)("div",{children:$}),b[12]=$,b[13]=u):u=b[13],b[14]!==S?(_=void 0!==S&&(0,o.jsx)("footer",{className:v,children:S}),b[14]=S,b[15]=_):_=b[15],b[16]!==_||b[17]!==a||b[18]!==d||b[19]!==u?(g=(0,o.jsxs)(h.Provider,{value:a,children:[d,u,_]}),b[16]=_,b[17]=a,b[18]=d,b[19]=u,b[20]=g):g=b[20],b[21]!==g||b[22]!==l?(A=(0,o.jsx)("div",{style:l,children:g}),b[21]=g,b[22]=l,b[23]=A):A=b[23],b[24]!==A||b[25]!==n?(m=(0,o.jsx)("section",{className:x,style:n,children:A}),b[24]=A,b[25]=n,b[26]=m):m=b[26],m}},11930:e=>{e.exports={footer:"section_footer__aU65r",section:"section_section__wbwT0"}},26719:(e,t,r)=>{"use strict";r.d(t,{Q:()=>o,s:()=>n});let{ContextProvider:n,useContextValue:o}=(0,r(35815).A)()},29439:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var n=r(73710);let o=e=>{let t=typeof e;return"undefined"===t?"undefined":`${t} ${JSON.stringify(e)}`};function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.A;return!function(e,t,r){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n.A;if(e)return;let s=o(t);if(0===i.length)throw Error(`Expected ${r}, but received ${s}.`);let c=i.join(".");throw Error(`Expected property "${c}" to be ${r}, but received ${s}.`)}("string"==typeof e,e,"a string",t),e}},38962:(e,t,r)=>{Promise.resolve().then(r.bind(r,88187)),Promise.resolve().then(r.bind(r,11502))},62981:(e,t,r)=>{"use strict";var n=r(34351).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;t.c=function(e){return n.H.useMemoCache(e)}},71728:e=>{e.exports={heading:"header_heading__5HTxO"}},73710:(e,t,r)=>{"use strict";r.d(t,{A:()=>n});let n=Object.freeze([])},96550:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var n=r(5169),o=r(26719);function i(e){return e.toString(16).padStart(2,"0")}function s(e){return`#${e.map(i).join("")}`}function c(e,t,r){let o;let i=(0,n.c)(4);return i[0]!==r||i[1]!==t||i[2]!==e?(o=n=>{let o=r.toString(),i=t.toString(),s=n.toString(),c=e.toString();return`rgba(${c}, ${i}, ${o}, ${s})`},i[0]=r,i[1]=t,i[2]=e,i[3]=o):o=i[3],o}function l(){let e,t,r,i,l;let a=(0,n.c)(17),d=(0,o.Q)(),{foreground:u,primary:f,secondary:h}=d;a[0]!==d.background?(e=s(d.background),a[0]=d.background,a[1]=e):e=a[1];let _=c(...u);a[2]!==u?(t=s(u),a[2]=u,a[3]=t):t=a[3];let g=c(...f);a[4]!==f?(r=s(f),a[4]=f,a[5]=r):r=a[5];let v=c(...h);return a[6]!==h?(i=s(h),a[6]=h,a[7]=i):i=a[7],a[8]!==e||a[9]!==_||a[10]!==t||a[11]!==g||a[12]!==r||a[13]!==v||a[14]!==i||a[15]!==d?(l={...d,backgroundHex:e,foregroundAlpha:_,foregroundHex:t,primaryAlpha:g,primaryHex:r,secondaryAlpha:v,secondaryHex:i},a[8]=e,a[9]=_,a[10]=t,a[11]=g,a[12]=r,a[13]=v,a[14]=i,a[15]=d,a[16]=l):l=a[16],l}}},e=>{var t=t=>e(e.s=t);e.O(0,[2285,5581,5571,6172,7358],()=>t(38962)),_N_E=e.O()}]);
//# sourceMappingURL=page-a6d3a8b72134d283.js.map