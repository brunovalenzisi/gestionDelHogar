



class ListaDeResultados{
lista=[]
agregarResultado(resultado){
    if(this.lista.find((res)=>res.codigo==resultado)){
        this.lista.find((res)=>res.codigo==resultado).cantidad++
    }else{
        let nuevoCodigo={"codigo":resultado,"cantidad":1}
        this.lista.push(nuevoCodigo)       
    }
    this.encontrarVerdadero()
}

encontrarVerdadero(){
      let lecturasTotales=this.lista.reduce((acumulador,current)=>acumulador+current.cantidad,0)
      let cantidades = this.lista.map(function (resultado) {
        return resultado.cantidad;
      });
      let mayorLectura=Math.max(...cantidades)
      if(lecturasTotales>=10 && mayorLectura/lecturasTotales>=0.3){
        let codigoResultado=this.lista.find((res)=>res.cantidad==mayorLectura).codigo
   alert(`el codigo es: ${codigoResultado}` )
   this.limpiarLista()

      }

}

limpiarLista(){
    this.lista=[]
}

}