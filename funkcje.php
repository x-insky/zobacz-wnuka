<?php 

function Wyswietl_zmienna_serwera( $nazwa_zmiennej )    // przekazywany jest 'string' !!
{
/*$jako_tekst = (string) $nazwa_zmiennej;    
echo '<strong>'. $jako_tekst . '</strong>: ($) ' . $nazwa_zmiennej . ', ($$) ' . "${$nazwa_zmiennej}" . '<br />';*/
    
echo '$_SERVER[\'<strong>'. $nazwa_zmiennej . '</strong>\']: <strong>' . $_SERVER[$nazwa_zmiennej] . '</strong><br />';    
}

function Czy_serwer_localhost()
{
    if ( $_SERVER['SERVER_NAME'] == 'localhost' ) return true; 
return false;
}

function Czy_bylo_przekierowanie()
{
$czy_z_przekierowania = -1;
        // uwaga na parametry $_SERVER - nie wszystkie dostępne w środowiskach różnych (czytaj STARYCH) przeglądarek, np. REFERER
    if ( isset( $_SERVER['HTTP_REFERER'] ) && isset( $_SERVER['SERVER_NAME'] ) ) 
    {   
    $czy_z_przekierowania = strpos( $_SERVER['HTTP_REFERER'], $_SERVER['SERVER_NAME'] );   // czy z tego samego serwera czy z obcego adresu -- do tworzenia elementu html 
        if ( $czy_z_przekierowania === false ) // nie jako alternatywa > -1 
        {
        return $_SERVER['HTTP_REFERER'];
        }                   // jako, że nie jest zawarty ten adres tu

/*      if ( $czy_z_przekierowania >= 0 ) // STRPOS: false vs [0..inf+] !!! -- ten warunek jest ZBĘDNY - tylko dla testów
        {
        return 'DEBUG:TEST_BEZ_PRZEKIEROWANIA ' . $_SERVER['HTTP_REFERER'];
        }   // IF do usunięcia wkrótce
*/    
    }
    
        // usunąc poniższy warunek po fazach DEV !!!
    if ( $czy_z_przekierowania == -1 ) // ZBĘDNA WADLIWA LOGIKA TUTAJ - tylko dla testów czy coś się wcześniej podmieniło (celem wyświetlania jakiejś zawartości w powiadomieniu)
    {
    return 'DEBUG: TEST_BEZ_PRZEKIEROWANIA ' . $_SERVER['HTTP_REFERER'];
    }   // do usunięcia szybciej niż wkrótce, gdy tylko przejrzy się działające powiadomienia
    
return false;   // nie znaleziono przekierowania, albo brak zmiennych środowiskowych
}