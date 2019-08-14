<?php
//header(‚Content-Type: text/html; charset=iso-8859-2’);


// bez "var" przed zmienną w php, pamiętaj !!!
$adres_przekierowania = $_GET['url_zewn'];

//echo "Cos dziala, czy nie dziala?!"; 
// czyszczenie parametru w GET !!!
	
	
$obslugiwany_serwer = "zlobek.chojnow.eu";

// jeżeli zawiera odnośnik do właściwego adresu to skrypt przepuści wywołanie -- tylko wtedy działamy dalej

 if ( strpos( $adres_przekierowania, $obslugiwany_serwer ) !== false )
 {
 $zawartosc_zewnetrzna_zaczytana = file_get_contents( $adres_przekierowania );
	
	//konwersja z windows-1250 na utf-8;
	$zawartosc_zewnetrzna_zaczytana = iconv( "windows-1250", "utf-8", $zawartosc_zewnetrzna_zaczytana );	 // konwersja kodowanie windows-1250 --> utf-8; brawo ja!

	echo $zawartosc_zewnetrzna_zaczytana ; // wysłanie do przeglądarki
	}
 else
	{
	echo "Nieprawidłowy adres!!!";	
	}
?>