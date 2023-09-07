
class ListaDeResultados{
listaCheck=[]
listaOK=[]
agregarResultado(resultado){
    if(this.listaCheck.find((res)=>res.codigo==resultado)){
        this.listaCheck.find((res)=>res.codigo==resultado).cantidad++
    }else{
        let nuevoCodigo={"codigo":resultado,"cantidad":1}
        this.listaCheck.push(nuevoCodigo)       
    }
    this.encontrarVerdadero()
}

encontrarVerdadero(){
      let lecturasTotales=this.listaCheck.reduce((acumulador,current)=>acumulador+current.cantidad,0)
      let cantidades = this.listaCheck.map(function (resultado) {
        return resultado.cantidad;
      });
      let mayorLectura=Math.max(...cantidades)
      if(lecturasTotales>=10 && mayorLectura/lecturasTotales>=0.3){
        let codigoResultado=this.listaCheck.find((res)=>res.cantidad==mayorLectura).codigo
       console.log(`el codigo es: ${codigoResultado}`)
       this.mostrarProducto(codigoResultado)
   
    
   this.limpiarlistaCheck()

      }

}

limpiarlistaCheck(){
    this.listaCheck=[]
}

mostrarProducto(cod){

    fetch('./complementos/productos.json')
    .then(response=>response.json())
    .then(response=>{
        let codigoBuscado=cod.toString()
        let listaDeProductos=response
        //console.table(listaDeProductos)
        let productoAMostrar=listaDeProductos.find((elemento)=>elemento.CodigoEan.toString()==codigoBuscado).Producto.toString()
        return productoAMostrar
}).then((response)=>{alert(response)})
}
}

