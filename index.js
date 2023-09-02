
console.log("hola")
let nodeIngresar = document.getElementById("ingresar")
nodeIngresar.addEventListener(
  "click",()=>{
    animateCSS('.content-ingreso', 'bounce').then(()=>{ window.location.href="./scanner.html"})
   })









 