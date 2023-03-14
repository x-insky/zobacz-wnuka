<?php

// ===============  definicje funkcji  =======================

function znajdz_poczatek_tagu ( $ciag, $wartosc_atrybutu ) { // ewentualnie rozszerzyć o: $jaki_atrybut, $tag_szukany

	$dlugosc_ciagu = strlen( $ciag );
	$ciag_szukany = '="' . $wartosc_atrybutu . '"';
	$pozycja_atrybutu = stripos( $ciag, $ciag_szukany);

	if ( $pozycja_atrybutu === false)		// ewidentne porównanie z wartością FALSE === "nie znaleziono"
	{
		return false; // nie znaleziono takowego atrybutu, dalsze szukanie nie ma sensu
	}
	$podciag_przeszukiwany = substr( $ciag, 0, $pozycja_atrybutu); // podciąg = zakres od początku zawartości do nazwy znalezionego atrybutu
	$pozycja_tagu = strripos( $podciag_przeszukiwany, "<" ); // ostatni "<" przed końcem podciągu
	
	return $pozycja_tagu;	// ZWRÓĆ najbliższe otwarcie TAGu od lewej przy znalezionym atrybucie
}	// znajdz_poczatek_tagu()-END

function obetnij_od_ostatniego_zamykajacego_diva ( $ciag ) {

	$pozycja_ostatniego_zamykajacego_diva = strripos( $ciag, "</div>");	// ostatni zamykający tag <DIV> w ciągu

	if ( $pozycja_ostatniego_zamykajacego_diva !== false )
	{
		$ciag_skrocony = substr( $ciag, 0, $pozycja_ostatniego_zamykajacego_diva );
		return $ciag_skrocony;	// zwróć ciąg ukrócony o nadmiarową strukturę
	}
	return $ciag;	// zwróć to samo, jeśli nie ma z czego obcinać
}	// obetnij_od_ostatniego_zamykajacego_diva()-END
	
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
$adres_przekierowania = $_GET['url_zewn'];	// odczyt z wywoływanego zapytania
$zawartosc_do_przegladarki = '' ; // docelowo: wysłanie do przeglądarki PEŁNEJ ZAWARTOŚCI STRONY (albo już zmodyfikowanej treści)
$obslugiwany_serwer = "zlobek.chojnow.eu";
	// $tablica_wykluczen_zamienniki = ''; // wszystkie pasujące do wzorca zamień za pusty ciąg, aby nie komplikować z ilością pustych elementów
$atrybut_tagu_szukanego = "galeria_tresc";	// 'id="galeria tresc"', wcześniej 'class="galeria"'
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
		}	// IF-( położenie pozycji wysuiwaych ciągów )-END

		if ( $zawartosc_do_przegladarki !== false )	// określenie istnienia oczekiwanego fragmentu z odczytanej witryny 
		{	
		echo $zawartosc_do_przegladarki ; // finalny zrzut OCZEKIWANYCH TREŚCI do serwera
		}
		else
		{ 
		echo $zawartosc_zewnetrzna_zaczytana ; // !!! wysłanie do przeglądarki PEŁNEJ ZAWARTOŚCI STRONY- ale wysłanie fragmentu "psuje" przetwarznie w JS
		}
		
	} // IF-( strpos( $adres_przekierowania, $obslugiwany_serwer ) !== false )-END
	else
	{
	echo "!-A-W-A-R-I-A-! Użyto nieprawidłowego adresu w zapytaniu lub wystąpił inny błąd!";
	}

?>