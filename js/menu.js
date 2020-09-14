import { loadOn, chartJs } from "/js/myQuery.js";
const title = document.getElementById("tit");

const _ROUTE = "templates/";

var menuItem = document.querySelectorAll(".menu-item");

//carga inicial
firstLoad();

/*recorre de manera inicial todos los items del menu generando una 
funcion personalizada para cada uno de ellos*/
for (var i = 0; i < menuItem.length; i++) {
  menuItem[i].onclick = function (e) {
    var id = e.target.id;
    if (id) {
      id = id;
    } else {
      id = e.target.offsetParent.id;
    }
    var isActive = getId(id).classList.contains("active");
    if (!isActive) {
      removeClFromAll(menuItem, "active");
      getId(id).classList.add("active");
    }
    loadTo(id, _ROUTE + id + ".html", "#rq", "main");
    funcionOfFunctions(id);
  };
}

//funcion para cargar informacion de una pagina en otra
function loadTo(id, url, from, where) {
  var fromTemplate = new loadOn(url, from, where, true);
  fromTemplate.load();
  title.innerHTML = getId(id).innerHTML.toString();
}
//funcion de primera carga de la aplicacion
function firstLoad() {
  loadTo("tit", "templates/resumen.html", "#rq", "main");
  title.innerHTML = getId("resumen").innerHTML.toString();
  funcionOfFunctions("resumen");
}

function funcionOfFunctions(id) {
  switch (id) {
    case "resumen":
      optiChars(1);
      optiChars(2);
      optiChars(3);
      break;

    default:
      break;
  }
}
function optiChars(page) {
  switch (page) {
    case 1:
      setTimeout(() => {
        //createChart(id, type, data, beginAtZero, legend, verX, verY)
        createChart(
          "chartA", //lugar donde se hospeda el grafico
          "bar", //la forma que tiene el grafico
          "Data de los colores",
          "/json/data.json", //el lugar donde están los datos que se ve en el grafico
          true, //si quieres que comience en Cero el grafico
          true, //Si quieres que se vean las etiquetas o leyenda
          true, // Si quieres que no se ve el eje x
          true // Si quieres que no se vea el eje Y
        );
      }, 100); // 200 milisegundos
      break;
    case 2:
      setTimeout(() => {
        //createChart(id, type, data, beginAtZero, legend, verX, verY)
        createChart(
          "chartB", //lugar donde se hospeda el grafico
          "pie", //la forma que tiene el grafico
          "Data de los colores",
          "/json/data.json", //el lugar donde están los datos que se ve en el grafico
          true, //si quieres que comience en Cero el grafico
          true, //Si quieres que se vean las etiquetas o leyenda
          false, // Si quieres que no se ve el eje x
          false // Si quieres que no se vea el eje Y
        );
      }, 100); // 200 milisegundos
      break;
    case 3:
      setTimeout(() => {
        //createChart(id, type, data, beginAtZero, legend, verX, verY)
        createChart(
          "chartC", //lugar donde se hospeda el grafico
          "radar", //la forma que tiene el grafico
          "Data de los colores",
          "/json/data.json", //el lugar donde están los datos que se ve en el grafico
          true, //si quieres que comience en Cero el grafico
          true, //Si quieres que se vean las etiquetas o leyenda
          false, // Si quieres que no se ve el eje x
          false // Si quieres que no se vea el eje Y
        );
      }, 100); // 200 milisegundos
      break;

    default:
      break;
  }
}

const burguer = getId("burger");
const closeburguer = getId("close-burger");
var nav_burguer_btn = [burguer, closeburguer];
var darkDiv = getId("darker");
var darkB = false;
nav_burguer_btn.forEach((button) => {
  button.onclick = function (e) {
    var sidebar = getId("sidebar");
    toggleClass(darkDiv, "view-dr");
    toggleClass(sidebar, "visible-nb");
    toggleClass(burguer, "no-visible");
    toggleClass(closeburguer, "visible-btn");
  };
});

//
/*
* COMENTARIO GENERAL
! AVISO
? DUDA
Todo
@param parametro 
*/
//
//
//
//
//
//
//
//
//
//
//
//
//funcion que reemplaza al getelementbyid
function getId(id) {
  var id = document.getElementById(id);
  return id;
}
//funcion que reemplaza al getelementsbyclassname
function getClass(cla) {
  var cla = document.getElementsByClassName(cla);
  return cla;
}
//agregar a la lista de clases
function addClass(id, clase) {
  id.classList.add(clase);
}
//remover clases o clase
function removeClass(id, clase) {
  id.classList.remove(clase);
}
//cambiar clases por completo
function changeClass(id, clase) {
  id.className = clase;
}
//toggle class
function toggleClass(id, clase) {
  id.classList.toggle(clase);
}
//fucnion que remueve cierta clase de un grupo de items
function removeClFromAll(items, torem) {
  [].forEach.call(items, function (el) {
    el.classList.remove(torem);
  });
}
//funcion para dibujar los graficos estadisticos
function createChart(id, type, label, data, beginAtZero, legend, verX, verY) {
  var chart = new chartJs(
    id,
    type,
    label,
    data,
    beginAtZero,
    legend,
    verX,
    verY
  );
  chart.create();
}
