<?php 

function Wyswietl_zmienna_serwera( $nazwa_zmiennej )    // przekazywany jest 'string' !!
{
/*$jako_tekst = (string) $nazwa_zmiennej;    
echo '<strong>'. $jako_tekst . '</strong>: ($) ' . $nazwa_zmiennej . ', ($$) ' . "${$nazwa_zmiennej}" . '<br />';*/
    
echo '$_SERVER[\'<strong>'. $nazwa_zmiennej . '</strong>\']: <strong>' . $_SERVER[$nazwa_zmiennej] . '</strong><br />';    
}