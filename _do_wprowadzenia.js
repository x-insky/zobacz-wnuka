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
var nrPodstronyGalerii = nr_podstrony_galerii_max ;    // POPRAWIĆ TE WARUNKI NA OBLICZANIE GALERII DLA DANEGO NUMERU (PODSTRONA + POZYCJA)
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
            $obrazkiTytuloweGalerii[i].removeAttr('src');    
            console.log('Usunięto brakujący SRC w IMG #' + (i+1) + ' spośród ' + $obrazkiTytuloweGalerii.length + ' obrazków galerii' );
            }
        }
    }

    
}











function PośrednieGenerowanieWybranejGalerii ( numerGalerii )
{
var pozycjaElementuWSpisie = KtoraPozycjaWGalerii( numerGalerii );    
UsunBrakujaceSRCwIMGPozaPrzekazanym ( przeszukiwanyKontener, pozycjaElementuWSpisie ); 
 
  
var podstronaDlaGalerii = KtoraPodstronaWGalerii ( numerGalerii );    

    
var galeriaWybrana = OdczytajTresciOdnosnikaWybranejGalerii ( przeszukiwanyKontener, pozycjaElementuWGalerii )   



}





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
    trescWygenerowana += ". Łączny adres to: \"" + adresPodstrony + "\"</p>";

    $('#status_wybranej_galerii').html( trescWygenerowana );	        

    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "spis_galerii_rekurencja", { 'pozycjaWGalerii' : pozycjaWGalerii } ); 	// ES5 unfriendly
    }
}); // warunkowe zaczytywanie albo "nierobienie nic" po kliknięciu


// *************************************  TU TREŚCI, KTÓRE WYLECĄ ZE STRONY ********************************************** 
//          podmienione za nowsze wersje

