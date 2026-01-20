const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Render-D4RHPjRz.js","assets/index-BOmoiMTy.js","assets/PageRouter-R_kMZkvA.js","assets/App-eS0hn45k.js","assets/PageRouter-DJw1hYb5.css","assets/Render-BmvggOba.css"])))=>i.map(i=>d[i]);
import{k as m,l as g,r as l,j as i,c as R,R as v,_ as y}from"./index-BOmoiMTy.js";import{g as w,a as _,s as S,m as $,u as j,c as P}from"./App-eS0hn45k.js";function A(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function U(t){return parseFloat(t)}function E(t){return w("MuiSkeleton",t)}_("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const M=t=>{const{classes:a,variant:e,animation:n,hasChildren:r,width:o,height:s}=t;return P({root:["root",e,n,r&&"withChildren",r&&!o&&"fitContent",r&&!s&&"heightAuto"]},E,a)},d=m`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,c=m`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,N=typeof d!="string"?g`
        animation: ${d} 2s ease-in-out 0.5s infinite;
      `:null,T=typeof c!="string"?g`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,X=S("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})($(({theme:t})=>{const a=A(t.shape.borderRadius)||"px",e=U(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${e}${a}/${Math.round(e/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:N||{animation:`${d} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:T||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}})),f=l.forwardRef(function(a,e){const n=j({props:a,name:"MuiSkeleton"}),{animation:r="pulse",className:o,component:s="span",height:h,style:b,variant:k="text",width:x,...u}=n,p={...n,animation:r,component:s,variant:k,hasChildren:!!u.children},C=M(p);return i.jsx(X,{as:s,ref:e,className:R(C.root,o),ownerState:p,...u,style:{width:x,height:h,...b}})}),D=v.lazy(()=>y(()=>import("./Render-D4RHPjRz.js"),__vite__mapDeps([0,1,2,3,4,5])).then(t=>({default:t.Renderer||t}))),I=v.lazy(()=>y(()=>import("./PageRouter-R_kMZkvA.js").then(t=>t.i),__vite__mapDeps([2,1,3,4])).then(t=>({default:t.PageNavigator||t}))),z=t=>(console.log("Rendering Page component for "+t.filename),document.title=`${t.filename} | ${t.code} Reader`,i.jsxs(i.Fragment,{children:[i.jsx(l.Suspense,{fallback:i.jsx(f,{variant:"rectangular",width:"100%",height:50,sx:{borderRadius:5}}),children:i.jsx(I,{papers:t.papers,code:t.code,currentPaper:t})}),i.jsx(l.Suspense,{fallback:i.jsx(f,{variant:"rectangular",width:"100%",height:600}),children:i.jsx(D,{file:t.filename},t.filename)})]}));export{z as Page,z as default};
