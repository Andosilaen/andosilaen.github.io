(function(){
  var root=document.documentElement,key="theme";
  try{var s=localStorage.getItem(key);if(s)root.setAttribute("data-theme",s)}catch(e){}
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-toggle-theme]");if(!b)return;
    var dark=root.getAttribute("data-theme")==="dark"||(!root.getAttribute("data-theme")&&matchMedia("(prefers-color-scheme:dark)").matches);
    var n=dark?"light":"dark";root.setAttribute("data-theme",n);
    try{localStorage.setItem(key,n)}catch(e){}
  });
})();
