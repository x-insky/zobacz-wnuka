<?php

// ===============  funkcje  =======================

function znajdz_poczatek_tagu ( $ciag, $wartosc_atrybutu ) { // ewentualnie rozszerzyć o: $jaki_atrybut, $tag_szukany

	$dlugosc_ciagu = strlen( $ciag );
	$ciag_szukany = '="' . $wartosc_atrybutu . '"';
	$pozycja_atrybutu = stripos( $ciag, $ciag_szukany);

	if ( $pozycja_atrybutu === false)		// porównanie z jawną wartość FALSE
	{
		return false; //
	}
		// 
	$podciag_przeszukiwany = substr( $ciag, 0, $pozycja_atrybutu); // obcięcie początku
	$pozycja_tagu = strripos( $podciag_przeszukiwany, "<" ); // ostatni "<" przed końcem podciągu
			// weryfikowanie?
	// echo "ciag_szukany: " . $ciag_szukany . " dlugosc_ciagu: " . $dlugosc_ciagu . "<br />";		
	// echo "pozycja_tagu '" . $wartosc_atrybutu . "': " . $pozycja_tagu . " pozycja_atrybutu: " . $pozycja_atrybutu . "<br />"; // testowe logowanie zawartości
	
	return $pozycja_tagu;	// ZWRÓCIĆ najbliższy od lewej TAG !!!
}

function obetnij_od_ostatniego_zamykajacego_diva ( $ciag ) {

	$pozycja_ostatniego_zamykajacego_diva = strripos( $ciag, "</div>");

	if ( $pozycja_ostatniego_zamykajacego_diva !== false )
	{
		$ciag_skrocony = substr( $ciag, 0, $pozycja_ostatniego_zamykajacego_diva );
		return $ciag_skrocony;	// zwróć ciąg ukrócony o nadmiarową strukturę
	}
	return $ciag;	// zwróć to samo, jeśli nie ma z czego obcinać
}
	
// ===================================

	// tu uwzględnione zawartości zewnętrzne (obrazki i skrypty) z macierzystej witryny -- jawne odwołania
	/* 
$tablica_wykluczen = array (
	addslashes ("<SCRIPT src='js/cookie.js' type='text/javascript'></SCRIPT>"),
	addslashes ("<LINK href='style/stylglowny.css' rel='stylesheet' type='text/css' />"),
	addslashes ('<img src="zdjecia/zlobek.jpg" border="0">'),	// banner tytułowy
	addslashes ('<img src="zdjecia/zlobek.gif" border="0" align="center">'),	// obrazek mały
	addslashes ('<img src="zdjecia/zlobek_90_2.jpg" alt="(szerokość: 150 / wysokość: 92)">'),	// przydład dla obrazka profilowego danej "90. galerii"
	addslashes ('<img src="zdjecia/zlobek_90_132.jpg" alt="(szerokość: 190 / wysokość: 190)">')	// przydład dla pierwszego zdjęcia/obrazka w danej "90. galerii"
); 
	*/

// w php pamiętaj: bez "var" przed zmienną!!!
$adres_przekierowania = $_GET['url_zewn'];

/* $koniec_zakresu = 0;
$pozycja_zakresu = 0;
$tag_szukany = 'div';
$tag_szukany_element = '<' . $tag_szukany;
$tag_szukany_pozycja = 0;
	$tag_ostani_zamykajacy_dla_szukanego = '</' . $tag_szukany . '>' ;	// "dynamiczny" wariant 
$tag_szukany_zamykajacy = 'id=\"stopka\"';	// WCZEŚNIEJ:'</' . $tag_szukany . '>';
	$kolejny_tag_za_szukanym_atrybut = '=\"stopka\"';
	$kolejny_tag_za_szukanym_nazwa_atrybutu = 'id';
	$kolejny_tag_za_szukanym_dlugosc_tekstu = strlen( $kolejny_tag_za_szukanym_nazwa_atrybutu ) + strlen( $tag_szukany ) + 2; // długość tekstu do odjecia rzed
	$pozycja_tagu_zamykajacego = 0;
$tag_zamykajacy_pierwsza_pozycja = 0;
$tag_szukany_atrybut = '="galeria_tresc"';	// 'id="galeria tresc"', wcześniej 'class="galeria"'
// $tag_szukany_atrybut_razem = 'class=' . '"' . $tag_szukany_atrybut . '"';  // sklejanie: nazwa klasy z tą tabelką galerii
$dlugosc_zawartosci = 0;
$roznica_polozenia = 0;
	// a tu ich podmieniane odpowiedniki -- czyli na żadne docelowo
$tablica_wykluczen_zamienniki = ''; // wszystkie pasujące do wzorca zamień za pusty ciąg, aby nie komplikować z ilością pustych elementów
*/
$zawartosc_do_przegladarki = '' ; // !!! wysłanie do przeglądarki PEŁNEJ ZAWARTOŚCI STRONY (albo już zmodyfikowanej treści)
$obslugiwany_serwer = "zlobek.chojnow.eu";

$atrybut_tagu_szukanego = "galeria_tresc";
$atrybut_tagu_kolejnego_za_szukanym = "stopka";

// jeżeli zawiera odnośnik do właściwego adresu to skrypt przepuści wywołanie -- tylko wtedy działamy dalej
	if ( strpos( $adres_przekierowania, $obslugiwany_serwer ) !== false )
	{
	$zawartosc_zewnetrzna_zaczytana = file_get_contents( $adres_przekierowania );	// pobranie zawartości CAŁEGO zewnętrznego pliku HTML -- jako tekst

	// !!! konwersja z windows-1250 na utf-8; brawo ja!
	// UWAGA: od końca 2022-11, macierzysta witryna jest kodowana w UTF-8 ==> KONWERSJA NIEPOTRZEBNA, a nawet problematyczna, bo "UTF-8" na "UTF-8" generuje bzdury! (brawo witryna, w końcu!)
	// $zawartosc_zewnetrzna_zaczytana = iconv( "windows-1250", "utf-8", $zawartosc_zewnetrzna_zaczytana );		// niepotzrebna już konwersja tekstów HTMLa zródła
		
	// PIERWSZA WERSJA - wyślij wszystko - pełna strona macierzysta jako odpowiedź na GET ===> jest dobrze, ale BŁĘDY w konsoli z linkowniem kilku obrazków
	/* 	echo $zawartosc_zewnetrzna_zaczytana ;	// wyślij wszystko zaczytane zdalnie  w sytuacji awaryjnej, gdy nie odnajdzie się właściwego fragmentu na stronie   
	*/
		
	// albo DRUGA WERSJA (rozwinięcie PIERWSZEJ) - pobrać całą zawartość źródłową, ale wyciąć pewne treści dla niepotrzebnych elementów zewnętrznych (np. CSS, obrazki: ikonę-logo, ikone galerii, ...) ==> linkowanie się nie będzie zgadzać
	/*
	$zawartosc_zewnetrzna_zaczytana = str_replace( $tablica_wykluczen, $tablica_wykluczen_zamienniki, $zawartosc_zewnetrzna_zaczytana );	// porównania treści odwołań do plików to trudność
	*/

	// TRZECIA WERSJA -  wysyłanie fragmentu z <table.galeria> obrazki, opisy i nawigacje między elementami zawiera; nie ma przy tym odwołań 404 do rzeczy niepotrzebnych

$pozycja_poczatku_tagu_szukanego = znajdz_poczatek_tagu( $zawartosc_zewnetrzna_zaczytana, $atrybut_tagu_szukanego );
$pozycja_tagu_kolejnego_za_szukanym = znajdz_poczatek_tagu( $zawartosc_zewnetrzna_zaczytana, $atrybut_tagu_kolejnego_za_szukanym );
// $pozycja_tagu_kolejnego_za_szukanym-- ; // na pewno -1 lub więcej, aby nie łapać nowego tagu otwierającego

// ... czy aby to będzie wystarczające i do pary, i ile kolejnych niepotrzebnych tagów zamykających będzie złapanych?
// o ile cofnąć zakończenie, by nie wklejać dodatkowych elementów (DIVów może być o wiele za dużo...)
if ( ( $pozycja_poczatku_tagu_szukanego > 0 ) && ( $pozycja_tagu_kolejnego_za_szukanym > 0 ) && ( $pozycja_poczatku_tagu_szukanego < $pozycja_tagu_kolejnego_za_szukanym ) ) // że znaleziono i zakresy są OK
{
	// zwróć ten fragment zamiast całości
$zawartosc_do_przegladarki = substr( $zawartosc_zewnetrzna_zaczytana, 0, $pozycja_tagu_kolejnego_za_szukanym );	// obcięcie trochę za "ogonem"
$zawartosc_do_przegladarki = substr( $zawartosc_do_przegladarki, $pozycja_poczatku_tagu_szukanego );	// obięcie przed obrożą

$zawartosc_do_przegladarki = obetnij_od_ostatniego_zamykajacego_diva ( $zawartosc_do_przegladarki ); // obcięcie z elementów "nie do pary" pomiędzy sąsiedztwem z elementem "szukanym-kolejnym" 

	// echo $zawartosc_do_przegladarki;	// finalny zrzut treści do serwera
}                             
	//return $zawartosc_do_przegladarki



/* 	$koniec_zakresu = strlen( $zawartosc_zewnetrzna_zaczytana );
	
	
	// szukany element <table class="galeria"> powienien być jednym z ostatnich
// $tag_szukany_pozycja = strripos( $zawartosc_zewnetrzna_zaczytana, $tag_ostani_zamykajacy_dla_szukanego );	// wyszukiwanie pozycji OSTATNIEGO wystąpienia
	$tag_szukany_pozycja = strpos( $zawartosc_zewnetrzna_zaczytana, $tag_szukany_atrybut);
	$pozycja_tagu_zamykajacego = strripos( $zawartosc_zewnetrzna_zaczytana, $kolejny_tag_za_szukanym_dlugosc_tekstu );	

		if ( $pozycja_tagu_zamykajacego !== false )
		{
		echo "tag_szukany_pozycja: $tag_szukany_pozycja <br />";
		$tag_zamykajacy_pierwsza_pozycja = stripos( $zawartosc_zewnetrzna_zaczytana, $tag_szukany_zamykajacy, $tag_szukany_pozycja ); // ?!?!?!?!?
					
			if ( ( $tag_zamykajacy_pierwsza_pozycja < $koniec_zakresu ) && ( $tag_zamykajacy_pierwsza_pozycja > 0) )
			{
			// szukanie lelementu z zadaną wartością atrybutu, tu klasa/id z treścią "..." 
			$pozycja_zakresu = stripos( $zawartosc_zewnetrzna_zaczytana, $tag_szukany_atrybut, $tag_szukany_pozycja );  // szukaj atrybutu klasy/id "galeria..." tuż za znalezionym <table>
			$roznica_polozenia = $pozycja_zakresu - $tag_szukany_pozycja ;
				if ( ( $pozycja_zakresu > 0 ) && ( $roznica_polozenia < 100 || $roznica_polozenia > -100 ) ) // jeżeli jest bliskie sąsiedztwo <table> i klasy, ...
				{
				$dlugosc_zawartosci = $tag_zamykajacy_pierwsza_pozycja - $tag_szukany_pozycja + strlen( $tag_szukany_zamykajacy ) ; // treść łącznie z tagiem zamykającym
				$zawartosc_do_przegladarki = substr( $zawartosc_zewnetrzna_zaczytana, $tag_szukany_pozycja, $dlugosc_zawartosci ); // od <table.galeria> do </table>
				}
			}
		}

*/

	/*
	// diagnostyka
	echo 'CAŁOŚĆ: ' . $koniec_zakresu . ', CIĄG SZUKANY: ' . $tag_szukany_element . ', POZYCJA: ' . $tag_szukany_pozycja . ', ZAMNIĘCIE_TAGU: "' . $tag_szukany_zamykajacy.'" na ' .$tag_zamykajacy_pierwsza_pozycja . ', DŁUGOŚĆ: ' . $dlugosc_zawartosci .'", KLASĘ "' . $tag_szukany_atrybut . '" ZNALEZIONO na" ' . $pozycja_zakresu . ', RÓŻNICA_KLASY: ' . $roznica_polozenia . PHP_EOL ; 
	*/
	
		if ( $zawartosc_do_przegladarki !== false )
		{	
		echo $zawartosc_do_przegladarki ; // ale wysłanie fragmentu "psuje" przetwarznie w JS
		}
		else 
		{ 
			/* echo "pozycja_zakresu: $pozycja_zakresu <br />"  
			. "tag_szukany: $tag_szukany <br />" . "tag_szukany_zamykajacy: $tag_szukany_zamykajacy <br />"
			. "tag_zamykajacy_pierwsza_pozycja: " . $tag_zamykajacy_pierwsza_pozycja . "<br />" */

			echo $zawartosc_zewnetrzna_zaczytana ; // !!! wysłanie do przeglądarki PEŁNEJ ZAWARTOŚCI STRONY
		}
		
	} // IF-( strpos( $adres_przekierowania, $obslugiwany_serwer ) !== false )-END
	else
	{
	echo "!-A-W-A-R-I-A-! Użyto nieprawidłowego adresu w zapytaniu lub wystąpił inny błąd!";
	}
?>