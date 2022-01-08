/**
 * Una inmobiliaria de una ciudad maneja una lista de inmuebles como la siguiente:

let inmobiliarias = [
  {año: 2000, metros: 100, habitaciones: 3, garaje: true, zona: 'A'},
  {año: 2012, metros: 60, habitaciones: 2, garaje: true, zona: 'B'},
  {año: 1980, metros: 120, habitaciones: 4, garaje: false, zona: 'A'},
  {año: 2005, metros: 75, habitaciones: 3, garaje: true, zona: 'B'},
  {año: 2015, metros: 90, habitaciones: 2, garaje: false, zona: 'A'}
];

Construir una función que permita hacer búsqueda de inmuebles en función de un presupuesto dado.

La función recibirá como entrada la lista de inmuebles y un precio,
y devolverá otra lista con los inmuebles cuyo precio sea menor o igual que el dado.

Los inmuebles de la lista que se devuelva deben incorporar un nuevo par a cada objeto con el precio del inmueble,
donde el precio de un inmueble se calcula con las siguiente fórmula en función de la zona:

Zona A: precio = (metros * 1000 + habitaciones * 5000 + garaje * 15000) * (1-año/100)

Zona B: precio = (metros * 1000 + habitaciones * 5000 + garaje * 15000) * (1-año/100) * 1.5
 */

let inmobiliarias = [
	{ id: 1, anio: 2000, metros: 100, habitaciones: 3, garaje: true, zona: 'A' },
	{ id: 2, anio: 2012, metros: 60, habitaciones: 2, garaje: true, zona: 'B' },
	{ id: 3, anio: 1980, metros: 120, habitaciones: 4, garaje: false, zona: 'A' },
	{ id: 4, anio: 2005, metros: 75, habitaciones: 3, garaje: true, zona: 'B' },
	{ id: 5, anio: 2015, metros: 90, habitaciones: 2, garaje: false, zona: 'A' },
  ];
  
  function buscarInmuebles(listaInmuebles, presupuesto) {
	let inmueblesPresupuesto = [];
  
	for (let i = 0; i < listaInmuebles.length; i++) {
	  let inmuebleActual = listaInmuebles[i];
	  let precioInmuebleActual = calcularPrecioInmueble(inmuebleActual);
	  inmuebleActual.precio = precioInmuebleActual;
  
	  if (precioInmuebleActual <= presupuesto) {
		inmueblesPresupuesto.push(inmuebleActual);
	  }
	}
	return inmueblesPresupuesto;
  }
  
  function calcularPrecioInmueble(inmueble) {
	let precio = 0;
	let { anio, metros, habitaciones, garaje, zona } = inmueble;
  
	if (zona === 'A') {
	  precio =
		(metros * 1000 + habitaciones * 5000 + garaje * 15000) * (anio / 100 - 1);
	}
  
	if (zona === 'B') {
	  precio =
		(metros * 1000 + habitaciones * 5000 + garaje * 15000) *
		(anio / 100 - 1) *
		1.5;
	}
	return precio;
  }
  function crearVivienda(anio, metros, habitaciones, zona, garaje) {
	let id = inmobiliarias.length + 1;
	let vivienda = {
	  id,
	  anio,
	  metros,
	  garaje,
	  habitaciones,
	  zona,
	  
	};
	inmobiliarias.push(vivienda);
  }
  function buscarVivienda(anio) {
	let vivienda = null;
	for (let i = 0; i < inmobiliarias.length; i++) {
	  let viviendaActual = inmobiliarias[i];
  
	  if (viviendaActual.anio === anio) {
		vivienda = viviendaActual;
		break;
	  }
	}
  
	return vivienda;
  }
  function borrarVivienda(id) {
	
	for (let i = 0; i < inmobiliarias.length; i++) {
	  if (inmobiliarias[i].id === id) {
		inmobiliarias.splice(i, 1);
	  }
	}
	listarViviendas()
  }

  let tablaListadoViviendas = document.getElementById('listado-viviendas')

  function listarViviendas() {
	let filasTabla=''
	for (let i = 0; i < inmobiliarias.length; i++) {
		let{id, anio, metros, habitaciones, garaje, zona }=inmobiliarias[i]
		filasTabla +=`
		<tr>
			<th scope="row">${id}</th>
			<td>${anio}</td>
			<td>${metros}</td>
			<td>${habitaciones}</td>
			<td>${
				garaje ? "<span class='badge rounded-pill bg-success'>SI</span>" : "<span class='badge rounded-pill bg-danger'>NO</span>"
			}</td>
			<td>${zona}</td>
			<td>
			<button type="button" class="btn btn-outline-secondary btn-sm" onclick="actualizarVivienda(${id})">Editar</button>
			<button type="button" class="btn btn-outline-warning btn-sm" onclick=borrarVivienda(${id})>Eliminar</button>
			</td>
				
		 </tr>
		`
		
	}
	tablaListadoViviendas.innerHTML= filasTabla;
}


function editarViviendas(id,nuevoAnio , nuevoMetros, nuevaHabitaciones, nuevaZona, nuevoGarage){
for (let i = 0; i < inmobiliarias.length; i++) {
	if (inmobiliarias[i].id === id) {
		inmobiliarias[i].anio=nuevoAnio;
		inmobiliarias[i].metros=nuevoMetros
		inmobiliarias[i].habitaciones=nuevaHabitaciones;
		inmobiliarias[i].zona=nuevaZona
		inmobiliarias[i].garaje=nuevoGarage

	}
	
}

}

//integracion crear vivienda 
let btnCrearVivienda = document.getElementById('btnCrearVivienda')

btnCrearVivienda.addEventListener('click',function(e){
let crearViviendaFormulario = document.getElementById('crear-vivienda')
let{anio, metros, habitaciones, zona, garaje}=crearViviendaFormulario.elements

crearVivienda(anio.value, metros.value, habitaciones.value, zona.value, garaje.checked)


listarViviendas()
});


function actualizarVivienda(id){
	let anio = prompt('Ingrese el año de construccion de la vivienda');
	let metros = prompt('Ingrese los metros de la vivienda')
	let habitaciones=prompt('Ingrese las habitaciones')
	let zona=prompt('Zona A o B?')
	let garaje=prompt('Tiene garaje? S o N')
	if (garaje==='s') {
		garaje=true
	}else if (garaje==='n'){
		garaje=false
	}
	editarViviendas(id, anio, metros, habitaciones, zona, garaje)
	listarViviendas()
}





  