//DECLARACION DE CONSTANTES
const SI = "si";
const NO = "no";
const SALIR = "salir";
const ERROR = true;

//DECLARACION DE VARIABLES
let opcionVersion;
let opcionInstalacion;
let nombreVersion; //Almacena el nombre de la versión seleccionada
let nombreInstalacion; //Almacena el nombre del tipo de instalación seleccionada

let cantidadUsuarios = 0; //Cantidad de usuarios ingresados
let totalPresupuesto = 0; //Importe final del presupuesto

let nombrecompleto; //Nombre ingresado correspondiente a la persona o empresa
let existeError = false; //Flag que indica si hubo error durante el ingreso de datos
let salir; //Flag booleano 
let promocionSeleccionada; //Almacena el objeto de la clase "Plan" obtenido según los datos ingresados

const promociones = []; //Array de objetos de la clase "Plan"
let promosfiltradas; //Array de objetos de la clase "Plan" obtenidos luego de aplicar Filter, según la versión y el tipo de instalación

debugger;

//Inicialización de array de promociones o planes (objetos de tipo plan)
promociones.push(new Plan('Nube', 'Basic', 1, 10, 1500));
promociones.push(new Plan('Nube', 'Basic', 11, 20, 1250));
promociones.push(new Plan('Nube', 'Basic', 21, 1000, 1000));
promociones.push(new Plan('Local', 'Basic', 1, 10, 1300));
promociones.push(new Plan('Local', 'Basic', 11, 20, 1100));
promociones.push(new Plan('Local', 'Basic', 21, 1000, 900));

promociones.push(new Plan('Nube', 'Standard', 1, 10, 1600));
promociones.push(new Plan('Nube', 'Standard', 11, 20, 1350));
promociones.push(new Plan('Nube', 'Standard', 21, 1000, 1100));
promociones.push(new Plan('Local', 'Standard', 1, 10, 1400));
promociones.push(new Plan('Local', 'Standard', 11, 20, 1200));
promociones.push(new Plan('Local', 'Standard', 21, 1000, 1000));

promociones.push(new Plan('Nube', 'Advanced', 1, 10, 1700));
promociones.push(new Plan('Nube', 'Advanced', 11, 20, 1450));
promociones.push(new Plan('Nube', 'Advanced', 21, 1000, 1200));
promociones.push(new Plan('Local', 'Advanced', 1, 10, 1500));
promociones.push(new Plan('Local', 'Advanced', 11, 20, 1300));
promociones.push(new Plan('Local', 'Advanced', 21, 1000, 1100));


do {
        existeError = false;
        nombrecompleto = prompt('Bienvenido a MoxiERP! \n Ingrese nombre y apellido del contacto. \n');
        if (nombrecompleto === "") {
                alert('Valor Incorrecto!');
                existeError = true;
        }
} while (existeError && nombrecompleto !== null)

if (nombrecompleto !== null) {
        do {
                do {
                        existeError = false;
                        opcionVersion = prompt(`Bienvenido/a ${nombrecompleto}` + '\n'
                                + 'Ingrese el tipo de versión del sistema: \n'
                                + '1 = Basic \n'
                                + '2 = Standard \n'
                                + '3 = Advanced \n');
                        switch (opcionVersion) {
                                case null: 
                                        break;
                                case '1': 
                                        nombreVersion = 'Basic';
                                        break;
                                case '2': 
                                        nombreVersion = 'Standard';
                                        break;
                                case '3': 
                                        nombreVersion = 'Advanced';
                                        break;
                                default: alert('La versión ingresada es incorrecta.');
                                        existeError = true;
                                        break;
                        }
                } while (existeError && opcionVersion !== null)

                if (opcionVersion !== null) {
                        do {
                                existeError = false;
                                opcionInstalacion = prompt('Ingrese el tipo de instalación: \n'
                                        + '1 = Local \n'
                                        + '2 = En la Nube \n');
                                switch (opcionInstalacion) {
                                        case null:                              
                                                break;
                                        case '1': 
                                                nombreInstalacion = 'Local';
                                                break;
                                        case '2':
                                                nombreInstalacion = 'Nube';
                                                break;
                                        default: alert('El tipo de instalación ingresada es incorrecta.');
                                                existeError = true;
                                                break;
                                }
                        } while (existeError && opcionInstalacion !== null)
                }

                if (opcionVersion !== null && opcionInstalacion !== null) {
                        do {
                                cantidadUsuarios = parseInt(prompt('Ingrese el número de usuarios: '));
                                if (Number.isInteger(cantidadUsuarios)) {
                                        promosfiltradas = promociones.filter((item) => item.instalacion === nombreInstalacion && item.nombreversion === nombreVersion);
                                        promocionSeleccionada = promosfiltradas.find((item) => cantidadUsuarios >= item.cant_usu_minimo && cantidadUsuarios <= item.cant_usu_maximo);
                                        let importePlan = promocionSeleccionada.importe;
                                        totalPresupuesto = importePlan * cantidadUsuarios;
                                        existeError = false;
                                }
                                else {
                                        existeError = true;
                                        alert('Valor Incorrecto!');
                                }
                        } while (existeError && opcionVersion !== null)

                        alert(`La cotización obtenida es la siguiente: \n Versión: ${nombreVersion}\n Tipo de Instalación: ${nombreInstalacion}\n Cantidad de Usuarios: ${cantidadUsuarios}\n Costo Licencia: $${promocionSeleccionada.importe} \n Importe Presupuesto: $${totalPresupuesto}\n`);

                        do {
                                existeError = false;
                                salir = prompt('Desea realizar otra cotización? si/no');
                                if (salir === "") {
                                        alert('Valor Incorrecto!');
                                        existeError = true;
                                }
                                if (salir !== null) {
                                        salir = salir.toLowerCase();
                                }
                        } while (existeError && salir !== null)
                }
        } while (salir !== NO && salir !== null && opcionVersion !== null && opcionInstalacion !== null)
        alert(`Muchas gracias ${nombrecompleto} por visitarnos.`);
}
else
        alert(`Muchas gracias por visitarnos.`);




