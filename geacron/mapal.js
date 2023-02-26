var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};


// Funciones de mapa

function setlayers(tmw){


               map = new OpenLayers.Map('map', options);

               var mio =new OpenLayers.Layer.TMS(etiq[6],
                         "http://",
                         { 'getURL':get_my_url, displayOutsideMaxExtent: true ,  wrapDateLine: true, transitionEffect: 'resize' });

               var plano =new OpenLayers.Layer.TMS(etiq[5],
                         "http://",
                         {'getURL':get_my_urlplano, displayOutsideMaxExtent: true,  wrapDateLine: true, transitionEffect: 'resize'  });

             // var mosm = new OpenLayers.Layer.OSM();

var mosm = new OpenLayers.Layer.OSM("OpenStreetMap",
  ["https://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
   "https://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
   "https://c.tile.openstreetmap.org/${z}/${x}/${y}.png"]);


/*
              var gmap = new OpenLayers.Layer.Google(
               "Google Physical",
               {type: google.maps.MapTypeId.TERRAIN, numZoomLevels:7}
              );
*/
               if (tmw == "p") { map.addLayers([ plano, mio]) } else { map.addLayers([mio, plano]) }

               if(navigator.userAgent.match(/iPad/i) == null) {
               // map.addLayer(gmap);
                map.addLayer(mosm);
               }

}
function setcontroles(lon, lat, zo){

               var p = OpenLayers.Layer.SphericalMercator.forwardMercator(lon, lat);
               map.setCenter(p, zo);

  //             map.addControl( new OpenLayers.Control.LayerSwitcher() );
              map.addControl(new OpenLayers.Control.Attribution());

}


// Funciones de Fecha
function putfecha (f, primera) {
    try {
           selectControl.unselectAll();
    } catch(err) { }

ano = getdate(f);
anol = getdatel(f);
anolk = getdatelk(f);
anoc = getdatec(f);
anoe = getdatee(f);
anom = getdatem(f);
anolg = getdatelg(f);
anolg2 = getdatelg2(f);

            filtro.filters[0].value = parseInt(f);
            filtro.filters[1].value = parseInt(f);
            filterStrategy.setFilter(filtro);

// if (primera != true ) alert("kk");{finzoom() };

miopais.setVisibility(false);
miopais.setVisibility(true);

literal.setVisibility(false);
literal.setVisibility(true);

// leyendas

    if (anolg != 0) {
        leyenda.attribution='<img src="/geacron/assets"' + '/leyendas/' + lng + '/' + anolg + lng  + '.jpg"'  + '>'
   } else {
       leyenda.attribution='';
    }
   if (leyenda.visibility == false) {} else {leyenda.setVisibility(false);leyenda.setVisibility(true)}

    if (anolg2 != 0) {
       leyenda2.attribution='<img src="http://' + estaurl + "/map/contribution/" + ct + '/legend/' + lng + '/' + anolg2 + lng  + '.jpg"'  + '>'
    } else {
       leyenda2.attribution='';
    }
   if (leyenda2.visibility == false) {} else {leyenda2.setVisibility(false);leyenda2.setVisibility(true)}

// ****************************************

coloca_fecha(f);

fechareal = f;
document.Fecha.imagenr.src = "img/refresh_blue.gif";

createLayerMov();
createLayerHecho();
createLayerCiudad();
createLayerRectangle();

   document.Fecha.fechat.value = f ; actualiza_link() ;
}

function coloca_fecha(f) {

var few;
few = f + "";
if (lng == "zh-hans") {
 if (f < 0) {few = Right(few, few.length - 1); few = bc + few} else {few = few + ad}
} else {
 if (f < 0) {few = Right(few, few.length - 1); few = few + bc} else {few = few + ad}
}

document.mapa.sliderValue2.value= few;

/*
var ss = parseInt(screen.width) / 2;
var tx =  parseInt(getWidth(few)) * 2;
var ww = ss - tx;
*/
var ww = map.getSize().w - 115;

document.mapa.sliderValue2.style.left= ww + "px";

if(navigator.userAgent.match(/iPad/i) == null) {
   colocalink();
  }
}

// *********** NUEVO. ACTUALIZAR LINK ****************************
function actualiza_link() {


    var param = getparam();
    param = "v=" + Ventana + "&" + param;

   //excepciones idiomas
   lngex = lng.replace("pt-pt", "pt");
   lngex = lngex.replace("zh-hans", "zh");
   // ------------------------------
/*
try {
   // Obtenemos param de timeline
   var param2 = top.frames['timeline'].getparam();
   param = param + param2;
    } catch(err) { }
*/
   // ---------------------------------------------
    document.externo.enlace.value="http://" + estaurl + "/" + lngex + "/?" + param;
   // createCookie(estesid, param, 1);

}
// *************************************************************************

function finzoom () {

    try {
     pause(document.pelicula.playpeli, document.pelicula.pausepeli);
    } catch(err) { }

    actualiza_link() ;

    // Habilitar las capas deshabilitadas en finlit
    if(navigator.userAgent.match(/iPad/i) != null) {
        enableLayers(); 
        
    } else {

        // Detectar que hay un cambio de zoom y que no es IE
        if (getInternetExplorerVersion() == -1) {
           if ( zoomActual != parseInt(map.getZoom()) ) {
              zoomActual = parseInt(map.getZoom());
               try {createLayerMov();} catch(err) { }
               try {createLayerHecho();} catch(err) { }
               try {createLayerCiudad();} catch(err) { }
               try {createLayerRectangle();} catch(err) { }
           }
        } else { createLayerHecho(); createLayerCiudad(); createLayerRectangle(), createLayerMov(); }
    }

}

function getparam() {

var lifec = topdates();
getnd();

// otros datos
var zz = map.getZoom();
var b = map.getCenter();
var centro = OpenLayers.Layer.SphericalMercator.inverseMercator(b.lon,b.lat);
var cx = centro.lon;
var cy = centro.lat;
// falta calcular nd y tipo mapa ????
if (map.baseLayer.name == etiq[5]) { tm = "p" } else { tm = "r" }
try {
 if (rectang.visibility == true) {lya = "y"} else {lya = "n"}
 if (ciudad.visibility == true) {lyc = "y"} else {lyc = "n"}
 if (hecho.visibility == true) {lye = "y"} else {lye = "n"}
 if (movimiento.visibility == true) {lym = "y"} else {lym = "n"}
 if (leyenda.visibility == true) {lyg = "y"} else {lyg = "n"}
 if (leyenda2.visibility == true) {ly2 = "y"} else {ly2 = "n"}
 if (datadicional.visibility == true) {lyd = "y"} else {lyd = "n"}
    } catch(err) { }

// var paramw = "lang=" + lng + "&z=" + zz + "&x=" + cx + "&y=" + cy + "&nd=" + nd + "&d=" + lifec + "&di=" + document.Fecha.fechat.value + "&tm=" + tm;
var paramw = "lang=" + lng + "&z=" + zz + "&x=" + cx + "&y=" + cy + "&nd=" + nd + "&d=" + lifec + "&di=" + document.Fecha.fechat.value + "&tm=" + tm + "&ct=" + ct + "&ly=" + lya + lyc + lye + lym + lyg + ly2 + lyd;

return paramw;

}

function checkdate(elemw) {
    if (elemw == "" ) { } else {
    if ( elemw < -3000 ||  elemw > anoact ||  elemw == 0 || IsEntero( elemw) == false) { elemw = anoact }
    }
    return elemw;
}

function topdates () {

// cadena fechas
var lifecw = "";
nd = 9;
for (var n = 0; n < maxfechas; n++) {
  var elem = document.getElementById('T' + n);
   if ( elem.value == "" ) { nd = n-1; break }
   var v = checkdate(elem.value);
   lifecw = lifecw + v + "A";
 }

lifecw = Left(lifecw, lifecw.length - 1);

   return lifecw;

}

function getnd() {

 for (var n = 0; n < nd + 1; n++) {
   var elem = document.getElementById('T' + n);
   if ( elem.value == document.Fecha.fechat.value ) { nd = n; break }

 }

}
// Funciones de manejo del link o incrustacion -------------------------------------

function irlink() {

var param = getparam();

var ww = 300;
var hh = 300;

var urllink = '/map/atlas/enlace.html?' + param + '&w=' + ww + '&h=' + hh;
// window.open(urllink);
loadUniquePage(urllink, 850, 700, 1, 1, 0, 'me1', false);
}

function loadUniquePage(page, ww, hh, scroll, rsz, tb, nom, max) {
if (opener && !opener.closed){
 if (max == false) {
  var myWin = window.open(page,nom,'width=' + ww + ',height=' + hh + ', resizable=' + rsz + ', scrollbars=' + scroll + ',location=' + tb);
 } else { 
 var myWin = window.open(page,nom);
 }
opener = myWin;
opener.focus();
}
else {
 if (max == false) {
  var myWin = window.open(page,nom,'width=' + ww + ',height=' + hh + ',  resizable=' + rsz + ', scrollbars=' + scroll + ',location=' + tb);
 } else { 
 var myWin = window.open(page,nom);
 }
opener = myWin;
opener.focus();
}
}

function colocalink() {
  var ww = map.getSize().w ;
/*
  document.externo.txtenlace.style.position = "absolute";
  document.externo.txtenlace.style.left = ww - 200 - 5;
  document.externo.txtenlace.style.top = 710;
  document.externo.txtenlace.style.visibility="visible";

  document.externo.enlace.style.position = "absolute";
  document.externo.enlace.style.left = ww - 150;
  document.externo.enlace.style.top = 710;
  document.externo.enlace.style.visibility="visible";
*/
var ancho = document.externo.embed.offsetWidth;
document.externo.embed.style.left = ww - ancho - 5;
}

// Funciones cambios de fecha -------------------------------------------------------------
function putanimado () {
document.Fecha.imagenr.src = "img/refresh_blink.gif";
// ponemos elemento en "----"
   if (document.busqueda.interv.length >0) {
   document.busqueda.interv.selectedIndex=document.busqueda.interv.length -1
   }

}

function menos(c) {
putanimado();
// if (getInternetExplorerVersion() == -1) { window.stop();}
f=parseInt(document.Fecha.fechat.value);
if (isNaN(f)) { f = anoact }
t=f-c;
if (t == 0) {t = -1}
if (t < -3000) {t = -3000}
document.Fecha.fechat.value = t;

submitdate(document.Fecha.fechat.value, false);

 var ti = 300;
 switch(c) {
 case 1:
 document.Fecha.menos1.style.visibility = "hidden";
 window.setTimeout("document.Fecha.menos1.style.visibility = 'visible'",ti);
 break;

 case 10:
 document.Fecha.menos10.style.visibility = "hidden";
 window.setTimeout("document.Fecha.menos10.style.visibility = 'visible'",ti);
 break;

 case 100:
 document.Fecha.menos100.style.visibility = "hidden";
 window.setTimeout("document.Fecha.menos100.style.visibility = 'visible'",ti);
 }

}

function mas(c) {
putanimado();
// if (getInternetExplorerVersion() == -1) { window.stop();}
f=parseInt(document.Fecha.fechat.value);
if (isNaN(f)) { f = anoact }
t=f+c;
if (t == 0) {t = 1}
if (t > anoact) {t = anoact}
document.Fecha.fechat.value = t;

submitdate(document.Fecha.fechat.value, false);

 var ti = 300;
 switch(c) {
 case 1:
 document.Fecha.mas1.style.visibility = "hidden";
 window.setTimeout("document.Fecha.mas1.style.visibility = 'visible'",ti);
 break;

 case 10:
 document.Fecha.mas10.style.visibility = "hidden";
 window.setTimeout("document.Fecha.mas10.style.visibility = 'visible'",ti);
 break;

 case 100:
 document.Fecha.mas100.style.visibility = "hidden";
 window.setTimeout("document.Fecha.mas100.style.visibility = 'visible'",ti);
 }

}

// Funciones de acceso a BD -------------------------------------------------------------
function centrar(zw) {

var p = [];
var v = document.busqueda.interv.value;
  if (v != "----") {
   // alert(v);
   p = v.split('*');
   // alert(p[0] + " " + p[1] + " " + p[2]);
   document.Fecha.fechat.value=p[0];

   var pp = OpenLayers.Layer.SphericalMercator.forwardMercator(parseFloat(p[1]), parseFloat(p[2]));
// alert(pp + " " + zw);
   putfecha(p[0], false);
   map.setCenter(pp, zw);

  // zoomActual = zw;
  // finzoom();
   putfecha(p[0], false);
/*
   var pp = OpenLayers.Layer.SphericalMercator.forwardMercator(parseFloat(p[1]), parseFloat(p[2]));
// alert(pp + " " + zw);
   map.setCenter(pp, zw);
*/
  }
}

function based() {

removebased(document.busqueda.interv);
// Insertar nuevos valores de la BD

insertbased(document.busqueda.interv, "1900", "1900*13.5*-29.3");
insertbased(document.busqueda.interv, "1800", "1800*120.5*39.3");
insertbased(document.busqueda.interv, "1500", "1500*12.3*40.3");
insertbased(document.busqueda.interv, "1000", "1000*50.5*30.6");
centrar();
}

function removebased(theSel)
{
  var selIndex = theSel.selectedIndex;
  if (selIndex != -1) {
    for(i=theSel.length-1; i>=0; i--)
    {
//      if(theSel.options[i].selected)
//      {
        theSel.options[i] = null;
//      }
    }
    if (theSel.length > 0) {
      theSel.selectedIndex = selIndex == 0 ? 0 : selIndex - 1;
    }
  }
  theSel.style.visibility="hidden";
}

function insertbased(theSel, newText, newValue)
{
  var l = newText.split('*');
  newText = l[0]

  if (theSel.length == 0) {
    var newOpt1 = new Option(newText, newValue);
    theSel.options[0] = newOpt1;
    theSel.selectedIndex = 0;
  } else if (theSel.selectedIndex != -1) {
    var selText = new Array();
    var selValues = new Array();
    var selIsSel = new Array();
    var newCount = -1;
    var newSelected = -1;
    var i;
    for(i=0; i<theSel.length; i++)
    {
      newCount++;
      if (newCount == theSel.selectedIndex) {
        selText[newCount] = newText;
        selValues[newCount] = newValue;
        selIsSel[newCount] = false;
        newCount++;
        newSelected = newCount;
      }
      selText[newCount] = theSel.options[i].text;
      selValues[newCount] = theSel.options[i].value;
      selIsSel[newCount] = theSel.options[i].selected;
    }
    for(i=0; i<=newCount; i++)
    {
      var newOpt = new Option(selText[i], selValues[i]);
      theSel.options[i] = newOpt;
      theSel.options[i].selected = selIsSel[i];
    }
    theSel.style.visibility="visible";

  }
}



// Funciones ayuda ------------------------------

function irhelp() {
/*
var urllink = '/map/atlas/help.html?lang=' + lng + '&n=205';
loadUniquePage(urllink, 980, 700, 1, 1, 0, 'me2', false);
*/
var urllink = 'http://' + 'geacron.com' + '/help';
window.open(urllink)
}

function puthelp() {

// document.ayuda.helpup.style.visibility="visible";
// document.ayuda.helpdown.style.visibility="visible";
document.ayuda.helptxt.style.visibility="visible";

}

function outhelp() {

// document.ayuda.helpup.style.visibility="hidden";
// document.ayuda.helpdown.style.visibility="hidden";
document.ayuda.helptxt.style.visibility="hidden";

}


function movie(bot, bot2) {
// alert("hola");
// -----------------------
fechas = [];

totalselec = gettotalsel();

if (totalselec > 0) {
  for (var n = 0; n < totalselec+1; n++) {
    var elem = document.getElementById('T' + n);
       fechas.push(checkdate(elem.value));
   }

// -----------------------
  bot.style.visibility='hidden';
  bot2.style.visibility='hidden';

  tf = 0;

  id = setInterval("peli()",1500);
 }
}

function gettotalsel() {
  tsw = 9;
  for (var n = 0; n < 10; n++) {
    elem = document.getElementById('T' + n);
    if (elem.value == "") { tsw = n-1; break; }
  }
  return tsw;
}

function play() {
var elem;

totalselec = gettotalsel();

dateselec = dateselec + 1;
elem = document.getElementById('T' + dateselec);
if ( dateselec > totalselec ) { dateselec = 0}

whiteall();

elem = document.getElementById('T' + dateselec);
elem.style.background = "blue";
elem.style.color = "white";

elem.value = checkdate(elem.value);
submitdate(elem.value, false);

}


function playback() {

var elem;

totalselec = gettotalsel();
if (totalselec < 0) { totalselec = 0 }

dateselec = dateselec - 1;
elem = document.getElementById('T' + dateselec);
if ( dateselec < 0 || dateselec > totalselec) { dateselec = totalselec}

whiteall();

elem = document.getElementById('T' + dateselec);
elem.style.background = "blue";
elem.style.color = "white";

elem.value = checkdate(elem.value);
submitdate(elem.value, false);

}


function clearall () {

 for (var n = 0; n < 10; n++) {
   var elem = document.getElementById('T' + n);
   elem.style.background = "white";
   elem.value= "";

 }

}

function whiteall () {

 for (var n = 0; n < 10; n++) {
   var elem = document.getElementById('T' + n);
   elem.style.background = "white";
   elem.style.color = "black";

 }

}


function pause(bot, bot2) {
bot.style.visibility='visible';
bot2.style.visibility='hidden';

clearInterval(id);
}

function peli() {
var elem;
// A_SLIDERS[0].f_setValue(tf);
// putcambio(tf);

whiteall();

elem = document.getElementById('T' + tf);
elem.style.background = "blue";
elem.style.color = "white";

document.Fecha.fechat.value = fechas[tf];
putfecha(fechas[tf], false);

tf = tf + 1;
if (tf > (fechas.length - 1)) { tf = 0 }

}

// Funciones de ejecicion de fechas
function validar(e, elem, nw) {

var a = checkdate(elem.value);

if (a !="") { // si hay algo

  tecla = (document.all) ? e.keyCode : e.which;
  if (tecla==13) {putfecha(a, false); document.Fecha.fechat.value = a; elem.value = a
  whiteall();
  elem.style.background = "blue";
  elem.style.color = "white"; }
  dateselec = nw;


} // si hay algo

}

function validar2(elem, nw) {

var a = checkdate(elem.value);

if (a !="") { // si hay algo

  putfecha(a, false); document.Fecha.fechat.value = a; elem.value = a
  whiteall();
  elem.style.background = "blue";
  elem.style.color = "white";
  dateselec = nw;


} // si hay algo

}

function submitenter(field,e)
{

var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

  if (keycode == 13)
   {

      var a = checkdate(field);
      if (a !="") { // si hay algo

         putfecha(a, false); document.Fecha.fechat.value = a

      }
     return false;
    }
  else
     return true;



}

function submitdate(fw, primera) {
var a = checkdate(fw);
      if (a !="") { // si hay algo
        putfecha(a, primera); ; document.Fecha.fechat.value = a
      }
}
/*
// Lectura querystring
function datosinicio() {

Ventana=getQueryVariable("v") ;
if (Ventana ==undefined) {
    Ventana="m"
}

zoom=parseInt(getQueryVariable("z")) ;
zoomActual = zoom;

if (isNaN(zoom) || zoom > 6 || zoom < 1) {
    zoom = 2
}
x=parseFloat(getQueryVariable("x")) ;
if (isNaN(x)) {
    x = 0
}
y=parseFloat(getQueryVariable("y")) ;
if (isNaN(y)) {
    y = 25
}
nd=parseInt(getQueryVariable("nd")) ;
if (isNaN(nd) || nd < 0) {
    nd = 0
}

lng=getQueryVariable("lang") ;
if (lng==undefined) {
    lng="en"
}

estesid=getQueryVariable("sid") ;
if (estesid==undefined || Left(estesid,7) != "GeaCron" || estesid.length > 13) {
   // estesid = "GeaCron" + Math.round(Math.random()*1000000);
   // window.location.replace("http://" + estaurl + "/map/atlas/mapal.html" + "?sid=" + estesid + "&lang=" + lng);
      estesid = "GeaCron1m";
}

d=getQueryVariable("d");
if (d==undefined) {
d = "";
}

di=getQueryVariable("di");
if (isNaN(di) || di==undefined || di=="") {
di = anoact; } else { di = checkdate(di)
}

if(navigator.userAgent.match(/iPad/i) != null) {
    tm = "r";
} else {
    tm=getQueryVariable("tm");
    if(tm != "p" && tm != "r") {
        tm = "p";
    }
}

ly=getQueryVariable("ly") ;
if (ly==undefined) {
    ly="yyyyyyy"
}
 lya = Mid(ly,0,1);
 if (lya != "y" && lya != "n") { lya = "y"}
 lyc =  Mid(ly,1,1);
 if (lyc != "y" && lyc != "n") { lyc = "y"}
 lye =  Mid(ly,2,1);
 if (lye != "y" && lye != "n") { lye = "y"}
 lym =  Mid(ly,3,1);
 if (lym != "y" && lym != "n") { lym = "y"}
 lyg =  Mid(ly,4,1);
 if (lyg != "y" && lyg != "n") { lyg = "y"}
 ly2 =  Mid(ly,5,1);
 if (ly2 != "y" && ly2 != "n") { ly2 = "y"}
 lyd =  Mid(ly,6,1);
 if (lyd != "y" && lyd != "n") { lyd = "y"}

ct=getQueryVariable("ct");
if (isNaN(ct) || ct==undefined || ct=="") {
ct = 0
}
if (getInternetExplorerVersion() > -1 && getInternetExplorerVersion() < 9) {ct=0; ly2="n"; lyd="n"}

// Comprobaciones

var fechasw = [];

fechasw = d.split('A');

if (fechasw.length > maxfechas) { var totfechas = maxfechas } else { var totfechas = fechasw.length  }

 for (var n = 0; n < totfechas; n++) {
   fechas.push(checkdate(fechasw[n]));
 }

if ( nd > (maxfechas -1) ) { nd = fechas.length - 1 }

}
*/
// Lectura querystring_cookie
function datosinicio_ses(ses, chk_sid) {

Ventana=ParseVariable("v", ses) ;
if (Ventana ==undefined) {
    Ventana="m"
}

zoom=parseInt(ParseVariable("z", ses)) ;
zoomActual = zoom;

if (isNaN(zoom) || zoom > 5 || zoom < 1) {
    zoom = 5
}
x=parseFloat(ParseVariable("x", ses)) ;
if (isNaN(x)) {
    x = 0
}
y=parseFloat(ParseVariable("y", ses)) ;
if (isNaN(y)) {
    y = 25
}
nd=parseInt(ParseVariable("nd", ses)) ;
if (isNaN(nd) || nd < 0) {
    nd = 0
}

lng="fr" ;
if (lng==undefined) {
    lng="en"
}

if (chk_sid == 1) {
estesid=ParseVariable("sid", ses) ;
if (estesid==undefined || Left(estesid,7) != "GeaCron" || estesid.length > 13) {
   // estesid = "GeaCron" + Math.round(Math.random()*1000000);
   // window.location.replace("http://" + estaurl + "/map/atlas/mapal.html" + "?sid=" + estesid + "&lang=" + lng);
      estesid = "GeaCron1m";
}
}

d=ParseVariable("d", ses);
if (d==undefined) {
d = "";
}

di=ParseVariable("di", ses);
if (isNaN(di) || di==undefined || di=="") {
di = anoact; } else { di = checkdate(di)
}

if(navigator.userAgent.match(/iPad/i) != null) {
    tm = "r";
} else {
    tm=ParseVariable("tm", ses);
    if(tm != "p" && tm != "r") {
        tm = "p";
    }
}

ly=ParseVariable("ly", ses) ;
if (ly==undefined) {
   // ly="yyyyyyy"
    ly="yynnnnn"
}
 lya = Mid(ly,0,1);
 if (lya != "y" && lya != "n") { lya = "y"}
 lyc =  Mid(ly,1,1);
 if (lyc != "y" && lyc != "n") { lyc = "y"}
 lye =  Mid(ly,2,1);
 if (lye != "y" && lye != "n") { lye = "y"} 
 lye = 'n';
 lym =  Mid(ly,3,1);
 if (lym != "y" && lym != "n") { lym = "y"}
 lym = 'n';
 lyg =  Mid(ly,4,1);
 if (lyg != "y" && lyg != "n") { lyg = "y"}
 lyg = 'n';
 ly2 =  Mid(ly,5,1);
 if (ly2 != "y" && ly2 != "n") { ly2 = "y"}
 ly2 = 'n';
 lyd =  Mid(ly,6,1);
 if (lyd != "y" && lyd != "n") { lyd = "y"}
 lyd = 'n';

ct=ParseVariable("ct", ses);
if (isNaN(ct) || ct==undefined || ct=="") {
ct = 0
}
if (getInternetExplorerVersion() > -1 && getInternetExplorerVersion() < 9) {ct=0; ly2="n"; lyd="n"}

// Comprobaciones

var fechasw = [];

fechasw = d.split('A');

if (fechasw.length > maxfechas) { var totfechas = maxfechas } else { var totfechas = fechasw.length  }

 for (var n = 0; n < totfechas; n++) {
   fechas.push(checkdate(fechasw[n]));
 }

if ( nd > (maxfechas -1) ) { nd = fechas.length - 1 }

}


// Otros
function select_all(sname)
{
sname = "document.externo." + sname;
var text_val=eval(sname);
text_val.focus();
text_val.select();
}

function setAlpha(imageformat)
 {
 	var filter = false;
 	if (imageformat.toLowerCase().indexOf("png") > -1) {
 		filter = OpenLayers.Util.alphaHack();
 	}
 	return filter;
 }

function abrepop () {

//window.open("http://" + estaurl + "/map/atlas/php/paises.php?idPais=1","mywindow","width=500,height=250");
//window.showModalDialog("http://" + estaurl + "/map/atlas/php/paises.php?idPais=1","mywindow",'dialogHeight:250px;dialogWidth:500px;center:Yes;help:No;resizable: No;status:No;');


}

function createLayerRectangle() {

// if (chk_a == 1) {
if (rectang.visibility == true) {

try {
    rectang.destroyFeatures();
    rectang2.destroyFeatures();
  } catch (error) {}

 if ( map.getZoom() >2 && map.getZoom() <6) {

    // Componer la url donde se ubican las coordenadas de los rectangulos

    directoryName = "/txt/labeltxt/" + lng + "/L" + getDateFile(anol) + "/Z" + map.getZoom();
    fileName = "L" + getDateFile(anol) + lng + map.getZoom() + ".txt";
    urlCoorRectangle =  "/geacron/assets" + directoryName + "/" + fileName  + "?v=" + ver_geacron ;

var jsload = function() {

  for (var n = 1; n <= tot_l; n++) {
            label = lbl_l[n];
            idPais = id_l[n];
            coorX1 = parseFloat(x1_l[n]);
            coorY1 = parseFloat(y1_l[n]);
            coorX2 = parseFloat(x2_l[n]);
            coorY2 = parseFloat(y2_l[n]);

bounds = map.getExtent();

var p1 = OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.left, bounds.top);
var p2 = OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.right, bounds.bottom);

 if (getInternetExplorerVersion() > -1) {
     if (coorX2 > p1.lon && coorX1 < p2.lon && coorY2 < p1.lat && coorY1 > p2.lat)
     {
            addRectangle(idPais, label , coorX1 , coorY1 , coorX2 , coorY2);
            // addRectangle(idPais, label, coorX1-360, coorY1, coorX2-360, coorY2);
            // addRectangle(idPais, label, coorX1+360, coorY1, coorX2+360, coorY2);
     }
    } else { addRectangle(idPais, label , coorX1 , coorY1 , coorX2 , coorY2);}
  }

};
tot_l=0;
loadScript(urlCoorRectangle, jsload);
jsload=0;

 }

 }

}
// **********************************************************************************
function addRectangle(idPais, label, x1, y1, x2, y2) {

// Comprobar si hay que desplazar segun browser
/*
  if (desplazar == true){
   y1 = desplzy(x1, y1);
   y2 = desplzy(x2, y2);
  }
*/
// ---------------------------------------------

    var pointList = new Array(3);
    var pos;
    var newPoint;
    var linearRing;
    var feature;

    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(x1,y1);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[0]=newPoint;

    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(x2,y1);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[1]=newPoint;

    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(x2,y2);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[2]=newPoint;

    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(x1,y2);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[3]=newPoint;

// **************************************
// label= label.toUpperCase();
    linearRing = new OpenLayers.Geometry.LinearRing(pointList);
    feature = new OpenLayers.Feature.Vector(
                        new OpenLayers.Geometry.Polygon([linearRing]));
    feature.attributes = {
    id: idPais,
    capa: "A",
    name: label
    }
try {
    rectang2.addFeatures(feature);
   } catch (error) {}
// *************************************
    linearRing = new OpenLayers.Geometry.LinearRing(pointList);
    feature = new OpenLayers.Feature.Vector(
                        new OpenLayers.Geometry.Polygon([linearRing]));
    feature.attributes = {
    id: idPais,
    capa: "A",
    name: label
    }
try {
    rectang.addFeatures(feature);
   } catch (error) {}
}

function getWikipediaUrl(term) {
  // Requête GET à l'API de Wikipedia avec le terme en paramètre
  const apiUrl = `https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=info&titles=${term}&utf8=1&inprop=url`;

  fetch(apiUrl, { mode: 'no-cors' })
    .then(response => response.text())
    .then(data => {
      // Récupération de l'URL de l'article
      console.log(data);
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const url = pages[pageId].fullurl;
      console.log(url);
    })
    .catch(error => {
      console.error(error);
    });
}

// ****************************************************************
function onFeatureSelect(feature) {
 if (feature.attributes.capa != "KMLyes" && feature.attributes.capa != "KMLno") { // es de KML
 var page;

  var idnom = "idArea";
  var conom = "coArea";

  var aa = feature.attributes.name;
  aa = aa.replace("(","[");
  aa = aa.replace(")","]");

    page="http://" + estaurl + "/doc/links-" + lng + "?" + "lang=" + lng + "&" + idnom + "=" + feature.attributes.id + "&" + conom + "=" + encodeURIComponent(aa) + "&lng=" + lng + "&date=" + fechareal +  "&layer=" + feature.attributes.capa;
  // getWikipediaUrl(aa);
  // loadUniquePage(page, 900, 950, 0, 1, 0, 'me3', true);
  selectControl.unselectAll();
}
}

function fechaselect() {
  
  var page;
  
  var idnom = "idArea";
  var conom = "coArea";
  
  // getWikipediaUrl(document.mapa.sliderValue2.value);

    page="http://" + estaurl + "/doc/links-" + lng + "?" + "lang=" + lng + "&" + idnom + "=0"  + "&" + conom + "=" + document.mapa.sliderValue2.value + "&lng=" + lng + "&date=" + fechareal + "&layer=A" ;
    // loadUniquePage(page, 900, 950, 0, 1, 0, 'me3', true);

}

// ****************************************************************
function onPopupClose(evt) {
           // selectadd.unselectAll();
           selectControl.unselectAll();
}
function onKMLSelect(event) {
       var feature = event.feature;

       if (feature.attributes.capa == "KMLyes") { // KML no se ha puesto name
            // Since KML is user-generated, do naive protection against
            // Javascript.
           var content = "<h2>"+feature.attributes.name + "</h2>" + feature.attributes.description;
           //  var content = feature.attributes.description;
            if (content.search("<script") != -1) {
                content = "Content contained Javascript! Escaped content below.<br>" + content.replace(/</g, "&lt;");
            }

           var popup = new OpenLayers.Popup.FramedCloud("chicken", 
                                  feature.geometry.getBounds().getCenterLonLat(),
                                     new OpenLayers.Size(300,300),
                                     content,
                                     null, true, onPopupClose);

            feature.popup = popup;
            map.addPopup(popup);
      }
}
function onKMLUnselect(event) {
            var feature = event.feature;
            if(feature.popup) {
                map.removePopup(feature.popup);
                feature.popup.destroy();
                delete feature.popup;
            }
 }
function getCoordinates(e) {
 // this should work
 var lonlat = map.getLonLatFromViewPortPx(e.xy);
 alert("You clicked near " + lonlat.lat + " N, " +
                                          + lonlat.lon + " E");
}
// ***************************************************
function onFeatureUnselect(feature) {

}

function heightPageWp(pag) {
    if (typeof window.ActiveXObject != 'undefined' )
        req = new ActiveXObject("Microsoft.XMLHTTP");
    else
        req = new XMLHttpRequest();

    req.open("GET", pag, false);
    req.send(null);
    return req.responseText;
}

function getDateFile(fecha) {

    var anow = "" + fecha;
    anow = anow.replace("-", "B");

        return anow;
}

function finlit() {

    try {
        if(navigator.userAgent.match(/iPad/i) != null) {
            disableLayers();
        }

        if(getInternetExplorerVersion() != -1 ) {
            rectang.destroyFeatures();
            rectang2.destroyFeatures();
            ciudad.destroyFeatures();
            ciudad2.destroyFeatures(); 
            hecho.destroyFeatures();
            hecho2.destroyFeatures(); 
            movimiento.destroyFeatures(); 
        }
    } catch (error) {}

}

function pluszoom() {

    if(zoomActual < 6 ) {
        zoom = zoom + 1;
        zoomActual = zoom;

        map.setCenter(map.getCenter(), zoom);
    }
}

function minuszoom() {

    if(zoomActual > 1 ) {
        zoom = zoom - 1;
        zoomActual = zoom;

        map.setCenter(map.getCenter(), zoom);
    }
}

function enableLayers() {

    try {
        miopais.setVisibility(true);
        miolake.setVisibility(true); 
        literal.setVisibility(true);
        createLayerMov();
        createLayerHecho();
        createLayerCiudad();
        createLayerRectangle();
    } catch(error) {}   

    if(navigator.userAgent.match(/iPad/i) != null) {
        zoom = map.getZoom();
        zoomActual = zoom;
    } 

}

function disableLayers() {

    miopais.setVisibility(false);
    miolake.setVisibility(false); 
    literal.setVisibility(false); 
    rectang.destroyFeatures();
    try {rectang2.destroyFeatures();} catch(err) { }
    ciudad.destroyFeatures();
    try {ciudad2.destroyFeatures(); } catch(err) { }
    hecho.destroyFeatures();
    try {hecho2.destroyFeatures();} catch(err) { }
    movimiento.destroyFeatures();

}

function desplzy(xw, yw) {
  pp = OpenLayers.Layer.SphericalMercator.forwardMercator(xw, yw); 
  npx = map.getPixelFromLonLat(pp);
  npx.y = npx.y - dsplz;
  lolam = map.getLonLatFromPixel(npx);
  lola = OpenLayers.Layer.SphericalMercator.inverseMercator(lolam.lon,lolam.lat);
  yw = lola.lat;
     return yw;

}

// =============== NUEVOS LAYERS =======================
// Hecho ------------------
function createLayerHecho() {

// if (chk_e == 1) {
if (hecho.visibility == true) {

try {
    hecho.destroyFeatures();
    hecho2.destroyFeatures();
   } catch (error) {}

    // Componer la url donde se ubican las coordenadas de los rectangulos
    directoryName = "/txt/eventtxt/" + lng + "/E" + getDateFile(anoe) ;
    fileName = "E" + getDateFile(anoe) + lng + ".txt";
    urlCoorRectangle =  "/geacron/assets" + directoryName + "/" + fileName + "?v=" + ver_geacron;

var jsloade = function() {

        for (var n = 1; n <= tot_e; n++) {
            // obtain the attribues of each marker
            label = lbl_e[n]; 
            idEvent = id_e[n];
            centroX = parseFloat(cx_e[n]);
            centroY = parseFloat(cy_e[n]);
            pst = parseInt(po_e[n]);
            rel = parseInt(re_e[n]);
            nimg = parseInt(ni_e[n]);;
            zoomw = parseInt(zo_e[n]);;

            addHecho(idEvent, label, centroX,centroY, pst, rel, nimg, zoomw);

        }

};
tot_e=0;
loadScript(urlCoorRectangle, jsloade);
jsloade=0;
 }

}
// *************************************
function addHecho(idEvent, label, cx, cy, pst, rel, nimg, zoomw) {
    var label2;
    label2 = label;
   if ( map.getZoom() < zoomw + 1 || pst == 0) {label2=""}
    var feature;
    var r = 8;
// ---------------------------------------------

    var pointList = new Array(3);
    var pos, npx;
    var newPoint;
    var linearRing;

  if (map.getZoom() >= zoomw) {
    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(cx,cy);
    npx = map.getPixelFromLonLat(pos);
    npx.x = npx.x - r;
    npx.y = npx.y - r;
    pos = map.getLonLatFromPixel(npx);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[0]=newPoint;

    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(cx,cy);
    npx = map.getPixelFromLonLat(pos);
    npx.x = npx.x + r;
    npx.y = npx.y - r;
    pos = map.getLonLatFromPixel(npx);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[1]=newPoint;

    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(cx,cy);
    npx = map.getPixelFromLonLat(pos);
    npx.x = npx.x + r;
    npx.y = npx.y + r;
    pos = map.getLonLatFromPixel(npx);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[2]=newPoint;

    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(cx,cy);
    npx = map.getPixelFromLonLat(pos);
    npx.x = npx.x - r;
    npx.y = npx.y + r;
    pos = map.getLonLatFromPixel(npx);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[3]=newPoint;

    linearRing = new OpenLayers.Geometry.LinearRing(pointList);
    feature = new OpenLayers.Feature.Vector(
                        new OpenLayers.Geometry.Polygon([linearRing]));
    feature.attributes = {
    id: idEvent,
    name: label,
    capa: "E",
    align: "cm"
    }
try {
    hecho2.addFeatures(feature);
      } catch (error) {}



// *************************************

            var p = OpenLayers.Layer.SphericalMercator.forwardMercator(cx,cy);
            var point = new OpenLayers.Geometry.Point(p.lon, p.lat);

            feature = new OpenLayers.Feature.Vector(point);
            feature.attributes = {
           //     scolor: "#000000",
                id: idEvent,
                capa: "E",
  //              radio: 8,
 //               opac: 1,
                nimg: nimg,
                name: label,
                name2: label2,
                // goffx: (r *2) * goffx[pst],
                // goffy: (r *2) * goffy[pst],
                offx: r * poffx[pst],
                offy: r * poffy[pst],
                align: posi[pst]
            }

// alert(feature.attributes.align);
try {
     hecho.addFeatures(feature);
   } catch (error) {} 

}
// =======================================
}

// Ciudad ----------------
function createLayerCiudad() {

// if (chk_c == 1) {
if (ciudad.visibility == true) {

try {
    ciudad.destroyFeatures();
    ciudad2.destroyFeatures();
   } catch (error) {}

 if ( map.getZoom() >3) {

    // Componer la url donde se ubican las coordenadas de los rectangulos
    directoryName = "/txt/locationtxt/" + lng + "/C" + getDateFile(anoc) ;
    fileName = "C" + getDateFile(anoc) + lng + ".txt";
    urlCoorRectangle =  "/geacron/assets" + directoryName + "/" + fileName  + "?v=" + ver_geacron;

var jsloadc = function() {

        for (var n = 1; n <= tot_c; n++) {
            // obtain the attribues of each marker
            label = lbl_c[n]; 
            idCity = id_c[n];
            centroX = parseFloat(cx_c[n]);
            centroY = parseFloat(cy_c[n]);
            tw = parseInt(tw_c[n]);
            th = parseInt(th_c[n]);
            pst = parseInt(po_c[n]);
            rel = parseInt(re_c[n]);
            tpc = parseInt(tip_c[n]);;

bounds = map.getExtent();

var p1 = OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.left, bounds.top);
var p2 = OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.right, bounds.bottom);
// alert(p1.lon + " " + p1.lat + " " + p2.lon + " " + p2.lat + " " + centroX + " " + centroY);

  if (getInternetExplorerVersion() > -1) {
     if (centroX > p1.lon && centroX < p2.lon && centroY < p1.lat && centroY > p2.lat)
     {

            addCiudad(idCity, label, centroX,centroY,tw, th, pst, rel, tpc);

     }
   } else { addCiudad(idCity, label, centroX,centroY,tw, th, pst, rel, tpc);}
  }

};
tot_c=0;
loadScript(urlCoorRectangle, jsloadc);
jsloadc=0;

 }
}

}
// **********************************************************************************

function addCiudad(idCity, label, cx, cy, tw, th, pst, rel, tpc) {

// Comprobar si hay que desplazar segun browser
/*
  if (desplazar == true){
   y1 = desplzy(x1, y1);
   y2 = desplzy(x2, y2);
  }
*/
    var feature;
// ---------------------------------------------

    var pointList = new Array(3);
    var pos;
    var newPoint;
    var linearRing;
   
    var sepinta;
    var zw = map.getZoom();
    switch (zw) {
    case 0,1,2,3:
       var r = 0;
       sepinta = 0
    break;
    case 4:
        if (rel <= 10) {var r = ptpc[tpc]; sepinta = 1} else { var r = 0; sepinta = 0}
    break;
    case 5:
        if (rel <= 20) {var r = ptpc[tpc]; sepinta = 1} else { var r = 0; sepinta = 0}
    break;
/*
    case 6:
        if (rel <= 50) {var r = ptpc[tpc]; sepinta = 1} else { var r = 0; sepinta = 0}
    break;
*/
    default:

     }

  if (sepinta == 1) {

    xy = get_rectang(cx, cy, tw, th, pst ,r , 0);
    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(xy.x,xy.y);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[0]=newPoint;

    xy = get_rectang(cx, cy, tw, th, pst ,r , 1);
    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(xy.x,xy.y);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[1]=newPoint;

    xy = get_rectang(cx, cy, tw, th, pst ,r , 2);
    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(xy.x,xy.y);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[2]=newPoint;

    xy = get_rectang(cx, cy, tw, th, pst ,r , 3);
    pos = OpenLayers.Layer.SphericalMercator.forwardMercator(xy.x,xy.y);
    newPoint = new OpenLayers.Geometry.Point(pos.lon , pos.lat);
    pointList[3]=newPoint;

    linearRing = new OpenLayers.Geometry.LinearRing(pointList);
    feature = new OpenLayers.Feature.Vector(
                        new OpenLayers.Geometry.Polygon([linearRing]));
    feature.attributes = {
    id: idCity,
    name: label,
    capa: "C",
   align: posi[pos]
    }
try {
    ciudad2.addFeatures(feature);
   } catch (error) {}

 }  else { label = "" }  // fin sepinta
// *************************************
           var p = OpenLayers.Layer.SphericalMercator.forwardMercator(cx,cy);
            var point = new OpenLayers.Geometry.Point(p.lon, p.lat);

            feature = new OpenLayers.Feature.Vector(point);
            feature.attributes = {
                scolor: "#000000",
                capa: "C",
                radio: r,
 //               offx: (5 - tipo) * poffx[pos],
 //               offy: (5 - tipo) * poffy[pos],
 //               opac: 1,
                name: label,
//              url: html,
//                favColor: "#000000",
//                bold: tpbold[parseInt(0)],
//                font: "Arial",
//                size: size,
                offx: r * poffx[pst],
                offy: r * poffy[pst],
                align: posi[pst]
            }
try {
     if (r > 0) {
    ciudad.addFeatures(feature);
     }
   } catch (error) {}
// =======================================

}

// Movimiento ------------------
function createLayerMov() {

// if (chk_m == 1) {
if (movimiento.visibility == true) {
try {
    movimiento.destroyFeatures();
   } catch (error) {}

    // Componer la url donde se ubican las coordenadas de los rectangulos

    directoryName = "/txt/movementtxt/" + "M" + getDateFile(anom) ;
    fileName = "M" + getDateFile(anom)  + ".txt";
    urlCoorRectangle =  "/geacron/assets" + directoryName + "/" + fileName + "?v=" + ver_geacron;

var jsloadm = function() {

          var ini=1;
          for (var n = 1; n <= tot_m; n++) {

            // get any line attributes
            var scolor = sc_m[n];
            var tpflecha = tp_m[n];
            var width  = wd_m[n];;
            var style  = st_m[n];
            var zoomw = zo_m[n];

            // read each point on that line
            var puntos = totp_m[n] - ini +1;
            var totpuntos= totp_m[n];
            var coors = [];
            for (var i = ini; i <= totpuntos; i++) {
            var lat = parseFloat(la_m[i]);
            var lng = parseFloat(lo_m[i]) ;

            var p = OpenLayers.Layer.SphericalMercator.forwardMercator(lng,lat);
            var coor = new OpenLayers.Geometry.Point(p.lon, p.lat);
            coors.push(coor);

            }
            ini = totp_m[n] + 1;

if (zoomw <= map.getZoom()) {addMovimiento(scolor, coors, puntos, zoomw, tpflecha, width, style) }

}
/*
// MAS 360
          var ini=1;
          for (var n = 1; n <= tot_m; n++) {

            // get any line attributes
            var scolor = sc_m[n];
            var tpflecha = tp_m[n];
            var width  = wd_m[n];;
            var style  = st_m[n];
            var zoomw = zo_m[n];

            // read each point on that line
            var puntos = totp_m[n] - ini +1;
            var totpuntos= totp_m[n];
            var coors = [];
            for (var i = ini; i <= totpuntos; i++) {
            var lat = parseFloat(la_m[i]);
            var lng = parseFloat(lo_m[i]) + 360;

            var p = OpenLayers.Layer.SphericalMercator.forwardMercator(lng,lat);
            var coor = new OpenLayers.Geometry.Point(p.lon, p.lat);
            coors.push(coor);

            }
            ini = totp_m[n] + 1;

if (zoomw <= map.getZoom()) {addMovimiento(scolor, coors, puntos, zoomw, tpflecha, width, style) }

}
// FIN MAS 360
*/
// MENOS 360
          var ini=1;
          for (var n = 1; n <= tot_m; n++) {

            // get any line attributes
            var scolor = sc_m[n];
            var tpflecha = tp_m[n];
            var width  = wd_m[n];;
            var style  = st_m[n];
            var zoomw = zo_m[n];

            // read each point on that line
            var puntos = totp_m[n] - ini +1;
            var totpuntos= totp_m[n];
            var coors = [];
            for (var i = ini; i <= totpuntos; i++) {
            var lat = parseFloat(la_m[i]);
            var lng = parseFloat(lo_m[i]) - 360;

            var p = OpenLayers.Layer.SphericalMercator.forwardMercator(lng,lat);
            var coor = new OpenLayers.Geometry.Point(p.lon, p.lat);
            coors.push(coor);

            }
            ini = totp_m[n] + 1;

if (zoomw <= map.getZoom()) {addMovimiento(scolor, coors, puntos, zoomw, tpflecha, width, style) }

}
// FIN MENOS 360
};
tot_m=0; 
loadScript(urlCoorRectangle, jsloadm);
jsloadm=0;
  }

 }
// *************************************
function addMovimiento(scolor, coors, puntos, zoomw, tpflecha, width, sstyle) {

var tpstyle = ["solid", "longdash", "dot", "dashdot",  "longdashdot"];
// alert(scolor + " " + coors[1]);
// Comprobar si hay que desplazar segun browser
/*
  if (desplazar == true){
   y1 = desplzy(x1, y1);
   y2 = desplzy(x2, y2);
  }
*/
// ---------------------------------------------

            var lineString = new OpenLayers.Geometry.LineString(coors);
            var feature = new OpenLayers.Feature.Vector(lineString);
            feature.attributes = {
                scolor: scolor,
                capa: "M",
                sstyle: tpstyle[sstyle],
                strwidth:  width
             }

           try { movimiento.addFeatures(feature);} catch (error) {}

      if (tpflecha==1) {
           var k=Math.pow(2,((11 - map.getZoom() )));

            setflecha(coors[puntos - 2] , coors[puntos - 1],300*k);
            var lineString = new OpenLayers.Geometry.LineString(fl);
            var feature = new OpenLayers.Feature.Vector(lineString);
            feature.attributes = {
                scolor: scolor,
                capa: "M",
                sstyle: "solid",
                strwidth:  width
             }

       try { movimiento.addFeatures(feature); } catch (error) {}
     }
}


function setflecha(p1,p2,armlength)
    {

        var x1 = p1.x;
        var y1 = p1.y;
        var x2 = p2.x;
        var y2 = p2.y;

        var dx = x2 - x1;
        var dy = y2 - y1;

        var length = Math.sqrt(dx * dx + dy * dy);
        dx = dx / length * armlength;
        dy = dy / length * armlength;

        var x3 = x2 - dx - dy;
        var y3 = y2 - dy + dx;
        var x4 = x2 - dx + dy;
        var y4 = y2 - dy - dx;
     
        fl[0] = new OpenLayers.Geometry.Point(x3,y3);  
        fl[1] = new OpenLayers.Geometry.Point(x2,y2);
        fl[2] = new OpenLayers.Geometry.Point(x4,y4); 

    }
// =======================================

function get_rectang(xw, yw, tw, th,pst,r,caso) {
  pp = OpenLayers.Layer.SphericalMercator.forwardMercator(xw, yw); 
  npx = map.getPixelFromLonLat(pp);

  switch (pst) {

  case 1:
  if (caso == 0 || caso == 3) { var kx = (tw * -1) + (r * -1)  } else { var kx = -r }
  if (caso == 0 || caso == 1) { var ky = (th * -1) + (r * -poffy[pst]) + 3 } else {  ky = (r * -poffy[pst]) + 3 }
  break;
// ---------------------------------------
  case 2:
  if (caso == 0 || caso == 3) { var kx = (tw / 2) * -1 } else { var kx = tw / 2 }
  if (caso == 0 || caso == 1) { var ky = (th * -1) +  (r * -poffy[pst]) + 3 } else {  ky = (r * -poffy[pst]) + 3 }
  break;
// ---------------------------------------
  case 3:
  if (caso == 0 || caso == 3) { var kx = (tw ) + (r) } else { var kx = r }
  if (caso == 0 || caso == 1) { var ky = (th * -1) +  (r * -poffy[pst]) + 3 } else {  ky = (r * -poffy[pst]) + 3 }
  break;
// ---------------------------------------
  case 4:
  if (caso == 0 || caso == 3) { var kx = (tw * -1) + (r * -1) } else { var kx = -r }
  if (caso == 0 || caso == 1) { var ky = (th / 2) * -1 } else { var ky = (th / 2) }
  break;
// ---------------------------------------
  case 5:
  if (caso == 0 || caso == 3) { var kx = (tw ) + (r) } else { var kx = r }
  if (caso == 0 || caso == 1) { var ky = (th / 2) * -1 } else { var ky = (th / 2) }
  break;
// ---------------------------------------
  case 6:
  if (caso == 0 || caso == 3) { var kx = (tw * -1) + (r * -1) } else { var kx = -r}
  if (caso == 0 || caso == 1) { var ky = (th ) + (r * -poffy[pst] ) - 0} else { ky = (r * -poffy[pst]) - 0}
  break;
// ---------------------------------------
  case 7:
  if (caso == 0 || caso == 3) { var kx = (tw / 2) * -1} else { var kx = tw / 2 }
  if (caso == 0 || caso == 1) { var ky = (th ) + (r * -poffy[pst] ) - 0} else { ky = (r * -poffy[pst]) - 0}
  break;
// ---------------------------------------
  case 8:
  if (caso == 0 || caso == 3) { var kx = (tw ) + (r) } else { var kx = r }
  if (caso == 0 || caso == 1) { var ky = (th ) + (r * -poffy[pst] ) - 0} else { ky = (r * -poffy[pst]) - 0}
  break;
// ---------------------------------------
  default:

 }

  npx.x = npx.x + kx;
  npx.y = npx.y + ky;
  lolam = map.getLonLatFromPixel(npx);
  lola = OpenLayers.Layer.SphericalMercator.inverseMercator(lolam.lon,lolam.lat);
  xw = lola.lon;
  yw = lola.lat;
     return {x : xw, y : yw};

}

// ---------------------------------------------------
function pasatimeline() {

Ventana="t"; actualiza_link() ; 
// var f = top.frames['timeline'];
// f.ponerparam();
var f = parent.window.document.getElementById('sliderid');
f.height = 160;
var f = parent.window.document.getElementById('timelineid');
f.height = 550;
var f = parent.window.document.getElementById('m0id');
f.height = 0;
var f = parent.window.document.getElementById('divm0');
f.style.border="0px";
// top.frames['timeline'].ponerparam();
// Ambos
// top.frames['timeline'].pinta(top.frames['timeline'].sfi, top.frames['timeline'].sff);

var f = top.frames['timeline'].document.getElementById('printid');
f.style.visibility="visible";
var f = top.frames['slider'].document.getElementById('edit3');
f.style.visibility="hidden";
var f = top.frames['slider'].document.getElementById('demoForm2');
f.style.left="-100px";
var f = top.frames['slider'].document.getElementById('edit2');
f.style.visibility="visible";

}

function imprimeprev() {
finzoom();
// alert(estesid);
var param = getparam();

cadena =param;
clave = String(Math.floor(Math.random() * 200) + 100);

var encrypted = CryptoJS.AES.encrypt(cadena, clave);
param = clave + encrypted;

var urllink = '/map/atlas/mapap.html?' + param ;
// var urllink = '/map/atlas/mapap.html?' + "sid=" + estesid ;
// window.open(urllink);
loadUniquePage(urllink, screen.width, screen.height, 1, 1, 0, 'imp1', true);

}

function imprime() {
var f = document.getElementById('printid');
f.style.visibility="hidden";
var f = document.getElementById('cancelarid');
f.style.visibility="hidden";
window.print();
var f = document.getElementById('printid');
f.style.visibility="visible";
var f = document.getElementById('cancelarid');
f.style.visibility="visible";
}

function putlayer() {
// Forzar visibilidad del layer por fallo en Chrome

  if (rectang.visibility == true)  {
    rectang.setVisibility(false);
    var tt=setTimeout("rectang.setVisibility(true)", 10);
  }
  if (ciudad.visibility == true)  {
    ciudad.setVisibility(false);
    var tt=setTimeout("ciudad.setVisibility(true)", 10);
  
}
  if (hecho.visibility == true)  {
   hecho.setVisibility(false);
   var tt=setTimeout("hecho.setVisibility(true)", 10);
  }

}

function put_contribution(idkml) {

// Layer KML Adicional

try {
    datadicional.destroyFeatures();
   } catch (error) {}

urlkml = "http://" + estaurl + "/map/contribution/" + idkml + "/kml/" + lng +   "/file.kml";

var geographic = new OpenLayers.Projection("EPSG:4326");

filtro = new OpenLayers.Filter.Logical({
    type: OpenLayers.Filter.Logical.AND,
    filters: [
        new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
            property: "begin",
            value: 2012
        }),
        new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
            property: "end",
            value: 2012
        })
    ]
});

styleMap = new OpenLayers.StyleMap({'default':{
labelSelect: true,
                        labelXOffset:"${offx}",
                        labelYOffset:"${offy}",
                        angle: "${angle}",
                        label : "${lblico}",
                        fontColor: "${fcolor}",
                        fontFamily: "${fname}",
                        fontSize: "${fsize}",
                        fontWeight: "${fbold}",
                        labelAlign: "${labelAlign}",
                        pointRadius: "${radius}"
                    }});

filterStrategy = new OpenLayers.Strategy.Filter({filter: filtro});

         if (lyd == "y") { seve = true} else { seve = false}

datadicional = new OpenLayers.Layer.Vector("Contribution", {'displayInLayerSwitcher':false, 'visibility': seve, styleMap: styleMap,
    projection: geographic,
    strategies: [new OpenLayers.Strategy.Fixed(),  filterStrategy],

    protocol: new OpenLayers.Protocol.HTTP({
        url: urlkml,
        format: new OpenLayers.Format.KML( {
                       extractStyles: true, 
                       extractAttributes: true,
                        maxDepth: 2
        })
    })
});
map.addLayer(datadicional);

            f=document.Fecha.fechat.value;
            filtro.filters[0].value = parseInt(f);
            filtro.filters[1].value = parseInt(f);
            filterStrategy.setFilter(filtro);

// Leyenda adicional
urlkml = 'http://' + estaurl + '/map/contribution/' + idkml + '/legend/' + 'legend2.js'; 

   var jsload = function() {

 //  var windex = document.frmcontri.contribut.selectedIndex;
  if (getInternetExplorerVersion() > -1 && getInternetExplorerVersion() < 9) {
      datadicional.name ="";
  } else {
 //     datadicional.name = document.frmcontri.contribut.options[windex].text;
    datadicional.name = "Contribution";
  }

      ini_legend2();
      anolg2 = getdatelg2(f);
      leyenda2.name = etiq[12]  + " (" + datadicional.name + ")";

      if (ct==0) { 
          leyenda2.displayInLayerSwitcher=false;
          datadicional.displayInLayerSwitcher=false;
      } else {
          leyenda2.displayInLayerSwitcher=true;
          datadicional.displayInLayerSwitcher=true;
      }

      if (anolg2 != 0) {
          leyenda2.attribution='<img src="http://' + estaurl + "/map/contribution/" + idkml + '/legend/' + lng + '/' + anolg2 + lng  + '.jpg"'  + '>'
       } else {
         leyenda2.attribution='';
       }
      if (leyenda2.visibility == false) {} else {leyenda2.setVisibility(false);leyenda2.setVisibility(true)}
     };

   loadScript(urlkml, jsload);

}

function loadselectcontrol (loslayers1, loslayers2) {

// Anadir a selectControl
              datadicional.events.on({
                "featureselected": onKMLSelect,
                "featureunselected": onKMLUnselect
            });

         selectControl = new OpenLayers.Control.SelectFeature(
                                     loslayers1, {
                                    // hover: true,
                                    // highlightOnly: true,
                                    // toggle: true,
                                    onSelect: onFeatureSelect,
                                    //onUnselect: onFeatureUnselect,
                                    clickout: true,
                                    multiple: false
                                });

         selectControlHover = new OpenLayers.Control.SelectFeature(
                                     loslayers2, {
                                    hover: true,
                                    highlightOnly: true,
                                    // toggle: true,
                                    // onSelect: onFeatureSelect,
                                    //onUnselect: onFeatureUnselect,
                                    clickout: true,
                                    selectStyle: {fillColor: '#FFFFFF', fillOpacity: 0.3, strokeWidth: 0.5, strokeOpacity: 1, strokeColor: '#000000'},
                                    multiple: false
                                });

        map.addControl(selectControlHover);
        selectControlHover.activate();

        map.addControl(selectControl);
        selectControl.activate();
}

function loadScript(url, callback)
{

    // adding the script tag to the head as suggested before
   var head = document.getElementsByTagName('head')[0];
   var script = document.createElement('script');
   script.type = 'text/javascript';
   script.src = url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = callback;

   // fire the loading
   head.appendChild(script);

}

function getcontribution(nw) {

ct = nw;
// datadicional.protocol.url = "http://" + estaurl + "/map/contribution/" + nw + "/kml/" + lng +   "/file.kml";

                map.removeLayer(datadicional)  
                put_contribution(nw);

                selectControl.destroy();
                selectControlHover.destroy();

                 var loslayers1 = [datadicional, rectang,rectang2,ciudad2, hecho2];
                 var loslayers2 = [rectang,rectang2,ciudad2, hecho2];
                 loadselectcontrol(loslayers1, loslayers2);

}