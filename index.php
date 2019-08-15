<!DOCTYPE html>
<html lang="pl">
<head>
<meta charset="utf-8">
<title>Galeria ze Żłobka w Chojnowie</title>
<link rel="Shortcut icon" href="./grafiki/slonce_ikona.png" />
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
			<h3>Umożliwia łatwiejszy podgląd rozrabiajacych wnuków przez dziadków. Wpisz/wklej pełny adres do przeglądania galerii z witryny <a class="odnosnik_czerwony" href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a> lub skorzystaj z poniższej listy galerii</h3>
   <div id="formularz">
    <form action="#" method="post" id="wyszukaj">
				 <fieldset>
				 <label for="http_adres">Adres galerii</label>
				 <input type="text" id="http_adres" name="http_adres" placeholder="np. http://zlobek.chojnow.eu/u_tygryskow,a146.html" alt="Podaj adres podstrony konkretnej galerii" />
				 <input type="button" id="testowy_adres_button" name="testowy_adres_button" value="Testowy adres" />
     <input type="submit" id="http_adres_submit" role="submit" value="Zobacz wnuki" />
     <div id="form_error">Wymagane uzupełnienie pola tekstowego, wpisz adres podstrony z serwisu zlobek.chojnow.eu</div>				
		  </fieldset>
			</form>
			</div>	
			
				<div id="spis_tresci">
					<h2>Lista galerii ze żłobka</h2>
					 <div id="galeria_spis">
					 	
					 </div>
					 <div id="spis_sterowanie">
							<p id="status_galerii_spis"></p>
					 <h2 id="zaladuj_galerie_spis" class="przycisk clearfix2">Załaduj kolejne galerie</h2>	
					 </div>
					 <div id="wczytywanie_spis"><h2>Trwa wczytywanie... <img src="grafiki/slonce_40x40.png" /></h2>
		    </div>
		    	
					 <div id="galeria_spis_podmiana" class="clearfix">
					 	
					 </div>
				</div>	
		</div>		
	</header>

 <div id="glowna">
			<div id="komentarz">
			<h2>A poniżej może pojawią się zdjęcia wnuków, o ile podamy dobry adres i reszta zadziała prawidłowo...</h2>
			</div>
			
		<div id="wczytywanie"><h2>Trwa wczytywanie...  <img src="grafiki/slonce_40x40.png" /></h2>
		</div>
		<div id="nazwa_galerii">
			 <h2></h2>
			 <p></p>
		</div>	
		
		<div id="skladowisko"></div>
						
	<nav id="nawigacja_galeria">
	</nav>
	
			
							
	 <div id="zawartosc_do_podmiany">
			<!-- a tu miniaturki z adresu zewnętrznego oraz klikane przejście do galerii -->
		</div>
		
		<!-- <div id="php">
		
			<?php
			//echo "Dupa!";
			//phpinfo();
		 //echo("Dupa\n");
			//echo("Coś");
		 //echo file_get_contents('http://zlobek.chojnow.eu/u_tygryskow,a147.html');	
		 ?>
		</div> -->
	
		
		
	</div>

	<footer id="stopka">&copy;2017 v0.2.2 <button id="poco_button">Ale po co?</button> <button id="pomoc_button">Pomoc</button>
	
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
var g_element_zewnetrzny = "table.galeria";		//wszystko jest w tablicy o klasie "galeria", w komórce wyższej tablicy	
var g_adres_strony = "zlobek.chojnow.eu";			// nazwa serwisu
var g_folder_serwera = "zdjecia_galeria";									// ścieżka ma serwerze, tj. folder udostepniony 
var g_wyszukiwany_serwer = "";																										// na przechowywanie adresu serwera z protkołem
//var odnosnik_do_elem_galerii = "a.link_tresc";										// do galerii prowadzą odnośniki z tą klasą, do paginacji niestety też ;)
var g_protokol_www = "http://";
var g_matryca_nazwy_pliku 										= "zlobek_zdj_";
var g_matryca_nazwy_pliku_miniatury = "zlobek_zdjp_";	
var g_rozszerzenie_obrazka = ".jpg";
var g_nazwa_galerii = "";
var g_opis_galerii = "";	
	
// pomoc przy zaciąganiu
var g_przechwytywacz_php = "./przechwytywacz.php";			//skrypt z fopen do zaczytania strony przez stronę php. Wymaga serwera z PHP!
var g_przechwytywacz_php_zapytanie = "?url_zewn=";			// adres zmiennej GET, zawartość bez weryfikacji !!!

var g_tag_do_podmiany_zdjecia = "div#zawartosc_do_podmiany"; //element DOM, do którego load() wstawi zawartość tagu table.galeria z witryny zewnętrznej
var g_miejsce_na_zdjecia = "div#skladowisko"; // zamienić na coś	sensowniejszego
var g_wczytywanie = "#wczytywanie";
var g_wczytywanie_spis = "#wczytywanie_spis";	
	
var g_element_zewnetrzny_spis = "table.galeria";   //var g_element_zewnetrzny_spis = "td#tresc_glowna.tlo_artykulow";
var g_tag_do_podmiany_spis = "div#galeria_spis_podmiana";
var g_miejsce_na_spis = "div#galeria_spis";	
	
var g_ilosc_zaczytanych_paginacji_galerii = 0;
var g_biezaca_pozycja_galerii = 0;
var g_ilosc_zaczytanych_galerii = 0;					// ile elementów wstawiono już na stronę
var g_ilosc_wszystkich_galerii = 0;	
	
// ---------- ***  FUNKCJE PRAWIE GLOBALNE *** --------------		
	
function WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania )	{ 
		if ( element_witryny.length > 0 )  {	// dodanie spacji na początku, separator dla TAGU po nazwiem pliku 
		element_witryny = " " + element_witryny;				
		}
  
	 switch ( rodzaj_dzialania ) {
				
			case "galeria_podstrona":
				$(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function() {
					// alert( "LOAD się udała dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
					// logowanie sukcesu ;)
					console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
					// WYKONAJ DALSZE FUNKCJE, zależne od SUKCESU zaczytania lub nie	
					// kasuj poprzednią zawartość elementu???	

					GenerujPodstronyGalerii();
					}); //load-END
				
				break;
				
					
			case "spis_galerii" :
				
				$(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function() {
					// alert( "LOAD się udała dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
					// logowanie sukcesu ;)
					console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
					//var podmieniona_zawartosc = $(tag_podmieniany).html();
					//$(tag_podmieniany).html( unescape(encodeURIComponent(podmieniona_zawartosc)) );	// jednao z wielu mozliwych zamian kodowania
					
				// ... // przetwarzanie spisu treści
				GenerujSpisGalerii();
					
				}); // load-END

				
				break;

		case "spis_galerii_wybor" :
			 
				// ...		
				break;
		
				
			default:	
				 alert('WczytajZewnetrznyHTMLdoTAGU( tag: ' + tag_podmieniany + ', domena: ' + adres_domeny + ', zasób: ' + adres_zasobu + ', elem: ' + element_witryny + ', działanie: ' +  rodzaj_dzialania + ') ... COŚ POSZŁO NIE TAK');
					console.log('WczytajZewnetrznyHTMLdoTAGU( tag: ' + tag_podmieniany + ', domena: ' + adres_domeny + ', zasób: ' + adres_zasobu + ', elem: ' + element_witryny + ', działanie: ' +  rodzaj_dzialania + ') ... COŚ POSZŁO NIE TAK');
				//break;
 } //switch-rodzaj_dzialania-END
																
} // END-WczytajZewnetrznyHTMLdoTAGU() - DEFINICJA

	
function GenerujPodstronyGalerii(){ 	// to ma przygotować kolejne 

$('#wczytywanie').hide(100);	// schowaj informację, skoro wczytano zawartość
$('#glowna div:first').hide(100);	//showaj opis-informację
$('#skladowisko').show(100);	// pokaż kontener na zaczytaną zawartość

$('#nazwa_galerii').find('h2').text( g_nazwa_galerii );
$('#nazwa_galerii').find('p').text( g_opis_galerii );	
$('#nazwa_galerii').show(100);	

	
                    // te w specjalnym kontenerze, bo w spisie treści też są!!! 
var $lista_podstron = $('#zawartosc_do_podmiany a.link_tresc'); // FIXED! dodano na początku ciągu '#zawartosc_do_podmiany ' jako wyznacznik preszukiwanego elementu

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
		//	$( g_tag_do_podmiany_zdjecia ).append( nowyDiv ); 
	
			//$( g_tag_do_podmiany_zdjecia ).css({ "backgroundColor" : "yellow" }); 
		var nazwa_podstrony_galerii = $( $lista_podstron[i] ).text();  
			if ( ( nazwa_podstrony_galerii.search("nowsze") >= 0 ) || ( nazwa_podstrony_galerii.search("starsze") >= 0 ) ) {
			//alert('nazwa_podstrony_galerii: ' + $lista_podstron[i].text() );
			
			continue;  // nie wyświetlaj przyciku/-ów z starsze/nowsze dla danego wykonania pętli - wyjście z kroku pętli
			}  
			
		var odnosnik_podstrony = $( $lista_podstron[i] ).attr('href'); 	// wyciąga href z nawigacji podstrony/paginacji
		console.log('Natrafiono na odnośnik nr ' + String(i+1) + ' o zawartości \'' + odnosnik_podstrony + '\'');
		
		var nr_galerii = odnosnik_podstrony.split(",")[2];
			 //if ( !nr_galerii) { nr_galerii = 1; }
			nr_galerii = nr_galerii.substr(1); // dodatkowe usuwanie pierwszego znaku, tj. "p", które jest przed numerem podstrony galerr (numer kończy się ".html" - pomijane przy konwersji )
			
		var nowyPrzycisk = $('<button></button>', {
    id: "galeria_paginacja_" + String( i+1 ),
			 class : "przycisk_galeria",
		  value : odnosnik_podstrony,
			 text : "Galeria nr " + String(parseInt(nr_galerii)),
			 "data-tag" : g_tag_do_podmiany_zdjecia,
			 "data-adres_strony" : g_adres_strony,
			 "data-adres_galerii" : odnosnik_podstrony,
			 "data-elem_zewn" : g_element_zewnetrzny
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
// WczytajZewnetrznyHTMLdoTAGU( nowyDiv.attr('id'),g_adres_strony, odnosnik_podstrony, g_element_zewnetrzny, true); // false dla braku kolejnych świdrowań galerii
//	WczytajZewnetrznyHTMLdoTAGU( nowyDiv.get(0), g_adres_strony, odnosnik_podstrony, g_element_zewnetrzny, false); // false dla braku kolejnych świdrowań galerii

			//DISABLED powyższe !!!
			
			
		// to powyżej idzie asynchronicznie!!!	
		// wczytaj do każdego z nowoutworzonych elementów podstronę/paginację 
					// druga podstrona jest najczęscie ostatnia; zmęczenie serwera i czas odpowiedzi?!	
			
	 } // for-END
	} // //if-END $lista_podstron.length >= 1 == PRZESTAWIŁEM "}" Z DOŁU !!!
	
  //przeszukiwanie odnośników (miniatur) dla galerii i galeria większych
 //	$( odnosnik_do_elem_galerii ).css({ "border" : "1px solid yellow" }); // testowanie
 //var $tagi_obrazki  = $( g_tag_do_podmiany_zdjecia + ' a' );
 var $tagi_obrazki  = $( g_tag_do_podmiany_zdjecia + ' a:not(.link_tresc)' );
	//$tagi_obrazki.css({ "border" : "1px solid yellow" }); // testowanie
		
		console.log('Znaleziono na stronie ' + $tagi_obrazki.length + ' miniatur - dla zmiennej \'' + g_tag_do_podmiany_zdjecia + '\'' );
		
	 $( g_miejsce_na_zdjecia ).empty(); // czyszczenie bieżącej podstrony, dla wyświetlenie nowej galerii 
	 
		$tagi_obrazki.each(function(){
		
		var $biezacy = $(this);	
  var odnosnik = $biezacy.attr('href'); 
			
		var odnosnik_nr_zdjecia = ( odnosnik.split(",")[1] );
		var opis_obrazka = $biezacy.find('img').removeAttr('border').attr('alt'); // jak wywalić bordera?!
			
		console.log("Dla elementu <a> o HREF '" + odnosnik + "' split(\",\")[1] to '" + odnosnik_nr_zdjecia + " a ALT miniatury IMG to '" + opis_obrazka + "'" );	
			odnosnik_nr_zdjecia = odnosnik_nr_zdjecia.substr(1); // dodatkowe usuwanie pierwszego znaku, tj. "z", które jest przed numerem zdjęcia 

			
			// sklejanie adresu docelowego obrazka  
		var pelny_adres_odnosnika = g_protokol_www + g_adres_strony + "/" + g_folder_serwera + "/" + g_matryca_nazwy_pliku + odnosnik_nr_zdjecia + g_rozszerzenie_obrazka ;	
			$biezacy.attr( { "href" : pelny_adres_odnosnika, "data-lightbox" : "Galeria", "data-title" : opis_obrazka + " (" + odnosnik_nr_zdjecia + g_rozszerzenie_obrazka + ")", 
																			alt : opis_obrazka, title : opis_obrazka } ); // zmienia href na bezpośrednie odnośniki do serwera zewnętrznego
						// PLUS Lightbox w atrybutach data!!!
			// pelny_adres_odnosnika.replace( g_matryca_nazwy_pliku, g_matryca_nazwy_pliku_miniatury );
			$biezacy.find('img').attr( "src", pelny_adres_odnosnika.replace( g_matryca_nazwy_pliku, g_matryca_nazwy_pliku_miniatury ) ); 
			//$biezacy.parent().find('br').remove();
			//$biezacy.parent().find('font').remove();
							// kosmetyka żródła
			$biezacy.siblings().remove();
		// g_matryca_nazwy_pliku_miniatury = "zlobek_zdjp_";
			
			// sklejanie adresu dla miniatury, owiniętej odnośnikiem   -  
			// wstawienie odnośników do zdjęc w innym, właściwym obszarze
			$( g_miejsce_na_zdjecia ).append( $biezacy ); 
			
		}); //each-function-END
		//zaznacza
		
		
		// funkcja, która wygeneruja dobre linki do obrazków i jeszcze zmieni treść elementow
		
//	} //if-END $lista_podstron.length >= 1
} // GenerujPodstronyGalerii-END
	

function GenerujSpisGalerii() {
	
$( g_wczytywanie_spis ).hide(100);	// schowaj informację, skoro wczytano zawartość
//$('#glowna div:first').hide(100);	//showaj opis-informację
$( g_miejsce_na_spis ).show(100);	

    // tworzenie szablonu spisu
g_ilosc_zaczytanych_paginacji_galerii = $( g_miejsce_na_spis + " div.odnosnik" ).length; // zrób o 5 więcej niż jest ich na stronie

g_biezaca_pozycja_galerii++;	// indeks wyświetlanej aktualnie (kolejno) galerii
	
	if ( g_biezaca_pozycja_galerii == 1 )		// pierwsze przejście -- przetwarzamy pierwszy odnośnik, który zawiera najwyższy numer galerii
	{
	var $temp_odnosnik_tytul = $( g_tag_do_podmiany_spis + " td.galeria_kolor b a.link:first" );	 // dobre do czasu, o ile nie powstanie nowa galeria w trakcie przeglądania starej listy! 
 var temp_atrybut = $( $temp_odnosnik_tytul ).attr('href'); // np. "http://zlobek.chojnow.eu/u_tygryskow,a153.html"
	temp_atrybut = temp_atrybut.split(",")[1];	
 temp_atrybut = temp_atrybut.substr(1);		
	
	g_ilosc_wszystkich_galerii = parseInt( temp_atrybut );
		
	}

	for( var i=1 + g_ilosc_zaczytanych_paginacji_galerii ; i <= 5 + g_ilosc_zaczytanych_paginacji_galerii ; i++ ) {
	 // układ poziomy w elemencie jest do bani, za mało tekstu 
	/* var odnosnik_pojemnik = '<div id="kontener_odnosnik_' + String(i) + '" class="kontener_odnosnik"><div id="zdjecie_odnosnik_' + String(i) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener_tekstowy_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div></div>'; 	*/
	
	var odnosnik_pojemnik = '<div id="kontener_odnosnik_' + String(i) + '" class="kontener_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener_tekstowy_odnosnik"><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div></div>'; 	
		
	$( g_miejsce_na_spis ).append( odnosnik_pojemnik );		
	}	
		
//akcja wypełniacz - zdjęcia
var $odnosniki_zdjecia = $( g_tag_do_podmiany_spis + " td.galeria_kolor a.link_tresc" );	
	
 if ( $odnosniki_zdjecia.length > 0 )
	{
			for( var i=0 ; i < $odnosniki_zdjecia.length ; i++ ){
			var miejsce_docelowe = $( g_miejsce_na_spis + " .zdjecie_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );
				
			// ... 			// obrabianie odnośnika?!	
				
			var src_docelowe = g_protokol_www + g_adres_strony + "/" + $( $odnosniki_zdjecia[i] ).find('img').attr( "src");	
			$( $odnosniki_zdjecia[i] ).find('img').attr( "src", src_docelowe );
			$( miejsce_docelowe ).html( $odnosniki_zdjecia[i] ); // podmiana oryginalnej zawartości
			}
		}

	//akcja wypełniacz - tytuły
var $odnosniki_tytuly = $( g_tag_do_podmiany_spis + " td.galeria_kolor b a.link" );	
	
 if ( $odnosniki_tytuly.length > 0 )
	{
			for( var i=0 ; i < $odnosniki_tytuly.length ; i++ ){
			miejsce_docelowe = $( g_miejsce_na_spis + " .tytul_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );
				
			// ... 			// obrabianie odnośnika?!	
			var dlugosc_tekstu = $( $odnosniki_tytuly[i] ).text();
			$( $odnosniki_tytuly[i] ).removeClass('link').wrapInner('<h2></h2>'); // usuwanie obcej klasy link i dodanie h2/h3
				if ( dlugosc_tekstu.length < 15 ) 
				{ //if ( $(odnos )  )
				$( $odnosniki_tytuly[i] ).find('h2').addClass('nizszy'); // klasa z mniejszą czcionką o 25% pkt.
				}				
				if ( dlugosc_tekstu.length > 25 ) 
				{ //if ( $(odnos )  )
				$( $odnosniki_tytuly[i] ).find('h2').addClass('mniejszy'); // klasa z mniejszą czcionką o 25% pkt.
				}
			$( miejsce_docelowe ).html( $odnosniki_tytuly[i] );  // podmiana oryginalnej zawartości + 
			}
		}

	//akcja wypełniacz - data
var $odnosniki_data = $( g_tag_do_podmiany_spis + " td.galeria_kolor font" );	
	
 if ( $odnosniki_data.length > 0 )
	{
			for( var i=0 ; i < $odnosniki_data.length ; i++ ){
			miejsce_docelowe = $( g_miejsce_na_spis + " .data_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );
				
			// ... 			// obrabianie odnośnika?!
			var tekst_docelowy = $( $odnosniki_data[i] ).text();
			tekst_docelowy = tekst_docelowy.replace( "data publikacji: ", "z dnia: ");	
			$( $odnosniki_data[i] ).text( tekst_docelowy ).removeAttr("style");
				
			$( miejsce_docelowe ).html( $odnosniki_data[i] );
		}
	}
	
		//akcja wypełniacz - opis
var $odnosniki_opis = $( g_tag_do_podmiany_spis + " td blockquote div[align=justify]" );	
	
	//alert('Znaleziono aż ' + $odnosniki_opis.length + ' obiektów z " td blockquote div[align=justify]"');
 if ( $odnosniki_opis.length > 0 )
	{
			for( var i=0 ; i < $odnosniki_opis.length ; i++ ){
			miejsce_docelowe = $( g_miejsce_na_spis + " .opis_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

			//$( $odnosniki_data[i] ).text( tekst_docelowy ).removeAttr("style");
				
		var tresc_opisu = $( $odnosniki_opis[i] ).text() ;	
				$( miejsce_docelowe ).html( tresc_opisu );			
				
		var wysokosc_kontenera_div = $( miejsce_docelowe ).parents('.kontener_odnosnik').outerHeight();		
		var wysokosc_tytulu = $( miejsce_docelowe ).parents('.kontener_odnosnik').find('.tytul_odnosnik').outerHeight(true);
		var wysokosc_obrazka = $( miejsce_docelowe ).parents('.kontener_odnosnik').find('.zdjecie_odnosnik').outerHeight(true); // + 4;
		var wysokosc_daty = $( miejsce_docelowe ).parents('.kontener_odnosnik').find('.data_odnosnik').outerHeight(true);
		var wysokosc_tekstu = $( miejsce_docelowe ).outerHeight(true);		
		
		var roznica_zawartosc = wysokosc_kontenera_div - ( wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ); 				
			
		//opis maksymalnie może mieć 304px (16px * 19) -- wielokrotność wierszy dla tekstu o 100% == 16px 		
		
			if ( roznica_zawartosc < -35 )  // kolejnośc ma zneczenie, ewentualne sumowanie klas, najmnijsza wysokośc na końcu (nadpisywanie wartości wysokości dla podelementu)
			{
			$( miejsce_docelowe ).addClass('max_y_260');
			}
			if ( roznica_zawartosc < -85 ) 
			{
			$( miejsce_docelowe ).addClass('max_y_208');						
			}
			if ( roznica_zawartosc < -115 ) 
			{
			$( miejsce_docelowe ).addClass('max_y_160');						
			}
			if ( roznica_zawartosc < -175 ) 
			{
			$( miejsce_docelowe ).addClass('max_y_96');						
			}
				
				
		/*		
			if ( roznica_zawartosc < -175 ) 
			{
			$( miejsce_docelowe ).addClass('max_y_96');						
			}
			else
			{
				if ( roznica_zawartosc < -115 ) 
			 {
			 $( miejsce_docelowe ).addClass('max_y_160');						
			 }
				else
					{
					if ( roznica_zawartosc < -85 ) 
			 	{
					$( miejsce_docelowe ).addClass('max_y_208');						
					}
			  else
					{
						if ( roznica_zawartosc < -35 ) 
						{
						$( miejsce_docelowe ).addClass('max_y_260');						
						}
					}
				}
			}	*/
			
				
			/*if ( wysokosc_kontenera_div - ( wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ) > 250 ) // okreslanie wysokości względem pozostałych divów w elemencie...
			{
			$( miejsce_docelowe ).addClass('max_y_200');						
			}
			if ( wysokosc_kontenera_div - ( wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty ) > 150 ) // okreslanie wysokości względem pozostałych divów w elemencie...
			{
			$( miejsce_docelowe ).addClass('max_y_100');										
			}	*/			
						

		
	 tresc_opisu = "K: " + String(wysokosc_kontenera_div) + "-" + String(wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ) + " = " + String( roznica_zawartosc ) + " (" + String(wysokosc_tytulu) + ", " + String(wysokosc_obrazka) + ", " + String(wysokosc_daty) + ", " + String(wysokosc_tekstu) + ")<br />" + tresc_opisu ;			
		$( miejsce_docelowe ).html( tresc_opisu );			
			
		} // for-END
	}
	
	// czyszczenie kontenera źródłowego
	$( g_tag_do_podmiany_spis + ' tr' ).not(':last').remove();
	
	g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; //inkrementacja o każde 5 zdjęc z poszczególnych zaczytanych galerii 
	
	
	if ( g_ilosc_zaczytanych_galerii > g_ilosc_wszystkich_galerii ) // inne zmienne wstawić
	{
	$( g_miejsce_na_spis + " div.kontener_odnosnik:gt(" + g_ilosc_wszystkich_galerii + ")" ).css({ "backgroundColor" : "red" });	
	}
/*   // ... each() albo poprzez for()	
$odnosniki.each(function(){
var $biezacy = $(this);
 // ... each() albo poprzez for()	
	
}); 	
*/
	
	
	
	
	
var $wiersze_tabeli = $( g_tag_do_podmiany_spis + " tr:nth-child(4n-3)" );
	
	$wiersze_tabeli.each( function() {

		var $biezacy = $(this);
		$biezacy.css({ "border" : "1px dotted blue" });	

	});
	
//$wiersze_tabeli.length	
	
	
	// #div#galeria_spis_podmiana ... <td colspan="2"> a.link_tresc	
var $lista_podstron = $('#galeria_spis_podmiana td[colspan=2] a.link_tresc'); // te w specjalnym kontenerze, bo w spisie treści też są!!! 

	
	if ( $lista_podstron.length >= 1 )	// czy są jakieś odnośniki do podstron galerii?
	{					// startujemy od kolej strony po pierwszej, ale ostatni zawiera ciąg "starsze", a później każdy kolejny zawiera "nowsze" n apoczątku oraz "starsze" na końcu, pomijając swój indeks
	
	// i można przyjąć, że liczba odnośników stanowi liczbe galerii, ale pomijamy pierwszy i ostatni... więc liczymy 	
	var ile_podstron_spisu_tresci = 0;
		for (var i=0 ; i < $lista_podstron.length ; i++ ) {
			var nazwa_podstrony_galerii = $( $lista_podstron[i] ).text();  
			 if ( ( nazwa_podstrony_galerii.search("nowsze") >= 0 ) || ( nazwa_podstrony_galerii.search("starsze") >= 0 ) ) {
				continue;  //przeskok do kolejnego wywołania	
				}
		ile_podstron_spisu_tresci++;	
		}
	ile_podstron_spisu_tresci++; // konieczne do zliczenia aktualnej galerii, która nie generuje odnosnika	
		
	g_ilosc_zaczytanych_paginacji_galerii = ile_podstron_spisu_tresci;	  // muerto importante!
	
		
		

	// czyszczenie kontenera na nawigację galerii, jeżeli wcześniej zawierał zawartość
	$('p#status_galerii_spis').html('Znaleziono '  + $wiersze_tabeli.length + ' wierszy tabeli źródłowej oraz ' + $lista_podstron.length + ' podstron(-y) spisu treści.<br>Jesteś na ' + g_biezaca_pozycja_galerii + '. stronie galerii.<br />A wcześniej zaczytano: "' + g_ilosc_zaczytanych_paginacji_galerii + '" paginacji, a załadowano łącznie ' + g_biezaca_pozycja_galerii + ' (vs ' + g_ilosc_zaczytanych_galerii + ') elementów galerii ze wszystkich ' + g_ilosc_wszystkich_galerii + ' galerii');
			
		
	 //for (var i=0; i < $lista_podstron.length; i++) {	
	
	}
	
	
	$('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii  
	
	
} // GenerujSpisGalerii-END
	
	
	
// ---------- *** AUTO URUCHAMIANE *** --------------	
	
function ZaczytajSpisGalerii() {
//http://zlobek.chojnow.eu/galeria,k0,p1.html	- adres ostatniej galerii, wg. daty
var adres_ostatniej_galerii = "/galeria,k0,p1.html";	
var adres_zasobu_galerii = g_protokol_www + g_adres_strony;

 if ( g_biezaca_pozycja_galerii > 0 )
	{
	//var nowa_podstrona_spisu_galerii = g_biezaca_pozycja_galerii + 1;				
 adres_ostatniej_galerii = "/galeria,k0,p" + String( g_biezaca_pozycja_galerii + 1 ) + ".html";				
	}
					
$( g_wczytywanie_spis ).show(100); 
console.log('Załadowano spis treści dla ' + g_biezaca_pozycja_galerii + '. pozycji galerii, adres z http: "' + adres_zasobu_galerii + '" odnośnik: "' + adres_ostatniej_galerii + '".');	
WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_spis, adres_zasobu_galerii, adres_ostatniej_galerii, g_element_zewnetrzny_spis, "spis_galerii" ); 
	

// kodowanie ?!
// utfstring = unescape(encodeURIComponent(originalstring));	
	
}	// ZaczytajSpisGalerii-END
	
ZaczytajSpisGalerii();
	
	
	
	
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
var contentURI= 'http://zlobek.chojnow.eu/u_tygryskow,a147.html table.galeria';    // URL-do-przechwycenia, " " i #id-elementu-docelowego
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
	var serwer = g_protokol_www + $this.attr('data-adres_strony') + '/';
		
		$( g_wczytywanie ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 
		
		//alert("kliknięto '.przycisk_galeria'... albo kontener: " + this.tagName );
		//alert("VAL: '" + $this.attr('value') + "', DATA-TAG: " + $this.attr('data-tag') );
		
		// ?!?!
	//alert( 'TAG: ' + $this.attr('data-tag') + ' ADRES: ' + $this.attr('data-adres_strony') + ' GALERIA: ' + $this.attr('data-adres_galerii') + ' ELEMENT: ' + $this.attr('data-elem_zewn') );
  //WczytajZewnetrznyHTMLdoTAGU( nowyDiv.attr('id'), g_adres_strony, odnosnik_podstrony, g_element_zewnetrzny, true);
	
		//WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);
		WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), serwer, $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);

		//<button class="przycisk_galeria" id="galeria_paginacja_1" data-tag="div#zawartosc_do_podmiany" data-adres_strony="http://zlobek.chojnow.eu/" data-elem_zewn="table.galeria" value="u_misiow,a20,p2.html" data-adres_galerii="u_misiow,a20,p2.html">Galeria nr 1</button>
	
});	//  on("click")-$('#nawigacja_galeria')-END	
	
	
$('#spis_sterowanie').on("click", "#zaladuj_galerie_spis", function(){ 
	//var $this = $(this);
	//alert('Zdarzenie ładowania treści?!\n g_biezaca_pozycja_galerii: ' + g_biezaca_pozycja_galerii + ', g_ilosc_zaczytanych_paginacji_galerii: ' + g_ilosc_zaczytanych_paginacji_galerii );
		if ( g_biezaca_pozycja_galerii <= g_ilosc_zaczytanych_paginacji_galerii )
		{
		$( g_wczytywanie_spis ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 
		console.log('Na żądanie zaczytano kolejną podstronę w galerii ' + g_biezaca_pozycja_galerii + ' z ' + g_ilosc_zaczytanych_paginacji_galerii + ' podstron');
			
		ZaczytajSpisGalerii();
		//wyświetlenie-dodanie kolejnego spisu do już wyświetlonej listy odnosników	
		//WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);
		}
	
});			

	
/*	
$('#galeria_spis').on("click", ".kontener_odnosnik", function(){ 
var $this = $(this);
alert('Naciśnięto i wywołano zdjęcia z galerii "' + $this.find('div:first h2').text() + '"' ); 	
// przewinięcie ekranu do lokalizacji galerii
	
// wstawienrianimacji na ładowanie
	
// załadowanie odnosnika z 	
return; // wyjście, aby nie przechodzić do odnosnika	
});	//  on("click")-$('#nawigacja_galeria')-END		
*/	

$('#galeria_spis').on("click", "a", function(e){ 
var $this = $(this);
var galeria_docelowa = $this.attr('href');	

e.preventDefault();	// "nieprzechodzeniedalej" po odnośnku
	
g_nazwa_galerii = $this.text();	  // przypisanie treści -- tytułu dla danej galerii (wstępnie, jeśli naciśnięto na nagłówek a nie obrazek)
g_opis_galerii = $this.parents('.kontener_odnosnik').find('.opis_odnosnik').text();	
	
	if ( g_nazwa_galerii.length == 0 )  // jeżeli naciśnięto odnośnik z obrazkiem, ten drugi zawiera już treść odnośnika
		{
		g_nazwa_galerii = $this.parent().siblings('div.tytul_odnosnik').find('a h2').text();	
		}
//alert('g_tag_do_podmiany, g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/', galeria_docelowa, g_element_zewnetrzny, "galeria_podstrona")
//alert('WczytajZewnetrznyHTMLdoTAGU( tag: ' + g_tag_do_podmiany_zdjecia + ', domena: ' + g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/' + ', zasób: ' + galeria_docelowa + ', elem: ' + g_element_zewnetrzny + ') ... MYSZA NAJECHAŁA');
console.log('ZDARZENE: "Naciśnięto" i wywołano odnośnik do galerii "' + g_nazwa_galerii + '"' ); 	

	
	// przewinięcie ekranu do lokalizacji galerii
	
// wstawienie animacji na ładowanie
$( g_wczytywanie ).show();	
//var g_folder_serwera 		
// załadowanie odnosnika ze s	
WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_zdjecia, g_protokol_www + g_adres_strony + '/' , galeria_docelowa, g_element_zewnetrzny, "galeria_podstrona" ); 	
//WczytajZewnetrznyHTMLdoTAGU( g_, $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);	
//e.preventDefault();	
//return; // wyjście, aby nie przechodzić do odnosnika	
	
var pozycja_div_galeria = $('div#glowna').offset();
//wysokosc_div_galeria = wysokosc_div_galeria.top;

//$(document).animate({ ... }) scrollTop( wysokosc_div_galeria.top );	

	$('html, body').animate({ scrollTop : (pozycja_div_galeria.top - 8)	}, 700);	
	
	
});	//  on("click")-$('#nawigacja_galeria')-END			
	
	
	
	
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
	
 if ( pelny_adres_wpisany.indexOf( g_adres_strony ) != -1 )  // albo że .indexOf() != -1 // pelny_adres_wpisany.includes('zlobek.chojnow.eu') TRUE
	{				// + jeszcze jakieś warunki na poprawność
	var pelny_adres = g_protokol_www + g_adres_strony + "/";	// przypisanie samego adresu z protokołem
	//var pelny_adres  = pelny_adres_wpisany;				
 $('#form_error').slideUp(200); //zwinięcie
	}
	else
	{
	g_wyszukiwany_serwer = "";	// zerowamie potrzebne?!
 $('#form_error').slideDown(500); // rozwinięcie
	return false;	 // !!! i wyjście z przetwarzania !!!
	}
	
	var adres_tej_galerii = pelny_adres_wpisany.substr( pelny_adres.lastIndexOf('/') + 1 ); // szukanie podciągu od "/ do adresu_zasobu.html" 

	 alert('pełny_adres: "' + pelny_adres + '", adres_tej_galerii: "' + adres_tej_galerii + '"');
	//$('#http_adres').val( g_adres_strony + adres_tej_galerii );
 $('#http_adres').val( pelny_adres + adres_tej_galerii );	
	$('#http_adres').prop("disabled", true); 								// wyłaczenie, aby nie klikac wielokrotnie || attr() vs prop()
	$('#http_adres_submit').prop("disabled", true);	 // wyłaczenie, aby nie klikac wielokrotnie || attr() vs prop()
	$('#testowy_adres_button').prop("disabled", true);	 // wyłaczenie, aby nie klikac wielokrotnie || attr() vs prop()
	
	$( g_wczytywanie ).show(100);
	
	console.log( 'ADRES_STRONY: ' + g_adres_strony + ', ADRES_GALERII: ' + adres_tej_galerii + ', ZNACZNIK_ZEWN: ' + g_element_zewnetrzny + '\nRAZEM: ' + g_adres_strony + adres_tej_galerii + ' | ' + g_element_zewnetrzny	) ;
	
	
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

WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_zdjecia, g_adres_strony, adres_tej_galerii, g_element_zewnetrzny, "galeria_podstrona" ); 

	/* 
$('div#zawartosc_do_podmiany').load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny, function() {
 // alert( "LOAD się udała dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
	console.log( "wykonano load() dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny +"\'");
});
*/




	/*	$('div#zawartosc_do_podmiany').load( './przechwytywacz.php?url_zewn=http://zlobek.chojnow.eu/u_tygryskow,a147.html' , function() {
  alert( "LOAD się udała" ); 
	});
*/
	
//var cala_strona = load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres );
//$('div#zawartosc').html( cala_strona );	
//	alert( "Coś nie tak z load() dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
		//alert( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres );	
return false; // !!! konieczne przy click!
}); // click-END-#http_adres_submit
	
	
}); //document-ready-END
</script>
</body>
</html>
