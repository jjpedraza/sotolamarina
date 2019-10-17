/*
###############################################################################
BUSQUEDA DE PERSONAL. AYUNTAMIENTO SOTO LA MARINA, TAMAULIPAS.
ING. Juan Jose Pedraza Perales
###############################################################################
*/

//CONFIGURACION
var dominio = 'www.aldama.gob.mx/juanjo/'				//dominio desde el que se ejecuta el buscador
var extension = 'html'						//extension de las paginas del site (htm o html)
var pagina_buscador = '/juanjo/buscador.html/'	//ruta y nombre de la pagina de busqueda (con barra por delante)
var imagen_relevancia = 'punt'					//ruta y prefijo nombre de imagenes relevancia (punt_on.gif y punt_off.gif)
var tipo_fuente = 'Verdana, Arial, Serif'
var grosor_fuente = '400'
var color_fuente = '#483713'
var tamano_fuente = '0.7em'
var tamano_fuente_titulo = '1.1em'
var grosor_fuente_titulo = '600'
var color_fuente_titulo = '#A25151'
var color_fondo = '#FAFAF5'
var color_fuente_clave = '#FF0000'
var color_enlace = '#554B8B'
var grosor_enlace = '600'
var color_enlace_visitado = '#AD83B4'
var color_enlace_activo = '#DD0000'
var fondo_enlace_visitado = '#FFA4A4'
//FIN CONFIGURACION

//NO CAMBIES NADA A PARTIR DE AQUI SI NO SABES LO QUE HACES
caracter = new Object(5) 
caracter[0] = 'á'
caracter[1] = 'é'
caracter[2] = 'í'
caracter[3] = 'ó'
caracter[4] = 'ú'

caracter_nuevo = new Object(5)
caracter_nuevo[0] = 'a'
caracter_nuevo[1] = 'e'
caracter_nuevo[2] = 'i'
caracter_nuevo[3] = 'o'
caracter_nuevo[4] = 'u'

caracter_nuevo2 = new Object(5)
caracter_nuevo2[0] = '[áa]'
caracter_nuevo2[1] = '[ée]'
caracter_nuevo2[2] = '[íi]'
caracter_nuevo2[3] = '[óo]'
caracter_nuevo2[4] = '[úu]'

var totales		//numero de entradas encontradas
var Pagina = ''		//string que contendra la pagina a mostrar
var Entradas1 = ''
var Entradas2 = ''
var Entradas3 = ''
var Entradas4 = ''	//strings que van guardando las entrdas encontradas
var clave2		//palabra a buscar

//obtiene longitud de la base de datos
var longitud = BaseDatos.length

function IniciaPagina(FormBusqueda) {
	//crea la pagina a visualizar y la muestra

	//cabecera y apertura cuerpo
	Pagina ='<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">\n' +
		'<html><head>\n' +
		'<title>Resultados de la busqueda</title>\n' +
		'<meta HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=iso-8859-1">\n' +
		'<meta NAME="AUTHOR" CONTENT="Juan Jose Pedraza Perales">\n' +
		'<style type="text/css">\n' +
		'body {font-family: ' + tipo_fuente + '; font-weight: ' + grosor_fuente + '; color: ' + color_fuente + '; background-color: ' + color_fondo + '; }\n' +
		'.clave {color: ' + color_fuente_clave + ';}\n' +
		'a:link {color: ' + color_enlace + '; text-decoration: none; font-weight: ' + grosor_enlace + ';}\n' +
		'a:visited {color: ' + color_enlace_visitado + '; text-decoration: none; font-weight: ' + grosor_enlace + ';}\n' +
		'a:active {color: ' + color_enlace_activo + '; text-decoration: none; font-weight: ' + grosor_enlace + ';}\n' +
		'a:hover {color: ' + color_enlace + '; text-decoration: none;background: ' + fondo_enlace_visitado + '; font-weight: ' + grosor_enlace + ';}\n' +
		'td  { padding: 7px;  font-size: ' + tamano_fuente + '; vertical-align: top; }\n' +
		'table { margin-left: 50px; margin-right: 50px;}\n' +
		'h1 {margin-left: 25px; margin-right: 20px; font-size: ' + tamano_fuente_titulo + '; font-weight: ' + grosor_fuente_titulo + '; color: ' + color_fuente_titulo + ';}\n' +
		'p {margin-left: 25px; margin-right: 20px; font-size: ' + tamano_fuente + ';}\n' +
		'</style>\n' +
		'</head><body>\n' +
		'<h1>Resultados de la búsqueda</h1>\n'

	if (totales != 0)
		Pagina += '<p>Se han encontrado ' + totales + ' resultados que contienen la palabra <b class="clave">' + FormBusqueda.palabra.value + '</b>:</p>\n'
	else
		Pagina += '<p>No se han encontrado resultados para la palabra <b class="clave">' + FormBusqueda.palabra.value + '</b>.</p>\n'
}

function TerminaPagina() {

	//final cuerpo
	Pagina += '<p>&nbsp;</p><p><a href="http://' + dominio + pagina_buscador + '">Nueva búsqueda</a></p></body></html>\n' +
		  '<p>&nbsp;</p></body></html>\n'
}

function CreaEntradas(indice) {

	var CadenasEntrada
	var parciales = 0

	//divide la cadena de resultados en subcadenas y escribe los resultados
	CadenasEntrada = BaseDatos[indice].split(";")
	
	//recorre las subcadenas en busca de la clave, para asignar relevancia
	for (var n = 0; n < CadenasEntrada.length; n++) {
		if ( CadenasEntrada[n].search(clave2) != -1 ) {
			parciales++
		}
	}
	
	if ( parciales == 1 ) {
		Entradas1 += '<tr><td width="70">'
		Entradas1 += MuestraRelevancia( parciales )
		Entradas1 += '</td><td><a href="' + CadenasEntrada[0] + '.' + extension + '" target="_self">' + CadenasEntrada[1] + '</a>\n'
		Entradas1 += '<br>' + CadenasEntrada[2] + '</td></tr>\n'
	} else if ( parciales == 2 ) {
		Entradas2 += '<tr><td width="70">'
		Entradas2 += MuestraRelevancia( parciales )
		Entradas2 += '</td><td><a href="' + CadenasEntrada[0] + '.' + extension + '" target="_self">' + CadenasEntrada[1] + '</a>\n'
		Entradas2 += '<br>' + CadenasEntrada[2] + '</td></tr>\n'
	} else if ( parciales == 3 ) {
		Entradas3 += '<tr><td width="70">'
		Entradas3 += MuestraRelevancia( parciales )
		Entradas3 += '</td><td><a href="' + CadenasEntrada[0] + '.' + extension + '" target="_self">' + CadenasEntrada[1] + '</a>\n'
		Entradas3 += '<br>' + CadenasEntrada[2] + '</td></tr>\n'
	} else {
		Entradas4 += '<tr><td width="70">'
		Entradas4 += MuestraRelevancia( parciales )
		Entradas4 += '</td><td><a href="' + CadenasEntrada[0] + '.' + extension + '" target="_self">' + CadenasEntrada[1] + '</a>\n'
		Entradas4 += '<br>' + CadenasEntrada[2] + '</td></tr>\n'
	}
}

function MuestraPagina(Pagina) {
	//muestra el contenido del display
	window.document.open()
	window.document.write(Pagina)
	window.document.close()
}
	
function IniciaBuscador(FormBusqueda) {
	
	//inicia variables globales
	var desde = 0
	totales = 0
	
	//clave busqueda
	var palabraClave = document.forms["FormularioBusqueda"].palabra.value
	
	//detiene busqueda si palabra clave vacia
	if ( palabraClave == "" ) {
		alert("¡Introduzca cadena de búsqueda!")
		return
	}
	
	//elimina acentos
	var palabra_sin = elimina_especiales(palabraClave)
	
	//obtiene la expresion regular para la busqueda (global e ignorando case)
	clave2 = new RegExp(palabra_sin, "gi")

	//inicia variables locales
	var indice = -1
	
	//busca entrada de pagina que contenga la clave
	//recorre el array en busca de la palabra clave (en cualquier parte)
	for (x = 0; x < longitud; x++) {
		if ( BaseDatos[x].search(clave2) != -1 ) {
			CreaEntradas( x )
			totales++
		}
	}
	
	//escribe pagina de resultados
	IniciaPagina(FormBusqueda)
	Pagina += '<table width="80%">' + Entradas4 + Entradas3 + Entradas2 + Entradas1 + '</table>'
	TerminaPagina()

	//abre una ventana y escribe los resultados
	MuestraPagina(Pagina)
}

//SUSTITUYE TODAS LAS OCURRENCIAS DE UN CARACTER UNA CADENA POR OTRO CARACTER
function sustituye_caracter(cadena, caracter, nuevo_caracter) {
	var longitud, indice 
 	
  	longitud = cadena.length
  	indice = cadena.indexOf(caracter)
  	while ( (indice != -1) && (cadena.charAt(indice + 1) != ']') ) {
     		cadena = cadena.substring(0, indice) + nuevo_caracter + cadena.substring(indice + 1, longitud + 1)
      		indice = cadena.indexOf(caracter, indice)
      	}

	return cadena
}

//ELIMINA CARACTERES ESPECIALES
function elimina_especiales(cadena) {

	//elimina caracteres con acento
	for (x = 0; x < 5; x++) {
		cadena = sustituye_caracter(cadena, caracter[x], caracter_nuevo[x])
   	}
   	
	//sustituye las vocales por una expresion regular para ignorar los acentos
	for (x = 0; x < 5; x++) {
		cadena = sustituye_caracter(cadena, caracter_nuevo[x], caracter_nuevo2[x])
   	}   	
	
	return cadena
}

//MUESTRA IMAGENES DE RELEVANCIA
function MuestraRelevancia(relevancia) {

	var cadena_relevancia = ''
	
	for (var x = 0; x < relevancia; x++) cadena_relevancia += '<img src="' + imagen_relevancia + '_on.gif" width="15" height="16" border="0">'
 	for (var y = 0; y < 4 - relevancia; y++) cadena_relevancia += '<img src="' + imagen_relevancia + '_off.gif" width="15" height="16" border="0">'
 	
 	return cadena_relevancia 
}

//MUESTRA FORMULARIO DE BUSQUEDA
function MuestraBuscador() {
	document.write( '<form name="FormularioBusqueda">\n' +
		'<p><small>Palabra clave:</small><br>\n' +
		'<input type="text" name="palabra" size="25">\n' +
		'<input type="button" value="Buscar" name="buscar" onClick="IniciaBuscador(this.form)">\n' +
		'<input type="reset" value="Borrar" name="borrar"></p></form>\n'
	)
}

//MUESTRA ESTILOS
function MuestraEstilos() {
	document.write(	'<style type="text/css">\n' +
		'body {font-family: ' + tipo_fuente + '; font-weight: ' + grosor_fuente + '; color: ' + color_fuente + '; background-color: ' + color_fondo + '; }\n' +
		'.clave {color: ' + color_fuente_clave + ';}\n' +
		'a:link {color: ' + color_enlace + '; text-decoration: none; font-weight: ' + grosor_enlace + ';}\n' +
		'a:visited {color: ' + color_enlace_visitado + '; text-decoration: none; font-weight: ' + grosor_enlace + ';}\n' +
		'a:active {color: ' + color_enlace_activo + '; text-decoration: none; font-weight: ' + grosor_enlace + ';}\n' +
		'a:hover {color: ' + color_enlace + '; text-decoration: none;background: ' + fondo_enlace_visitado + '; font-weight: ' + grosor_enlace + ';}\n' +
		'td  { padding: 7px;  font-size: ' + tamano_fuente + '; vertical-align: top; }\n' +
		'table { margin-left: 5px; margin-right: 5px;}\n' +
		'h1 {margin-left: 2px; margin-right: 2px; font-size: ' + tamano_fuente_titulo + '; font-weight: ' + grosor_fuente_titulo + '; color: ' + color_fuente_titulo + ';}\n' +
		'p {margin-left: 2px; margin-right: 2px; font-size: ' + tamano_fuente + ';}\n' +
			'</style>\n' )

}
