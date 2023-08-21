
let torch=false
let nodeScaner=document.getElementById("scanner-container")
nodeScaner.style.width=window.screen.width
nodeScaner.style.height=window.screen.height
nodeScaner.style.padding=50
nodeLinterna=document.getElementById("linterna")
nodeLinterna.addEventListener("click",()=>{switchLinterna()},false)
var _scannerIsRunning = false;
resultados=new ListaDeResultados
navigator.mediaDevices.enumerateDevices().then(result=>{
    console.log(result[1].deviceId)
    cargarSelect(result)
})

function startScannerCam(cam) {
    
    Quagga.init({
       numOfWorkers: navigator.hardwareConcurrency,
       locate: true,
       inputStream: {
         name: "Live",
         type: "LiveStream",
         target: document.querySelector('#scanner-container'),
         constraints: {
            width: 250,
            height: 400,
            deviceId: `${cam}` 
         },
         area: { // defines rectangle of the detection/localization area
            top: "0%",    // top offset
            right: "0%",  // right offset
            left: "0%",   // left offset
            bottom: "0%"  // bottom offset
          },
     },

     frecuency:30,
     decoder: {
         readers: [

            
             //"code_128_reader",
             "ean_reader",
             //"ean_8_reader",
             //"codabar_reader",
             //"upc_reader",
             //"upc_e_reader",
             
         ],
         locator:{
            halfSample: true,
            pathSize: "medium", //"medium",x-small,small,medium,large,x-large


        },
         debug: {
             showCanvas: true,
             showPatches: false,
             showFoundPatches: false,
             showSkeleton: false,
             showLabels: true,
             showPatchLabels: false,
             showRemainingPatchLabels: false,
             boxFromPatches: {
                 showTransformed: true,
                 showTransformedBox: true,
                 showBB: true
             }
         }
     },

 }, function (err) {
     if (err) {
         console.log(err);
         return
     }

     console.log("Initialization finished. Ready to start");
     Quagga.start();

     

     // Set flag to is running
     _scannerIsRunning = true;
 });

 Quagga.onProcessed(function (result) {
     var drawingCtx = Quagga.canvas.ctx.overlay,
     drawingCanvas = Quagga.canvas.dom.overlay;

     if (result) {
         if (result.boxes) {
             drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
             result.boxes.filter(function (box) {
                 return box !== result.box;
             }).forEach(function (box) {
                 Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
             });
         }

         if (result.box) {
             Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
         }

         if (result.codeResult && result.codeResult.code) {
             Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
         }
     }
 });


 Quagga.onDetected(function (result) {
     //console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result)
     resultados.agregarResultado(result.codeResult.code)
    });
 }

function cargarSelect(result){
   let listaDeCamaras=result
   let select = document.getElementById("select")
   select.innerHTML=''
   listaDeCamaras.forEach(camara => {
                 select.innerHTML+=`<option value="${camara.label}">${camara.label}</option>`
     });
     select.addEventListener("change",(e)=>{
        camaraId=listaDeCamaras.find((camara)=>camara.label==e.target.value).deviceId
        startScannerCam(camaraId)
    },false)
    }




// Start/stop scanner
document.getElementById("comenzar").addEventListener("click", function () {
    if (_scannerIsRunning) {
        Quagga.stop();
    } else {
        startScanner();
    }
}, false);

function switchLinterna(){
    if(torch){
        Quagga.CameraAccess.disableTorch()
        torch=false
    }else if(!torch){
        Quagga.CameraAccess.enableTorch()
        torch=true
        }
}











/*let salida = document.createElement("h1")
     salida.innerText=result.codeResult.code
     let div=document.getElementById("camaras")
     div.appendChild(salida)
     document.getElementById("comenzar").click()
     */