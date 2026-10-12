(function(){
  var root=document.documentElement,key="theme";
  try{var s=localStorage.getItem(key);if(s)root.setAttribute("data-theme",s)}catch(e){}
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-toggle-theme]");if(!b)return;
    var dark=root.getAttribute("data-theme")==="dark"||(!root.getAttribute("data-theme")&&matchMedia("(prefers-color-scheme:dark)").matches);
    var n=dark?"light":"dark";root.setAttribute("data-theme",n);
    try{localStorage.setItem(key,n)}catch(e){}
  });
  /* shared lightbox for any <img data-zoom> */
  var lb;
  function ensure(){if(lb)return lb;lb=document.createElement("div");lb.id="lb";lb.innerHTML="<img alt=''>";document.body.appendChild(lb);
    lb.onclick=function(){lb.classList.remove("on")};document.addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on")});return lb}
  document.addEventListener("click",function(e){var i=e.target.closest("img[data-zoom]");if(!i)return;
    var l=ensure();l.querySelector("img").src=i.src;l.querySelector("img").alt=i.alt;l.classList.add("on")});
  /* PWA: register the service worker at the site root (works from index and prototypes/) */
  var me=document.currentScript;
  if("serviceWorker" in navigator&&me)window.addEventListener("load",function(){
    navigator.serviceWorker.register(new URL("../sw.js",me.src).href).catch(function(){})});
})();
