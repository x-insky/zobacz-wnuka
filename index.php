<?php

include 'funkcje.php';

//session_start();

$czas_teraz = time();

$serwer_lokalny = Czy_serwer_localhost(); // identyfikacja lokalnego lub zdalnego uruchamiania jako prosta detekcja DEV/PROD.. 
                                      //.. celem dołączania bibliotek/plików nieskompresowanych lub po kompresji
   
$adres_przekierowania = Czy_bylo_przekierowanie();      // wejście na witrynę z konkretnego odnośnika (wewn/zewn) lub z odsyłacza wyszukiwarki

$czy_ciastko_poprzedniej_wizyty = false;   // już wizytowana witryna niegdyś?
    if ( isset( $_COOKIE['zlobek_wizyta'] ) )  // weryfikacja istnienia zapisanego ciastka
    {
    $data_poprzedniej_wizyty = (int) $_COOKIE['zlobek_wizyta']; // też jakieś przekształcenie tu wstawić
        if ( ( $data_poprzedniej_wizyty > 0 ) && ( $data_poprzedniej_wizyty < $czas_teraz ) )
        { 
            //dopiero tu przekształcenie wartości z ciastka (lepiej też odszyfrować)
        $data_poprzedniej_wizyty += 10000000;
        $roznica_czasu_odwiedzin = $czas_teraz - $data_poprzedniej_wizyty;    
                    // 60 * 60 * 24 * 6.5 (6.5 dnia jako prawie pełny tydzień)
            if ( $roznica_czasu_odwiedzin > 60 ) // docelowo warunek na poprzednią wizytę zostanie wydłużony
            {
            $ile_dni_temu_odwiedzone = intval( $roznica_czasu_odwiedzin / ( 60 * 60 * 24 ) );
                // oblicznie różnicy czasu

            $czy_ciastko_poprzedniej_wizyty = true; // tu negacja wzorcowej logiki
            //$data_poprzedniej_wizyty = $_COOKIE['zlobek_wizyta'] + 
            $data_poprzedniej_wizyty_format = strftime( "%Y.%m.%d", $data_poprzedniej_wizyty );   // konwersja na "ludzki termin"  -- format standardowych parametrów zawsze kompatybilny 
            $godzina_poprzedniej_wizyty_format = strftime( "%H:%M", $data_poprzedniej_wizyty );   // konwersja na "ludzki czas"
            }
        }
    }

$laczna_ilosc_wizyt = 1;   
    if ( isset( $_COOKIE['zlobek_zliczacz'] ) )  
    {
    $laczna_ilosc_wizyt = (int) $_COOKIE['zlobek_zliczacz'];
        if ( $laczna_ilosc_wizyt < 0 ) $laczna_ilosc_wizyt = 0; // po prostu zerowanie stanu
    $laczna_ilosc_wizyt++;    
    }

setcookie('zlobek_wizyta', $czas_teraz - 10000000, $czas_teraz + 3600 * 24 * 365 * 2 );  // ustawianie ciastka -- tak, dwa lata ważności ;)
setcookie('zlobek_zliczacz', $laczna_ilosc_wizyt, $czas_teraz + 3600 * 24 * 365 * 2 );  // ustawianie ciastka -- zawsze z inkrementacją
?>


<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Witryna jest pełnoekranową przeglądarką zdjęć, które są częścią galerii umieszczonych w serwisie Żłobka Miejskiego Słoneczko w Chojnowie." />
    <title>Galeria ze Żłobka w Chojnowie<?php   if ( $serwer_lokalny ) echo " &ndash; " . $_SERVER['SERVER_NAME'] ?></title>
    
    <link rel="shortcut icon" href="./grafiki/slonce_ikona.png" />
    <link rel="stylesheet" href="reset.css">
    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet" />  <!-- czcionka Muli -->
    <?php
    // odczyt warunkowej minifikacji styli   
        if ( $serwer_lokalny ) echo '<link rel="stylesheet" href="zlobek-styl.css" />';
        else 
            if ( file_exists('zlobek-styl.min.css') ) echo '<link rel="stylesheet" href="zlobek-styl.min.css" />';
            else echo '<link rel="stylesheet" href="zlobek-styl.css" />';
    ?>
    
    <link rel="stylesheet" href="./lib/lightbox/css/lightbox.css" />

    <script src="./lib/html5shiv.3.7.3.js"></script>
    
    <?php
        if ( $serwer_lokalny ) echo '<script src="./lib/jquery-1.12.4.js"></script>';  // pobieranie pliku nieskompresowanego przez przeglądarkę
        else echo '<script src="//code.jquery.com/jquery-1.12.4.min.js"></script>';    // pobieranie pliku z serwera zewnętrznego w wariancie skompresowanym: *.MIN.js
    ?>

</head>

<body>

	<div class="glowny-kontener brak-js">

        <div class="kontener">
            <div id="odpluskwiacz_ajaksowy">
                <div>
                    <h4><span class="status-ajaksa" title="Aktualny stan komunikowania się z serwerem. UWAGA: ma wpływ na PRZYSZE żądania i odpowiedzi, sporadycznie reaguje na teraźniejszą komunikację!">Stan Komunikacji</span>
                        <button class="zepsuj" title="Tworzy błędy w zapytaniach serwera, które uniemożliwiają pobranie i wyświetlenie oczekiwanych treści. Blokuje to nawigowanie po zawartości (wymuszenie powstania błędu, jako symulacja jego ewentualnego wystąpienia).">Zepsuj</button> 
                        <button class="napraw" title="Wznawia prawidłową komunikację.">Napraw</button> 
                        <label for="awaria_na_stale" title="Zaznacz/odznacz to pole przed wybraniem [Zepsuj]/[Napraw], aby ustalić trwałą zmianę. Opcja zostanie zapamiętana także po odświeżeniu strony. Usuwanie decyzji przez odznaczenie pola i zatwierdzeniu przyciskiem akcji."> <input type="checkbox" name="awaria_na_stale" id="awaria_na_stale" style="transform: scale(1.5);"> Ustawić na stałe?</label>
                    </h4>
                    <div id="debugger_zamykanie" class="zamykanie" tabindex="0">&times;</div>
                </div>
            </div>
        </div>       

        <header class="naglowek">

            <div class="banner-kontener">

                <div class="logo-witryny"> 
                    <div id="slonce_logo" class="startowe-przesuniecie animacja-interaktywnego-slonca"></div>
                </div>

                <a href=".">
                    <div class="napisy-banner">
                        <h1 class="logo">Zobacz Wnuka!</h1>
                        <h2 class="logo">Galeria ze <span>Żłobka Słoneczko</span> w&nbsp;Chojnowie</h2>
                        <div class="clearfix2"></div>
                    </div>
                </a>

                <div id="zagraj">
                    <div class="zagraj-kontener">
                        <h4>Czekasz na załadowanie?</h4>
                        <h3>Zagraj w grę!</h3>
                        <p>&gt;</p>
                    </div>
                </div>

                <div class="napis-spod">
                    <h3>Serwis umożliwia łatwiejszy podgląd rozrabiających wnuków przez dziadków... i nie tylko. Treści pochodzą&nbsp;z&nbsp;witryny <a class="odnosnik_kolor" href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a></h3>
                </div>

            </div>	<!--  .banner-kontener  -->    
                
            <div id="spis_tresci">
                <div id="zaczytany_spis">
                    <?php
                        if ( $adres_przekierowania )   // tworzenie elementu z notyfikacją przekierownia !!!TRUE MA TU NIE BYĆ DOCELOWO!!!
                        {
                        echo '<div id="powiadamiacz_przekierowania" class="powiadamiacz" tabindex="0">';    
                        echo "<h3>Witamy w skromnych progach Internetowy Wędrowcze! Trafiłeś tu z adresu <span>{$adres_przekierowania}</span></h3>";
                        echo '<p>Bieżące powiadomienie zniknie samoistnie w przeciągu kilkunastu sekund, ale możesz je kliknąć by to przyspieszyć.</p>';    
                        echo '<div class="pasek"></div>';
                        echo '</div>';    
                        }
                    
                        if ( $czy_ciastko_poprzedniej_wizyty )  // tworzenie elementu z notyfikacją daty ostatnich odwiedzin (jakiś odległy termin)
                        {
                        echo '<div id="powiadamiacz_ciastka" class="powiadamiacz" tabindex="0">';    
                        echo "<h3>Witamy ponownie po <span>{$ile_dni_temu_odwiedzone}</span>. dniach (dniu) nieobecności";
                            if ( $laczna_ilosc_wizyt > 1 ) echo ", jako <span>{$laczna_ilosc_wizyt}</span>. odwiedziny.</h3>";
                            else echo "!</h3>";
                        echo "<h4>Dobrze pamiętamy, że w dniu <span>{$data_poprzedniej_wizyty_format}</span> konkretnie o godzinie <span>{$godzina_poprzedniej_wizyty_format}</span> ostatnio odwiedzono ten serwis.</h4>";
                        echo '<p>Bieżące powiadomienie zniknie samoistnie w przeciągu kilkunastu sekund, ale możesz je kliknąć by to przyspieszyć.</p>';    
                        echo '<div class="pasek"></div>';
                        echo '</div>';    
                        }
                    ?>
                    <h2>Lista galerii ze Żłobka</h2>
                    <div class="ciemne-tlo-spis">
                        <div class="kontener">
                            <div id="galeria_spis">
                            </div>
                        </div>    
                    </div>
                    
                    <div id="wczytywanie_spis">
                        <h2>Trwa wczytywanie... <img src="grafiki/slonce_60x60.png" alt="" /> <span></span></h2>
                    </div>
                    
                </div>
            
                
                <nav id="spis_sterowanie">
                    <div class="kontener">
                        <p id="status_galerii_spis"></p>
                    </div>
                    <h2 id="zaladuj_galerie_spis" class="przycisk clearfix2" tabindex="0">Załaduj kolejne galerie<img src="grafiki/slonce_60x60.png" alt="" /><span></span></h2>

                    <div class="kontener">
                        <div id="selektor">     
                            <h2 id="selektor_naglowek" tabindex="0">...lub wybierz dowolną galerię poniżej <span>rozwiń ▼</span></h2>
                            <div>
                                <form action="#" method="post" id="wybierz_galerie" autocomplete="off">
                                    <div id="wybor_galerii">
                                        <div id="suwak">
                                            <div>
                                                <label for="galeria_wybrany_nr">Wybrany numer galerii:</label>
                                                <input type="text" id="galeria_wybrany_nr" name="galeria_wybrany_nr" maxLength="4" />
                                            </div>
                                            <aside>
                                                <span class="lewy">nowsze</span> 
                                                <span class="prawy">starsze</span>    
                                            </aside>
                                            <div>
                                                <input type="range" min="1" selectionDirection="backward" id="suwak_galerii" name="suwak_galerii" title="Wybierz numer galerii z zakresu" />
                                            </div>
                                        </div>
                                        <div id="suwak_info">
                                            <div>
                                                <input type="button" id="wybrany_nr_zmniejsz" class="maly_guzik" value="-1" />
                                                <input type="button" id="wybrany_nr_zwieksz" class="maly_guzik" value="+1" />
                                            </div>
                                        </div>
                                        <div>
                                            <input type="button" id="losuj_zakres" name="losuj_zakres" class="szerszy_guzik" value="Losuj galerię" />
                                            <input type="submit" id="suwak_galerii_submit" name="suwak_galerii_submit" class="szerszy_guzik" role="submit" value="Zobacz wybrany" />
                                        </div>
                                    </div>  <!--  #wybor_galerii  -->  
                                </form>    
                                <form action="#" method="post" id="wybierz_podstrone" autocomplete="off">
                                    <div id="wybor_podstrony_galerii">
                                        <div id="suwak_podstrony">
                                            <div>
                                                <label for="podstrona_wybrany_nr">Numer podstrony listy galerii:</label>
                                                <input type="text" id="podstrona_wybrany_nr" name="podstrona_wybrany_nr" maxLength="4" />
                                            </div>
                                            <aside>
                                                <span class="lewy">nowsze</span> 
                                                <span class="prawy">starsze</span>    
                                            </aside>
                                            <div>
                                                <input type="range" min="1" selectionDirection="forward" id="suwak_podstrony" name="suwak_podstrony" title="Wybierz numer podstrony spośród całej listy galerii" />
                                            </div>
                                        </div>
                                        <div id="suwak_podstrona_info">
                                            <div>
                                                <input type="button" id="wybrany_nr_podstrony_zmniejsz" class="maly_guzik" value="-1" />
                                                <input type="button" id="wybrany_nr_podstrony_zwieksz" class="maly_guzik" value="+1" />
                                            </div>
                                        </div>
                                        <div>
                                            <input type="button" id="losuj_zakres_podstrony" class="szerszy_guzik" name="losuj_zakres_podstrony" value="Losuj podstronę" />
                                            <input type="submit" id="suwak_podstrony_submit" class="szerszy_guzik" name="suwak_podstrony_submit" role="submit" value="Zobacz wybrany" />
                                        </div>	
                                    </div>  <!--  #wybor_podstrony_galerii  --> 
                                </form>
                            </div>
                            
                        </div> <!-- #selektor  -->
                    </div>  <!--  .kontener  -->
                    
                    <div id="wybrany_zaczytany_spis">
                        <h2>Lista galerii z wybranej <span></span> podstrony</h2>
                        <div id="wczytywanie_wybrane_galerie_spis">
                            <h2>Trwa wczytywanie... <img src="grafiki/slonce_60x60.png" alt="" /> <span></span></h2>
                        </div>
                        <div class="ciemne-tlo-spis">                        
                            <div class="kontener">
                                <div id="wybrane_galerie_spis">
                                </div>
                                <div id="wybrane_galerie_zamykanie" class="zamykanie" tabindex="0" style="display: block;">&times;</div>
                            </div>
                        </div>
                        <div id="skladowisko_wybrane_galerie_spis">
                        </div>
                    </div>

                    <div id="skladowisko_status_wybranej_galerii">
                    </div>

                    <div id="status_wybranej_galerii">
                    </div>

                    <div id="galeria_spis_podmiana" class="clearfix">
                    </div>
                </nav>	
            </div>  <!--  #spis_tresci  -->

            <div id="brak_skryptow" style="">
                <div class="blad animacja-zolty-blysk">
                    <h2 class="blad-tytul">A niech to! Nie udało się pobrać zawartości z witryny Żłobka.</h2>
                    <div class="blad-tresc">
                        <div class="blad-ikona">!</div>
                        <p>Czyżby w Twojej przeglądarce brakowało włączonej obsługi skryptów?! Zweryfikuj to i włącz proszę JavaScript, aby załadować i wyświetlić tutaj nieco zawartości.<br />
                        Nie zapomnij na koniec odświeżyć stronę.</p>
                    </div>
                </div>
            </div>

        </header>

        
        <div id="glowna">

            <div id="nazwa_galerii">
                <div id="biezaca_galeria_zamykanie" class="zamykanie" tabindex="0">&times;</div>
                <div class="kontener">
                <h2></h2>
                <img />
                <p></p>
                </div>    
            </div>	

            <div id="wczytywanie_podstrona"><h2>Trwa wczytywanie...  <img src="grafiki/slonce_60x60.png" alt="" /> <span></span></h2>
            </div>
            
            <div class="jasne-tlo-galeria">
                <div class="kontener">
                    <div id="skladowisko"></div>
                </div>
            </div>
            
            <nav id="nawigacja_galeria">

            </nav>

            <div id="zawartosc_do_podmiany">
            </div>
            
        </div> <!--  #glowna  -->

        
        <div id="gra">
            <div id="zasady">
                <div id="gra_zamykanie" class="zamykanie" tabindex="0">&times;</div>
                <div class="kontener">    
                    <h2 class="zasada1"><input type="checkbox"> Pokoloruj duży obrazek poprzez ułożenie jego małych fragmentów we właściwych miejscach.</h2>
                    <h2 class="zasada2"><input type="checkbox"> Użyj myszy lub gładzika komputera, <br />bo małe ekrany dotykowe są &quot;be&quot; (póki co jest dramat)!</h2>
                    <p style="text-decoration: line-through;"><em>Podobne widowisko teatralne</em> jest z użyciem czegokolwiek na czymkolwiek do obsługi przeciągania, więc póki co zdobywanie punktów i budowanie rankingów jest odłożone w bliżej nieokreślone &quot;kiedyś&quot;.</p>   
                    <p style="text-decoration: line-through;">Rozgrywka jest na czas, spróbuj osiągnąć możliwie najlepszy wynik (...zakładając, że system nie oszukuje przy przydziale punktów, a Firefoks > v57 Ci w tym nie przeszkadza - ale to jest zupełnie przypadkowe, nie węszymy tu spisku).</p>
                    <p>Pierwszej planszy nie ukończył jeszcze Nikt z zadowalającym wynikiem (zapewne z racji wyśrubowanego warunku zakończenia).</p>
                </div>
            </div>
            <div id="sterowanie">
                <div class="kontener">
                    <button id="gra_start">Start/Od nowa</button> <button>Losuj planszę</button> <button>Pokaż podpowiedź</button> <button>Moje wyniki</button>                
                </div>
            </div>
            <div class="kontener">
                <div id="plansza" droppable="true" ondrop="" ondragover=""> <!-- '"ON"!? to je gupie' -->
                    <div id="rysunek">
                    </div>
                    <div id="prawy_zasobnik">
                    </div>
                    <div id="dolny_zasobnik">
                    </div>
                </div>
            </div>
        </div> <!--  #gra  -->
        
        
        <footer id="stopka">
            <div id="przyciski_stopka">
                <button id="poco_button">Ale po co? &darr;</button>
                <button id="pomoc_button">Pomoc &darr;</button>
                <button id="symulacja_button" class="animacja-pulsowanie-kolorow">Symul-A(JAX)-cja</button>
            </div>
            <h6>&copy;2018<?php echo "-" . date('Y'); ?> v0.6.6</h6>
            <div id="poco">
                <aside id="poco_zamykanie" class="zamykanie" tabindex="0">&times;</aside>
                <h2><em>Ale na co to komu?!</em> &ndash; sens projektu</h2>
                <div class="kontener">
                    <div>
                        <h3>Dla Hani</h3>
                        <p>Bo tak! Z mniejszą dedykacją dla Szymonka, Ninki i Ali też. Niech za jakiś czas maluchy zobaczą siebie, jak wyglądały kiedyś.</p>

                        <h3>Jaki jest cel?</h3>
                        <p>Ta strona odpowiada żywotnym potrzebom całego społeczeństwa. To jest witryna na skalę naszych możliwości. Ty wiesz, co my robimy tym serwisem? My otwieramy oczy niedowiarkom. Patrzcie, to nasze, przez nas wykonane i to nie jest nasze ostatnie słowo.</p>

                        <h3>Jeszcze raz po polskiemu</h3>
                        <p>Poniższa witryna ma za zadanie ułatwić korzytanie z materiałów zawartych w oryginalnym serwisie Żłobka Miejskiego w Chojnowie - <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a> .</p>

                        <h3>Wygoda i lepsza nawigacja</h3>
                        <p>Przede wszystkim wygoda, polepszenie skalowania zdjęć i ułatwienie nawigowania pomiędzy kolejnym obrazkami lub grupami miniatur, zorganizowanych w ramach danej galerii. </p>
                        <p>Zwiększona ergonomia nawigowania, zwłaszcza dotykowego na małych ekranach telefonów.</p>
                        <p>Zapewnienie intuicyjnej nawigacji po witrynie, bez cofania się po każdym zdjęciu oraz trudności w trafieniu odnośnika do kolejnej podstrony galerii (następnej grupy zdjęć).</p>

                        <h3>Pojedyncze pobieranie, dynamiczne tworzenie treści i zamienianie zdjęć</h3>
                        <p>Zastosowano rodzaj szablonu na treść, dzięki czemu przeglądarka www nie musi pobierać, przetwarzać i generować od nowa tej samej struktury strony z nowymi treściami do wyświetlenia.</p>
                        <p>Przeglądarka szybciej pobiera tylko oczekiwane treści, jako transferowane fragmenty z witryny źródłowej.</p>
                        <p>Brak ciągłego budowania, burzenia i odbudowaywania układu witryny, po każdorazowym wyświetleniu powiększonego zdjęcia.</p>
                        <p>Aktualizacja jako reakcja tylko dla zmian w konkretnych elementach witryny, bez niepotrzebego budowania od nowa tej samej struktury.</p>
                    </div>
                    <div>       
                        <h3>Superlatywy</h3>
                        <ul class="zalety">
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>łatwość przeglądania kolejnych zdjęć</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>skalowalny podgląd zdjęcia, dopasowany do wielkości ekranu</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>proste nawigowanie pomiędzy galeriami zdjęć</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>maksymalna kompatybilność ze starszymi przeglądarkami</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>transfer małych fragmentów do podmiany w wyświetlanym szablonie</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>wsparcie ekranów mobilnych - większe powierzchnie dotykowe interakcji</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>oszczędność czasu użytkownika</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>dynamika prezentowanych treści i większa interaktywność</span>
                            </li>
                            <li>
                                <img src="grafiki/slonce_plus_36x36.png" alt="zaleta" /><span>zużywa mniej <em>pakietów mobilnego internetu*</em></span>
                            </li>
                        </ul>

                        <h3>Inne cele</h3>
                        <p>Projekt realizowany w zupełności dla frajdy.</p>
                        <p>Nie jest to antyreklama pewnego sklepu komputerowego, w którego funkcjonującym serwisie można też naprawić niedomagania posiadanego sprzętu.</p>
                        <p>Próba zawarcia w aplikacji wielu udogodnień, a także niespotykanych rozwiązań w stosunku do <em>standardowej strony internetowej</em>.</p>
                        <p>Celowo nie zastosowano najnowszej składni i atrybutów dla aplikacji przeglądarkowej, by ta witryna mogła być użytkowana na największej możliwej liczbie urządzeń. Użyto maksymalnej zgodności z wcześniejszymi standardami, stopniowo ulepszając wrażenia użytkownika, jeśli jest to tylko możliwe.</p>  

                        <h3>Kontakt</h3>
                        <p>Uwagi, skargi, wnioski i propozycje funkcjonalności lub zaobserwowane błędy w działaniu serwisu można słać na poniższy adres email <a href="#" id="adres_email">nieodbieram@gdzieś.w.internecie.com</a></p>
                    </div>
                </div>
                <div class="kontener ramka">
                    <h3>Informacje i zastrzeżenia</h3>
                    <p>Wszelkie prawa do materiałów (treści tekstowych i zdjęć) należą do ich właścicieli, tj. instytucji Żłobka Miejskiego w Chojnowie - <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a> oraz serwisu e-informator - <a href="http://e-informator.pl/" target="_blank">e-informator.pl</a>.</p>
                </div>
            </div>
            <div id="pomoc">
                <aside id="pomoc_zamykanie" class="zamykanie" tabindex="0">&times;</aside>
                <h2>Pomoc &ndash; jak to działa</h2>
                <div class="kontener">
                    <div>            
                        <h3>To tylko przeglądarka</h3>
                        <p>Niniejszy serwis służy do łatwiejszego wyświetlania galerii z osobami skazanymi na pobyt w żłobku. Wymagane bezwzględnie jest istnienie i funkcjonowanie macierzystego serwisu www: <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a>.</p>
                        <h3>Podstrony</h3>
                        <p>Wygodne przeglądanie zdjęć w grupach, ograniczających nadmiarowe klikanie - funkcjonuje na raz dla maksymalnie <span class="przekreslony-tekst">osiemnastu</span> dziewięciu obrazków w danej galerii (założenia pierwotnej witryny żłobka). Serwis umożliwia łatwą nawigację pomiędzy kolejnymi obrazkami i ewentualnymi podstronami danej galerii (kolejnymi grupami obrazków). <br />
                        <em>Zobacz Wnuka</em> pozwala na przeglądania tylko zawartości tego Żłobka, nie wyświetlą się pokazy zdjęć z innych adresów.</p>
                        <h3>Pożegnanie <em>kopiuj-wklej</em></h3>
                        <p>Pierwotna funkcjonalność <em>Zobacz Wnuka</em> zmuszała do podania odnośnika do wskazanej galerii zdjęć z serwisu <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a>, by uruchomić pokaz zdjęć. Udoskonalono mechanizm automatycznego pozyskiwania tytułów galerii, by wyświetlić kolejno miniatury i przeglądać wskazane zdjęcia.</p>
                        <h3>Reklamy z hostingu? Panie, jakie reklamy?!</h3>
                        <p>Większość darmowych hostingów wstawia reklamy w treść witryny, nie zważając na wymiar reklamy w stosunku do szerokości ekranu, na którym jest wyświetlana. Może to spowodować dezorganizację wyglądu witryny, psuć ogólne wrażenia, a przede wszystkim mogą diametralnie zmieniać wygląd i zachowanie witryny na małych ekranach. Ciągle trwają prace, by niechciane treści nie pojawiały się w ogóle lub w niewielkich ilościach w nieagresywnej formie.</p>
                    </div>
                    <div>
                        <h3>Użyte technologie - co tutaj zawarto (oczywistości i nie~)</h3> 
                        <ul>
                            <li class="tech tech_tak">HTML5</li>
                            <li class="tech tech_tak">CSS3</li>
                            <li class="tech tech_tak">RWD&nbsp;+&nbsp;<em>mobile&nbsp;first</em></li>
                            <li class="tech tech_tak">Flexbox</li>                        
                            <li class="tech tech_tak">JavaScript (ES5.1)</li>
                            <li class="tech tech_tak">jQuery</li>
                            <li class="tech tech_tak">AJAX</li>
                            <li class="tech tech_tak">PHP</li>
                            <li class="tech tech_tak">SPA</li>                        
                            <li class="tech tech_tak"><em>progressive&nbsp;enhancement</em></li>                        
                            <li class="tech tech_tak">kompatybilność</li>
                            <li class="tech tech_tak">asynchroniczność</li>                              
                            <li class="tech tech_tak">bezpośrednia manipulacja DOM</li>
                            <li class="tech tech_tak">Web Storage (local)</li>  
                            <li class="tech tech_tak">komunikaty i obsługa błędów</li>
                            <li class="tech tech_tak">wbudowane testowanie</li>
                            <li class="tech tech_tak">blokady standardowych zdarzeń</li>
                            <li class="tech tech_tak">obsługa z klawiatury</li>
                        </ul>
                        <h3>Zgodność źródeł z konwencjami JS na poziomie 98,666667% &semi;P</h3> 
                        <ul>
                            <li class="tech">WielBłąd(&nbsp;),&nbsp;a&nbsp;camelCamel()</li>
                            <li class="tech">no(n)Tacja&nbsp;{...}</li>
                            <li class="tech">INDENT&rarr;acja&nbsp;{...}</li>
                            <li class="tech">luźny&nbsp;MVC</li>
                        </ul>
                        <h3>Czego tutaj nie ma</h3> 
                        <ul>
                            <li class="tech tech_nie">Angular</li>
                            <li class="tech tech_nie">React</li>
                            <li class="tech tech_nie">Web Components</li>
                            <li class="tech tech_nie">Bootstrap</li>
                            <li class="tech tech_nie">Foundation</li>
                            <li class="tech tech_nie">ES >= v6 || ES >= 2015</li>
                            <li class="tech tech_nie">promise / observable / async</li>                    
                            <li class="tech tech_nie">Node.js</li>
                            <li class="tech tech_nie">SASS / LESS / PostCSS</li>
                            <li class="tech tech_nie">CSS&nbsp;grid</li>
                            <li class="tech tech_nie">SVG</li>
                        </ul>
                        <h3>Zabawy z RWD</h3>
                        <p>Próby zachowania podobnego wyglądu dla prawie każdego z urządzeń, które potrafią wyświetlać zawartość w trybie graficznym. Element rozrywkowo-interaktywny dostępny póki co tylko dla ekranów niedotykowych i to w ograniczonym trybie funkcjonalności.</p>
                        <h3>Status projektu</h3>
                        <p>W zakresie głównej funkcjonalności na ukończeniu. Szlifowanie, testy i poprawki różnego kalibru jasno określają, że projekt jest nadal <em>nieukończony</em> (choć brakuje dosłownie kilku procent dla zamknięcia kilku kluczowych i kosmetycznych zagadnień - głównie kompatybilność i brak niespodziewanych udziwnień). Nadal rozszerzone informowanie dla potrzeb debugowania. W obszarze dodatkowym (gra), z uwagi na &quot;przeciągające się&quot; problemy z przeciąganiem - jeszcze daleko do statusu <em>ukończony</em>...</p>
                    </div>    
                </div> <!--  .kontener  -->
                <div class="kontener">
                    <h3>Wymagania programowe</h3>
                    <ul class="ramka">
                        <li class="tech tech_tak">Chrome 8+</li>
                        <li class="tech tech_tak">Firefox 3.6+</li>
                        <li class="tech tech_tak">Opera 11.5+</li>
                        <li class="tech tech_tak">Internet Explorer 9+</li>
                        <li class="tech tech_tak">Safari 5.1+</li>
                    </ul>
                    <p>W niższych wersjach przeglądarek prawdowodobnie aplikacja nie uruchomi się właściwie. Funkcjonowanie programu zależy od wsparcia JavaScriptu w poszczególnych wersjach przeglądarek. Uruchomienie może także powieść się. <br />
                    Wygląd witryny i efekty mogą się znacząco różnić pomiędzy wersjami przeglądarek, rzadziej samych przeglądarek (choć bardzo nieznacznie). Wrażenia wizualne i stopień spełnienia wymagań HTML5 oraz CSS3 przez przeglądarkę, często tożsamy w obsługiwanej wersji języka JavaScript. </p>
                    <p class="ramka wysrodkowane">Zalecamy korzystać z popularnych i aktualizowanych na bieżąco wersji przeglądarek, z uwagi na bezpieczeństwo użytkowania zasobów Internetu!</p>
                </div>
                <div class="kontener">
                <h3>DEBUG_MODE: Info o przeglądarce i serwerze</h3>
                <p>Poniżej zmienne środowiskowe, które zapewnia konkretny serwer oraz używana przeglądarka. Znaczne różnice dla starszych środowisk, zwłaszcza przeglądarkowych. Generalnie co nowsze to lepsze, gdyż zasobniejsze w wybrane parametry.</p>    
                <div class="ramka">

                    <?php
                                /* echo('<pre>') . var_dump( $_SERVER ) . echo('</pre>'); */    // listowanie całości zmiennych serwera
                    echo '<p>';
                    Wyswietl_zmienna_serwera( "PHP_SELF" );
                    Wyswietl_zmienna_serwera( "SCRIPT_FILENAME" );
                    Wyswietl_zmienna_serwera( "DOCUMENT_ROOT" );

                    Wyswietl_zmienna_serwera( "SERVER_NAME" );
                    Wyswietl_zmienna_serwera( 'SERVER_ADDR' );
                    Wyswietl_zmienna_serwera( 'SERVER_PORT' );
                    Wyswietl_zmienna_serwera( 'SERVER_PROTOCOL' );
                    
                    //Wyswietl_zmienna_serwera( $_SERVER['SERVER_PORT'] );
                    echo "<br />";
                    Wyswietl_zmienna_serwera( 'REMOTE_HOST' );
                    Wyswietl_zmienna_serwera( 'REMOTE_ADDR' );
                    Wyswietl_zmienna_serwera( 'REMOTE_PORT' );
                    Wyswietl_zmienna_serwera( 'HTTP_REFERER' );
                    Wyswietl_zmienna_serwera( 'HTTP_HOST' );
                    
                    Wyswietl_zmienna_serwera( 'REQUEST_URI' );
                    Wyswietl_zmienna_serwera( 'REQUEST_METHOD' );
                    Wyswietl_zmienna_serwera( 'REQUEST_TIME' );
                    Wyswietl_zmienna_serwera( 'HTTP_USER_AGENT' );
                    Wyswietl_zmienna_serwera( "REDIRECT_STATUS" );
                    echo '$_COOKIE[\'zlobek_wizyta\']: <strong>' . $_COOKIE['zlobek_wizyta'] . '</strong><br />';
                    echo '$data_poprzedniej_wizyty: <strong>' . $data_poprzedniej_wizyty . '</strong><br />';
                    echo '$data_poprzedniej_wizyty_format: <strong>' . $data_poprzedniej_wizyty_format . '</strong><br />';
                    echo '$czy_z_przekierowania: <strong>' . $czy_z_przekierowania . '</strong><br />';
                    echo 'vs obliczona pozycja powyższego: <strong>' . strpos( $_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'] ) . '</strong><br />';
                    echo '$roznica_czasu_odwiedzin: ' . ( $roznica_czasu_odwiedzin / ( 60 * 60 * 24 * 7 ) );
                    echo '</p>';
                        if ( isset( $_COOKIE ) )
                        {
                        echo '<hr />';
                        echo '<h5>Lista wszystkich danych, które są pamiętane w ciastkach przeglądarki (zawiera też dane z hostingu, wstawiane poprzez JS!)</h5>';
                        $tresc = '<p>';
                            foreach ( $_COOKIE as $klucz => $wartosc )
                            {
                            $tresc .= '$_COOKIE[\'<strong>' . $klucz . '</strong>\'] = <strong>' . $wartosc .'</strong><br />';
                            }
                        $tresc .= '</p>';
                        echo $tresc;
                        }
                    ?>

                </div>  <!--  .ramka  -->
                <h4>Powyższe wkrótce zniknie, gdy tylko zostanie osiągnięty kolejny etap testów.</h4>  
            </div> <!--  #pomoc  -->
        </footer>	

        <div id="wymiary">
            <h1>&nbsp;</h1>    
        </div>    
        
    </div>	<!--  .witryna   -->


    <script>
        window.jQuery || document.write('<script src="./lib/jquery-1.12.4.min.js"></script' + '>');
    </script>

    <script src="./lib/fittext/jquery.fittext.js"></script>	

    <script src="./lib/lightbox/js/lightbox.min.js"></script>

    <?php
        if ( $serwer_lokalny ) echo '<script src="./witryna.js"></script>';
        else 
            if ( file_exists('witryna.min.js') ) echo '<script src="./witryna.min.js"></script>';
            else echo '<script src="./witryna.js"></script>';
    ?>
    	
</body>
</html>
