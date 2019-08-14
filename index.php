<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>Galeria ze Żłobka w Chojnowie</title>
<link rel="stylesheet" href="reset.css">
<link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">  <!-- czcionka Muli -->	
<link rel="stylesheet" href="styl.css">
<link rel="stylesheet" href="lightbox/css/lightbox.css">

<script src="jquery-3.2.1.js"></script>
<script src="lightbox/js/lightbox.js"></script>	
</head>

<body>

	<div id="witryna">

	<header id="naglowek">
  <div id="naglowek_kontener">
			
   <h1 class="zmienny">Do uruchomienia galerii wymagane podanie adresu witryny ze zdjęciami <button id="odswiez" style="margin: 0.05em; padding: 0.1em 0.6em; font-size: 60%;">Odśwież</button></h1>
			<h3>Umożliwia łatwiejszy podgląd rozrabiajacych wnuków przez dziadków. Wpisz/wklej pełny adres do przeglądania galerii z witryny <a href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a></h3>
   <div id="formularz">
    <form action="#" method="post" id="wyszukaj">
				 <fieldset>
				 <label for="http_adres">Adres galerii</label>
				 <input type="text" id="http_adres" name="http_adres" placeholder="np. http://zlobek.chojnow.eu/u_tygryskow,a146.html" alt="Podaj adres podstrony konkretnej galerii" />
				 <input type="button" id="testowy_adres_button" name="testowy_adres_button" value="Testowy adres" />
     <input type="submit" id="http_adres_submit" role="submit" value="Zobacz wnuki" />
     <div id="form_error">Pole adresu jest wymagane, wpisz właściwą wartość razem z http:// na początku!</div>				
		  </fieldset>
			</form>
			</div>		
		</div>		
	</header>

 <div id="glowna">
			<div id="komentarz">
			<h2>A poniżej może pojawią się zdjęcia wnuków, o ile podamy dobry adres i reszta zadziała prawidłowo...</h2>
			</div>
			
		<div id="wczytywanie"><h2>Trwa wczytywanie...</h2>
		</div>	
		
		<div id="skladowisko"></div>
						
	<nav id="nawigacja_galeria">
	</nav>
	
			
							
	 <div id="zawartosc_do_podmiany">
			<!-- a tu miniaturki z adresu zewnętrznego oraz klikane przejście do galerii -->
		</div>
		
		<div id="php">
		
			<?php
			//echo "Dupa!";
			//phpinfo();
		 //echo("Dupa\n");
			//echo("Coś");
		 //echo file_get_contents('http://zlobek.chojnow.eu/u_tygryskow,a147.html');	
		 ?>
		</div>
	
		
		
	</div>

	<footer id="stopka">&copy;2017 v0.1.2 <button id="poco_button">Ale po co?</button> <button id="pomoc_button">Pomoc</button>
	
	 <div id="poco">
	  <h3>Jaki jest cel?</h3>
	   <p>Ta strona odpowiada żywotnym potrzebom całego społeczeństwa. To jest witryna na skalę naszych możliwości. Ty wiesz, co my robimy tym serwisem? My otwieramy oczy niedowiarkom. Patrzcie, to nasze, przez nas wykonane i to nie jest nasze ostatnie słowo.</p>
	  <h3>Po polskiemu</h3>
	   <p>Galerię żłobka przeglądało się karygodnie, więc należało coś z tym zrobić. Obsługa tego serwisu również jest toporna, ale miejmy nadzieję, że z czasem zapewni ona łatwe funkcjonowanie. Kiedy powstanie optymalny interefejs obecnie wymagane kopiowanie odnośników nie będzie koniecznością, a jedynie prostym działaniem (no może jeszcze nie przyjemnością). </p>
	  <h3>Jeszcze raz</h3>
	  <p>Poniższa witryna ma za zadanie tylko ułatwić korzytanie z materiałów zawartych w serwisie żłobka. Twórcy zależy na przedłużeniu życia myszy oraz powierzchni dotykowych komputerów, dlatego jego celem jest przeniesienie obciążenia na klawisze strzałek oraz w przyszłości na ewentulane kółko myszy (funkcjonalność zależna od dostawcy usług, a w zasadzie wyboru innego dostawcy).     
	  <h3>Informacje i zastrzeżenia</h3>
	   <p>Wszelkie prawa do materiałów i zdjęć należą do ich właścicieli, tj. instytucji Żłobka w Chojnowie - <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a> oraz serwisu e-informator - <a href="http://e-informator.pl/" target="_blank">e-informator.pl</a>.</p>
	 </div>
	 <div id="pomoc">
  <h3>Witryna wymaga dostępu do lokalizacji, skąd pochodzą oryginalne materiały.</h3>
 	 <p>Niniejszy serwis służy tylko do łatwiejszego wyświetlania galerii z osobami skazanymi na pobyt w żłobku. Bezwzględnie jest wymagany dostęp do oryginalnego serwisu.</p>
 	<h3>Kopiuj-wklej</h3>
 	 <p>Bieżący serwis wymaga podania działającego odnośnika do serwisu zlobek.chojnow.eu, konkretnie do jednej z wielu galerii. Odnośnik z paska adresu należy wpisać (wkleić) w pole formularza. Prawdopodobnie ten mechanizm jest nieco utrudniony przy posługiowaniu się przeglądarką mobilną, korzytając z telefonu (smartfonu). Dowolna przeglądarka www z komputera zapewnia machanizm kopiowania.  
 	<h3>Podstrony</h3>
  	<p>Przeglądanie w galeriach ograniczających klikanie działa prawiłowo dla maksymalnie osiemnastu obrazków w galerii. Serwis ma umożliwić łatwą nawigację pomiędzy kolejnymi obrazkami.</p>
  <h3>Uwaga</h3> 
 	 <p>Witryna umożliwia oglądanie pokazu zdjęć poprzez mechanizm galerii tylko dla wskazanego żłobka, serwis nie wyświetli pokazu zdjęć dla innych adresów.</p>
	 </div>
	
	</footer>	
	
</div>	<!-- DIV#witryna -->
	

	

<script>

$(document).ready(function(){
/** GARŚĆ TEORII i FAKTÓW:
* ścieżka pełna do zdjęcia:	
*	http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdj_XXXXX.jpg			// <-- adres zdjęcia, X to cyfra [0..9]
* http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdjp_XXXXX.jpg 	// <-- adres miniatury zdjęcia ()
* http://zlobek.chojnow.eu/u_tygryskow,a147.html; 			// przykładowa strona z galerią
* http://zlobek.chojnow.eu/u_misiow,a20,p2.html						// przykładowa strona druga (2) galerii
* http://zlobek.chojnow.eu/1-u_misiow,z1028,p2.html		// przykładowa strona druga (2) z powiększonym zdjęciem nr 1 	
*
*/
var element_zewnetrzny = "table.galeria";		//wszystko jest w tablicy o klasie "galeria", w komórce wyższej tablicy	
var wyszukiwany_serwer = "zlobek.chojnow.eu";			// nazwa serwisu
var folder_serwera = "zdjecia_galeria";									// ścieżka ma serwerze, tj. folder udostepniony 
var adres_strony = "";																										// na przechowywanie adresu serwera z protkołem
//var odnosnik_do_elem_galerii = "a.link_tresc";										// do galerii prowadzą odnośniki z tą klasą, do paginacji niestety też ;)
var protokol_www = "http://";
var matryca_nazwy_pliku 										= "zlobek_zdj_";
var matryca_nazwy_pliku_miniatury = "zlobek_zdjp_";	
var rozszerzenie_obrazka = ".jpg"	
	
// pomoc przy zaciąganiu
var przechwytywacz_php = "./przechwytywacz.php";			//skrypt z fopen do zaczytania strony przez stronę php. Wymaga serwera z PHP!
var przechwytywacz_php_zapytanie = "?url_zewn=";			// adres zmiennej GET, zawartość bez weryfikacji !!!
var tag_do_podmiany = "div#zawartosc_do_podmiany"; //element DOM, do którego load() wstawi zawartość tagu table.galeria z witryny zewnętrznej
var miejsce_na_zdjecia = "div#skladowisko";	
	
// ---------- ***  FUNKCJE PRAWIE GLOBALNE *** --------------		
	
function WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rekurencja )	{ 
		if ( element_witryny.length > 0 )  {	// dodanie spacji na początku, separator dla TAGU po nazwiem pliku 
		element_witryny = " " + element_witryny;				
		}

		if ( rekurencja )
		{
		$(tag_podmieniany).load( przechwytywacz_php + przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function() {
		// alert( "LOAD się udała dla zapytania\n" + przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres + element_zewnetrzny );
			// logowanie sukcesu ;)
		console.log( "wykonano load() dla elementu '" + tag_podmieniany + "' dla zapytania \'" + przechwytywacz_php + przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
		// WYKONAJ DALSZE FUNKCJE, zależne od SUKCESU zaczytania lub nie	
		// kasuj poprzednią zawartość elementu???	
		GenerujPodstronyGalerii();
			});
		}
		else
		{
		$(tag_podmieniany).load( przechwytywacz_php + przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function() {
		// alert( "LOAD się udała dla zapytania\n" + przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres + element_zewnetrzny );
			// logowanie sukcesu ;)
		console.log( "wykonano load() dla elementu '" + tag_podmieniany + "' dla zapytania \'" + przechwytywacz_php + przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
		// !!! BEZ wykonania funkcji dla podstron witryny ...	 !!!
			});
		}																								
	} // END-WczytajZewnetrznyHTMLdoTAGU() - DEFINICJA

	
function GenerujPodstronyGalerii(){ 	// to ma przygotować kolejne 

$('#wczytywanie').hide(100);	// schowaj informację, skoro wczytano zawartość
$('#glowna div:first').hide(100);	//showaj opis-informację
$('#skladowisko').show(100);	// pokaż kontener na zaczytaną zawartość
	
var $lista_podstron = $('#zawartosc_do_podmiany ' + 'a.link_tresc');    // FIXED

	if ( $lista_podstron.length >= 1 )	// czy są jakieś odnośniki do podstron galerii?
	{					// startujemy od kolej strony po pierwszej, ale ostatni zawiera ciąg "starsze"
	
 // czyszczenie kontenera na nawigację galerii, jeżeli wcześniej zawierał zawartość
	$('nav#nawigacja_galeria').empty();
		
	 for (var i=0; i < $lista_podstron.length; i++) {
	
	 // 1.| utworz element - pojemnik dla każdej z podstron/paginacji 
	  /* var nowyDiv = $('<div></div>', {
    id: "nowa_paginacja_" + String( i+1 ),
				text: "Jestem kontenerem do zaczytania zawartości nr " + String( i+1 )
				, style: "background-color : yellow"  				// działa !!!
   });	*/
		// 2.| albo każda paginacja zaczytyuwana po kolei na żądanie - tak jest prościej  
			
			
		 //wstaw go za zaczytanym DIV-zewnętrznym
		//DISABLED !!!
		//	$( tag_do_podmiany ).append( nowyDiv ); 
	
			//$( tag_do_podmiany ).css({ "backgroundColor" : "yellow" }); 
		var nazwa_podstrony_galerii = $( $lista_podstron[i] ).text();  
			if ( ( nazwa_podstrony_galerii.search("nowsze") >= 0 ) || ( nazwa_podstrony_galerii.search("starsze") >= 0 ) ) {
			//alert('nazwa_podstrony_galerii: ' + $lista_podstron[i].text() );
			
			continue;  // nie wyświetlaj przyciku/-ów z starsze/nowsze dla danego wykonania pętli - wyjście z kroku pętli
			}  
			
		var odnosnik_podstrony = $( $lista_podstron[i] ).attr('href'); 	// wyciąga href z nawigacji podstrony/paginacji
		console.log('Natrafiono na odnośnik nr ' + String(i+1) + ' o zawartości \'' + odnosnik_podstrony + '\'');
		
		var nr_galerii = odnosnik_podstrony.split(",")[2];
			nr_galerii = nr_galerii.substr(1); // dodatkowe usuwanie pierwszego znaku, tj. "p", które jest przed numerem podstrony galerr (numer kończy się ".html" - pomijane przy konwersji )
			
		var nowyPrzycisk = $('<button></button>', {
    id: "galeria_paginacja_" + String( i+1 ),
			 class : "przycisk_galeria",
		  value : odnosnik_podstrony,
			 text : "Galeria nr " + String(parseInt(nr_galerii)),
			 "data-tag" : tag_do_podmiany,
			 "data-adres_strony" : adres_strony,
			 "data-adres_galerii" : odnosnik_podstrony,
			 "data-elem_zewn" : element_zewnetrzny
			});	
		
		$('nav#nawigacja_galeria').append( nowyPrzycisk );
			///var odnosnik_nr_galerii = $( nowyPrzycisk ).attr('href'); // przecież mam powyżej?!
			/*
			odnosnik_nr_galerii = ( odnosnik_nr_galerii.split(",")[2] ); 		// http../u_misiow,a20,p2.html			
			odnosnik_nr_galerii = odnosnik_nr_galerii.substr(1); 		//obcięcie pierwzego znaku, tj. "p" 
		 
			
			
   if ( (i+1) == parseInt( odnosnik_nr_galerii ) ) {
				$( 'button#galeria_paginacja_' + (i+1) ).prop( "disabled", true );			
			} 
 */

	// !!!DZIAŁA, ale	tu leci nowyDiv jako jQ; z .get(0) jest [object HTMLDivElement], bez get() to [object Object] ... JAKKOLWIEK DZIAŁA!
	// WYŁACZAM DLA KOLEJNYCH PODSTRON ASYNCHRONICZNOŚĆ		
// WczytajZewnetrznyHTMLdoTAGU( nowyDiv.attr('id'), adres_strony, odnosnik_podstrony, element_zewnetrzny, true); // false dla braku kolejnych świdrowań galerii
//	WczytajZewnetrznyHTMLdoTAGU( nowyDiv.get(0), adres_strony, odnosnik_podstrony, element_zewnetrzny, false); // false dla braku kolejnych świdrowań galerii

			//DISABLED powyższe !!!
			
			
		// to powyżej idzie asynchronicznie!!!	
		// wczytaj do każdego z nowoutworzonych elementów podstronę/paginację 
					// druga podstrona jest najczęscie ostatnia; zmęczenie serwera i czas odpowiedzi?!	
			
	 } // for-END
	} // //if-END $lista_podstron.length >= 1 == PRZESTAWIŁEM "}" Z DOŁU !!!
	
  //przeszukiwanie odnośników (miniatur) dla galerii i galeria większych
 //	$( odnosnik_do_elem_galerii ).css({ "border" : "1px solid yellow" }); // testowanie
 //var $tagi_obrazki  = $( tag_do_podmiany + ' a' );
 var $tagi_obrazki  = $( tag_do_podmiany + ' a:not(.link_tresc)' );
	//$tagi_obrazki.css({ "border" : "1px solid yellow" }); // testowanie
		
		console.log('Znaleziono na stronie ' + $tagi_obrazki.length + ' miniatur - dla zmiennej \'' + tag_do_podmiany + '\'' );
		
	 $( miejsce_na_zdjecia ).empty(); // czyszczenie bieżącej podstrony, dla wyświetlenie nowej galerii 
	 
		$tagi_obrazki.each(function(){
		
		var $biezacy = $(this);	
  var odnosnik = $biezacy.attr('href'); 
			
		var odnosnik_nr_zdjecia = ( odnosnik.split(",")[1] );
		var opis_obrazka = $biezacy.find('img').removeAttr('border').attr('alt'); // jak wywalić bordera?!
			
		console.log("Dla elementu <a> o HREF '" + odnosnik + "' split(\",\")[1] to '" + odnosnik_nr_zdjecia + " a ALT miniatury IMG to '" + opis_obrazka + "'" );	
			odnosnik_nr_zdjecia = odnosnik_nr_zdjecia.substr(1); // dodatkowe usuwanie pierwszego znaku, tj. "z", które jest przed numerem zdjęcia 

			
			// sklejanie adresu docelowego obrazka  
		var pelny_adres_odnosnika = protokol_www + wyszukiwany_serwer + "/" + folder_serwera + "/" + matryca_nazwy_pliku + odnosnik_nr_zdjecia + rozszerzenie_obrazka ;	
			$biezacy.attr( { "href" : pelny_adres_odnosnika, "data-lightbox" : "Galeria", "data-title" : opis_obrazka + " (" + odnosnik_nr_zdjecia + rozszerzenie_obrazka + ")", 
																			alt : opis_obrazka, title : opis_obrazka } ); // zmienia href na bezpośrednie odnośniki do serwera zewnętrznego
						// PLUS Lightbox w atrybutach data!!!
			// pelny_adres_odnosnika.replace( matryca_nazwy_pliku, matryca_nazwy_pliku_miniatury );
			$biezacy.find('img').attr( "src", pelny_adres_odnosnika.replace( matryca_nazwy_pliku, matryca_nazwy_pliku_miniatury ) ); 
			//$biezacy.parent().find('br').remove();
			//$biezacy.parent().find('font').remove();
							// kosmetyka żródła
			$biezacy.siblings().remove();
		// matryca_nazwy_pliku_miniatury = "zlobek_zdjp_";
			
			// sklejanie adresu dla miniatury, owiniętej odnośnikiem   -  
			// wstawienie odnośników do zdjęc w innym, właściwym obszarze
			$( miejsce_na_zdjecia ).append( $biezacy ); 
			
		}); //each-function-END
		//zaznacza
		
		
		// funkcja, która wygeneruja dobre linki do obrazków i jeszcze zmieni treść elementow
		
//	} //if-END $lista_podstron.length >= 1
} // GenerujPodstronyGalerii-END
	
	
// ---------- *** FUNKCJE ZDARZENIOWE *** --------------	
	

$('#odswiez').click(function() {
    location.reload();
});	
	
$('#poco_button').click( function(){
 $('div#poco').toggle(200);	
});
	
$('#pomoc_button').click( function(){
 $('div#pomoc').toggle(200);	
});

	

	
	/*	
$(function(){
var contentURI= 'http://zlobek.chojnow.eu/u_tygryskow,a147.html table.galeria';    // URL TO GRAB + # of any desired element // if needed :)
$('#zawartosc_do_podmiany').load('przechwytywacz.php?url_zewn='+ contentURI);
});
*/
$('#testowy_adres_button').click(function(){
var testowy_adres_galerii = "http://zlobek.chojnow.eu/30-u_misiow,z1058,p1.html";
	
$('#http_adres').val( testowy_adres_galerii ); // przypisanie wartości domyślnej do pola wpisywania 
	
});
	

//$('.przycisk_galeria').on("click", function(){ 
	$('#nawigacja_galeria').on("click", ".przycisk_galeria", function(){ // ?! co obiektem zdarzenia?
	var $this = $(this);	
		
		$('#wczytywanie').show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 
		
		//alert("kliknięto '.przycisk_galeria'... albo kontener: " + this.tagName );
		//alert("VAL: '" + $this.attr('value') + "', DATA-TAG: " + $this.attr('data-tag') );
		
		// ?!?!
	//alert( 'TAG: ' + $this.attr('data-tag') + ' ADRES: ' + $this.attr('data-adres_strony') + ' GALERIA: ' + $this.attr('data-adres_galerii') + ' ELEMENT: ' + $this.attr('data-elem_zewn') );
  //WczytajZewnetrznyHTMLdoTAGU( nowyDiv.attr('id'), adres_strony, odnosnik_podstrony, element_zewnetrzny, true);
		WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), true	);

		//<button class="przycisk_galeria" id="galeria_paginacja_1" data-tag="div#zawartosc_do_podmiany" data-adres_strony="http://zlobek.chojnow.eu/" data-elem_zewn="table.galeria" value="u_misiow,a20,p2.html" data-adres_galerii="u_misiow,a20,p2.html">Galeria nr 1</button>
	
});		
	
	
$('#http_adres_submit').click(function() {	// submit ble?
	


	//wycięte do wyżej !!!
	/*
	$('button.przycisk_galeria').on("click", function(){

	alert( 'TAG: ' + this.attr('data-tag') + ' ADRES: ' + this.attr('data-adres_strony') + ' GALERIA: ' + this.attr('data-adres_galerii') + ' ELEMENT: ' + this.attr('data-elem_zewn') );
	//WczytajZewnetrznyHTMLdoTAGU( this.attr('data-tag'), this.attr('data-adres_strony'), this.attr('data-adres_galerii'), this.attr('data-elem_zewn'), true	);
	});	
	*/
		
var pelny_adres_wpisany = $('#http_adres').val(); // !!! uwaga! dane z formularza... przetrzepać jak poniżej, dodatkowo na usuwanie spacji dodać regexpa...
	
String.prototype.stripHTML = function () {			// "przetrzepywacz", wywołanie poniżej
var tagiUsuwane = /<(?:.|\s)*?>/g;
return this.replace(tagiUsuwane, "");
};

pelny_adres_wpisany = pelny_adres_wpisany.stripHTML(); // czyszczenie z formularza niechcianego nadmiaru

	//alert( 'PEŁNY_ADRES_BEZ_TAGÓW: ' + pelny_adres_wpisany ) ; // takie tam test-info
	
 if ( pelny_adres_wpisany.indexOf( wyszukiwany_serwer ) != -1 )  // albo że .indexOf() != -1 // pelny_adres_wpisany.includes('zlobek.chojnow.eu') TRUE
	{				// + jeszcze jakieś warunki na poprawność
	adres_strony = protokol_www + wyszukiwany_serwer + "/"	// przypisanie samego adresu z protokołem
	var pelny_adres = pelny_adres_wpisany;				
 $('#form_error').slideUp(200); //zwinięcie
	}
	else
	{
 $('#form_error').slideDown(500); //rozwinięcie
	return false;	 // !!! i wyjście z przetwarzania !!!
	}
	
	var adres_galerii = pelny_adres.substr( pelny_adres.lastIndexOf('/') + 1 ); // szukanie podciągu od "/ do adresu_zasobu.html" 

	$('#http_adres').val( adres_strony + adres_galerii );
	$('#http_adres').prop("disabled", true); 								// wyłaczenie, aby nie klikac wielokrotnie || attr() vs prop()
	$('#http_adres_submit').prop("disabled", true);	 // wyłaczenie, aby nie klikac wielokrotnie || attr() vs prop()
	$('#testowy_adres_button').prop("disabled", true);	 // wyłaczenie, aby nie klikac wielokrotnie || attr() vs prop()
	
	$('#wczytywanie').show(100);
	
	//console.log( 'ADRES_STRONY: ' + adres_strony + ', ADRES_GALERII: ' + adres_galerii + ', ZNACZNIK_ZEWN: ' + element_zewnetrzny + '\nRAZEM: ' + adres_strony + adres_galerii + ' | ' + element_zewnetrzny	) ;
	
	
/* 
cała galeria siedzi w tabeli o klasie .galeria, w komórkach osadzoen miniatury z odnośnikami do galerii zdjęć. Całość dzielona na podstrony po 6 x 3 zdjęcia (18 szt.)  
*/
	
	/*
  $.get( pelny_adres, function(data) {
			alert('Coś');
    $('zawartosc_do_podmiany').html(data);
  });
	*/
	
// to poniżej powinno działać tylo dla tej samej domeny/lokalizacji co skrypt, wiec porażka 

WczytajZewnetrznyHTMLdoTAGU( tag_do_podmiany, adres_strony, adres_galerii, element_zewnetrzny, true ); // dla pierwzego zaczytania z rekurencją podstron 

	/* 
$('div#zawartosc_do_podmiany').load( przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres + element_zewnetrzny, function() {
 // alert( "LOAD się udała dla zapytania\n" + przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres + element_zewnetrzny );
	console.log( "wykonano load() dla zapytania \'" + przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres + element_zewnetrzny +"\'");
});
*/




	/*	$('div#zawartosc_do_podmiany').load( './przechwytywacz.php?url_zewn=http://zlobek.chojnow.eu/u_tygryskow,a147.html' , function() {
  alert( "LOAD się udała" ); 
	});
*/
	
//var cala_strona = load( przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres );
//$('div#zawartosc').html( cala_strona );	
//	alert( "Coś nie tak z load() dla zapytania\n" + przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres + element_zewnetrzny );
		//alert( przechwytywacz_php + przechwytywacz_php_zapytanie + pelny_adres );	
return false; // !!! konieczne przy click!
}); // click-END-#http_adres_submit
	
	
}); //document-ready-END
</script>
</body>
</html>
