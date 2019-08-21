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
var nrPodstronyGaleriiMAX = MaksymalnaIloscPodstronGalerii();	
var ileRazy = Math.floor( nrGalerii / 5 ) ; 
var ileReszty = nrGalerii % 5 ;
var pozycjaWGalerii = KtoraPozycjaWGalerii( nrGalerii ) ;
var nrPodstronyGalerii = nrPodstronyGaleriiMAX ;    // POPRAWIĆ TE WARUNKI NA OBLICZANIE GALERII DLA DANEGO NUMERU (PODSTRONA + POZYCJA)
    if ( g_ilosc_wszystkich_galerii % 5 != 0 ) nrPodstronyGalerii = nrPodstronyGaleriiMAX - Math.floor( ( nrGalerii + pozycjaWGalerii ) / 5 ) ;   
return nrPodstronyGalerii;
}


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
odczytaneNamiary.srcObrazeka = roboczaWartosc;
    
console.log('Natrafiono na obrazek "' + roboczaWartosc + '" dla tytułu o indeksie +' + pozycjaElementuWGalerii );
    // kasowanie SRC z IMG dla wskazanego tytułu galerii, aby nie było problemu z GET dla otrzymanego wycinka witryny macierzystej 
$( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img:eq(" + parseInt( pozycjaElementuWGalerii ) + ")" ).removeAttr('src');
return odczytaneNamiary;    // zwróć obiekt 

} //OdczytajTresciOdnosnikaWybranejGalerii-END





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


function NaprawBrakujaceSRCwKontenerze ( przeszukiwanyKontener )
{
var srcObrazka = '';    
var $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img");
	for (var i=0; i < $obrazkiTytuloweGalerii.length ; i++ )
	{
    srcObrazka = $($obrazkiTytuloweGalerii[i]).attr('src');
    srcObrazka = g_protokol_www + g_adres_strony + "/" + srcObrazka;
    srcObrazka = $($obrazkiTytuloweGalerii[i]).attr('src', srcObrazka);    
    }
}








function PośrednieGenerowanieWybranejGalerii ( numerGalerii )
{
var pozycjaElementuWSpisie = KtoraPozycjaWGalerii( numerGalerii );    
UsunBrakujaceSRCwIMGPozaPrzekazanym ( przeszukiwanyKontener, pozycjaElementuWSpisie ); 
 
  
var podstronaDlaGalerii = KtoraPodstronaWGalerii ( numerGalerii );    

    
var galeriaWybrana = OdczytajTresciOdnosnikaWybranejGalerii ( przeszukiwanyKontener, pozycjaElementuWGalerii )   



}




function GenerujPodstronyGalerii ( kontenerZrodlowy, nrWyswietlanejGalerii ) { 	// poniżej wartości domyślne dla parametrów ES5
    if ( ( !kontenerZrodlowy ) || ( kontenerZrodlowy == '') ) kontenerZrodlowy = '#zawartosc_do_podmiany';
    if ( nrWyswietlanejGalerii == undefined ) nrWyswietlanejGalerii = 1;    
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
    
$('#wczytywanie').hide(100);	// schowaj informację, skoro wczytano zawartość
$('#glowna div#komentarz').hide(100);	//showaj opis-informację o ile była pokazana
$kontenerDocelowy.show( 100, PrzewinEkranDoElementu( kontenerDocelowyElement, 200, -8 - (wysokoscDivWczytywanie + wysokoscDivKomentarz) )  );	// pokaż kontener na zaczytaną zawartość + przewiń po wyświetleniu całości
    
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

    // czyszczenie kontenera na nawigację galerii, jeżeli wcześniej zawierał zawartość
    $('nav#nawigacja_galeria').empty();
        
    var nazwaPodstronyGalerii = '';    
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

        var nowyPrzycisk = $('<button></button>', {
        // var nowyPrzycisk = $('<input></input>', { 
        // type : "button",            
            id : "galeria_paginacja_" + ( i+1 ),
            class : "przycisk_galeria",
            value : nr_galerii, 
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

$( g_miejsce_na_zdjecia ).empty(); // czyszczenie bieżącej podstrony, dla wyświetlenie nowej galerii 
g_miejsce_na_zdjecia.append('<h2>Zawartość bieżącej galerii o numerze ' + nrWyswietlanejGalerii + '</h2>');  // dopisanie nagłówka dla bieżącej galerii  

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
        // porządek odwrotnie chronologiczny - 'p1' lub jego brak wskazuje na pierwszą od końca podstronę z pięcioma elemenatmi, 'p2' na przedostatnią, ... 
        // konieczne obliczenie pozycji 'spisu treści' - da się ustalić numerycznie jako m-ta podstrona z wszystkich galerii
        // celem jest pozyskanie stamtąd adresu dla wybranej N-tej galerii 
    var adresPodstrony =  '/' + 'galeria,k0,p' + podstronaWGalerii + '.html' ;    
 
    // DEBUG_MODE    
    var trescWygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nrPodstronyGaleriiMAX + "<br />"; 
    trescWygenerowana += "WYBRANA: " + wybranyNrGalerii + ", PODSTRONA: " + podstronaWGalerii + ", POZYCJA_W_GALERII: +" + pozycjaWGalerii + "<br />"; 
    trescWygenerowana += "<br /> Dopasowano na " + podstronaWGalerii + ". podstronie, z przesunięciem " + pozycjaWGalerii ;
    trescWygenerowana += ". Łączny adres to: \"" + g_adres_strony + "/" + adresPodstrony + "\"</p>";

    $('#status_wybranej_galerii').html( trescWygenerowana );	        

    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "spis_galerii_rekurencja", { 'pozycjaWGalerii' : pozycjaWGalerii } ); 	// ES5 unfriendly
    }
return false; // to jest lepszy i konieczny warunek na "niewysyłanie formularza"     
}); // warunkowe zaczytywanie albo "nierobienie nic" po kliknięciu






