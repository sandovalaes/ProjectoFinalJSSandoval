class Presupuesto{
    NombreCliente;
    Instalacion;
    Nombreversion;
    CantidadUsuarios;
    ImporteLicencia;
    ImportePresupuesto;

    constructor (pNombre, pInstalacion, pVersion, pCantUsu, pLicencia,pImporte){
        this.NombreCliente = pNombre;
        this.Instalacion = pInstalacion;
        this.Nombreversion = pVersion;
        this.CantidadUsuarios = pCantUsu;
        this.ImporteLicencia = pLicencia;
        this.ImportePresupuesto = pImporte;
    }  
}