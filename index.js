
console.log("hola")
let nodeIngresar = document.getElementById("ingresar")
nodeIngresar.addEventListener(
  "click",()=>{
    animateCSS('.content-ingreso', 'bounce').then(()=>{ window.location.href="./scanner.html"})
   })


const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

  animateCSS('.content-alacena', 'bounce');
  animateCSS('.content-heladera', 'bounce');
  animateCSS('.content-puerta', 'bounce');




 