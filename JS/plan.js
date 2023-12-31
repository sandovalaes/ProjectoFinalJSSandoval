class Plan{

    instalacion;
    nombreversion;
    cant_usu_minimo;
    cant_usu_maximo;
    importe;

    constructor (pinstalacion, pversion, pminimo, pmaximo, pimporte){
        this.instalacion = pinstalacion;
        this.nombreversion = pversion;
        this.cant_usu_minimo = pminimo;
        this.cant_usu_maximo = pmaximo;
        this.importe = pimporte;
    }  
}