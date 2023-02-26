  


function IsNumeric(sText)
{
   if (Left(sText,1) == "-") { sText = Right(sText,sText.length - 1) }
 

   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
   }

function IsEntero(sText)
{
   if (Left(sText,1) == "-") { sText = Right(sText,sText.length - 1) }
 

   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
   }

function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function Mid(str, start, len)
{
// Make sure start and len are within proper bounds
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen)
          iEnd = iLen;
    else
          iEnd = start + len;
    return String(str).substring(start,iEnd);
}

function ltrim(s) {
return s.replace(/^\s+/, "");
}

function rtrim(s) {
return s.replace(/\s+$/, "");
}

function trim(s) {
return rtrim(ltrim(s));
}

function getWidth(text)
{
var spanElement = document.createElement('doc');
spanElement.style.whiteSpace = "nowrap";
spanElement.innerHTML = text;
document.body.appendChild(spanElement);
var width = spanElement.offsetWidth;
document.body.removeChild(spanElement);

return width;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }

  return rv;
}

function loadXMLDocSync(dname) 
{
var xmlDoc;
if (window.XMLHttpRequest)
  {
  xmlDoc=new window.XMLHttpRequest();
  xmlDoc.open("GET",dname,false);
// xmlDoc.timeout = 1000;
  xmlDoc.send("");
  return xmlDoc.responseXML;
  }
// IE 5 and IE 6
else if (ActiveXObject("Microsoft.XMLDOM"))
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async=false;
  xmlDoc.load(dname);
  return xmlDoc;
  }
// alert("Error loading document");
return null;
} 

function loadXMLDoc(dname, capa) {
var xmlDoc;
  // Obtener la instancia del objeto XMLHttpRequest
  if(window.XMLHttpRequest) {
    xmlDoc = new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {
    xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
  }
 
 xmlDoc.open('GET', dname,  true);
  // Preparar la funcion de respuesta
  xmlDoc.onreadystatechange = muestraContenido;
 
  // Realizar peticion HTTP
//  xmlDoc.open('GET', dname,  true);
   xmlDoc.send(null);
 
  function muestraContenido() {
    if( xmlDoc.readyState == 4) {
      if( xmlDoc.status == 200) {
       // Segun capa ************************************************
          switch(capa) {
          case 1:  // rectang label
           get_rectang_doc (xmlDoc.responseXML);
          break;
          case 2:  // Location
           get_ciudad_doc (xmlDoc.responseXML);
          break;
          case 3:  // Event map
           get_hecho_doc (xmlDoc.responseXML);
          break;
          case 4:  // Movement
           get_mov_doc (xmlDoc.responseXML);
          break;
          case 5:  // Suprap
           get_suprap_doc (xmlDoc.responseXML);
          break;
         default:
         }
       // Fin segun capa ************************************************
      }
    }
  }
}

function getQueryVariable(variable) { 
  var query = window.location.search.substring(1); 
  var vars = query.split("&"); 
  for (var i=0;i<vars.length;i++) { 
    var pair = vars[i].split("="); 
    if (pair[0] == variable) { 
      return pair[1]; 
    } 
  } 
//  alert('Query Variable ' + variable + ' not found'); 
} 


// TimeLine

  function defineTL() {

   var eventSource = new Timeline.DefaultEventSource();
   var ff = Timeline.DateTime.parseGregorianDateTime(1000);
   var bandInfos = [
     Timeline.createBandInfo({
         eventSource:    eventSource,
         date:           ff,
         width:          "80%", 
         intervalUnit:   Timeline.DateTime.DECADE, 
         intervalPixels: 100
     }),
     Timeline.createBandInfo({
         // eventSource:    eventSource,
         date:           ff,
         width:          "20%", 
         intervalUnit:   Timeline.DateTime.CENTURY, 
         intervalPixels: 100
     })
   ];
   bandInfos[1].syncWith = 0;
   bandInfos[1].highlight = true;
   
   var laurl = "http://" + estaurl + "/mapa2/demo/timeline2.xml"
   tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
   Timeline.loadXML(laurl, function(xml, url) { eventSource.loadXML(xml, url); });

  }

  function defineTL2() {

   var eventSource = new Timeline.DefaultEventSource();
   var ff = Timeline.DateTime.parseGregorianDateTime(1000);
   var bandInfos = [
     Timeline.createBandInfo({
         eventSource:    eventSource,
         date:           ff,
         width:          "80%", 
         intervalUnit:   Timeline.DateTime.DECADE, 
         intervalPixels: 100
     }),
     Timeline.createBandInfo({
         // eventSource:    eventSource,
         date:           ff,
         width:          "20%", 
         intervalUnit:   Timeline.DateTime.CENTURY, 
         intervalPixels: 100
     })
   ];
   bandInfos[1].syncWith = 0;
   bandInfos[1].highlight = true;
   
   var laurl = "http://" + estaurl + "/mapa2/demo/timeline2.xml"
   tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
   Timeline.loadXML(laurl, function(xml, url) { eventSource.loadXML(xml, url); });

  }

  function getfecha() {
   var sg = "";
   // var md = "0101"
   var fw = " ";
   var k = 0;
   var ff = tl.getBand(0).getCenterVisibleDate();
   fw = " " + ff + " ";
   fw = trim(fw);
   // alert(fw);
   if (fw.indexOf("B.C.") > -1) {
   sg = "-";
   // md = "9898";
   fw = Left(fw, fw.length - 5);
   }
   
   k = fw.lastIndexOf(" "); 
   fechaG = sg + Right(fw,fw.length - (k +1));
   alert(fechaG);
   putfecha(fechaG);
 
  }

  function getfecha2() {
   var sg = "";
   // var md = "0101"
   var fw = " ";
   var k = 0;
   var ff = tl.getBand(0).getCenterVisibleDate();
   fw = " " + ff + " ";
   fw = trim(fw);
   // alert(fw);
   if (fw.indexOf("B.C.") > -1) {
   sg = "-";
   // md = "9898";
   fw = Left(fw, fw.length - 5);
   }
   
   k = fw.lastIndexOf(" "); 
   fechaG = sg + Right(fw,fw.length - (k +1));
   // alert(fechaG);
   putfecha(fechaG, nmapaG);
 
  }

function isEven(num) {
  return !(num % 2);
}

function isOdd(num) {
  return !isEven(num);
}

function ChromeVersion() {

  try {
    return parseFloat(navigator.userAgent.match(/Chrome\/(\d+\.\d+)/)[1]) || undefined;
  } catch(e) {}
  return undefined;
}

// ****************************
// function createCookie(name,value,days) {
function createCookie(name,value,hours) {

	// if (days) {
	if (hours) {
		var date = new Date();
		// date.setTime(date.getTime()+(days*24*60*60*1000));
		date.setTime(date.getTime()+(hours*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function ParseVariable(variable, fich) { 
  var query = fich; 
  var vars = query.split("&"); 
  for (var i=0;i<vars.length;i++) { 
    var pair = vars[i].split("="); 
    if (pair[0] == variable) { 
      return pair[1]; 
    } 
  } 
//  alert('Query Variable ' + variable + ' not found'); 
} 