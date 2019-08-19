
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
var g_obrazek_galerii_src = "";    
	
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
var g_suma_klikniec_zaladuj = 0;    
	
var g_wybrany_nr_galerii = 0;
var g_wybrany_nr_galerii_nazwa = '';
var g_wybrany_nr_galerii_opis = '';	
	
var $g_input_nr_galerii	= $('input#galeria_wybrany_nr'); 
var $g_suwak_nr_galerii	= $('input#suwak_galerii'); 

	
// ---------- ***  FUNKCJE PRAWIE GLOBALNE *** --------------		
	
function WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane )	{ 
		if ( element_witryny.length > 0 )  {	// dodanie spacji na początku, separator dla TAGU po nazwie pliku 
		element_witryny = " " + element_witryny;				
		}
  //debugger; 
	
    switch ( rodzaj_dzialania ) {
				
        case "galeria_podstrona":
            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )// alert( "LOAD się udała dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
                {	
                // logowanie sukcesu ;)
                console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
                // WYKONAJ DALSZE FUNKCJE, zależne od SUKCESU zaczytania lub nie	
                // kasuj poprzednią zawartość elementu???	

                CzyscNiepotrzebneElementy();	
                GenerujPodstronyGalerii();
                                        
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

        case "spis_galerii_rekurencja" :

            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )
                {
                var nasmiaryWybranejGalerii = OdczytajTrescOdnosnikaWybranejGalerii( dane.nr_galerii_w_spisie );

                    // zmienić parametry wywołania dla rekurencji !!! 
                    // WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane );

                    // potrzebne to nwoe??
                    //OdczytajWybranaGalerie( , ); // ( numer podstrony galerii, numer galerii )
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


        case "spis_galerii_wybor" :

            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )
                {	
                //JakaśFunkcja();	// tu wywołaj jakąś fukcję

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

	
function GenerujPodstronyGalerii(){ 	// to ma przygotować kolejne 
var wysokoscDokumentu = $(document).height();
var wysokoscDivWczytywanie = $('#wczytywanie').height();    
var wysokoscDivKomentarz = $('div#komentarz').height();    
var odlegloscPionowaSkladowiskoID = $('#skladowisko').offset().top;
var wysokoscOknaPrzegladarki = $(window).height();
console.log("PRZED - Dokument: " + wysokoscDokumentu + "px, Okno: " + wysokoscOknaPrzegladarki + "px, PozycjaY #skladowiska: " + odlegloscPionowaSkladowiskoID 
            + "px, wysokość DIV#wczytywanie: " + wysokoscDivWczytywanie + "px, wysokość DIV#komentarz: " + wysokoscDivKomentarz );
//PrzewinEkranDoElementu('div#skladowisko', 200, -8);  // złe miejsce, przed trteścią
    
$('#wczytywanie').hide(100);	// schowaj informację, skoro wczytano zawartość
$('#glowna div#komentarz').hide(100);	//showaj opis-informację o ile była pokazana
$('#skladowisko').show( 100, PrzewinEkranDoElementu( 'div#skladowisko', 200, -8 - (wysokoscDivWczytywanie + wysokoscDivKomentarz) )  );	// pokaż kontener na zaczytaną zawartość + przewiń po wyświetleniu całości
    
    //weryfikacja położenia w pionie przed dodaniem zawartości - miniatur zdjęć z danej galerii

// UzupełnijBiezacaGalerie( g_nazwa_galerii, g_opis_galerii, g_obrazek_galerii_src );
    // powyższe wywołanie zastąpiono poniższy kod  
    // (przeniesiono wywołanie bezpośrednio do obsługi kliknięcia, aby nie czekać na juz pobrany wynik (2x tekst, +src ), tylko na ładowane zdjęcia)   
/*    
$('#nazwa_galerii').find('h2').html( g_nazwa_galerii ); 	// było.text( ... )
$('#nazwa_galerii').find('p').html( g_opis_galerii );		// było.text( ... )
$('#nazwa_galerii').find('img').attr( 'src', g_obrazek_galerii_src );  
$('#nazwa_galerii').show(100);	
*/
	
var $lista_podstron = $('#zawartosc_do_podmiany a.link_tresc'); // te w specjalnym kontenerze, bo w spisie treści też są!!! 

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
        // 2.| albo każda paginacja zaczytywana po kolei na żądanie - tak jest prościej  


        //wstaw go za zaczytanym DIV-zewnętrznym
        //DISABLED !!!
        //	$( g_tag_do_podmiany_zdjecia ).append( nowyDiv ); 

        //$( g_tag_do_podmiany_zdjecia ).css({ "backgroundColor" : "yellow" }); 
        var nazwa_podstrony_galerii = $( $lista_podstron[i] ).text();  
            if ( ( nazwa_podstrony_galerii.search("nowsze") >= 0 ) || ( nazwa_podstrony_galerii.search("starsze") >= 0 ) ) 
            {
            //alert('nazwa_podstrony_galerii: ' + $lista_podstron[i].text() );

            continue;  // nie wyświetlaj przyciku/-ów z starsze/nowsze dla danego wykonania pętli - wyjście z kroku pętli
            }  

        var odnosnik_podstrony = $( $lista_podstron[i] ).attr('href'); 	// wyciąga href z nawigacji podstrony/paginacji
        console.log('Natrafiono na odnośnik nr ' + String(i+1) + ' o zawartości \'' + odnosnik_podstrony + '\'');

        //var nr_galerii = odnosnik_podstrony.split(",")[2];
        var nr_galerii = parseInt ( odnosnik_podstrony.substr( odnosnik_podstrony.lastIndexOf(",") + 2, odnosnik_podstrony.length - 5 )	);
        // atrybut_href.lastIndexOf(",") 	
        //if ( !nr_galerii) { nr_galerii = 1; }
        //	nr_galerii = nr_galerii.substr(1); // dodatkowe usuwanie pierwszego znaku, tj. "p", które jest przed numerem podstrony galerr (numer kończy się ".html" - pomijane przy konwersji STRINGU)

        //var nowyPrzycisk = $('<button></button>', {
        var nowyPrzycisk = $('<input></input>', {            
            id : "galeria_paginacja_" + String( i+1 ),
            class : "przycisk_galeria",
            //value : odnosnik_podstrony,
            value : "Galeria nr " + nr_galerii, 
            type : "button",
            
            //text : "Galeria nr " + String(parseInt(nr_galerii)),
            //text : "Galeria nr " + nr_galerii,
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
        // WYŁĄCZAM DLA KOLEJNYCH PODSTRON ASYNCHRONICZNOŚĆ		
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

    /*
    var atrybut_href_pozycja = atrybut_href.lastIndexOf(",");		
    atrybut_href = atrybut_href.substr( atrybut_href_pozycja + 2 ); // +2 znaki za pozycją ',' i 'a'
    g_ilosc_wszystkich_galerii = parseInt( atrybut_href );
    */

    var odnosnik_nr_zdjecia = parseInt( odnosnik.substr( odnosnik.lastIndexOf( ",z") + 2, odnosnik.length - 8 ) );

    var opis_obrazka = $biezacy.find('img').removeAttr('border').attr('alt'); // jak wywalić bordera?!

    console.log("Dla elementu <a> o HREF '" + odnosnik + "' NR_ZDJĘCIA to '" + odnosnik_nr_zdjecia + "', a ALT miniatury IMG to '" + opis_obrazka + "'" );	
    //odnosnik_nr_zdjecia = odnosnik_nr_zdjecia.substr(1); // dodatkowe usuwanie pierwszego znaku, tj. "z", które jest przed numerem zdjęcia 


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

    //weryfikacja położenia w pionie po dodaniu zawartości - miniatur zdjęć z danej galerii    
wysokoscDokumentu = $(document).height();
odlegloscPionowaSkladowiskoID = $('#skladowisko').offset().top;
wysokoscOknaPrzegladarki = $(window).height();
console.log("Wymiary PO - Dokument: " + wysokoscDokumentu + "px, Okno: " + wysokoscOknaPrzegladarki + "px, PozycjaY #skladowiska: " + odlegloscPionowaSkladowiskoID + "px");
// powinno być warunkowe przesuwanie, gdy dodana zawartość przewinęła nieznacznie pozycję przesuniętego okna, a zniknięcie proastokąta ładowania też nie podwyższyło tego okna
 // if () {}  //gdy większa wysokośc elementu niż wys-DOKUMENTU - wys-OKNA  
// PrzewinEkranDoElementu('div#skladowisko', 200, -8 );    // druga kopia "wyrównawcza"

//	} //if-END $lista_podstron.length >= 1
} // GenerujPodstronyGalerii-END


	
	

function GenerujSpisGalerii() {

	
$( g_wczytywanie_spis ).hide(100);	// schowaj informację, skoro wczytano zawartość
//$('#glowna div:first').hide(100);	//showaj opis-informację
$( g_miejsce_na_spis ).show(100);	

//debugger;	

// tworzenie szablonu spisu
 //g_ilosc_zaczytanych_paginacji_galerii = $( g_miejsce_na_spis + " div.kontener_odnosnik" ).length; // ma być o 5 więcej niż na stronie (szablon do wstawienia), co to robi???
g_ilosc_zaczytanych_paginacji_galerii = 0; // i tak późniejsza pętla działa zawsze na +5 elementów na stronie, nie oblicza warunku na podstawie 

	
    if ( g_biezaca_pozycja_galerii == 0 )		// pierwsze przejście -- przetwarzamy pierwszy odnośnik, który zawiera najwyższy numer galerii
    {
    g_ilosc_zaczytanych_galerii	= -5 ;
    var $temp_odnosnik_tytul = $( g_tag_do_podmiany_spis + " td.galeria_kolor b a.link:first" );	 // dobre do czasu, o ile nie powstanie nowa galeria w trakcie przeglądania starej listy! 
    var atrybut_href = $( $temp_odnosnik_tytul ).attr('href'); // np. "http://zlobek.chojnow.eu/u_tygryskow,a153.html"
    //temp_atrybut = temp_atrybut.split(",")[1]; // jest dobre, ale leży przy dodanym ',' w adresie odnosnika (jako treść)
    var atrybut_href_pozycja = atrybut_href.lastIndexOf(",");		
    atrybut_href = atrybut_href.substr( atrybut_href_pozycja + 2 ); // +2 znaki za pozycją ',' i 'a'
    g_ilosc_wszystkich_galerii = parseInt( atrybut_href );

    //odniesie tej wartości do maksymalnej wartośc przesuwu suwaka wyboru galerii + inicjowanie suwaka i inputa na tę wartość
    console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii...');		

    g_wybrany_nr_galerii = g_ilosc_wszystkich_galerii;
    $g_suwak_nr_galerii.attr( 'max' , g_ilosc_wszystkich_galerii );
    $g_suwak_nr_galerii.val( g_ilosc_wszystkich_galerii );	
    $g_input_nr_galerii.val( g_ilosc_wszystkich_galerii );	

    console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii... PO -- g_wybrany_nr_galerii: ' + g_wybrany_nr_galerii + ', a POZYCJA: ' + atrybut_href_pozycja 
                                                    + ' dla odnośnika: ' + atrybut_href );		

    PrzewinEkranDoElementu( 'div#spis_tresci > h2', 500, 2 );    // Przewinięcie do znalezionych galerii - tylko przy pierwszym-auto-załadowaniu treści
    //g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5;

    // g_biezaca_pozycja_galerii++;	// indeks wyświetlanej aktualnie (kolejno) galerii	-- inkrementację dodano w zdarzeniu naciskania obiektu "ZAŁDADUJ GALERIE" 

    } //if-END

g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; //inkrementacja o każde 5 zdjęc z poszczególnych zaczytanych galerii 	
	
//	for( var i=1 + g_ilosc_zaczytanych_paginacji_galerii ; i <= 5 + g_ilosc_zaczytanych_paginacji_galerii ; i++ ) {
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

        $( miejsce_docelowe ).text( 	tekst_docelowy );	
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
    $( g_miejsce_na_spis + " div.kontener_odnosnik:has(h3)").css({ "backgroundColor" : "#666" });	
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
		
	g_ilosc_zaczytanych_paginacji_galerii = ile_podstron_spisu_tresci;	  // muerto importante!
	
	
	// czyszczenie kontenera na nawigację galerii, jeżeli wcześniej zawierał zawartość
	$('p#status_galerii_spis').html('Znaleziono '  + $wiersze_tabeli.length + ' wierszy tabeli źródłowej oraz ' + $lista_podstron.length + ' podstron(-y) spisu treści.<br>Jesteś na ' + g_biezaca_pozycja_galerii + '. stronie galerii.<br />A wcześniej zaczytano: "' + g_ilosc_zaczytanych_paginacji_galerii + '" paginacji, a załadowano łącznie ' + g_biezaca_pozycja_galerii + ' (vs ' + g_ilosc_zaczytanych_galerii + ') elementów galerii ze wszystkich ' + g_ilosc_wszystkich_galerii + ' galerii');
			
	 //for (var i=0; i < $lista_podstron.length; i++) {	
	
	}
	
$('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii  
} // GenerujSpisGalerii-END
	
	
	
function OdczytajTrescOdnosnikaWybranejGalerii ( numer_kolejnego_w_spisie ) 
{
var tag_kontener_przeszukiwany = 'div#skladowisko_status_wybranej_galerii';
var tag_miejsce_docelowe = 'div#nazwa_galerii';	
var tresc_odnosnika = '';
	// wstawiac na próżno SRC do WSZYSTKICH miniatur aby nie było błędu HTTP_404 ?!  
var ile_pozycji_spisu_tresci = $( tag_kontener_przeszukiwany + " td.galeria_kolor a.link_tresc img").length;	// ile odnośników/obrazków w spisie treści
console.log('ILE: ' + ile_pozycji_spisu_tresci);		

	if ( numer_kolejnego_w_spisie >= 0 )
	{	
		if  ( ile_pozycji_spisu_tresci >= 0 )
		{
			//var miejsce_docelowe = $( g_miejsce_na_spis + " .zdjecie_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );
        var $odnosnik_zdjecia = $( tag_kontener_przeszukiwany + " td.galeria_kolor a.link_tresc img:eq(" + parseInt( numer_kolejnego_w_spisie ) + ")")

		var src_docelowe = g_protokol_www + g_adres_strony + "/" + $odnosnik_zdjecia.attr( "src" );	// "naprawa" źródeł obrazków na zewnętrzną www
		$odnosnik_zdjecia.attr( "src", src_docelowe );
		$( tag_miejsce_docelowe ).html( $odnosnik_zdjecia ); // podmiana oryginalnej zawartości - wstawienie skojarzonego zdjęcia i dopisanie tytułu z opisem
		console.log('SRC: ' + src_docelowe);	
	
		var odnosnik_tytul = $( tag_kontener_przeszukiwany + " td.galeria_kolor b a.link:eq(" + parseInt( numer_kolejnego_w_spisie ) + ")" ).text();	
		$( tag_miejsce_docelowe ).append( '<h2>' + odnosnik_tytul + '</h2>' );
		}

    var odnosnik_opis = $( tag_kontener_przeszukiwany + " td blockquote div[align=justify]:eq(" + parseInt( numer_kolejnego_w_spisie ) + ")" ).text();	
    $( tag_miejsce_docelowe ).append( '<p>' + odnosnik_opis + '</p>' );
		
	
// $( tag_kontener_przeszukiwany ).empty();		// zerowanie po przeszukaniu
            // separacja, przerzucić poniższe do właściwej funkcji
		
    $('#nazwa_galerii').show(100);	
    //$('#skladowisko').show(100);
		
    } // IF numer_kolejnego_w_spisie >= 0 END
return 1; // ??? - zwrócić obiekt, określający szczegóły danej galerii zamiast tej stałej
    
} //OdczytajTrescOdnosnikaWybranejGalerii-END
	
	
// ---------- *** AUTO URUCHAMIANE *** --------------	
	
function ZaczytajSpisGalerii () 
{
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
	
function InicjujPrzyciskiWyboruGalerii ()	
{
//$('#losuj_zakres').click();	
g_wybrany_nr_galerii = Math.floor(Math.random() * 100) + 1 ;	
console.log('Ustalanie POCZĄTKOWYCH (np. ' + g_wybrany_nr_galerii + ') wartości pól formularza przeglądania galerii...');
$g_input_nr_galerii.val( g_wybrany_nr_galerii );	
$g_suwak_nr_galerii.val( g_wybrany_nr_galerii );	
$g_suwak_nr_galerii.attr( 'max' , 105 ); // nie trzeba teraz?	
}
 
    
function NormalizujZakresPolaInput ( wartoscBiezaca )
{
wartoscBiezaca = parseInt( wartoscBiezaca );   // konwersja do typu Number, całkowite liczby 
    
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
    
return wartoscBiezaca;   
}

    
function UzupełnijBiezacaGalerie ( tytul, opis, srcObrazka, diagnostyka ) 
{
var trescHtml = '<div class="kontener"><img src="' + srcObrazka +'" alt="' + tytul + '" />';
trescHtml += '<h2>' + tytul + '</h2>';
trescHtml += '<p>';
    if ( diagnostyka ) trescHtml += diagnostyka + '<br />' ;
trescHtml += opis + '</p></div>';    
    
$('#nazwa_galerii').html( trescHtml );
$('#nazwa_galerii').show(100);	    
}    
    

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
$('html, body').animate({ scrollTop : (pozycjaElementuWPionie + korektaY) }, czasAnimacji);    
}   

    
    
// ***************************************************************************	
// ---------- *** AUTOURUCHAMIANIE *** --------------	 
	
InicjujPrzyciskiWyboruGalerii();
	
ZaczytajSpisGalerii();
	

	
// ***************************************************************************		

	
	
	// sterowanie wielkością czcionki nagłówka
	
	//$("#banner h1.logo").fitText();
	 $("#napisy h1").fitText(1.0, { minFontSize: '15px', maxFontSize: '65px' });
	 $("#napisy h2").fitText(2.7, { minFontSize: '10px', maxFontSize: '28px' });
	 $("#napis_spod h3").fitText(3.0, { minFontSize: '6px', maxFontSize: '20px' });
	
	
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

    //ustawienie pola formularza
    $g_input_nr_galerii.val( g_wybrany_nr_galerii );
    // 
    $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
    }

}); // #losuj_zakres click-END	


$g_suwak_nr_galerii.change( function() {
var wartoscBiezaca = $(this).val();

g_wybrany_nr_galerii = wartoscBiezaca;
$g_input_nr_galerii.val( wartoscBiezaca );
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

$('#galeria_wybrany_nr').blur( function() {
    
var wartoscBiezaca = parseInt( $(this).val() );
wartoscBiezaca = NormalizujZakresPolaInput( wartoscBiezaca );    
$(this).val( wartoscBiezaca );    // pobierz bieżącą wartośc i dokonaj ewentualnej korekty dla zakresu
g_wybrany_nr_galerii = wartoscBiezaca;
$g_suwak_nr_galerii.val( wartoscBiezaca );
});
    

$('#suwak_galerii_submit').click( function() {
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
    var tag_na_podstrone_spisu_tresci_galerii = 'div#skladowisko_status_wybranej_galerii';	
        //  var nr_galerii = parseInt( $g_input_nr_galerii.val() ); // odczytanie z formularza jako Number
    var nr_galerii = NormalizujZakresPolaInput( $g_input_nr_galerii.val() ); // odczytanie z formularza jak jest + weryfikacja zakresu
        
    var nr_podstrony_galerii_max = Math.floor( g_ilosc_wszystkich_galerii / 5 ) + Math.ceil( ( g_ilosc_wszystkich_galerii % 5 ) / 5 );	
    var ile_razy = Math.floor( nr_galerii / 5 ); 
    var ile_reszty = nr_galerii % 5 ;
    var pozycja_w_galerii = ( g_ilosc_wszystkich_galerii - nr_galerii ) % 5;
    var nr_podstrony_galerii = nr_podstrony_galerii_max;    // POPRAWIĆ TE WARUNKI NA OBLICZANIE GALERII DLA DANEGO NUMERU (PODSTRONA + POZYCJA)
        if ( g_ilosc_wszystkich_galerii % 5 != 0 ) nr_podstrony_galerii = nr_podstrony_galerii_max - Math.floor( ( nr_galerii + pozycja_w_galerii ) / 5 ) ;
    //http://zlobek.chojnow.eu/galeria,k0,p38.html	
    var adres_podstrony_galerii_fragment = '/' + 'galeria,k0,p';
    var adres_podstrony_galerii_obliczony = adres_podstrony_galerii_fragment + nr_podstrony_galerii + '.html';	
    var adres_galerii_wygenerowany = g_protokol_www + g_adres_strony + adres_podstrony_galerii_obliczony;	
    //var nr_podstrony_galerii_max = (ile_razy + 1) + 			

    var tresc_wygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nr_podstrony_galerii_max + "<br />"; 
    tresc_wygenerowana += "WYBRANA: " + nr_galerii + ", PODSTRONA: " + nr_podstrony_galerii + ", POZYCJA_W_GALERII: +" + pozycja_w_galerii + "<br />"; 
    tresc_wygenerowana += "<br /> Dla wybranej " + nr_galerii + " odnośnik ma nr " + ile_razy + " w " + ile_reszty + " podstronie, a łączny adres to: \"" + adres_galerii_wygenerowany + "\"</p>";

    $('#status_wybranej_galerii').html( tresc_wygenerowana );	

     // return false; // póki co też nie przechodź		
     // skladowisko_status_wybranej_galerii	
    WczytajZewnetrznyHTMLdoTAGU( tag_na_podstrone_spisu_tresci_galerii, g_protokol_www + g_adres_strony, adres_podstrony_galerii_obliczony, g_element_zewnetrzny_spis, "spis_galerii_rekurencja", { 'nr_galerii_w_spisie' : pozycja_w_galerii } ); 	

    }

return false;		// !!! nie robię nic, nie przesyłam wybranej galerii do przejrzenia 
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

$( g_wczytywanie ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 

//alert("kliknięto '.przycisk_galeria'... albo kontener: " + this.tagName );
//alert("VAL: '" + $this.attr('value') + "', DATA-TAG: " + $this.attr('data-tag') );

// ?!?!
//alert( 'TAG: ' + $this.attr('data-tag') + ' ADRES: ' + $this.attr('data-adres_strony') + ' GALERIA: ' + $this.attr('data-adres_galerii') + ' ELEMENT: ' + $this.attr('data-elem_zewn') );
//WczytajZewnetrznyHTMLdoTAGU( nowyDiv.attr('id'), g_adres_strony, odnosnik_podstrony, g_element_zewnetrzny, true);

//WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);
WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), serwer, $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona" );

//<button class="przycisk_galeria" id="galeria_paginacja_1" data-tag="div#zawartosc_do_podmiany" data-adres_strony="http://zlobek.chojnow.eu/" data-elem_zewn="table.galeria" value="u_misiow,a20,p2.html" data-adres_galerii="u_misiow,a20,p2.html">Galeria nr 1</button>

});	//  on("click")-$('#nawigacja_galeria')-END	
	
	   // "przycisk" ładujący kolejne +5 galerii (max), porządek ujemnie chronologiczny
$('#spis_sterowanie').on("click", "#zaladuj_galerie_spis", function() { 
g_suma_klikniec_zaladuj++;	// zliczaj naciśnięcia na ten przycisk

    if ( g_suma_klikniec_zaladuj < g_ilosc_zaczytanych_paginacji_galerii   ) 
    {
	g_biezaca_pozycja_galerii++;  // zwiększenie licznika, przejście do wywołania kolejnej podstrony
	// licznik zwiększa się już PO nacisnięciu odnosnika i PRZED zakończeniem przetwarznia uprzednio zaczytanych treści !!! 
	// co najwyżej kolejność może być inna na liście wyników
	
		if ( g_biezaca_pozycja_galerii <= g_ilosc_zaczytanych_paginacji_galerii )
		{
		$( g_wczytywanie_spis ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 
		console.log('Na ' + g_suma_klikniec_zaladuj + ' żądanie zaczytano kolejną podstronę w galerii ' + g_biezaca_pozycja_galerii + ' z ' + g_ilosc_zaczytanych_paginacji_galerii + ' podstron.');
			
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

$('#galeria_spis').on("click", "a", function(e){ 
e.preventDefault();	// "nieprzechodzeniedalej" po odnośnku    
var $this = $(this);
var galeria_docelowa = $this.attr('href');	


	
var tytulGalerii = $this.text();	  // przypisanie treści -- tytułu dla danej galerii (wstępnie, jeśli naciśnięto na nagłówek, a nie na obrazek -- bo nie posiadałby tekstu)   
var opisGalerii = $this.parents('.kontener_odnosnik').find('.opis_odnosnik').html();	 // było .text( ... )
var srcObrazkaGalerii = $this.parent().siblings('div.zdjecie_odnosnik').find('a img').attr('src');    
	
	if ( tytulGalerii.length == 0 )  // jeżeli naciśnięto odnośnik z obrazkiem, ten drugi zawiera już treść odnośnika
    {
    tytulGalerii = $this.parent().siblings('div.tytul_odnosnik').find('a h2').html();	 // było .text( ... )
    srcObrazkaGalerii = $this.find('img').attr('src');    
    }
//alert('g_tag_do_podmiany, g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/', galeria_docelowa, g_element_zewnetrzny, "galeria_podstrona")
//alert('WczytajZewnetrznyHTMLdoTAGU( tag: ' + g_tag_do_podmiany_zdjecia + ', domena: ' + g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/' + ', zasób: ' + galeria_docelowa + ', elem: ' + g_element_zewnetrzny + ') ... MYSZA NAJECHAŁA');
console.log('ZDARZENE: "Naciśnięto" i wywołano odnośnik do galerii "' + g_nazwa_galerii + '"' ); 	

UzupełnijBiezacaGalerie ( tytulGalerii, opisGalerii, srcObrazkaGalerii );    
    
// załaduj pierwszą stronę z danej galerii	

	
// wstawienie animacji na ładowanie
$( g_wczytywanie ).show(100);	
//var g_folder_serwera 		
// załadowanie odnosnika ze s	
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




	
}); //document-ready-END
