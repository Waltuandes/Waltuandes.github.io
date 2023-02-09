let recaptcha_response = "";
function verifyCaptcha(token) {
    recaptcha_response = token;
    document.getElementById("gRecaptchaError").innerHTML = "";
    
}

//busqueda filtro tabla
var busqueda = document.getElementById('buscar');


buscaTabla = function(){
  texto = busqueda.value.toLowerCase();
  var r=0;
  while(row = table.rows[r++])
  {
    if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
      row.style.display = null;
    else
      row.style.display = 'none';
  }
}

busqueda.addEventListener('keyup', buscaTabla);

// almacena el dato de la tabla en el input de proveedor
var tableSelector = document.getElementById("tabla"),rIndex;
for (var i = 0; i < table.rows.length; i++){
    table.rows[i].onclick = function()
    {
        rIndex = this.rowIndex;
        document.getElementById("inputProveedor").value = this.cells[0].innerHTML;
    }
}

// impide utilizar caracteres no alfanumericos
$().ready(function(){
    $("input#inputCentroCosto,input#inputProveedor").keyup(removeextra).blur(removeextra);
});
function removeextra() {
    var initVal = $(this).val();
    outputVal = initVal.replace(/[^0-9a-zA-Z]/g,"");       
    if (initVal != outputVal) {
        $(this).val(outputVal);
        // alert("Solo se permiten caracteres alfanuméricos");
    }
};

document.getElementById("myList").onchange = function() {
    setActiveStyleSheet(this.value);
    return false
 };
//formato clp
// $("#inputMonto").on({
//     "focus": function (event) {
//         $(event.target).select();
//     },
//     "keyup": function (event) {
//         $(event.target).val(function (index, value ) {
//             return value.replace(/\D/g, "")
//                         .replace(/([0-9])([0-9]{3})$/, '$1.$2')
//         });
//     }
// });
  let Form = document.querySelector('#formularioEstandar');
  let inputField = document.querySelector('#inputMonto');
  
  Form.addEventListener('focusout', (e) => {
    e.preventDefault();
  if(inputMonto !== "" && !inputMonto.value.isNaN){
    let Amount = inputField.value;
    let formatted = new Intl.NumberFormat("es-CL", {
      style: 'currency',
      currency: 'CLP'
    }).format(Amount);
  
    inputField.value = formatted;
  }
  
  })

$(document).ready(function(){

let buttonReload = document.getElementById("buttonReload");
let inputUnidadSolicitante = document.getElementById("inputUnidadSolicitante");
let alertUnidadSolicitante = document.getElementById("alertUnidadSolicitante");
let inputCentroCosto = document.getElementById("inputCentroCosto");
let alertCentroCosto = document.getElementById("alertCentroCosto");
let inputDescripcionTitulo = document.getElementById("inputDescripcionTitulo");
let alertDescripcionTitulo = document.getElementById("alertDescripcionTitulo");
let inputCantidadSolicitada = document.getElementById("inputCantidadSolicitada");
let alertCantidadSolicitada = document.getElementById("alertCantidadSolicitada");
let inputFechaEstimada = document.getElementById("inputFechaEstimada");
let alertFechaEstimada = document.getElementById("alertFechaEstimada");
let inputUsuarioSolicitante = document.getElementById("inputUsuarioSolicitante");
let alertUsuarioSolicitante = document.getElementById("alertUsuarioSolicitante");
let inputMonto = document.getElementById("inputMonto");
let inputProveedor = document.getElementById("inputProveedor");
let inputCatCompra = document.getElementById("inputCatCompra");
let inputSubCatCompra = document.getElementById("inputSubCatCompra");


let inputDescripcion = document.getElementById("inputDescripcion");
let alertDescripcion = document.getElementById("alertDescripcion");
let inputValidacionTecnica = document.getElementById("inputValidacionTecnica");
let alertValidacionTecnica = document.getElementById("alertValidacionTecnica");
let inputComentarios = document.getElementById("alertComentarios");

let inputArchivo = document.getElementById("inputArchivo");
let divFileParent_ = document.getElementById("divFileParent_");
let divResponse = document.getElementById("divResponse");
let gRecaptchaError = document.getElementById("gRecaptchaError");
let staticBackdrop = document.getElementById("staticBackdrop");

let inputRadioPresupuesto = document.getElementById("inputRadioPresupuesto");
let inputRadioCompraInmediata = document.getElementById("inputRadioCompraInmediata");
let inputRadioPresupuesto_ = "";
let inputRadioCompraInmediata_ = "";

let inputRadioFormularioEstandar = document.getElementById("inputRadioFormularioEstandar");
let inputRadioFormularioImpresosMerchandising = document.getElementById("inputRadioFormularioImpresosMerchandising");
let inputRadioFormularioLibros = document.getElementById("inputRadioFormularioLibros");
let inputRadioFormularioEstandar_ = "";
let inputRadioFormularioImpresosMerchandising_ = "";
let inputRadioFormularioLibros_ = "";


//Controlador de eventos
btnEnviar.addEventListener("click", validateAllInputsForm);
inputFile.addEventListener("change", showAddFile);
// inputRegion.addEventListener("change", showFecalertFechaEstimadaAccordingRegion);
inputCatCompra.addEventListener("change", showSubCatAccordingCat);


buttonReload.addEventListener("click", realoadFunction);

//Creación de patrones para evaluar diferencias con lo ingresado en los input
// const patronLetras = new RegExp("^[A-Z-\u00f1\u00d1 ÁÉÍÓÚ]+$", "i");
// const patronMail = new RegExp("^[A-Z 0-9@.]+$", "i");
 const patronMonto = new RegExp("^[0-9.]+$", "i");
// const patronRut = new RegExp("^[0-9kK]+$", "i");
 const patronNum = new RegExp("^[0-9]+$", "i");

//función que crea un valor random para ID (no necesario)
function createRandom(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function validateAllInputsForm(){

     if(validateInput()){
        $("#buttonSpinner").show();
        $("#btnEnviar").hide();
        createFormData();
     }
     else{

     }
}


//función que valida que los valor de los input tengan estructura correcta.
function validateInput(){

    let booleanUnidadSolicitante = false;
    let booleanCentroCosto = false;
    let booleanDescripcionTitulo = false;
    let booleanCantidadSolicitada = false;
    let booleanFechaEstimada = false;
    let booleanValidacionTecnica = false;
    let booleanMonto = false;
    let booleanProveedor = false;
    let booleanUsuarioSolicitante = false;
    let booleanFile = false;
    let booleanReCAPTCHA = false;

    //While's para restringir duplicidad de mensajes
    while (alertUnidadSolicitante.firstChild) {
        alertUnidadSolicitante.removeChild(alertUnidadSolicitante.firstChild);
      }
    while (alertCentroCosto.firstChild) {
        alertCentroCosto.removeChild(alertCentroCosto.firstChild);
    }
    while (alertDescripcionTitulo.firstChild) {
        alertDescripcionTitulo.removeChild(alertDescripcionTitulo.firstChild);
    }
    while (alertCantidadSolicitada.firstChild) {
        alertCantidadSolicitada.removeChild(alertCantidadSolicitada.firstChild);
    }
    while (alertFechaEstimada.firstChild) {
        alertFechaEstimada.removeChild(alertFechaEstimada.firstChild);
    }
    while (alertDescripcion.firstChild) {
        alertDescripcion.removeChild(alertDescripcion.firstChild);
    }
    while (alertMonto.firstChild) {
        alertMonto.removeChild(alertMonto.firstChild);
    }
    while (alertUsuarioSolicitante.firstChild) {
        alertUsuarioSolicitante.removeChild(alertUsuarioSolicitante.firstChild);
    }
    while (alertValidacionTecnica.firstChild) {
        alertValidacionTecnica.removeChild(alertValidacionTecnica.firstChild);
    }
    while (gRecaptchaError.firstChild) {
        gRecaptchaError.removeChild(gRecaptchaError.firstChild);
    }
    
    //unidad solicitante
    if(inputUnidadSolicitante.value == ""){
        $("#alertUnidadSolicitante").append(`<span id="font-validation-alert">Unidad solicitante es obligatorio</span>`);
    }
    else{
        $("#alertUnidadSolicitante").append(`<span id="font-validation-ok">¡Correcto!</span>`);
        booleanUnidadSolicitante = true;
    }

    //Centro costo, deben ser minimo 10 y maximo 10
    if(inputCentroCosto.value == ""){
        $("#alertCentroCosto").append(`<span id="font-validation-alert">Centro de Costo es obligatorio</span>`);
    }
    else{
        if (inputCentroCosto.value.length < 10){
            $("#alertCentroCosto").append(`<span id="font-validation-alert">Centro de Costo debe contener al menos 10 caracteres</span>`);
        } else {
        $("#alertCentroCosto").append(`<span id="font-validation-ok">¡Correcto!</span>`);
        booleanCentroCosto = true;
        }
    }

    //descripcion o titulo
    if(inputDescripcionTitulo.value == ""){
        $("#alertDescripcionTitulo").append(`<span id="font-validation-alert">Descripción o título es obligatorio</span>`);
    }
    else{
        $("#alertDescripcionTitulo").append(`<span id="font-validation-ok">¡Correcto!</span>`);
        booleanDescripcionTitulo = true;
    }

    //cantidad solicitada
    if(inputCantidadSolicitada.value == ""){
        $("#alertCantidadSolicitada").append(`<span id="font-validation-alert">Cantidad solicitada es obligatoria</span>`);
    }
    else{
        if(!patronNum.test(inputCantidadSolicitada.value)){
            $("#alertCantidadSolicitada").append(`<span id="font-validation-alert">Cantidad admite solo números</span>`);
        }
        else{
        $("#alertCantidadSolicitada").append(`<span id="font-validation-ok">¡Correcto!</span>`);
        booleanCantidadSolicitada = true; 
        }   
    }

    //fecha estimada de entrega
    if(inputFechaEstimada.value == ""){
        $("#alertFechaEstimada").append(`<span id="font-validation-alert">Fecha estimada es obligatoria</span>`);
    }
    else{
        $("#alertFechaEstimada").append(`<span id="font-validation-ok">¡Correcto!</span>`);
        booleanFechaEstimada = true;

    }

    //Monto
    if(!patronMonto.test(inputMonto.value) && inputMonto.value !== ""){
        $("#alertMonto").append(`<span id="font-validation-alert">Monto admite solo admite este formato (Ej:$100.000)</span>`);
    }
    else{
    $("#alertMonto").append(`<span id="font-validation-ok">¡Correcto!</span>`);
    booleanMonto = true; 
    }   

    //Descripcion detallada
    if(inputDescripcion.value == ""){
        $("#alertDescripcion").append(`<span id="font-validation-alert">Descripción detallada es obligatoria</span>`);
    }
    else{
         $("#alertCiudad").append(`<span id="font-validation-ok">¡Correcto!</span>`);
         booleanCiudad = true;
    }

    //Usuario solicitante
    if(inputUsuarioSolicitante.value == ""){
        $("#alertUsuarioSolicitante").append(`<span id="font-validation-alert">Usuario solicitante es obligatorio</span>`);
    }
    else{
         $("#alertUsuarioSolicitante").append(`<span id="font-validation-ok">¡Correcto!</span>`);
         booleanUsuarioSolicitante = true;
    }

    //Validacion tecnica
    if(inputValidacionTecnica.value == ""){
        $("#alertValidacionTecnica").append(`<span id="font-validation-alert">Validación técnica es obligatoria</span>`);
    }
    else{
        $("#alertValidacionTecnica").append(`<span id="font-validation-ok">¡Correcto!</span>`);
        booleanValidacionTecnica = true;
    }

    // //file
    // if(inputFile.value == ""){
    //     $("#alertFile").append(`<span id="font-validation-alert">Se deben adjuntar elementos</span>`);
    // }
    // else{
    //         booleanFile = true;
    // }

    //reCAPTCHA
    if(recaptcha_response.length == 0) {
        $("#gRecaptchaError").append(`<span id="font-validation-alert">El campo es obligatorio</span>`)
    }
    else{
        booleanReCAPTCHA = true;
    }
   
    //Evaluar si los input están completados correctamente.
    if(booleanUnidadSolicitante && booleanCentroCosto && booleanUsuarioSolicitante && booleanDescripcionTitulo && booleanCantidadSolicitada && booleanFechaEstimada && booleanValidacionTecnica && booleanMonto && booleanProveedor && booleanReCAPTCHA){
        return true;
    }
    else{
        if(!booleanUsuarioSolicitante){
            inputUsuarioSolicitante.focus();
            return false;
        }
        if(!booleanUnidadSolicitante){
            inputUnidadSolicitante.focus();
            return false;
        }
        if(!booleanCentroCosto){
            inputCentroCosto.focus();
            return false;
        }
        if(!booleanDescripcionTitulo){
            inputDescripcionTitulo.focus();
            return false;
        }
        if(!booleanCantidadSolicitada){
            inputCantidadSolicitada.focus();
            return false;
        }
        if(!booleanFechaEstimada){
            inputFechaEstimada.focus();
            return false;
        }
        if(!booleanValidacionTecnica){
            inputValidacionTecnica.focus();
            return false;
        }
        if(!booleanMonto){
            inputMonto.focus();
            return false;
        }
        if(!booleanProveedor){
            inputProveedor.focus();
            return false;
        }
        // if(!booleanFile){
        //     inputFile.focus();
        //     return false;
        // }
        if(!booleanReCAPTCHA){
            return false;
        }
    }
}

//función FormData con los valores de cada imput.
//función con Fetch que envía los datos a servicio de PowerAutomate
function createFormData(){

    let random = [];

    random.push(createRandom(1000000,9999999));

    if(inputRadioCompraInmediata.checked){
        inputRadioCompraInmediata_ = "Compra inmediata";
    }
    else{
        inputRadioCompraInmediata_ = "-";
    }

    if(inputRadioPresupuesto.checked){
        inputRadioPresupuesto_ = "Presupuesto";
    }
    else{
        inputRadioPresupuesto = "-";
    }

    if(inputRadioFormularioEstandar.checked){
        inputRadioFormularioEstandar_ = "Solicitud Estándar";
    }
    else{
        inputRadioFormularioEstandar = "-";
    }

    if(inputRadioFormularioImpresosMerchandising.checked){
        inputRadioFormularioImpresosMerchandising_ = "Impresos y Merchandising";
    }
    else{
        inputRadioFormularioImpresosMerchandising = "-";
    }

    if(inputRadioFormularioLibros.checked){
        inputRadioFormularioLibros_ = "Solicitud de Libros";
    }
    else{
        inputRadioFormularioLibros = "-";
    }

    const formData = new FormData();

    formData.append("idSolicitud", random[0]); //0
    formData.append("UnidadSolicitante", inputUnidadSolicitante.value); //1
    formData.append("CentroCosto", inputCentroCosto.value); //2
    formData.append("DescripcionTitulo", inputDescripcionTitulo.value); //3
    formData.append("CantidadSolicitada", inputCantidadSolicitada.value); //4
    formData.append("FechaEstimada", inputFechaEstimada.value); //5
    formData.append("Monto", inputMonto.value); //6
    formData.append("Proveedor", inputProveedor.value); //7
    formData.append("CompraInmediata", inputRadioCompraInmediata_.value); //8
    formData.append("Presupuesto", inputRadioPresupuesto_.value); //9
    formData.append("Comentarios", inputComentarios.value); //10
    formData.append("UsuarioSolicitante", inputUsuarioSolicitante.value); //11
    formData.append("SolicitudEstandar", inputRadioFormularioEstandar_.value); //12
    formData.append("ImpresosMerchandising", inputRadioFormularioImpresosMerchandising_.value); //13
    formData.append("SolicitudLibros", inputRadioFormularioLibros_.value); //14

    for (i=0; i < inputFile.files.length; i++){
        formData.append(`namefile_${i+1}`, inputFile.files[i].name); //15
        formData.append(`file_${i+1}`, inputFile.files[i]); //16
    }

    // URL = "https://prod-124.westus.logic.azure.com:443/workflows/d3450d4b77154d02a033b169eacc1f95/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=aZvBwtqlN2VV779TaPxFVx2JlU2NzIPIEOeaapMU5jU";

    fetch(URL, {
        method: "POST",
        body: formData,

    }).then(response => {
            return response.json();
    }).then(data => {
        console.log(data);
        $("#buttonSpinner").hide();
        $("#btnEnviar").show();
        $("#divResponse").append(`<div class="pb-3">Estimado Proveedor: </div>`);
        $("#divResponse").append(`<div>Por medio de la presente se informa que se envió correctamente el formulario a la Subdirección de abastecimiento de la Universidad de los Andes. </div>`);
        $("#divResponse").append(`<div class="pt-1">Pronto será notificado cuando esté aprobado dicho formulario e inscripción.</div>`);
        $("#divResponse").append(`<div class="pt-3">Saludos Cordiales.</div>`);
        $("#divResponse").append(`<div class="pt-2 d-flex justify-content-center img-background-logo-uandes"> <img width="250px" src="./public/img/marca_principal.png" alt=""> </div>`);
        $("#staticBackdrop").modal("toggle");
    }).catch(err => {
        console.error("ERROR: ", err.message);
        $("#buttonSpinner").hide();
        $("#btnEnviar").show();
        $("#divResponse").append(`<div class="alert alert-warning" role="alert"> ERROR: ${err.message}</div>`);
        $("#staticBackdrop").modal("toggle");
    });
    
}


function realoadFunction(){
    location.reload();
}

//visualizar nombre de archivos files agregados.
function showAddFile(){
    while (divFileParent_.firstChild) {
        divFileParent_.removeChild(divFileParent_.firstChild);
      }
    
      if(inputFile.files.length){
        while (alertFile.firstChild) {
            alertFile.removeChild(alertFile.firstChild);
          }
      }

    for (let i=0; i < inputFile.files.length; i++) {
        $("#divFileParent_").append(`<div class="mt-2 form-text bi bi-file-earmark-check"><span id="font"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-check" viewBox="0 0 16 16"><path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/><path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/></svg>Archivo ${i+1} : "${inputFile.files[i].name}"</span></div>`);
    }
}

function showSubCatAccordingCat(){

    while (inputSubCatCompra.firstChild) {
        inputSubCatCompra.removeChild(inputSubCatCompra.firstChild);
    }

    $("#inputSubCatCompra").append(`<option selected value="">Seleccion SubCategoría</option>`);

    if(inputCatCompra.value == "Arriendos"){
        $("#inputSubCatCompra").append(`<option value="Arr. de Bienes Inmue">Arr. de Bienes Inmue</option>`);
        $("#inputSubCatCompra").append(`<option value="Arr. de Bienes Muebl">Arr. de Bienes Muebl</option>`);
        $("#inputSubCatCompra").append(`<option value="Arriendo Equipos e I">Arriendo Equipos e I</option>`);
        $("#inputSubCatCompra").append(`<option value="Arriendos">Arriendos</option>`);
    }

    if(inputCatCompra.value == "Bases de Datos y Suscripciones"){
        $("#inputSubCatCompra").append(`<option value="B.de datos Académica">B.de datos Académica</option>`);
        $("#inputSubCatCompra").append(`<option value="Base de datos Comerc">Base de datos Comerc</option>`);
        $("#inputSubCatCompra").append(`<option value="Membresia">Membresia</option>`);
        $("#inputSubCatCompra").append(`<option value="Suscrip Diarios y re">Suscrip Diarios y re</option>`);
        $("#inputSubCatCompra").append(`<option value="Suscrip. Académicas">Suscrip. Académicas</option>`);        
    }

    if(inputCatCompra.value == "Campos Clínicos"){
        $("#inputSubCatCompra").append(`<option value="Campos Clinicos">Campos Clinicos</option>`);
    }

    if(inputCatCompra.value == "Certificación"){
        $("#inputSubCatCompra").append(`<option value="Certificación">Certificación</option>`);
    }

    if(inputCatCompra.value == "Consultoría"){
        $("#inputSubCatCompra").append(`<option value="Consultorias">Consultorias</option>`);
        $("#inputSubCatCompra").append(`<option value="Diseño">Diseño</option>`);
        $("#inputSubCatCompra").append(`<option value="Estudios de Mercado">Estudios de Mercado</option>`);
        $("#inputSubCatCompra").append(`<option value="Interpretes y Traduc">Interpretes y Traduc</option>`);
        $("#inputSubCatCompra").append(`<option value="Legales">Legales</option>`);
        $("#inputSubCatCompra").append(`<option value="Serv Invest. y desar">Serv Invest. y desar</option>`);
    }

    if(inputCatCompra.value == "Correspondencia y Traslados"){
        $("#inputSubCatCompra").append(`<option value="Correo y Envío de Co">Correo y Envío de Co</option>`);
        $("#inputSubCatCompra").append(`<option value="Fletes y Traslados">Fletes y Traslados</option>`);
        $("#inputSubCatCompra").append(`<option value="Movilización Persona">Movilización Persona</option>`);
    }

    if(inputCatCompra.value == "Eventos"){
        $("#inputSubCatCompra").append(`<option value="Auspicios Eventos">Auspicios Eventos</option>`);
        $("#inputSubCatCompra").append(`<option value="Eventos y Celebracio">Eventos y Celebracio</option>`);    
    }

    if(inputCatCompra.value == "Gastos de Promoción y Publicidad"){
        $("#inputSubCatCompra").append(`<option value="Asesorias Publicitar">Asesorias Publicitar</option>`);
        $("#inputSubCatCompra").append(`<option value="Publicidad">Publicidad</option>`);   
    }

    if(inputCatCompra.value == "Gastos de Viaje y Representación"){
        $("#inputSubCatCompra").append(`<option value="Alojamiento, Viático">Alojamiento, Viático</option>`);
        $("#inputSubCatCompra").append(`<option value="Pasajes (Participaci">Pasajes (Participaci</option>`);      
    }

    if(inputCatCompra.value == "Impresos"){
        $("#inputSubCatCompra").append(`<option value="Central de Apuntes">Central de Apuntes</option>`);
        $("#inputSubCatCompra").append(`<option value="Folletos">Folletos</option>`);
        $("#inputSubCatCompra").append(`<option value="Fotocopias y servici">Fotocopias y servici</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicio de Empaste">Servicio de Empaste</option>`);       
    }

    if(inputCatCompra.value == "Insumos Administrativos"){
        $("#inputSubCatCompra").append(`<option value="Accesorios de Lumina">Accesorios de Lumina</option>`);
        $("#inputSubCatCompra").append(`<option value="Ferreteria">Ferreteria</option>`);
        $("#inputSubCatCompra").append(`<option value="Insumos de Aseo">Insumos de Aseo</option>`);
        $("#inputSubCatCompra").append(`<option value="Insumos Generales">Insumos Generales</option>`);
        $("#inputSubCatCompra").append(`<option value="Materiales Oficina">Materiales Oficina</option>`);
        $("#inputSubCatCompra").append(`<option value="Víveres y Comestible">Víveres y Comestible</option>`); 
    }

    if(inputCatCompra.value == "Insumos Carreras Salud y Laboratorios"){
        $("#inputSubCatCompra").append(`<option value="Fármacos y materiale">Fármacos y materiale</option>`);
        $("#inputSubCatCompra").append(`<option value="Insumo para ensayo C">Insumo para ensayo C</option>`);
        $("#inputSubCatCompra").append(`<option value="Insumos Laboratorios">Insumos Laboratorios</option>`);
        $("#inputSubCatCompra").append(`<option value="Material de Docencia">Material de Docencia</option>`);
        $("#inputSubCatCompra").append(`<option value="Material de Investig">Material de Investig</option>`);
        $("#inputSubCatCompra").append(`<option value="Materiales Clinicos">Materiales Clinicos</option>`);
        $("#inputSubCatCompra").append(`<option value="Materiales Odontolog">Materiales Odontolog</option>`);
        $("#inputSubCatCompra").append(`<option value="Reactivos">Reactivos</option>`);
        $("#inputSubCatCompra").append(`<option value="Reactivos y Material">Reactivos y Material</option>`);
    }

    if(inputCatCompra.value == "Insumos Promoción y Publicidad"){
        $("#inputSubCatCompra").append(`<option value="Gasto Artículos Prom">Gasto Artículos Prom</option>`);
        $("#inputSubCatCompra").append(`<option value="Materiales y Artícul">Materiales y Artícul</option>`);
        $("#inputSubCatCompra").append(`<option value="Regalos Corporativos">Regalos Corporativos</option>`);
    }

    if(inputCatCompra.value == "Mantención Preventiva y Correctiva"){
        $("#inputSubCatCompra").append(`<option value="Mant  Equipos comuni">Mant  Equipos comuni</option>`);
        $("#inputSubCatCompra").append(`<option value="Mant Bombas y estanq">Mant Bombas y estanq</option>`);
        $("#inputSubCatCompra").append(`<option value="Mant Equipos Audiovi">Mant Equipos Audiovi</option>`);
        $("#inputSubCatCompra").append(`<option value="Mant Equipos segurid">Mant Equipos segurid</option>`);
        $("#inputSubCatCompra").append(`<option value="Mant. Equip. y Mobil">Mant. Equip. y Mobil</option>`);
        $("#inputSubCatCompra").append(`<option value="Mant. Instrumentos M">Mant. Instrumentos M</option>`);
        $("#inputSubCatCompra").append(`<option value="Mant. Redes de Gas">Mant. Redes de Gas</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantde Equipo de Lab">Mantde Equipo de Lab</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención de Aire A">Mantención de Aire A</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención de Ascens">Mantención de Ascens</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención de Calder">Mantención de Calder</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención de Camara">Mantención de Camara</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención de Ductos">Mantención de Ductos</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención de Edific">Mantención de Edific</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención de Electr">Mantención de Electr</option>`);
        $("#inputSubCatCompra").append(`<option value="Mantención y Reparac">Mantención y Reparac</option>`);
        $("#inputSubCatCompra").append(`<option value="Manutención Sanitari">Manutención Sanitari</option>`);    
    }

    if(inputCatCompra.value == "Materiales no Productivos"){
        $("#inputSubCatCompra").append(`<option value="Caja de navidad">Caja de navidad</option>`);
        $("#inputSubCatCompra").append(`<option value="Carnet Universitario">Carnet Universitario</option>`);
        $("#inputSubCatCompra").append(`<option value="Materiales de Manten">Materiales de Manten</option>`);
        $("#inputSubCatCompra").append(`<option value="Pase escolar">Pase escolar</option>`);
        $("#inputSubCatCompra").append(`<option value="Regalos Recien Nacid">Regalos Recien Nacid</option>`);
        $("#inputSubCatCompra").append(`<option value="Reposicion de Mantel">Reposicion de Mantel</option>`);
        $("#inputSubCatCompra").append(`<option value="Señaleticas">Señaleticas</option>`);    
    }

    if(inputCatCompra.value == "Medicina"){
        $("#inputSubCatCompra").append(`<option value="Part médicas consult">Part médicas consult</option>`);
    }

    if(inputCatCompra.value == "Otra"){
        $("#inputSubCatCompra").append(`<option value="Otro">Otro</option>`);
    }

    if(inputCatCompra.value == "Presencia en Medios"){
        $("#inputSubCatCompra").append(`<option value="Presencia en Medios">Presencia en Medios</option>`);
    }

    if(inputCatCompra.value == "Seguro"){
        $("#inputSubCatCompra").append(`<option value="Seguro Vida y Salud">Seguro Vida y Salud</option>`);
        $("#inputSubCatCompra").append(`<option value="Seguros Todo Riesgo y RC">Seguros Todo Riesgo y RC</option>`);
    }

    if(inputCatCompra.value == "Seminarios"){
        $("#inputSubCatCompra").append(`<option value="Seminarios Residenci">Seminarios Residenci</option>`);
    }

    if(inputCatCompra.value == "Servicios Básicos"){
        $("#inputSubCatCompra").append(`<option value="Agua">Agua</option>`);
        $("#inputSubCatCompra").append(`<option value="Combustible">Combustible</option>`);
        $("#inputSubCatCompra").append(`<option value="Gas">Gas</option>`);
        $("#inputSubCatCompra").append(`<option value="Luz">Luz</option>`);
        $("#inputSubCatCompra").append(`<option value="Telefonía (Residenci">Telefonía (Residenci</option>`);        
    }

    if(inputCatCompra.value == "Servicios de Alimentación"){
        $("#inputSubCatCompra").append(`<option value="Almuerzo Personal">Almuerzo Personal</option>`);
        $("#inputSubCatCompra").append(`<option value="Ceremonia de Titulac">Ceremonia de Titulac</option>`);
        $("#inputSubCatCompra").append(`<option value="Serv Alimentacion">Serv Alimentacion</option>`);         
    }

    if(inputCatCompra.value == "Servicios e Infraestructura Tecnológica"){
        $("#inputSubCatCompra").append(`<option value="Adm y soporte Red">Adm y soporte Red</option>`);
        $("#inputSubCatCompra").append(`<option value="Internet">Internet</option>`);
        $("#inputSubCatCompra").append(`<option value="Leasing Computaciona">Leasing Computaciona</option>`);
        $("#inputSubCatCompra").append(`<option value="Licencias de SW">Licencias de SW</option>`);
        $("#inputSubCatCompra").append(`<option value="Seguridad Informátic">Seguridad Informátic</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicio Enlace Dedi">Servicio Enlace Dedi</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicios Outsorcing">Servicios Outsorcing</option>`);
        $("#inputSubCatCompra").append(`<option value="Soporte y Mant Aplic">Soporte y Mant Aplic</option>`);
        $("#inputSubCatCompra").append(`<option value="Soporte y Mant hardw">Soporte y Mant hardw</option>`);   
    }

    if(inputCatCompra.value == "Servicios Externos"){
        $("#inputSubCatCompra").append(`<option value="Fotografia">Fotografia</option>`);
        $("#inputSubCatCompra").append(`<option value="Gastos de Vehículos">Gastos de Vehículos</option>`);
        $("#inputSubCatCompra").append(`<option value="Sala Cuna">Sala Cuna</option>`);
        $("#inputSubCatCompra").append(`<option value="Serv.búsqueda y Sele">Serv.búsqueda y Sele</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicios de Desinfe">Servicios de Desinfe</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicios de Digitac">Servicios de Digitac</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicios Esteriliza">Servicios Esteriliza</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicios Lavandería">Servicios Lavandería</option>`); 
    }

    if(inputCatCompra.value == "Servicios Financieros"){
        $("#inputSubCatCompra").append(`<option value="Servicio Cobranza">Servicio Cobranza</option>`);
    }

    if(inputCatCompra.value == "Servicios Operación Campus"){
        $("#inputSubCatCompra").append(`<option value="Aseo">Aseo</option>`);
        $("#inputSubCatCompra").append(`<option value="Jardines y Paisajism">Jardines y Paisajism</option>`);
        $("#inputSubCatCompra").append(`<option value="Seguridad">Seguridad</option>`);
        $("#inputSubCatCompra").append(`<option value="Servicio de Aseos Ex">Servicio de Aseos Ex</option>`);
    }

    if(inputCatCompra.value == "Transporte de Personas"){
        $("#inputSubCatCompra").append(`<option value="Servicios de Moviliz">Servicios de Moviliz</option>`);
    }

    if(inputCatCompra.value == "Traslado de Basura"){
        $("#inputSubCatCompra").append(`<option value="Traslado de Basura">Traslado de Basura</option>`);
    }

    if(inputCatCompra.value == "Uniformes"){
        $("#inputSubCatCompra").append(`<option value="Uniformes Auxiliares">Uniformes Auxiliares</option>`);
    }

}


});