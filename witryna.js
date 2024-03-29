// 'use strict'; 

    /*  !!! "Potential XSS vulnerability in jQuery (jquery-1.12.4.js)" - problem zgłoszony przez GitHub (Dependabot)/jQuery Community
       (+) zalecane: aktualizacja do v3.5.0
       (+/-) obejście: nadpisanie funkcji/metody o prawdopodobnie niebezpiecznych możliwościach pustą definicją
    */
jQuery.htmlPrefilter = function ( html )
{
	return html;    // nie rób nic (też nic z możliwych wcześniej niebezpiecznych działań), przerzuć wartości do dalszego wywołania łańcuchowego
};


$( document ).ready ( function ()
{
/* GARŚĆ TEORII i FAKTÓW:
 * ścieżka pełna do zdjęcia:
 * http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdj_XXXXX.jpg			// <-- adres zdjęcia, X to cyfra [0..9]
 * http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdjp_XXXXX.jpg 	// <-- adres miniatury zdjęcia ()
 * http://zlobek.chojnow.eu/u_tygryskow,a147.html; 			// przykładowa strona z galerią
 * http://zlobek.chojnow.eu/u_misiow,a20,p2.html						// przykładowa strona druga (2) galerii
 * http://zlobek.chojnow.eu/1-u_misiow,z1028,p2.html		// przykładowa strona druga (2) z powiększonym zdjęciem nr 1 ("1028" to nr zdjęcia w galerii)
 *
 */
var g_element_zewnetrzny = "#galeria_tresc",	// od 2022-11 kontenerem treści dynamicznych/docelowych jest <div> o id "galeria_tresc"; nie ma już <table> dla układu witryny
    g_adres_strony = "zlobek.chojnow.eu",		// nazwa serwisu
    g_folder_serwera = "zdjecia_galeria",      // ścieżka ma serwerze, tj. folder udostępniony
    g_wyszukiwany_serwer = "",		    // na przechowywanie adresu serwera wraz z protokołem
    g_protokol_www = "http://",
    g_matryca_nazwy_pliku = "zlobek_zdj_",
    g_matryca_nazwy_pliku_miniatury = "zlobek_zdjp_",
    g_rozszerzenie_obrazka = ".jpg",

    g_przechwytywacz_php = "./przechwytywacz.php",			// skrypt z fopen do zaczytania witryny przez stronę php. Wymaga serwera z PHP!
    g_przechwytywacz_php_ok = "./przechwytywacz.php",			// oczekiwana zawartość zmiennej jako prawidłowa
        
    g_przechwytywacz_php_zapytanie = "?url_zewn=",			// adres zmiennej GET, zawartość bez weryfikacji !!!
    g_przechwytywacz_php_zapytanie_ok = "?url_zewn=",			// oczekiwana zawartość zmiennej jako poprawna 
        
    g_tag_do_podmiany_zdjecia = "div#zawartosc_do_podmiany", // element DOM, do którego load() wstawi zawartość tagu <table.galeria> z witryny zewnętrznej
    g_miejsce_na_zdjecia = "div#skladowisko", // zamienić na coś sensowniejszego
    // g_wczytywanie_podstrona = "#wczytywanie_podstrona",
    // g_wczytywanie_spis = "#wczytywanie_spis",

    g_element_zewnetrzny_spis = "#galeria_tresc",   // g_element_zewnetrzny_spis = "td#tresc_glowna.tlo_artykulow",
    g_tag_do_podmiany_spis = "div#galeria_spis_podmiana",
    g_miejsce_na_spis = "div#galeria_spis",	

    g_ilosc_wszystkich_paginacji_galerii = 0,   // ile ogółem jest podstron ze spisem galerii, w grupach po pięć, poza ostatnią grupą 1..5 elementów
    g_zaczytana_ilosc_paginacji_galerii = 0,  // ile pozostało podstron poza zaczytaną i wyświetloną podstroną
    g_ilosc_zdjec_biezaca_galeria = 0            // ile zdjęć siedzi w bieżącej galerii
    g_ile_podstron_ma_ta_galeria = 0,          // obliczona wartość na podstawie odczytu pierwszego numeru zdjęcia z pierwszej podstrony wyświetlanej galerii 
    g_biezaca_pozycja_galerii = 0,         // które elementy już wyświetlono/zaczytano od ostatniego (jako pierwszego) w grupach po pięć
    g_ilosc_zaczytanych_galerii = 0,		// ile elementów wstawiono do tej pory na stronę
    g_ilosc_wszystkich_galerii = 0,        // ilość galerii zawartych na www
    g_suma_klikniec_zaladuj = 0,           // zliczanie kliknięć jako żądanie ładowania + auto_ładowanie
    g_suma_bledow_dolaczania = 0,          // ile razy nie udało się załadować i dodać treści do istniejącego zbioru wyświetlonych elementów

    g_wybrany_nr_galerii = 0,              // zapamiętanie co siedzi w polu od numeru galerii (pozycja suwaka)
    g_wybrany_nr_podstrony_galerii = 0,    // zapamiętanie co siedzi w polu od numeru podstrony galerii (też suwak)

    $g_input_nr_galerii = $('input#galeria_wybrany_nr'),
    $g_suwak_nr_galerii = $('input#suwak_galerii'),
    $g_input_nr_podstrony_galerii = $('input#podstrona_wybrany_nr'),
    $g_suwak_nr_podstrony_galerii = $('input#suwak_podstrony'),    
    g_niewyslane_podstrony = [],     // wszystkie żądania wyświetlenia ...vs lub tylko te do kolejnych podstron
    g_prezentacja_wczytywania = [],  // niejako kontener na stan wszystkich powiadomień o wczytywaniu
        
    g_tloSrc = '',
    g_ileCzesci = 0,
    g_nazwaPlanszy = '',
    g_nazwaPlanszySciezka = '',
    g_nazwaElementu = '',
    g_obrazki = [],
    g_przesuniecieTlaX = 0,  // korekta umieszczenia obrazka w tle
    g_przesuniecieTlaY = 0,  // korekta umieszczenia obrazka w tle
    g_ktoraGrafika = '',
    g_mojX = '',
    g_mojY = '';


// ---------- *** ----------  FUNKCJE PRAWIE GLOBALNE *** ---------- *** ----------

function WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane )
{
// debugger; 
    if ( element_witryny.length > 0 ) element_witryny = " " + element_witryny; // dodanie spacji na początku, separator dla TAGU po nazwie pliku

    if ( !dane ) dane = { ktoraPodstrona : 1, wybranyNrGalerii : 1 }; // aby nie było "TypeError" przy braku tego parametru w auto-wywołaniu bez kliknięcia podstrony (pierwsza podstrona)
        
    // $( g_miejsce_na_spis ).show( 100 ); // zawsze pokaż przestrzeń do załadowania dynamicznego gdyby ukryta (treść zewnętrzna lub błędy...)
    // var zawartoscUTF = unescape(encodeURIComponent( zawartoscOryginalna )); // kodowanie zaczytanych znaków?! // ... już załatwione w php
    
    switch ( rodzaj_dzialania ) {

        case "galeria_podstrona" :      // wyświetlenie dowolnej galerii (pierwsza strona albumu lub dowolna podstrona)
            try
            {
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {

                UkryjRamkeLadowania('podstrona');  // jawne ukrycie, niezależnie od wyniku + wywalenie tego z treści wewnętrznej GenerujPodstronyGalerii()
                    if ( status === "success" ) // ("success" / "notmodified" / "error" / "timeout" / "parsererror")
                    {
                        // logowanie sukcesu ;) -- do tego operacja nad obiektem 'dane', przekazano atrybut 'ktoraPodstrona' zawierający numer podstrony galerii do wyświetlenia
                    /* console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania '"
                                + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny
                                + "'. Docelowo ma być wyświetlona " + dane.ktoraPodstrona + ". podstrona galerii.");    */
                        if ( ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera ( odpowiedz ) )
                        {
                        // WYKONAJ DALSZE FUNKCJE, zależne od SUKCESU zaczytania lub nie
                        // kasuj poprzednią zawartość elementu???
                        NaprawBrakujaceSRCwKontenerze ( tag_podmieniany, true );
                        CzyscNiepotrzebneElementy();	
                        //GenerujPodstronyGalerii( element_witryny, dane.ktoraPodstrona );
                            if ( $('#nazwa_galerii').hasClass('szara-zawartosc') ) $('#nazwa_galerii').removeClass('szara-zawartosc');  // w przypadku wystąpienia błędu z pobraniem wybranej galerii - aby przywrócić żywe kolory tego kontenera 
                        GenerujPodstronyGalerii( tag_podmieniany, dane.ktoraPodstrona );
                        PokazBiezacaGalerie(); // wymuszone dodanie - PONOWNE pokazywanie aktualnej galerii (...gdyby była ukryta)   
                        DostawPrzyciskZamykaniaDoBiezacejGalerii(); // wstaw przycisk zamykania bieżącej galerii, gdy zaczytano treści danej podstrony galerii
                        PokazPrzyciskZamykaniaDlaBiezacejGalerii();
                        AktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii();
                        // $('#skladowisko a:first').focus();
                        $('#biezaca_galeria_zamykanie').focus();    // przeniesienie focusu po przewinięciu strony do bieżącej galerii, by być bliżej elementów, które właśnie zostały wyświetlone
                        }
                        else
                        {
                        GenerujDomyslnePowiadomienieOBledzieSerwera( xhr, status );
                        }
                    }
                    else    // każdy inny niż "success" stanowi "zły przebieg"
                    {
                        // logowanie porażki ładowania "PODSTRONA"
                    console.log( "NIE UDAŁO SIĘ załadować PODSTRONY - load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania '" 
                                + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny
                                + "'. Docelowo ma być wyświetlona " + dane.ktoraPodstrona + ". podstrona galerii.");

                    // to nie powinno się generalnie wywoływać, lepiej odwołać się do obsługi błędu w CATCH
                    var nrGalerii = parseInt( adres_zasobu.substr( adres_zasobu.lastIndexOf(",a") + 2 ) ),
                        nrPodstronyGalerii = dane.ktoraPodstrona;
                        // nrGalerii = adres_zasobu
                    var komunikatOBledzie = "Nie udało się załadować wskazanej podstrony nr <strong>" + nrPodstronyGalerii + "</strong> dla galerii o numerze <strong>" + nrGalerii + "</strong>. Spróbuj ponownie.<br />Diagnostyka: kod błędu nr " + xhr.status + " (" + xhr.statusText.toLowerCase() + ") o statusie \"" + status + "\".";    
                    GenerujPowiadomienieOBledzie({ tytul : 'Problem z załadowaniem galerii #' + nrGalerii +'!', tresc : komunikatOBledzie });    // działa lepeij niż wcześniejszy standard
                    PrzewinEkranDoElementu('div.blad', 500);
                        // odblokowywananie przycisku WSTECZ/DALEJ, tylko konkretny jeden przycisk z możliwych dwóch nieaktywnych 
                    OdblokujPrzycisk( 'nav#nawigacja_galeria h6 button.przycisk_galeria[value="' + dane.ktoraPodstrona + '"]' );    // potrzebna weryfikacja tego co w VALUE siedzi, ID, KLASA ani KROTNOŚC nie określa wprost elementu  
                        // odblokowywanie przycisku z bezpośrednim numerem galerii (o ile jest na stronie)
                    OdblokujPrzycisk( '#galeria_paginacja_' + dane.ktoraPodstrona );    // łatwiej operować na konkretnym ID, jeśli najpierw prawidłowo tę paginację się wygenerowało (pasujące ID do przycisku) lub w oparciu o atr. VALUE 
                    }
                    if ( status === "complete" )    // test, ale tego stanu nie powinno być nigdy
                    {
                    alert('Test zakończenia żądania - galeria podstrona');  // "czekajcie... a może kiedyś zobaczycie ten alert"
                    }
                
                }); //load-END
            } //try-END

            catch (err2)
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z załadowaniem podstrony galerii! Spróbuj ponownie. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")";
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
            PrzewinEkranDoElementu('p.blad', 500);
            }

            break;

        case "spis_galerii" :       // dodawanie do listy spisu treści - kolejne +1..5 podstron spisu treści
            // tylko tu dodanie żądania GET do tablicy -- STANDARDOWO BRAK MOŻLIWOŚCI PONOWIENIA TEGO ŻĄDANIA -- dlatego rozszerzona obsługa błędów
                if ( !dane.trybPowtorki )   // dodawanie TYLKO nowych zadań, aby nie wprowadzać powtórnych żądań (ciągle pozostaną na liście)
                {
                g_niewyslane_podstrony.push({ adresPelny : g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny,
                                                adresZasobu : adres_zasobu,
                                                elementWitryny : element_witryny,
                                                tag : tag_podmieniany });
                // console.info( g_niewyslane_podstrony ); // taka stopklatka do przeglądu (brak dostępu z zewnatrz do zmiennej)
                }

            try
            {
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                
                UkryjRamkeLadowania('spis');    // jawne wymuszenie ukrycia powiadomienia o wczytywania aktualnego "spisu treści", niezależnie czy się elementy wczytały, czy wystapił błąd
                    if ( status === "success" )
                    {
                        if ( ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera ( odpowiedz ) )
                        {
                            // logowanie sukcesu ;)
                        // console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");

                    // ... // przetwarzanie spisu treści
                        NaprawBrakujaceSRCwKontenerze( tag_podmieniany );
                        CzyscNiepotrzebneElementy();	    
                        GenerujSpisGalerii();
                        UsunPobraneZadanie( adres_zasobu );   // wyrzucenie rekordu z tablicy żądań -- już przetworzono dany odnośnik (!?...ewentualny wpływ asynchroniczności...!?)
                            if ( dane.trybPowtorki ) // if (magicznyParametr)... czy zachowana poprawnośc zliczania odebranych/przetworzonych   
                            {
                            g_suma_bledow_dolaczania--; // dekrementacja wywołanych błędów
                            // i tu modyfikacja wyświetlanych komunikatów lub ich ukrywanie ... 
                                // ... wymaga uglobalnienia zmiennych z treścią wyswietlanych komunikatów lub powtarzanie się z generowniem zmiany komunikatu :/
                            UsunKomunikatLubZmienNumeracjeWTresci ( '.blad-dolaczenia' );  // tylko element, numeracja będzie odnaleziona
                            // AktualizujLubUkryjKomunikat( elementKomunikatu, krotnoscBledu ); // + tytul, tresc; ale to funkcja ma odszukać ostatni nr niepobrany i go zmienić
                            OdblokujPrzycisk( '#przywroc_niewczytane' );   // hardkod... lub to wstawić w tę funkcję powyżej
                            } 
                        }
                        else
                        {
                // z racji dodawanych treści i jednorazowych zapytań wymagane jest zachowanie "nieudanych naciśnięć", jeżeli gdzieś po drodze wystąpiło coś nie tak z odpowiedzią z serwera
                // + umożliwienie ponownego wywołania każdego z niewykonanych zapytań w komunikacie o błędzie -- jak w błędnej z założenia ścieżce
                        GenerujDomyslnePowiadomienieOBledzieSerwera( xhr, status );
                        
                            // ... ?
                        }
                    }
                    else
                    {
                        // logowanie porażki ładowania "SPIS_GALERII"
                    console.log( "NIE UDAŁO SIĘ załadować SPISU_GALERII - load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");

                        // różnicowanie błędu względem pierwszego przebiegu (wystarczy maksymalnie jeden AND z kolejnych) lub odwołać się do ilości błędów (może wprowadzić chaos przy kasowaniu błędów!!!)
                        if ( ( g_ilosc_wszystkich_paginacji_galerii == 0 ) && ( g_zaczytana_ilosc_paginacji_galerii == 0 ) && ( g_biezaca_pozycja_galerii == 0 ) && ( g_ilosc_zaczytanych_galerii == 0 ) )
                        {       // prawdopodobnie ten błąd się juz nie wywoła, bo brak lub błędna zzawartość źródłowa wcześniej wywoła inny; dla pewności to samo działanie
                        GenerujPowiadomienieOBledzie({ tytul : 'Problem z odczytem zawartości zdalnej!', tresc : 'Wystąpił problem z odczytaniem zawartości zdalnej! Brak możliwości nawigacja po witrynie - konieczność przeładowania zawartości witryny.<br />Spróbuj za chwilę &ndash; naciśnij poniższy przycisk.', przyciskAkcjiOdswiez : true, ikonaZamykania : false });    

                        }
                        else    // kolejny błąd - zliczanie i wyświetlonie zmian dla kolejnych błędów transferu przy dołączaniu
                        {
                            // zamiast odczytywać stan z witryny lepiej operować na wewnętrznych zmiennych lub odczytywać przy każdym żądaniu
                        /* var ileRazyBlad = $('.blad-dolaczenia span').text();
                            if ( ileRazyBlad == "" ) ileRazyBlad = 0;
                        ileRazyBlad = parseInt( ileRazyBlad ) + 1; */
                        var nrPodstronyNiewczytanejGalerii = parseInt( adres_zasobu.substr( adres_zasobu.lastIndexOf(",p") + 2 ) );
                            
                        g_suma_bledow_dolaczania++ ;     // zwiększenie licznika przy błędzie
                        console.info('Błąd niepobrania podstrony spisu treści po raz ' + g_suma_bledow_dolaczania + ' dla ' + nrPodstronyNiewczytanejGalerii
                                     + '. niewczytanej podstrony.' );
                        var komunikatOBledzieOld = "Problem z dołączeniem kolejnego spisu galerii po raz <span>" + g_suma_bledow_dolaczania + 
                            "</span>! (STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + "))";
                        var komunikatOBledzie = "Wystąpił problem z dołączeniem kolejnego spisu galerii po raz <strong><span>" + g_suma_bledow_dolaczania 
                                + "</span></strong>! Ostatni błąd to odczyt podstrony o numerze <strong><span>" + nrPodstronyNiewczytanejGalerii
                                + "</span></strong>. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + "). Naciśnij poniższy przycisk, aby ponowić próbę załadowania.";
                        var tytulBledu = "Błąd w pobieraniu kolejnych elementów";

                            if ( g_suma_bledow_dolaczania > 1 )  // zmień istniejący element komunikatu
                            {
                            tytulBledu += ' x' + g_suma_bledow_dolaczania; // warunkowo dopisywana treść
                                // po prostu zmieniać istniejący komunikat o błędzie - inkrementacja wystąpień
                             ZmienTrescKomunikatu( '.blad-dolaczenia', tytulBledu, komunikatOBledzie );
                                // rozbicie powyższego na dwa/trzy, aby zabrać i nadać tę samą klasę dla ponownego wyświetlenia animacji (.end() nie daje rady w jednym łańcuchu)
                            }
                            else // pierwsze generowanie komunikatu do sumowania niewyświetlonych podstron
                            {
                                // generowanie pierwszego ulepszonego powiadomienia - tworzenie jego pierwszej instancji
                            GenerujPowiadomienieOBledzie({ tytul : tytulBledu, tresc : komunikatOBledzie, ikonaZamykania : false,
                                                          dodatkowaKlasa : "blad-dolaczenia", przyciskAkcjiDolacz : true });
                            console.log('Generuję błąd dołączania po raz ' + g_suma_bledow_dolaczania + '. dla ' + nrPodstronyNiewczytanejGalerii
                                        + '. niewczytanej podstrony spisu teści: ' + komunikatOBledzie );
                            }
                        $('.blad-dolaczenia').removeClass('animacja-zolty-blysk').height(); // usunięcie i bzdurny odczyt z DOM...
                        $('.blad-dolaczenia').addClass('animacja-zolty-blysk');  // aby zmienić stan animacji -- od nowa
                        PrzewinEkranDoElementu('.blad-dolaczenia', 500);    // przewijanie już do nowego (później dodanego) komunikatu
                        }   // if-END ( g_ilosc_wszystkich_paginacji_galerii == 0 ) && ...
                    }   // if-END ( status === "success" )

                }); // load-END
            } // try-END

            catch (err2)
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z dołączeniem kolejnego spisu galerii! STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")";
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
            PrzewinEkranDoElementu('p.blad', 500);
            }

         break;

        case "wybrana_galeria_rekurencja" :     // wyświetlenie wybranej galerii, 1-szy etap (jej pierwsza podstrona)

            try
            {
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                    if ( status === "success" )
                    {
                        if ( ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera ( odpowiedz ) )
                        {
                        UsunBrakujaceSRCwIMGPozaPrzekazanym ( tag_podmieniany, dane.pozycjaWGalerii );
                        // console.log("Ładowanie przed rekurencją (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");

                            if ( $('#nazwa_galerii').hasClass('szara-zawartosc') ) $('#nazwa_galerii').removeClass('szara-zawartosc');

                        var namiaryWybranejGalerii = OdczytajTresciOdnosnikaWybranejGalerii ( tag_podmieniany, dane.pozycjaWGalerii );

                        PokazBiezacaGalerie();  // dodanie wyświetlnia bieżącej galerii, gdyby została uprzednio ukryta ukryta
                        UzupełnijNaglowekBiezacejGalerii ( namiaryWybranejGalerii );

                            // poniżej wywołanie ponownego ładowania po określeniu adresu docelowej galerii
                            // to samo miejsce docelowe, tam samo dołączane elementy zaczytane -- nadpisywanie już niepotrzebnej zawartości
                            // $.extend( dane, namiaryWybranejGalerii ); // dodać tę formę?!

                        WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, namiaryWybranejGalerii.adres, element_witryny, "wybrana_galeria", dane );

                            // zmienić parametry wywołania dla rekurencji !!!
                            // WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane );
                        }
                        else
                        {
                            // bardziej szczegółowe logowanie błędu + oficjalna treść w przeglądarce 
                        console.log("Ładowanie przed rekurencją NIE UDAŁO SIĘ (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
                        GenerujDomyslnePowiadomienieOBledzieSerwera( xhr, status );
                        }
                    }
                    else    // cokolwiek, głównie "error"
                    {
                    UkryjRamkeLadowania('podstrona');      // tu schowania powiadomienia, skoro błąd przerwał docelowe pobieranie treści dla danej galerii
                    var nrPodstronySpisuGalerii = parseInt( adres_zasobu.substr( adres_zasobu.lastIndexOf(",p") + 2 ) );  // określona podstrona jako parametr
                    var komunikatOBledzie = "Problem z ładowaniem w tle dla generowania wybranej galerii! Nie udało się określić wstępnej lokalizacji - błąd ładowania podstrony nr <strong>"
                                            + nrPodstronySpisuGalerii + "</strong>.<br />STATUS: \"" + status + "\", XHR: " + xhr.status + " - " + xhr.statusText;    
                    //GenerujPowiadomienieOBledzie({ tytul : 'Błąd pobierania wybranej #' + nrPodstronySpisuGalerii + ' strony galerii - wstępny etap!', tresc : komunikatOBledzie });
                    GenerujPowiadomienieOBledzie({ tytul: 'Błąd pobierania wybranej #' + dane.wybranyNrGalerii + ' galerii - wstępny etap!', tresc: komunikatOBledzie });
                    PrzewinEkranDoElementu('.blad', 500);
                    OdblokujPrzycisk ( '#suwak_galerii_submit' );   // warunkowo zezwól na kolejną próbę, gdyby się pojawił błąd w komunikacji w trakcie
                    }

                }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z ładowaniem w tle dla generowania wybranej galerii! STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")";
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
            PrzewinEkranDoElementu('p.blad', 500);
            }
                    // ...		
            break;

        case "wybrana_galeria" :        // wyświetlenie wybranej galerii, 2-gi etap (jej pierwsza podstrona)

            try 
            {	  // tu "adres_zasobu" już OBECNY jako ścieżka bezwzględna -- ODMIENNA składnia dla zapytania
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                
                UkryjRamkeLadowania('podstrona');
                OdblokujPrzycisk ( '#suwak_galerii_submit' );    // zezwól na ponowną akcję, zawsze wywoływane niezależnie od powodzenia bieżącej obsługi

                    if ( status === "success" )
                    {
                        if ( ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera ( odpowiedz ) )
                        {
                        // console.log( "Pierwsze ładowanie podwójnie zapętlone (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");

                        //UsunBrakujaceSRCwKontenerze ( element_witryny );  // ponowne kasowanie, teraz wszystkie bez wyjątku wylatują elementy

                        // $('#wczytywanie_podstrona').hide(100);	
                        // UkryjRamkeLadowania('podstrona');   // dopiero teraz powinno być usunięcie animacji ładowania - ale wewnątrz GenerujPodstronyGalerii() jest takowe
                        $('#skladowisko').empty();  // zerowanie ewentualnej zawartości w tym kontenerze    
                        $('#skladowisko').show(100);    
                        //$('#skladowisko').show( 100, PrzewinEkranDoElementu( 'div#skladowisko', 200, -8 )  );	// pokaż kontener na zaczytaną zawartość +
                                                        // + przewiń po wyświetleniu całości    

                        // $('#skladowisko').html('<h1>Tu wkrótce pojawią się elementy - pierwsza podstrona zdjęć z wybranej galerii nr ' + dane.pozycjaWGalerii +
                        //                        '</h1><p>Adres docelowej galerii: ' + adres_zasobu + '</p>' );    

                        NaprawBrakujaceSRCwKontenerze ( '#skladowisko_status_wybranej_galerii', 'przetwarzaj galerię, nie spis treści' ); // taki teścik
                        GenerujPodstronyGalerii ( '#skladowisko_status_wybranej_galerii' );
                        DostawPrzyciskZamykaniaDoBiezacejGalerii();  // dodatkowa akcja, wstawi 'X" dla nagłówka bieżącej galerii, dla już wyświetlonego kompnentu
                        PokazPrzyciskZamykaniaDlaBiezacejGalerii();
                        AktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii();
                        $('#biezaca_galeria_zamykanie').focus();    // przeniesienie focusu po przewinięciu strony do bieżącej galerii, by być bliżej elementów, które się właśnie pojawiły
                        }
                        else
                        {
                            // bardziej szczegółowe logowanie błędu + oficjalna treść błędu w przeglądarce 
                        console.log( "Pierwsze ładowanie podwójnie zapętlone NIE UDAŁO SIĘ (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");
                        GenerujDomyslnePowiadomienieOBledzieSerwera( xhr, status );
                        }    
                    }
                    else    // 'NIE-succes', czyli cokolwiek - głównie "error"
                    {
                    var nrGalerii = parseInt( adres_zasobu.substr( adres_zasobu.lastIndexOf(",a") + 2 ) );  // która galeria miała być wyswietlona 
                    var komunikatOBledzie = "Problem z załadowaniem wybranej galerii o numerze <strong>" + nrGalerii + "</strong>! Nie udało się pobrać docelowej lokalizacji.<br />STATUS: \"" + status + "\", XHR: " + xhr.status + " - " + xhr.statusText;    
                    GenerujPowiadomienieOBledzie({ tytul : 'Błąd pobierania wybranej galerii #<strong>' + nrGalerii + '</strong> - drugi etap!', tresc : komunikatOBledzie });

                    PrzewinEkranDoElementu('.blad', 500);
                    }

                }); // load-END
            } // try-END

            catch (err2)
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z pobraniem wybranej galerii! Ponów próbę. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")";
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
            PrzewinEkranDoElementu('p.blad', 500);     
            alert(komunikatOBledzie);   // tu wyjatkowo zostaje komunikat w formie okna... o ile się kiedyś pokaże ;)
            }

                // ...
            break;

        case "wybrany_spis_galerii" :       // wyświetlenie wskazanego spisu treści z ustalonwgo zakresu

            try 
            {	  // tu "adres_zasobu" już jako ścieżka bezwzględna
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
            
                UkryjRamkeLadowania('wybrane_galerie_spis');    // jak poprzedni - jawne wywołanie dla dodolnego ze stanówi i zabranie tef funkcjonalności z Generuj...()
                OdblokujPrzycisk ( '#suwak_podstrony_submit' );    // zezwól na ponowną akcję, niezależnie od powodzenia bieżącej obsługi - zawsze zostaje to wywołane
                PokazPrzyciskZamykaniaDlaWybranejPodstronyListyGalerii();

                    if ( status === "success" )
                    {	
                        if ( ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera ( odpowiedz ) )
                        {    
                            // dane.wybranaPaginacja
                        // console.log( "Ładowanie (" + rodzaj_dzialania + ") dla wybranego " + dane.wybranaPaginacja + " elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");
                        //PrzewinEkranDoElementu('div#wybrany_zaczytany_spis', 500, -200);
                        $('div#wybrane_galerie_spis').removeClass('szara-zawartosc');
                        // Generuj spis wybranej galerii (podstrony spisu treści)
                        //$('div#wybrany_zaczytany_spis').show();    
                        // $('div#wczytywanie_wybrane_galerie_spis').hide(100);
                        NaprawBrakujaceSRCwKontenerze( 'div#skladowisko_wybrane_galerie_spis');

                        GenerujSpisWybranejGalerii( 'div#skladowisko_wybrane_galerie_spis', 'div#wybrane_galerie_spis', dane.wybranaPaginacja );
                            // zaczytanie wybranego spisu poniżej już istniejącego spisu
                        }
                        else
                        {
                            // bardziej szczegółowy opis w konsoli, reszta w ramce witryny
                        console.log( "NIE UDAŁO SIĘ ładowanie (" + rodzaj_dzialania + ") dla wybranego " + dane.wybranaPaginacja + " elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");
                        GenerujDomyslnePowiadomienieOBledzieSerwera( xhr, status );
                        }
                    }
                    else    // cokolwiek, głownie "error"
                    {
                    var nrPodstronySpisuGalerii = parseInt( adres_zasobu.substr( adres_zasobu.lastIndexOf(",p") + 2 ) );  // określona podstrona spisu treści jako parametr
                    var komunikatOBledzie = "Problem z załadowaniem grupy galerii, wskazanej podstrony o numerze <strong>" + nrPodstronySpisuGalerii + "</strong>! Ponów próbę.<br />STATUS: \"" + status + "\", XHR: " + xhr.status + " - " + xhr.statusText;    
                    GenerujPowiadomienieOBledzie({ tytul : 'Błąd pobierania wybranej #<strong>' + nrPodstronySpisuGalerii + '</strong> grupy galerii!', tresc : komunikatOBledzie });

                    PrzewinEkranDoElementu('.blad', 500);
                    }

                }); // load-END
            } // try-END

            catch (err2)
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nNie można dołączyć wybranej podstrony do spisu galerii! Powtórz działanie. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
            PrzewinEkranDoElementu('p.blad', 500);     
            alert(komunikatOBledzie);   // tu wyjatkowo zostaje komunikat w formie okna
            }

            break;


        default:
                // gdyby się nie udało dowolne żądanie to wystawić domyślny komunikat o błędzie (raczej niewykonalne, bo błędy żądań mają swoje powiadomienia) 
            var komunikatOBledzie = 'Wystąpił ogólny problem z żądaniem! Logowanie parametrów żądania - tag: "' + tag_podmieniany + '", domena: "' + adres_domeny + '", zasób: "' + adres_zasobu + '", elem: "' + element_witryny + '", działanie: "' +  rodzaj_dzialania + '... COŚ POSZŁO NIE TAK.' ;
            GenerujPowiadomienieOBledzie({ tytul : 'Błąd pobierania grupy galerii!', tresc : komunikatOBledzie });
            PrzewinEkranDoElementu('.blad', 500);

    } //switch-rodzaj_dzialania-END


    function CzyscNiepotrzebneElementy ()   // zdefiniowano wewnątrz funkcji, w której jest tylko używana/wywoływana
    {
        /* błędy zgłaszane w konsoli dla pobierania niepotrzebnych plików - grafiki:
                        <img src="zdjecia/zlobek.gif" border="0" align="center">
                        <img src="zdjecia/zlobek.jpg" border="0">
                        <img src="zdjecia/zlobek_90_2.jpg" alt="(szerokość: 150 / wysokość: 92)">
                        <img src="zdjecia/zlobek_90_132.jpg" alt="(szerokość: 190 / wysokość: 190)">
        + odwołania do plików zewnętrznych witryny macierzystej;
                        <SCRIPT src='js/cookie.js' type='text/javascript'></SCRIPT>
                        <LINK href='style/stylglowny.css' rel='stylesheet' type='text/css' />
        */	
        var $pierwszyObrazek = $('img[src*="zdjecia/zlobek.gif"]');
            if ( $pierwszyObrazek.length === 1 )
            {
            console.info('usuwanie pliku grafiki dla "zdjecia/zlobek.gif"');
            $pierwszyObrazek.remove();
            }
            //$('img[src*="zdjecia/zlobek.jpg"]').remove();
            //
    };

} // WczytajZewnetrznyHTMLdoTAGU-END


function GenerujPodstronyGalerii ( kontenerZrodlowy, nrWyswietlanejGalerii ) 
{ 	     // poniżej wartości domyślne dla parametrów ES5
nrWyswietlanejGalerii = parseInt( nrWyswietlanejGalerii );    
    if ( ( !kontenerZrodlowy ) || ( kontenerZrodlowy == '') ) kontenerZrodlowy = '#zawartosc_do_podmiany';
    if ( ( nrWyswietlanejGalerii == undefined ) || ( isNaN( nrWyswietlanejGalerii) ) || ( nrWyswietlanejGalerii < 1 ) ) nrWyswietlanejGalerii = 1;  // uzwględniono chyba wszystkie nieprawidłowe warunki liczbowe 

var kontenerDocelowyElement = "div#skladowisko",
    $kontenerDocelowy = $( kontenerDocelowyElement ),
    ileLinkowDoPodstron = 0;

var przyciskPoprzedni = {
        nrPodstrony : 0,        // początkowe wartości dla wskazania numeru wcześniejszego i kolejnego odsyłacza względem danego
        trescPrzycisku : '',    // treść danego przycisku
        adresUrl : '',               // adres zasobu na serwerze zewnętrznym (jako względna ścieżka wewnątrz serwera)
        aktywny : false         // czy operatywny, czy przycisk jest aktywny?
    },   
    przyciskNastepny = {
        nrPodstrony : 0,
        trescPrzycisku : '',
        adresUrl : '',
        aktywny : false
    };

var przyciskiDoWstawienia = [];

$('nav#nawigacja_galeria').empty().show( 100 );     // czyszczenie kontenera na nawigację galerii, NIEZALEŻNIE czy wcześniej zawierał zawartość + jego pokazanie (gdy pierwsze wyświetlenie pierwszej podstrony)
// $kontenerDocelowy.show( 100, PrzewinEkranDoElementu( kontenerDocelowyElement, 200, -8 - (wysokoscDivWczytywanie + wysokoscDivKomentarz) )  );	// pokaż kontener na zaczytaną zawartość + przewiń po wyświetleniu całości
$kontenerDocelowy.show( 100 );	// pokaż kontener na zaczytaną zawartość ... + przewiń po wyświetleniu całości?

//przeszukiwanie odnośników dla miniatur w galerii; link z miniatury prowadziŁ do normalnej (większej) kopii obrazka (aktualne do 2022.11; teraz MINIATURA == OBRAZEK)
var $odnosnikiMiniatur  = $( kontenerZrodlowy + ' .card > a' ); // skoro powinny zawsze być znalezione [1..maks_grupa_zdjęć_w_podstronie], to nie weryfikuję dalej 

// logowanie sukcesu: znelezione miniatury dla bieącej podstrony 
console.log('Znaleziono na podstronie ' + $odnosnikiMiniatur.length + ' miniatur - dla zmiennej \'' + g_tag_do_podmiany_zdjecia + '\'' );

        // zweryfikować obliczenie bieżącej galerii we wcześniejszej pętli ...
    
$( g_miejsce_na_zdjecia ).empty(); // czyszczenie bieżącej podstrony, dla wyświetlenie nowej galerii 
$( g_miejsce_na_zdjecia ).append('<h2>Zdjęcia z bieżącej <span>' + nrWyswietlanejGalerii  + '.</span> podstrony galerii</h2>');  // dopisanie nagłówka dla bieżącej galerii - z PARAMETRU WYWOŁANIA, a nie obliczonego na podstawie przebiegu
    
    $odnosnikiMiniatur.each( function( i, biezacyOdnosnik) {

    var $biezacyOdnosnik = $(biezacyOdnosnik); // this == biezacyOdnosnik
    var biezacyOdnosnikHREF = $biezacyOdnosnik.attr('href');
    var $obrazekWOdnosniku = $biezacyOdnosnik.find('img');

        // podobnie określany numer, jako konwersja wybranego wycinka z części odnośnika
        // tu końcówka napisu z numerem podstrony już do niczego niepotrzebna
    var numerZdjecia = OdczytajZOdnosnikaNumerZdjeciaWGalerii( biezacyOdnosnikHREF );
    var odnosnikNrZdjeciaGlobalne = OdczytajZOdnosnikaGlobalnyNumerZdjecia( biezacyOdnosnikHREF );
    
        if ( ( nrWyswietlanejGalerii == 1 ) && ( i == 0) )  // jeśli to pierwsza (tytułowa) podstrona i pierwszy znaleziony element to zawiera on liczbę 
        {
            g_ilosc_zdjec_biezaca_galeria = numerZdjecia;   // przypisz całościową liczbę obrazków w galerii
            g_ile_podstron_ma_ta_galeria = MaksymalnaIloscPodstronDlaWyswietlanejGalerii( numerZdjecia ); // uczynić globalną? TAK (wstępnie wartość na potrzeby funkcji, ale przy innej podstronie niż pierwsza wartość "ginie"
        }

    var serwerowyOpisObrazkaALT = ( $obrazekWOdnosniku.attr('alt') || ( ( numerZdjecia ).toString() + " z " + ( g_ilosc_zdjec_biezaca_galeria ).toString() ) );// pozyskanie atrybutu ALT ze źródła (o ile istnieje, to dostajemy wprost numer zdjęcia w danej galerii)
    var opisObrazkaALT = 'zdjęcie ' + serwerowyOpisObrazkaALT;
    $obrazekWOdnosniku.attr('alt', opisObrazkaALT);     // modyfikacja/tworzenie treści atrybutu (o ile istniał)
    var opisObrazkaALTDuzaLitera = "Zdjęcie nr "  + serwerowyOpisObrazkaALT + " w tej galerii (" + odnosnikNrZdjeciaGlobalne + g_rozszerzenie_obrazka + ")"; // nowa lepsza nazwa na tytuł w podglądzie JS

    // console.log("Dla elementu <a> o HREF '" + biezacyOdnosnikHREF + "' NR_ZDJĘCIA to '" + odnosnikNrZdjecia + "', a ALT miniatury IMG to '" + opisObrazkaALT + "'" );	// DEBUG

    // sklejanie adresu docelowego obrazka z ustalonych fragmentów i ścieżki względnej (numeru zdjęcia w zasadzie)   
    var pelnyAdresOdnosnika = g_protokol_www + g_adres_strony + "/" + g_folder_serwera + "/" + g_matryca_nazwy_pliku + odnosnikNrZdjeciaGlobalne + g_rozszerzenie_obrazka ;	
    $biezacyOdnosnik.attr( { href: pelnyAdresOdnosnika, "data-lightbox": "Galeria",
                            "data-title": opisObrazkaALTDuzaLitera, title: opisObrazkaALT } ); // zmienia href na bezpośrednie odnośniki do serwera zewnętrznego
            // PLUS Lightbox w atrybutach data!!!
    $biezacyOdnosnik.siblings().remove();

    // sklejanie adresu dla miniatury, owiniętej odnośnikiem   -  
    // przeklejenie - wstawienie odnośników do zdjęć w innym, właściwym obszarze
    $kontenerDocelowy.append( $biezacyOdnosnik ); 
    }); //each-function-END

    if ( $odnosnikiMiniatur.length <= 0) // gdyby jednak nic nie znaleziono (chyżby coś z serwerem lub transmisją?)
    {
    console.log('Nie znaleziono na podstronie żadnych miniatur (stan: ' + $odnosnikiMiniatur.length + ') - dla zmiennej \'' + g_tag_do_podmiany_zdjecia + '\'' );
    }

    var $listaPodstron = $( kontenerZrodlowy + ' .pagination .page-link' ); // wyszukiwanie wewnątrz danego pojemnika

    if ( $listaPodstron.length >= 1 )	// czy są jakieś odnośniki do podstron/paginacji galerii? (zlicza wszystkie, też NOWSZE/STARSZE)
    {					// startujemy od kolejnej strony po pierwszej, ale ostatni zawiera ciąg "starsze"
    $('nav#nawigacja_galeria').append('<div class="kontener"><h3>Przeglądaj kolejno pozostałe podstrony tej galerii</h3></div>');
        
    var nazwaPodstronyGalerii = '';

        for ( var i=0; i < $listaPodstron.length; i++ ) {
            // każda podstrona/paginacja zaczytywana po kolei z odsyłaczem w formie tekstowej -- treść tekstowa danego odnośnika
        nazwaPodstronyGalerii = $( $listaPodstron[i] ).text();  // pozyskiwanie bezpośredniej treści tekstowej odsyłacza
            if ( ( nazwaPodstronyGalerii.search("nowsze") >= 0 ) || ( nazwaPodstronyGalerii.search("starsze") >= 0 )
                 || ( nazwaPodstronyGalerii.search("następne") >= 0 ) || ( nazwaPodstronyGalerii.search("poprzednie") >= 0 ) )
            {
            // nic nie robimy dla takiego odnośnika, najlepiej zakończyć bieżącą iterację
            continue;  // nie wyświetlaj przyciku/-ów z tekstem "starsze/nowsze"/"poprzednie/następne" dla danego wykonania pętli - wyjście z kroku pętli
            }
        ileLinkowDoPodstron++;  // dopiero tu inkrementacja znalezionej ilości "dobrych" przycisków

        var odnosnikPodstrony = $( $listaPodstron[i] ).attr('href'); 	// wyciąga href z nawigacji podstrony/paginacji
        // informacja o pozytywnym odczytaniu odnośnika do podstrony galerii
        // console.log('Natrafiono na odnośnik nr ' + (i+1) + ' o zawartości \'' + odnosnikPodstrony + '\'');

        var odczytanyNrPodstronyBiezacejGalerii = OdczytajZOdnosnikaNumerPodstronyGalerii ( odnosnikPodstrony );

            if ( ( odczytanyNrPodstronyBiezacejGalerii !== undefined ) && ( !isNaN( odczytanyNrPodstronyBiezacejGalerii ) ) )   // jeżeli odczytano z przycisku odnośnik z NUMEREM podstrony to wstaw przycisk z odnośnik do tej podstron
            {
                    // tu oblicznanie w pętli przejścia do ewentualnego poprzedniego oraz ewentualnego następnego względem bieżącego
                if ( ( odczytanyNrPodstronyBiezacejGalerii == ( nrWyswietlanejGalerii - 1 ) ) && ( odczytanyNrPodstronyBiezacejGalerii > 0 ) )  // > "jeden" to źle?
                {
                przyciskPoprzedni.nrPodstrony = odczytanyNrPodstronyBiezacejGalerii; // przypisanie numeru galerii, który jest -1 w stosunku do bieżącej (wyświetlanej)
                przyciskPoprzedni.adresUrl = odnosnikPodstrony; // też jej adres jest potrzebny
                }
                if ( ( odczytanyNrPodstronyBiezacejGalerii == ( nrWyswietlanejGalerii + 1 ) ) && ( odczytanyNrPodstronyBiezacejGalerii <= g_ile_podstron_ma_ta_galeria ) )      // korekta na +1 max, ale dla obliczonych już wszystkich podston niepotrzebna, lepiej operator porówniania zaktualizować
                {
                przyciskNastepny.nrPodstrony = odczytanyNrPodstronyBiezacejGalerii;
                przyciskNastepny.adresUrl = odnosnikPodstrony;
                }
            var nowyPrzycisk = $('<button></button>', {
            // var nowyPrzycisk = $('<input></input>', {
            // type : "button",            
                //id : "galeria_paginacja_" + ( i+1 ),  // tu generowane po kolei
                id : "galeria_paginacja_" + odczytanyNrPodstronyBiezacejGalerii,  // a tu użycie obliczonego numeru do konkretnej podstrony danej galerii (też po kolei, ale z wyłączeniem aktualnie wyswietlanej podstrony)
                "class" : "przycisk_galeria",
                value : odczytanyNrPodstronyBiezacejGalerii, 
                text : "Podstrona nr " + odczytanyNrPodstronyBiezacejGalerii, // etykieta z konkretnym numerem do nawigowania
                "data-tag" : g_tag_do_podmiany_zdjecia,
                "data-adres_strony" : g_adres_strony,
                "data-adres_galerii" : odnosnikPodstrony,
                "data-elem_zewn" : g_element_zewnetrzny
            });	 

            przyciskiDoWstawienia.push( nowyPrzycisk ); // warunkowe dodamie - zbieranie istniejących przycisków podgalerii do jednej kolekcji (z wyłaczeniem "poprzednia/następna" oraz siebie samego)
                // powyższe celem polepszenia wydajności, aby dołączyć do DOM jeden element, zawierający kolekcję przycisków (po zebraniu tej kolekcji)

            } // if-END !undefined && !isNaN
        } // for-END
        
            // logownie kolekcji przycisków dla sukcesu (znaleziono na stronie) 
        // console.log('NOWY: ', przyciskiDoWstawienia );
        
            // wstepne dane do tworzenia przycisków NASTĘPNY/POPRZEDNI - dobre miejsce na zrobienie funkcji z tej treści (ale za dużo parametrów i sprzecznej logiki w niej)
        if ( przyciskPoprzedni.nrPodstrony != 0 ) 
        {
        przyciskPoprzedni.trescPrzycisku = "<< Poprzednia (nr " + przyciskPoprzedni.nrPodstrony + ")"; // ustaw treść z numerem gdy jest zmieniony pierwowzór
        przyciskPoprzedni.aktywny = true;   // aktywuj przycisk
        }
        else
        {
        przyciskPoprzedni.trescPrzycisku = "<< Poprzednia";    // wstaw domyślny tekst (... i tak się nie uda naciśnąc tego przycisku później)
        }
        
        if ( przyciskNastepny.nrPodstrony != 0 )
        {
        przyciskNastepny.trescPrzycisku = "Następna (nr " + przyciskNastepny.nrPodstrony + ") >>";
        przyciskNastepny.aktywny = true;
        }
        else
        {
        przyciskNastepny.trescPrzycisku = "Następna >>";
        }
        // tworzenie przycisku POPRZEDNI w pamięci, bazując na istniejących przyciskach konkretnych podstron danej galerii .. nastepnie przycisku NASTĘPNY
    var poprzedniButton = $('<button></button>', {
        id : "galeria_poprzednia",
        "class" : "przycisk_galeria",   // jako sygnalizacja, że to nie jest słowo kluczowe, "className" też dobrze działa dla IE8 
        value : przyciskPoprzedni.nrPodstrony, 
        text : przyciskPoprzedni.trescPrzycisku,
        disabled : !przyciskPoprzedni.aktywny,      // tu negacja wartości, logika odwrotna względem poprzednich warunków
        "data-tag" : g_tag_do_podmiany_zdjecia,
        "data-adres_strony" : g_adres_strony,       // czy to jest nadal potrzebne
        "data-adres_galerii" : przyciskPoprzedni.adresUrl,
        "data-elem_zewn" : g_element_zewnetrzny
    });	   
        
    var nastepnyButton = $('<button></button>', {
        id : "galeria_nastepna",
        "class" : "przycisk_galeria",
        value : przyciskNastepny.nrPodstrony, 
        text : przyciskNastepny.trescPrzycisku,
        disabled : !przyciskNastepny.aktywny,      // negacja wartości!
        "data-tag" : g_tag_do_podmiany_zdjecia,
        "data-adres_strony" : g_adres_strony,
        "data-adres_galerii" : przyciskNastepny.adresUrl,
        "data-elem_zewn" : g_element_zewnetrzny
    });	   

    var elementBlokowy = $('<h6 />').html( poprzedniButton ).append( nastepnyButton );  // dodawanie jako obiekty jQuery (osobno każdy z elementów!)
        
    $('nav#nawigacja_galeria > div:first').append( elementBlokowy );
        // wyświetlanie warunkowo ewentualnyh bezpośrednich odnośników do podgalerii, gdy tych jest CO NAJMNIEJ DWA (można od razu nawigować do ostatniego/pierwszego bez pośredniego przejścia przed drugi (z niepotrzebnym ładowaniem!)) 
        if ( ileLinkowDoPodstron > 1 ) // czyli pokaże się z DWOMA przyciskami minimum w zawartości albo w ogóle (może i mniej wydajne, ale prostsze do ogarnięcia)
        {
        $('nav#nawigacja_galeria > div:first').append('<h3>... albo wybierz dowolną podstronę od razu.</h3>').append( przyciskiDoWstawienia ); // wstawianie od razu CAŁEJ KOLEKCJI przycisków do każdej z podstron...
        }
    }   // if-END $listaPodstron.length >= 1
    else 
    {   // jakiś odzew w przypadku, gdy nic więcej nie ma poza beżącą podstroną w danej galerii (tekst dla braku podstrony)
        // zawsze to lepsze, niż brak tego komunikatu, (+): rozwiewa niepewność, że nic więcej nie ma
    $('nav#nawigacja_galeria').append('<div class="kontener"><h3>Brak innych podstron dla tej galerii</h3></div>'); 
    }   // if-else-END $listaPodstron.length >= 1

} // GenerujPodstronyGalerii-END


function GenerujSpisGaleriiPierwszyPrzebieg ()
{

$( g_miejsce_na_spis ).show(100);

//debugger;

// tworzenie szablonu spisu
 //g_zaczytana_ilosc_paginacji_galerii = $( g_miejsce_na_spis + " div.kontener-odnosnik" ).length; // ma być o 5 więcej niż na stronie (szablon do wstawienia), co to robi???
g_zaczytana_ilosc_paginacji_galerii = 0; // zmiana NIEISTOTNA, i tak późniejsza pętla działa zawsze na +5 elementów na stronie, nie oblicza warunku na podstawie
	
    if ( g_biezaca_pozycja_galerii === 0 )		// pierwsze przejście -- przetwarzamy pierwszy odnośnik, który zawiera najwyższy numer galerii
    {
    g_ilosc_zaczytanych_galerii	= -5 ;  // takie dziwne numerowanie w trakcie odczytu, aby nie zmieniać innych warunków
    var ilePaginacji = 0;   // wartość robocza, powinna być zaraz nadpisana
    var $temp_odnosnik_tytul = $( g_tag_do_podmiany_spis + " .card:first a" );	 // dobre do czasu, o ile nie powstanie nowa galeria w trakcie przeglądania starej listy!
    var atrybut_href = $( $temp_odnosnik_tytul ).attr('href'); // np. "http://zlobek.chojnow.eu/u_tygryskow,a153.html"
        //temp_atrybut = temp_atrybut.split(",")[1]; // jest dobre, ale leży przy dodanym ',' w adresie odnosnika (jako treść)

    // generalnie powinien być odnaleziony jakiś (PIERWSZY) odsyłacz do galerii, gdy nie to rzuć powiadomieniem
        if ( ( $temp_odnosnik_tytul.length == 0 ) && ( ( atrybut_href == '' ) || ( atrybut_href == undefined ) ) )
        {
        GenerujPowiadomienieOBledzie({ tytul : 'Problem z odczytem zawartości zdalnej!', tresc : 'Wystąpił problem z odczytaniem zawartości zdalnej. Nie udało się załadować wstepnych wartości (1)! Konieczność przeładowania zawartości witryny. <br />Naciśnij poniższy przycisk.', przyciskAkcjiOdswiez : true });
            // zapewniono globalną obsługę zdarzenia na kliknięcie - odświeżenie
        return false; // !!! wyjście z funkcji, brak dalszych obliczeń !!!
        }
        else
        {   // bezpieczniejszy kod na później, bo istnienie wartości undefined generuje błedy
        var atrybut_href_pozycja = atrybut_href.lastIndexOf(",a");		    // łatwiejsze nawigowanie z kontekstem - "a" jest numerem galerii/albumu
        atrybut_href = atrybut_href.substr( atrybut_href_pozycja + 2 ); // +2 znaki za pozycją (',' i 'a'), poprawna konwersja liczby na początku danego ciągu
        g_ilosc_wszystkich_galerii = parseInt( atrybut_href );
        ilePaginacji = ObliczMaksymalnaIloscPodstronGalerii( g_ilosc_wszystkich_galerii );   // liczone na podstawie odczytanej właśnie maksymalnej ilości galerii, skoro (pierwszy) odczyt witryny nie ujawnia ilości podston z odnośniami do galerii/albumów 
        }
            
        //g_ilosc_wszystkich_paginacji_galerii    // też szukamy "najostatniejszej" paginacji - podstrony z najwyższym numerem/odnośnikiem
        // czy to mniej zasmieci przestrzeń? (+): nie potrzeba tworzyć tablicy X-elementów, aby pobrać tylko jej ostatni lub przedostani element

    /*
    var ostatniaPaginacja = $( g_tag_do_podmiany_spis + " table.galeria tbody tr td a.link_tresc:last" );  // "najbardziej optymalny" wyróżnik toto nie jest
   
    var ilePaginacji = parseInt( ostatniaPaginacja.text() );    // tu winna się znaleźć konkretna liczba, przynajmniej dla większości odnośników
    
        if ( isNaN( ilePaginacji ) ) // kolejny błąd, jeśli mamy "starsze >>" jako ostatnie to wynikiem konwersji jest 'NaN'
        {
        ostatniaPaginacja.remove(); // usuń ostatni element paginacji witryny, po czym pobierz "nowy ostatni" -- tak samo jak powyżej
        ostatniaPaginacja = $( g_tag_do_podmiany_spis + " table.galeria tbody tr td a.link_tresc:last" );
        
        ilePaginacji = parseInt( ostatniaPaginacja.text() ); //  zmieniana "warunkowo" treść z warunku
        
            if ( isNaN( ilePaginacji ) || isNaN( g_ilosc_wszystkich_galerii ) ) // jakoby nowy warunek w istniejącym warunku, ale zmienionym już -- zawsze wstawi tylko jeden element info o błędzie
            {
            GenerujPowiadomienieOBledzie({ tytul : 'Problem z odczytem zawartości zdalnej!', tresc : 'Wystąpił problem z odczytaniem zawartości zdalnej! Nie udało się załadować wstepnych wartości (2)! Konieczność przeładowania zawartości witryny. <br />Naciśnij poniższy przycisk.', przyciskAkcjiOdswiez : true });    
                // zapewniono globalną obsługę zdarzenia na kliknięcie - odświeżenie
                console.log('PIERWSZY PRZEBIEG "NIEUDANY", szczegóły: wszystkich podstron jest ' + g_ilosc_wszystkich_paginacji_galerii + ', zaczytano ' + g_zaczytana_ilosc_paginacji_galerii 
                + ' podstron, pozycja w galerii to ' + g_biezaca_pozycja_galerii +', a kliknięć było ' + g_suma_klikniec_zaladuj + '.');
            return false; // !!!
            }
        }
            // !!! i drugi warunek poprawności na przypisanie zaczytanego maksimum podstron (ewentualnego), gdy SĄ JUŻ WPISY w ilości > 5, dla 1..5 będzie lipa
    */        
        if ( ilePaginacji > 0 ) g_ilosc_wszystkich_paginacji_galerii = ilePaginacji;  // !!!

        // KOPIA: poniższy log przeniesiono z początku tej funkcji z uwagi na celowość wyświetlania w nim zaczytanych danych z zewnatrz przy każdym > 1 przebiegu
        /* console.log('PIERWSZY PRZEBIEG - wszystkich podstron jest ' + g_ilosc_wszystkich_paginacji_galerii + ', zaczytano ' + g_zaczytana_ilosc_paginacji_galerii
            + ' podstron, pozycja w galerii to ' + g_biezaca_pozycja_galerii +', a kliknięć było ' + g_suma_klikniec_zaladuj + '.');    */
        
    PrzewinEkranDoElementu( 'div#zaczytany_spis > h2', 500, 2 );    // Przewinięcie do znalezionych galerii - tylko przy pierwszym-auto-załadowaniu treści
    //g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5;
    
    g_suma_klikniec_zaladuj++;  // !!! - użycie w ch-rze licznika automatycznego -- jednorazowe wymuszenie +1 za symulowanie naciśnięcia pierwszego pobrania galerii (kliknięcie jako wywołanie funkcji wprost)
    } //if-END ( g_biezaca_pozycja_galerii === 0 )

// dodano/przeniesiono tutaj
// jest łatwiej, ale sekwencja jest trochę głupia, bo bardziej widać że najpierw są wstawiane PÓŹNIEJSZE w kodzie wyzwalacze, by później przetwarzać elementy na wyświetlenie spisu galerii 
$('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii
$('div#selektor').show();   // też natychmiast pokaż przycisk-kontener do wybiórczego ładowania wybranych treści
} // GenerujSpisGaleriiPierwszyPrzebieg-END


function OdczytajSpisGalerii ()     // refaktoryzacja jako NOWE - budowane na podstawie "GenerujSpisGalerii" -- TO NIE JEST UŻYWANE JESZCZE, do wprowadzenia przy obsłudze PYTANIE-ODPOWIEDŹ jako JSON/obiekt
{
    if ( g_biezaca_pozycja_galerii === 0 )		// pierwsze przejście -- przetwarzamy pierwszy odnośnik, który zawiera najwyższy numer galerii
    {
    GenerujSpisGaleriiPierwszyPrzebieg();
    UstawSuwakiJakOdczytanoPierwszymPrzebiegiem();    
    }
        
    // wstępnie odczyt elementów, które napotykane są jako pierwsze w strukturze spisu, tu zebranie wszystkich zdjęć tytułowych
                                                // czy tu ma być ":FIRST"?!, nie powoduje to wyniku 0 lub 1 ??
var ileNapotkanoGalerii = $( g_tag_do_podmiany_spis + " td.galeria_kolor a.link:first" ).length;    // musi być liczbą, bo kilka chwil wcześniej podobne zapytanie wygenerowałoby błąd  -- zatem bez dalszej weryfikacji 
var odczytanaZawartoscGalerii = {},    // kontener na każdy element-odnośnik dla spisu treści
    noweGalerie = [];   // do przechowywania spisu galerii, na tej podstawie będzie budowana treść htmla dla kolejnych elementów spisu
    
g_biezaca_pozycja_galerii++;    // która podstrona spisu treści jest właśnie zaczytywana
g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + ileNapotkanoGalerii;    // !!! - tu zmieniono zliczanie na konkretną ilość otrzymanych elementów
    // powyższe istotne: inkrementacja o ilość zdjęć z poszczególnych zaczytanych galerii, oczekiwane [1, 5]
    
    // poniższy log przeniesiono z początku tej funkcji z uwagi na celowość wyświetlania w nim zaczytanych danych z zewnątrz przy każdym > 1 przebiegu
console.log('Wszystkich podstron jest ' + g_ilosc_wszystkich_paginacji_galerii + ', zaczytano ' + g_zaczytana_ilosc_paginacji_galerii 
            + ' podstron, pozycja w galerii to ' + g_biezaca_pozycja_galerii +', a kliknięć było ' + g_suma_klikniec_zaladuj + '.');        
    	
//	for( var i=1 + g_zaczytana_ilosc_paginacji_galerii ; i <= 5 + g_zaczytana_ilosc_paginacji_galerii ; i++ ) { // czemu rezygnacja, rozbierzność?!

    for ( var i = 0 ; i < ileNapotkanoGalerii ; i++ )  // pętla numerowana od ZERA, gdyż EQ też numeruje elementy względem ZERA 
    {	// zawsze +X elementów DIV, oczekiwane [1,5], ale czy trafi się 0?
    odczytanaZawartoscGalerii = OdczytajTresciOdnosnikaWybranejGalerii( g_tag_do_podmiany_spis , i );
    noweGalerie.push( odczytanaZawartoscGalerii ); 
    }

return noweGalerie; // zwróć zawartość "nagłowkową" dla każdej kolejno odczytywanej galerii z grupy max 5
}   // OdczytajSpisGalerii-END


function GenerujSpisOdczytanejGrupyGalerii ( miejsceDocelowe, grupaGalerii, czyWybrane ) // refaktoryzacja jako NOWE - zawartość generowana na podstawie przekazywanych/zapamiętanych obiektów (JSON jeszcze nie teraz...) 
{        
var ileSpisowGalerii = grupaGalerii.length,
    html = '',  // generowanie w HTMLa na tekstową modłę póki co (do zastąpienia np. Reactem)   
    dodatkowaKlasaTytulu = '',  // korekta wyświetlania dłuższych lub krótszych tytułów
    dlugoscBiezacegoTytulu = 0,
    adresZasobu = '';   // końcowa część odnośnika do konkretnej galerii
    
    for ( var i = 0; i <= ileSpisowGalerii; i++ )
    {  
    // obliczanie długości tytułu danej galerii by dopracować wyświetlanie tego napisu
    dlugoscBiezacegoTytulu = grupaGalerii[i].tytul.length;  // zakresy do ewentualnej weryfikacji, póki co niewłaściwie wyświetlane tylko dla jednego tytułu
        if ( dlugoscBiezacegoTytulu < 15 ) dodatkowaKlasaTytulu = ' class="wyzszy"';    // klasa ze zwiększonym odstępem pionowym (a la wyśrodkowanie pionowe w kontenerze)
        if ( ( dlugoscBiezacegoTytulu >= 24 ) && ( dlugoscBiezacegoTytulu < 35 ) ) dodatkowaKlasaTytulu = ' class="mniejszy"'; // klasa z mniejszą czcionką o 25% pkt.
        if ( dlugoscBiezacegoTytulu >= 35 ) dodatkowaKlasaTytulu = ' class="najmniejszy"'; // kolejne zmniejszenie czcionki tytułu dla <h2>
        
    // skracanie pełnego adresu dla samego zasobu końcowego - odnośnika do danej galerii
    adresZasobu =  grupaGalerii[i].adres.substr( grupaGalerii[i].adres.lastIndexOf("/") + 1 ); // pobranie wszystkiego za ostatnim '/'
        
    // tworzenie zbitej "kupki" htmlowej - NiechTenKtóryNaToPatrzy odwróci swój wzrok
    // UWAGA! zmieniona struktura "komponentu"
	html += '<div id="kontener_odnosnik_' + grupaGalerii[i].nrGalerii + '" class="kontener-odnosnik">'
            +  '<a data-href="' + adresZasobu + '" tabindex="0">'
                + '<div>'
                    + '<div class="tytul-odnosnik"><h2' + dodatkowaKlasaTytulu +'>' + grupaGalerii[i].tytul + ' </h2></div>'
                    + '<div id="zdjecie-odnosnik_' + grupaGalerii[i].nrGalerii + '" class="zdjecie-odnosnik">' 
                        + '<img src="' + grupaGalerii[i].srcObrazka + '" alt="' + grupaGalerii[i].tytul + '"/>'
                    + '</div>'
                + '</div>'
            + '</a>'
            + '<div class="kontener-tekstowy-odnosnik">' 
                + '<div class="data-odnosnik">' + grupaGalerii[i].data + '</div>'
                + '<div class="opis-odnosnik">' + grupaGalerii[i].opis + '</div>'
            + '</div>'
            + '<div class="dolna-zaslonka"></div>'
            + '<div class="szczegoly">' 
                + '<p>' + grupaGalerii[i].nrGalerii + '</p>'
                + '<p><span>galeria</span><br />podstrona</p>'
                + '<p>' + grupaGalerii[i].nrPodstronyGalerii + '</p>'
            + '</div>'
        + '</div>';
    } // for()-END 
    
    // poniżej odnośniki do jednorazowego wyrenderowania w grupie w określonym miejscu 
$( miejsceDocelowe ).append( html );

    // czyszczenie kontenera źródłowego, dla testów pozostaje paginacja galerii -- docelowo i tak ten pojemnik źródłowy jest zerowany przy każdym odczycie/odpowiedzi
$( g_tag_do_podmiany_spis + ' tr' ).not(':last').remove();   // przed testami
// $( g_tag_do_podmiany_spis + ' > table' ).remove();  // po testach czyszczenie całej zawartości - aby nie przeklikiwać [Tab]em tego ewentualnie
    
    // złożone działanie w przypadku dołączania kolejnych podstron galerii
    if ( czyWybrane != 'WYBRANE' ) // lub jakikolwiek inna wartość niepusta argumentu
    {

        // obowiązakowe czyszczenie nadmiaru, warunek na szablon vs na ilość załadowanych
    // debugger;

    var $nadmiar = $( g_miejsce_na_spis + " .kontener-odnosnik:has(h3)");
        if ( $nadmiar.length > 0 ) 
        {       // FOR lepszy, czy zostawić '$nadmiar.each( function() { ... }'? -- wydajność vs lepszy dostęp do elementów w jQ
            for ( var i = 0 ; i < $nadmiar.length ; i++ )
            {
            console.log('Znaleziono nadmiar w ilości ' + (i+1) + ' wpisu/wpisów z ' + $nadmiar.length + ' dla obiektu o id="' + $( $nadmiar[i] ).attr('id') + '", który usunięto.');
                // $( $nadmiar[i] ).css({ "backgroundColor" : "#933" });
            $( $nadmiar[i] ).remove();      // kasowanie pustych pojemników na odnośniki do galerii
            g_ilosc_zaczytanych_galerii--;	// !!! -- konieczna korekta ilości zaczytanych galerii (istotne przy ostatniej podstronie, bo zawsze są +5 załadowania)
            }
        }

        if ( g_ilosc_zaczytanych_galerii >= g_ilosc_wszystkich_galerii ) // warunkowo drugie czyszczenie, póki co tylko w formie wizualnego ostrzeżenia
        {
        //$( g_miejsce_na_spis + " .kontener-odnosnik:gt(" + ( g_ilosc_wszystkich_galerii - 1 )+ ")" ).css({ "backgroundColor" : "#666" });
        $( g_miejsce_na_spis + " .kontener-odnosnik:has(h3)").css({ "backgroundColor" : "#666" });  // masz <h3> to "wypad"
        // $( g_miejsce_na_spis + " .kontener-odnosnik:has(h3)").remove();  // docelowo zamienić linię powyższą na tę linię, choć nie powinno mieć to miejsca
        }

        // już niepotrzebne, tylko diagnostyka -- poniższe wybierało nagłówki oraz jako ostatnie paginacje dla wszystkich podstron galerii
    var $wierszeTabeli = $( g_tag_do_podmiany_spis + " tr:nth-child(4n-3)" ); // wybór każdego pierwszego "nagłóweka" w danej tabelce, także spis treści (całej paginacji)

        $wierszeTabeli.each( function() {
            $(this).css({ "border" : "1px dotted blue" });  // tu wcięcie wyjątkowo ;)
        }); // each-END

    //$wierszeTabeli.length	... już porzucona diagnostyka -- lepiej operować na zliczaniu odnośników od paginacji spisów galerii

        // nadal przegląd tego kontenera źródłowego, bo w innym podmienianym (spisie treści) też są te same klasy i identyczna struktura zagnieżdżenia!!! 
    var $listaPodstron = $( g_tag_do_podmiany_spis + ' td[colspan=2] a.link_tresc' ); 

        if ( $listaPodstron.length >= 1 )	// czy są jakieś odnośniki do podstron galerii?
        {	// pierwsza podstrona nie zawiera odnośników do przejścia +1 w przód / -1 w tył -- "starsze" i "nowsze"!
            // nie tylko to, że na pierwszej nie można się cofnąć, ale też nie można pójść o krok +1 do przodu do "starszych"
            // startujemy od kolej strony po pierwszej, ale ostatni zawiera ciąg "starsze", a później każdy kolejny zawiera "nowsze" na początku oraz "starsze" na końcu;
            // do tego pominięcie indeksu aktualnie wyświetlanej paginacji, nie jest już odnośnikiem tylko zwykłym tekstem (czerwonym i pogrubionym);
            // liczba odnośników stanowi liczbę paginacji galerii, ale jest pomijany pierwszy i ostatni... więc potrzebna korekta -2 i +1 brakująca (aktualna)
        var ilePodstronSpisuTresci = 0;
            for ( var i = 0 ; i < $listaPodstron.length ; i++ )   // ta pętla zawsze liczy dobrze, odrzuca ewentualne +/- podstrona, ale też dodaje bieżącą podstronę
            {
            var nazwaPodstronyGalerii = $( $listaPodstron[i] ).text();  
                if ( ( nazwaPodstronyGalerii.search("nowsze") >= 0 ) || ( nazwaPodstronyGalerii.search("starsze") >= 0 ) )
                {
                continue;  //przeskok do kolejnego wywołania, bez zliczania takiego odnośnika z zadanym tekstem, a nie "numerem"
                }
            ilePodstronSpisuTresci++;
            }
        ilePodstronSpisuTresci++; // konieczne do zliczenia aktualnej galerii, która nie generuje odnosnika	-- a przecież ją wyświetlamy teraz

        g_zaczytana_ilosc_paginacji_galerii = ilePodstronSpisuTresci;	  // !!! muerto importante !!!

        // debugowanie -- wprowadzenie nowych treści w statusie dla zaczytanych właśnie treści
    /*
        $('p#status_galerii_spis').show( 100 ).html('Znaleziono '  + $wierszeTabeli.length + ' wierszy tabeli źródłowej oraz ' + $listaPodstron.length
                                            + ' wszystkich podstron(-y) spisu treści (razem ze starsze i nowsze bez bieżącej).<br />Jesteś na '
                                            + g_biezaca_pozycja_galerii + '. stronie galerii.<br />'
                                            + 'A wcześniej zaczytano: "' + g_zaczytana_ilosc_paginacji_galerii + '" paginacji, a załadowano łącznie '
                                            + g_biezaca_pozycja_galerii + ' (vs ' + g_ilosc_zaczytanych_galerii + ') elementów galerii ze wszystkich '
                                            + g_ilosc_wszystkich_galerii + ' galerii');
    */
        } // if-END ( $listaPodstron.length >= 1 )
    }   //if-(czyWybrane)-END
    else
    {
    // prostszy wariant dla uzupełnienia wskazanej galerii
        
    }
    
console.info( "NADAL JEST COŚ DO SKASOWANIA? (i to ta zaszłośc <table>?!)", g_tag_do_podmiany_spis );
$( g_tag_do_podmiany_spis + ' > table' ).remove();  // po testach czyszczenie całej zawartości - aby nie przeklikiwać [Tab]em tego ewentualnie

    // poniższe przenieść poza funkcję? (istotne przy pierwszym wywołaniu)
    if ( ( g_ilosc_zaczytanych_galerii > 0 ) && ( g_ilosc_zaczytanych_galerii <= 5 ) )
    {
    $('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii
    $('div#selektor').show();   // też natychmiast pokaż przycisk-kontener do wybiórczego ładowania wybranych treści
    }
} // GenerujSpisOdczytanejGrupyGalerii-END
    

function GenerujSpisGalerii ()  // AKTYWNE (póki co), docelowo ma posłuzyć do wygenerowania galerii
{
    if ( g_biezaca_pozycja_galerii === 0 )		// pierwsze przejście -- przetwarzamy pierwszy odnośnik, który zawiera najwyższy numer galerii
    {
    GenerujSpisGaleriiPierwszyPrzebieg();
    UstawSuwakiJakOdczytanoPierwszymPrzebiegiem();
    }

g_biezaca_pozycja_galerii++;    // która podstrona spisu treści jest właśnie zaczytywana
g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; // inkrementacja o każde 5 zdjęć z poszczególnych zaczytanych galerii (warunek trochę na wyrost -- ewentualnie mniej na ostatniej podstronie)

    // czy włączyć weryfikację na możliwie zwiększającą się liczbę galerii lub/i paginacji, gdy ładujemy kolejne podstrony (zawsze jest szansa na dodanie treści)?
    // ...
    
    // poniższy log przeniesiono z początku tej funkcji z uwagi na celowość wyświetlania w nim zaczytanych danych z zewnatrz przy każdym > 1 przebiegu
    /* console.log('GenerujSpisGalerii(): wszystkich podstron jest ' + g_ilosc_wszystkich_paginacji_galerii + ', zaczytano ' + g_zaczytana_ilosc_paginacji_galerii 
            + ' podstron, pozycja w galerii to ' + g_biezaca_pozycja_galerii +', a kliknięć było ' + g_suma_klikniec_zaladuj + '.'); */

//	for ( var i=1 + g_zaczytana_ilosc_paginacji_galerii ; i <= 5 + g_zaczytana_ilosc_paginacji_galerii ; i++ ) {
    
var odnosnikPojemnik = '';  // do przechowywania spisu galerii, będzie budowana treść htmla dla kolejnych elementów
    
	for ( var i = 1 ; i <= 5  ; i++ )	// zawsze +5 elementów DIV, po co je wcześniej zliczać?
	{ 
	/* var odnosnikPojemnik = '<div id="kontener_odnosnik_' + String(i) + '" class="kontener-odnosnik"><div id="zdjecie_odnosnik_' + String(i) + '" class="zdjecie-odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener-tekstowy-odnosnik"><div class="tytul-odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div class="data-odnosnik">Data galerii</div><div class="opis-odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div></div>'; 	*/
	
	odnosnikPojemnik += '<div id="kontener_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="kontener-odnosnik"><div class="tytul-odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="zdjecie-odnosnik">Zdjęcie nr ' + String(i + g_ilosc_zaczytanych_galerii) + '</div><div class="kontener-tekstowy-odnosnik"><div class="data-odnosnik">Data galerii</div><div class="opis-odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div><div class="dolna-zaslonka"></div><div class="szczegoly"><p>XXXX</p><p><span>galeria</span><br />podstrona</p><p>YYY</p></div></div>'; 	
	}	
$( g_miejsce_na_spis ).append( odnosnikPojemnik );		// tworzenie naraz pięciu elementów -- odnośników dla spisu galerii
		
// akcja wypełniacz - zdjęcia
var $odnosnikiZdjecia = $( g_tag_do_podmiany_spis + " .card img" );

    if ( $odnosnikiZdjecia.length > 0 )
    {
        for ( var i = 0 ; i < $odnosnikiZdjecia.length ; i++ )
        {
            // usuwanie niepotrzebnej klasy, najprostsze/najszybsze bezpośrednio poprzez JS
        $( $odnosnikiZdjecia[i] ).removeAttr('class').attr('data-href', $( $odnosnikiZdjecia[i] ).attr('href') ).removeAttr('href');   
            // lepiej wywalić cały atrybut 'class', bo i tak zostaje pusty gdy się tylko usunie z niego klasę "link_tresc" ;
            // podobnie wylatuje 'href', aby nie komplikować z przyciskami myszy ;) -- w jego miejsce tworzony zastępca 'data-href'
            
        var miejsceDocelowe = $( g_miejsce_na_spis + " .zdjecie-odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );
            // ta zmienna będzie używana w dalszych iteracjach, na rzecz każdego z fragmentów/atrybutów składowych docelowego odnośnika spisu treści galerii
 
            // po wprowadzniu funkcji naprawiającej globalnie SRC już niepotrzebne sklejanie odnośnika
        // var src_docelowe = g_protokol_www + g_adres_strony + "/" + $( $odnosnikiZdjecia[i] ).find('img').attr( "src");	
        // var src_docelowe = $( $odnosnikiZdjecia[i] ).find('img').attr( "src");	// to niepotrzebne, bo już SRC naprawione
        // $( $odnosnikiZdjecia[i] ).find('img').attr( "src", src_docelowe );
        $( miejsceDocelowe ).html( $odnosnikiZdjecia[i] ); // podmiana oryginalnej zawartości
        }
    }

	// akcja wypełniacz - tytuły
var $odnosnikiTytuly = $( g_tag_do_podmiany_spis + " .card-title > a" );
	
    if ( $odnosnikiTytuly.length > 0 )
    {
    var ktoraToGaleria = '';
    var ktoraToPodstrona = 0;
    var trescTytulu = '';
        
        for ( var i=0 ; i < $odnosnikiTytuly.length ; i++ )
        {
            // np. http://zlobek.chojnow.eu/u_misiow_i_motylkow,a3.html     // "a" + nr_galerii + ".html"
        ktoraToGaleria = $( $odnosnikiTytuly[i] ).removeAttr('class').attr('href'); // pobranie 'href" + wcześniejsze wywalenie pustego 'class' z tego odnośnika
        ktoraToGaleria = OdczytajZOdnosnikaNumerGalerii( ktoraToGaleria ); // przypisz docelową wartość w tej samej zmiennej
        
        ktoraToPodstrona = KtoraPodstronaWGalerii ( ktoraToGaleria ); // obliczenie podstrony dla aktualnej galerii (wszystkie [1..5] ładowane w jednym rzucie powinny mieć identyczna podstronę!)
            
            // skoro pierwotny 'href' już użyto (odczytano), to podmiana na 'data-href' i rezygnacja z wzorcowego atrybutu
        $( $odnosnikiTytuly[i] ).attr('data-href', $( $odnosnikiTytuly[i] ).attr('href') ).removeAttr('href')
                                .attr('tabindex', 0);
            
            // uaktualnienie numerem galerii i podstrony w tejże galerii od razu w rodzicu, bez dwóch odwołań potomnych poprzez .text()
        miejsceDocelowe = $( g_miejsce_na_spis + " .szczegoly:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" ); 
            // POCZĄTEK UŻYCIA jako ZMIENNEJ TYMCZASOWEJ innej zmiennej, która przyjmuje treść zaczytanego tytułu danego elementu!
            // <p>XXXX</p><p>galeria<br />podstrona</p><p>YYY</p>
        // trescTytulu = '<p>' + ktoraToGaleria + '</p><p><span>galeria</span><br />podstrona</p><p>' + g_biezaca_pozycja_galerii + '</p>';
        trescTytulu = '<p>' + ktoraToGaleria + '</p><p><span>galeria</span><br />podstrona</p><p>' + ktoraToPodstrona + '</p>';
        $( miejsceDocelowe ).html( trescTytulu ); // KONIEC UŻYCIA jako zmiennej tymczasowej innej zmiennej!
            
        miejsceDocelowe = $( g_miejsce_na_spis + " .tytul-odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

        	// nadawanie zmienionej formy wyświetlania odnośnika tekstowego	(tytuł galerii)
        trescTytulu = $( $odnosnikiTytuly[i] ).text();
        $( $odnosnikiTytuly[i] ).wrapInner('<h2></h2>'); // usuwanie obcej klasy link i wstawianie do wewnątrz <h2>
            if ( trescTytulu.length < 15 )
            { 
            $( $odnosnikiTytuly[i] ).find('h2').addClass('wyzszy'); // klasa ze zwiększonym odstępem pionowym - wyśrodkowanie w pionie
            }				
            if ( ( trescTytulu.length >= 24 ) && ( trescTytulu.length < 35 )  )
            { 
            $( $odnosnikiTytuly[i] ).find('h2').addClass('mniejszy'); // klasa z mniejszą czcionką o 25% pkt.
            }
            if ( trescTytulu.length >= 35 )
            { 
            $( $odnosnikiTytuly[i] ).find('h2').addClass('najmniejszy'); // kolejne zmniejszenie czcionki tytułu  dla <h2>
            }
        $( miejsceDocelowe ).html( $odnosnikiTytuly[i] );  // podmiana oryginalnej zawartości tytułu
     
        var tekstAlternatywny = trescTytulu + ' (' + ktoraToGaleria + ')';
        $( miejsceDocelowe ).parent().find('img').attr('alt', tekstAlternatywny);    // dopisanie ALT do skopiowanego <img> (nie zawierał ALT w źródle)
        }
    }

	// akcja wypełniacz - data
var $odnosnikiData = $( g_tag_do_podmiany_spis + " .card small.text-muted" );
	
    if ( $odnosnikiData.length > 0 )
    {
        for ( var i = 0 ; i < $odnosnikiData.length ; i++ )
        {
        miejsceDocelowe = $( g_miejsce_na_spis + " .data-odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

         // zmiana treści wyświetlanej, lekka modyfikacja tekstu przy dacie i godzinie
         var tekstDocelowy = $( $odnosnikiData[i] ).text();

         var dataOsobno = OdczytajDateIKonwertujJejPostac ( tekstDocelowy );
         dataOsobno = "dodano: " + dataOsobno;  // proste dopisanie prefiksu do daty
 
         var godzinaOsobno = OdczytajGodzine ( tekstDocelowy );
 
         $( miejsceDocelowe ).text( dataOsobno );
         $( miejsceDocelowe ).attr('data-godzina', godzinaOsobno); // dodanie atrybutu "godzina" do elementu z treścią tekstową z datą        
        }
    }
	
		// akcja wypełniacz - opis
var $odnosnikiOpis = $( g_tag_do_podmiany_spis + " .card p.card-text:first-of-type" );  // tylko pierwszy napotkany ".card-text" w ".card", drugi poniżej stanowi datownik danego albumu/galerii 
	
    if ( $odnosnikiOpis.length > 0 )
    {
        for ( var i=0 ; i < $odnosnikiOpis.length ; i++ )
        {
        miejsceDocelowe = $( g_miejsce_na_spis + " .opis-odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

        var trescOpisu = $( $odnosnikiOpis[i] ).text();
        $( miejsceDocelowe ).html( trescOpisu );

        // problemy z określeniem wysokości łącznej zaczytanej treści (tytuł + obrazek + data + opis) - często jeszcze w trakcie ładowania obrazka...
        // wysokość obrazka w zakresie (częste minimum wstawianych zdjęć ) [120...320]px (jak narzucono w css), treść opisu losowo długa;
        // wyskakują wysokości dla szablonu pojemnika - obrazki w trakcie (pierwszego) ładowania; dobra wysokość gdy już są w cache (pobrane wcześniej);
        // łatwiej jest ukrywać nadmiar w <div.opis>, niż mierzyć wysokość zaczytywanego obrazka (przechwytywanie zdarzenia ładowania) i skracać wysokość
        // tego <div> o pozostałą wysokość.... + zasłanianie tekstu przy końcu całego pojemnika prostokątem z przezroczystym gradientem/pełnym kolorem
            // ... niepotrzebna treść wyleciała
        } // for-END
    } // if-end $odnosnikiOpis

    	// nadal przegląd tego kontenera źródłowego, bo w innym podmienianym (spisie treści) też są te same klasy i identyczna struktura zagnieżdżenia!!! 

var liczbaPodstronListyGalerii = IleJestPodstronListyGalerii();

    if ( liczbaPodstronListyGalerii >= 1 ) {
    g_zaczytana_ilosc_paginacji_galerii = --liczbaPodstronListyGalerii;
    }  

/*     
var $listaPodstron = $( g_tag_do_podmiany_spis + ' ' + 'tr:last td[colspan=2] a.link_tresc' ); // ODSTĘP jest ważny (zawężanie kryterium też) -- odczyt zawartości z wyszukiwania ostatniego odnośnika (były wszystkie dostepne linki do psotsron)

	if ( $listaPodstron.length >= 1 )	// czy są jakieś odnośniki do podstron galerii? muszą być (wariant działającej już witryny)
	{	// pierwsza podstrona nie zawiera odnośników do przejścia +1 w przód / -1 w tył -- "starsze" i "nowsze"!
        // nie tylko to, że na pierwszej nie można się cofnąć, ale też nie można pójść o krok +1 do przodu do "starszych"
        // startujemy od kolejnej strony po pierwszej, ale ostatni zawiera ciąg "starsze", a później każdy kolejny zawiera "nowsze" na początku oraz "starsze" na końcu;
		// do tego pominięcie indeksu aktualnie wyświetlanej paginacji, nie jest już odnośnikiem tylko zwykłym tekstem (czerwonym i pogrubionym); 
        // liczba odnośników stanowi liczbę paginacji galerii, ale jest pomijany pierwszy i ostatni... więc potrzebna korekta -2 i +1 brakująca (aktualna paginacja)	
	var ilePodstronSpisuTresci = 0;
		for (var i=0 ; i < $listaPodstron.length ; i++ ) {    // ta pętla zawsze liczy dobrze, odrzuca ewentualne +/- podstrona, ale też dodaje bieżącą podstronę
		var nazwaPodstronyGalerii = $( $listaPodstron[i] ).text();  
            if ( ( nazwaPodstronyGalerii.search("nowsze") >= 0 ) || ( nazwaPodstronyGalerii.search("starsze") >= 0 ) ) 
			{
			continue;  // przeskok do kolejnego wywołania, bez zliczania takiego odnośnika z zadanym tekstem, a nie "numerem"  	
			}
		ilePodstronSpisuTresci++;
		} // for-END
	ilePodstronSpisuTresci++; // dodatkowe +1 konieczne do zliczenia aktualnej galerii, która nie generuje odnośnik -- a przecież ją wyświetlamy teraz
		
	g_zaczytana_ilosc_paginacji_galerii = ilePodstronSpisuTresci;	  // !!! muerto importante !!!
            // !!!!! WRÓCIĆ DO LINII POWYŻEJ PRZY KOLEJNYCH PRACACH ... UAKTUALNIĆ WARUNEK WYMAGANY DO DZIAŁANIA WITRYNY !!!!!  

        // ale zliczać można chyba łatwiej już wyświetlone podstrony, na zasadzie prostej inkrementacji? chyba...

// debugowanie -- wyprowadzenie nowych treści w statusie dla zaczytanych właśnie treści 
    // już niepotrzebne, tylko diagnostyka -- poniższe wybierało nagłówki oraz jako ostatnie paginacje dla wszystkich podstron galerii
        /*var $wierszeTabeli = $( g_tag_do_podmiany_spis + " tr:nth-child(4n-3)" ); // wybór każdego pierwszego "nagłóweka" w danej tabelce, także spis treści (całej paginacji)
            
            $wierszeTabeli.each( function() {
            $(this).css({ "border" : "1px dotted blue" });	
            }); // each-END 
        */
	
    //$wierszeTabeli.length	... już porzucona diagnostyka -- lepiej operować na zliczaniu odnośników od paginacji spisów galerii               
/*  $('p#status_galerii_spis').show( 100 ).html('Znaleziono '  + $wierszeTabeli.length + ' wierszy tabeli źródłowej oraz ' + $listaPodstron.length 
                                        + ' wszystkich podstron(-y) spisu treści (razem ze starsze i nowsze bez bieżącej).<br />Jesteś na ' 
                                        + g_biezaca_pozycja_galerii + '. stronie galerii.<br />'
                                        + 'A wcześniej zaczytano: "' + g_zaczytana_ilosc_paginacji_galerii + '" paginacji, a załadowano łącznie ' 
                                        + g_biezaca_pozycja_galerii + ' (vs ' + g_ilosc_zaczytanych_galerii + ') elementów galerii ze wszystkich ' 
                                        + g_ilosc_wszystkich_galerii + ' galerii');     */
    // } // if-END ( $listaPodstron.length >= 1 )

    
	// czyszczenie kontenera źródłowego, dla testów pozostaje paginacja galerii -- docelowo zerować cały pojemnik źródłowy
$( g_tag_do_podmiany_spis + ' > div' ).remove();  // po testach czyszczenie całej zawartości - aby nie przeklikiwać [Tab]em tego ewentualnie
    // efektywniej wywalić całość, oczywiście po odczytaniu wszelkich grup elementów i paginacji!  
    
    // obowiązakowe czyszczenie nadmiaru, warunek na szablon vs ilość załadowanych
var $nadmiar = $( g_miejsce_na_spis + " .kontener-odnosnik:has(h3)");
    if ( $nadmiar.length > 0 )  // jeśli sa jakieś nieuzupełnione szablony...
    {       // FOR lepszy, czy zostawić '$nadmiar.each( function() { ... }'? -- wydajność vs lepszy dostęp do elementów w jQ
        for ( var i = 0 ; i < $nadmiar.length ; i++ )
        {
            // informowanie o nieuzupełnionym szablonie niepotrzebne, ani jego znakowanie stylami; po prostu usunąć wzornik po jego znalezieniu
        // console.log('Znaleziono nadmiar w ilości ' + (i+1) + ' wpisu/wpisów z ' + $nadmiar.length + ' dla obiektu o id="' + $( $nadmiar[i] ).attr('id') + '", który usunięto.');
            // $( $nadmiar[i] ).css({ "backgroundColor" : "#933" });
        $( $nadmiar[i] ).remove();      // kasowanie pustych pojemników na odnośniki do galerii
        g_ilosc_zaczytanych_galerii--;	// !!! -- konieczna korekta ilości zaczytanych galerii (istotne przy ostatniej podstronie, bo zawsze są +5 załadowania)
        }
    }
	
	if ( g_ilosc_zaczytanych_galerii >= g_ilosc_wszystkich_galerii ) // warunkowo drugie czyszczenie, póki co tylko w formie wizualnego ostrzeżenia
	{
	//$( g_miejsce_na_spis + " .kontener-odnosnik:gt(" + ( g_ilosc_wszystkich_galerii - 1 )+ ")" ).css({ "backgroundColor" : "#666" });
    $( g_miejsce_na_spis + " .kontener-odnosnik:has(h3)").css({ "backgroundColor" : "#666" });  // masz <h3> to "wypad"	
    // $( g_miejsce_na_spis + " .kontener-odnosnik:has(h3)").remove();  // docelowo zamienić linię powyższą na tę linie, choć nie powinno mieć to miejsca
	}

/*  // wyświetlanie wyzwalaczy do ładowania spisu galerii już wykonane w pierwszym przebiegu
$('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii 
$('div#selektor').show();   // też natychmiast pokaż przycisk-kontener do wybiórczego ładowania wybranych treści
*/
} // GenerujSpisGalerii-END




                // * ** *** TO  PONIŻEJ  EDYTUJESZ *** ** *
    
function GenerujSpisWybranejGalerii ( kontenerZrodlowy, kontenerDocelowy, nrPodstrony )
{
/*  warto byłoby zespolić logikę w jedną funkcję, by tworzyć nowe elementy dla wybranej, jak również każdej kolejnej zaczytywanej galerii, ale...
    ...zbyt dużo warunków na wyszukiwanie i wstawianie (bądź nie) pewnych atrybutów dla elementów DOM, do tego liczenie globalne lub nie;
    pozostaje uproszczona wersja, co bazuje na poprzedniku, ale odrzuca część jego obliczeń i operacji;
    generować teraz całe elementy, czy fragmentami po kawałku jak wcześniej?  */
    
    // policzenie czegoś, co określi bezposrednio tę ilość, gdy brak wprost takowego kontenera w źródle... <img> się nada
var $tytuloweObrazki = $( kontenerZrodlowy + ' .card img' );
    
    if ( $tytuloweObrazki.length > 0)    // jeżeli są jakieś elementy to robimy całość kopiowania/przenoszenia
    {
    var nowyPojemnik = '';
            // tworzenie pustej struktury, do zapełnienia zaczytaną zawartością
        for ( var i = 1 ; i <= 5 ; i++ )	// maksymalnie pięc elementów się zaczyta, ewentalny nadmiar zostanie usunięty
        {
        // budowanie długiego zestawu pojemników
            // '<div id="kontener_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="kontener-odnosnik"><div class="tytul-odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="zdjecie-odnosnik">Zdjęcie nr ' + String(i + g_ilosc_zaczytanych_galerii) + '</div><div class="kontener-tekstowy-odnosnik"><div class="data-odnosnik">Data galerii</div><div class="opis-odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div><div class="dolna-zaslonka"></div><div class="szczegoly"><p>XXXX</p><p>galeria<br />podstrona</p><p>YYY</p></div></div>'
        //nowyPojemnik += '<div id="wybrany_kontener_odnosnik_' + String(i) + '" class="kontener-odnosnik"><div class="tytul-odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_wybrany_odnosnik_' + String(i) + '" class="zdjecie-odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener-tekstowy-odnosnik"><div class="data-odnosnik">Data galerii</div><div class="opis-odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum... nie będzie</div></div><div class="szczegoly">testowa zawartość</div></div>';
        nowyPojemnik += '<div id="wybrany_kontener_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="kontener-odnosnik"><div class="tytul-odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="zdjecie-odnosnik">Zdjęcie nr ' + String(i + g_ilosc_zaczytanych_galerii) + '</div><div class="kontener-tekstowy-odnosnik"><div class="data-odnosnik">Data galerii</div><div class="opis-odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div><div class="dolna-zaslonka"></div><div class="szczegoly"><p>XXXX</p><p><span>galeria</span><br />podstrona</p><p>YYY</p></div></div>';

        }
    $( kontenerDocelowy ).empty();  // zerowanie wcześniejszej zawartości
    $( kontenerDocelowy ).append( nowyPojemnik );  // wstawienie tych pięciu wygenerownych kontenerów-szablonów za jednym podejściem

    var miejsceDocelowe = '';

        // przed chwilą już wyszukano kolekcję zdjęć, teraz operujemy na atrybutach znaleziska 
        // przeklejanie zdjęć pomiędzy kontenerami
        for ( var i = 0 ; i < $tytuloweObrazki.length ; i++ )
        {
            // najpierw wylatuje cały atrybut klasy (po co się rozdraniać na obie klasy, i tak nie ma określonego stylu
            // tworzenie 'data-href' w celu podmiany zamiast domyślnego 'href' + usuwanie pierwotnego atrybutu
        $( $tytuloweObrazki[i] ).removeAttr('class').attr('data-href', $( $tytuloweObrazki[i] ).attr('href') ).removeAttr('href') ;      
        
        miejsceDocelowe = $( kontenerDocelowy + " .zdjecie-odnosnik:eq(" + i + ")" );

            // użycie funkcji naprawiającej ścieżkę do SRC pozwala przekleić obrazek (w trakcie ładowania) do innego obszaru dokumentu 
        $( miejsceDocelowe ).html( $tytuloweObrazki[i] ); // przeniesienie ze źródłowej lokalizacji
        }

    // akcja wypełniacz - tytuły
    var $szukaneElementy = $( kontenerZrodlowy + " .card-title > a" );

        if ( $szukaneElementy.length > 0 )
        {
        var ktoraToGaleria = '';
        var trescSzczegolow = '';
            
            for ( var i = 0 ; i < $tytuloweObrazki.length ; i++ )
            {
            // dodatkowo odczytanie numeru galerii, aby od razu to wyświetlić wraz z numerem podstrony
            ktoraToGaleria = $( $szukaneElementy[i] ).removeAttr('class').attr('href'); // pobranie 'href" + wcześniejsze wywalenie pustego 'class' z tego odnośnika
            ktoraToGaleria = OdczytajZOdnosnikaNumerGalerii( ktoraToGaleria );  // przypisuje docelową wartość w tej samej zmiennej
  
                // tworzenie 'data-href' w celu podmiany zamiast domyślnego 'href' i usuwanie tego pierwotnego atrybutu
            $( $szukaneElementy[i] ).attr('data-href', $( $szukaneElementy[i] ).attr('href') ).removeAttr('href')
                                    .attr('tabindex', 0);       // + dodanie tabindeksu
                
            trescSzczegolow = '<p>' + ktoraToGaleria + '</p><p><span>galeria</span><br />podstrona</p><p>' + String( parseInt( nrPodstrony ) ) + '</p>'; // w razie gdyby jakieś niewłaściwe wywołanie dla tego parametru 
            miejsceDocelowe = $( kontenerDocelowy + " .szczegoly:eq(" + i + ")" );
            miejsceDocelowe.html( trescSzczegolow );
                
                // ponowne posłużenie się tą samą zmienną dla innego równorzędnego kontenera
            miejsceDocelowe = $( kontenerDocelowy + " .tytul-odnosnik:eq(" + i + ")" );

            var tekstDocelowy = $( $szukaneElementy[i] ).text();
            $( $szukaneElementy[i] ).removeClass('link').wrapInner('<h2></h2>'); // usuwanie obcej klasy link i dodanie h2/h3
                if ( tekstDocelowy.length < 15 )
                { 
                $( $szukaneElementy[i] ).find('h2').addClass('wyzszy'); // klasa ze zwiększonym odstępem pionowym - wyśrodkowanie w pionie
                }				
                if ( ( tekstDocelowy.length >= 25 ) && ( tekstDocelowy.length < 35 )  )
                { 
                $( $szukaneElementy[i] ).find('h2').addClass('mniejszy'); // klasa z mniejszą czcionką o 25% pkt.
                }
                if ( tekstDocelowy.length >= 35 )
                { 
                $( $szukaneElementy[i] ).find('h2').addClass('najmniejszy'); // kolejne zmniejszenie czcionki tytułu  dla <h2>
                }
            $( miejsceDocelowe ).html( $szukaneElementy[i] );  // podmiana oryginalnej zawartości szablonu + ewentualna modyfikacja wielkości napisów

            var tekstAlternatywny = tekstDocelowy + ' (' + ktoraToGaleria + ')';
            $( miejsceDocelowe ).parent().find('img').attr('alt', tekstAlternatywny);    // dopisanie ALT do skopiowanego <img> (nie zawierał ALT w źródle)
            }
        }

    // akcja wypełniacz - data
    $szukaneElementy = $( kontenerZrodlowy + " .card small.text-muted" );

        if ( $szukaneElementy.length > 0 )
        {
            for ( var i = 0 ; i < $tytuloweObrazki.length ; i++ )
            {
            miejsceDocelowe = $( kontenerDocelowy + " .data-odnosnik:eq(" + i + ")" );

            tekstDocelowy = $( $szukaneElementy[i] ).text();
            var dataOsobno = OdczytajDateIKonwertujJejPostac ( tekstDocelowy );   // pobranie samej daty w zmienionej formie (separator)
            dataOsobno = "dodano: " + dataOsobno;   // rozszerzenie daty o treść poprzedzającą
            var godzinaOsobno = OdczytajGodzine ( tekstDocelowy );

            $( miejsceDocelowe ).text( dataOsobno );    // wyświetlenie samej daty
            $( miejsceDocelowe ).attr('data-godzina', godzinaOsobno); // dodanie atrybutu "godzina" do elementu z treścią tekstową z datą
            }
        }

    // akcja wypełniacz - opis
    $szukaneElementy = $( kontenerZrodlowy + " .card p.card-text:first-of-type" );

        if ( $szukaneElementy.length > 0 )
        {
            for ( var i = 0 ; i < $tytuloweObrazki.length ; i++ )
            {
            miejsceDocelowe = $( kontenerDocelowy + " .opis-odnosnik:eq(" + i + ")" );

            tekstDocelowy = $( $szukaneElementy[i] ).text();
            $( miejsceDocelowe ).html( tekstDocelowy );
            }

        // problemy z określeniem wysokości łącznej zaczytanej treści (tytuł + obrazek + data + opis) - często jeszcze w trakcie ładowania obrazka...
        // wysokość obrazka od (częste minimum) [120...320]px (jak narzucono w css), treść opisu losowo długa;
        // wyskakują wysokości dla szablonu pojemnika - obrazki w trakcie (pierwszego) ładowania, dobra wysokość gdy już są w cache (pobrane wcześniej)
        // łatwiej jest ukrywać nadmiar w <div.opis>, niż mierzyć wysokośc zaczytywanego obrazka (przechwytywanie zdarzenia ładowania) i skracać wysokość
        // <div> tekstowego o pozostałą wysokość całego pojemnika.... + zasłanianie tekstu przy końcu całego pojemnika prostokątem z gradientem/pełnym;
        // niepotrzebna treść wyleciała
        } // if-end opis

        // czyszczenie kontenera źródłowego, teraz już jasne, proste i EFEKTYWNE!
    $( kontenerZrodlowy ).empty();    // po wycięciu prawie całej zawartośc tabelki pozostaje tylko z niej spis podstron... który przejmował :focus !!! .empty() zeruje z elementów

    } // if-END ( $tytuloweObrazki.length > 0 )

    // obowiązkowe czyszczenie nadmiaru, warunek na element szablonu vs na ilość załadowanych
var $nadmiarPojemnikow = $( kontenerDocelowy + " .kontener-odnosnik:has(h3)");
    
    if ( $nadmiarPojemnikow.length > 0 )
    { 
        // na for(), już śmiga
        for ( var i = 0; i < $nadmiarPojemnikow.length ; i++ )
        {
        console.log('Znaleziono nadmiar w ilości ' + (i+1) + ' wpisu/wpisów z ' + $nadmiarPojemnikow.length + ' dla obiektu o id="' + $($nadmiarPojemnikow[i]).attr('id') + '", który usunięto.');
            //$(this).css({ "backgroundColor" : "#933" }); 
        $($nadmiarPojemnikow[i]).remove();
        }
    }
	
    // tylko przy debugowaniu podgląd dla jasności, wyrzucić lub wrzucić w komentarz
var $wierszeTabeli = $( kontenerZrodlowy + " tr:nth-child(4n-3)" );
	
    $wierszeTabeli.each( function() {
        $(this).css({ "border" : "1px dotted gray" });	
	}); // each-END
} // GenerujSpisWybranejGalerii-END



                // * ** *** TO  POWYŻEJ  EDYTUJESZ *** ** *




function OdczytajTresciOdnosnikaWybranejGalerii ( przeszukiwanyKontener, pozycjaElementuWSpisiePodstrony )
{
pozycjaElementuWSpisiePodstrony = parseInt( pozycjaElementuWSpisiePodstrony ) || 0; // zostawić na wypadek błędów z przekazanymi parametrami
var odczytaneNamiary = {};
var roboczaWartosc = $( przeszukiwanyKontener + " .card-title > a:eq(" + pozycjaElementuWSpisiePodstrony + ")" ); // zmienna ogólna - ale tu wyciąga HREF do zbudowania zapytania
odczytaneNamiary.tytul = roboczaWartosc.text();
odczytaneNamiary.adres = roboczaWartosc.attr('href'); // + normalizacja ścieżki na pełny zewnętrzny adres poniżej
odczytaneNamiary.adres = g_protokol_www + g_adres_strony + "/" + odczytaneNamiary.adres;
odczytaneNamiary.nrGalerii = OdczytajZOdnosnikaNumerGalerii( odczytaneNamiary.adres ); // popularyzaja użycia własnej funkcji narzędziowej
odczytaneNamiary.nrPodstronyGalerii = MaksymalnaIloscPodstronGalerii( odczytaneNamiary.nrGalerii );  // przeliczenie podstrony na podstawie odczytanego numer galerii
odczytaneNamiary.opis = $( przeszukiwanyKontener + " .card p.card-text:first-of-type:eq(" + pozycjaElementuWSpisiePodstrony + ")" ).text(); // niby nielogiczne, trochę na siłę ale 
roboczaWartosc = $( przeszukiwanyKontener + " .card img:eq(" + pozycjaElementuWSpisiePodstrony + ")").attr('src');
roboczaWartosc = g_protokol_www + g_adres_strony + "/" + roboczaWartosc ; // normalizacja ścieżki na pełny zewnętrzny serwer
odczytaneNamiary.srcObrazka = roboczaWartosc;
roboczaWartosc = $( przeszukiwanyKontener + " .card small.text-muted:eq(" + pozycjaElementuWSpisiePodstrony + ")" ).text();
odczytaneNamiary.data = OdczytajDateIKonwertujJejPostac( roboczaWartosc );
odczytaneNamiary.godzina = OdczytajGodzine( roboczaWartosc );
    
console.log('Przeszukując "' + przeszukiwanyKontener + '" natrafiono na datę publikacji "' + odczytaneNamiary.data + " o " + odczytaneNamiary.godzina + '" dla tytułu o indeksie +' + pozycjaElementuWSpisiePodstrony +
            '. ADRES_pełny: ', odczytaneNamiary.adres, ', NR_galerii: ', odczytaneNamiary.nrGalerii, 'NR_podstronyGalerii:  ', odczytaneNamiary.nrPodstronyGalerii);
    // kasowanie SRC z IMG dla WSZYSTKICH obrazków tytułowych galerii (na danej podstornie, w sąsiedztwie poszukiwanego), aby nie było problemu z GET dla otrzymanego wycinka witryny macierzystej
$( przeszukiwanyKontener + " .card img" ).removeAttr('src');
return odczytaneNamiary;    // zwróć obiekt 
} // OdczytajTresciOdnosnikaWybranejGalerii-END





// ---------- *** ----------  PRACA NA RZECZ APLIKACJI  ---------- *** ----------
    
function InicjalizujCSSzAktywnymJS ()  // UWAGA! style kierowane pod konkretne elementy oraz mozliwy hardkod
{
    // pomocnicza klasa-wskaźnik, dla podległości lub ogólny "włącz/wyłącz" dla zawartości gdy jest/brakuje JS
$('.glowny-kontener').removeClass('brak-js');
    // usuń ramkę z komunikatem o braku JS... już niepotrzebne -- powyższe + CSS załatwia sprawę lepiej
    // czy kasować element z komunikatem o braku skryptów z DOMu?
 $('#brak_skryptow').remove();    // wariant z kasowaniem

    // NIE POKAZUJ wyzwalacza dla gry, bo to styl INLINE (sprawa dobrze załatwiona poprzez kwerendy)
// $('#zagraj').css('display', 'block');

    // ale aktywuj animację dla loga witryny, niech choć tu będzie nieco ruchu
var slonceLogo = $('#slonce_logo');
slonceLogo.removeClass('startowe-przesuniecie');
    if ( slonceLogo.not(':hover') ) slonceLogo.removeClass('animacja-interaktywnego-slonca');  // zabierz trwałą animację oraz przemieszczenie, nadawane poprzez JS dla loga w stanie hover (uwaga, "mysza" może być nad elemenetem w tym czasie!)
// alternatywnie dla loga można po prostu wywalić atrybut klasy w całości (z całą zawartością), nie bacząc na skutki

    // pokazywanie prostokąta z aktualnymi wymiarami okna przeglądarki
// $('#wymiary').css('visibility', 'visible');  // zmienione poprzez CSS rodzica, klasę "brak-js"

}   // InicjalizujCSSzAktywnymJS-END


function PokazIUkryjPowiadomieniaOOdwiedzinach ( sekundowyCzasAnimacji )
{
sekundowyCzasAnimacji = parseInt( sekundowyCzasAnimacji ) || 5;
    if ( sekundowyCzasAnimacji < 5 ) sekundowyCzasAnimacji = 5; // ogólnie na (+), też by zapobiec dzieleniu przez 0

// $('.naglowek .powiadamiacz').css('display', 'block');   // pokaż każdą z ramek powiadomień by po chwili ukryć... ale gdy JS nieaktywny to nie zniknie
// $('.naglowek .powiadamiacz').css('visibility', 'visible');   // z wcześniej wpisanym w css 'display: none' to <div.pasek> się nie pojawia i nie animuje

    // zmniejszanie długości pasków powiadamiania - indywidualne czasy dla każdego z pasków z wspólnego zakresu
$('.naglowek .pasek').each( function() {
    // dodatkowe_sekundy = Math.floor( Math.random() * sekundowyCzasAnimacji ) / 2 ; // maksymalnie -49% parametru (też częsci całości)
    dodatkowe_sekundy = Math.floor( Math.random() * sekundowyCzasAnimacji ) / ( 2 + Math.floor( sekundowyCzasAnimacji % 5 ) );
    sekundowyCzasAnimacji -= dodatkowe_sekundy;    // tu ewentualna dekrementacja
    var aktualnyPasek = this;
    // $(this).css({ 'transition-duration' : sekundowyCzasAnimacji + 's', 'width' : 0 });    // tu wymuszona (i niejawna) konwersja liczby na string
    $(this).css('transition-duration', sekundowyCzasAnimacji + 's');
    var czasozabieracz = $(this).innerHeight;
    $(this).css('width', '0');    // tu wymuszona (i niejawna) konwersja liczby na string
    setTimeout( function() {
        $(aktualnyPasek).parent('div').slideUp(1000, function() {    // dla każdego z elementów powinna być osobna funkcja po ukończnieu animacji
            //$(this).remove();   // najlepiej usuwać dany kontener po animacji zniknięcia - tu zniknie każdy <div.powiadamiacz> z osobna
// TU (powyżej) WYŁĄCZONO USUWANIE ELEMENTU

        });
    }, sekundowyCzasAnimacji * 1010 );  // + minimalny nadkład opóźnienia
    
}); // each-$('.naglowek .pasek')-END
    
}   // PokazIUkryjPowiadomieniaOOdwiedzinach-END
    
    
function NaprawBrakujaceSRCwKontenerze ( przeszukiwanyKontener, kontenerGalerii )
{   // dodawanie działającej ścieżki dla obrazka, w spisie treści galerii oraz w każdej z podstron galerii
var srcObrazka = '';
var $obrazkiTytuloweGalerii = '';
    if ( !kontenerGalerii ) $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " .card img"); // ~(spis treści) to obrazki w galerii
    else $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " .card img"); // ?!?! TĘ SAMĄ STRUKTURĘ zwraca ?!?! teraz na spisie treści każda pozycja to jeden <img> i jeden <a> jako tytuł; <a> nie otacza <img>
    
	for (var i=0; i < $obrazkiTytuloweGalerii.length ; i++ )
	{
    srcObrazka = $($obrazkiTytuloweGalerii[i]).attr('src');
    srcObrazka = g_protokol_www + g_adres_strony + "/" + srcObrazka;
    srcObrazka = $($obrazkiTytuloweGalerii[i]).attr('src', srcObrazka);
    }
}  // NaprawBrakujaceSRCwKontenerze-END


function UsunBrakujaceSRCwKontenerze ( przeszukiwanyKontener, kontenerGalerii )
{
var $obrazkiTytuloweGalerii = '';
    if ( !kontenerGalerii ) $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " .card img");
    else $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " a:not(.link_tresc) img");
    
	for (var i=0; i < $obrazkiTytuloweGalerii.length ; i++ )
	{
    $($obrazkiTytuloweGalerii[i]).removeAttr('src');
    }
}  // UsunBrakujaceSRCwKontenerze-END


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


function InicjalizujPrzyciskiWyboruGalerii ()
{
g_wybrany_nr_galerii = Math.floor(Math.random() * 100) + 1;
// console.log('Ustalanie POCZĄTKOWYCH (np. ' + g_wybrany_nr_galerii + ') wartości pól formularza przeglądania galerii...');
$g_input_nr_galerii.val( g_wybrany_nr_galerii );
$g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
$g_suwak_nr_galerii.attr( 'max' , 105 ); // nie trzeba teraz?
}   // InicjalizujPrzyciskiWyboruGalerii-END


function InicjalizujPrzyciskiWyboruPodstronyGalerii ()	
{
g_wybrany_nr_podstrony_galerii = Math.floor(Math.random() * 5) + 1;
// console.log('Ustalanie POCZĄTKOWYCH (np. ' + g_wybrany_nr_podstrony_galerii + ') wartości pól formularza przeglądania podstronami galerii...');
$g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
$g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
$g_suwak_nr_podstrony_galerii.attr( 'max' , 6 ); // "trzeba, czy nie trzeba?" oto jest pytanie
}   // InicjalizujPrzyciskiWyboruPodstronyGalerii-END


function UstawSuwakiJakOdczytanoPierwszymPrzebiegiem ()
{
// odniesienie tej wartości do maksymalnej wartości przesuwu suwaka wyboru galerii + inicjowanie suwaka i inputa na tę wartość
// console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii i wyboru podstron ...');

g_wybrany_nr_galerii = g_ilosc_wszystkich_galerii;
    if ( g_wybrany_nr_galerii > 1 ) g_wybrany_nr_galerii = parseInt( g_wybrany_nr_galerii / 2 );    // ustawienie na połowie wartości przedziału

$g_suwak_nr_galerii.attr( 'max', g_ilosc_wszystkich_galerii );     // ustalenie zakresu maksymalnego dla suwaka
$g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
$g_input_nr_galerii.val( g_wybrany_nr_galerii );

g_wybrany_nr_podstrony_galerii = g_ilosc_wszystkich_paginacji_galerii;
    if ( g_wybrany_nr_podstrony_galerii > 1 ) g_wybrany_nr_podstrony_galerii = parseInt( g_wybrany_nr_podstrony_galerii / 2 );   // ustawienie na połowie wartości przedziału

$g_suwak_nr_podstrony_galerii.attr( 'max', g_ilosc_wszystkich_paginacji_galerii );
  // jednak bez ustawiania na maksimum, bo to okresla PIERWSZĄ podstronę spisu treści galerii, a nie ostatnią... więc zostaje automat albo 'MIN'
$g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
$g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
// console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii... PO -- g_wybrany_nr_galerii: ' + g_wybrany_nr_galerii + ', a POZYCJA: ' + atrybut_href_pozycja
//                                                + ' dla odnośnika: ' + atrybut_href );
}   // UstawSuwakiJakOdczytanoPierwszymPrzebiegiem-END


function NormalizujZakresPolaInput ( wartoscBiezaca, normalizacjaPolaPodstrony )
{
wartoscBiezaca = parseInt( wartoscBiezaca );   // konwersja do typu Number, całkowite liczby
    
    if ( !normalizacjaPolaPodstrony )   // zwykły tryb, dotyczy pola wyboru numeru galerii spośród zakresu
    {
        if ( ( wartoscBiezaca === undefined ) || ( isNaN( wartoscBiezaca ) ) )
        {
        wartoscBiezaca = 1;
        $g_input_nr_galerii.val( wartoscBiezaca );
        $g_suwak_nr_galerii.val( wartoscBiezaca );
        }

        if ( wartoscBiezaca <= 0 )
        {
        wartoscBiezaca = 1;
        $g_input_nr_galerii.val( wartoscBiezaca );
        $g_suwak_nr_galerii.val( wartoscBiezaca );
        }

        if ( wartoscBiezaca > g_ilosc_wszystkich_galerii )
        { 
        wartoscBiezaca = g_ilosc_wszystkich_galerii;
        $g_input_nr_galerii.val( g_ilosc_wszystkich_galerii );
        $g_suwak_nr_galerii.val( g_ilosc_wszystkich_galerii );
        }
    } 
    else    // tryb dla pola wyboru podstrony galerii, gdy zmienna == ('cokolwiek' / 2 && TRUE)
    {           // te same warunki, tylko zakresy i elementy formularza inne
        if ( ( wartoscBiezaca === undefined ) || ( isNaN( wartoscBiezaca ) ) )
        {
        wartoscBiezaca = 1;
        $g_input_nr_podstrony_galerii.val( wartoscBiezaca );
        $g_suwak_nr_podstrony_galerii.val( wartoscBiezaca );
        }

        if ( wartoscBiezaca <= 0 )
        {
        wartoscBiezaca = 1;
        $g_input_nr_podstrony_galerii.val( wartoscBiezaca );
        $g_suwak_nr_podstrony_galerii.val( wartoscBiezaca );
        }

        if ( wartoscBiezaca > g_ilosc_wszystkich_paginacji_galerii )
        {
        wartoscBiezaca = g_ilosc_wszystkich_paginacji_galerii;
        $g_input_nr_podstrony_galerii.val( g_ilosc_wszystkich_paginacji_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_ilosc_wszystkich_paginacji_galerii );
        }
    }

return wartoscBiezaca;
} // NormalizujZakresPolaInput-END


function SkorygujNumerDlaWyswietleniaWybranejGalerii ( nrGaleriiDocelowej )
{   // poniższa tablica zawiera wszystkie znane i niedostępne numery galerii - ZAKODOWANE NA SZTYWNO i zaprwne wymaga rozszerzenia listy w przyszłości...
var tabelaWykluczen = [ 589 ];    // !!! wstępnie od 2022.10.25/26 nie można wyświetlić tego albumu; nr galerii nie występuje na podstronie listy galerii, która zawiera numery sąsiednie (namierzono metodą kolejnych prób)
var korektaPrzesuniecia = 0;

    for ( var i = 0; i < tabelaWykluczen.length; i++ )  // poniższa pętla będzie liczyć poprawnie pod warunkiem "pilnowania" na bieżąco zawartości tabeli wykluczeń
    {       // kolejne elementy ZA elementem wykluczonym wymagają przesuniecia indeksu docelowego (korekta o +1 miejsce względem oczekiwanego/brakującego)  
        if ( ( nrGaleriiDocelowej <= tabelaWykluczen[i] ) && ( nrGaleriiDocelowej > 0 ) ) korektaPrzesuniecia++; // zwiększ przesuniecie za każdym razem, gdy wartość kwalifikuje się do korekty; zależy od długości listy brakujących/niedostępnych elementów      
    }

return nrGaleriiDocelowej + korektaPrzesuniecia;
} 


function ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera ( trescOdpowiedzi )
{
    // jeżeli otrzymano z serwera/pośrednika odpowiedź na żądanie GET, które w treści zawiera początek wewnętrznego komunikatu PHP o błędzie...
    if ( trescOdpowiedzi.indexOf('!-A-W-A-R-I-A-!') >= 0 ) return false;   // aby ustawić na błąd to co otrzymano, zamiast na wiadomość
return true;
}   // ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera-END


function UzupełnijNaglowekBiezacejGalerii ( galeria, diagnostyka )
{ // atrybuty { tytul, opis, srcObrazka, data, godzina } + o inne też można rozszerzyć, najlepiej aby był to pełny opis obiektu galerii
var trescDaty = "utworzono: " + galeria.data + " o " + galeria.godzina;   // teraz każdy z atrybutów osobno (ale ciąg scalany z obu), a nie jak wcześniej z klikniętej galerii skopiowane: "z dnia: 2016-02-25 18:45"
trescDaty = trescDaty.replace(/-/g, '.'); // gdyby nadal z separatorami typu "-" to zamień WSZYSTKICH DWÓCH łączników na kropki poprzez wyrażenie regularne

var trescHtml = ''; // <div id="biezaca_galeria_zamykanie" tabindex="0">&times;</div>';   // doklej przycisk na początku ;)
trescHtml += '<div class="kontener"><h2>Galeria nr <span>' + galeria.nrGalerii + '</span> &ndash; <span>' + galeria.tytul + '</span></h2>'; // najpierw <h2>, aby go ewentualny <img> z float nie wyprzedzał na wąskim ekranie
trescHtml += '<img src="' + galeria.srcObrazka + '" alt="' + galeria.tytul + '" title="' + galeria.tytul + '" />';
// trescHtml += '<h2>' + galeria.tytul + ' <span class="data">' + trescDaty + '</span></h2>';
trescHtml += '<p class="data">' + trescDaty + '</p>';
trescHtml += '<p>';
    if ( diagnostyka ) trescHtml += diagnostyka + '<br />';
trescHtml += galeria.opis + '</p></div>';

$('#nazwa_galerii').html( trescHtml );
PokazBiezacaGalerie(200);
} // UzupełnijNaglowekBiezacejGalerii-END


function KtoraPozycjaWGalerii ( nrGalerii )
{
return ( g_ilosc_wszystkich_galerii - nrGalerii ) % 5;  // "5" to stała krotności, po ile maksymalnie galerii na jedej podstronie spisu treści
}


function MaksymalnaIloscPodstronGalerii ()
{
return Math.floor( g_ilosc_wszystkich_galerii / 5 ) + Math.ceil( ( g_ilosc_wszystkich_galerii % 5 ) / 5 ) ; // // "5" to stała krotności, po ile maksymalnie galerii na jedej podstronie spisu treści
}


function ObliczMaksymalnaIloscPodstronGalerii ( nrGalerii )
{
return Math.ceil( nrGalerii / 5 );  // // "5" to stała krotności, po ile maksymalnie galerii na jedej podstronie spisu treści 
}


function MaksymalnaIloscPodstronDlaWyswietlanejGalerii ( iloscZdjecWGalerii )
{
return Math.ceil( iloscZdjecWGalerii / 9 ) ; // "9" to stała krotności, po naraz może być zdjęć na podstronie danej galerii
}


function IleJestPodstronListyGalerii ()
{
return g_ilosc_wszystkich_paginacji_galerii;
}


function KtoraPodstronaWGalerii ( nrGalerii )   // oblicza podstronę spisu treści na podstawie numeru danej galerii
{
var nrPodstronyGaleriiMAX = MaksymalnaIloscPodstronGalerii();	// ze zmiennej globalnej da się też już odczytać (obie MAX już istnieją, bo w pierwszym wywołaniu są określane)
//var ileRazy = Math.floor( nrGalerii / 5 ) ;  // teraz niepotrzebne, choć zachowane
//var ileReszty = nrGalerii % 5 ;         // teraz niepotrzebne
var pozycjaWGalerii = KtoraPozycjaWGalerii( nrGalerii );
var nrPodstronyGalerii;
var korekta = 0;    // wykryto różnice w przypadku pełnych podstron (czyli zawierających po pięć obrazków na OSTATNIEJ podstronie spisu treści)... wtedy == 1

    if ( ( g_ilosc_wszystkich_galerii % nrPodstronyGaleriiMAX ) == 0 ) korekta = 1; //  dodać +1 gdy galerie to wielokrotność pełnych spisów galerii
nrPodstronyGalerii = nrPodstronyGaleriiMAX - Math.floor( ( nrGalerii + pozycjaWGalerii ) / 5 ) + korekta;  // da się zrobić warunek inaczej, wzór bez dodatkowej zmiennej?
    //nrPodstronyGalerii = nrPodstronyGaleriiMAX - Math.ceil( ( nrGalerii + pozycjaWGalerii ) / 5 );
return nrPodstronyGalerii;
} // KtoraPodstronaWGalerii-END


function OdczytajZOdnosnikaNumerGalerii ( atrybutHref )
{
    // np. "http://zlobek.chojnow.eu/u_misiow_i_motylkow,a3.html" -- tytul_galerii, ",a" + nr_galerii + ".html" (a == album/galeria; !!!: niekdiedy w tytule też są "," !!!)
var numerGalerii = parseInt( atrybutHref.substr( atrybutHref.lastIndexOf(",a") + 2 ) ); // po przesunieciu o długość ciągu szukanego (",a") dostajemy "<liczba>.html" -- do konwersji i odrzucenia sufiksa-nie-liczby 
return numerGalerii;
}


function OdczytajZOdnosnikaNumerPodstronyGalerii ( atrybutHref )
{
    // np. "http://zlobek.chojnow.eu/u_misiow,a20,p2.html" -- tytul_galerii, "a" + nr_galerii + ",p" + nr_podstrony_galerii + ".html" (a == album/galeria; p == podstrona; !!!: czasem w tytule też są używane "," !!!)
var numerPodstronyGalerii = parseInt ( atrybutHref.substr( atrybutHref.lastIndexOf(",p") + 2, atrybutHref.length - 5 ) ); // po przesunieciu o długość ciągu szukanego (",p") dostajemy "<liczba>.html" -- do konwersji i odrzucenia sufiksa-nie-liczby 
    // dopowiedzenie: "http.../u_misiow,a20,p2.html"  <-- usuwanie przecinka i "p", które są o "2 przed" numerem podstrony galerii; treść z numerem kończy się ".html" - pomijane te 5 znaków przy krojeniu STRINGU)
return numerPodstronyGalerii;
}


function OdczytajZOdnosnikaNumerZdjeciaWGalerii ( atrybutHref )
{
    // np. '<a href="54,z45887,p1.html"><img ...></a>' -- nr_zdjecia_w_galerii, "z" + nr_zdjecia_globalny + ",p" + nr_podstrony_galerii + ".html" (z == zdjęcie; p == podstrona; !!!: parsujemy tylko treść HREF, <a> i img dla kontekstu !!!)
var numerZdjeciaWGalerii = parseInt ( atrybutHref.substr( 0, atrybutHref.indexOf(",z") ) ); // wystarczajacy byłby odczyt SAMEGO POCZĄTKU, JS "raczej" odrzuci wszystko co jest ZA liczbą i NIE JEST liczbą (raczej!?) 
return numerZdjeciaWGalerii;
}


function OdczytajZOdnosnikaGlobalnyNumerZdjecia ( atrybutHref )
{
    // np. '<a href="54,z45887,p1.html"><img ...></a>' -- nr_zdjecia_w_galerii, "z" + nr_zdjecia_globalny + ",p" + nr_podstrony_galerii + ".html" (z == zdjęcie; p == podstrona; !!!: parsujemy tylko treść HREF, <a> i img dla kontekstu !!!)
var numerZdjeciaGlobalny = parseInt( atrybutHref.substr( atrybutHref.lastIndexOf( ",z") + 2, atrybutHref.length - 8 ) ) // wystarczajacy byłby odczyt samego początku, JS "raczej" odrzuci wszystko co jest ZA liczbą i NIE JEST liczbą (raczej!?) 
return numerZdjeciaGlobalny;
}


function OdczytajDateIKonwertujJejPostac ( trescDatyIGodziny )
{
var nowyFormatDaty = trescDatyIGodziny.replace(/-/g, '.'); // zamiana WSZYSTKICH DWÓCH łączników na kropki poprzez wyraażenie regularne
var pozycjaSpacji = nowyFormatDaty.indexOf(" "); // miejsce podziału za datę, przed godzinę
nowyFormatDaty = nowyFormatDaty.substr( 0, pozycjaSpacji ); // !! skrócenie do postaci tekstu z samą datą (tak, bez godziny)

return nowyFormatDaty;
}


function OdczytajGodzine ( trescDatyIGodziny )
{
var godzinaPozycja = trescDatyIGodziny.lastIndexOf(" "); // podział na datę i godzinę
var godzina = trescDatyIGodziny.substr( godzinaPozycja + 1 ); // wydzielenie godziny; od tej spacji-oddzielnika do końca 

return godzina;
}


function InicjalizujRamkiLadowania ()
{
// oto wstępna, prosta forma; tu rejestrowane są wszystkie powiadomienia o ładowaniu konkretnych zawartości - wymaga podpięcia do witryny
// ... póki co trzy notyfikacje - IDeki: "wczytywanie_podstrona" (podstrona galerii), "wczytywanie_spis", "wczytywanie_wybrane_galerie_spis" 
//    (dopisać ewentualne kolejne notyfikacje ładowania)
    g_prezentacja_wczytywania = [   // raczej przypisać elementy z HTMLa tu
        {   element : 'wczytywanie_spis',
            ile : 0 
        },
        {   element : 'wczytywanie_wybrane_galerie_spis',
            ile : 0 
        },
        {   element : 'wczytywanie_podstrona',
            ile : 0 
        }
    ];

}   // InicjalizujRamkiLadowania-END


function PokazRamkeLadowania ( element, czasPokazania )
{
    if ( ( !czasPokazania ) || ( czasPokazania < 0 ) ) czasPokazania = 100; // domyślnie
var wybranyElement = -1,
    krotnoscElementu = -1;
    
    switch ( element )  // też w odwołaniu do kolejnosci typu elementu względem umieszcznenia na www
    {
        case 'spis':
        case 0:
                // tymczasowe lub docelowe wyłączenie obsługi dla pierwszego powiadomienia
            wybranyElement = g_prezentacja_wczytywania[0].element;   // ZAKOMENTOWANE == brak przypisywania elementu do  pokazywania (/ukrywania)
            g_prezentacja_wczytywania[0].ile++;
            krotnoscElementu = g_prezentacja_wczytywania[0].ile;
            PokazAnimacjeLadowaniaDlaPrzycisku();    // dodatkowe powiadomienie wewnątrz przycisku ładowania kolejnej podstrony
            break;

        case 'wybrane_galerie_spis':
        case 1:
            wybranyElement = g_prezentacja_wczytywania[1].element;
            g_prezentacja_wczytywania[1].ile++;
            krotnoscElementu = g_prezentacja_wczytywania[1].ile;
            break;
            
        case 'podstrona':
        case 2:
            wybranyElement = g_prezentacja_wczytywania[2].element;
            g_prezentacja_wczytywania[2].ile++;
            krotnoscElementu = g_prezentacja_wczytywania[2].ile;
            break;
    } // switch-END ( element )
        
    if ( ( wybranyElement != -1 ) && ( krotnoscElementu > 0 ) )
    { 
        if ( krotnoscElementu == 1 ) $('#' + wybranyElement ).find('span').text('');
        else $('#' + wybranyElement ).find('span').text(' x ' + krotnoscElementu);  // z lewej i tak jedna spacja będzie
     $('#' + wybranyElement ).show( czasPokazania );
        // !!! MA POZOSTAĆ WZORCOWE ZAMIAST POWYŻSZYCH: $('#' + wybranyElement ).show( czasPokazania ); // !!!
    }
}   // PokazRamkeLadowania-END

    
function UkryjRamkeLadowania ( ktoryElement, czasUkrycia )    // zachowanie i wewnętrzne warunki jako całkowite przeciwieństwo poprzednika - PokazRamkeLadowania()
{
    if ( ( !czasUkrycia ) || ( czasUkrycia < 0 ) ) czasUkrycia = 100; // domyślnie
var wybranyElement = -1,
    krotnoscElementu = -1;
    
    switch ( ktoryElement )  // też w odwołaniu do kolejności typu elementu względem umieszczenia na www
    {
        case 'spis':
        case 0:
                // tymczasowe lub docelowe wyłączenie obsługi dla pierwszego powiadomienia
            wybranyElement = g_prezentacja_wczytywania[0].element;  // ZAKOMENTOWANE == brak przypisywania elementu do ukrywania (/pokazywania)
            g_prezentacja_wczytywania[0].ile--;
            krotnoscElementu = g_prezentacja_wczytywania[0].ile;
            UkryjAnimacjeLadowaniaDlaPrzycisku();   // powiązana dodatkowa treść wewnątrz przycisku ładowania kolejnej podstrony z listy galerii
            break;

        case 'wybrane_galerie_spis':
        case 1:
            wybranyElement = g_prezentacja_wczytywania[1].element;
            g_prezentacja_wczytywania[1].ile--;
            krotnoscElementu = g_prezentacja_wczytywania[1].ile;
            break;
            
        case 'podstrona':
        case 2:
            wybranyElement = g_prezentacja_wczytywania[2].element;
            g_prezentacja_wczytywania[2].ile--;
            krotnoscElementu = g_prezentacja_wczytywania[2].ile;
            break;
    } // switch-END ( ktoryElement )
      
    // MA POZOSTAĆ PONIŻSZE: ... zamiast tego co po drugim komentarzu
//    if ( ( wybranyElement != -1 ) && ( krotnoscElementu <= 0 ) ) $('#' + wybranyElement ).hide( czasUkrycia );
    if ( krotnoscElementu == 1 ) $('#' + wybranyElement ).find('span').text('');
    if ( krotnoscElementu > 1 ) $('#' + wybranyElement ).find('span').text(' x ' + krotnoscElementu );

    if ( ( wybranyElement != -1 ) && ( krotnoscElementu <= 0 ) ) $('#' + wybranyElement ).hide( czasUkrycia );
}   // UkryjRamkeLadowania-END


function PokazAnimacjeLadowaniaDlaPrzycisku ()
{
    // na bazie logiki wyświetlania dowolnego z trzech powiadomień... ale tu wskazane i specyficzne dla spisu galerii
// var scrObrazka = 'grafiki/slonce_60x60.png';  // nadawany w statycznej wersji i ukrywany/pokazywany poprzez style CSS
    // albo dać mniejszy obrazek, i tak skalowanie do około 38x38px: 'grafiki/slonce_40x40.png'
var wybranyElementWczytywaniaID = '#' + g_prezentacja_wczytywania[0].element,  // wyświetlaj pomocniczą animację tylko wtedy, gdy jest wyświetlane określone powiadomienie
    $wybranyElementWczytywania = $( wybranyElementWczytywaniaID ),
    krotnoscElementu = g_prezentacja_wczytywania[0].ile,
    $elementPrzycisku = $('#zaladuj_galerie_spis');     // jawny selektor identyfikatora elementu, wewnątrz którego będzie animacja

    // if ( $wybranyElementWczytywania.is(':visible') )  // pokaż tylko wtedy gdy pomiędzy elementami jest wysoki segment z wybraną podstroną galerii
    // {
        // wyłączenie wyświetlania krotności wewnątrz przycisku ładowania
        if ( ( $wybranyElementWczytywania.length != -1 ) && ( krotnoscElementu > 0 ) ) // dodatkowa weryfikacja, wartości na podstawie funkcji PokazRamkeLadowania()
        { 
            // if ( krotnoscElementu == 1 ) $elementPrzycisku.find('img').attr( 'src', scrObrazka ).addClass('animacja').next('span').text('');  // po prostu pokaż słoneczko
            // if ( krotnoscElementu == 1 ) $elementPrzycisku.addClass('animacja').find('img').attr( 'src', scrObrazka ).next('span').text('');  // wariant z nadawaniem klasy, a nie poszczególnych atrybutów (tu ich więcej by było) 
    // jeszcze łatwiejsze ukrywanie IMG wzorcowymi stylami oraz operowanie klasą rodzica (żonglerka atrybutami niepotrzebna)!
        if ( krotnoscElementu == 1 ) $elementPrzycisku.addClass('animacja');  // NAJPROSTSZY WARIANT Z OPEROWNIEM ANIMACJĄ NA OBRAZKU 
                // porzucenie wyswietlania krotnosci naciśniącia przyciku i aktywowanego ładowania kolejnej podstrony

            /* if ( krotnoscElementu == 1 ) $elementPrzycisku.addClass('animacja').find('span').text('');  // wariant z nadawaniem klasy, a nie poszczególnych atrybutów (tu ich więcej by było) 
            else $elementPrzycisku.find('span').text(' x ' + krotnoscElementu);  // pokaż grafikę, ale też i krotność (grafika już ustawiona dla pierwszego nadania wartości)
            */  // nie pokazuj krotności
        }
    // }
}   // PokazAnimacjeLadowaniaDlaPrzycisku-END

    
function UkryjAnimacjeLadowaniaDlaPrzycisku () {
    // na bazie logiki wyświewtlania dowolnego z trzech powiadomień... ale tu wskazane i specyficzne dla spisu galerii
// var scrObrazka = 'grafiki/slonce_60x60.png';  // niepotrzebny hardkod, teraz od razu umieszczane na stronie i ukrywane stylami  
    // albo dać mniejszy, i tak skalowanie do około 25x25px, max 38x38px: 'grafiki/slonce_40x40.png'
var wybranyElementWczytywaniaID = '#' + g_prezentacja_wczytywania[0].element,  // wyświetlaj pomocniczą animację tylko wtedy, gdy jest wyświetlane określone powiadomienie
    $wybranyElementWczytywania = $( wybranyElementWczytywaniaID ),
    krotnoscElementu = g_prezentacja_wczytywania[0].ile,
    $elementPrzycisku = $('#zaladuj_galerie_spis');     // jawny selektor identyfikatora

    // if ( $wybranyElementWczytywania.is(':visible') )  // "pokaż tylko wtedy gdy pomiędzy elementami jest wysoki segment z wybraną podstroną galerii" ?! czy chodzi o ten element?
    // {
            // ewentualne odswieżenie widoku dla zmian ilościowych lub zabranie elementu z animacją
// konieczność kombinowanego podejścia z uwagi na nieukrywanie elementu po usunięciu atrybutu SRC w starszych przeglądarkach (raz wpisany i pokazany nie usuwa się)
        //if ( krotnoscElementu == 1 ) $elementPrzycisku.addClass('animacja').find('img').attr( 'src', scrObrazka ).next('span').text('');  // odświeżenie statusu i pokazanie samej grafiki, bez tekstu liczbowego
// łatwiejsze ukrywanie IMG stylami przez operowanie klasą rodzica!
        // tylko notyfikacja dla aktywnynego wczytywania
        if ( krotnoscElementu == 1 ) $elementPrzycisku.addClass('animacja');

        /* 
        if ( krotnoscElementu == 1 ) $elementPrzycisku.addClass('animacja').find('span').text('');  // odświeżenie statusu i pokazanie samej grafiki, bez tekstu liczbowego
        if ( krotnoscElementu > 1 ) $elementPrzycisku.find('span').text(' x ' + krotnoscElementu);  // pokaż grafikę, ale też i krotność
        */ // tylko animacja, bez aktualnej ilości wczytywań w tle
            // usunięcie ścieżki do grafiki oraz ewentualnego tekstu krotności żądania
    //    if ( ( wybranyElementWczytywania != -1 ) && ( krotnoscElementu <= 0 ) ) $elementPrzycisku.find('img').removeClass('animacja').removeAttr( 'src' ).next('span').text(''); // wariant z większą ilością modyfikacji atrybutów    
        // if ( ( wybranyElementWczytywania != -1 ) && ( krotnoscElementu <= 0 ) ) $elementPrzycisku.removeClass('animacja').find('img').removeAttr( 'src' ).next('span').text('');    // tu zmieniamy klasę, która sama zmienia kilka wartości atrybutów
        if ( ( $wybranyElementWczytywania.length != -1 ) && ( krotnoscElementu <= 0 ) ) $elementPrzycisku.removeClass('animacja').find('span').text('');    // tu zmieniamy klasę, która sama zmienia kilka wartości atrybutów
    // }
}   // UkryjAnimacjeLadowaniaDlaPrzycisku-END    
    
    
function GenerujPowiadomienieOBledzie ( opcjePrzekazane )
{
var elementRodzica = '#galeria_spis',
    klasaAnimacji = 'animacja-zolty-blysk', // określony na sztywno 
    budowanyElement = '';
var opcjeDomyslne = {
    tytul : 'Wystapił błąd ogólny!',
    tresc : '&lt;tu szczegóły błędu...&gt;',
    ikonaZamykania : true, 
        jednorazowy : true, // scalić to z powyższym (lub odwrotnie), bo wskzanie na tę samą flagę
    tryb : 'dodawanie',     // dodawanie / zamiana / ... - też częściowo tożsame z tym co wyżej
        nadanaKlasa : 'blad', // .blad / .blad-dolaczenia / .blad_odswiez
        dodatkowaKlasa : false, // '' / .blad-dolaczenia / .blad_odswiez -- dwie powyższe do rezygnacji po precyzyjnej kategoryzacji przycisków
    przyciskAkcjiOdswiez : false,
    trescPrzyciskuAkcjiOdswiez : 'Odśwież stronę',
    przyciskAkcjiDolacz : false,
    trescPrzyciskuAkcjiDolacz : 'Powtórz działanie',
    animacja : true
};
    // budowanie po kolei z warunkowych fragmentów + zakładamy, że przekazana treść stanowi bezpieczny HTML ... pewnie dowolny framework frontendowy zlepiłby to lepiej w prawidłowego htmla

var opcje = $.extend ( {}, opcjeDomyslne, opcjePrzekazane );
    
budowanyElement = '<div class="' + opcje.nadanaKlasa; 

    if ( opcje.animacja ) budowanyElement += " " + klasaAnimacji; // dopisanie elementu dodatkowej klasy z przypisaną animacją
    if ( opcje.dodatkowaKlasa ) budowanyElement += " " + opcje.dodatkowaKlasa;
budowanyElement += '">'     // zakończnie tagu otwierającego pojemnik
    + '<h2 class="blad-tytul">' + opcje.tytul + '</h2>'
    + '<div class="blad-tresc">'
    + '<div class="blad-ikona">!</div>';
    //    + '<p>Szczegóły powstałego błędu:<br />' // rezygnacja z "zajmowacza miejsca"
        if ( opcje.tryb == 'zamiana' )
        {
            // generowanie treści sztucznej z doklejeniem tego do przekazanego komunikatu o błędzie (przed lub za treścią)
            // tu weryfikacja, czy powiadomienie tego typu już jest na stronie -> ewentualne pobranie wartości
        }
        else
        {
        budowanyElement += '<p>' + opcje.tresc + '</p>';  
        }
        
        if ( ( opcje.przyciskAkcjiOdswiez ) || ( opcje.przyciskAkcjiDolacz) )    // wersja zagmatwana
        {   // (-): NIGDY WIĘCEJ SKŁADANIA HTMLa Z POSTACI TEKSTOWEJ!!!
        budowanyElement += '<h4>';
            if ( opcje.przyciskAkcjiOdswiez )
            {
            budowanyElement += '<button class="odswiez_strone">' + opcje.trescPrzyciskuAkcjiOdswiez + '</button> ';
            }
            if ( opcje.przyciskAkcjiDolacz )
            {
            budowanyElement += '<button id="przywroc_niewczytane" title="Przycisk reaguje tylko podczas niesymulowanej awarii (w trybie prawidowej komunikacji). Wymuś prawidłową komunikację by kontynuować.">' + opcje.trescPrzyciskuAkcjiDolacz + '</button> ';   // określić klasę lub id dla przycisku 
            }
        budowanyElement += '</h4>'; 
        }     
budowanyElement += '</div>'; // zamykacz dla div.blad-tresc
    
    /* if ( ( opcje.nadanaKlasa == 'blad-dolaczenia' ) || ( opcje.nadanaKlasa == 'blad_odswiez' ) )    // wymaga dodania przycisku do odświeżenia strony
    {
    budowanyElement = budowanyElement + '<button class="odswiez_strone">Odśwież stronę</button>' ;
    // +++  wstawienie przycisku do oświeżenia witryny
    }*/
/*        if ( ( opcje.przyciskAkcji ) && ( opcje.dodatkowaKlasa != '' ) )    // wymaga dodania przycisku do odświeżenia strony
    {
        // działania zależne od ewentualnej dołączonej klasy (dwie pozycje wzajemnie wykluczające się) -- przy ewentualnym trzecim (hmm... czwartym) rodzaju błędu zastosować 'switch'
        if ( opcje.dodatkowaKlasa == 'blad-dolaczenia' ) budowanyElement = budowanyElement + '<button class="' + opcje.dodatkowaKlasa + '">' + opcje.trescPrzyciskuAkcjiDolaczanie + '</button>';
        else if ( opcje.dodatkowaKlasa == 'blad_odswiez' ) budowanyElement = budowanyElement + '<button class="' + opcje.dodatkowaKlasa + '">' + opcje.trescPrzyciskuAkcjiOdswiez + '</button>';
    // +++  wstawienie przycisku do oświeżenia witryny
    }  */

    if ( opcje.ikonaZamykania )    // doklejenie standardowego trybu działania: "krzyżyk/iksior" do zamykania całego powiadomienia (obszaru z treścią w rodzicu lub przodku) 
    {
    budowanyElement = budowanyElement + '<div class="zamykanie zamykanie-komunikatu-bledu" tabindex="0">&times;</div>'; // dodatkowa klasa, aby wyróżnić i reagować na tego typu przyciski (i kategorię komunikatów!)
    }
budowanyElement = budowanyElement + '</div>' ;  // znacznik kończący strukturę powiadomienia o błędzie
//...


$( elementRodzica ).prepend( budowanyElement ); // dopisanie elementu do strony
    
//    if ( opcje.dodatkowaKlasa ) $( elementRodzica + "div:first-child" ).addClass( opcje.dodatkowaKlasa );   // jeżeli ma mieć dodatkowa klasę ten element, to wstawienie jej po wyrenderowiu
    
}   // GenerujPowiadomienieOBledzie-END


function GenerujDomyslnePowiadomienieOBledzieSerwera ( xhr, status )    // użyć parametryzowanego komunikatu o błędzie?
{
var komunikatOBledzie = "Błąd w dostępie do treści serwera macierzystego lub użyto niewłaściwego adresu. Otrzymano prawidłową odpowiedź, ale bez oczekiwanych elementów.<br />Diagnostyka: kod błędu nr " + xhr.status + " (" + xhr.statusText.toLowerCase() + ") o statusie \"" + status + "\".";
GenerujPowiadomienieOBledzie({ tytul: 'Problem globalny z załadowaniem treści!', tresc: komunikatOBledzie });    // semi projeska lepsza niż wcześniejszy standard
PrzewinEkranDoElementu('div.blad', 500);
}   // GenerujDomyslnePowiadomienieOBledzieSerwera-END


function ZmienTrescKomunikatu ( elementKomunikatu, komunikatTytul, komunikatTresc ) // tworzy nowe zawartości tekstowe (+html) na podstawie parametrów
{
    if ( $( elementKomunikatu ).length > 0 )
    {
        if ( $( elementKomunikatu ).length > 1 ) elementKomunikatu = $( elementKomunikatu )[0];    // w razie gdyby to jednak jakaś kolekcja była
        else elementKomunikatu = $( elementKomunikatu );    // poprawka na element jQuery
    elementKomunikatu.removeClass('animacja-zolty-blysk').css('color');    // zabranie klasy z danego węzła + KONIECZNA "bzdurna" akcja (np. odczyt atrybutu, który i tak idzie w niebyt)
    elementKomunikatu.addClass('animacja-zolty-blysk'); // dodanie klasy celem każdorazowego i jednokrotnego wystartowania animacji
        
    elementKomunikatu.find('h2.blad-tytul').text( komunikatTytul );   // edycja treści i tytułu w zawartości ramki
    elementKomunikatu.find('div.blad-tresc > p').html( komunikatTresc );
    }
}   // ZmienTrescKomunikatu-END
    
    
function UsunKomunikatLubZmienNumeracjeWTresci ( elementKomunikatu )    // usuwa komunikat lub modyfikuje (zmniejsza) jego numerację, zależnie od przeprowadzonech chwilę wcześniej dekrementacji listy błędów
{                                                           // UWAGA: operuje na pomniejszonej (aktualnej) numeracji błędów
    if ( $( elementKomunikatu ).length > 0 )
    {
        if ( $( elementKomunikatu ).length > 1 ) elementKomunikatu = $( elementKomunikatu )[0];    // w razie gdyby to jednak jakaś kolekcja była
        else elementKomunikatu = $( elementKomunikatu ) ; // przekształć wskazany elelemnt na jQuery (owiń tym obiektem)

    var poprzedniBladPodstrony = 0, // ta i kolejne zmienne zostaną obliczone później, o ile jest sens
        tekstTytulu = "";

        // operujemy na stanie danych aplikacji, zatem odwołanie do zmiennej globalnej, zamiast odczytywać DOM z ilości aktualnie wyświetlonych komunikatów
        if ( g_suma_bledow_dolaczania < 1 ) // jeżeli był to pierwszy/jedyny błąd dołączania -- usuń okno komunikatu
        {
        elementKomunikatu.slideUp(1000, function() { $(this).remove(); });  // usuń okno z komunikatem po animacji
        }
        
        if ( g_suma_bledow_dolaczania >= 1 )  // jeżeli to kolejny błąd dołączania -- zmień treści w wyświetlanym oknie komunikatu (zmniejsz liczby)
        {
        // do LIFO, określenie wcześniejszego błędu - odczytanie przedostatniego elementu z nieobsłużonych żądań
            // zmiana w zasadniczej treści komunikatu
        elementKomunikatu.find('strong:first-of-type > span').text( g_suma_bledow_dolaczania );
        poprzedniBladPodstrony = PobierzOstatnieNieodebrane().adresZasobu;
        poprzedniBladPodstrony = parseInt( poprzedniBladPodstrony.substr( poprzedniBladPodstrony.lastIndexOf(",p") + 2 ) ); // numer podstrony niewczytanej
        elementKomunikatu.find('strong:last-of-type > span').text( poprzedniBladPodstrony );
        tekstTytulu = elementKomunikatu.find('.blad-tytul').text(); // odczytanie tytułu komunikatu (choć niemal zawsze stała, inny postfiks)
            
            if ( g_suma_bledow_dolaczania == 1 )   // usuń "x" i krotność w tytule
            {    
            tekstTytulu = tekstTytulu.substr(0, tekstTytulu.lastIndexOf(' x') );    // do ostatniej spacji włącznie?
            elementKomunikatu.find('.blad-tytul').text( tekstTytulu );  // obcięcie treści z numeracją
            }
            else    // po prostu zmień krotność w tytule
            {
            tekstTytulu = tekstTytulu.substr(0, tekstTytulu.lastIndexOf(' x')+2 );    // treść do ostatniego "x" włącznie
            elementKomunikatu.find('.blad-tytul').text( tekstTytulu + g_suma_bledow_dolaczania );  // dodanie nowej numeracji
            }
        // zawsze też odśwież treść istniejącego komunikatu i zwróc uwagę obserwatora na to
        elementKomunikatu.removeClass('animacja-zolty-blysk').css('color');    // zabranie klasy z danego węzła + KONIECZNY "bzdurny" odczyt atrybutu z danego węzła!
        elementKomunikatu.addClass('animacja-zolty-blysk'); // dodanie klasy celem każdorazowego i jednokrotnego wystartowania animacji
        }
    }   // if-( g_suma_bledow_dolaczania > 1 )-END
}   // UsunKomunikatLubZmienNumeracjeWTresci
    
function WystartujDebuggerLokalny ( czyZepsuc, nieTylkoLokalnie )
{
// bez domyślnych parametrów staruje w tle i nie szkodzi zachowaniu;
// generalnie też bez rozgraniczenia LOCALHOST vs INNE_SERWERY i inne zachowanie domyślne
//      tylko powiadomienie startuje w LOCALHOŚCIE (domyślnie jako środowisko DEV)
 
// definicje funkcji wewnątrz wywołania - podległości... tylko, gdy mamy LOKALNE uruchamianie (też testowanie) ;)
    /*  if ( window.location.host == 'localhost' || nieTylkoLokalnie )  // też drugi parametr
    {   */
    function NaprawAjaksa ()
    {
    g_przechwytywacz_php = "./przechwytywacz.php";    // ewentualnie użyć "stałych", aby nie powodować błędu i hardkodu w kilku miejscach
    g_przechwytywacz_php_zapytanie = "?url_zewn=";
        // + wizualizacja zmian tłem
    $('.status-ajaksa').removeClass('status-awaria').addClass('status-norma');
    }

    function ZepsujAjaksa ()
    {
    g_przechwytywacz_php = "./przepuszczacz.php";  // dodatkowo zepsuto zapytanie
    //g_przechwytywacz_php = "./przechwytywacz.php";  // powrót do prawidłowgo oryginału z "przepuszczacza"
    g_przechwytywacz_php_zapytanie = "?url_dupa=";
        // wizualizacja zmian dla tła
    $('.status-ajaksa').removeClass('status-norma').addClass('status-awaria');
    }

    // zarejestruj operacje zdarzeń - dwa przeciwstawne przyciski
    $('.zepsuj').click( function () {
        ZepsujAjaksa();
            if ( $('#awaria_na_stale:checked').length == 1 ) AwariaWLocalStorage() ;    // ustawianie konkretnej wartości dla "awarii" lub czyszczenie pamięci dla tej komórki
            else ZerujLocalStorage();
    });    

    $('.napraw').click( function () {
        NaprawAjaksa();
            if ( $('#awaria_na_stale:checked').length == 1 ) NaprawaWLocalStorage() ;    // ustawianie konkretnej wartości dla "poprawnego działania" lub czyszcznie komórki pamięci
            else ZerujLocalStorage();
    });

    // na koniec wymuś automatyczny start "naprawy" -- stan bieżący winien być prawidłowy (chyba, ze określony parametr opcjonalny)
NaprawAjaksa();

        // odczytanie stanu ze zmiennej...

    // ....
        //     + dopracować PONIŻSZE warunki -- od nich zależy inicjownanie belki sterującej przy autostarcie programu...
    // ...  + localStorage.removeItem()

        // inicjowanie stanu AJAKSA:
    if ( localStorage.getItem('awariaNaStale') == '<AWARIA!>' )
    {
    $( '#awaria_na_stale').prop('checked', true);   // ... ewentualnie zaznacz przełącznik na [X]
        //  ...
    }    
        // odczytanie  stanu zminnej i ewentualna akcja (powtórzone 50% warunku :/)
    if ( ( localStorage.getItem('awariaNaStale') == '<AWARIA!>') || ( czyZepsuc == 'ZEPSUJ!' ) )
    {
        // ...
    ZepsujAjaksa();
    }

    if ( window.location.host == 'localhost' || nieTylkoLokalnie ) PokazDebuggowanie(); // drugi parametr też ma znacznie 
        //tylko DEV lub z tym bym poczekał na reakcje - kliknięcie własciwego przycisku... później usunąć po testach komunikatów o błędach
    
    //} // if ( localhost )-END //... o czym wtedy myślałem?! -- nie zrobi nic dla innych serwerów
    
} // WystartujDebuggerLokalny-END

function OdczytajLocalStorage ()
{
var zawartoscDebuggowaniaLocalStorage = localStorage.getItem('awariaNaStale');    
    if ( ( zawartoscDebuggowaniaLocalStorage == '<AWARIA!>' ) || ( zawartoscDebuggowaniaLocalStorage == '<BRAK AWARII>' ) ) // czy to są prawidłowe wartości stałych?
    {    
    return zawartoscDebuggowaniaLocalStorage;
    }
return false;
}

function InicjalizujLocalStorage ()   // jaki jest cel tej funkcji, skoro nie jest używana?
{
var coWStorage = OdczytajLocalStorage;
    if ( coWStorage == '<AWARIA!>' || coWStorage == '<BRAK AWARII>')    // "zaptaszenie" checkboksa tylko, gdy jedna z tych wartość jako zawartość
    {
    $( '#awaria_na_stale').prop('checked', true);
    PokazDebuggowanie();    // bardzo dobre miejsce - gdy ustawione jest coś w pamięci przeglądarki to na starcie pokaż pasek debugowania (+)
    return COS; // co ma zwrócić? poprzednio było "return zawartoscDebuggowaniaLocalStorage;"
    }

    // ...   ?
return false;
}

function AwariaWLocalStorage ()
{
localStorage.setItem('awariaNaStale', '<AWARIA!>');
}

function NaprawaWLocalStorage ()
{
localStorage.setItem('awariaNaStale', '<BRAK AWARII>');
}

function ZerujLocalStorage ()
{
localStorage.removeItem('awariaNaStale');
}

function PokazDebuggowanie ()
{
    $('#odpluskwiacz_ajaksowy').fadeIn(200);
}

function UkryjDebuggowanie ()
{
    $('#odpluskwiacz_ajaksowy').fadeOut(200);
}

function PokazBiezacaGalerie ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 200;
$('#nazwa_galerii').fadeIn( czasAnimacji );
$('#skladowisko').fadeIn( czasAnimacji );
$('#nawigacja_galeria').fadeIn( czasAnimacji );
}

function UkryjBiezacaGalerie ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 200;
$('#nazwa_galerii').fadeOut( czasAnimacji );
$('#skladowisko').fadeOut( czasAnimacji );
$('#nawigacja_galeria').fadeOut( czasAnimacji );
}

function DostawPrzyciskZamykaniaDoBiezacejGalerii ()
{
var $przyciskZamykania = $('#biezaca_galeria_zamykanie');
    // wstaw element tylko gdy nie ma go jeszcze na stronie
    if ( $przyciskZamykania.length == 0 ) $('#nazwa_galerii').prepend( '<div id="biezaca_galeria_zamykanie" class="zamykanie" tabindex="0">&times;</div>' );
}

function UsunPrzyciskZamykaniaDlaBiezacejGalerii ()
{
$('#biezaca_galeria_zamykanie').remove();   // usuń element (jeśli znaleziono)
$('#selektor_naglowek').focus();    // IU/UX: też przenieś focus na jakiś aktywny element PRZED lub ZA tym guzikiem (wybrano wariant PRZED)
}

function PokazPrzyciskZamykaniaDlaBiezacejGalerii ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 300;
$('#biezaca_galeria_zamykanie').fadeIn( czasAnimacji );
}

function UkryjPrzyciskZamykaniaDlaBiezacejGalerii ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 300;
$('#biezaca_galeria_zamykanie').fadeOut( czasAnimacji );
}

function PokazPrzyciskZamykaniaDlaWybranejPodstronyListyGalerii ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 300;
$('#wybrane_galerie_zamykanie').fadeIn( czasAnimacji );
}

function UkryjPrzyciskZamykaniaDlaWybranejPodstronyListyGalerii ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 300;
$('#wybrane_galerie_zamykanie').fadeOut( czasAnimacji );
}

function AktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii ()
{
    $('#biezaca_galeria_zamykanie').on("click keydown", function( e ) {  // działanie EWIDENTNIE BEZ delegacji zdarzeń!!!
        if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
        {
        UkryjBiezacaGalerie();
        }
    });
}

function DezaktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii ()
{
    $('#biezaca_galeria_zamykanie').off("click keydown", function( e ) {  // "OFF", nie "ON"!!! -- też działanie EWIDENTNIE BEZ delegacji zdarzeń!!!
        if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
        {
        PokazBiezacaGalerie();
        }
    });
}

function PokazWybranaPodstroneListyGalerii ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 200;
$('#wybrany_zaczytany_spis').fadeIn( czasAnimacji );
}

function UkryjWybranaPodstroneListyGalerii ( czasAnimacji )
{
czasAnimacji = czasAnimacji || 200;
$('#wybrany_zaczytany_spis').fadeOut( czasAnimacji );
}

function ZaczytajSpisGalerii ()
{
// "http://zlobek.chojnow.eu/galeria,k0,p1.html" <-- adres ostatnio dodanych galerii/albumów, wg daty - lista z [1, 5] linkami; najnowsze/najświeższe wydarzenie na górze  
var adres_ostatniej_galerii = "/galeria,k0,p1.html";
var adres_zasobu_galerii = g_protokol_www + g_adres_strony;

        // operowanie na jawnym zliczaniu kliknięć (zamiast 'g_bieżącej_pozycji_galerii'), bo to definiuje kolejny numer podstrony do załadowania
    if ( g_suma_klikniec_zaladuj > 0 )
    //if ( g_biezaca_pozycja_galerii > 0 )
    {
    // var nowa_podstrona_spisu_galerii = g_biezaca_pozycja_galerii + 1;
    // adres_ostatniej_galerii = "/galeria,k0,p" + String( g_biezaca_pozycja_galerii + 1 ) + ".html";
        
        // powyższe warunkowe działania pomijają ładowanie DRUGIEJ PODSTRONY przy PIERWSZYM naciśnięciu przycisku 'Załaduj kolejne galerie'
    // adres_ostatniej_galerii = "/galeria,k0,p" + String( g_biezaca_pozycja_galerii ) + ".html";
        
    adres_ostatniej_galerii = "/galeria,k0,p" + String( g_suma_klikniec_zaladuj ) + ".html";
    }

//$( g_wczytywanie_spis ).show(100); //
PokazRamkeLadowania('spis');
// console.log('Załadowano spis treści dla ' + g_biezaca_pozycja_galerii + '. pozycji galerii, adres z http: "' + adres_zasobu_galerii + '" odnośnik: "' + adres_ostatniej_galerii + '".');
    // najpierw komunikat konsoli później działanie - odwrotnie niż każde zwykłe działanie
WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_spis, adres_zasobu_galerii, adres_ostatniej_galerii, g_element_zewnetrzny_spis, "spis_galerii" );

}	// ZaczytajSpisGalerii-END




// ---------- *** ----------  OGÓLNE PRZEZNACZENIE  ---------- *** ----------

function PrzewinEkranDoElementu ( element, czasAnimacji, korektaY )
{
var pozycjaElementuWPionie;
        // parametryzacja parametru domyślnego by ES5 ;)
    if ( korektaY === undefined ) korektaY = -10;
        // jeśli jest kilka elementów, to użyj pierwszego w kolekcji jako "wybranego"
    if ( $(element).length > 0 ) 
    {
        if ( $(element).length > 1 ) element = $(element)[0];
    pozycjaElementuWPionie = $(element).offset().top;
    console.log('Ustalono, że element wywołania "' + element + '" ma pozycję Y ', pozycjaElementuWPionie, ' [px] (korektaY: ' + korektaY
                + ', czasA: ' + czasAnimacji + ')');    
    $('html, body').animate( { scrollTop : (pozycjaElementuWPionie + korektaY) + 'px' }, czasAnimacji );  // dwa główne elementy dla zapewnienia kompatybilności
    }
}   


function ZablokujPrzycisk ( przycisk )
{
//console.log('PRZYCISK:', przycisk);
$( przycisk ).prop('disabled', true);
}


function OdblokujPrzycisk ( przycisk )
{
$( przycisk ).prop('disabled', false);  // działanie OK, zamiast spodziewanego rezultatu poprzez: $.removeProperty('disabled');
}


function OkreslPolozenieElementuJS ( element )  // używanie jako bezpośrednie 'getOffset(element).left' lub 'getOffset(element).top'
{
var pozycja = element.getBoundingClientRect();
    // debug do kasacji gdy OK
    console.log('Element "' + element + '" ma X:' + ( parseInt( pozycja.left ) + parseInt( window.scrollX ) ) + 
                ', Y:' + ( parseInt( pozycja.top ) + parseInt( window.scrollY ) ) );
return { left: pozycja.left + window.scrollX,
         top: pozycja.top + window.scrollY };
}


function OkreslPolozenieElementu ( element )  // używanie jako bezpośrednie 'getOffset(element).left' lub 'getOffset(element).top'
{
var pozycja = $(element).offset();
    // debug do kasacji gdy OK
    console.log('Element "', element, '" ma X:' + pozycja.left, ', Y:' + pozycja.top );
return { left: pozycja.left, top: pozycja.top };
}


function OdkryjEmail ( element, adres, adresPokazywany, wariant )   // zrobić z atrybutów obiekt?!
{
    // wartości domyślne, aby nie wklepywać atrybutów
element = element || $("#adres_email");
adres = adres || 'zobaczwnuka' + String.fromCharCode(64) + 'em' + 'ail' + '.c' + 'om';   // takie tam rozbicie ze scaleniem dla szukaczy
adresPokazywany = adresPokazywany || 'kontakt';
var adresEmail = 'ma' + 'ilt' + 'o:' + adres;  // tu już to rozdzielanie niepotrzebne, to nie jest parsowany plik html
$( element ).text( adresPokazywany ).attr( 'href', adresEmail );
}   // OdkryjEmail-END


function AktualnyRozmiarOkna ( elementWyswietlajacy, poziomWidocznosci )
{
var szerokoscOkna = $(window).outerWidth(true),
    wysokoscOkna = $(window).outerHeight(true);
poziomWidocznosci = poziomWidocznosci || '0.7';

    // zawartość w <h1> powinna otrzymać aktualny wymiar okna i go wyswietlić... warunek element powinien mieć specyficzną klasę, żeby nie wyświetlał 'X' przy wyłączonym JS!
    // nadać klasę ręcznie, czy z automatu ponownie przypisać na początku tej funkcji?

$(elementWyswietlajacy + '> h1').text( szerokoscOkna + ' x ' + wysokoscOkna );  // najpierw nadanie aktualnej treści (rozmiaru X x Y)
    
    if ( !$(elementWyswietlajacy).hasClass('animacja-zanikanie') ) $(elementWyswietlajacy).addClass('animacja-zanikanie');    // ewentualne nadanie klasy z konretną animacją

    // taka parodia, ale chodzi o przerwanie aktualnie zanikającej animacji i uruchomienie jej od nowa
    // $(elementWyswietlajacy).hasClass('animacja-zanikanie').removeClass('animacja-zanikanie').addClass('animacja-zanikanie');
    // istotny jest odstęp czasu pomiędzy zabraniem, a ponownym dodaniem tej samej klasy (najlepiej z jakąś modyfikacją/odczytem DOM pomiędzy)
$(elementWyswietlajacy).removeClass('animacja-zanikanie').height();    // pobierana jest na próżno wysokość, jako mechanizm nowego odwołania się do DOM

$(elementWyswietlajacy).addClass('animacja-zanikanie');

/*
    if ( $( elementWyswietlajacy ).hasClass('animacja-zanikanie') )
    {
    //$(elementWyswietlajacy).css({ animationName : '', animationDuration : '', animationTimingFunction : '' });
        //  $(elementWyswietlajacy).css({ animationPlayState : 'paused' }).width();
        //  $(elementWyswietlajacy).css({ animationPlayState : 'running' });
    //$(elementWyswietlajacy).stop().removeClass('animacja-zanikanie').css({ animationName : '', animationDuration : '', animationTimingFunction : '', animationIterationCount : '0' });
        //alert('W trakcie animacji');
    }
    //if ( $(elementWyswietlajacy + ':animated') ) $(elementWyswietlajacy).stop().removeClass('animacja-zanikanie');
*/

//$(elementWyswietlajacy).addClass('animacja-zanikanie');
return szerokoscOkna;   // zwraca wymiary, ale wcześniej wprost modyfikuje UI o te wartości
}   // AktualnyRozmiarOkna-END


function KonwertujNaLiczbe ( jakasWartosc )     // zwraca tę samą prawidłową wartośc liczbową lub 1 jeśli nie liczba (minimum używanych dalej zakresów)
{
var poKonwersji = parseInt( jakasWartosc, 10 );   // konwersja na liczbę o jawnie podanej podstawie dziesiętnej, a nie domysły JS odnośnie tej podstawy (8 vs 16 v 10)
    if ( ( poKonwersji === undefined ) || ( isNaN( poKonwersji ) ) ) return 1;  // jako bezpieczna wartość, galeria MUSI mieć tę minimalną wartość
    else return poKonwersji;   // gdyby ktoś zmieniał wartości suwaka w locie na www
}   // KonwertujNaLiczbe-END


function UsunPobraneZadanie ( adresZasobu )
{
var indeksZnalezionego = false;
    
    // wymaga to FOR (jest break), czy da się zrobić poprzez forEach
    for ( var i = 0; i < g_niewyslane_podstrony.length ; i++ )
    {
        if ( g_niewyslane_podstrony[i].adresPelny.indexOf( adresZasobu ) != -1 ) // że odnaleziono cały adres z poszukiwanym fragmentem
        {
        indeksZnalezionego = i; // przypisanie indeksu z tabeli "nieobsłużonych" żądań
        break;
        }
    }
    
    if ( indeksZnalezionego >= 0 )
    {
    g_niewyslane_podstrony.splice( indeksZnalezionego, 1 ); // wyrzucenie z listy żądań oczekujących jednego, właśnie obsłużonego odnośnika
    return indeksZnalezionego;
    }
return false;
    
    /*    g_niewyslane_podstrony.forEach( function ( elementNiewyslany )
    //  ...
    )*/
    
}   // UsunPobraneZadanie-END


function PobierzPierwszeNieodebrane()   // jeżeli jest lista nieobsłużonych żądań, to pobierz z niej pierwszy obiekt
{
    if ( g_niewyslane_podstrony.length > 0 ) return g_niewyslane_podstrony[0];  // weryfikacja jest przed wywołaniem tej funkcji, ale nie zaszkodzi
return false;
}


function PobierzOstatnieNieodebrane()   // jeżeli jest lista nieobsłużonych żądań, to pobierz z niej pierwszy obiekt
{
    if ( g_niewyslane_podstrony.length > 0 ) return g_niewyslane_podstrony[g_niewyslane_podstrony.length-1];  // weryfikacja jest przed wywołaniem tej funkcji, ale dodatkowa nie zaszkodzi
return false;
}


function UbijReklamy ()
{   
    // *** HOSTING webhost.com ***
    // 000webhost.com || 000webhostapp.com -- bezwarunkowe ubijanie (o ile jQuery przypasuje coś)
$('a[href*=000webhost]').parent('div').remove();


    // *** HOSTING cba.pl ***
    // cba.pl -- tu wstępnie warunkowo, ale i tak na jedno wychodzi poprzez jQuery (nieznalezionych nie usunie/zmieni/odczyta)
var $cbaReklamaBig = $('center');
    if ( $cbaReklamaBig ) // jeżeli znaleziono to wywal pasek poprzedzający oraz tę wielgachną reklamę (szerszą niż ekran ewentualnego telefonu!)
    {
    $cbaReklamaBig.parent().prev().remove();    // wywal małą reklamę - pasek u góry (ewentualnie to może pozostać)
    $cbaReklamaBig.parent().remove();           // ale to wielgachne bezwzględnie wylatuje (sorry cba)
        // console.log('Ubijam_CBA #1 - <center>');
    }

// PRZENIESIENIE małoinwazyjnej reklamy tekstowej z początku, na koniec witryny - lepsze to niż wywalenie tej treści hostingu (a regulamin ;) )
/*
 - tuż za <body> zaczynają się doklejone treści z hostingu
 - docelowo ma się znaleźć tuż przed </body>, ale ~PRZED~ ZA doklejanymi treściami na spodzie strony (ZA mniej się rzuca niż PRZED)
 - "troskliwie" zmieniono kolejność, by inny selektor nie usunął tych treści
 - UX: górna belka jest zbyt cenna dla głupot spoza serwisu!!!
*/
var $reklamaDoPrzeniesieniaZGory = $('div[style]:first-child');
var $reklamaDoklejonaNaDole = $('.cbalink');

    if ( $reklamaDoPrzeniesieniaZGory && $reklamaDoklejonaNaDole )  // jeśli dopasowały się oba elementy do operowania... to przenieś ZA, czyli jako ostatni wyświetlany element
    {
        $reklamaDoklejonaNaDole.after( $reklamaDoPrzeniesieniaZGory );  // lepiej gdy jest ZA, niż PRZED; czarne tło lepiej wygląda na końcu, niż pomiędzy białymi
    }
        // kolejna ewentualna reklama na CBA, co rozwala układ telefonu -- z uwagi na szerszy banner obrazkowy niż używaną wielkość/szerokość ekranu
$cbaReklamaBig = $('img[usemap]');
    if ( $cbaReklamaBig ) // jeżeli znaleziono to wywal pasek poprzedzający oraz tą wielgachną reklamę (szerszą niż ekran ewentualnego telefonu!)
    {
    // $cbaReklamaBig.sibling('map').remove();    // wywal opis odnośników do dużego bannera na górze, później właściwy obrazek
    $cbaReklamaBig.parent().remove();           // albo po prostu pogoń kontener nadrzędny z DOMu (div#top_10)
        // console.log('Ubijam_CBA #2 - <img usemap>');
    }

    /*
    UWAGA: poniższe jest BARDZO restrykcyjne, gdyż wywala JEDNĄ lub DWIE reklamy:
      - pierwsza z nich jest statycznym tekstem, stanowiącym początek widocznych treści witryny (małe literki i opis)... PRZENIESIONO NA SPÓD STRONY
      - druga z nich to wyskakujacy banner z kłopotliwym zamykaniem 'x' na starych przeglądarkach bez flexboksa!-- co rozszerza stronę poza ekran!!
        (do tego kłopotliwe zamykanie, "X" w prawym górnym rogu, pod suwakiem przewijania pionowego)
      - czasem ten banner łapie poprzednia definicja "usuwacza", ale często zostaje on nieusunięty (ALBO: usuwa go mechanizm antyreklamowy przeglądarki!)
      - ale obie są równorzędnymi <div>-ami, czyli RODZEŃSTWO, ale uciążliwy banner może być już usunięty wewnętrznie (przeglądarka lub plugin antyreklamowy)
        lub poprzednimi instrukcjami, przez co dopasowanie może przejąć "małoinwazyjny tekst reklamowy" i go wywalić (dlatego go PRZENIESIONO, zamiast kasować)
    */
        // "aktualizacja antyreklamowna" na ostatni kwartał 2019 roku i później
$cbaReklamaBig = $('.glowny-kontener').prev();  // jakiś poprzednik istniejącego kontenera dla całej witryny, który jest doklejany z automatu przez hosting cba.pl
    if ( $cbaReklamaBig )   // ..., zaraz za początkiem <body>, o ile coś tam jeszcze istnieje
    {   // po prostu wywal całą zawartość dla danego kontenera (teraz często id="top_10", ale większość przeglądarek "same" kasują jakoś ten element
        $cbaReklamaBig.remove();   // ... do tego TO JEST PODLEGŁY ELEMENT, należy pozbyć się jego rodzica, jako właściwego niepotrzebnego kontenera!
        // console.log("Usunięto ostatni wariant WIEGACHNEJ reklamy 'mintme'!");
    }

/*  to jest odpowiedź na dynamicznie tworzone elementy... może prostsze byłoby blokowanie tworzenia nowych elementów przez określone skrypty, 
    ładowane z konkretnych adresów danego hostingu... ale wtedy należało by wydzielić blokowanie zawartości reklamowej i uruchamiać ją ZARAZ NA POCZĄTKU
     działania witryny (utworzyć nowe zdarzenia), by przechwycić i zablokować tworzenie nowych elementów, zwłaszcza doklejanych zewnętrznych <script> z określonego adresu;
    ...(+): takie działanie byłoby skuteczniejsze, też zapewaniałoby większą wydajność (nie trzeba kasować od razu czegoś, co przed chwilą utworzył skrypt),
     ten warunek reakcji na konkretne działanie spowalniające by nie musiał być wykonywany...
    ...(-): ale wymaga to lepszego podejścia do działania pod specyficzny hosting (a jego regulamin?!), ale (+) przy tym zyskujemy brak aktualizacji na reakcję na
        nowe/zmienione podejście do generowania treści reklamowych... TERMAT ZAPEWNE WRÓCI!   
*/
    var $jakasDoklejonaZawartosc = $('.contact_us_mail_feedback'); // jakaś niedopracowana zawartość doklejana na samym końcu witryny...
    if ( $jakasDoklejonaZawartosc )  // ..., poniżej odnośników reklamowych w stopce; domyślnie ukryte; zawiera jakiś nieostylowany formularz do kontaktu
    {
    $jakasDoklejonaZawartosc.remove();
    // console.log('Wywalono niepotrzebną doklejoną zawartość poniżej stopki ("dzikie formularze, czy inne węże").');
    }


    // *** HOSTING 5v.pl ***
$('iframe').remove();	// obce i doklejone dodatki od hostingu na stronie

$('#ads').remove();	// reklamy na górze, przed początkiem witryny

$('#ads_bottom_static').remove();	// reklamy z dołu, za treściami

$('[class^=app_gdpr--]').remove();	// "menu konfiguracyjne dla reklam" przy pierwszej wizycie

$('style').remove(); 	// !!! *OSTROŻNIE, OBOSIECZNE* !!! wlepione do heada - uruchomione na wstępie od razu wywala też wszystkie reklamy, ale nie da się przewijać w pionie witryny!

$('body').removeAttr('style'); // przywrócenie możliwości przewijania, zablokowanego przez wstawiane reklamy

}   // UbijReklamy-END



// ---------- *** ----------  GRA -- POMOCNICZA OBSŁUGA  ---------- *** ----------
    
function LosujPlansze ( zakres )
{
    if ( !zakres ) zakres = 1;
var wylosowanyNr = Math.floor( Math.random() * zakres );
return wylosowanyNr;
}


function WybierzPlansze ( nrPlanszy )        // docelowo będzie ajax/api
{
    if ( !nrPlanszy ) nrPlanszy = 0;    // przydział startowy na sztywno w razie czego
    
    switch ( nrPlanszy )
    {
     case 0:
        g_tloSrc = './grafiki/gra/autobus/autobus.png';
        var noweTlo = new Image();  // tworzenie nowego obrazka w pamięci dla ścieżki dla tła graficznego, celem określenia wymiarów tego obrazka
        noweTlo.src = g_tloSrc;

        noweTlo.onload = function() {
        var wysokoscTla = noweTlo.height;
        var szerokoscTla = noweTlo.width;
            // środkowanie względem kontenera 1090px x 700px
        g_przesuniecieTlaX = String( ( $('#rysunek').width() - szerokoscTla ) / 2 ) + 'px';
        g_przesuniecieTlaY = String( ( $('#rysunek').height() - wysokoscTla ) / 2 ) + 'px';
        
            // wyświetlenie i centrowanie dopiero, gdy przeliczą się wymiary tego obrazka
        $('div#rysunek').css({ 'backgroundImage': 'url(' + g_tloSrc + ')', 'backgroundRepeat' : 'no-repeat', 'backgroundPosition' : g_przesuniecieTlaX + ' ' + g_przesuniecieTlaY });
            // debug
        var statusTla = '<p>Grafika \'' + noweTlo.src + '\' ma szerokość ' + szerokoscTla + ' i wysokość ' + wysokoscTla + '<br />' 
            + 'Przesunięcie wyśrodkowania to (' + g_przesuniecieTlaX + ', ' + g_przesuniecieTlaY + ').</p>';
        $('#dolny_zasobnik').append(statusTla);
        };  // noweTlo.onload = function()-END

    // ...
            // tego oczywiście ma być więcej

    }   // switch-( nrPlanszy )-END

return { dx : g_przesuniecieTlaX, dy: g_przesuniecieTlaY };    // dobrze by było zwrócić jakąś tabelę rekordów lub cokolwiek...
}   // WybierzPlansze-END


function RozmiescCzesci ( nrPlanszy ) {         // TODO: refaktoryzacja - utworzyć każdy PNG poprzez jQuery dla wsparcia IE9
g_nazwaPlanszy = 'Autobus';
g_nazwaPlanszySciezka = './grafiki/gra/autobus/';
g_ileCzesci = 10;
g_nazwaElementu = 'cz_';
var przesuniecieX1 = 1110,
    przesuniecieY1 = -30,
    przesuniecieX2 = 30,    // co drugi przestawiac pomiędzy kontenerami dla lepszej widoczności... w planach
    przesuniecieY2 = 720,
    numerPliku;

    for ( var i=1; i <= g_ileCzesci; i++ )
    {
        if ( i < 10 ) numerPliku = String( '0' + i );
        else numerPliku = String( i );
        
        if ( i % 2 ) przesuniecieX1 += 80;
        else przesuniecieX1 -= 80;
    
        przesuniecieY1 += 50;
        przesuniecieY1 += 50;
        
    var nowyObrazek = $('<img />', {
        src: g_nazwaPlanszySciezka + g_nazwaElementu + numerPliku + '.png',
        alt: numerPliku,
        'class': 'przenosny',    // z "classList.add()" mają problemy IE do 9 włącznie! jQuery?
        css: {      // tu zdefiniowane wzorcowo wszystkie style w jednym miejscu (inline)
            left: String( przesuniecieX1 ) + 'px',
            top: String( przesuniecieY1 ) + 'px',
            zIndex: 100 + i,    // "z-index"?!
        },
        'data-zindex': 100 + i, // DRY! duplikat przy inicjalizowaniu
        'draggable': true
    });     //było "new Image();", teraz jQ tworzy i parametryzuje od razu

    $('#plansza').append( nowyObrazek );

    }   // for-END
}   // RozmiescCzesci-END


function RozmiescCzesciWzorcowo ()
{
var fragmenty = $('#plansza img.przenosny');
var ileFragmentow = fragmenty.length;
    
    // to skopiowane z funkcji powyżej - docelowo przydzielić to jako parametry/podfunkcje, by nie kopiowac dalszej treści
var przesuniecieX1 = 1110,
    przesuniecieY1 = -30,
    przesuniecieX2 = 30,
    przesuniecieY2 = 720;
    
    for (var i = 0 ; i < ileFragmentow ; i++ )
    {
    $( fragmenty[i] ).css({outlineColor: '', outlineStyle: ''});
        // kasować resztę dodanych atrybutów dla czystego zerowania, czy pozostawić je do nadpisania?
    
        if ( !( i % 2 ) ) przesuniecieX1 += 80;
        else przesuniecieX1 -= 80;
    fragmenty[i].style.left = String( przesuniecieX1 ) + 'px';
    przesuniecieY1 += 50;
    fragmenty[i].style.top = String( przesuniecieY1 ) + 'px';
    fragmenty[i].style.zIndex = 100 + i;
    }
}   // RozmiescCzesciWzorcowo-END


function UsunCzesci () {
 $('#plansza img.przenosny').remove();
}


function PoczatekRuchuPrzeciagania ( e )  // 'dragstart'
{
e = e || window.event;
g_ktoraGrafika = e.target;
    //this.style.opacity = '0.9';
g_mojX = e.offsetX === undefined ? e.layerX : e.offsetX ;   // jakoby Firefox był nadal oporny i te współrzędne na przekór trzyma w innych atrybutach
g_mojY= e.offsetY === undefined ? e.layerY : e.offsetY ;    // zachowywanie obu położeń początkowych

ResetujZIndexWszystkim();
    var pionowosc = g_ktoraGrafika.style.zIndex;
    if ( ( pionowosc > 100 ) && ( pionowosc < 1000 ) ) g_ktoraGrafika.style.zIndex = parseInt( g_ktoraGrafika.style.zIndex ) + 100;
    // poruszany wyskakuje przed szereg podczas wyciągania co najwyżej kilka razy i tak już zostaje...
    // ...w ramach tego działania (ale może zostać przykryty częsciowo przez sąsiedni element)
console.log('Podczas przeciągania: g_mojX:', g_mojX, ' [ (e.layerX:', e.layerX, ', e.offsetX:', e.offsetX,'), (g_mojY:', g_mojY, ' (e.layerY:', e.layerY,
                ', e.offsetY:', e.offsetY,')]');

}   // PoczatekRuchuPrzeciagania-END


function RuchUpuszczania ( e )    // 'drop'
{
e = e || window.event;

var scena = document.querySelector('#rysunek');
var polozenieTla = OkreslPolozenieElementu( scena );    // dostaję { top, left }
//e.preventDefault(); // bez interpretacji i przetwarzania, gdy przeciągamy element w inny element (zwłaszcza taki, który nie może być kontenerem, czyli <img> w <img>! )
/* g_ktoraGrafika.style.left = parseInt( e.pageX - g_mojX ) + 'px'; // od współrzędnych globalnych odejmij wcześniejsze położenie elementu ... i nic się nie dzieje
g_ktoraGrafika.style.top = parseInt( e.pageY - g_mojY ) + 'px'; */
g_ktoraGrafika.style.left = parseInt( e.pageX - polozenieTla.left + g_przesuniecieTlaX - g_mojX ) + 'px';
g_ktoraGrafika.style.top = parseInt( e.pageY - polozenieTla.top + g_przesuniecieTlaY - g_mojY ) + 'px';

console.log("Przeciąganie! e.pageX: ", e.pageX, ", g_mojX:", g_mojX, ", położenieTła.left:", polozenieTla.left, ", g_przesunięcieTłaX:", g_przesuniecieTlaX, 
            ", e.pageY:", e.pageY, ", g_mojY:", g_mojY, ", położenieTła.top:", polozenieTla.top,", g_przesunięcieTłaY:", g_przesuniecieTlaY );
console.log("Docelowy element ma mieć zatem (", g_ktoraGrafika.style.left, ", " ,g_ktoraGrafika.style.top, ").");
e.preventDefault(); // przestawione z góry
return false;
}   // RuchUpuszczania-END


function RuchPrzeciagania ( e )     // 'dragover'
{
e = e || window.event;
e.preventDefault();     // wszelkie dziwne działania, które mogą wyniknąć podczas chwytania i przenoszenia elemntu
    // w zasadzie "nicnierobienie();" o ile można wszelkie działania 'dragover' przeglądarek tym olać
return false;   // dodane
}   // RuchPrzeciagania


function ResetujZIndexWszystkim ()
{
var elementy = document.querySelectorAll('img.przenosny');  // manipulacja bezpośrednio w JS (DOMie)
    for ( var i = elementy.length-1 ; i >= 0 ; i-- )
    {
    elementy[i].style.zIndex = 20;  // ustawianie z-indeksu na wartość wzorcową (różnica pomiędzy początkiem)
    }
}
 
    // archaiczne połączeneie z htmlem ... do wywalenie obie poniższe funkcje
        function dragover_handler(ev) {
         ev.preventDefault();
         // Set the dropEffect to move
        /* ev.dataTransfer.dropEffect = "move"*/
        }

        function drop_handler(ev) {
         ev.preventDefault();
         // Get the id of the target and add the moved element to the target's DOM
        /* var data = ev.dataTransfer.getData("text");
         ev.target.appendChild(document.getElementById(data));*/
        }

    
function InicjalizujGre ()
{
var nrPlanszy = LosujPlansze(); // póki co na pusto
// console.log('Wylosowano nr planszy: ', nrPlanszy);    
var przesuniecie = WybierzPlansze( nrPlanszy );     // od razu zwrot, choć on już wstawiony do zmiennych globalnych

RozmiescCzesci( nrPlanszy );

}   // InicjalizujGre-END



// ---------- *** ----------  GRA W PRZECIĄGANIE ELEMENTÓW v.0.9 #1  ---------- *** ----------


var Przeciaganie = ( function()     // i tak autostart tej funkcji i jej podległych podpiętych funkcji obsługi zdarzeń
{

    function PoczatekRuchuPrzeciaganiaJS ( e )  // 'dragstart'
    {
        // e = e || window.event;
    g_ktoraGrafika = e.target;      // !!! wpisanie namiarów na przeciagany element, który będzie dalej używany w kolejnych zdarzeniach
        // this.style.opacity = '0.9';
    g_mojX = e.offsetX === undefined ? e.layerX : e.offsetX ;   // róznica odległoścvi pomiedzy kliknięciem, a początkiem klikniętego elementu
    g_mojY= e.offsetY === undefined ? e.layerY : e.offsetY ;    // jakoby Firefox był nadal oporny i te współrzędne na przekór trzyma w innych atrybutach
        // pobranie pozycji "globalnej" danego elementu-ofsetu
    var pozycjaElementu = OkreslPolozenieElementu ( e.target );
    e.target.setAttribute( 'data-offset_x', e.target.style.left );
    e.target.setAttribute( 'data-offset_y', e.target.style.top );
    e.target.setAttribute( 'data-mysz_pocz_x', e.pageX );
    e.target.setAttribute( 'data-mysz_pocz_y', e.pageY );

    ResetujZIndexWszystkimJS();    
        var pionowosc = g_ktoraGrafika.style.zIndex;
        if ( ( pionowosc > 100 ) && ( pionowosc < 1000 ) ) g_ktoraGrafika.style.zIndex = parseInt( g_ktoraGrafika.style.zIndex ) + 100;    
        // poruszany wyskakuje przed szereg podczas wyciągania co najwyżej kilka razy i tak już zostaje... 
        // ...w ramach tego działania (ale może zostać przykryty częsciowo przez sąsiedni element)
    console.log('Podczas przeciągania: g_mojX:', g_mojX, ' [ (e.layerX:', e.layerX, ', e.offsetX:', e.offsetX,'), (g_mojY:', g_mojY, ' (e.layerY:', e.layerY,
                ', e.offsetY:', e.offsetY,')], zaś globalnie to (', pozycjaElementu.left, ', ', pozycjaElementu.top, 
                '), MYSZ (', e.pageX, ',' , e.pageY, ' )', 'ELEMENT (', e.target.style.left, ',' , e.target.style.top, ' )' );
    } // PoczatekRuchuPrzeciaganiaJS-END


    function RuchPrzeciaganiaJS ( e )    // 'dragover'
    {
    // e = e || window.event;
    // wszelkie dziwne działania, które mogą wyniknąć podczas chwytania i przenoszenia elementu
        // w zasadzie "nicnierobienie();" o ile można wszelkie działania 'dragover' przeglądarek tym olać
        g_ktoraGrafika.style.opacity = 0.5;
        g_ktoraGrafika.style.outlineColor = "#d00";

    e.preventDefault();
    return false;   // dodane
    } // RuchPrzeciaganiaJS-END


    function RuchUpuszczaniaJS ( e )  // 'drop'
    {
    //e = e || window.event;
    // przestawione znów do góry
    var scena = document.querySelector('#rysunek');
    var polozenieTla = OkreslPolozenieElementu( scena );    // dostaję { top, left }
    // e.preventDefault(); // bez interpretacji i przetwarzania, gdy przeciągamy element w inny element (zwłaszca taki, który nie może być kontenerem, czyli np. <img> w <img>! )
    // g_ktoraGrafika.style.left = parseInt( e.pageX - g_mojX ) + 'px'; // od współrzędnych globalnych odejmij wcześniejsze położenie elementu ... i nic się nie dzieje
    // g_ktoraGrafika.style.top = parseInt( e.pageY - g_mojY ) + 'px';
    /* g_ktoraGrafika.style.left = parseInt( e.pageX - polozenieTla.left + g_przesuniecieTlaX - g_mojX ) + 'px';
    g_ktoraGrafika.style.top = parseInt( e.pageY - polozenieTla.top + g_przesuniecieTlaY - g_mojY ) + 'px'; */
    // g_ktoraGrafika.style.left = e.pageX - e.target.getAttribute( 'data-mysz_pocz_x' ) - polozenieTla.left + parseInt( g_przesuniecieTlaX ) - g_mojX + 'px';
    // g_ktoraGrafika.style.top = e.pageY - e.target.getAttribute( 'data-mysz_pocz_y' ) - polozenieTla.top + parseInt( g_przesuniecieTlaY ) - g_mojY + 'px';

    // g_ktoraGrafika.style.left = e.pageX - polozenieTla.left - parseInt( g_przesuniecieTlaX ) + g_mojX + 'px';
    // g_ktoraGrafika.style.top = e.pageY - polozenieTla.top - parseInt( g_przesuniecieTlaY ) + g_mojY + 'px';
    g_ktoraGrafika.style.left = e.pageX - polozenieTla.left - parseInt( g_przesuniecieTlaX ) + 'px';    // o dziwo dwie poniższe linie są wierniejsze ułożeniu finalnemu?!
    g_ktoraGrafika.style.top = e.pageY - polozenieTla.top - parseInt( g_przesuniecieTlaY ) + 'px';      // tu też?!

    g_ktoraGrafika.style.outlineStyle = "solid";
    g_ktoraGrafika.style.outlineColor = "#00d";
    g_ktoraGrafika.style.opacity = 1;

    /* g_ktoraGrafika.style.left = 200 + 'px';
    g_ktoraGrafika.style.top = 100 + 'px'; */

    console.log("Przeciąganie! e.pageX: ", e.pageX, ", g_mojX:", g_mojX, ", położenieTła.left:", polozenieTla.left, ", g_przesunięcieTłaX:", g_przesuniecieTlaX, 
                ", e.pageY:", e.pageY, ", g_mojY:", g_mojY, ", położenieTła.top:", polozenieTla.top,", g_przesunięcieTłaY:", g_przesuniecieTlaY );
    console.log("Docelowy element ma mieć zatem (", g_ktoraGrafika.style.left, ", " ,g_ktoraGrafika.style.top, ").");
    e.preventDefault();
    return false;
    } // RuchUpuszczaniaJS-END


    function ResetujZIndexWszystkimJS ()
    {
    var elementy = document.querySelectorAll('img.przenosny');  // manipulacja bezpośrednio w JS (DOMie)
        for ( var i = elementy.length-1 ; i >= 0 ; i-- )
        {
        elementy[i].style.zIndex = 20;  // ustawianie z-indeksu na wartość wzorcową (różnica pomiędzy początkiem)
        }
    } // ResetujZIndexWszystkimJS-END


    function PoczatekDotykuJS ( e )
    {
    e.preventDefault(); // zapobieganie przewijaniu ekranu przy dotyku elementów przesuwnych
    var ktoraGrafika = e.target;    // wewnątrzna zmienna o tym samym znaczniu
    var dotykJednopalczasty = e.touches[0]; // tablica dla pierwszej "operacji jednopalcowej", czyli gestów z jednym naciskiem palca
    var ruchOsX = ktoraGrafika.offsetLeft - dotykJednopalczasty.pageX;
    var ruchOsY = ktoraGrafika.offsetTop - dotykJednopalczasty.pageY;
    ResetujZIndexWszystkimJS();
    ktoraGrafika.style.zIndex = 200;
    //debug
    console.log('Dotyk ekranu');

    //od razu podpięcie do obiektu poruszanego kolejnego zdarzenia (podległość)
        ktoraGrafika.addEventListener('touchmove', function ()
        {
            //debug
        console.log('Dotyk ekranu - przeciąganie elementu');
        var pozycjaX = dotykJednopalczasty.pageX + ruchOsX;
        var pozycjaY = dotykJednopalczasty.pageY + ruchOsY;
        
            // pozycjonowanie elementu do poruszania
        ktoraGrafika.style.left = pozycjaX + 'px';
        ktoraGrafika.style.top = pozycjaY + 'px';
        }, false); // jako 'bublowanie'
    } // PoczatekDotykuJS-END


    function KlikniecieObrazkaJS ( e )
    {
    e.target.style.zIndex = e.target.style.zIndex + 1;
    }

document.querySelector('#gra').addEventListener('dragstart', PoczatekRuchuPrzeciaganiaJS, false );
document.querySelector('#gra').addEventListener('dragover', RuchPrzeciaganiaJS, false );
document.querySelector('#gra').addEventListener('drop', RuchUpuszczaniaJS, false );

document.querySelector('#gra').addEventListener('touchstart', PoczatekDotykuJS, false );

/* var obrazki = document.querySelectorAll('img.przenosny');
    obrazki.forEach( function ( obrazek ) {
    obrazek.addEventListener('click', KlikniecieObrazkaJS, false );
    }); */

})();   // Przeciaganie-END   



// ---------- *** ----------  FUNKCJE ZDARZENIOWE - GLOBALNE  ---------- *** --------------


$(window).on('resize', function ()
{
var szeroskoscOkna = AktualnyRozmiarOkna('#wymiary');
    // ... też można coś z tą wartościa zrobić prócz samego wyświetlenia
    
    // warunkowe ukrywanie elementu z grą, gdy najpierw naciśnięto "Zagraj" -- element posiada style INLINE, których nie nadpisuje standardowy CSS w @media
    /*  if ( szeroskoscOkna < 1300 ) $('#gra').hide(); */
    
}); // $(window).on('resize')-END


$(document).on("keypress", function ( evt )    // warunkowanie globalne WYŁĄCZENIA względem naciśnięcia klawisza
{
var elementZdarzenia = evt.target.tagName.toLowerCase();    // określenie rodzaju elementu
console.log('KLAWISZ: ', evt);
console.info('Element zdarzenia to ', elementZdarzenia);
var nawigacjaKlawiaturowa = evt.originalEvent ? evt.originalEvent.keyCode : evt.keyCode,
    czyAlt = evt.originalEvent ? evt.originalEvent.altKey : evt.altKey;

    if ( ( nawigacjaKlawiaturowa == 39 ) && ( czyAlt ) ) evt.preventDefault(); // GLOBALNIE: [->] + [Alt] -- nadrzędnie względem przeglądarki Firefox, IE nie słucha się
    if ( ( nawigacjaKlawiaturowa == 37 ) && ( czyAlt ) ) evt.preventDefault(); // GLOBALNIE: [<-] + [Alt] -- nadrzędnie względem przeglądarki Firefox, IE nie słucha się
    
    if ( ( elementZdarzenia.indexOf('input') < 0 ) || ( elementZdarzenia.indexOf('textarea') < 0 ) )   // ma NIE OBWIĄZYWAĆ wewnątrz pól <input> czy innych ewentulanych TEXTAREA
    {
    //console.log('KLAWISZE: ', evt);

        if ( evt.which == 8) evt.preventDefault();  // [BackSpace] - brak reakcji na niego poza polem wpisywania
    }
/*    if ( elementZdarzenia.indexOf('a') == 0 )   // odnośnik <a> -- testowe komunikowanie zdarzenia tylko dla odnośników
    {
        if ( ( evt.which == 13 ) || ( evt.which == 32 ) ) alert("KLAWISZ [Spacji] lub [Entera] w <a>");
        // evt.preventDefault();
    }*/
}); // $(document).on('keypress')-END


$('#glowna').on("click keypress", "a", function ( e )   // kasowanie FOCUSU przy kliknięciu w obrazek dla LIGHTBOXa oraz aktywacji spacją
{    
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
        if ( e.which == 1 ) $(this).blur();  // usuwanie focusu po ewentualnym kliknięciu

        if ( e.which == 32 )
        {
        e.preventDefault(); // blokowanie przewijania ekranu spacją oraz aktywacja elementu - symulacja kliknięcia
        $(this).click();    // sztuczne kliknięcie myszą na tym samym elemencie - przekierowanie do tego samego zdarzenia (+ kasacja obrysu)
        }
    }
}); // $('#glowna').on('click keypress')-END
    
    
// ---------- *** ----------  FUNKCJE ZDARZENIOWE - PRZYCISKI, ODNOŚNIKI, ELEMENTY, ...  ---------- *** --------------	
	

$('#odswiez').click( function ()
{
 location.reload();
});	

    
$('#poco_button').click( function ()
{
 $('#poco').toggle(200);
});

    
$('#pomoc_button').click( function ()
{
 $('#pomoc').toggle(200);
});


$('#symulacja_button').click( function ()
{
 $('#odpluskwiacz_ajaksowy').fadeToggle(200);
});


$('#losuj_zakres').click( function ()
{
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
    g_wybrany_nr_galerii = Math.floor( Math.random() * g_ilosc_wszystkich_galerii ) + 1 ;

        //ustawienie wartości w polu tekstowym i suwaku
    $g_input_nr_galerii.val( g_wybrany_nr_galerii );
    $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
    }
}); // #losuj_zakres click-END


$('#losuj_zakres_podstrony').click( function ()
{
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
    g_wybrany_nr_podstrony_galerii = Math.floor( Math.random() * g_ilosc_wszystkich_paginacji_galerii ) + 1 ;

        //ustawienie pola tekstowego i suwaka wygenerowaną wartością
    $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
    $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
    }
}); // #losuj_zakres_podstrony click-END


$g_suwak_nr_galerii.change( function ()
{
g_wybrany_nr_galerii = KonwertujNaLiczbe ( $(this).val() );  // trzy przypisania!!! PODANA_WARTOŚĆ lub 1 (MINimum) dla błędnych wpisów!
                                                             // dodatkowa weryfikacja, nawet gdyby ktoś edytował wartości suwaka
$g_input_nr_galerii.val( g_wybrany_nr_galerii );
});	


$g_suwak_nr_podstrony_galerii.change( function ()
{
g_wybrany_nr_podstrony_galerii = KonwertujNaLiczbe ( $(this).val() );  // też trzy przypisania!!! PODANA_WARTOŚĆ lub 1 (MINimum) dla błędnych wpisów!
    
$g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
});	
    
    
$('#wybrany_nr_zwieksz').click( function ()
{
    if ( ( g_ilosc_wszystkich_galerii > 0 ) && ( g_wybrany_nr_galerii > 0 ) )  // dodatkowe sprawdzenie, w razie przeoczenia lub usunięcia wcześniejszego: g_wybrany_nr_galerii = g_ilosc_wszystkich_galerii (ewentualnie, gdyby wybrać to jako pierwsze)  
    {  
        if ( g_wybrany_nr_galerii < g_ilosc_wszystkich_galerii )
        {
        g_wybrany_nr_galerii++;
        $g_input_nr_galerii.val( g_wybrany_nr_galerii );
        $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
        }
    }
}); //  #wybrany_nr_zwieksz click-END


$('#wybrany_nr_zmniejsz').click( function ()
{
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
        if ( g_wybrany_nr_galerii > 1 )
        {
        g_wybrany_nr_galerii--;
        $g_input_nr_galerii.val( g_wybrany_nr_galerii );
        $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
        }
    }
}); //  #wybrany_nr_zmniejsz click-END


$('#wybrany_nr_podstrony_zwieksz').click( function ()
{
    if ( ( g_ilosc_wszystkich_paginacji_galerii > 0 ) && ( g_wybrany_nr_podstrony_galerii > 0 ) )  // dodatkowe sprawdzenie
    {  
        if ( g_wybrany_nr_podstrony_galerii < g_ilosc_wszystkich_paginacji_galerii )
        {
        g_wybrany_nr_podstrony_galerii++;
        $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        }
    }
}); //  #wybrany_nr_podstrony_zwieksz click-END


$('#wybrany_nr_podstrony_zmniejsz').click( function ()
{
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
        if ( g_wybrany_nr_podstrony_galerii > 1 )
        {
        g_wybrany_nr_podstrony_galerii--;
        $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        }
    }
}); //  #wybrany_nr_zmniejsz click-END


$('#galeria_wybrany_nr').blur( function ()
{
var wartoscBiezaca = KonwertujNaLiczbe( $(this).val() );
wartoscBiezaca = NormalizujZakresPolaInput( wartoscBiezaca );  // dodatkowa weryfikacja zakresu, ale zawsze z 1 jako błędną ewentualnością na WE

g_wybrany_nr_galerii = wartoscBiezaca;      // przypisania poprawnej wartości zakresu dla numeru wybranej galerii
$(this).val( wartoscBiezaca );
$g_suwak_nr_galerii.val( wartoscBiezaca );
});


$('#podstrona_wybrany_nr').blur( function ()
{
var wartoscBiezaca = KonwertujNaLiczbe( $(this).val() );     // na wzór nr_galerii; dodatkowa weryfikacja zakresów, ale zawsze z 1 jako błędną ewentualnością na WE
wartoscBiezaca = NormalizujZakresPolaInput( wartoscBiezaca, 'wybórPodstrony' );

g_wybrany_nr_podstrony_galerii = wartoscBiezaca;    // przypisania poprawnej wartości zakresu dla numeru wybranej podstrony galerii
$(this).val( wartoscBiezaca );
$g_suwak_nr_podstrony_galerii.val( wartoscBiezaca );
});


$('#suwak_galerii_submit').click( function ( evt )
{
evt.preventDefault; // nie wykonuj domyślnego SUBMIT po kliknięciu
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
    var tagDocelowyDoZaczytania = 'div#skladowisko_status_wybranej_galerii';
    var wartoscPolaNumerycznego = KonwertujNaLiczbe( $g_input_nr_galerii.val() );   // weryfikacja wartośći liczbowej, WARTOŚĆ_POLA lub 1 dla nieliczbowych wartości
    var wybranyNrGalerii = NormalizujZakresPolaInput( wartoscPolaNumerycznego ); // odczytanie z formularza PO_KONWERSJI_NA_10 + weryfikacja zakresu
        // obliczenie pozycji w ramach podstrony galerii oraz pozycji w zadanym obszarze podstrony (przesunięcie w ramach tego spisu)
        wybranyNrGalerii = SkorygujNumerDlaWyswietleniaWybranejGalerii ( wybranyNrGalerii );    // ale najpierw odrzucenie ZNANYCH i NIEDOSTĘPNYCH numerów galerii, które mogą fałszować nr docelowej galerii
    var pozycjaWGalerii = KtoraPozycjaWGalerii ( wybranyNrGalerii );
    var podstronaWGalerii = KtoraPodstronaWGalerii ( wybranyNrGalerii );
    var nrPodstronyGaleriiMAX = MaksymalnaIloscPodstronGalerii();
        
        // http://zlobek.chojnow.eu/galeria,k0,p38.html	<-- 'k0' == 'kategoria WSZYSTKO', 'pXYZ' to XYZ-ta 'p'-odstrona w danej galerii (zawiera max 5 elem.)
        // porządek odwrotnie chronologiczny - 'p1' lub 'p0' lub jego brak wskazuje na pierwszą od końca podstronę z pięcioma elemenatmi, 'p2' na przedostatnią, ...
        // konieczne obliczenie pozycji 'spisu treści' - uda się ustalić numerycznie jako M-ta podstrona z wszystkich galerii
        // celem jest pozyskanie stamtąd adresu dla wybranej N-tej galerii
    var adresPodstrony =  '/' + 'galeria,k0,p' + podstronaWGalerii + '.html' ;    // sumowanie ciagu tekstowego
 
    // DEBUG_MODE
        /*  var trescWygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nrPodstronyGaleriiMAX + "<br />";
            trescWygenerowana += "WYBRANA: " + wybranyNrGalerii + ", PODSTRONA: " + podstronaWGalerii + ", POZYCJA_W_GALERII: +" + pozycjaWGalerii + "<br />";
            trescWygenerowana += "<br /> Dopasowano na " + podstronaWGalerii + ". podstronie, z przesunięciem " + pozycjaWGalerii ;
            trescWygenerowana += ". Łączny adres to: \"" + g_adres_strony + adresPodstrony + "\"</p>";
            $('#status_wybranej_galerii').html( trescWygenerowana ); */
        
    ZablokujPrzycisk( evt.target );     // blokada ewentualnego kolejnego wywołania w trakcie oczekiwnia na obsługę
 
    // PRZESUNIĘTO USUWANIE "PRZYCISKU 'X'" JAK NAJBLIŻEJ KODU OBSŁUGI ŻĄDANIA WYŚWIETLENIA WYBRANEJ GALERII
    // UsunPrzyciskZamykaniaDlaBiezacejGalerii(); // bez tej definicji można w czasie ładowania ZAMKNĄĆ podgląd galerii, przez co nie pojawi się treść
    DezaktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii();   // najpierw wyłączenie funkcjonalności (.off), później animacja zanikania
    UkryjPrzyciskZamykaniaDlaBiezacejGalerii();

    // ..., ale widać aktywne powiadomenie o ładowaniu treści!!!

    //      if ( $('#nazwa_galerii').find('h2').text() != "" ) $('#nazwa_galerii').addClass('szara-zawartosc');  // warunkowe nadanie tymczasowej szarości dla każdego z już wyświetlonych podglądów szczegółów galerii
    var zawartoscH2 = $('#nazwa_galerii').find('h2').text();
        if ( zawartoscH2 != '' )
        {
        console.info('W <h2> do zabarwienia na szaro siedzi treść "' + zawartoscH2 + '" i nie chce zmienić koloru w IE/Edge.');
        $('#nazwa_galerii').addClass('szara-zawartosc');  // warunkowe nadanie tymczasowej szarości dla każdej z już wyświetlonego podglądu szczegółów galerii ...NIE DZIAŁA w IE
        }

    $( g_miejsce_na_zdjecia ).empty();
    $('nav#nawigacja_galeria').empty();
    
    PokazRamkeLadowania('podstrona');   // pokazanie ramki ładowania -- najbliższy obszar to podstrona galerii

    PrzewinEkranDoElementu('div#glowna', 500, -50);  // przesunięcie do podglądu galerii, aby widzieć reakcję i postęp ładowania

    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "wybrana_galeria_rekurencja", { 'pozycjaWGalerii' : pozycjaWGalerii, 'wybranyNrGalerii' : wybranyNrGalerii } ); 	// ES6 unfriendly
    }
return false;  // to jest lepszy i konieczny warunek na "niewysyłanie formularza" -- warunkowe zaczytywanie albo "nic-nierobienie" po kliknięciu
}); // click('#suwak_galerii_submit')-END


$('#suwak_podstrony_submit').click( function( evt )
{
evt.preventDefault; // nie wykonuj domyślnego SUBMIT po kliknięciu
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
    var tagDocelowyDoZaczytania = 'div#skladowisko_wybrane_galerie_spis';	// tu ma byc nowe miejsce w spisie
    var wartoscPolaNumerycznego = KonwertujNaLiczbe( $g_input_nr_podstrony_galerii.val() );     // weryfikacja wartośći liczbowej, WARTOŚĆ_POLA lub 1 dla nieliczbowych wartości
    var wybranyNrPaginacji = NormalizujZakresPolaInput( wartoscPolaNumerycznego, 'naRzeczPaginacjiSpisuGalerii' );  // odczytanie z formularza PO_KONWERSJI_NA_10 + weryfikacja zakresu
          // http://zlobek.chojnow.eu/galeria,k0,p38.html	<-- 'k0' == 'kategoria WSZYSTKO', 'pXYZ' to XYZ-ta 'p'-odstrona w danej galerii (zawiera max 5 elem.)
    var adresPodstrony =  '/' + 'galeria,k0,p' + wybranyNrPaginacji + '.html' ;    // po prostu podstawienie do ciagu tekstowego
 
    // DEBUG_MODE    
    /* var trescWygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nrPodstronyGaleriiMAX + "<br />";
    trescWygenerowana += "WYBRANA: " + wybranyNrGalerii + ", PODSTRONA: " + podstronaWGalerii + ", POZYCJA_W_GALERII: +" + pozycjaWGalerii + "<br />";
    trescWygenerowana += "<br /> Dopasowano na " + podstronaWGalerii + ". podstronie, z przesunięciem " + pozycjaWGalerii ;
    trescWygenerowana += ". Łączny adres to: \"" + g_adres_strony + adresPodstrony + "\"</p>";
    $('#status_wybranej_galerii').html( trescWygenerowana ); */

        if ( $('#wybrane_galerie_spis').find('span:first').text() != '' ) $('#wybrane_galerie_spis').addClass('szara-zawartosc');  // warunkowe nadanie tymczasowej szarości dla każdej z już wyświetlonego podglądu
        
    ZablokujPrzycisk( evt.target );     // blokada ewentualnego kolejnego wywołania, gdyby wymusić kolejno w trakcie tej obsługi zdarzenia
        
    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "wybrany_spis_galerii", { 'wybranaPaginacja' : wybranyNrPaginacji } ); 	// ES6 unfriendly
    
    $('div#wybrany_zaczytany_spis h2 span').text( wybranyNrPaginacji.toString() + '.' );
    PokazWybranaPodstroneListyGalerii(300);
        // $('div#wybrany_zaczytany_spis').show(100);   // standardowe pokazywanie, powyżej zastąpiono animacją
    // $('div#wczytywanie_wybrane_galerie_spis').show(100);
    PokazRamkeLadowania('wybrane_galerie_spis');
    UkryjPrzyciskZamykaniaDlaWybranejPodstronyListyGalerii();

    PrzewinEkranDoElementu('div#wybrany_zaczytany_spis', 500, -50);    // naddatek korekty, aby widzieć efekt szarosci... który jest niepotrzebny ale
    //PrzewinEkranDoElementu('nav#spis_sterowanie', 500, -100);    // ...nie można przewinąc do 'div#wybrany_zaczytany_spis', jeśli jest jeszcze niewidoczny
    }
return false;  // konieczny warunek pomimo .preventDefault na "niewysyłanie formularza" -- warunkowe zaczytywanie albo "nicnierobienie || robienie nic" po kliknięciu
}); // click('#suwak_podstrony_submit')-END


$('h2#selektor_naglowek').on("click keypress", function ( e ) {   // rozszerzone operowanie o klawiaturę; zamiennie "keypress" z .which działa identycznie
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
        if ( e.which == 1 ) $(this).blur();  // usuwanie focusu po ewentualnym kliknięciu
        if ( e.which == 32 ) e.preventDefault(); // blokowanie przewijania ekranu spacją
        
        if ( $(this).hasClass('rozwiniety') ) $(this).removeClass('rozwiniety').next('div').hide(100);
        else $(this).addClass('rozwiniety').next('div').show(100);
    }
});


    // uruchomienie
$('#nawigacja_galeria').on("click", ".przycisk_galeria", function ( evt ) { // BUTTON z ewentualną podstroną galerii obiektem zdarzenia
var $this = $(this);	
var serwer = g_protokol_www + $this.attr('data-adres_strony') + '/';
var ktoraPodstrona = $this.attr('value');

ZablokujPrzycisk( evt.target );   // blokowanie aktualnie naciśniętego przycisku do kolejnej podstrony-galeriowej; nie wymaga aktywowania, bo lista pod-galerii zostaje wygenerowana na nono z pominięciem "aktualnego" przycisku == zawartość aktualnej podstrony galerii

    // PRZESUNIĘTO USUWANIE "PRZYCISKU 'X' "JAK NAJBLIŻEJ KODU OBSŁUGI NACIŚNIĘCIA DOWOLNEGO PRZYCISKU NAWIGACJI W PODGALERII
    // ustawić jako początkową czynność blokowanie przycisku lub ukrywanie innego od zamykania (zależy na czasie!), a przetestowano możliwość wciśnięcia przycisku podgalerii klawiaturą,
    // gdy kursor myszy był nad zamykaniem podglądu bieżącej galerii!
//UsunPrzyciskZamykaniaDlaBiezacejGalerii();   // zamiast jednokrotnie tworzyć (kiedy?), pokazywać i ukrywać, to prostsze jest kasowanie OD RAZU elementu i jego tworzenie nowo
DezaktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii();
UkryjPrzyciskZamykaniaDlaBiezacejGalerii();     // najpierw wyłaczenie (.off), teraz animacja zanikania elementu 'X'
PokazBiezacaGalerie();  // ratunkowe pokazanie zawartości bieżącej galerii, nawet gdy WCZEŚNIEJ naciśnieto przycisk 'X" (co standardowo nie powinno się udać, ale w wyniku opóźnienia lub wolnego sprzętu TO SIĘ JEDNAK ZDARZA DLA "CHCĄCEGO MAGIKA"!)
            // coś jednak nie działa tak, jakbym chciał.. nie pojawi się komponent aktualnej galerii :/
    //$( g_wczytywanie_podstrona ).show(100);
PokazRamkeLadowania('podstrona');   // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle

// logownaie sukcesu dla podstrony glaerii
// console.log('Naciśnięto wywołanie ' + ktoraPodstrona + '. podstrony danej galerii');

WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), serwer, $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona", { 'ktoraPodstrona' : ktoraPodstrona } );    // ES5, nie ES6
});	//  on("click")-$('#nawigacja_galeria')-END


   // "przycisk" ładujący kolejne +5 galerii (max), porządek ujemnie chronologiczny
$('#spis_sterowanie').on("click keypress", "#zaladuj_galerie_spis", function ( e )
{ 
// console.info('DEBUG: przycisk naciśnieto już ' + g_suma_klikniec_zaladuj + ' razy, a paginacji odczytano wcześniej ' + g_zaczytana_ilosc_paginacji_galerii );
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
        if ( e.which == 1 ) $(this).blur();  // usuwanie focusu po kliknięciu
        if ( e.which == 32 ) e.preventDefault();  // blokowanie przewijania zawartości spacją

    g_suma_klikniec_zaladuj++;	// zliczaj naciśnięcia na ten przycisk
    // alternatywnbie można by sumować PO sprawdzeniu prostszego warunku...

        if ( g_suma_klikniec_zaladuj < ( g_zaczytana_ilosc_paginacji_galerii + 1) ) // bieżącą stronę też liczyć jako paginację, dlatego +1
        {
        // g_biezaca_pozycja_galerii++;  // zwiększenie licznika, przejście do wywołania kolejnej podstrony
        // licznik zwiększa się już PO naciśnięciu odnośnika i PRZED zakończeniem przetwarzania uprzednio zaczytanych treści !!!
        // co najwyżej kolejność może być inna na liście wyników

            if ( g_biezaca_pozycja_galerii <= g_zaczytana_ilosc_paginacji_galerii )
            {
            // $( g_wczytywanie_spis ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle
            // PokazRamkeLadowania('spis');  // -- to jest zbędne, wewnatrz ZaczytajSpisGalerii() jest dodane wyświetlenie

            // console.log('Na ' + g_suma_klikniec_zaladuj + ' żądanie zaczytano kolejną podstronę w galerii ' + g_biezaca_pozycja_galerii + ' z ' + g_zaczytana_ilosc_paginacji_galerii + ' podstron.');
            // g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; // inkrementacja o każde 5 zdjęć z poszczególnych zaczytanych galerii

            ZaczytajSpisGalerii();
            // wyświetlenie-dodanie kolejnego spisu do już wyświetlonej listy odnosników
            // WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona" );
            }
        }
    }   // if (e.which == ... )-END
});	// on("click")-$('#spis_sterowanie')-END


    // DLA KOLEJNYCH GALERII: '$('#galeria_spis').on("click", "a", function(e){'
$('#galeria_spis, #wybrane_galerie_spis').on("click keydown", "a", function ( e )
{
    // włączono KEYPRESSED/KEYDOWN i CLICK -- bez rozbijania na przyciski "warunkowe" - "click auxclick contextmenu"
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
        if ( e.which == 1 ) $(this).blur(); // usunęcie focusu z elementu po jego kliknięciu
    e.preventDefault();	// "nieprzechodzeniedalej" po odnośnku && nieprzewijanie ekranu spacją

    var $this = $(this);
    var galeriaDocelowa = $this.attr('data-href');	// pierwotnie był odczyt bezpośrednio z istniejącego 'href', teraz w jego miejscu 'data-href'
    var nrGalerii = OdczytajZOdnosnikaNumerGalerii( galeriaDocelowa );
    var nrPodstronyGalerii = MaksymalnaIloscPodstronGalerii( nrGalerii );

    var tytulGalerii = $this.text();	  // przypisanie treści -- tytułu dla danej galerii (wstępnie, jeśli naciśnięto na nagłówek, a nie na obrazek -- bo nie posiadałby tekstu)

    var opisGalerii = $this.parents('.kontener-odnosnik').find('.opis-odnosnik').html();	 // było .text(), ale teraz zyskujemy formatowanie tekstu
    var dataGalerii = $this.parents('.kontener-odnosnik').find('.data-odnosnik').text();       // tu bezwzględnie tylko tekst
        if ( dataGalerii.indexOf(" ") > 0 )     // jeśli treśc daty zawiera spacje (czyli jest coś przed datą - nie tylko samą datę) to usuń takowy tekst (no chyba że spacja "za" :/)  
        {
        dataGalerii = dataGalerii.substr( dataGalerii.lastIndexOf(" ")+1 ); // tylko sama data do przechowania
        }
    var godzinaGalerii = $this.parents('.kontener-odnosnik').find('.data-odnosnik').attr('data-godzina'); // wyciągnięcie samej godziny; sens atrybutu po polsku może być podobny do oczekiwanego
    var srcObrazkaGalerii = $this.parent().siblings('.zdjecie-odnosnik').find('img').attr('src');

        if ( tytulGalerii.length == 0 )  // jeżeli naciśnięto odnośnik z obrazkiem, ten drugi zawiera już treść odnośnika
        {
        tytulGalerii = $this.parent().siblings('div.tytul-odnosnik').find('a h2').html();	 // było .text( ... )
        galeriaDocelowa =  $this.attr('data-href');
        srcObrazkaGalerii = $this.find('img').attr('src');
        }
    //alert('g_tag_do_podmiany, g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/', galeriaDocelowa, g_element_zewnetrzny, "galeria_podstrona")
    //alert('WczytajZewnetrznyHTMLdoTAGU( tag: ' + g_tag_do_podmiany_zdjecia + ', domena: ' + g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/' + ', zasób: ' + galeriaDocelowa + ', elem: ' + g_element_zewnetrzny + ') ... MYSZA NAJECHAŁA');
    console.log('ZDARZENIE: "Naciśnięto" i wywołano odnośnik dla galerii "' + tytulGalerii + '"' );

        // załaduj tytuł, opis i obrazek dla danej galerii, po czym załaduje się jej pierwszą podstronę
    UzupełnijNaglowekBiezacejGalerii ( { 'tytul': tytulGalerii, 'opis': opisGalerii, 'srcObrazka': srcObrazkaGalerii, 'data': dataGalerii, 'godzina': godzinaGalerii,
                                            'nrGalerii': nrGalerii, 'nrPodstronyGalerii': nrPodstronyGalerii } );     // lista uzupełniona o numerację odczytanych

        // wstawienie animacji na postęp ładowania
    // $( g_wczytywanie_podstrona ).show(100);
        PokazRamkeLadowania('podstrona');

        // od razu zerowanie zawartości kontenerów docelowych do zaczytania zawartości
    $('nav#nawigacja_galeria').empty();
    $('div#skladowisko').empty(); 

    WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_zdjecia, g_protokol_www + g_adres_strony + '/' , galeriaDocelowa, g_element_zewnetrzny, "galeria_podstrona" ); 	
    //return; // wyjście, aby nie przechodzić do odnosnika... gdyby .preventDefault() zawiodło
    PrzewinEkranDoElementu('div#glowna', 700, -6);      // przewinięcie ekranu do lokalizacji galerii
    }   // if-( e.which == 1 )...
});	//  on("click")-$('#galeria_spis')-END


        // tylko te <a> mają sztucznie dodany TABINDEX (bo nie mają zabrany HREF!), zatem warianty: a || a[data-href] || a[tabindex]
$('#galeria_spis, #wybrane_galerie_spis').on("focus", "a[data-href]", function ( e )
{
        // dla NIEKOMPLETNEGO <a> NIE DZIAŁA nawet przypisanie obrysu poprzez klasę (ani szczątkowe :focus w CSS - działa tylko w FF, bez JS!)
        // pozostawiono z nadzieją istnienia zmiany w przyszłych wersjach przeglądarek (być może przyszłe aktualizacje różnych przeglądarek to obejmą?!)
        // skopiowano ten styl też dla rodzica, aby ujednolicić stan focus na kontenerze
    $(this).addClass('sztuczny-focus').parent().parent().addClass('sztuczny-hover sztuczny-focus');    // "dwa kontenery wyżej" to cały pojemnik dla tego odnośnika - do wyświetlenia galerii
}); //  on("focus")-$('a')-END


$('#galeria_spis, #wybrane_galerie_spis').on("blur", "a[data-href]", function ( e )
{  
        // istnienie klasa "sztuczny-focus" dla <a> i tak nic nie zmienia w stanie i wyglądzie odnośnika, brak tej ramki;
        // bardziej istotne póki co to warunkowanie JEST/BRAK dla skopiowanego stylu w rodzicu rodzica (czyli cały kontener elementu)
    $(this).removeClass('sztuczny-focus').parent().parent().removeClass('sztuczny-hover sztuczny-focus');    // "dwa kontenery wyżej" jako pojemnik dla bieżącego odnośnika;
}); //  on("blur")-$('a')-END 


$('div#zaczytany_spis').on('click keydown', '.powiadamiacz', function ( e )     // też na klawiaturę ma reagować ... powstał Mały Warunkowy Potworek
{
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
        if ( e.which == 32 ) e.preventDefault(); // tylko zamknie, bez ewentualnego przewijania

        if ( $(this).not( $(this).is(':animated') ) )      // pozwól na wcześniejsze "zrolowanie" elementu tylko przed rozpoczęciem nieuniknionej animacji
        {
        $(this).slideUp(500);   // szybsza o 50% animacja by było widać różnicę i efekt kliknięcia
        }
    }
}); //  on("click")-$('.powiadamiacz')-END


// ---------- *** ----------  FUNKCJE ZDARZENIOWE - PRZYCISKI  ---------- *** --------------


$('.banner-kontener').hover(    // animacje z "wychodzeniem" obrotowego słoneczka
    function() {
        $(this).find('#slonce_logo').addClass('animacja-interaktywnego-slonca');
    },
    function() {
        $(this).find('#slonce_logo').removeClass('animacja-interaktywnego-slonca');
    }
); // .banner-kontener hover-END


$('#galeria_spis').on('click', '.odswiez_strone', function ()   // globalnie obsługa zdarzenia z delegacją dla odświeżenia strony -- niezależnie od kolejności wygenerowania komunikatu o błędzie
{
    location.reload();
}); // on-click-END
    
    
$('#galeria_spis').on('click', '#przywroc_niewczytane', function ( evt )    // też delegacja, ponawianie wyswietlania nieudanej transmisji
{
    var ileNaLiscieNieotrzymanych = g_niewyslane_podstrony.length;    // sprawdzenie długości listy

    if ( ileNaLiscieNieotrzymanych > 0 )    // jeżeli istnieje nadal lista niepobranych/nieotrzymanych...
    {
        if ( ( ( OdczytajLocalStorage() == "<BRAK AWARII>" ) && ( $('.status-ajaksa').hasClass('status-norma') ) ) || ( $('.status-ajaksa').hasClass('status-norma') ) )  // wstępna weryfikacja po wyglądzie/zachowaniu
            //tutaj bym się zastanowił ponownie, czy warunek jest dobry dla stanu OK i BAD
        {
            // dodatkowa weryfikacja, ewentualnie zrobić hardkoda
            if ( ( g_przechwytywacz_php == g_przechwytywacz_php_ok ) && ( g_przechwytywacz_php_zapytanie == g_przechwytywacz_php_zapytanie_ok ) )
            {
        // to pobierz kolejny OSTATNI/pierwszy z tej listy niepobranych i spróbuj ponownie wszystkie operacje z transferem
            // #OSTATNI: psuje kolejność dołączania (gdy kilka się nie udało), ale odświeżane powiadomienie o błędzie ma sens
            // #pierwszy: kolejka FIFO lepsza względem "sprawiedliwości" niewczytania, przeciwnieństwo wcześniejszego
            // do pobrania jest więcej danych "fragmentowych" z jednego linku
        // ... ale nie zdejmuj póki co tego zadania z listy, zablokuj też przycisk na tę operację

        //var zadanieNieodebrane = PobierzPierwszeNieodebrane();
        var zadanieNieodebrane = PobierzOstatnieNieodebrane();  // tu odczytywana jest ostatnia pozycja z tablicy

        /*
        // var nrPodstronyNiewczytanejGalerii = parseInt( zadanieNieodebrane.substr( adres_zasobu.lastIndexOf(",p") + 2 ) );
        // var adresZasobu = zadanieNieodebrane.adres.indexOf();
            // ewentualna walidacja zapytań
            if ( zadanieNieodebrane.adres.substr( g_przechwytywacz_php ) == -1 )   // nie "./przechwytywacz.php" lecz "./przepuszczacz.php"
            {
            zadanieNieodebrane.adres.replace('przepuszczacz.php', 'przechwytywacz.php');
            }
            
            if ( zadanieNieodebrane.adres.substr( g_przechwytywacz_php_zapytanie ) == -1 )   // nie "?url_zewn=" lecz "?url_dupa"
            {
            zadanieNieodebrane.adres.replace('?url_dupa=', '?url_zewn=');
            }
        */
        ZablokujPrzycisk( evt.target );
        PokazRamkeLadowania('spis');
        PrzewinEkranDoElementu('#wczytywanie_spis', 500); // hardkod #elementu
            // wywołanie tego samego, ale wystawić dodatkowy znacznik, by go interpretować po zwrotnym otrzymaniu danych
            // + DANE, np. daneDodatkowe = { trybPowtorki : true }
        WczytajZewnetrznyHTMLdoTAGU ( zadanieNieodebrane.tag, g_protokol_www + g_adres_strony, zadanieNieodebrane.adresZasobu, zadanieNieodebrane.elementWitryny, "spis_galerii", { trybPowtorki : true } );    // + znacznik: .tryb
        console.log('NAPRAWA BŁĘDU DLA podstrony: "' + zadanieNieodebrane.adresZasobu + '"');

      // ...dużo wątków aktualizacyjnych przy okazji (dekrementacje i komunikaty), ale PO UDANEJ obsłudze ponowionego żądania!
            
            }   // if-(( g_przechwytywacz_php == g_przechwytywacz_php_ok )...-END
        } // if-( !OdczytajLocalStorage() )-END
    } // if-( ileNaLiscieNieotrzymanych > 0 )-END

}); //  on("click")-$('#przywroc_niewczytane')-END

                                            //zamykanie "okienek" i pasków w obszarze "#galeria_spis", czyli w "okienkach z błędami" nad spisem galerii
$('#galeria_spis').on("click keydown", ".zamykanie-komunikatu-bledu", function ( e )     // dodano sztuczna klasę wprost dla jasności obsługi zdarzeń;
{
var $this = $(this);
    // jakoby warunkowe wykonanie, mimo że na CLICK wstępnie reagowało
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
        if ( e.which == 32 ) e.preventDefault(); // tylko zamknie, bez ewentualnego przewijania
    $(this).blur(); // bezwarunkowe usunięcie focusu z elementu zamykającego
    var kontenerBledu = $this.parent('.blad');  // wystarczający krok o jeden poziom w górę
//    kontenerBledu.hide(300, function() { $(this).remove(); });  // usuń powiązany komunikat (jednorazowy) - tylko dla wskazanej klasy ".bład" pozostałe dwie wymagają innych działań niż zamknięcie ramki komunikatu
    kontenerBledu.slideUp(1000, function() { $(this).remove(); });  // usuń powiązany komunikat (jednorazowy) - tylko dla wskazanej klasy ".bład" pozostałe dwie eymagaja innych działań niż zamknięcie ramki komunikatu
        // TODO: z jakiejś racji dowolny typ animacji chowającej rodzica elementu z focusem się zacina... ale na starych przeglądarkach śmiga dobrze?!
        // problem w CSS: transition: ALL ...; "ALL" jest zbyt zasobożerne, a stare www nie ogarniają "przejść"
    }
});


$('#debugger_zamykanie').on("click keydown", function ( e )
{
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
        if ( e.which == 32 ) e.preventDefault(); // nie przewijaj ekranu spacją, skoro naciśnięto nią to zamykane w TYM naciśnięciu
    UkryjDebuggowanie();
    }
});

    // utworzono nowe zdarzenia dla naciśniecia przyciku 'X" bezpośrednio dla tego elementu, BEZ DELAGACJI ZDARZEŃ
    // nowa logika zapewnia OBSŁUGĘ ZDARZENIA NA ŻĄDANIE, tzn. jego aktywowanie lub blokowanie, zależnie czy przycisk 'X' jest wyświetlany (powinno współpracować też z animacją pojawiania/ukrywania się tego przycisku)
/* $('#glowna').on("click keydown", "#biezaca_galeria_zamykanie", function( e ) {  // zadziała z delegacją zdarzeń
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
    UkryjBiezacaGalerie();
    }
});     */

$('#wybrane_galerie_zamykanie').on("click keydown", function ( e )  // zamykanie wybranej podstrony listy galerii -- BEZ delegacji zdarzeń!
{
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
    UkryjWybranaPodstroneListyGalerii();
    }
});


$('div#zagraj').click( function ()
{
    $('div#gra').show(300);
    PrzewinEkranDoElementu( 'div#gra', 500, 10 ); // + korekta marginesu górnego elementu
//    InicjalizujGre();
    RozmiescCzesciWzorcowo();
    // ...
});


$('#gra_start').click( function ()   // start tylko dla naciśnięcia elementu myszą/dotykiem, bo klawiaturą nie da się przeciągać efektywnie
{
        // ...
    RozmiescCzesciWzorcowo();
    // ...
});


$('#gra_zamykanie').on("click keydown", function ( e )
{
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
    $('#gra').slideUp(333);        // lepiej dać animację (nie .hide, ale .slideUp jako lepszy efekt) niż proste .css('display', 'none');
        // ...  // tu reset logiki na zliczanie punktów
    }
});


$('#poco_zamykanie').on("click keydown", function ( e )
{ 
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
    $('#poco').slideUp(333);
    }
});


$('#pomoc_zamykanie').on("click keydown", function ( e )
{
    if ( ( e.which == 1 ) || ( e.which == 13 ) || ( e.which == 32 ) ) // [LEWY] || [ENTER] || [spacja]
    {
    $('#pomoc').slideUp(333);
    }
});

    // nie działa mi w JQ, mimo delegacji zdarzeń - próba powrotu do JS... te same zdarzenie i funkcje użyte w wywołaniu
/*
$('body').on('dragstart', '.przenosny', PoczatekRuchuPrzeciagania ); // $('#gra).on... bez zmian

$('body').on('drop', '.przenosny', RuchUpuszczania );   // RuchUpuszczania

$('body').on('dragover', '.przenosny', RuchPrzeciagania );  // RuchPrzeciagania
*/


// ***************************************************************************
// ---------- *** ----------  AUTOURUCHAMIANIE  ---------- *** ----------
// ***************************************************************************

InicjalizujCSSzAktywnymJS();
PokazIUkryjPowiadomieniaOOdwiedzinach(20);
InicjalizujRamkiLadowania();
//WystartujDebuggerLokalny( 'ZEPSUJ!' );
WystartujDebuggerLokalny();
// GenerujPowiadomienieOBledzie(); // TEST wymuszony po raz pierwszy
// GenerujPowiadomienieOBledzie({ tytul : 'TEST! Problem z odczytem zawartości zdalnej! TEST!', tresc : 'Wystąpił problem z odczytaniem zawartości zdalnej! Konieczność przeładowania zawartości witryny (1). TO JEST TYLKO PRÓBNE WYWOŁANIE POWIADOMIENIA, BŁĘDU NIE MA... ale przycisk reaguje. I jeszcze nieco więcej tekstu, dla wzorcowego wypełnienia. <br />Jestę nowo linio?!', przyciskAkcjiOdswiez : true, ikonaZamykania : true });

UbijReklamy();
InicjalizujPrzyciskiWyboruGalerii();
InicjalizujPrzyciskiWyboruPodstronyGalerii();

ZaczytajSpisGalerii();

// testowo też do autouruchamiania gry - pierwsza plansza
InicjalizujGre();
OdkryjEmail();


	// sterowanie wielkością czcionki nagłówka
$(".napisy-banner > h1").fitText(0.9, { minFontSize: '15px', maxFontSize: '62px' });
$(".napisy-banner > h2").fitText(1.6, { minFontSize: '8px', maxFontSize: '23px' });
$(".napis-spod > h3").fitText(3, { minFontSize: '9px', maxFontSize: '17px' });


    // parametryzacja pokazu zdjęć (przeniesione z pliku index.php)
lightbox.option({ albumLabel: "Zdjęcie %1 z %2", positionFromTop: 10 });

//$('#wymiary').addClass('animacja-zanikanie');  // dynamiczne przypisanie klasy
AktualnyRozmiarOkna('#wymiary');


}); //document-ready-END
