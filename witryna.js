
$(document).ready(function () {
/** GARŚĆ TEORII i FAKTÓW:
* ścieżka pełna do zdjęcia:	
* http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdj_XXXXX.jpg			// <-- adres zdjęcia, X to cyfra [0..9]
* http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdjp_XXXXX.jpg 	// <-- adres miniatury zdjęcia ()
* http://zlobek.chojnow.eu/u_tygryskow,a147.html; 			// przykładowa strona z galerią
* http://zlobek.chojnow.eu/u_misiow,a20,p2.html						// przykładowa strona druga (2) galerii
* http://zlobek.chojnow.eu/1-u_misiow,z1028,p2.html		// przykładowa strona druga (2) z powiększonym zdjęciem nr 1 ("1028" to nr zdjęcia w galerii) 	
*
*/
var g_element_zewnetrzny = "table.galeria";		//wszystko jest w tablicy o klasie "galeria", w komórce wyższej tablicy	
var g_adres_strony = "zlobek.chojnow.eu";		// nazwa serwisu
var g_folder_serwera = "zdjecia_galeria";       // ścieżka ma serwerze, tj. folder udostepniony 
var g_wyszukiwany_serwer = "";		    // na przechowywanie adresu serwera z protkołem
var g_protokol_www = "http://";
var g_matryca_nazwy_pliku = "zlobek_zdj_";
var g_matryca_nazwy_pliku_miniatury = "zlobek_zdjp_";	
var g_rozszerzenie_obrazka = ".jpg";


// pomoc przy zaciąganiu
var g_przechwytywacz_php = "./przechwytywacz.php";			//skrypt z fopen do zaczytania strony przez stronę php. Wymaga serwera z PHP!
var g_przechwytywacz_php_zapytanie = "?url_zewn=";			// adres zmiennej GET, zawartość bez weryfikacji !!!

var g_tag_do_podmiany_zdjecia = "div#zawartosc_do_podmiany"; //element DOM, do którego load() wstawi zawartość tagu table.galeria z witryny zewnętrznej
var g_miejsce_na_zdjecia = "div#skladowisko"; // zamienić na coś sensowniejszego
var g_wczytywanie = "#wczytywanie";
var g_wczytywanie_spis = "#wczytywanie_spis";	

var g_element_zewnetrzny_spis = "table.galeria";   //var g_element_zewnetrzny_spis = "td#tresc_glowna.tlo_artykulow";
var g_tag_do_podmiany_spis = "div#galeria_spis_podmiana";
var g_miejsce_na_spis = "div#galeria_spis";	

var g_ilosc_wszystkich_paginacji_galerii = 0;   // ile ogółem jest podstron ze spisem galerii, w grupach po pięć, poza ostatnią grupą 1..5 elementów 
var g_zaczytana_ilosc_paginacji_galerii = 0;  // ile pozostało podstron poza zaczytaną i wyświetloną podstroną
var g_biezaca_pozycja_galerii = 0;          // które eementy już wyświetlono/zaczytano od ostatniego (jako pierwszego) w grupach po pięć
var g_ilosc_zaczytanych_galerii = 0;		// ile elementów wstawiono do tej pory na stronę
var g_ilosc_wszystkich_galerii = 0;	        // ilość galerii zawartych na www
var g_suma_klikniec_zaladuj = 0;            // zliczanie kliknięc jako żądanie ładowania + auto_ładowanie

var g_wybrany_nr_galerii = 0;               // zapamiętanie co siedzi w polu od numeru galerii (pozycja suwaka)
var g_wybrany_nr_podstrony_galerii = 0;     // zapamiętanie co siedzi w polu od numeru podstrony galerii (też suwak)

var $g_input_nr_galerii	= $('input#galeria_wybrany_nr'); 
var $g_suwak_nr_galerii	= $('input#suwak_galerii'); 
var $g_input_nr_podstrony_galerii = $('input#podstrona_wybrany_nr'); 
var $g_suwak_nr_podstrony_galerii = $('input#suwak_podstrony'); 
    
    
	
// ---------- ***  FUNKCJE PRAWIE GLOBALNE *** --------------		
	
function WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane ) 
{ 
//debugger; 
    if ( element_witryny.length > 0 ) element_witryny = " " + element_witryny; // dodanie spacji na początku, separator dla TAGU po nazwie pliku     				
   
    if ( !dane ) dane = { ktoraPodstrona : 1 }; // aby nie było "TypeError" przy braku tego parametru w auto-wywołaniu bez kliknięcia podstrony (pierwsza podstrona)
        
    // utfstring = unescape(encodeURIComponent(originalstring)); // kodowanie zaczytanych znaków?! // ... już załatwione w php
    
    switch ( rodzaj_dzialania ) {
				
        case "galeria_podstrona":
            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )// alert( "LOAD się udała dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
                {	
                // logowanie sukcesu ;)
                console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania '" 
                            + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny 
                            + "'. Docelowo ma być wyświetlona " + dane.ktoraPodstrona + ". podstrona galerii.");
                // WYKONAJ DALSZE FUNKCJE, zależne od SUKCESU zaczytania lub nie	
                // kasuj poprzednią zawartość elementu???	
                NaprawBrakujaceSRCwKontenerze ( tag_podmieniany, true );
                CzyscNiepotrzebneElementy();	
                //GenerujPodstronyGalerii( element_witryny, dane.ktoraPodstrona );
                GenerujPodstronyGalerii( tag_podmieniany, dane.ktoraPodstrona  );                                        
                }
                else
                {
                // to nie powinno się generalnie wywoływać, lepiej odwołać się do obsługi błędu w CATCH    
                var komunikatOBledzie = "Coś się zwaliło przy PODSTRONIE galerii! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;
                //alert(komunikatOBledzie);
                $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );  
                PrzewinEkranDoElementu('p.blad', 500);    

                }
            }); //load-END
            } //try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁAD! " + err2 + "/nCoś się zwaliło przy PODSTRONIE galerii! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            //alert(komunikatOBledzie);	
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); 
            PrzewinEkranDoElementu('p.blad', 500);    
            }


            break;


        case "spis_galerii" :

            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )
                {	
                // alert( "LOAD się udała dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
                // logowanie sukcesu ;)
                console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
                //var podmieniona_zawartosc = $(tag_podmieniany).html();
                //$(tag_podmieniany).html( unescape(encodeURIComponent(podmieniona_zawartosc)) );	// jednao z wielu mozliwych zamian kodowania

            // ... // przetwarzanie spisu treści
                NaprawBrakujaceSRCwKontenerze ( tag_podmieniany );
                CzyscNiepotrzebneElementy();	    
                GenerujSpisGalerii();
                }
                else
                {
                var komunikatOBledzie = "Coś się zwaliło przy SPISIE galerii! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")";    
                //alert(komunikatOBledzie);
                $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
                PrzewinEkranDoElementu('p.blad', 500); 

                }

            }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁAD! " + err2 + "/nCoś się zwaliło przy SPISIE galerii! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;   
            //alert(komunikatOBledzie);
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );     
            PrzewinEkranDoElementu('p.blad', 500); 
            }

         break;

        case "wybrana_galeria_rekurencja" :

            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )
                {
                UsunBrakujaceSRCwIMGPozaPrzekazanym ( tag_podmieniany, dane.pozycjaWGalerii );    
                console.log( "Ładowanie przed rekurencją (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
                    
                    
                $('#nazwa_galerii').removeClass('szara_zawartosc'); 
                    
                var namiaryWybranejGalerii = OdczytajTresciOdnosnikaWybranejGalerii ( tag_podmieniany, dane.pozycjaWGalerii );

                UzupełnijNaglowekBiezacejGalerii ( namiaryWybranejGalerii );
                    
                    // poniżej wywołanie ponownego ładowania po określeniu adresu docelowej galerii
                    // to samo miejsce docelowe, tam samo dołączane elementy zaczytane -- nadpisywanie już niepotrzebnej zawartości
                // dane.$.extend( dane, namiaryWybranejGalerii ); 
                    
                WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, namiaryWybranejGalerii.adres, element_witryny, "wybrana_galeria", dane );    
                    
                    // zmienić parametry wywołania dla rekurencji !!! 
                    // WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane );


   
                    
                }
                else
                {
                var komunikatOBledzie = "Coś się zwaliło przy GENEROWANIU SPISU wybranej GALERII! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;
                //alert(komunikatOBledzie);
                $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );                       
                PrzewinEkranDoElementu('p.blad', 500); 
                }

            }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁAD! " + err2 + "/nCoś się zwaliło przy GENEROWANIU SPISU wybranej! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            //alert(komunikatOBledzie);
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );                 
            PrzewinEkranDoElementu('p.blad', 500); 
            }

                    // ...		
            break;


        case "wybrana_galeria" :

            try 
            {	  // tu "adres_zasobu" już jako ścieżka bezwzględna
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )
                {	
                console.log( "Pierwsze ładowanie podwójnie zapętlone (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");

                //UsunBrakujaceSRCwKontenerze ( element_witryny );  // ponowne kasowanie, teraz wszystkie bez wyjątku wylatują elementy  
                    
                $('#wczytywanie').hide(100);	// dopiero teraz usunięcie animacji ładowania

                $('#skladowisko').empty(); // zerowanie ewentualnej zawartości w tym kontenerze    
                
                $('#skladowisko').show(100);    
                //$('#skladowisko').show( 100, PrzewinEkranDoElementu( 'div#skladowisko', 200, -8 )  );	// pokaż kontener na zaczytaną zawartość + 
                                                // + przewiń po wyświetleniu całości    
                   
                $('#skladowisko').html('<h1>Tu wkrótce pojawią się elementy - pierwsza podstrona zdjęć z wybranej galerii nr ' + dane.pozycjaWGalerii + 
                                       '</h1><p>Adres docelowej galerii: ' + adres_zasobu + '</p>' );    
                //JakaśFunkcja();	// tu wywołaj jakąś fukcję
                    
                NaprawBrakujaceSRCwKontenerze ( '#skladowisko_status_wybranej_galerii', 'przetwarzaj galerię, nie spis treści' ); // taki teścik
                GenerujPodstronyGalerii ( '#skladowisko_status_wybranej_galerii' );    
                    
                    
                    // a w niej wywołaj samą siebie
                }
                else
                {	
                var komunikatOBledzie = "Coś się zwaliło przy GENEROWANIU WYBRANEJ GALERII! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
                //alert(komunikatOBledzie);
                $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
                PrzewinEkranDoElementu('p.blad', 500);     
                    
                }

            }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁAD! " + err2 + "/nCoś się zwaliło przy GENEROWANIU WYBRANEJ GALERII! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); 
            PrzewinEkranDoElementu('p.blad', 500);     
            alert(komunikatOBledzie);   // tu wyjatkowo zostaje komunikat w formie okna
            }

                // ...		
            break;				

 
        case "wybrany_spis_galerii" :

            try 
            {	  // tu "adres_zasobu" już jako ścieżka bezwzględna
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )
                {	
                console.log( "Ładowanie (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");
                //PrzewinEkranDoElementu('div#wybrany_zaczytany_spis', 500, -200);
                $('div#wybrane_galerie_spis').removeClass('szara_zawartosc');    
                // Generuj spis wybranej galerii (podstrony spisu treści)
                //$('div#wybrany_zaczytany_spis').show();    
                $('div#wczytywanie_wybrane_galerie_spis').hide(100);
                    
                NaprawBrakujaceSRCwKontenerze( 'div#skladowisko_wybrane_galerie_spis');
                    
                GenerujSpisWybranejGalerii( 'div#skladowisko_wybrane_galerie_spis', 'div#wybrane_galerie_spis', dane.ktoraPodstrona );
                    
                    
                    
                    // zaczytanie wybranego spisu poniżej już istniejącego spisu
                }
                else
                {	
                var komunikatOBledzie = "Coś się zwaliło przy GENEROWANIU SPISU dla WYBRANEJ GALERII! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
                //alert(komunikatOBledzie);
                $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
                PrzewinEkranDoElementu('p.blad', 500);     
                    
                }

            }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁAD! " + err2 + "/nCoś się zwaliło przy GENEROWANIU SPISU dla WYBRANEJ GALERII! STATUS: " + status + " , XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); 
            PrzewinEkranDoElementu('p.blad', 500);     
            alert(komunikatOBledzie);   // tu wyjatkowo zostaje komunikat w formie okna
            }
 		
            break;	               
            

        default:
            var komunikatOBledzie = 'WczytajZewnetrznyHTMLdoTAGU( tag: ' + tag_podmieniany + ', domena: ' + adres_domeny + ', zasób: ' + adres_zasobu + ', elem: ' + element_witryny + ', działanie: ' +  rodzaj_dzialania + ') ... COŚ POSZŁO NIE TAK' ;
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); 
            PrzewinEkranDoElementu('p.blad', 500);     
            alert(komunikatOBledzie);
            console.log(komunikatOBledzie);
            //break;
    } //switch-rodzaj_dzialania-END
	
	
	
	function CzyscNiepotrzebneElementy() {
    /* błedy zgłaszana w konsoli dla pobierania niepotrzebnych plików - grafiki:
                    <img src="zdjecia/zlobek.gif" border="0" align="center">
                    <img src="zdjecia/zlobek.jpg" border="0">
                    <img src="zdjecia/zlobek_90_2.jpg" alt="(szerokość: 150 / wysokość: 92)">
                    <img src="zdjecia/zlobek_90_132.jpg" alt="(szerokość: 190 / wysokość: 190)">
    + odwołania do plików zewnętrznych witryny macierzystej;
                    <SCRIPT src='js/cookie.js' type='text/javascript'></SCRIPT>
                    <LINK href='style/stylglowny.css' rel='stylesheet' type='text/css' />
    */	
    var $pierwszy_obrazek = $('img[src*="zdjecia/zlobek.gif"]');
        if ( $pierwszy_obrazek.length === 1 ) 
        {
        console.info('usuwanie pliku grafiki dla "zdjecia/zlobek.gif"');	
        $pierwszy_obrazek.remove();
        }
        //$('img[src*="zdjecia/zlobek.jpg"]').remove();

    };
																
} // END-WczytajZewnetrznyHTMLdoTAGU() - DEFINICJA

    

function GenerujPodstronyGalerii ( kontenerZrodlowy, nrWyswietlanejGalerii ) { 	// poniżej wartości domyślne dla parametrów ES5
nrWyswietlanejGalerii = parseInt( nrWyswietlanejGalerii );    
    if ( ( !kontenerZrodlowy ) || ( kontenerZrodlowy == '') ) kontenerZrodlowy = '#zawartosc_do_podmiany';
    if ( ( nrWyswietlanejGalerii == undefined ) || ( isNaN( nrWyswietlanejGalerii) ) ) nrWyswietlanejGalerii = 1;    
var kontenerDocelowyElement = "div#skladowisko";
var $kontenerDocelowy = $( kontenerDocelowyElement ); 

    
var wysokoscDokumentu = $(document).height();
var wysokoscDivWczytywanie = $('#wczytywanie').height();    
var wysokoscDivKomentarz = $('div#komentarz').height();    
var odlegloscPionowaDocelowego = $kontenerDocelowy.offset().top;
var wysokoscOknaPrzegladarki = $(window).height();
console.log("PRZED - Dokument: " + wysokoscDokumentu + "px, Okno: " + wysokoscOknaPrzegladarki + "px, PozycjaY #skladowiska: " + odlegloscPionowaDocelowego 
            + "px, wysokość DIV#wczytywanie: " + wysokoscDivWczytywanie + "px, wysokość DIV#komentarz: " + wysokoscDivKomentarz );
//PrzewinEkranDoElementu('div#skladowisko', 200, -8);  // złe miejsce, przed trteścią


$('nav#nawigacja_galeria').empty();     // czyszczenie kontenera na nawigację galerii, NIEZALEŻNIE czy wcześniej zawierał zawartość
$('#wczytywanie').hide(100);	// schowaj informację, skoro wczytano zawartość
$('#glowna div#komentarz').hide(100);	//showaj opis-informację o ile była pokazana
// $kontenerDocelowy.show( 100, PrzewinEkranDoElementu( kontenerDocelowyElement, 200, -8 - (wysokoscDivWczytywanie + wysokoscDivKomentarz) )  );	// pokaż kontener na zaczytaną zawartość + przewiń po wyświetleniu całości
$kontenerDocelowy.show( 100);	// pokaż kontener na zaczytaną zawartość ... + przewiń po wyświetleniu całości?
    
    //weryfikacja położenia w pionie przed dodaniem zawartości - miniatur zdjęć z danej galerii

// UzupełnijNaglowekBiezacejGalerii( g_nazwa_galerii, g_opis_galerii, g_obrazek_galerii_src );
    // powyższe wywołanie zastąpiono poniższy kod  
    // (przeniesiono wywołanie bezpośrednio do obsługi kliknięcia, aby nie czekać na juz pobrany wynik (2x tekst, +src ), tylko na ładowane zdjęcia)   
/*    
$('#nazwa_galerii').find('h2').html( g_nazwa_galerii ); 	// było.text( ... )
$('#nazwa_galerii').find('p').html( g_opis_galerii );		// było.text( ... )
$('#nazwa_galerii').find('img').attr( 'src', g_obrazek_galerii_src );  
$('#nazwa_galerii').show(100);	
*/
	
var $listaPodstron = $( kontenerZrodlowy + ' a.link_tresc' ); // wyszukiwanie wewnątrz danego pojemnika 

    if ( $listaPodstron.length >= 1 )	// czy są jakieś odnośniki do podstron/paginacji galerii?
    {					// startujemy od kolej strony po pierwszej, ale ostatni zawiera ciąg "starsze"


        
    var nazwaPodstronyGalerii = '';
/*    var numerPodstronyDoWyswietlenia = 0;
    var numerJeszczeNieokreślony = true;   */ 
        for (var i=0; i < $listaPodstron.length; i++) {
            // każda podstrona/paginacja zaczytywana po kolei z odsyłaczem w formie tekstowej -- treść tekstowa danego odnośnika
        nazwaPodstronyGalerii = $( $listaPodstron[i] ).text();  // pozyskiwanie bezpośredniej treści tekstowej odsyłacza
            if ( ( nazwaPodstronyGalerii.search("nowsze") >= 0 ) || ( nazwaPodstronyGalerii.search("starsze") >= 0 ) ) 
            {
            // nic nie rób dla takiego odnośnika, najlepiej zakończyć iterację
            continue;  // nie wyświetlaj przyciku/-ów z starsze/nowsze dla danego wykonania pętli - wyjście z kroku pętli
            }  

        var odnosnikPodstrony = $( $listaPodstron[i] ).attr('href'); 	// wyciąga href z nawigacji podstrony/paginacji
        console.log('Natrafiono na odnośnik nr ' + (i+1) + ' o zawartości \'' + odnosnikPodstrony + '\'');

        //var nrGalerii = odnosnikPodstrony.split(",")[2]; // to był wystarczający warunek, póki w "tytule" nie zawarto przecinka/ów (",")
        var nrGalerii = parseInt ( odnosnikPodstrony.substr( odnosnikPodstrony.lastIndexOf(",") + 2, odnosnikPodstrony.length - 5 )	);
            // http.../u_misiow,a20,p2.html	
            // usuwanie przecinka i "p", które są o "2 przed" numerem podstrony galerii 
            // treść z numerem kończy się ".html" - pomijane te 5 znaków przy krojeniu STRINGU)

            /* if ( numerJeszczeNieokreślony )
            {
            numerPodstronyDoWyswietlenia++;
                if ( ( numerPodstronyDoWyswietlenia < nrGalerii ) || ( numerPodstronyDoWyswietlenia == $listaPodstron.length ) )
                {
                numerJeszczeNieokreślony = false;
                }
            }*/
            
        var nowyPrzycisk = $('<button></button>', {
        // var nowyPrzycisk = $('<input></input>', { 
        // type : "button",            
            id : "galeria_paginacja_" + ( i+1 ),
            class : "przycisk_galeria",
            value : nrGalerii, 
            text : "Galeria nr " + nrGalerii,
            "data-tag" : g_tag_do_podmiany_zdjecia,
            "data-adres_strony" : g_adres_strony,
            "data-adres_galerii" : odnosnikPodstrony,
            "data-elem_zewn" : g_element_zewnetrzny
        });	     

        $('nav#nawigacja_galeria').append( nowyPrzycisk ); // wstawianie przycisku innego niż "poprzednia/następna" podstrona danej galerii
                // też brak przycisku dla bieżacej galerii, np. w formie wyłączonego (nieaktywnego), bo brak takiego odnośnika teraz na www
        } // for-END
    } // //if-END $listaPodstron.length 

//przeszukiwanie odnośników dla miniatur w galerii, link z miniatury prowadzi do normalnej (większej) kopii obrazka
// do galerii prowadzą odnośniki z tą klasą, do paginacji niestety też ;) | same zdjęcia i miniatury bez przypisanej klasy dla <a>
var $odnosnikiMiniatur  = $( kontenerZrodlowy + ' a:not(.link_tresc)' );
    //$odnosnikiMiniatur.css({ "border" : "1px solid yellow" }); // testowanie

console.log('Znaleziono na podstronie ' + $odnosnikiMiniatur.length + ' miniatur - dla zmiennej \'' + g_tag_do_podmiany_zdjecia + '\'' );

        // zweryfikować obliczenie bieżącej galerii we wcześniejszej pętli ...
    
$( g_miejsce_na_zdjecia ).empty(); // czyszczenie bieżącej podstrony, dla wyświetlenie nowej galerii 
$( g_miejsce_na_zdjecia ).append('<h2>Zdjęcia z bieżącej <span>' + nrWyswietlanejGalerii  + '.</span> podstrony galerii</h2>');  // dopisanie nagłówka dla bieżącej galerii - z parametru wywołania
//$( g_miejsce_na_zdjecia ).append('<h2>Zdjęcia z bieżącej ' + numerPodstronyDoWyswietlenia  + '. podstrony wybranej galerii</h2>');  // dopisanie nagłówka dla bieżącej galerii OBLICZONEGO, na podstawie przebiegu 
    
    $odnosnikiMiniatur.each(function(){

    var $biezacy = $(this);	
    var odnosnikZdjecia = $biezacy.attr('href'); 

    /* var atrybut_href_pozycja = atrybut_href.lastIndexOf(",");		
        atrybut_href = atrybut_href.substr( atrybut_href_pozycja + 2 ); // +2 znaki za pozycją ',' i 'a'
        g_ilosc_wszystkich_galerii = parseInt( atrybut_href );
    */
        // podobnie określany numer, jako konwersja wybranego wycinka z części odnośnika
        // tu końcówka napisu z numerem podstrony już do niczego niepotrzebna 
    var odnosnikNrZdjecia = parseInt( odnosnikZdjecia.substr( odnosnikZdjecia.lastIndexOf( ",z") + 2, odnosnikZdjecia.length - 8 ) );

    var opisObrazka = $biezacy.find('img').removeAttr('border').attr('alt'); // pozyskanie ALT wraz z usunięciem głupiego atrybutu danego obrazka

    console.log("Dla elementu <a> o HREF '" + odnosnikZdjecia + "' NR_ZDJĘCIA to '" + odnosnikNrZdjecia + "', a ALT miniatury IMG to '" + opisObrazka + "'" );	

    // sklejanie adresu docelowego obrazka z ustalonych fragmentów i ścieżki względnej (numeru zdjęcia w zasadzie)   
    var pelnyAdresOdnosnika = g_protokol_www + g_adres_strony + "/" + g_folder_serwera + "/" + g_matryca_nazwy_pliku + odnosnikNrZdjecia + g_rozszerzenie_obrazka ;	
    $biezacy.attr( { "href" : pelnyAdresOdnosnika, "data-lightbox" : "Galeria", "data-title" : opisObrazka + " (" + odnosnikNrZdjecia + g_rozszerzenie_obrazka + ")", 
                    alt : opisObrazka, title : opisObrazka } ); // zmienia href na bezpośrednie odnośniki do serwera zewnętrznego
            // PLUS Lightbox w atrybutach data!!!
    // pełnyAdresOdnosnika.replace( g_matryca_nazwy_pliku, g_matryca_nazwy_pliku_miniatury );
    // po refaktoryzacji tu powinna byc już podana przetworzona galeria miniatur z "dobrymi" adresami bezwzględnymi dla SRC, więc POMIJAM poniższe   
    // $biezacy.find('img').attr( "src", pelnyAdresOdnosnika.replace( g_matryca_nazwy_pliku, g_matryca_nazwy_pliku_miniatury ) ); 
        // kosmetyka żródła - pozbywanie się zawartości "sąsiedniej" w danym mikrokontenerze (wylatuje <br> i <font> - wszystko poza <a>) 
    $biezacy.siblings().remove();

    // sklejanie adresu dla miniatury, owiniętej odnośnikiem   -  
    // przeklejenie - wstawienie odnośników do zdjęc w innym, właściwym obszarze
    $kontenerDocelowy.append( $biezacy ); 
    }); //each-function-END

    //weryfikacja położenia w pionie po dodaniu zawartości - miniatur zdjęć z danej galerii    
wysokoscDokumentu = $(document).height();
odlegloscPionowaDocelowego = $kontenerDocelowy.offset().top;
wysokoscOknaPrzegladarki = $(window).height();
console.log("Wymiary PO - Dokument: " + wysokoscDokumentu + "px, Okno: " + wysokoscOknaPrzegladarki + "px, PozycjaY #skladowiska: " + odlegloscPionowaDocelowego + "px");
// powinno być warunkowe przesuwanie, gdy dodana zawartość przewinęła nieznacznie pozycję przesuniętego okna, a zniknięcie prostokąta ładowania też nie podwyższyło tego okna
 // if () {}  //gdy większa wysokośc elementu niż wys-DOKUMENTU - wys-OKNA  
// PrzewinEkranDoElementu('div#skladowisko', 200, -8 );    // druga kopia "wyrównawcza"

//	} //if-END $listaPodstron.length >= 1
} // GenerujPodstronyGalerii-END    
    
	

function GenerujSpisGalerii() {
console.log('Wszystkich podstron jest ' + g_ilosc_wszystkich_paginacji_galerii + ', zaczytano ' + g_zaczytana_ilosc_paginacji_galerii 
            + ' podstron, pozycja w galerii to ' + g_biezaca_pozycja_galerii +', a kliknięć było ' + g_suma_klikniec_zaladuj + '.'); 

    // schowaj informację, skoro wczytano zawartość
    if ( ( g_biezaca_pozycja_galerii > 0 ) && ( ( g_biezaca_pozycja_galerii + 1 ) >= g_suma_klikniec_zaladuj ) ) $( g_wczytywanie_spis ).hide(100);	

$( g_miejsce_na_spis ).show(100);	

//debugger;	

// tworzenie szablonu spisu
 //g_zaczytana_ilosc_paginacji_galerii = $( g_miejsce_na_spis + " div.kontener_odnosnik" ).length; // ma być o 5 więcej niż na stronie (szablon do wstawienia), co to robi???
g_zaczytana_ilosc_paginacji_galerii = 0; // i tak późniejsza pętla działa zawsze na +5 elementów na stronie, nie oblicza warunku na podstawie 

	
    if ( g_biezaca_pozycja_galerii === 0 )		// pierwsze przejście -- przetwarzamy pierwszy odnośnik, który zawiera najwyższy numer galerii
    {
    $( g_wczytywanie_spis ).hide(100); // ukrycie animacji ładowania przy pierwszym zaczytywaniu automatycznym    
    g_ilosc_zaczytanych_galerii	= -5 ;
    var $temp_odnosnik_tytul = $( g_tag_do_podmiany_spis + " td.galeria_kolor b a.link:first" );	 // dobre do czasu, o ile nie powstanie nowa galeria w trakcie przeglądania starej listy! 
    var atrybut_href = $( $temp_odnosnik_tytul ).attr('href'); // np. "http://zlobek.chojnow.eu/u_tygryskow,a153.html"
    //temp_atrybut = temp_atrybut.split(",")[1]; // jest dobre, ale leży przy dodanym ',' w adresie odnosnika (jako treść)
    var atrybut_href_pozycja = atrybut_href.lastIndexOf(",");		
    atrybut_href = atrybut_href.substr( atrybut_href_pozycja + 2 ); // +2 znaki za pozycją (',' i 'a'), poprawna konwersja liczby na początku danego ciągu
    g_ilosc_wszystkich_galerii = parseInt( atrybut_href );
        
        //g_ilosc_wszystkich_paginacji_galerii    // też szukamy "najostatniejszej" paginacji - podstrony z najwyższym numerem/odnośnikiem
        // czy to mniej zasmieci przestrzeń? (+) nie potrzeba tworzyć tablicy X-elementów, aby pobrać tylko jej ostatni lub przedostani element
    var ostatniaPaginacja = $( g_tag_do_podmiany_spis + " table.galeria tbody tr td a.link_tresc:last" );  // "najbardziej optymalny" wyróżnik toto nie jest 
   
    var ilePaginacji = parseInt( ostatniaPaginacja.text() );
    
        if ( isNaN(ilePaginacji) ) // jeśli mamy "starsze >>" jako ostatnie to wynikiem konwersji jest 'NaN'
        {
        ostatniaPaginacja.remove(); // usuń ostatni element, po czym pobierz "nowy ostatni" -- tak samo jak powyżej 
        ostatniaPaginacja = $( g_tag_do_podmiany_spis + " table.galeria tbody tr td a.link_tresc:last" );    
        
        ilePaginacji = parseInt( ostatniaPaginacja.text() ); //  zmieniana "warunkowo" treść z warunku
        }

    //alert('ILE_PAGINACJI: ' + ilePaginacji);
        if ( ilePaginacji > 0 ) g_ilosc_wszystkich_paginacji_galerii = ilePaginacji;  // warunkowe przypisanie zaczytanego maksimum podstron (ewentualnego), gdy SĄ JUŻ WPISY w ilości > 5, dla 1..5 będzie lipa    
        
    //odniesie tej wartości do maksymalnej wartośc przesuwu suwaka wyboru galerii + inicjowanie suwaka i inputa na tę wartość
    console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii i wyboru podstron ...');		

    g_wybrany_nr_galerii = g_ilosc_wszystkich_galerii;
        if ( g_wybrany_nr_galerii > 1 ) g_wybrany_nr_galerii = parseInt( g_wybrany_nr_galerii / 2 );    // ustawienie na połowie wartości przedziału
        
    $g_suwak_nr_galerii.attr( 'max' , g_ilosc_wszystkich_galerii );     // ustalenie zakresu maksymalnego dla suwaka
    $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );	
    $g_input_nr_galerii.val( g_wybrany_nr_galerii );	

    g_wybrany_nr_podstrony_galerii = g_ilosc_wszystkich_paginacji_galerii;
        if ( g_wybrany_nr_podstrony_galerii > 1 ) g_wybrany_nr_podstrony_galerii = parseInt( g_wybrany_nr_podstrony_galerii / 2 );   // ustawienie na połowie wartości przedziału        
        
    $g_suwak_nr_podstrony_galerii.attr( 'max' , g_ilosc_wszystkich_paginacji_galerii );
      // jednak bez ustawiania na maksimum, bo to okresla PIERWSZĄ podstronę spisu treści galerii, a nie ostatnią... więc zostaje automat albo 'MIN' 
    $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );	
    $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        
        
    console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii... PO -- g_wybrany_nr_galerii: ' + g_wybrany_nr_galerii + ', a POZYCJA: ' + atrybut_href_pozycja 
                                                    + ' dla odnośnika: ' + atrybut_href );		

    PrzewinEkranDoElementu( 'div#zaczytany_spis > h2', 500, 2 );    // Przewinięcie do znalezionych galerii - tylko przy pierwszym-auto-załadowaniu treści
    //g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5;

    //g_biezaca_pozycja_galerii++; // powinno to pozostać, bo przecież to jest jak symulowanie naciśnięcia pierwszego pobrania galerii   
    // g_biezaca_pozycja_galerii++;	// indeks wyświetlanej aktualnie (kolejno) galerii	-- inkrementację dodano w zdarzeniu naciskania obiektu "ZAŁADUJ GALERIE" 
    
    g_suma_klikniec_zaladuj++;  // użycie w ch-rze licznika automatycznego     
    } //if-END
    
g_biezaca_pozycja_galerii++;
g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; //inkrementacja o każde 5 zdjęc z poszczególnych zaczytanych galerii 	
	
//	for( var i=1 + g_zaczytana_ilosc_paginacji_galerii ; i <= 5 + g_zaczytana_ilosc_paginacji_galerii ; i++ ) {
	for( var i=1 ; i <= 5  ; i++ ) {	// zawsze +5 elementów DIV, po co je wcześniej zliczać?
	 // układ poziomy w elemencie jest do bani, za mało tekstu 
	/* var odnosnik_pojemnik = '<div id="kontener_odnosnik_' + String(i) + '" class="kontener_odnosnik"><div id="zdjecie_odnosnik_' + String(i) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener_tekstowy_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div></div>'; 	*/
	
	var odnosnik_pojemnik = '<div id="kontener_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="kontener_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i + g_ilosc_zaczytanych_galerii) + '</div><div class="kontener_tekstowy_odnosnik"><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div></div>'; 	
		
	$( g_miejsce_na_spis ).append( odnosnik_pojemnik );		
	}	
		
//akcja wypełniacz - zdjęcia
var $odnosniki_zdjecia = $( g_tag_do_podmiany_spis + " td.galeria_kolor a.link_tresc" );	
	
    if ( $odnosniki_zdjecia.length > 0 )
    {
        for( var i=0 ; i < $odnosniki_zdjecia.length ; i++ ){
        var miejsce_docelowe = $( g_miejsce_na_spis + " .zdjecie_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

        // ... 			// obrabianie odnośnika?!	
            // tu zaedytowac po wprowadzniu funkcji naprawiającej globalnie SRC
        // var src_docelowe = g_protokol_www + g_adres_strony + "/" + $( $odnosniki_zdjecia[i] ).find('img').attr( "src");	
        //var src_docelowe = $( $odnosniki_zdjecia[i] ).find('img').attr( "src");	// to niepotrzebne, bo już SRC naprawione
        // $( $odnosniki_zdjecia[i] ).find('img').attr( "src", src_docelowe );
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
            { 
            $( $odnosniki_tytuly[i] ).find('h2').addClass('nizszy'); // klasa ze zwiększonym odstępem pionowym - wyśrodkowanie w pionie
            }				
            if ( ( dlugosc_tekstu.length >= 25 ) && ( dlugosc_tekstu.length < 35 )  ) 
            { 
            $( $odnosniki_tytuly[i] ).find('h2').addClass('mniejszy'); // klasa z mniejszą czcionką o 25% pkt.
            }
            if ( dlugosc_tekstu.length >= 35 ) 
            { 
            $( $odnosniki_tytuly[i] ).find('h2').addClass('najmniejszy'); // kolejne zmniejszenie czcionki tytułu  dla <h2>    
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
        //tekst_docelowy = tekst_docelowy.replace('<font>', '' );
        //tekst_docelowy = tekst_docelowy.replace('</font>', '' );

        // poniższe niepotrzebne, tylko kilka liter -- nie ma potrzeby kopiować znacznika	
        //$( $odnosniki_data[i] ).text( tekst_docelowy ).removeAttr("style");
        //$( miejsce_docelowe ).html( $odnosniki_data[i] );

        $( miejsce_docelowe ).text( tekst_docelowy );	
        }
    }
	
		//akcja wypełniacz - opis
var $odnosniki_opis = $( g_tag_do_podmiany_spis + " td blockquote div[align=justify]" );	
	
	//alert('Znaleziono aż ' + $odnosniki_opis.length + ' obiektów z " td blockquote div[align=justify]"');
    if ( $odnosniki_opis.length > 0 )
    {
        for( var i=0 ; i < $odnosniki_opis.length ; i++ ) {
        miejsce_docelowe = $( g_miejsce_na_spis + " .opis_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

        //$( $odnosniki_data[i] ).text( tekst_docelowy ).removeAttr("style");

        var tresc_opisu = $( $odnosniki_opis[i] ).text() ;	
        $( miejsce_docelowe ).html( tresc_opisu );			

            /*
            // z jakiejś racji wysokości nie zawsze się aktualizują, czasem wartości wzorcowe szablonu się przenoszą na stałe
            // czyżby operacje w DOMie się nie odświeżały?
            // przeniesiono do kolejnej pętli for
        var wysokosc_kontenera_div = $( miejsce_docelowe ).parents('.kontener_odnosnik').outerHeight();		
        var wysokosc_tytulu = $( miejsce_docelowe ).parents('.kontener_odnosnik').find('.tytul_odnosnik').outerHeight(true);
        var wysokosc_obrazka = $( miejsce_docelowe ).parents('.kontener_odnosnik').find('.zdjecie_odnosnik').outerHeight(true); // + 4;
        var wysokosc_daty = $( miejsce_docelowe ).parents('.kontener_odnosnik').find('.data_odnosnik').outerHeight(true);
        var wysokosc_tekstu = $( miejsce_docelowe ).outerHeight(true);		

        var roznica_zawartosc = wysokosc_kontenera_div - ( wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ); 				

        //opis maksymalnie może mieć 304px (16px * 19) -- wielokrotność wierszy dla tekstu o 100% == 16px 		

         if	( roznica_zawartosc < 0 )
            {
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
            }	*/

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


            /*
            tresc_opisu = "K: " + String(wysokosc_kontenera_div) + "-" + String(wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ) + " = " + String( roznica_zawartosc ) + " (" + String(wysokosc_tytulu) + ", " + String(wysokosc_obrazka) + ", " + String(wysokosc_daty) + ", " + String(wysokosc_tekstu) + ")<br />" + tresc_opisu ;			
        $( miejsce_docelowe ).html( tresc_opisu );			*/

        } // for-END


                // osobna pętla specjalnego przeznaczenia, powrót do warunku
        for( var i=0 ; i < $odnosniki_opis.length ; i++ ) {
        miejsce_docelowe = $( g_miejsce_na_spis + " #kontener_odnosnik_" + String( g_ilosc_zaczytanych_galerii + 1 + i ) );

        var wysokosc_kontenera_div = $( miejsce_docelowe ).outerHeight();		
        var wysokosc_tytulu = $( miejsce_docelowe ).find('.tytul_odnosnik').outerHeight(true);
        // czemu IMG lub DIV z nim się mierzy jak chce i kiedy chce?!	
        //var wysokosc_obrazka = $( miejsce_docelowe ).find('.zdjecie_odnosnik').outerHeight(true); // + 4;
        var wysokosc_obrazka = $( miejsce_docelowe ).find('img').outerHeight(true) + 4; // + 4 do obrazka z obramowaniem 2 * 4px;	
        var wysokosc_daty = $( miejsce_docelowe ).find('.data_odnosnik').outerHeight(true);
        var wysokosc_tekstu = $( miejsce_docelowe ).find('.opis_odnosnik').outerHeight(true);		

        var roznica_zawartosc = wysokosc_kontenera_div - ( wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ); 				

        //opis maksymalnie może mieć 304px (16px * 19) -- wielokrotność wierszy dla tekstu o 100% == 16px 		

            if	( roznica_zawartosc < 0 )
            {
                if ( roznica_zawartosc < -35 )  // kolejnośc ma znaczenie, ewentualne sumowanie klas, najmnijsza wysokośc na końcu (nadpisywanie wartości wysokości dla podelementu)
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
            }	

        var tresc_opisu = $( $odnosniki_opis[i] ).text() ;		//wzorcowa, ale już właściwa treśc każdego z odnośników

        tresc_opisu = "K: " + String(wysokosc_kontenera_div) + "-" + String(wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ) + " = " + String( roznica_zawartosc ) + " (" + String(wysokosc_tytulu) + ", " + String(wysokosc_obrazka) + ", " + String(wysokosc_daty) + ", " + String(wysokosc_tekstu) + ") g_galerii: " + String(g_ilosc_zaczytanych_galerii) + ", o_t.l: " + String($odnosniki_tytuly.length) +  "<br />" + tresc_opisu ;			
        $( miejsce_docelowe ).find('.opis_odnosnik').html( tresc_opisu );		
        } // for-END-specjał	

            // pętla specjal TU była

    } // if-end opis

	
	
	// czyszczenie kontenera źródłowego
$( g_tag_do_podmiany_spis + ' tr' ).not(':last').remove();
	
		
	//if ( g_biezaca_pozycja_galerii == 1 )		// pierwsze przejście -- ten sam warunek co powyżej w funkcji !!!
	//{
	//g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; //inkrementacja o każde 5 zdjęc z poszczególnych zaczytanych galerii 
	//}
	
	
	// obowiązakowe czyszczenie nadmiaru, warunek na szablon vs na ilość załadowanych
//debugger;
	
var $nadmiar = $( g_miejsce_na_spis + " div.kontener_odnosnik:has(h3)");
    if ( $nadmiar.length > 0 ) 
    { 
        // na for(), już śmiga
        for (var i=0; i < $nadmiar.length ; i++) {
        console.log('Znaleziono nadmiar w ilości ' + (i+1) + ' wpisu/wpisów z ' + $nadmiar.length + ' dla obiektu o id="' + $($nadmiar[i]).attr('id') + '", który usunięto.');
            //$(this).css({ "backgroundColor" : "#933" }); 
        $($nadmiar[i]).remove();
        g_ilosc_zaczytanych_galerii--;	// !!!	
        }
    /* // to samo co powyżej, inna pętla
    var i=0;	
     $nadmiar.each( function() { // for() na each()
        i++;	
        //var id_nadmiaru = $(this).attr('id');	
     console.log('Znaleziono nadmiar w ilości ' + i + ' z ' + $nadmiar.length + ' wpisu/wpisów dla obiektu o id="' + $(this).attr('id') + '", który usunięto.');
     //$(this).css({ "backgroundColor" : "#933" }); 
        $(this).remove();
     g_ilosc_zaczytanych_galerii--;	// !!!

        });  //each-END */
    }
	
	
	if ( g_ilosc_zaczytanych_galerii >= g_ilosc_wszystkich_galerii ) // warunkowo drugie czyszczenie, póki co tylko w formie wizualnego ostrzeżenia
	{
	//$( g_miejsce_na_spis + " div.kontener_odnosnik:gt(" + ( g_ilosc_wszystkich_galerii - 1 )+ ")" ).css({ "backgroundColor" : "#666" });	
    $( g_miejsce_na_spis + " div.kontener_odnosnik:has(h3)").css({ "backgroundColor" : "#666" });  // masz <h3> to "wypad"	
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

	}); // each-END
	
    //$wiersze_tabeli.length	
	
	
	// #div#galeria_spis_podmiana ... <td colspan="2"> a.link_tresc	
var $lista_podstron = $('#galeria_spis_podmiana td[colspan=2] a.link_tresc'); // te w specjalnym kontenerze, bo w spisie treści też są!!! 

	if ( $lista_podstron.length >= 1 )	// czy są jakieś odnośniki do podstron galerii?
	{					// startujemy od kolej strony po pierwszej, ale ostatni zawiera ciąg "starsze", a później każdy kolejny zawiera "nowsze" na początku oraz "starsze" na końcu, pomijając swój indeks
							// i można przyjąć, że liczba odnośników stanowi liczbe galerii, ale pomijamy pierwszy i ostatni... więc liczymy 	
	var ile_podstron_spisu_tresci = 0;
		for (var i=0 ; i < $lista_podstron.length ; i++ ) {
		var nazwa_podstrony_galerii = $( $lista_podstron[i] ).text();  
            if ( ( nazwa_podstrony_galerii.search("nowsze") >= 0 ) || ( nazwa_podstrony_galerii.search("starsze") >= 0 ) ) 
			{
			continue;  //przeskok do kolejnego wywołania	
			}
		ile_podstron_spisu_tresci++;	
		}
	ile_podstron_spisu_tresci++; // konieczne do zliczenia aktualnej galerii, która nie generuje odnosnika	
		
	g_zaczytana_ilosc_paginacji_galerii = ile_podstron_spisu_tresci;	  // muerto importante!
	
	
	// czyszczenie kontenera na nawigację galerii, jeżeli wcześniej zawierał zawartość
	$('p#status_galerii_spis').html('Znaleziono '  + $wiersze_tabeli.length + ' wierszy tabeli źródłowej oraz ' + $lista_podstron.length 
                                    + ' podstron(-y) spisu treści.<br>Jesteś na ' + g_biezaca_pozycja_galerii + '. stronie galerii.<br />'
                                    + 'A wcześniej zaczytano: "' + g_zaczytana_ilosc_paginacji_galerii + '" paginacji, a załadowano łącznie ' 
                                    + g_biezaca_pozycja_galerii + ' (vs ' + g_ilosc_zaczytanych_galerii + ') elementów galerii ze wszystkich ' 
                                    + g_ilosc_wszystkich_galerii + ' galerii');
			
	 //for (var i=0; i < $lista_podstron.length; i++) {	
	
	}
	
$('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii 
$('div#selektor').show();   // też natychmiast pokaż przycisk-kontener do wybiórczego ładowania wybranych treści    
    
} // GenerujSpisGalerii-END

    
    
    
    
    
    
    
                // * ** *** TO  PONIŻEJ  EDYTUJESZ *** ** * 
    
function GenerujSpisWybranejGalerii ( kontenerZrodlowy, kontenerDocelowy, nrPodstrony) 
{
    // policzenie czegoś, co określi bezposrednio tę ilość, gdy brak wprost takowego kontenera w źródle... <img> się nada 
var ileGaleriiNaPodstronie = $( kontenerZrodlowy + ' td.galeria_kolor a.link_tresc img' ).length;    
    
    if ( ileGaleriiNaPodstronie > 0)    // jeżeli są jakieś elementy to robimy całość kopiowania/przenoszenia
    {
    var nowyPojemnik = '';    
            // tworzenie pustej struktury, do zapełenia zaczytaną zawartością
        for( var i=1 ; i <= 5  ; i++ ) {	// maksymalnie pięc elementów się zaczyta, ewentalny nadmiar zostanie usunięty
            // budowanie długiego zestawu pojemników
        nowyPojemnik += '<div id="wybrany_kontener_odnosnik_' + String(i) + '" class="kontener_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_wybrany_odnosnik_' + String(i) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener_tekstowy_odnosnik"><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum... nie będzie</div></div></div>'; 	
        }  
    $( kontenerDocelowy ).empty();  // zerowanie wcześniejszej zawartości    
    $( kontenerDocelowy ).append( nowyPojemnik );  // wstawienie tych pięciu wygenerownych kontenerów-szablonów za jednym podejściem
    
            //przeklejanie zdjęć pomiędzy kontenerami ( w zasadzie to <a> ze <img>)
    var $szukaneElementy = $( kontenerZrodlowy + " td.galeria_kolor a.link_tresc" );	// tak naprawdę to  przeklejany jest cały <a>m razem z <img> wewnątrz
    var miejsceDocelowe = '';

        if ( $szukaneElementy.length > 0 )
        {
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ){
            miejsceDocelowe = $( kontenerDocelowy + " .zdjecie_odnosnik:eq(" + i + ")" );

            // ... 			// obrabianie odnośnika?!	
                // tu zaedytowac po wprowadzniu funkcji naprawiającej globalnie SRC
            // var src_docelowe = g_protokol_www + g_adres_strony + "/" + $( $odnosniki_zdjecia[i] ).find('img').attr( "src");	
            // var src_docelowe = $( $odnosniki_zdjecia[i] ).find('img').attr( "src");	
            // $( $odnosniki_zdjecia[i] ).find('img').attr( "src", src_docelowe );
            $( miejsceDocelowe ).html( $szukaneElementy[i] ); // podmiana oryginalnej zawartości
            }
        }

    //akcja wypełniacz - tytuły
    $szukaneElementy = $( kontenerZrodlowy + " td.galeria_kolor b a.link" );	

        if ( $szukaneElementy.length > 0 )
        {
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ){
            miejsceDocelowe = $( kontenerDocelowy + " .tytul_odnosnik:eq(" + i + ")" );

            // ... 			// obrabianie odnośnika?!	
            var tekstDocelowy = $( $szukaneElementy[i] ).text();
            $( $szukaneElementy[i] ).removeClass('link').wrapInner('<h2></h2>'); // usuwanie obcej klasy link i dodanie h2/h3
                if ( tekstDocelowy.length < 15 ) 
                { 
                $( $szukaneElementy[i] ).find('h2').addClass('nizszy'); // klasa ze zwiększonym odstępem pionowym - wyśrodkowanie w pionie
                }				
                if ( ( tekstDocelowy.length >= 25 ) && ( tekstDocelowy.length < 35 )  ) 
                { 
                $( $szukaneElementy[i] ).find('h2').addClass('mniejszy'); // klasa z mniejszą czcionką o 25% pkt.
                }
                if ( tekstDocelowy.length >= 35 ) 
                { 
                $( $szukaneElementy[i] ).find('h2').addClass('najmniejszy'); // kolejne zmniejszenie czcionki tytułu  dla <h2>    
                }
            $( miejsceDocelowe ).html( $szukaneElementy[i] );  // podmiana oryginalnej zawartości + 
            }
        }

    //akcja wypełniacz - data
    $szukaneElementy = $( kontenerZrodlowy + " td.galeria_kolor font" );	

        if ( $szukaneElementy.length > 0 )
        {
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ){
            miejsceDocelowe = $( kontenerDocelowy + " .data_odnosnik:eq(" + i + ")" );

            tekstDocelowy = $( $szukaneElementy[i] ).text();
            tekstDocelowy = tekstDocelowy.replace( "data publikacji: ", "z dnia: ");  // proste zastąpienie tekstu innym ciągiem, aby nie kopiować znaczników 
            $( miejsceDocelowe ).text( tekstDocelowy );	
            }
        }

    //akcja wypełniacz - opis
    $szukaneElementy = $( kontenerZrodlowy + " td blockquote div[align=justify]" );	

        if ( $szukaneElementy.length > 0 )
        {
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ) {
            miejsceDocelowe = $( kontenerDocelowy + " .opis_odnosnik:eq(" + i + ")" );

            tekstDocelowy = $( $szukaneElementy[i] ).text() ;	
            $( miejsceDocelowe ).html( tekstDocelowy );			
            } // for-END


    /*        
                    // osobna pętla specjalnego przeznaczenia, powrót do warunku
            for( var i=0 ; i < $szukaneElementy.length ; i++ ) {
            miejsce_docelowe = $( g_miejsce_na_spis + " #kontener_odnosnik_" + String( g_ilosc_zaczytanych_galerii + 1 + i ) );

            var wysokosc_kontenera_div = $( miejsce_docelowe ).outerHeight();		
            var wysokosc_tytulu = $( miejsce_docelowe ).find('.tytul_odnosnik').outerHeight(true);
            // czemu IMG lub DIV z nim się mierzy jak chce i kiedy chce?!	
            //var wysokosc_obrazka = $( miejsce_docelowe ).find('.zdjecie_odnosnik').outerHeight(true); // + 4;
            var wysokosc_obrazka = $( miejsce_docelowe ).find('img').outerHeight(true) + 4; // + 4 do obrazka z obramowaniem 2 * 4px;	
            var wysokosc_daty = $( miejsce_docelowe ).find('.data_odnosnik').outerHeight(true);
            var wysokosc_tekstu = $( miejsce_docelowe ).find('.opis_odnosnik').outerHeight(true);		

            var roznica_zawartosc = wysokosc_kontenera_div - ( wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ); 				

            //opis maksymalnie może mieć 304px (16px * 19) -- wielokrotność wierszy dla tekstu o 100% == 16px 		

                if	( roznica_zawartosc < 0 )
                {
                    if ( roznica_zawartosc < -35 )  // kolejnośc ma znaczenie, ewentualne sumowanie klas, najmnijsza wysokośc na końcu (nadpisywanie wartości wysokości dla podelementu)
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
                }	

            var tresc_opisu = $( $szukaneElementy[i] ).text() ;		//wzorcowa, ale już właściwa treśc każdego z odnośników

            tresc_opisu = "K: " + String(wysokosc_kontenera_div) + "-" + String(wysokosc_tytulu + wysokosc_obrazka + wysokosc_daty + wysokosc_tekstu ) + " = " + String( roznica_zawartosc ) + " (" + String(wysokosc_tytulu) + ", " + String(wysokosc_obrazka) + ", " + String(wysokosc_daty) + ", " + String(wysokosc_tekstu) + ") g_galerii: " + String(g_ilosc_zaczytanych_galerii) + ", o_t.l: " + String($szukaneElementy.length) +  "<br />" + tresc_opisu ;			
            $( miejsce_docelowe ).find('.opis_odnosnik').html( tresc_opisu );		
            } // for-END-specjał	

                // pętla specjal TU była
            */

        } // if-end opis



        // czyszczenie kontenera źródłowego
    $( kontenerZrodlowy + ' tr' ).not(':last').remove();    // po wycięciu prawie całej zawartośc tabelki pozostaje tylko z niej spis podstron 

    } // if-END  ileGaleriiNaPodstronie > 0

    // obowiązakowe czyszczenie nadmiaru, warunek na szablon vs na ilość załadowanych
var $nadmiarPojemnikow = $( kontenerDocelowy + " div.kontener_odnosnik:has(h3)");
    if ( $nadmiarPojemnikow.length > 0 ) 
    { 
        // na for(), już śmiga
        for (var i=0; i < $nadmiarPojemnikow.length ; i++) {
        console.log('Znaleziono nadmiar w ilości ' + (i+1) + ' wpisu/wpisów z ' + $nadmiarPojemnikow.length + ' dla obiektu o id="' + $($nadmiarPojemnikow[i]).attr('id') + '", który usunięto.');
            //$(this).css({ "backgroundColor" : "#933" }); 
        $($nadmiarPojemnikow[i]).remove();
        }
    }
	
/*var $wiersze_tabeli = $( kontenerZrodlowy + " tr:nth-child(4n-3)" );
	
    $wiersze_tabeli.each( function() {

	var $biezacy = $(this);
	$biezacy.css({ "border" : "1px dotted blue" });	

	}); // each-END
		*/
	
/*	
	// czyszczenie kontenera na nawigację galerii, jeżeli wcześniej zawierał zawartość
	$('p#status_galerii_spis').html('Znaleziono '  + $wiersze_tabeli.length + ' wierszy tabeli źródłowej oraz ' + $lista_podstron.length 
                                    + ' podstron(-y) spisu treści.<br>Jesteś na ' + g_biezaca_pozycja_galerii + '. stronie galerii.<br />'
                                    + 'A wcześniej zaczytano: "' + g_zaczytana_ilosc_paginacji_galerii + '" paginacji, a załadowano łącznie ' 
                                    + g_biezaca_pozycja_galerii + ' (vs ' + g_ilosc_zaczytanych_galerii + ') elementów galerii ze wszystkich ' 
                                    + g_ilosc_wszystkich_galerii + ' galerii');
			
	 //for (var i=0; i < $lista_podstron.length; i++) {	*/
	
/*	
$('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii 
$('div#selektor').show();   // też natychmiast pokaż przycisk-kontener do wybiórczego ładowania wybranych treści    */
    
} // GenerujSpisWybranejGalerii-END
	    
    
    
    
    
                // * ** *** TO  POWYŻEJ  EDYTUJESZ *** ** * 
    
    
    
    
    
    
	
function OdczytajTresciOdnosnikaWybranejGalerii ( przeszukiwanyKontener, pozycjaElementuWGalerii ) 
{
var odczytaneNamiary = {};
var roboczaWartosc = $( przeszukiwanyKontener + " td.galeria_kolor b a.link:eq(" + parseInt( pozycjaElementuWGalerii ) + ")" ); // zmienna ogólna
odczytaneNamiary.tytul = roboczaWartosc.text();
odczytaneNamiary.adres = roboczaWartosc.attr('href'); // + normalizacja ścieżki na pełny zewnętrzny serwer poniżej  
odczytaneNamiary.adres = g_protokol_www + g_adres_strony + "/" + odczytaneNamiary.adres ;
odczytaneNamiary.opis = $( przeszukiwanyKontener + " td blockquote div[align=justify]:eq(" + parseInt( pozycjaElementuWGalerii ) + ")" ).text();
roboczaWartosc = $( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img:eq(" + parseInt( pozycjaElementuWGalerii ) + ")").attr('src') ;    
roboczaWartosc = g_protokol_www + g_adres_strony + "/" + roboczaWartosc ; // normalizacja ścieżki na pełny zewnętrzny serwer
odczytaneNamiary.srcObrazka = roboczaWartosc;
roboczaWartosc = $( przeszukiwanyKontener + " td.galeria_kolor font:eq(" + parseInt( pozycjaElementuWGalerii ) + ")" ).text();    
odczytaneNamiary.data = roboczaWartosc.replace("data publikacji: ", "z dnia: "); 
    
console.log('Przeszukując "' + przeszukiwanyKontener + '" natrafiono na datę publikacji "' + roboczaWartosc + '" dla tytułu o indeksie +' + pozycjaElementuWGalerii );
    // kasowanie SRC z IMG dla wskazanego tytułu galerii, aby nie było problemu z GET dla otrzymanego wycinka witryny macierzystej 
$( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img:eq(" + parseInt( pozycjaElementuWGalerii ) + ")" ).removeAttr('src');
return odczytaneNamiary;    // zwróć obiekt 

} // OdczytajTresciOdnosnikaWybranejGalerii-END
    

	

    
// ---------- *** PRACA NA RZECZ APLIKACJI *** --------------	    
    
    
function NaprawBrakujaceSRCwKontenerze ( przeszukiwanyKontener, kontenerGalerii )
{   // dodawanie działającej ścieżki dla obrazka, w spisie treści galerii oraz w każdej z podstron galerii 
var srcObrazka = '';    
var $obrazkiTytuloweGalerii = ''; 
    if ( !kontenerGalerii ) $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img"); // ~(spis treści) to obrazki w galerii
    else $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " a:not(.link_tresc) img");
    
	for (var i=0; i < $obrazkiTytuloweGalerii.length ; i++ )
	{
    srcObrazka = $($obrazkiTytuloweGalerii[i]).attr('src');
    srcObrazka = g_protokol_www + g_adres_strony + "/" + srcObrazka;
    srcObrazka = $($obrazkiTytuloweGalerii[i]).attr('src', srcObrazka);
    }
}  // NaprawBrakujaceSRCwKontenerze-END 
    

function UsunBrakujaceSRCwKontenerze ( przeszukiwanyKontener, kontenerGalerii )
{
var $obrazkiTytuloweGalerii = '';
    if ( !kontenerGalerii ) $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img");
    else $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " a:not(.link_tresc) img");
    
	for (var i=0; i < $obrazkiTytuloweGalerii.length ; i++ )
	{
    $($obrazkiTytuloweGalerii[i]).removeAttr('src');
    }
}  // UsunBrakujaceSRCwKontenerze-END     
    
    
    
    
function UsunBrakujaceSRCwIMGPozaPrzekazanym ( przeszukiwanyKontener, numerGaleriiDoPozostawienia )
{
var $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img");
	if ( numerGaleriiDoPozostawienia >= 0 )
	{	
		for (var i=0; i < $obrazkiTytuloweGalerii.length ; i++ )
		{
            if ( i != numerGaleriiDoPozostawienia ) 
            {
            $($obrazkiTytuloweGalerii[i]).removeAttr('src');    
            console.log('Usunięto brakujący SRC w IMG #' + (i+1) + ' spośród ' + $obrazkiTytuloweGalerii.length + ' obrazków galerii' );
            }
        }
    }
} // UsunBrakujaceSRCwIMGPozaPrzekazanym-END    
    

function NormalizujZakresPolaInput ( wartoscBiezaca, normalizacjaPolaPodstrony )
{
wartoscBiezaca = parseInt( wartoscBiezaca );   // konwersja do typu Number, całkowite liczby 
    
    if ( !normalizacjaPolaPodstrony )   // zwykły tryb, dotyczy pola wyboru numeru galerii spośród zakresu
    {
        if ( ( wartoscBiezaca === undefined ) || ( isNaN( wartoscBiezaca ) ) ) 
        {
        wartoscBiezaca = 1;   
        $g_input_nr_galerii.val( wartoscBiezaca );
        $g_suwak_nr_galerii.val( wartoscBiezaca ); 
        }

        if ( wartoscBiezaca < 0 )  
        {
        wartoscBiezaca = 1;   
        $g_input_nr_galerii.val( wartoscBiezaca );
        $g_suwak_nr_galerii.val( wartoscBiezaca ); 
        }

        if ( wartoscBiezaca > g_ilosc_wszystkich_galerii ) 
        { 
        wartoscBiezaca = g_ilosc_wszystkich_galerii;    
        $g_input_nr_galerii.val( g_ilosc_wszystkich_galerii );
        $g_suwak_nr_galerii.val( g_ilosc_wszystkich_galerii ); 
        } 
    } 
    else    // tryb dla pola wyboru podstrony galerii, gdy mzienna == ('cokolwiek' / 2 && TRUE)
    {           // te same warunki, tylko zakresy i elementy formularza inne
        if ( ( wartoscBiezaca === undefined ) || ( isNaN( wartoscBiezaca ) ) ) 
        {
        wartoscBiezaca = 1;   
        $g_input_nr_podstrony_galerii.val( wartoscBiezaca );
        $g_suwak_nr_podstrony_galerii.val( wartoscBiezaca ); 
        }

        if ( wartoscBiezaca < 0 )  
        {
        wartoscBiezaca = 1;   
        $g_input_nr_podstrony_galerii.val( wartoscBiezaca );
        $g_suwak_nr_podstrony_galerii.val( wartoscBiezaca ); 
        }

        if ( wartoscBiezaca > g_ilosc_wszystkich_paginacji_galerii ) 
        { 
        wartoscBiezaca = g_ilosc_wszystkich_paginacji_galerii;    
        $g_input_nr_podstrony_galerii.val( g_ilosc_wszystkich_paginacji_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_ilosc_wszystkich_paginacji_galerii ); 
        }     
    }     
    
return wartoscBiezaca;   
} // NormalizujZakresPolaInput-END

    
    
function UzupełnijNaglowekBiezacejGalerii ( galeria, diagnostyka ) 
{ // atrybuty { tytul, opis, srcObrazka, data }
var trescDaty = galeria.data;   // przykładowa: "z dnia: 2016-02-25 18:45"
trescDaty = trescDaty.slice( trescDaty.indexOf(":")+2, trescDaty.lastIndexOf(":")-3 ); 
trescDaty = '(' + trescDaty.replace(/-/g, '.') + ')'; // zamiana WSZYTSKICH dwóch łaczników na kropki
    
var trescHtml = '<div class="kontener"><h2>' + galeria.tytul + '</h2>'; // najpierw <h2>, aby go ewentualny <img> z float nie wyprzedzał na wąskim ekranie
trescHtml += '<img src="' + galeria.srcObrazka +'" alt="' + galeria.tytul + '" />';
// trescHtml += '<h2>' + galeria.tytul + ' <span class="data">' + trescDaty + '</span></h2>';
trescHtml += '<p class="data">' + trescDaty + '</p>';    
trescHtml += '<p>';
    if ( diagnostyka ) trescHtml += diagnostyka + '<br />' ;
trescHtml += galeria.opis + '</p></div>';    
    
$('#nazwa_galerii').html( trescHtml );
$('#nazwa_galerii').show(100);	    
} // UzupełnijNaglowekBiezacejGalerii-END  
    
    
function KtoraPozycjaWGalerii ( nrGalerii ) 
{
return ( g_ilosc_wszystkich_galerii - nrGalerii ) % 5;
}


function MaksymalnaIloscPodstronGalerii ()
{
return Math.floor( g_ilosc_wszystkich_galerii / 5 ) + Math.ceil( ( g_ilosc_wszystkich_galerii % 5 ) / 5 ) ; 
}


function KtoraPodstronaWGalerii ( nrGalerii )
{
var nrPodstronyGaleriiMAX = MaksymalnaIloscPodstronGalerii();	// albo ze zmiennej globalnej da się też już odczytać
var ileRazy = Math.floor( nrGalerii / 5 ) ;  // teraz niepotrzebne, choć zachowane
var ileReszty = nrGalerii % 5 ;         // teraz niepotrzebne
var pozycjaWGalerii = KtoraPozycjaWGalerii( nrGalerii ) ;
var nrPodstronyGalerii = ileRazy ;    // POPRAWIĆ TE WARUNKI NA OBLICZANIE GALERII DLA DANEGO NUMERU (PODSTRONA + POZYCJA)
    if ( g_ilosc_wszystkich_galerii % 5 != 0 ) nrPodstronyGalerii = nrPodstronyGaleriiMAX - Math.floor( ( nrGalerii + pozycjaWGalerii ) / 5 ) ;   
return nrPodstronyGalerii;
} // KtoraPodstronaWGalerii-END    
    
    
    
// ---------- *** AUTO URUCHAMIANE *** --------------	
	
function ZaczytajSpisGalerii () 
{
//http://zlobek.chojnow.eu/galeria,k0,p1.html	- adres ostatniej galerii, wg. daty
var adres_ostatniej_galerii = "/galeria,k0,p1.html";	
var adres_zasobu_galerii = g_protokol_www + g_adres_strony;

        // operowanie na jawnym zliczaniu kliknięć (zamiast 'g_bieżącej_pozycji_galerii'), bo to definiuje kolejny numer podstrony do załadowania 
    if ( g_suma_klikniec_zaladuj > 0 )    
    //if ( g_biezaca_pozycja_galerii > 0 )
    {
    //var nowa_podstrona_spisu_galerii = g_biezaca_pozycja_galerii + 1;				
    // adres_ostatniej_galerii = "/galeria,k0,p" + String( g_biezaca_pozycja_galerii + 1 ) + ".html";
        
        // powyższe warunkowe działania pomijają ładowanie DRUGIEJ PODSTRONY przy PIERWSZYM naciśnięciu przycisku 'Załaduj kolejne galerie'  
    // adres_ostatniej_galerii = "/galeria,k0,p" + String( g_biezaca_pozycja_galerii ) + ".html";
        
        adres_ostatniej_galerii = "/galeria,k0,p" + String( g_suma_klikniec_zaladuj ) + ".html";	
    }

$( g_wczytywanie_spis ).show(100); 
console.log('Załadowano spis treści dla ' + g_biezaca_pozycja_galerii + '. pozycji galerii, adres z http: "' + adres_zasobu_galerii + '" odnośnik: "' + adres_ostatniej_galerii + '".');	
WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_spis, adres_zasobu_galerii, adres_ostatniej_galerii, g_element_zewnetrzny_spis, "spis_galerii" ); 
}	// ZaczytajSpisGalerii-END
	
function InicjujPrzyciskiWyboruGalerii ()	
{

g_wybrany_nr_galerii = Math.floor(Math.random() * 100) + 1;	
console.log('Ustalanie POCZĄTKOWYCH (np. ' + g_wybrany_nr_galerii + ') wartości pól formularza przeglądania galerii...');
$g_input_nr_galerii.val( g_wybrany_nr_galerii );	
$g_suwak_nr_galerii.val( g_wybrany_nr_galerii );	
$g_suwak_nr_galerii.attr( 'max' , 105 ); // nie trzeba teraz?	
}   // InicjujPrzyciskiWyboruGalerii-END
 
function InicjujPrzyciskiWyboruPodstronyGalerii ()	
{
g_wybrany_nr_podstrony_galerii = Math.floor(Math.random() * 5) + 1 ;	
console.log('Ustalanie POCZĄTKOWYCH (np. ' + g_wybrany_nr_podstrony_galerii + ') wartości pól formularza przeglądania podstronami galerii...');
$g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );	
$g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );	
$g_suwak_nr_podstrony_galerii.attr( 'max' , 6 ); // "trzeba, czy nie trzeba?" oto jest pytanie	
}   // InicjujPrzyciskiWyboruPodstronyGalerii-END    
    
    

// ---------- *** OGÓLNE PRZEZNACZENIE *** --------------    
    
function PrzewinEkranDoElementu ( element, czasAnimacji, korektaY ) 
{
        //parametryzacja parametru domyślnego by ES5 ;)
    if ( korektaY === undefined ) korektaY = -10;
        //jeśli jest kilka elmentów, to użyj pierwszego w kolekcji jako "wybranego"
    if ( $(element).length > 1 ) element = $(element)[0];
var pozycjaElementuWPionie = $(element).offset().top;
console.log('Ustalono, że element wywołania "' + element + '" ma pozycję Y ', pozycjaElementuWPionie, ' [px] (korektaY: ' + korektaY 
            + ', czasA: ' + czasAnimacji + ')');    
$('html, body').animate({ scrollTop : (pozycjaElementuWPionie + korektaY)+'px' }, czasAnimacji);    
}   

    
    

	
	
// ---------- *** FUNKCJE ZDARZENIOWE *** --------------	
	

$('#odswiez').click(function() {
    location.reload();
});	
	
$('#poco_button').click( function() {
 $('div#poco').toggle(200);	
});
	
$('#pomoc_button').click( function() {
 $('div#pomoc').toggle(200);	
});

	
$('#losuj_zakres').click( function() {
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
        g_wybrany_nr_galerii = Math.floor( Math.random() * g_ilosc_wszystkich_galerii ) + 1 ; 

        //ustawienie wartości w polu tekstowym i suwaku
        $g_input_nr_galerii.val( g_wybrany_nr_galerii );
        $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
    }
}); // #losuj_zakres click-END	

    
$('#losuj_zakres_podstrony').click( function() {
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
        g_wybrany_nr_podstrony_galerii = Math.floor( Math.random() * g_ilosc_wszystkich_paginacji_galerii ) + 1 ; 
        //ustawienie pola tekstowego i suwaka wygenerowaną wartością
        $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
    }
}); // #losuj_zakres_podstrony click-END	
        

$g_suwak_nr_galerii.change( function() {
var wartoscBiezaca = $(this).val();

g_wybrany_nr_galerii = wartoscBiezaca;
$g_input_nr_galerii.val( wartoscBiezaca );
});	


$g_suwak_nr_podstrony_galerii.change( function() {
var wartoscBiezaca = $(this).val();

g_wybrany_nr_podstrony_galerii = wartoscBiezaca;
$g_input_nr_podstrony_galerii.val( wartoscBiezaca );
});	
    
    
$('#wybrany_nr_zwieksz').click( function() {
    if ( ( g_ilosc_wszystkich_galerii > 0 ) && ( g_wybrany_nr_galerii > 0 ) )  // dodatkowe sprawdzenie, w razie przeoczenia lub usunięcia wcześniejszego: g_wybrany_nr_galerii = g_ilosc_wszystkich_galerii (ewentualnie, gdyby wybrać to jako pierwsze)  
    {  
        if ( g_wybrany_nr_galerii < g_ilosc_wszystkich_galerii ) 
        {
        g_wybrany_nr_galerii++;
        $g_input_nr_galerii.val( g_wybrany_nr_galerii );
        $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
        }
    }
}); //  #wybrany_nr_zwieksz click-END

$('#wybrany_nr_zmniejsz').click( function() {
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
        if ( g_wybrany_nr_galerii > 1 ) 
        {
        g_wybrany_nr_galerii--;
        $g_input_nr_galerii.val( g_wybrany_nr_galerii );
        $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
        }
    }
}); //  #wybrany_nr_zmniejsz click-END

    
$('#wybrany_nr_podstrony_zwieksz').click( function() {
    if ( ( g_ilosc_wszystkich_paginacji_galerii > 0 ) && ( g_wybrany_nr_podstrony_galerii > 0 ) )  // dodatkowe sprawdzenie  
    {  
        if ( g_wybrany_nr_podstrony_galerii < g_ilosc_wszystkich_paginacji_galerii ) 
        {
        g_wybrany_nr_podstrony_galerii++;
        $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        }
    }
}); //  #wybrany_nr_podstrony_zwieksz click-END

$('#wybrany_nr_podstrony_zmniejsz').click( function() {
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
        if ( g_wybrany_nr_podstrony_galerii > 1 ) 
        {
        g_wybrany_nr_podstrony_galerii--;
        $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        }
    }
}); //  #wybrany_nr_zmniejsz click-END    
    
    
    
$('#galeria_wybrany_nr').blur( function() {
    
var wartoscBiezaca = parseInt( $(this).val() );
wartoscBiezaca = NormalizujZakresPolaInput( wartoscBiezaca );    
$(this).val( wartoscBiezaca );    // pobierz bieżącą wartośc i dokonaj ewentualnej korekty dla zakresu
g_wybrany_nr_galerii = wartoscBiezaca;
$g_suwak_nr_galerii.val( wartoscBiezaca );
});
    

$('#podstrona_wybrany_nr').blur( function() {
    
var wartoscBiezaca = parseInt( $(this).val() );
wartoscBiezaca = NormalizujZakresPolaInput( wartoscBiezaca, 'wybórPodstrony' );    
$(this).val( wartoscBiezaca );    // pobierz bieżącą wartośc i dokonaj ewentualnej korekty dla zakresu podstron
g_wybrany_nr_podstrony_galerii = wartoscBiezaca;
$g_suwak_nr_podstrony_galerii.val( wartoscBiezaca );
});
    
    
$('#suwak_galerii_submit').click( function(evt) {
evt.preventDefault; // nie wykonuj domyślnego SUBMIT po kliknięciu
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
    var tagDocelowyDoZaczytania = 'div#skladowisko_status_wybranej_galerii';	
    var wybranyNrGalerii = NormalizujZakresPolaInput( $g_input_nr_galerii.val() ); // odczytanie z formularza jak jest + weryfikacja zakresu
    // obliczenie pozycji w ramach podstrony galerii oraz pozycji w zadanym obszarze podstrony (przesunięcie w ramach tego spisu)
    var pozycjaWGalerii = KtoraPozycjaWGalerii ( wybranyNrGalerii );
    var podstronaWGalerii = KtoraPodstronaWGalerii ( wybranyNrGalerii ); 
    var nrPodstronyGaleriiMAX = MaksymalnaIloscPodstronGalerii();    
        
        // http://zlobek.chojnow.eu/galeria,k0,p38.html	<-- 'k0' == 'kategoria WSZYSTKO', 'pXYZ' to XYZ-ta 'p'-odstrona w danej galerii (zawiera max 5 elem.)
        // porządek odwrotnie chronologiczny - 'p1' lub 'p0' lub jego brak wskazuje na pierwszą od końca podstronę z pięcioma elemenatmi, 'p2' na przedostatnią, ... 
        // konieczne obliczenie pozycji 'spisu treści' - da się ustalić numerycznie jako m-ta podstrona z wszystkich galerii
        // celem jest pozyskanie stamtąd adresu dla wybranej N-tej galerii 
    var adresPodstrony =  '/' + 'galeria,k0,p' + podstronaWGalerii + '.html' ;    // sumowanie ciagu tekstowego
 
    // DEBUG_MODE    
    var trescWygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nrPodstronyGaleriiMAX + "<br />"; 
    trescWygenerowana += "WYBRANA: " + wybranyNrGalerii + ", PODSTRONA: " + podstronaWGalerii + ", POZYCJA_W_GALERII: +" + pozycjaWGalerii + "<br />"; 
    trescWygenerowana += "<br /> Dopasowano na " + podstronaWGalerii + ". podstronie, z przesunięciem " + pozycjaWGalerii ;
    trescWygenerowana += ". Łączny adres to: \"" + g_adres_strony + adresPodstrony + "\"</p>";

    $('#status_wybranej_galerii').html( trescWygenerowana );	        
    $('#nazwa_galerii').addClass('szara_zawartosc');
    $( g_miejsce_na_zdjecia ).empty();
    $('nav#nawigacja_galeria').empty();   
        
    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "wybrana_galeria_rekurencja", { 'pozycjaWGalerii' : pozycjaWGalerii } ); 	// ES6 unfriendly
    }
return false;  // to jest lepszy i konieczny warunek na "niewysyłanie formularza" 
}); // warunkowe zaczytywanie albo "nierobienie nic" po kliknięciu

    
$('#suwak_podstrony_submit').click( function(evt) {
evt.preventDefault; // nie wykonuj domyślnego SUBMIT po kliknięciu
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
    var tagDocelowyDoZaczytania = 'div#skladowisko_wybrane_galerie_spis';	// tu ma byc nowe miejsce w spisie
    var wybranyNrPodstrony = NormalizujZakresPolaInput( $g_input_nr_podstrony_galerii.val(), 'naRzeczPodstrony' ); // odczytanie z formularza jak jest + weryfikacja zakresu
          // http://zlobek.chojnow.eu/galeria,k0,p38.html	<-- 'k0' == 'kategoria WSZYSTKO', 'pXYZ' to XYZ-ta 'p'-odstrona w danej galerii (zawiera max 5 elem.)
     var adresPodstrony =  '/' + 'galeria,k0,p' + wybranyNrPodstrony + '.html' ;    // po prostu podstawienie do ciagu tekstowego
 
    // DEBUG_MODE    
/*    var trescWygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nrPodstronyGaleriiMAX + "<br />"; 
    trescWygenerowana += "WYBRANA: " + wybranyNrGalerii + ", PODSTRONA: " + podstronaWGalerii + ", POZYCJA_W_GALERII: +" + pozycjaWGalerii + "<br />"; 
    trescWygenerowana += "<br /> Dopasowano na " + podstronaWGalerii + ". podstronie, z przesunięciem " + pozycjaWGalerii ;
    trescWygenerowana += ". Łączny adres to: \"" + g_adres_strony + adresPodstrony + "\"</p>";

    $('#status_wybranej_galerii').html( trescWygenerowana );	*/        
    $('div#wybrane_galerie_spis').addClass('szara_zawartosc');
  
        
    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "wybrany_spis_galerii", { 'wybranaPodstrona' : wybranyNrPodstrony } ); 	// ES6 unfriendly
    
    $('div#wybrany_zaczytany_spis h2 span').text( wybranyNrPodstrony.toString() + '.' );    
    $('div#wybrany_zaczytany_spis').show(100);
    $('div#wczytywanie_wybrane_galerie_spis').show(100);
        
    PrzewinEkranDoElementu('div#wybrany_zaczytany_spis', 500, -50);    // naddatek korekty, aby widzieć efekt szarosci... który jest niepotrzebny dle  
    //PrzewinEkranDoElementu('nav#spis_sterowanie', 500, -100);    // nie można przewinąc do 'div#wybrany_zaczytany_spis' jeśli jest jeszcze niewidoczny
    }
return false;  // to jest lepszy i konieczny warunek na "niewysyłanie formularza" 
}); // warunkowe zaczytywanie albo "nierobienie nic" po kliknięciu    
    
	
    
$('h2#selektor_naglowek').click(function () {
    if ( $(this).hasClass('rozwiniety') ) $(this).removeClass('rozwiniety').next('div').hide(100);
    else $(this).addClass('rozwiniety').next('div').show(100);
   
    
});    
	
	/*	
$(function(){
var contentURI= 'http://zlobek.chojnow.eu/u_tygryskow,a147.html table.galeria';    // URL-do-przechwycenia, " " i #id-elementu-docelowego
$('#zawartosc_do_podmiany').load('przechwytywacz.php?url_zewn='+ contentURI);
});
*/
$('#testowy_adres_button').click(function() {
var testowy_adres_galerii = "http://zlobek.chojnow.eu/30-u_misiow,z1058,p1.html";
	
$('#http_adres').val( testowy_adres_galerii ); // przypisanie wartości domyślnej do pola wpisywania 
	
});
	

    // uruchomienie
$('#nawigacja_galeria').on("click", ".przycisk_galeria", function() { // IMG z galerii obiektem zdarzenia
var $this = $(this);	
var serwer = g_protokol_www + $this.attr('data-adres_strony') + '/';
var ktoraPodstrona = $this.attr('value');    

$( g_wczytywanie ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 

//alert("kliknięto '.przycisk_galeria'... albo kontener: " + this.tagName );
//alert("VAL: '" + $this.attr('value') + "', DATA-TAG: " + $this.attr('data-tag') );

console.log('Naciśnięto wywołanie ' + ktoraPodstrona + '. podstrony danej galerii');  
// ?!?!
//alert( 'TAG: ' + $this.attr('data-tag') + ' ADRES: ' + $this.attr('data-adres_strony') + ' GALERIA: ' + $this.attr('data-adres_galerii') + ' ELEMENT: ' + $this.attr('data-elem_zewn') );
//WczytajZewnetrznyHTMLdoTAGU( nowyDiv.attr('id'), g_adres_strony, odnosnik_podstrony, g_element_zewnetrzny, true);

//WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);
WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), serwer, $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona", 
                            { 'ktoraPodstrona' : ktoraPodstrona } );    // ES5, nie ES6

//<button class="przycisk_galeria" id="galeria_paginacja_1" data-tag="div#zawartosc_do_podmiany" data-adres_strony="http://zlobek.chojnow.eu/" data-elem_zewn="table.galeria" value="u_misiow,a20,p2.html" data-adres_galerii="u_misiow,a20,p2.html">Galeria nr 1</button>

});	//  on("click")-$('#nawigacja_galeria')-END	
	
	   // "przycisk" ładujący kolejne +5 galerii (max), porządek ujemnie chronologiczny
$('#spis_sterowanie').on("click", "#zaladuj_galerie_spis", function() { 
g_suma_klikniec_zaladuj++;	// zliczaj naciśnięcia na ten przycisk

    if ( g_suma_klikniec_zaladuj < ( g_zaczytana_ilosc_paginacji_galerii + 1) ) // bieżącą stronę też liczyć jako paginację, dlatego +1
    {
	//g_biezaca_pozycja_galerii++;  // zwiększenie licznika, przejście do wywołania kolejnej podstrony
	// licznik zwiększa się już PO nacisnięciu odnosnika i PRZED zakończeniem przetwarznia uprzednio zaczytanych treści !!! 
	// co najwyżej kolejność może być inna na liście wyników
	
		if ( g_biezaca_pozycja_galerii <= g_zaczytana_ilosc_paginacji_galerii )
		{
		$( g_wczytywanie_spis ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 
		console.log('Na ' + g_suma_klikniec_zaladuj + ' żądanie zaczytano kolejną podstronę w galerii ' + g_biezaca_pozycja_galerii + ' z ' + g_zaczytana_ilosc_paginacji_galerii + ' podstron.');
			
		//g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; //inkrementacja o każde 5 zdjęc z poszczególnych zaczytanych galerii 	
		
		ZaczytajSpisGalerii();
		//wyświetlenie-dodanie kolejnego spisu do już wyświetlonej listy odnosników	
		//WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);
		} 
    }
	
});	// on("click")-$('#spis_sterowanie')-END		

	
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
    // DLA KOLEJNYCH GALERII: '$('#galeria_spis').on("click", "a", function(e){'
$('#galeria_spis, #wybrane_galerie_spis').on("click", "a", function(e){ 
e.preventDefault();	// "nieprzechodzeniedalej" po odnośnku    
var $this = $(this);
var galeria_docelowa = $this.attr('href');	


	
var tytulGalerii = $this.text();	  // przypisanie treści -- tytułu dla danej galerii (wstępnie, jeśli naciśnięto na nagłówek, a nie na obrazek -- bo nie posiadałby tekstu)   
var opisGalerii = $this.parents('.kontener_odnosnik').find('.opis_odnosnik').html();	 // było .text(), ale teraz zyskujemy formatowanie tekstu
var dataGalerii = $this.parents('.kontener_odnosnik').find('.data_odnosnik').text();       // tu bezwzględnie tylko tekst
var srcObrazkaGalerii = $this.parent().siblings('div.zdjecie_odnosnik').find('a img').attr('src');    
	
	if ( tytulGalerii.length == 0 )  // jeżeli naciśnięto odnośnik z obrazkiem, ten drugi zawiera już treść odnośnika
    {
    tytulGalerii = $this.parent().siblings('div.tytul_odnosnik').find('a h2').html();	 // było .text( ... )
    srcObrazkaGalerii = $this.find('img').attr('src');    
    }
//alert('g_tag_do_podmiany, g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/', galeria_docelowa, g_element_zewnetrzny, "galeria_podstrona")
//alert('WczytajZewnetrznyHTMLdoTAGU( tag: ' + g_tag_do_podmiany_zdjecia + ', domena: ' + g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/' + ', zasób: ' + galeria_docelowa + ', elem: ' + g_element_zewnetrzny + ') ... MYSZA NAJECHAŁA');
console.log('ZDARZENIE: "Naciśnięto" i wywołano odnośnik dla galerii "' + tytulGalerii + '"' ); 	

UzupełnijNaglowekBiezacejGalerii ( { 'tytul' : tytulGalerii, 'opis' : opisGalerii, 'srcObrazka' : srcObrazkaGalerii, 'data' : dataGalerii } );    
    
// załaduj pierwszą stronę z danej galerii	

	
    // wstawienie animacji na ładowanie
$( g_wczytywanie ).show(100);
    // od razu zerowanie zawartości kontenerów docelowych do zaczytania zawartości
$('nav#nawigacja_galeria').empty(); 
$('div#skladowisko').empty(); 
	
WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_zdjecia, g_protokol_www + g_adres_strony + '/' , galeria_docelowa, g_element_zewnetrzny, "galeria_podstrona" ); 	
//WczytajZewnetrznyHTMLdoTAGU( g_, $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);	
//e.preventDefault();	
//return; // wyjście, aby nie przechodzić do odnosnika	
		// przewinięcie ekranu do lokalizacji galerii
PrzewinEkranDoElementu('main#glowna', 700, -6);   
	
});	//  on("click")-$('#galeria_spis')-END			
	
	
	
    // wkrótce REZYGNACJA z poniższego!
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

	//alert('pełny_adres: "' + pelny_adres + '", adres_tej_galerii: "' + adres_tej_galerii + '"');
	//$('#http_adres').val( g_adres_strony + adres_tej_galerii );
$('#http_adres').val( pelny_adres + adres_tej_galerii );	
$('#http_adres').prop("disabled", true); 								// wyłączenie, aby nie klikac wielokrotnie || attr() vs prop()
$('#http_adres_submit').prop("disabled", true);	 // wyłączenie, aby nie klikac wielokrotnie || attr() vs prop()
$('#testowy_adres_button').prop("disabled", true);	 // wyłączenie, aby nie klikac wielokrotnie || attr() vs prop()

$( g_wczytywanie ).show(100);

console.log( 'ADRES_STRONY: ' + g_adres_strony + ', ADRES_GALERII: ' + adres_tej_galerii + ', ZNACZNIK_ZEWN: ' + g_element_zewnetrzny + '\nRAZEM: ' + g_adres_strony + adres_tej_galerii + ' | ' + g_element_zewnetrzny	) ;

	
/* 
cała galeria siedzi w tabeli o klasie .galeria, w komórkach osadzone miniatury z odnośnikami do galerii zdjęć. Całość dzielona na podstrony po 6 x 3 zdjęcia (18 szt.)  
*/
	
	/*
  $.get( pelny_adres, function(data) {
			alert('Coś');
    $('zawartosc_do_podmiany').html(data);
  });
	*/
	
// to poniżej powinno działać tylo dla tej samej domeny/lokalizacji co skrypt, wiec porażka 

WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_zdjecia, g_protokol_www + g_adres_strony + '/', adres_tej_galerii, g_element_zewnetrzny, "galeria_podstrona" ); 

return false; // !!! konieczne przy click/submit! || operować na obiekcie klikanym
}); // click-END-#http_adres_submit
	
	
$('#banner').hover( function() {
    $(this).find('#slonce_logo').addClass('animacja_1');
    },
    function() {
    $(this).find('#slonce_logo').removeClass('animacja_1');	
    }
); // #banner hover-END


// ***************************************************************************	
// ---------- *** AUTOURUCHAMIANIE *** --------------	 
	
InicjujPrzyciskiWyboruGalerii();
InicjujPrzyciskiWyboruPodstronyGalerii();    
	
ZaczytajSpisGalerii();
	

	
// ***************************************************************************		

	
	
	// sterowanie wielkością czcionki nagłówka
	
	//$("#banner h1.logo").fitText();
	 $("#napisy h1").fitText(1.0, { minFontSize: '15px', maxFontSize: '65px' });
	 $("#napisy h2").fitText(2.7, { minFontSize: '10px', maxFontSize: '28px' });
	 $("#napis_spod h3").fitText(3.0, { minFontSize: '6px', maxFontSize: '20px' });    
    


	
}); //document-ready-END
