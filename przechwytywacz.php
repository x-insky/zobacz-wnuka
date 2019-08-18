<?php
//header('Content-Type: text/html; charset=iso-8859-2');

	// bez "var" przed zmienną w php, pamiętaj !!!
$adres_przekierowania = $_GET['url_zewn'];

	// tu uwzględnione zawartości zewnętrzne (obrazki i skrypty) z macierzystej witryny, jawne odwołania 
	/* 
$tablica_wykluczen = array (
	addslashes ("<SCRIPT src='js/cookie.js' type='text/javascript'></SCRIPT>"),
	addslashes ("<LINK href='style/stylglowny.css' rel='stylesheet' type='text/css' />"),
	addslashes ('<img src="zdjecia/zlobek.jpg" border="0">'),
	addslashes ('<img src="zdjecia/zlobek.gif" border="0" align="center">'),
	addslashes ('<img src="zdjecia/zlobek_90_2.jpg" alt="(szerokość: 150 / wysokość: 92)">'),
	addslashes ('<img src="zdjecia/zlobek_90_132.jpg" alt="(szerokość: 190 / wysokość: 190)">')	
); 
	*/

$koniec_zakresu = 0;
$pozycja_zakresu = 0;
$tag_szukany = 'table';
$tag_szukany_element = '<' . $tag_szukany ;
$tag_szukany_pozycja = 0;
$tag_zamykajacy = '</' . $tag_szukany . '>';
$tag_zamykajacy_pierwsza_pozycja = 0;
$tag_szukany_klasa	= 'galeria';
// $tag_szukany_klasa_razem = 'class=' . '"' . $tag_szukany_klasa . '"';  // nazwa klasy z tabelką galerii

$zawartosc_do_przegladarki = '' ; // !!! wysłanie do przeglądarki PEŁNEJ ZAWARTOŚCI STRONY (albo już zmodyfikowanej treści)
$dlugosc_zawartosci = 0;
$roznica_polozenia = 0;

	// a tu ich podmieniane odpowiedniki -- czyli na żadne docelowo  
$tablica_wykluczen_zamienniki = ''; // wszystkie pasujące do wzorca zamień za pusty ciąg, aby nie komplikowac z ilością pustych elementów

//echo "Cos dziala, czy nie dziala?!"; 
// czyszczenie parametru w GET !!!
	
	
$obslugiwany_serwer = "zlobek.chojnow.eu";

// jeżeli zawiera odnośnik do właściwego adresu to skrypt przepuści wywołanie -- tylko wtedy działamy dalej

 if ( strpos( $adres_przekierowania, $obslugiwany_serwer ) !== false )
 {
 $zawartosc_zewnetrzna_zaczytana = file_get_contents( $adres_przekierowania );
	
	//konwersja z windows-1250 na utf-8; brawo ja!
	$zawartosc_zewnetrzna_zaczytana = iconv( "windows-1250", "utf-8", $zawartosc_zewnetrzna_zaczytana );	 
		
	// PIERWSZA WERSJA - wyślij wszystko - pełna strona macierzysta jako dopowiedź na GET	... jest dobrze ale BŁĘDY w konsoli z linkowniem kilku obrazków
	/* 	echo $zawartosc_zewnetrzna_zaczytana ; */	
		
	// DRUGA WERSJA -  wysyłanie fragmentu z <table.galeria> obrazki, opisy i nawigacje między elementami zawiera; nie ma przy tym odwołań 404 do rzeczy niepotrzebnych 	
		
		
 $koniec_zakresu = strlen( $zawartosc_zewnetrzna_zaczytana );
		
	// szukany element <table class="galeria"> powienien być jednym z ostatnich
	$tag_szukany_pozycja = strripos( $zawartosc_zewnetrzna_zaczytana, $tag_szukany_element );	
	
		if ( $tag_szukany_pozycja !== false )
		{
		$tag_zamykajacy_pierwsza_pozycja = stripos( $zawartosc_zewnetrzna_zaczytana, $tag_zamykajacy, $tag_szukany_pozycja );	
					
			if ( ( $tag_zamykajacy_pierwsza_pozycja < $koniec_zakresu ) && ( $tag_zamykajacy_pierwsza_pozycja > 0) )
			{
			 // szukanie klasy "galeria" 
			 $pozycja_zakresu = stripos( $zawartosc_zewnetrzna_zaczytana, $tag_szukany_klasa, $tag_szukany_pozycja );  // szukaj klasy "galeria" tuż za znalezionym <table>			
				$roznica_polozenia = $pozycja_zakresu - $tag_szukany_pozycja ;
				 if ( ( $pozycja_zakresu > 0 ) && ( $roznica_polozenia < 100	|| $roznica_polozenia > -100 ) ) // jeżeli jest bliskie sąsiedztwo <table> i klasy, ...
					{	
					$dlugosc_zawartosci = $tag_zamykajacy_pierwsza_pozycja - $tag_szukany_pozycja + strlen('</table>') ; // treść łącznie z tagiem zamykającym
					$zawartosc_do_przegladarki = substr( $zawartosc_zewnetrzna_zaczytana, $tag_szukany_pozycja, $dlugosc_zawartosci ); // od <table.galeria> do </table> 
					}
			}
		}
		
		// tez metoda - zabrac pewne treści dla nieotrzebnych elementów zewnętrznych
		/*
		$zawartosc_zewnetrzna_zaczytana = str_replace( $tablica_wykluczen, $tablica_wykluczen_zamienniki, $zawartosc_zewnetrzna_zaczytana );	// porównania treści odwołań do plików trudnością
	 */
		
		// diagnostyka ...
	/* 	
	echo 'CAŁOŚĆ: ' . $koniec_zakresu . ', CIĄG SZUKANY: ' . $tag_szukany_element . ', POZYCJA: ' . $tag_szukany_pozycja . ', ZAMNIĘCIE_TAGU: "' . $tag_zamykajacy .'" na ' .$tag_zamykajacy_pierwsza_pozycja . ', DŁUGOŚĆ: ' . $dlugosc_zawartosci .'", KLASĘ "' . $tag_szukany_klasa . '" ZNALEZIONO na" ' . $pozycja_zakresu . ', RÓŻNICA_KLASY: ' . $roznica_polozenia . PHP_EOL ; 
	*/	
	
		if ( $zawartosc_do_przegladarki != false )
		{	
		echo $zawartosc_do_przegladarki ; // ale wysłanie fragmentu "psuje" przetwarznie w JS
		}
		else 
		{ 
		echo $zawartosc_zewnetrzna_zaczytana ; // !!! wysłanie do przeglądarki PEŁNEJ ZAWARTOŚCI STRONY
		}
		
	}
 else
	{
	echo "Nieprawidłowy adres!!!";	
	}
?>