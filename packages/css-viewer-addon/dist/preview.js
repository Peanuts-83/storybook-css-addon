import {useChannel,useEffect}from'storybook/internal/preview-api';var o="storybook-css-display";var s={RESULT:`${o}/result`,REQUEST:`${o}/request`};var c=(e=globalThis.document)=>{let n=e.querySelectorAll("div"),r=e.querySelectorAll("*");return {divs:Array.from(n).filter(t=>t.childNodes.length<2).map(t=>t.getBoundingClientRect()),styled:Array.from(r).filter(t=>t.hasAttribute("style")).map(t=>t.getBoundingClientRect())}},i=(e,n)=>{let r=n.canvasElement,t=useChannel({[s.REQUEST]:()=>{t(s.RESULT,c(r));}});return useEffect(()=>{t(s.RESULT,c(r));}),e()};var a={decorators:[i]},A=a;export{A as default};//# sourceMappingURL=preview.js.map
//# sourceMappingURL=preview.js.map