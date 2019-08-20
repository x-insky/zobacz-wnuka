// *************************************  TU TREŚCI, KTÓRE WYLECĄ ZE STRONY ********************************************** 
//          podmienione za nowsze wersje


    // wersja bez obiektu zdarzenia... zdarzenie ciągkle do obsługi w serwisie!

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

// UzupełnijNaglowekBiezacejGalerii( g_nazwa_galerii, g_opis_galerii, g_obrazek_galerii_src );
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

        //var nrGalerii = odnosnik_podstrony.split(",")[2];
        var nr_galerii = parseInt ( odnosnik_podstrony.substr( odnosnik_podstrony.lastIndexOf(",") + 2, odnosnik_podstrony.length - 5 )	);
        // atrybut_href.lastIndexOf(",") 	
        //if ( !nr_galerii) { nr_galerii = 1; }
        //	nr_galerii = nr_galerii.substr(1); // dodatkowe usuwanie pierwszego znaku, tj. "p", które jest przed numerem podstrony galerr (numer kończy się ".html" - pomijane przy konwersji STRINGU)

        var nowyPrzycisk = $('<button></button>', {
        // var nowyPrzycisk = $('<input></input>', { 
        // type : "button",            
            id : "galeria_paginacja_" + String( i+1 ),
            class : "przycisk_galeria",
            //value : odnosnik_podstrony,
            value : nr_galerii, 

            
            text : "Galeria nr " + nr_galerii,
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