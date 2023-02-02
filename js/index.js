let recaptcha_response = "";
function verifyCaptcha(token) {
    recaptcha_response = token;
    document.getElementById("gRecaptchaError").innerHTML = "";
    
}

//busqueda filtro tabla
var busqueda = document.getElementById('buscar');
var table = document.getElementById("tabla").tBodies[0];

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
// inputCatCompra.addEventListener("change", showSubCatAccordingCat);

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



});