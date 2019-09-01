'use strict'; 

$(document).ready(function () {

/** GARŚĆ TEORII i FAKTÓW:
* ścieżka pełna do zdjęcia:	
* http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdj_XXXXX.jpg			// <-- adres zdjęcia, X to cyfra [0..9]
* http://zlobek.chojnow.eu/zdjecia_galeria/zlobek_zdjp_XXXXX.jpg 	// <-- adres miniatury zdjęcia ()
* http://zlobek.chojnow.eu/u_tygryskow,a147.html; 			// przykładowa strona z galerią
* http://zlobek.chojnow.eu/u_misiow,a20,p2.html						// przykładowa strona druga (2) galerii
* http://zlobek.chojnow.eu/1-u_misiow,z1028,p2.html		// przykładowa strona druga (2) z powiększonym zdjęciem nr 1 ("1028" to nr zdjęcia w galerii) 	
*
*/
var g_element_zewnetrzny = "table.galeria",		//wszystko jest w tablicy o klasie "galeria", w komórce wyższej tablicy	
 g_adres_strony = "zlobek.chojnow.eu",		// nazwa serwisu
 g_folder_serwera = "zdjecia_galeria",       // ścieżka ma serwerze, tj. folder udostepniony 
 g_wyszukiwany_serwer = "",		    // na przechowywanie adresu serwera z protkołem
 g_protokol_www = "http://",
 g_matryca_nazwy_pliku = "zlobek_zdj_",
 g_matryca_nazwy_pliku_miniatury = "zlobek_zdjp_",	
 g_rozszerzenie_obrazka = ".jpg",

 g_przechwytywacz_php = "./przechwytywacz.php",			//skrypt z fopen do zaczytania strony przez stronę php. Wymaga serwera z PHP!
 g_przechwytywacz_php_zapytanie = "?url_zewn=",			// adres zmiennej GET, zawartość bez weryfikacji !!!

 g_tag_do_podmiany_zdjecia = "div#zawartosc_do_podmiany", //element DOM, do którego load() wstawi zawartość tagu table.galeria z witryny zewnętrznej
 g_miejsce_na_zdjecia = "div#skladowisko", // zamienić na coś sensowniejszego
 // g_wczytywanie_podstrony = "#wczytywanie_podstrony",
 // g_wczytywanie_spis = "#wczytywanie_spis",	

 g_element_zewnetrzny_spis = "table.galeria",   // g_element_zewnetrzny_spis = "td#tresc_glowna.tlo_artykulow",
 g_tag_do_podmiany_spis = "div#galeria_spis_podmiana",
 g_miejsce_na_spis = "div#galeria_spis",	

 g_ilosc_wszystkich_paginacji_galerii = 0,   // ile ogółem jest podstron ze spisem galerii, w grupach po pięć, poza ostatnią grupą 1..5 elementów 
 g_zaczytana_ilosc_paginacji_galerii = 0,  // ile pozostało podstron poza zaczytaną i wyświetloną podstroną
 g_biezaca_pozycja_galerii = 0,          // które eementy już wyświetlono/zaczytano od ostatniego (jako pierwszego) w grupach po pięć
 g_ilosc_zaczytanych_galerii = 0,		// ile elementów wstawiono do tej pory na stronę
 g_ilosc_wszystkich_galerii = 0,	        // ilość galerii zawartych na www
 g_suma_klikniec_zaladuj = 0,            // zliczanie kliknięc jako żądanie ładowania + auto_ładowanie

 g_wybrany_nr_galerii = 0,               // zapamiętanie co siedzi w polu od numeru galerii (pozycja suwaka)
 g_wybrany_nr_podstrony_galerii = 0,     // zapamiętanie co siedzi w polu od numeru podstrony galerii (też suwak)

 $g_input_nr_galerii	= $('input#galeria_wybrany_nr'), 
 $g_suwak_nr_galerii	= $('input#suwak_galerii'), 
 $g_input_nr_podstrony_galerii = $('input#podstrona_wybrany_nr'), 
 $g_suwak_nr_podstrony_galerii = $('input#suwak_podstrony'),    
 g_niewyslane_podstrony = [],     // wszystkie żądania wyświetlenia ...vs lub tylko te do kolejnych podstron
 g_prezentacja_wczytywania = [],  // niejako kontener na stan wszystkich powiadomień o wczytywaniu  
    
 g_tloSrc = '',   //
 g_ileCzesci = 0,
 g_nazwaPlanszy = '',
 g_nazwaPlanszySciezka = '',
 g_nazwaElementu = '',    
 g_obrazki = [],
 g_przesuniecieTlaX = 0,  // korekta umieszczenia obrazka w tle     
 g_przesuniecieTlaY = 0,  // korekta umieszczenia obrazka w tle    
 g_ktoraGrafika = '',
 g_mojX = '',
 g_mojY= '';    
    
	
// ---------- ***  FUNKCJE PRAWIE GLOBALNE *** --------------		
	
function WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane ) 
{ 
//debugger; 
    if ( element_witryny.length > 0 ) element_witryny = " " + element_witryny; // dodanie spacji na początku, separator dla TAGU po nazwie pliku     				
   
    if ( !dane ) dane = { ktoraPodstrona : 1 }; // aby nie było "TypeError" przy braku tego parametru w auto-wywołaniu bez kliknięcia podstrony (pierwsza podstrona)
        
    //$( g_miejsce_na_spis ).show( 100 ); // zawsze pokaż przestrzeń do załadowania dynamicznego gdyby ukryta (treść zewnętrzna lub błędy...)
    
    // var zawartoscUTF = unescape(encodeURIComponent( zawartoscOryginalna )); // kodowanie zaczytanych znaków?! // ... już załatwione w php
    
    switch ( rodzaj_dzialania ) {
				
        case "galeria_podstrona" :
            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {

            UkryjRamkeLadowania('podstrona');  // jawne ukrycie, niezależnie od wyniku + wywalenie tego z wewnatrz GenerujPodstronyGalerii()  
                if ( status === "success" ) // ("success" / "notmodified" / "error" / "timeout" / "parsererror")
                {
                // logowanie sukcesu ;) -- do tego operacja nad obiektem 'dane', przekazano atrybut 'ktoraPodstrona' zawierający numer podstrony galerii do wyświetlenia 
                console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania '" 
                            + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny 
                            + "'. Docelowo ma być wyświetlona " + dane.ktoraPodstrona + ". podstrona galerii.");
                // WYKONAJ DALSZE FUNKCJE, zależne od SUKCESU zaczytania lub nie	
                // kasuj poprzednią zawartość elementu???	
                NaprawBrakujaceSRCwKontenerze ( tag_podmieniany, true );
                CzyscNiepotrzebneElementy();	
                //GenerujPodstronyGalerii( element_witryny, dane.ktoraPodstrona );
                    if ( $('#nazwa_galerii').hasClass('szara_zawartosc') ) $('#nazwa_galerii').removeClass('szara_zawartosc');  // w przypadku wystąpienia błędu z pobraniem wybranej galerii - aby przywrócić żywe kolory tego kontenera 
                GenerujPodstronyGalerii( tag_podmieniany, dane.ktoraPodstrona );                                        
                }
                else    // każdy inny niż "success" stanowi "zły przebieg"
                {
                // to nie powinno się generalnie wywoływać, lepiej odwołać się do obsługi błędu w CATCH    
                /* var komunikatOBledzie = "Problem z załadowaniem podstrony galerii! Spróbuj ponownie. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;
                $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); */
                var komunikatOBledzie = "STATUS: \"" + status + "\", XHR: " + xhr.status + " - " + xhr.statusText;    
                GenerujPowiadomienieOBledzie({ tytul : 'Problem z załadowaniem podstrony galerii!', tresc : komunikatOBledzie });    // działa lepeij niż wcześniejszy standard
                PrzewinEkranDoElementu('div.blad', 500);    
                }
                if ( status === "complete" )    // test, ale tego stanu być nie powinno
                {
                alert('Test zakończenia żądania - galeria podstrona');
                }
                
            }); //load-END
            } //try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z załadowaniem podstrony galerii! Spróbuj ponownie. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            //alert(komunikatOBledzie);	
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); 
            PrzewinEkranDoElementu('p.blad', 500);    
            }

            break;

        case "spis_galerii" :
            // tylko tu dodanie żądania GET do tablicy -- STANDARDOWO BRAK MOŻLIWOŚCI PONOWIENIA TEGO ŻĄDANIA -- dlatego rozszerzona obsługa błędów 
            g_niewyslane_podstrony.push({ adres : g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny,
                                            tag : tag_podmieniany });
            console.info( g_niewyslane_podstrony );

            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                
            UkryjRamkeLadowania('spis');    // jawne wymuszenie ukrycia powiadomienia o wczytywania aktualnego "spisu treści", niezależnie czy się elementy wczytały, czy wystapił błąd         
                if ( status === "success" )
                {	
                // alert( "LOAD się udała dla zapytania\n" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + pelny_adres + g_element_zewnetrzny );
                // logowanie sukcesu ;)
                console.log( "wykonano load(" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
                //var podmieniona_zawartosc = $(tag_podmieniany).html();
                //$(tag_podmieniany).html( unescape(encodeURIComponent(podmieniona_zawartosc)) );	// jednao z wielu mozliwych zamian kodowania

            // ... // przetwarzanie spisu treści
                NaprawBrakujaceSRCwKontenerze ( tag_podmieniany );
                CzyscNiepotrzebneElementy();	    
                GenerujSpisGalerii();
                UsunPobraneZadanie( adres_zasobu );   // wyrzucenie rekordu z tablicy żądań -- już przetworzono dany odnośnik (!?...ewentualny wpływ asynchroniczności...!?)  
                }
                else
                { 
                    // różnicowanie błędu względem pierwszego przebiegu (wystarczy maksymalnie jeden AND z kolejnych)
                    if ( ( g_ilosc_wszystkich_paginacji_galerii == 0 ) && ( g_zaczytana_ilosc_paginacji_galerii == 0 ) && ( g_biezaca_pozycja_galerii == 0 ) && ( g_ilosc_zaczytanych_galerii == 0 ) )  
                    {
                    $('#galeria_spis').prepend( '<p class="blad_odswiez">Wystąpił problem z odczytaniem zawartości zdalnej. <button class="odswiez_strone">Odśwież stronę</button> </p>' );
                
                    $('#galeria_spis').on('click', '.odswiez_strone', function () {   // nowa obsługa zdarzenia dla nowego elementu -- tu się wykona jako pierwsza
                        location.reload(); 
                    }); // on-click-END
                        
                    }
                    else
                    {
                    var ileRazyBlad = $('.blad_dolaczenia span').text();
                        if ( ileRazyBlad == "" ) ileRazyBlad = 0;
                    ileRazyBlad = parseInt( ileRazyBlad ) + 1;
                    console.info('Błąd niepobrania podstrony spisu treści po raz ' + ileRazyBlad);
                    var komunikatOBledzie = "Problem z dołączeniem kolejnego spisu galerii po raz <span>" + ileRazyBlad + "</span>! (STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + "))";
                    //var trescKomunikatu = '<p class="blad_dolaczany">' + komunikatOBledzie + ' <button>Spróbuj ponownie</button>' + '</p>';    
                    //alert(komunikatOBledzie);
                        if ( ileRazyBlad > 1 )  // zmień istniejący element lub utwórz jego pierwszą instancję
                        {
                        $('.blad_dolaczenia').html( komunikatOBledzie + ' <button>Spróbuj ponownie</button>' );
                        }
                        else
                        {    
                        $('#galeria_spis').prepend( '<p class="blad_dolaczenia">' + komunikatOBledzie + ' <button>Spróbuj ponownie</button>' + '</p>' );
                        }
                    $('.blad_dolaczenia').removeClass('animacja_zolty_blysk').height(); // usunięcie i bzdurny odczyt z DOM...
                    $('.blad_dolaczenia').addClass('animacja_zolty_blysk');  // aby zmienić stan animacji -- od nowa      
                    PrzewinEkranDoElementu('p.blad_dolaczenia', 500);
                    }   // if-END ( g_ilosc_wszystkich_paginacji_galerii == 0 ) && ...
                }   // if-END ( status === "success" )

            }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z dołączeniem kolejnego spisu galerii! STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;   
            //alert(komunikatOBledzie);
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );     
            PrzewinEkranDoElementu('p.blad', 500); 
            }

         break;

        case "wybrana_galeria_rekurencja" :

            try 
            {	
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                if ( status === "success" )
                {
                UsunBrakujaceSRCwIMGPozaPrzekazanym ( tag_podmieniany, dane.pozycjaWGalerii );    
                console.log( "Ładowanie przed rekurencją (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny +"\'");
                    
                    if ( $('#nazwa_galerii').hasClass('szara_zawartosc') ) $('#nazwa_galerii').removeClass('szara_zawartosc'); 
                    
                var namiaryWybranejGalerii = OdczytajTresciOdnosnikaWybranejGalerii ( tag_podmieniany, dane.pozycjaWGalerii );

                UzupełnijNaglowekBiezacejGalerii ( namiaryWybranejGalerii );
                    
                    // poniżej wywołanie ponownego ładowania po określeniu adresu docelowej galerii
                    // to samo miejsce docelowe, tam samo dołączane elementy zaczytane -- nadpisywanie już niepotrzebnej zawartości
                    // $.extend( dane, namiaryWybranejGalerii ); // dodać tę formę?!
                    
                WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, namiaryWybranejGalerii.adres, element_witryny, "wybrana_galeria", dane );    
                    
                    // zmienić parametry wywołania dla rekurencji !!! 
                    // WczytajZewnetrznyHTMLdoTAGU ( tag_podmieniany, adres_domeny, adres_zasobu, element_witryny, rodzaj_dzialania, dane );
   
                }
                else    // cokolwiek, głownie "error"
                {
                UkryjRamkeLadowania('podstrona');      // tu schowania powiadomienia, skoro błąd przerwał docelowe pobieranie treści dla danej galerii      
                //var komunikatOBledzie = "Problem z ładowaniem w tle dla generowania wybranej galerii! STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;
                var komunikatOBledzie = "Problem z ładowaniem w tle dla generowania wybranej galerii! Nie udało się określić wstępnej lokalizacji.<br />STATUS: \"" + status + "\", XHR: " + xhr.status + " - " + xhr.statusText;    
                GenerujPowiadomienieOBledzie({ tytul : 'Błąd pobierania wybranej galerii - wstępny etap!', tresc : komunikatOBledzie });
                    //alert(komunikatOBledzie);
                    // $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );                       
                PrzewinEkranDoElementu('p.blad', 500);
                OdblokujPrzycisk ( '#suwak_galerii_submit' );   // warunkowo zezwól na kolejną próbę, gdyby się pojawił błąd w komunikacji w trakcie 
                }
                

            }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z ładowaniem w tle dla generowania wybranej galerii! STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            //alert(komunikatOBledzie);
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );                 
            PrzewinEkranDoElementu('p.blad', 500); 
            }
                    // ...		
            break;

        case "wybrana_galeria" :

            try 
            {	  // tu "adres_zasobu" już OBECNY jako ścieżka bezwzględna -- ODMIENNA składnia dla zapytania
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
                
            UkryjRamkeLadowania('podstrona');
            OdblokujPrzycisk ( '#suwak_galerii_submit' );    // zezwól na ponowną akcję, zawsze wywoływane niezależnie od powodzenia bieżącej obsługi    
                
                if ( status === "success" )
                {	
                console.log( "Pierwsze ładowanie podwójnie zapętlone (" + rodzaj_dzialania + ") dla elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");

                //UsunBrakujaceSRCwKontenerze ( element_witryny );  // ponowne kasowanie, teraz wszystkie bez wyjątku wylatują elementy  
                    
                // $('#wczytywanie_podstrony').hide(100);	
                // UkryjRamkeLadowania('podstrona');   // dopiero teraz powinno być usunięcie animacji ładowania - ale wewnątrz GenerujPodstronyGalerii() jest takowe    
                $('#skladowisko').empty();  // zerowanie ewentualnej zawartości w tym kontenerze    
                $('#skladowisko').show(100);    
                //$('#skladowisko').show( 100, PrzewinEkranDoElementu( 'div#skladowisko', 200, -8 )  );	// pokaż kontener na zaczytaną zawartość + 
                                                // + przewiń po wyświetleniu całości    
                   
                $('#skladowisko').html('<h1>Tu wkrótce pojawią się elementy - pierwsza podstrona zdjęć z wybranej galerii nr ' + dane.pozycjaWGalerii + 
                                       '</h1><p>Adres docelowej galerii: ' + adres_zasobu + '</p>' );    
                    
                NaprawBrakujaceSRCwKontenerze ( '#skladowisko_status_wybranej_galerii', 'przetwarzaj galerię, nie spis treści' ); // taki teścik
                GenerujPodstronyGalerii ( '#skladowisko_status_wybranej_galerii' );    

                }
                else    // cokolwiek, głownie "error"
                {
                //var komunikatOBledzie = "Problem z pobraniem wskazanej galerii! Ponów próbę. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
                //alert(komunikatOBledzie);
                //$('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
                    
                var komunikatOBledzie = "Problem z załadowaniem wybranej galerii! Nie udało się pobrać docelowej lokalizacji.<br />STATUS: \"" + status + "\", XHR: " + xhr.status + " - " + xhr.statusText;    
                GenerujPowiadomienieOBledzie({ tytul : 'Błąd pobierania wybranej galerii - konkretnej!', tresc : komunikatOBledzie });
    
                PrzewinEkranDoElementu('p.blad', 500);     
                }

            }); // load-END
            } // try-END

            catch (err2) 
            {
            var komunikatOBledzie = "BŁĄD! " + err2 + "/nProblem z pobraniem wybranej galerii! Ponów próbę. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); 
            PrzewinEkranDoElementu('p.blad', 500);     
            alert(komunikatOBledzie);   // tu wyjatkowo zostaje komunikat w formie okna
            }

                // ...		
            break;				

 
        case "wybrany_spis_galerii" :

            try 
            {	  // tu "adres_zasobu" już jako ścieżka bezwzględna
            $(tag_podmieniany).load( g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_domeny + adres_zasobu + element_witryny, function ( odpowiedz, status, xhr ) {
            
            UkryjRamkeLadowania('wybrane_galerie_spis');    // jak poprzedni - jawne wywołanie dla dodolnego ze stanówi i zabranie tef funkcjonalności z Generuj...()     
            OdblokujPrzycisk ( '#suwak_podstrony_submit' );    // zezwól na ponowną akcję, niezależnie od powodzenia bieżącej obsługi - zawsze zostaje to wywołane   
                
                if ( status === "success" )
                {	// dane.wybranaPaginacja
                console.log( "Ładowanie (" + rodzaj_dzialania + ") dla wybranego " + dane.wybranaPaginacja + " elementu '" + tag_podmieniany + "' dla zapytania \'" + g_przechwytywacz_php + g_przechwytywacz_php_zapytanie + adres_zasobu + element_witryny +"\'");
                //PrzewinEkranDoElementu('div#wybrany_zaczytany_spis', 500, -200);
                $('div#wybrane_galerie_spis').removeClass('szara_zawartosc');    
                // Generuj spis wybranej galerii (podstrony spisu treści)
                //$('div#wybrany_zaczytany_spis').show();    
                // $('div#wczytywanie_wybrane_galerie_spis').hide(100);
                NaprawBrakujaceSRCwKontenerze( 'div#skladowisko_wybrane_galerie_spis');
                    
                GenerujSpisWybranejGalerii( 'div#skladowisko_wybrane_galerie_spis', 'div#wybrane_galerie_spis', dane.wybranaPaginacja );
                    // zaczytanie wybranego spisu poniżej już istniejącego spisu
                }
                else    // cokolwiek, głownie "error"
                {
                    
                //var komunikatOBledzie = "Nie można dołączyć wybranej podstrony do spisu galerii! Powtórz działanie. STATUS: " + status + ", XHR: " + xhr.status + " (" + xhr.statusText + ")" ;    
                //alert(komunikatOBledzie);
                //$('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' );
                    
                var komunikatOBledzie = "Problem z załadowaniem grupy wskazanych galerii! Ponów próbę.<br />STATUS: \"" + status + "\", XHR: " + xhr.status + " - " + xhr.statusText;    
                GenerujPowiadomienieOBledzie({ tytul : 'Błąd pobierania grupy galerii!', tresc : komunikatOBledzie });
                    
                PrzewinEkranDoElementu('p.blad', 500);     
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
            var komunikatOBledzie = 'Wystąpił ogólny problem z żądaniem! (PARAMETRY - tag: ' + tag_podmieniany + ', domena: ' + adres_domeny + ', zasób: ' + adres_zasobu + ', elem: ' + element_witryny + ', działanie: ' +  rodzaj_dzialania + ') ... COŚ POSZŁO NIE TAK' ;
            $('#galeria_spis').prepend( '<p class="blad">' + komunikatOBledzie + '</p>' ); 
            PrzewinEkranDoElementu('p.blad', 500);     
            // alert( komunikatOBledzie );
            console.log(komunikatOBledzie);
            //break;
    } //switch-rodzaj_dzialania-END
	
	
	
	function CzyscNiepotrzebneElementy() 
    {
    /* błedy zgłaszana w konsoli dla pobierania niepotrzebnych plików - grafiki:
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
																
} // END-WczytajZewnetrznyHTMLdoTAGU() - DEFINICJA

    

function GenerujPodstronyGalerii ( kontenerZrodlowy, nrWyswietlanejGalerii ) 
{ 	     // poniżej wartości domyślne dla parametrów ES5
nrWyswietlanejGalerii = parseInt( nrWyswietlanejGalerii );    
    if ( ( !kontenerZrodlowy ) || ( kontenerZrodlowy == '') ) kontenerZrodlowy = '#zawartosc_do_podmiany';
    if ( ( nrWyswietlanejGalerii == undefined ) || ( isNaN( nrWyswietlanejGalerii) ) ) nrWyswietlanejGalerii = 1;    
var kontenerDocelowyElement = "div#skladowisko";
var $kontenerDocelowy = $( kontenerDocelowyElement ); 

    
var wysokoscDokumentu = $(document).height();
var wysokoscDivWczytywanie = $('#wczytywanie_podstrony').height();    
var wysokoscDivKomentarz = $('div#komentarz').height();    
var odlegloscPionowaDocelowego = $kontenerDocelowy.offset().top;
var wysokoscOknaPrzegladarki = $(window).height();
console.log("PRZED - Dokument: " + wysokoscDokumentu + "px, Okno: " + wysokoscOknaPrzegladarki + "px, PozycjaY #skladowiska: " + odlegloscPionowaDocelowego 
            + "px, wysokość DIV#wczytywanie: " + wysokoscDivWczytywanie + "px, wysokość DIV#komentarz: " + wysokoscDivKomentarz );
//PrzewinEkranDoElementu('div#skladowisko', 200, -8);  // złe miejsce, przed trteścią


$('nav#nawigacja_galeria').empty().show( 100 );     // czyszczenie kontenera na nawigację galerii, NIEZALEŻNIE czy wcześniej zawierał zawartość + jego pokazanie (gdy pierwsze wyświetlenie pierwszej podstrony)
//$('#wczytywanie_podstrony').hide(100);	// schowaj informację, skoro wczytano zawartość
    // UkryjRamkeLadowania('podstrona');    // - to nie jest typowa funkcja generowania treści... albo się mylę   
$('#glowna div#komentarz').hide(100);	//showaj opis-informację o ile była pokazana
// $kontenerDocelowy.show( 100, PrzewinEkranDoElementu( kontenerDocelowyElement, 200, -8 - (wysokoscDivWczytywanie + wysokoscDivKomentarz) )  );	// pokaż kontener na zaczytaną zawartość + przewiń po wyświetleniu całości
$kontenerDocelowy.show( 100 );	// pokaż kontener na zaczytaną zawartość ... + przewiń po wyświetleniu całości?
    
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

    $('nav#nawigacja_galeria').append('<div class="kontener"><h3>Pozostałe podstrony wybranej galerii</h3></div>');
        
    var nazwaPodstronyGalerii = '';
/*    var numerPodstronyDoWyswietlenia = 0;
    var numerJeszczeNieokreślony = true;   */ 
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
        var nrGalerii = parseInt ( odnosnikPodstrony.substr( odnosnikPodstrony.lastIndexOf(",p") + 2, odnosnikPodstrony.length - 5 )	);
            // http.../u_misiow,a20,p2.html	
            // usuwanie przecinka i "p", które są o "2 przed" numerem podstrony galerii 
            // treść z numerem kończy się ".html" - pomijane te 5 znaków przy krojeniu STRINGU)

            /* if ( numerJeszczeNieokreślony )
            {
            numerPodstronyDoWyswietlenia++;
                if ( ( numerPodstronyDoWyswietlenia < nrGalerii ) || ( numerPodstronyDoWyswietlenia == $listaPodstron.length ) )
                {
                numerJeszczeNieokreślony = false;
                }
            }*/
            
        var nowyPrzycisk = $('<button></button>', {
        // var nowyPrzycisk = $('<input></input>', { 
        // type : "button",            
            id : "galeria_paginacja_" + ( i+1 ),
            class : "przycisk_galeria",
            value : nrGalerii, 
            text : "Podstrona nr " + nrGalerii,
            "data-tag" : g_tag_do_podmiany_zdjecia,
            "data-adres_strony" : g_adres_strony,
            "data-adres_galerii" : odnosnikPodstrony,
            "data-elem_zewn" : g_element_zewnetrzny
        });	     

        $('nav#nawigacja_galeria > div:first').append( nowyPrzycisk ); // wstawianie przycisku innego niż "poprzednia/następna" podstrona danej galerii
                // też brak przycisku dla bieżacej galerii, np. w formie wyłączonego (nieaktywnego), bo brak takiego odnośnika teraz na www
        } // for-END
    } // //if-END $listaPodstron.length >= 1

//przeszukiwanie odnośników dla miniatur w galerii, link z miniatury prowadzi do normalnej (większej) kopii obrazka
// do galerii prowadzą odnośniki z tą klasą, do paginacji niestety też ;) | same zdjęcia i miniatury bez przypisanej klasy dla <a>
var $odnosnikiMiniatur  = $( kontenerZrodlowy + ' a:not(.link_tresc)' );
    //$odnosnikiMiniatur.css({ "border" : "1px solid yellow" }); // testowanie

console.log('Znaleziono na podstronie ' + $odnosnikiMiniatur.length + ' miniatur - dla zmiennej \'' + g_tag_do_podmiany_zdjecia + '\'' );

        // zweryfikować obliczenie bieżącej galerii we wcześniejszej pętli ...
    
$( g_miejsce_na_zdjecia ).empty(); // czyszczenie bieżącej podstrony, dla wyświetlenie nowej galerii 
$( g_miejsce_na_zdjecia ).append('<h2>Zdjęcia z bieżącej <span>' + nrWyswietlanejGalerii  + '.</span> podstrony galerii</h2>');  // dopisanie nagłówka dla bieżącej galerii - z parametru wywołania
//$( g_miejsce_na_zdjecia ).append('<h2>Zdjęcia z bieżącej ' + numerPodstronyDoWyswietlenia  + '. podstrony wybranej galerii</h2>');  // dopisanie nagłówka dla bieżącej galerii OBLICZONEGO, na podstawie przebiegu 
    
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
    // przeklejenie - wstawienie odnośników do zdjęć w innym, właściwym obszarze
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
    
	

function GenerujSpisGalerii() 
{

 // skoro logika jest w wyswietlaniu ramki ładowania... to może ten warunek psuje efekt?!
/*
    // schowaj informację, skoro wczytano zawartość
    // if ( ( g_biezaca_pozycja_galerii > 0 ) && ( ( g_biezaca_pozycja_galerii + 1 ) >= g_suma_klikniec_zaladuj ) ) $( g_wczytywanie_spis ).hide(100);
    if ( ( g_biezaca_pozycja_galerii > 0 ) && ( ( g_biezaca_pozycja_galerii + 1 ) >= g_suma_klikniec_zaladuj ) ) UkryjRamkeLadowania('spis');
                                            // 'pozycja' się inkrementuje dopiero po ewentualnych dalszych przetworzeniach w tej funkcji
*/
    // dodanie jawnego ukrywania bez warunków na kolejne kliknięcie w trakcie bądź w pierwszym przebiegu
    // UkryjRamkeLadowania('spis');     // lepie to "uzewnątrznić"
    
$( g_miejsce_na_spis ).show(100);	

//debugger;	

// tworzenie szablonu spisu
 //g_zaczytana_ilosc_paginacji_galerii = $( g_miejsce_na_spis + " div.kontener_odnosnik" ).length; // ma być o 5 więcej niż na stronie (szablon do wstawienia), co to robi???
g_zaczytana_ilosc_paginacji_galerii = 0; // i tak późniejsza pętla działa zawsze na +5 elementów na stronie, nie oblicza warunku na podstawie 
	
    if ( g_biezaca_pozycja_galerii === 0 )		// pierwsze przejście -- przetwarzamy pierwszy odnośnik, który zawiera najwyższy numer galerii
    {
    //$( g_wczytywanie_spis ).hide(100); // ukrycie animacji ładowania przy pierwszym zaczytywaniu automatycznym
    // UkryjRamkeLadowania('spis');    // chwilowo wylatuje, warunek 
        
    // UkryjRamkeLadowania ('');    
    g_ilosc_zaczytanych_galerii	= -5 ;
    var $temp_odnosnik_tytul = $( g_tag_do_podmiany_spis + " td.galeria_kolor b a.link:first" );	 // dobre do czasu, o ile nie powstanie nowa galeria w trakcie przeglądania starej listy! 
    var atrybut_href = $( $temp_odnosnik_tytul ).attr('href'); // np. "http://zlobek.chojnow.eu/u_tygryskow,a153.html"
    //temp_atrybut = temp_atrybut.split(",")[1]; // jest dobre, ale leży przy dodanym ',' w adresie odnosnika (jako treść)
    var atrybut_href_pozycja = atrybut_href.lastIndexOf(",a");		    // łatwiejsze nawigowanie z kontekstem - "a" jako numerem galerii
    atrybut_href = atrybut_href.substr( atrybut_href_pozycja + 2 ); // +2 znaki za pozycją (',' i 'a'), poprawna konwersja liczby na początku danego ciągu
    g_ilosc_wszystkich_galerii = parseInt( atrybut_href );
    
        if ( ( $temp_odnosnik_tytul.length == 0 ) && ( atrybut_href == '' ) )
        {
            $('#galeria_spis').prepend( '<p class="blad_odswiez">Wystąpił problem z odczytaniem zawartości zdalnej (1). <button class="odswiez_strone">Odśwież stronę</button> </p>' );
                
/*            $('#galeria_spis').on('click', '.odswiez_strone', function () {   // ta obsługa zdarzenia już określona  
                location.reload(); 
            }); // on-click-END*/
        
        }
            
        //g_ilosc_wszystkich_paginacji_galerii    // też szukamy "najostatniejszej" paginacji - podstrony z najwyższym numerem/odnośnikiem
        // czy to mniej zasmieci przestrzeń? (+) nie potrzeba tworzyć tablicy X-elementów, aby pobrać tylko jej ostatni lub przedostani element
    var ostatniaPaginacja = $( g_tag_do_podmiany_spis + " table.galeria tbody tr td a.link_tresc:last" );  // "najbardziej optymalny" wyróżnik toto nie jest 
   
    var ilePaginacji = parseInt( ostatniaPaginacja.text() );
    
        if ( isNaN(ilePaginacji) ) // jeśli mamy "starsze >>" jako ostatnie to wynikiem konwersji jest 'NaN'
        {
        ostatniaPaginacja.remove(); // usuń ostatni element, po czym pobierz "nowy ostatni" -- tak samo jak powyżej 
        ostatniaPaginacja = $( g_tag_do_podmiany_spis + " table.galeria tbody tr td a.link_tresc:last" );    
        
        ilePaginacji = parseInt( ostatniaPaginacja.text() ); //  zmieniana "warunkowo" treść z warunku
        
            if ( isNaN( ilePaginacji ) || isNaN( g_ilosc_wszystkich_galerii ) ) // jakoby nowy warunek w istniejącym warunku, ale zmienionym już -- zawsze wstawi tylko jeden element info o błędzie
            {
            $('#galeria_spis').prepend( '<p class="blad_odswiez">Wystąpił problem z odczytaniem zawartości zdalnej (2). <button class="odswiez_strone">Odśwież stronę</button> </p>' );
/*            $('#galeria_spis').on('click', '.odswiez_strone', function () {   // ta obsługa zdarzenia już określona 
                location.reload(); 
            }); // on-click-END*/
            }
        }

    //alert('ILE_PAGINACJI: ' + ilePaginacji);
        if ( ilePaginacji > 0 ) g_ilosc_wszystkich_paginacji_galerii = ilePaginacji;  // warunkowe przypisanie zaczytanego maksimum podstron (ewentualnego), gdy SĄ JUŻ WPISY w ilości > 5, dla 1..5 będzie lipa    
        
    //odniesie tej wartości do maksymalnej wartośc przesuwu suwaka wyboru galerii + inicjowanie suwaka i inputa na tę wartość
    console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii i wyboru podstron ...');		

    g_wybrany_nr_galerii = g_ilosc_wszystkich_galerii;
        if ( g_wybrany_nr_galerii > 1 ) g_wybrany_nr_galerii = parseInt( g_wybrany_nr_galerii / 2 );    // ustawienie na połowie wartości przedziału
        
    $g_suwak_nr_galerii.attr( 'max' , g_ilosc_wszystkich_galerii );     // ustalenie zakresu maksymalnego dla suwaka
    $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );	
    $g_input_nr_galerii.val( g_wybrany_nr_galerii );	

    g_wybrany_nr_podstrony_galerii = g_ilosc_wszystkich_paginacji_galerii;
        if ( g_wybrany_nr_podstrony_galerii > 1 ) g_wybrany_nr_podstrony_galerii = parseInt( g_wybrany_nr_podstrony_galerii / 2 );   // ustawienie na połowie wartości przedziału        
        
    $g_suwak_nr_podstrony_galerii.attr( 'max' , g_ilosc_wszystkich_paginacji_galerii );
      // jednak bez ustawiania na maksimum, bo to okresla PIERWSZĄ podstronę spisu treści galerii, a nie ostatnią... więc zostaje automat albo 'MIN' 
    $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );	
    $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        
        
    console.log('Ustalanie ZACZYTANYCH wartości pól formularza przeglądania galerii... PO -- g_wybrany_nr_galerii: ' + g_wybrany_nr_galerii + ', a POZYCJA: ' + atrybut_href_pozycja 
                                                    + ' dla odnośnika: ' + atrybut_href );		

    PrzewinEkranDoElementu( 'div#zaczytany_spis > h2', 500, 2 );    // Przewinięcie do znalezionych galerii - tylko przy pierwszym-auto-załadowaniu treści
    //g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5;

    //g_biezaca_pozycja_galerii++; // powinno to pozostać, bo przecież to jest jak symulowanie naciśnięcia pierwszego pobrania galerii   
    // g_biezaca_pozycja_galerii++;	// indeks wyświetlanej aktualnie (kolejno) galerii	-- inkrementację dodano w zdarzeniu naciskania obiektu "ZAŁADUJ GALERIE" 
    
    g_suma_klikniec_zaladuj++;  // użycie w ch-rze licznika automatycznego     
    } //if-END ( g_biezaca_pozycja_galerii === 0 )

    
g_biezaca_pozycja_galerii++;
g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; //inkrementacja o każde 5 zdjęc z poszczególnych zaczytanych galerii 	

    // poniższy log przeniesiono z początku tej funkcji z uwagi na celowość wyświetlania w nim zaczytanych danych z zewnatrz przy pierwszym przebiegu
console.log('Wszystkich podstron jest ' + g_ilosc_wszystkich_paginacji_galerii + ', zaczytano ' + g_zaczytana_ilosc_paginacji_galerii 
            + ' podstron, pozycja w galerii to ' + g_biezaca_pozycja_galerii +', a kliknięć było ' + g_suma_klikniec_zaladuj + '.');        
    	
//	for( var i=1 + g_zaczytana_ilosc_paginacji_galerii ; i <= 5 + g_zaczytana_ilosc_paginacji_galerii ; i++ ) {
    
var odnosnikPojemnik = '';  // do przechowywania spisu galerii, będzie budowana treść htmla dla kolejnych elementów
    
	for( var i=1 ; i <= 5  ; i++ ) {	// zawsze +5 elementów DIV, po co je wcześniej zliczać?
	 
	/* var odnosnikPojemnik = '<div id="kontener_odnosnik_' + String(i) + '" class="kontener_odnosnik"><div id="zdjecie_odnosnik_' + String(i) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener_tekstowy_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div></div>'; 	*/
	
	odnosnikPojemnik += '<div id="kontener_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="kontener_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i + g_ilosc_zaczytanych_galerii) + '</div><div class="kontener_tekstowy_odnosnik"><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div><div class="dolna_zaslonka"></div><div class="szczegoly"><p>XXXX</p><p><span>galeria</span><br />podstrona</p><p>YYY</p></div></div>'; 	
	}	
$( g_miejsce_na_spis ).append( odnosnikPojemnik );		// tworzenie naraz pięciu elementów -- odnośników dla spisu galerii
		
//akcja wypełniacz - zdjęcia
var $odnosnikiZdjecia = $( g_tag_do_podmiany_spis + " td.galeria_kolor a.link_tresc" );	
	
    if ( $odnosnikiZdjecia.length > 0 )
    {
        for( var i=0 ; i < $odnosnikiZdjecia.length ; i++ ){
            // usuwanie niepotrzebnej klasy, najprostsze/najszybsze bezpośrednio poprzez JS
        $( $odnosnikiZdjecia[i] ).removeAttr('class').attr('data-href', $( $odnosnikiZdjecia[i] ).attr('href') ).removeAttr('href') ;   
            // lepiej wywalić cały atrybut 'class', bo i tak zostaje pusty gdy się tylko usunie z niego klasę "link_tresc" ;
            // podobnie wylatuje 'href', aby nie komplikować z przyciskami myszy ;) -- wm jego miejsce tworzony zastępca 'data-href'
            
        var miejsceDocelowe = $( g_miejsce_na_spis + " .zdjecie_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );
            // ta zmienna będzie używana w dalszych iteracjach, na rzecz każdego z fragmentów/atrybutów składowych docelowego odnośnika spisu treści galerii     
 
            // po wprowadzniu funkcji naprawiającej globalnie SRC juz nie poptrzebne sklejanie odnośnika
        // var src_docelowe = g_protokol_www + g_adres_strony + "/" + $( $odnosnikiZdjecia[i] ).find('img').attr( "src");	
        //var src_docelowe = $( $odnosnikiZdjecia[i] ).find('img').attr( "src");	// to niepotrzebne, bo już SRC naprawione
        // $( $odnosnikiZdjecia[i] ).find('img').attr( "src", src_docelowe );
        $( miejsceDocelowe ).html( $odnosnikiZdjecia[i] ); // podmiana oryginalnej zawartości
        }
    }

	//akcja wypełniacz - tytuły
var $odnosnikiTytuly = $( g_tag_do_podmiany_spis + " td.galeria_kolor b a.link" );	
	
    if ( $odnosnikiTytuly.length > 0 )
    {
    var ktoraToGaleria = '';
    var ktoraToPodstrona = 0;    
    var trescTytulu = '';    
        
        for( var i=0 ; i < $odnosnikiTytuly.length ; i++ ){
            // np. http://zlobek.chojnow.eu/u_misiow_i_motylkow,a3.html     // "a" + nr_galerii + ".html"
        ktoraToGaleria = $( $odnosnikiTytuly[i] ).removeAttr('class').attr('href'); // pobranie 'href" + wcześniejsze wywalenie pustego 'class' z tego odnośnika
        ktoraToGaleria = parseInt( ktoraToGaleria.substr( ktoraToGaleria.lastIndexOf(",a") + 2 ) ); // całość przekształcenia w jednym przypisaniu
        
        ktoraToPodstrona = KtoraPodstronaWGalerii ( ktoraToGaleria ); // obliczenie podstrony dla aktualnej galerii (wszystkie [1..5] ładowane w jednym rzucie powinny mieć identyczna podstronę!)
            
            // skoro pierwotny 'href' już użyto (odczytano), to podmiana na 'data-href' i rezygnacja z wzorcowego atrybutu
        $( $odnosnikiTytuly[i] ).attr('data-href', $( $odnosnikiTytuly[i] ).attr('href') ).removeAttr('href') ;   
            
            // uaktualnienie numerem galerii i podstrony w tejże galerii od razu w rodzicu, bez dwóch odwołań potomnych poprzez .text()    
        miejsceDocelowe = $( g_miejsce_na_spis + " .szczegoly:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" ); 
            // POCZĄTEK UŻYCIA jako ZMIENNEJ TYMCZASOWEJ innej zmiennej, która przyjmuje treść zaczytanego tytułu danego elementu!
            // <p>XXXX</p><p>galeria<br />podstrona</p><p>YYY</p>
        // trescTytulu = '<p>' + ktoraToGaleria + '</p><p><span>galeria</span><br />podstrona</p><p>' + g_biezaca_pozycja_galerii + '</p>';
        trescTytulu = '<p>' + ktoraToGaleria + '</p><p><span>galeria</span><br />podstrona</p><p>' + ktoraToPodstrona + '</p>';
        $( miejsceDocelowe ).html( trescTytulu ); // KONIEC UŻYCIA jako zmiennej tymczasowej innej zmiennej!   
            
        miejsceDocelowe = $( g_miejsce_na_spis + " .tytul_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

        	// nadawanie zmienionej formy wyświetlania odnośnika tekstowego	(tytuł galerii)
        trescTytulu = $( $odnosnikiTytuly[i] ).text();
        $( $odnosnikiTytuly[i] ).removeClass('link').wrapInner('<h2></h2>'); // usuwanie obcej klasy link i wstawianie do wewnątrz <h2>
            if ( trescTytulu.length < 15 ) 
            { 
            $( $odnosnikiTytuly[i] ).find('h2').addClass('wyzszy'); // klasa ze zwiększonym odstępem pionowym - wyśrodkowanie w pionie
            }				
            if ( ( trescTytulu.length >= 25 ) && ( trescTytulu.length < 35 )  ) 
            { 
            $( $odnosnikiTytuly[i] ).find('h2').addClass('mniejszy'); // klasa z mniejszą czcionką o 25% pkt.
            }
            if ( trescTytulu.length >= 35 ) 
            { 
            $( $odnosnikiTytuly[i] ).find('h2').addClass('najmniejszy'); // kolejne zmniejszenie czcionki tytułu  dla <h2>    
            }
        $( miejsceDocelowe ).html( $odnosnikiTytuly[i] );  // podmiana oryginalnej zawartości tytułu
        }
    }

	//akcja wypełniacz - data
var $odnosnikiData = $( g_tag_do_podmiany_spis + " td.galeria_kolor font" );	
	
    if ( $odnosnikiData.length > 0 )
    {
        for( var i=0 ; i < $odnosnikiData.length ; i++ ){
        miejsceDocelowe = $( g_miejsce_na_spis + " .data_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

         // zmiana treści wyświetlanej, lekka modyfikacja tekstu przy dacie i godzienie 
        var tekstDocelowy = $( $odnosnikiData[i] ).text();

        tekstDocelowy = tekstDocelowy.replace( "data publikacji: ", "z dnia: ");
    // poniższe niepotrzebne, tylko kilka liter -- nie ma potrzeby podmieniać i modyfikować znacznika jako HTML	        
    //tekstDocelowy = tekstDocelowy.replace('<font>', '' );
    //tekstDocelowy = tekstDocelowy.replace('</font>', '' );
    //$( $odnosnikiData[i] ).text( tekstDocelowy ).removeAttr("style");
    //$( miejsceDocelowe ).html( $odnosnikiData[i] );
        $( miejsceDocelowe ).text( tekstDocelowy );	
        }
    }
	
		//akcja wypełniacz - opis
var $odnosnikiOpis = $( g_tag_do_podmiany_spis + " td blockquote div[align=justify]" );	
	
    if ( $odnosnikiOpis.length > 0 )
    {
        for( var i=0 ; i < $odnosnikiOpis.length ; i++ ) {
        miejsceDocelowe = $( g_miejsce_na_spis + " .opis_odnosnik:eq(" + ( g_ilosc_zaczytanych_galerii + i ) + ")" );

        var trescOpisu = $( $odnosnikiOpis[i] ).text() ;	
        $( miejsceDocelowe ).html( trescOpisu );			

        // problemy z określeniem wysokości łącznej zaczytanej treści (tytuł + obrazek + data + opis) - często jeszcze w trakcie ładowania obrazka...
        // wysokość obrazka w zakresie (częste minimum wstawianych zdjęć ) [120...320]px (jak narzucono w css), treść opisu losowo długa;
        // wyskakują wysokości dla szablonu pojemnika - obrazki w trakcie (pierwszego) ładowania; dobra wysokośc gdy już są w cache (pobrane wcześniej);    
        // łatwiej jest ukrywać nadmiar w <div.opis>, niż mierzyć wysokośc zaczytywanego obrazka (przechwytywanie zdarzenia ładowania) i skracać wysokośc
        // tego <div> o pozostałą wysokość.... + zasłanianie tekstu przy końcu całego pojemnika prostokątem z przezroczystym gradientem/pełnym kolorem
        // ... niepotrzebna treść wyleciała      
        } // for-END
    } // if-end $odnosnikiOpis
	
	// czyszczenie kontenera źródłowego, dla testów pozostaje paginacja galerii -- docelowo zerować cały pojemnik źródłowy
$( g_tag_do_podmiany_spis + ' tr' ).not(':last').remove();
	// obowiązakowe czyszczenie nadmiaru, warunek na szablon vs na ilość załadowanych
//debugger;
	
var $nadmiar = $( g_miejsce_na_spis + " div.kontener_odnosnik:has(h3)");
    if ( $nadmiar.length > 0 ) 
    {       // FOR lepszy, czy zostawić '$nadmiar.each( function() { ... }'? -- wydajność vs lepszy dostęp do elementów w jQ  
        for (var i=0; i < $nadmiar.length ; i++) {
        console.log('Znaleziono nadmiar w ilości ' + (i+1) + ' wpisu/wpisów z ' + $nadmiar.length + ' dla obiektu o id="' + $( $nadmiar[i] ).attr('id') + '", który usunięto.');
            // $( $nadmiar[i] ).css({ "backgroundColor" : "#933" }); 
        $( $nadmiar[i] ).remove();      // kasowanie pustych pojemników na odnośniki do galerii
        g_ilosc_zaczytanych_galerii--;	// !!! -- konieczna korekta ilości zaczytanych galerii (istotne przy ostatniej podstronie, bo zawsze są +5 załadowania)
        }
    }
	
	if ( g_ilosc_zaczytanych_galerii >= g_ilosc_wszystkich_galerii ) // warunkowo drugie czyszczenie, póki co tylko w formie wizualnego ostrzeżenia
	{
	//$( g_miejsce_na_spis + " div.kontener_odnosnik:gt(" + ( g_ilosc_wszystkich_galerii - 1 )+ ")" ).css({ "backgroundColor" : "#666" });	
    $( g_miejsce_na_spis + " div.kontener_odnosnik:has(h3)").css({ "backgroundColor" : "#666" });  // masz <h3> to "wypad"	
    // $( g_miejsce_na_spis + " div.kontener_odnosnik:has(h3)").remove();  // docelowo zamienić linię powyższą na tę linie, choć nie powinno mieć to miejsca	    
	}
	
    // już niepotrzebne, tylko diagnostyka -- poniższe wybierało nagłówki oraz jako ostatnie paginacje dla wszystkich podstron galerii  
var $wierszeTabeli = $( g_tag_do_podmiany_spis + " tr:nth-child(4n-3)" ); // wybór każdego pierwszego "nagłóweka" w danej tabelce, także spis treści (całej paginacji)
	
    $wierszeTabeli.each( function() {
    $(this).css({ "border" : "1px dotted blue" });	
	}); // each-END
	
//$wierszeTabeli.length	... już porzucona diagnostyka -- lepiej operować na zliczaniu odnośników od paginacji spisów galerii  
	
	// nadal przegląd tego kontenera źródłowego, bo w innym podmienianym (spisie treści) też są te same klasy i identyczna struktura zagnieżdżenia!!! 
var $listaPodstron = $( g_tag_do_podmiany_spis + ' td[colspan=2] a.link_tresc' ); 

	if ( $listaPodstron.length >= 1 )	// czy są jakieś odnośniki do podstron galerii?
	{	// pierwsza podstrona nie zawiera odnośników do przejścia +1 w przód / -1 w tył -- "starsze" i "nowsze"!
        // nie tylko to, że na pierwszej nie można się cofnąc, ale też nie można pójść o krok +1 do przodu do "starszych"
        // startujemy od kolej strony po pierwszej, ale ostatni zawiera ciąg "starsze", a później każdy kolejny zawiera "nowsze" na początku oraz "starsze" na końcu;
		// do tego pominięcie indeksu aktualnie wyświetlanej paginacji, nie jest już odnośnikiem tylko zwykłym tekstem (czerwonym i pogrubionym); 
        // liczba odnośników stanowi liczbę paginacji galerii, ale jest pomijany pierwszy i ostatni... więc potrzebna korekta -2 i +1 brakująca (aktualna)	
	var ilePodstronSpisuTresci = 0;
		for (var i=0 ; i < $listaPodstron.length ; i++ ) {    // ta pętla zawsze liczy dobrze, odrzuca ewentualne +/- podstrona, ale też dodaje bieżącą podstronę
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
	
$('h2#zaladuj_galerie_spis').show();  // pokaż przycisk/element do ładowania kolejnych galerii 
$('div#selektor').show();   // też natychmiast pokaż przycisk-kontener do wybiórczego ładowania wybranych treści
} // GenerujSpisGalerii-END

    
        
    
                // * ** *** TO  PONIŻEJ  EDYTUJESZ *** ** * 
    
function GenerujSpisWybranejGalerii ( kontenerZrodlowy, kontenerDocelowy, nrPodstrony ) 
{
// warto byłoby połaczyć te funkcje i utworzyć jedną, by tworzyć nowe elementy dla wybranej jak róznież każdej kolejnej zaczytywanej galerii, ale...
// ...zbyt dużo warunków na wyszukiwanie i wstawianie (bądź nie) pewnych atrybutów dla elementów DOM, do tego liczenie globalne lub nie;
// pozostaje uproszczona wersja, co bazuje na poprzedniku, ale odrzuca część jego obliczeń i operacji;
// generować teraz całe elementy, czy fragmentami po kawałku jak wcześniej?    
    
    // policzenie czegoś, co określi bezposrednio tę ilość, gdy brak wprost takowego kontenera w źródle... <img> się nada 
var ileGaleriiNaPodstronie = $( kontenerZrodlowy + ' td.galeria_kolor a.link_tresc img' ).length;    
    
    if ( ileGaleriiNaPodstronie > 0)    // jeżeli są jakieś elementy to robimy całość kopiowania/przenoszenia
    {
    var nowyPojemnik = '';    
            // tworzenie pustej struktury, do zapełnienia zaczytaną zawartością
        for( var i=1 ; i <= 5  ; i++ ) {	// maksymalnie pięc elementów się zaczyta, ewentalny nadmiar zostanie usunięty
            // budowanie długiego zestawu pojemników
            // '<div id="kontener_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="kontener_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i + g_ilosc_zaczytanych_galerii) + '</div><div class="kontener_tekstowy_odnosnik"><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div><div class="dolna_zaslonka"></div><div class="szczegoly"><p>XXXX</p><p>galeria<br />podstrona</p><p>YYY</p></div></div>'
        //nowyPojemnik += '<div id="wybrany_kontener_odnosnik_' + String(i) + '" class="kontener_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_wybrany_odnosnik_' + String(i) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i) + '</div><div class="kontener_tekstowy_odnosnik"><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum... nie będzie</div></div><div class="szczegoly">testowa zawartość</div></div>'; 	
        nowyPojemnik += '<div id="wybrany_kontener_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="kontener_odnosnik"><div class="tytul_odnosnik"><h3>Tytuł odnośnika nr '	+ String(i) + ' </h3></div><div id="zdjecie_odnosnik_' + String(i + g_ilosc_zaczytanych_galerii) + '" class="zdjecie_odnosnik">Zdjęcie nr ' + String(i + g_ilosc_zaczytanych_galerii) + '</div><div class="kontener_tekstowy_odnosnik"><div class="data_odnosnik">Data galerii</div><div class="opis_odnosnik">A tu nieco więcej tekstu, dokumentującego opis tej galerii ' + String(i) + '. Więcej wypełniacza typu lorem ipsum...</div></div><div class="dolna_zaslonka"></div><div class="szczegoly"><p>XXXX</p><p><span>galeria</span><br />podstrona</p><p>YYY</p></div></div>'; 	

        }  
    $( kontenerDocelowy ).empty();  // zerowanie wcześniejszej zawartości    
    $( kontenerDocelowy ).append( nowyPojemnik );  // wstawienie tych pięciu wygenerownych kontenerów-szablonów za jednym podejściem
    
            //przeklejanie zdjęć pomiędzy kontenerami ( w zasadzie to <a> ze <img>)
    var $szukaneElementy = $( kontenerZrodlowy + " td.galeria_kolor a.link_tresc" );	// tak naprawdę to przeklejany jest cały <a> razem z <img> wewnątrz
    var miejsceDocelowe = '';

        if ( $szukaneElementy.length > 0 )
        {
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ){
                // najpierw wylatuje atrybut klasy, bo nie ma przewidzianego osobnego stylu w css, a 'link_tresc' też nie wnosi żadnej logiki
                // tworzenie 'data-href' w celu podmiany zamiast domyślnego 'href' + usuwanie pierwotnego atrybutu
            $( $szukaneElementy[i] ).removeAttr('class').attr('data-href', $( $szukaneElementy[i] ).attr('href') ).removeAttr('href') ;      
                
            miejsceDocelowe = $( kontenerDocelowy + " .zdjecie_odnosnik:eq(" + i + ")" );

                // użycie funkcji naprawiającej ścieżkę do SRC pozwala przekleić obrazek (w trakcie ładowania) do innego obszaru dokumentu 
            $( miejsceDocelowe ).html( $szukaneElementy[i] ); // przeniesienie ze źródłowej lokalizacji
            }
        }

    //akcja wypełniacz - tytuły
    $szukaneElementy = $( kontenerZrodlowy + " td.galeria_kolor b a.link" );	

        if ( $szukaneElementy.length > 0 )
        {
        var ktoraToGaleria = '';
        var trescSzczegolow = '';    
            
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ){
            // dodatkowo odczytanie numeru galerii, aby od razu to wyświetlić wraz z numerem podstrony    
            ktoraToGaleria = $( $szukaneElementy[i] ).removeAttr('class').attr('href'); // pobranie 'href" + wcześniejsze wywalenie pustego 'class' z tego odnośnika    
            ktoraToGaleria = parseInt( ktoraToGaleria.substr( ktoraToGaleria.lastIndexOf(",a") + 2 ) ); // w jednym przypisaniu wiele instrukcji, bez rozbijania na pojedyncze
  
                // tworzenie 'data-href' w celu podmiany zamiast domyślnego 'href' i usuwanie tego pierwotnego atrybutu
            $( $szukaneElementy[i] ).attr('data-href', $( $szukaneElementy[i] ).attr('href') ).removeAttr('href') ;              
                
            trescSzczegolow = '<p>' + ktoraToGaleria + '</p><p><span>galeria</span><br />podstrona</p><p>' + String( parseInt( nrPodstrony ) ) + '</p>'; // w razie gdyby jakieś niewłaściwe wywołanie dla tego parametru 
            miejsceDocelowe = $( kontenerDocelowy + " .szczegoly:eq(" + i + ")" ); 
            miejsceDocelowe.html( trescSzczegolow );
                
                // ponowne posłużenie się tą samą zmienną dla innego równorzędnego kontenera   
            miejsceDocelowe = $( kontenerDocelowy + " .tytul_odnosnik:eq(" + i + ")" );

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
            }
        }

    //akcja wypełniacz - data
    $szukaneElementy = $( kontenerZrodlowy + " td.galeria_kolor font" );	

        if ( $szukaneElementy.length > 0 )
        {
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ){
            miejsceDocelowe = $( kontenerDocelowy + " .data_odnosnik:eq(" + i + ")" );

            tekstDocelowy = $( $szukaneElementy[i] ).text();
            tekstDocelowy = tekstDocelowy.replace( "data publikacji: ", "z dnia: ");  // proste zastąpienie tekstu innym ciągiem, aby nie kopiować znaczników 
            $( miejsceDocelowe ).text( tekstDocelowy );	
            }
        }

    //akcja wypełniacz - opis
    $szukaneElementy = $( kontenerZrodlowy + " td blockquote div[align=justify]" );	

        if ( $szukaneElementy.length > 0 )
        {
            for( var i=0 ; i < ileGaleriiNaPodstronie ; i++ ) {
            miejsceDocelowe = $( kontenerDocelowy + " .opis_odnosnik:eq(" + i + ")" );

            tekstDocelowy = $( $szukaneElementy[i] ).text() ;	
            $( miejsceDocelowe ).html( tekstDocelowy );			
            }

        // problemy z określeniem wysokości łącznej zaczytanej treści (tytuł + obrazek + data + opis) - często jeszcze w trakcie ładowania obrazka...
        // wysokość obrazka od (częste minimum) [120...320]px (jak narzucono w css), treść opisu losowo długa;
        // wyskakują wysokości dla szablonu pojemnika - obrazki w trakcie (pierwszego) ładowania, dobra wysokośc gdy już są w cache (pobrane wcześniej)    
        // proście jest ukrywać nadmiar w <div.opis>, niż mierzyć wysokośc zaczytywanego obrazka (przechwytywanie zdarzenia ładowania) i skracać wysokośc
        // <div> tekstowego o pozostałą wysokość całego pojemnika.... + zasłanianie tekstu przy końcu całego pojemnika prostokątem z gradientem/pełnym;
        // niepotrzebna treść wyleciała    
        } // if-end opis

        // czyszczenie kontenera źródłowego
    $( kontenerZrodlowy + ' tr' ).not(':last').remove();    // po wycięciu prawie całej zawartośc tabelki pozostaje tylko z niej spis podstron 

    } // if-END ( ileGaleriiNaPodstronie > 0 )

    // obowiązakowe czyszczenie nadmiaru, warunek na element szablonu vs na ilość załadowanych
var $nadmiarPojemnikow = $( kontenerDocelowy + " div.kontener_odnosnik:has(h3)");
    
    if ( $nadmiarPojemnikow.length > 0 ) 
    { 
        // na for(), już śmiga
        for (var i=0; i < $nadmiarPojemnikow.length ; i++) {
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
odczytaneNamiary.srcObrazka = roboczaWartosc;
roboczaWartosc = $( przeszukiwanyKontener + " td.galeria_kolor font:eq(" + parseInt( pozycjaElementuWGalerii ) + ")" ).text();    
odczytaneNamiary.data = roboczaWartosc.replace("data publikacji: ", "z dnia: "); 
    
console.log('Przeszukując "' + przeszukiwanyKontener + '" natrafiono na datę publikacji "' + roboczaWartosc + '" dla tytułu o indeksie +' + pozycjaElementuWGalerii );
    // kasowanie SRC z IMG dla wskazanego tytułu galerii, aby nie było problemu z GET dla otrzymanego wycinka witryny macierzystej 
$( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img:eq(" + parseInt( pozycjaElementuWGalerii ) + ")" ).removeAttr('src');
return odczytaneNamiary;    // zwróć obiekt 

} // OdczytajTresciOdnosnikaWybranejGalerii-END
    

	

    
// ---------- *** PRACA NA RZECZ APLIKACJI *** --------------	    
    
    
function NaprawBrakujaceSRCwKontenerze ( przeszukiwanyKontener, kontenerGalerii )
{   // dodawanie działającej ścieżki dla obrazka, w spisie treści galerii oraz w każdej z podstron galerii 
var srcObrazka = '';    
var $obrazkiTytuloweGalerii = ''; 
    if ( !kontenerGalerii ) $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img"); // ~(spis treści) to obrazki w galerii
    else $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " a:not(.link_tresc) img");
    
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
    if ( !kontenerGalerii ) $obrazkiTytuloweGalerii = $( przeszukiwanyKontener + " td.galeria_kolor a.link_tresc img");
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

        if ( wartoscBiezaca < 0 )  
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
    else    // tryb dla pola wyboru podstrony galerii, gdy mzienna == ('cokolwiek' / 2 && TRUE)
    {           // te same warunki, tylko zakresy i elementy formularza inne
        if ( ( wartoscBiezaca === undefined ) || ( isNaN( wartoscBiezaca ) ) ) 
        {
        wartoscBiezaca = 1;   
        $g_input_nr_podstrony_galerii.val( wartoscBiezaca );
        $g_suwak_nr_podstrony_galerii.val( wartoscBiezaca ); 
        }

        if ( wartoscBiezaca < 0 )  
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

    
    
function UzupełnijNaglowekBiezacejGalerii ( galeria, diagnostyka ) 
{ // atrybuty { tytul, opis, srcObrazka, data }
var trescDaty = galeria.data;   // przykładowa: "z dnia: 2016-02-25 18:45"
trescDaty = trescDaty.slice( trescDaty.indexOf(":")+2, trescDaty.lastIndexOf(":")-3 ); 
trescDaty = '(' + trescDaty.replace(/-/g, '.') + ')'; // zamiana WSZYSTKICH dwóch łaczników na kropki
    
var trescHtml = '<div class="kontener"><h2>' + galeria.tytul + '</h2>'; // najpierw <h2>, aby go ewentualny <img> z float nie wyprzedzał na wąskim ekranie
trescHtml += '<img src="' + galeria.srcObrazka +'" alt="' + galeria.tytul + '" />';
// trescHtml += '<h2>' + galeria.tytul + ' <span class="data">' + trescDaty + '</span></h2>';
trescHtml += '<p class="data">' + trescDaty + '</p>';    
trescHtml += '<p>';
    if ( diagnostyka ) trescHtml += diagnostyka + '<br />' ;
trescHtml += galeria.opis + '</p></div>';    
    
$('#nazwa_galerii').html( trescHtml );
$('#nazwa_galerii').show(100);	    
} // UzupełnijNaglowekBiezacejGalerii-END  
    
    
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
var nrPodstronyGaleriiMAX = MaksymalnaIloscPodstronGalerii();	// ze zmiennej globalnej da się też już odczytać (obie MAX już istnieją, bo w pierwzym wywołaniu są określane)
//var ileRazy = Math.floor( nrGalerii / 5 ) ;  // teraz niepotrzebne, choć zachowane
//var ileReszty = nrGalerii % 5 ;         // teraz niepotrzebne
var pozycjaWGalerii = KtoraPozycjaWGalerii( nrGalerii );
var nrPodstronyGalerii;
var korekta = 0;    // wykryto różnice w przypadku pełnych podstron (czyli zawierających po pięć obrazków na OSTATNIEJ podstronie spisu treści)... wtedy ==1

    if ( ( g_ilosc_wszystkich_galerii % nrPodstronyGaleriiMAX ) == 0 ) korekta = 1; //  dodać +1 gdy galerie to wielokrotność pełnych spisów galerii
nrPodstronyGalerii = nrPodstronyGaleriiMAX - Math.floor( ( nrGalerii + pozycjaWGalerii ) / 5 ) + korekta;  // da się zrobić warunek inaczej, wzór bez dodatkowej zmiennej?
    //nrPodstronyGalerii = nrPodstronyGaleriiMAX - Math.ceil( ( nrGalerii + pozycjaWGalerii ) / 5 ) ;
return nrPodstronyGalerii;
} // KtoraPodstronaWGalerii-END    


function InicjujRamkiLadowania ()  
{
// wstepnie ta prosta forma, tu rejestrowane są na sztywno wszystkie powiadomienia o ładowaniu konkretnych zawartości - wymaga podpięci do wuitryny
// ... póki co trzy notyfikacje - IDeki: "wczytywanie_podstrony" (podstrona galerii), "wczytywanie_spis", "wczytywanie_wybrane_galerie_spis" 
//    (dopisać ewentualne kolejne animacje ładowania)    
    g_prezentacja_wczytywania = [   // raczej przypisać elmenty z HTMLa tu
        {   element : 'wczytywanie_spis',
            ile : 0 
        },
        {   element : 'wczytywanie_wybrane_galerie_spis',
            ile : 0 
        },
        {   element : 'wczytywanie_podstrony',
            ile : 0 
        }
    ];

}   // InicjujRamkiLadowania-END


function PokazRamkeLadowania ( element, czasPokazania )
{
    if ( ( !czasPokazania ) || ( czasPokazania < 0 ) ) czasPokazania = 100; // domyślnie       
var wybranyElement = -1,
    krotnoscElementu = -1; 
    
    switch ( element )  // też w odwołaniu do kolejnosci typu elementu względem umieszcznenia na www
    {
        case 'spis':
        case 0:
            wybranyElement = g_prezentacja_wczytywania[0].element;
            g_prezentacja_wczytywania[0].ile++;
            krotnoscElementu = g_prezentacja_wczytywania[0].ile;
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

    
function UkryjRamkeLadowania ( ktoryElement, czasUkrycia )    // zachowanie i wewnatrzne warunki jako całkowite przeciwieństwo poprzednika - PokazRamkeLadowania() 
{
    if ( ( !czasUkrycia ) || ( czasUkrycia < 0 ) ) czasUkrycia = 100; // domyślnie       
var wybranyElement = -1,
    krotnoscElementu = -1; 
    
    switch ( ktoryElement )  // też w odwołaniu do kolejnosci typu elementu względem umieszcznenia na www
    {
        case 'spis':
        case 0:
            wybranyElement = g_prezentacja_wczytywania[0].element;
            g_prezentacja_wczytywania[0].ile--;
            krotnoscElementu = g_prezentacja_wczytywania[0].ile;
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
    } // switch-END ( element )
      
    // MA POZOSTAĆ PONIŻSZE: ... zamiast tego co po drugim komentarzu
//    if ( ( wybranyElement != -1 ) && ( krotnoscElementu <= 0 ) ) $('#' + wybranyElement ).hide( czasUkrycia );
    if ( krotnoscElementu == 1 ) $('#' + wybranyElement ).find('span').text('(- dbg)');    
    if ( krotnoscElementu > 1 ) $('#' + wybranyElement ).find('span').text(' x ' + krotnoscElementu + ' (- dbg)');

    if ( ( wybranyElement != -1 ) && ( krotnoscElementu <= 0 ) ) $('#' + wybranyElement ).hide( czasUkrycia );
    
    
}   // UkryjRamkeLadowania-END
    
    
function GenerujPowiadomienieOBledzie ( opcjePrzekazane )
{
var elementRodzica = '#galeria_spis',
    budowanyElement = '';
var opcjeDomyslne = {
    tytul : 'Wystapił błąd ogólny!',
    tresc : '&lt;tu szczegóły błędu...&gt;',
    jednorazowy : true,
    ikonaZamykania : true, // scalić to z powyższym (lub owrotnie) bo ta sama flaga
    tryb : 'dodawanie', // dodawanie / zamiana / ... - też częściowo tożsame z tym co wyżej
    nadanaKlasa : 'blad', // .blad / .blad_dolaczenia / .blad_odswiez
    dodatkowaKlasa : '', // '' / .blad_dolaczenia / .blad_odswiez
    przyciskAkcji : false,
    trescPrzyciskuAkcjiDolaczanie : 'Powtórz działanie',
    trescPrzyciskuAkcjiOdswiez : 'Odśwież stronę'
};
    // budowanie po kolei z warunkowych fragmentów + zakładamy, że przekazana treść stanowi bezpieczny HTML ... pewnie dowolny framework zbudowałby to lepiej

var opcje = $.extend ( {}, opcjeDomyslne, opcjePrzekazane );
budowanyElement = '<div class="' + opcje.nadanaKlasa + '">' 
    + '<h2 class="blad_tytul">' + opcje.tytul + '</h2>'
    + '<div class="blad_tresc">'
    + '<div class="blad_ikona">!</div>'
    + '<p>Szczegóły powstałego błędu:<br />' + opcje.tresc + '</p>' 
    + '</div>' ;
        /* if ( ( opcje.nadanaKlasa == 'blad_dolaczenia' ) || ( opcje.nadanaKlasa == 'blad_odswiez' ) )    // wymaga dodania przycisku do odświeżenia strony
        {
        budowanyElement = budowanyElement + '<button class="odswiez_strone">Odśwież stronę</button>' ;
        // +++  wstawienie przycisku do oświeżenia witryny
        }*/
        if ( ( opcje.przyciskAkcji ) && ( opcje.dodatkowaKlasa != '' ) )    // wymaga dodania przycisku do odświeżenia strony
        {
            // działania zależne od ewentualnej dołączonej klasy (dwie pozycje wzajemnie wykluczające się) -- przy ewentualnym trzecim (hmm... czwartym) rodzaju błędu zastosować 'switch'
            if ( opcje.dodatkowaKlasa == 'blad_dolaczenia' ) budowanyElement = budowanyElement + '<button class="' + opcje.dodatkowaKlasa + '">' + opcje.trescPrzyciskuAkcjiDolaczanie + '</button>';
            else if ( opcje.dodatkowaKlasa == 'blad_odswiez' ) budowanyElement = budowanyElement + '<button class="' + opcje.dodatkowaKlasa + '">' + opcje.trescPrzyciskuAkcjiOdswiez + '</button>'; 
        // +++  wstawienie przycisku do oświeżenia witryny
        }    

        if ( opcje.ikonaZamykania )    // standardowy tryb i działanie
        {
        budowanyElement = budowanyElement + '<div class="krzyzyk_zamykanie">&times;</div>' ;
        
            // +++  "krzyżyk" do zamykania do treści
        }
    budowanyElement = budowanyElement + '</div>';    

//...
    
    
$( elementRodzica ).prepend( budowanyElement );      
    
}   //GenerujPowiadomienieOBledzie-END
    
    
function WystartujDebuggerLokalny ( czyZepsuc, nieTylkoLokalnie ) 
{
// definicje wewnątrz wywołania - podległości... tylko, gdy mamy LOKALNE uruchamianie (też testowanie) ;)
    if ( window.location.host == 'localhost' || nieTylkoLokalnie )  // też drugi parametr 
    {
        function NaprawAjaksa ()
        {
        g_przechwytywacz_php = "./przechwytywacz.php";    
        g_przechwytywacz_php_zapytanie = "?url_zewn=";
            // wizulizacja zmian  
        $('.status_ajaksa').removeClass('status_awaria').addClass('status_norma');
        }

        function ZepsujAjaksa ()
        {
        g_przechwytywacz_php = "./przepuszczacz.php";    
        g_przechwytywacz_php_zapytanie = "?url_dupa=";
            // wizulizacja zmian  
        $('.status_ajaksa').removeClass('status_norma').addClass('status_awaria');    
        }

        // zarejestruj operacje zdarzeń - dwa przeciwstawne przyciski
        $('.zepsuj').click( function () { 
            ZepsujAjaksa();
                if ( $('#awaria_na_stale:checked').length == 1 ) AwariaWLocalStorage() ;    // ustawianie konkretnej wartości dla "awarii" lub czyszcznie pamięci dla tej komórki
                else ZerujLocalStorage();
        });    

        $('.napraw').click( function () { 
            NaprawAjaksa();
                if ( $('#awaria_na_stale:checked').length == 1 ) NaprawaWLocalStorage() ;    // ustawianie konkretnej wartości dla "poprawnego działania" lub czyszcznie komórki pamięci
                else ZerujLocalStorage();
        });    

        // na koniec wymuś automatyczny start "naprawy" -- stan bieżący winien być prawidłowy (chyba, ze określony parametr opcjonalny)    
    NaprawAjaksa();
        
            // odczytanie stanu ze zmiennej... . 
        
        // ....
            //     + dopracować PONIŻSZE warunki -- od nich zależy inicjownanie belki sterującej przy autortarcie programu..
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

    PokazDebuggowanie();    //z tym bym poczekał na reakcje - kliknięcie własciwego przycisku... później usunąć po testach komunikatów o błędach
    }
// nie rób nic dla 
    
} // WystartujDebuggerLokalny-END    

function OdczytajLocalStorage ()
{
var zawartoscDebuggowaniaLocalStorage = localStorage.getItem('awariaNaStale');    
    if ( ( zawartoscDebuggowaniaLocalStorage == '<AWARIA!>' ) || ( zawartoscDebuggowaniaLocalStorage == '<BRAK AWARII>' ) )
    {    
    return zawartoscDebuggowaniaLocalStorage;       
    }
return false;
}
    
function InicjujLocalStorage () {
var CoWStorage = OdczytajLocalStorage;
    if ( CoWStorage == '<AWARIA!>' || CoWStorage == '<BRAK AWARII>')    // "zaptaszenie" checkboksa tylko, gdy jedna z tych wartość jako zawartość 
    {
    $( '#awaria_na_stale').prop('checked', true);    
    PokazDebuggowanie();
    return zawartoscDebuggowaniaLocalStorage;    
    }

    // ...   ?  
return false;
}
    
function AwariaWLocalStorage ()
{
localStorage.setItem('awariaNaStale', '<AWARIA!>')    
}
    
function NaprawaWLocalStorage ()
{
localStorage.setItem('awariaNaStale', '<BRAK AWARII>')    
}
    
function ZerujLocalStorage ()
{
localStorage.removeItem('awariaNaStale');
}
    
function PokazDebuggowanie () {
    $('#odpluskwiacz_ajaksowy').fadeIn(200);
}    
    
function UkryjDebuggowanie () {
    $('#odpluskwiacz_ajaksowy').fadeOut(200);
}    

    
    
// ---------- *** AUTO URUCHAMIANE *** --------------	
	
function ZaczytajSpisGalerii () 
{
//http://zlobek.chojnow.eu/galeria,k0,p1.html	- adres ostatniej galerii, wg. daty
var adres_ostatniej_galerii = "/galeria,k0,p1.html";	
var adres_zasobu_galerii = g_protokol_www + g_adres_strony;

        // operowanie na jawnym zliczaniu kliknięć (zamiast 'g_bieżącej_pozycji_galerii'), bo to definiuje kolejny numer podstrony do załadowania 
    if ( g_suma_klikniec_zaladuj > 0 )    
    //if ( g_biezaca_pozycja_galerii > 0 )
    {
    //var nowa_podstrona_spisu_galerii = g_biezaca_pozycja_galerii + 1;				
    // adres_ostatniej_galerii = "/galeria,k0,p" + String( g_biezaca_pozycja_galerii + 1 ) + ".html";
        
        // powyższe warunkowe działania pomijają ładowanie DRUGIEJ PODSTRONY przy PIERWSZYM naciśnięciu przycisku 'Załaduj kolejne galerie'  
    // adres_ostatniej_galerii = "/galeria,k0,p" + String( g_biezaca_pozycja_galerii ) + ".html";
        
        adres_ostatniej_galerii = "/galeria,k0,p" + String( g_suma_klikniec_zaladuj ) + ".html";	
    }

//$( g_wczytywanie_spis ).show(100); //
PokazRamkeLadowania('spis');    
    
console.log('Załadowano spis treści dla ' + g_biezaca_pozycja_galerii + '. pozycji galerii, adres z http: "' + adres_zasobu_galerii + '" odnośnik: "' + adres_ostatniej_galerii + '".');	
WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_spis, adres_zasobu_galerii, adres_ostatniej_galerii, g_element_zewnetrzny_spis, "spis_galerii" ); 
}	// ZaczytajSpisGalerii-END

    
function InicjujPrzyciskiWyboruGalerii ()	
{
g_wybrany_nr_galerii = Math.floor(Math.random() * 100) + 1;	
console.log('Ustalanie POCZĄTKOWYCH (np. ' + g_wybrany_nr_galerii + ') wartości pól formularza przeglądania galerii...');
$g_input_nr_galerii.val( g_wybrany_nr_galerii );	
$g_suwak_nr_galerii.val( g_wybrany_nr_galerii );	
$g_suwak_nr_galerii.attr( 'max' , 105 ); // nie trzeba teraz?	
}   // InicjujPrzyciskiWyboruGalerii-END

    
function InicjujPrzyciskiWyboruPodstronyGalerii ()	
{
g_wybrany_nr_podstrony_galerii = Math.floor(Math.random() * 5) + 1 ;	
console.log('Ustalanie POCZĄTKOWYCH (np. ' + g_wybrany_nr_podstrony_galerii + ') wartości pól formularza przeglądania podstronami galerii...');
$g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );	
$g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );	
$g_suwak_nr_podstrony_galerii.attr( 'max' , 6 ); // "trzeba, czy nie trzeba?" oto jest pytanie	
}   // InicjujPrzyciskiWyboruPodstronyGalerii-END    
    
    

// ---------- *** OGÓLNE PRZEZNACZENIE *** --------------    
    
function PrzewinEkranDoElementu ( element, czasAnimacji, korektaY ) 
{
        //parametryzacja parametru domyślnego by ES5 ;)
    if ( korektaY === undefined ) korektaY = -10;
        //jeśli jest kilka elmentów, to użyj pierwszego w kolekcji jako "wybranego"
    if ( $(element).length > 1 ) element = $(element)[0];
var pozycjaElementuWPionie = $(element).offset().top;
console.log('Ustalono, że element wywołania "' + element + '" ma pozycję Y ', pozycjaElementuWPionie, ' [px] (korektaY: ' + korektaY 
            + ', czasA: ' + czasAnimacji + ')');    
$('html, body').animate({ scrollTop : (pozycjaElementuWPionie + korektaY)+'px' }, czasAnimacji);    
}   

    
function ZablokujPrzycisk ( przycisk )
{
//console.log('PRZYCISK:', przycisk);    
$( przycisk ).prop('disabled', true);
}

    
function OdblokujPrzycisk ( przycisk )
{
$( przycisk ).prop('disabled', false);  // oczekiwane działanie zamiast spodziewanego rezultatu poprzez: $.removeProperty('disabled');
}

    
function OkreslPolozenieElementuJS ( element ) { // używanie jako bezpośrednie 'getOffset(element).left' lub 'getOffset(element).top' 
var pozycja = element.getBoundingClientRect();
    // debug do kasacji gdy OK
    console.log('Element "' + element + '" ma X:' + ( parseInt( pozycja.left ) + parseInt( window.scrollX ) ) +  
                ', Y:' + ( parseInt( pozycja.top ) + parseInt( window.scrollY ) ) );    
return { left: pozycja.left + window.scrollX,
         top: pozycja.top + window.scrollY };
}    


function OkreslPolozenieElementu ( element ) { // używanie jako bezpośrednie 'getOffset(element).left' lub 'getOffset(element).top' 
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
var adresEmail = 'mailto:' + adres;    
$( element ).text( adresPokazywany ).attr( 'href', adresEmail ); 
}

    
function AktualnyRozmiarOkna ( elementWyswietlajacy, poziomWidocznosci ) 
{
var szerokoscOkna = $(window).outerWidth(true),
    wysokoscOkna = $(window).outerHeight(true);
poziomWidocznosci = poziomWidocznosci || '0.7';

    // zawartość w <h1> powinna otrzymać aktualny wymiar okna i go wyswietlić... warunek element powinien mieć specyficzną klasę, żeby nie wyświetlał 'X' przy wyłączonym JS! 
    // nadać klasę ręcznie, czy z automatu ponownie przypisać na początku tej funkcji?

$(elementWyswietlajacy + '> h1').text( szerokoscOkna + ' x ' + wysokoscOkna );  // najpierw nadanie aktualnej treści (rozmiaru X x Y)
    
    if ( !$(elementWyswietlajacy).hasClass('animacja_zanikanie2') ) $(elementWyswietlajacy).addClass('animacja_zanikanie2');    // ewentualne nadanie klasy z konretną animacją

    // taka parodia, ale chodzi o przerwanie aktualnie zanikającej animacji i uruchomienie jej od nowa
    // $(elementWyswietlajacy).hasClass('animacja_zanikanie').removeClass('animacja_zanikanie').addClass('animacja_zanikanie');
    // istotny jest odstęp czasu pomiędzy zabranie, a ponownym dodaniem tej samej klasy (najlepiej z jakąś modyfikacją/odczytem DOM pomiędzy)    
$(elementWyswietlajacy).removeClass('animacja_zanikanie2').height(); 

$(elementWyswietlajacy).addClass('animacja_zanikanie2');    

/*
    if ( $( elementWyswietlajacy ).hasClass('animacja_zanikanie2') ) 
    {
    //$(elementWyswietlajacy).css({ animationName : '', animationDuration : '', animationTimingFunction : '' }); 
        //  $(elementWyswietlajacy).css({ animationPlayState : 'paused' }).width();
        //  $(elementWyswietlajacy).css({ animationPlayState : 'running' });    
    //$(elementWyswietlajacy).stop().removeClass('animacja_zanikanie').css({ animationName : '', animationDuration : '', animationTimingFunction : '', animationIterationCount : '0' }); 
        //alert('W trakcie animacji');    
    }  
    //if ( $(elementWyswietlajacy + ':animated') ) $(elementWyswietlajacy).stop().removeClass('animacja_zanikanie');
*/

//$(elementWyswietlajacy).addClass('animacja_zanikanie');
return szerokoscOkna;    
}   // AktualnyRozmiarOkna-END
    
    
function UsunPobraneZadanie ( adres_zasobu )
{
var indeksZnalezionego = false;
    
    // wymaga to FOR (jest break), czy da się zrobić poprzez forEach
    for ( var i = 0; i < g_niewyslane_podstrony.length ; i++ )
    {
        if ( g_niewyslane_podstrony[i].adres.indexOf( adres_zasobu ) != -1 )
        {
        indeksZnalezionego = i; // przypisanie indeksu z tabeli "nieobsłużonych" żądań
        break;    
        }
    }
    
    if ( indeksZnalezionego >= 0 )
    {
    g_niewyslane_podstrony.splice( indeksZnalezionego, 1 ); //wyrzucenie z listy żądań oczekujących jednego, właśnie obsłużonego odnośnika     
    return indeksZnalezionego;    
    }
return false;
    
    /*    g_niewyslane_podstrony.forEach( function ( elementNiewyslany )
    //  ...
    )*/
    
}   // UsunPobraneZadanie-END
        
    
function UbijReklamy()
{   // 000webhost.com || 000webhostapp.com
$('a[href*=000webhost]').parent('div').remove();
    
    // cba.pl
var cbaReklamaBig = $('center');
    if ( cbaReklamaBig ) // jeżeli znaleziono to wywal pasek poprzedzający oraz tą wielgachną reklamę (większą niż ekran ewentualnego telefonu!) 
    {
    $( cbaReklamaBig ).parent().prev().remove();    // wywal małą reklamę - pasek u góry (ewentualeni to moze pozostać)
    $( cbaReklamaBig ).parent().remove();           // ale to wielgachne bezwzględnie wylatuje (sorry cba)
    }
}
    
// ---------- ***      GRA      *** --------------     

function LosujPlansze ( zakres ) 
{
    if ( !zakres ) zakres = 1;    
var wylosowanyNr = Math.floor( Math.random() * zakres );    
return wylosowanyNr;    
}       


function WybierzPlansze ( nrPlanszy )        // docelowo będzie ajax/api
{   
/* var tloSrc = '', // poszło w global
    ileCzesci = 0,
    nazwa = '',
    nazwaSrc = '',
    obrazki = []; */
    
    if ( !nrPlanszy ) nrPlanszy = 0;
    
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
        $('div#rysunek').css({ 'backgroundImage': 'url(' + g_tloSrc + ')', 'backgroundRepeat' : 'no-repeat', 
                           'backgroundPosition' : g_przesuniecieTlaX + ' ' + g_przesuniecieTlaY });    
        // debug
        var statusTla = '<p>Grafika \'' + noweTlo.src + '\' ma szerokość ' + szerokoscTla + ' i wysokość ' + wysokoscTla + '<br />'  
            + 'Przesunięcie wyśrodkowania to (' + g_przesuniecieTlaX + ', ' + g_przesuniecieTlaY + ').</p>';
        $('#dolny_zasobnik').append(statusTla);    
        };  // noweTlo.onload = function()-END
 
            
    // ...
            
    }   // switch-( nrPlanszy )-END
    //

return { dx : g_przesuniecieTlaX, dy: g_przesuniecieTlaY };    // dobrze by było zwrócić jakąś tabelę rekordów lub cokolwiek...
}   // WybierzPlansze-END    


function RozmiescCzesci( nrPlanszy ) {
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
    var nowyObrazek = new Image();
    nowyObrazek.src = g_nazwaPlanszySciezka + g_nazwaElementu + numerPliku + '.png';
        

    nowyObrazek.alt = numerPliku;
    nowyObrazek.classList.add('przenosny');    
    
        if ( i % 2 ) przesuniecieX1 += 80;
        else przesuniecieX1 -= 80;
    nowyObrazek.style.left = String( przesuniecieX1 ) + 'px';
    przesuniecieY1 += 50;
    nowyObrazek.style.top = String( przesuniecieY1 ) + 'px';
    nowyObrazek.style.zIndex = 100 + i;    
    nowyObrazek.setAttribute('data-zindex', nowyObrazek.style.zIndex);    
    nowyObrazek.setAttribute('draggable', true);  
    //nowyObrazek.draggable = true;    // tak też działa, ale ustawianym atrybutem chyba lepiej niż po omacku, próbując z bezpośrednią nazwą atrybutu
    $('#plansza').append( nowyObrazek );    
    //$('#plansza img:last').css({ top : przesuniecieY1, left : przesuniecieX1, zIndex : 100 + i })
    //                    .attr({ 'draggable' : true });
        
    }
}    

    
function RozmiescCzesciWzorcowo() 
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
}

    
function UsunCzesci() {
 $('#plansza img.przenosny').remove();
}


function PoczatekRuchuPrzeciagania (e)  // 'dragstart'
{
e = e || window.event;    
g_ktoraGrafika = e.target;
    //this.style.opacity = '0.9';
g_mojX = e.offsetX === undefined ? e.layerX : e.offsetX ;   // jakoby Firefox był nadal oporny i te współrzędne na przekór trzyma w innych atrybutach 
g_mojY= e.offsetY === undefined ? e.layerY : e.offsetY ;    // zachowywanie obu położeń początkowych
    
ResetujZIndexWszystkim();    
    var pionowosc = g_ktoraGrafika.style.zIndex;
    if ( ( pionowosc > 100 ) && ( pionowosc < 1000 ) ) g_ktoraGrafika.style.zIndex = parseInt( g_ktoraGrafika.style.zIndex ) + 100;    
    // poruszany wyskakuje przed szereg podczas wyciągania co najwużej kilka razy i tak już zostaje... 
    // ...w ramach tego działania (ale może zostać przykryty częsciowo przez sąsiedni element)
console.log('Podczas przeciągania: g_mojX:', g_mojX, ' [ (e.layerX:', e.layerX, ', e.offsetX:', e.offsetX,'), (g_mojY:', g_mojY, ' (e.layerY:', e.layerY,
                ', e.offsetY:', e.offsetY,')]');

}
    
    
function RuchUpuszczania (e)    // 'drop'
{
e = e || window.event;
    
var scena = document.querySelector('#rysunek'); 
var polozenieTla = OkreslPolozenieElementu( scena );    // dostaję { top, left }
//e.preventDefault(); // bez interpretacji i przetwarzania, gdy przeciągamy element w inny element (zwłaszca taki, który nie może być kontenerem, czyli <img> w <img>! )
/* g_ktoraGrafika.style.left = parseInt( e.pageX - g_mojX ) + 'px'; // od współrzędnych globalnych odejmij wcześniejsze położenie elementu ... i nic się nie dzieje
g_ktoraGrafika.style.top = parseInt( e.pageY - g_mojY ) + 'px'; */
g_ktoraGrafika.style.left = parseInt( e.pageX - polozenieTla.left + g_przesuniecieTlaX - g_mojX ) + 'px';    
g_ktoraGrafika.style.top = parseInt( e.pageY - polozenieTla.top + g_przesuniecieTlaY - g_mojY ) + 'px';    
    
console.log("Przeciąganie! e.pageX: ", e.pageX, ", g_mojX:", g_mojX, ", położenieTła.left:", polozenieTla.left, ", g_przesunięcieTłaX:", g_przesuniecieTlaX, 
            ", e.pageY:", e.pageY, ", g_mojY:", g_mojY, ", położenieTła.top:", polozenieTla.top,", g_przesunięcieTłaY:", g_przesuniecieTlaY );
console.log("Docelowy element ma mieć zatem (", g_ktoraGrafika.style.left, ", " ,g_ktoraGrafika.style.top, ").");    
e.preventDefault(); // przestawione z góry
return false;
}


function RuchPrzeciagania (e) { // 'dragover'
e = e || window.event;
e.preventDefault();     // wszelkie dziwne działania, które mogą wyniknąć podczas chwytania i pzrenoszenia elemntu
    // w zasadzie "nicnierobienie();" o ile można wszelkie działania 'dragover' przeglądarek tym olać
return false;   // dodane    
}    


function ResetujZIndexWszystkim ()
{
var elementy = document.querySelectorAll('img.przenosny');  // manipulacja bezpośrednio w JS (DOMie)
    for ( var i = elementy.length-1 ; i >= 0 ; i-- )
    {
    elementy[i].style.zIndex = 20;  // ustawianie z-indeksu na wartość wzorcową (różnica pomiędzy początkiem)
    }
}
 
    // archaiczne połączneie z htmlem ... do wywalenie obie poniższe funkcje
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

    
function InicjujGre() 
{
var nrPlanszy = LosujPlansze(); // póki co na pusto
console.log('Wylosowano nr planszy: ', nrPlanszy);    
var przesuniecie = WybierzPlansze( nrPlanszy );     // od arzu zwrot, choć on już wstawiony do zmiennych globalnych
  
RozmiescCzesci( nrPlanszy );
    
}
    


	
	
// ---------- *** FUNKCJE ZDARZENIOWE *** --------------	
	

$('#odswiez').click(function() {
    location.reload();
});	

    
$('#poco_button').click( function() {
 $('#poco').toggle(200);	
});

    
$('#pomoc_button').click( function() {
 $('#pomoc').toggle(200);	
});

    
$('#symulancja_button').click( function() {
 $('#odpluskwiacz_ajaksowy').fadeToggle(200);	
});    
    
	
$('#losuj_zakres').click( function() {
    if ( g_ilosc_wszystkich_galerii > 0 )
    {
        g_wybrany_nr_galerii = Math.floor( Math.random() * g_ilosc_wszystkich_galerii ) + 1 ; 

        //ustawienie wartości w polu tekstowym i suwaku
        $g_input_nr_galerii.val( g_wybrany_nr_galerii );
        $g_suwak_nr_galerii.val( g_wybrany_nr_galerii );
    }
}); // #losuj_zakres click-END	

    
$('#losuj_zakres_podstrony').click( function() {
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
        g_wybrany_nr_podstrony_galerii = Math.floor( Math.random() * g_ilosc_wszystkich_paginacji_galerii ) + 1 ; 
        //ustawienie pola tekstowego i suwaka wygenerowaną wartością
        $g_input_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
        $g_suwak_nr_podstrony_galerii.val( g_wybrany_nr_podstrony_galerii );
    }
}); // #losuj_zakres_podstrony click-END	
        

$g_suwak_nr_galerii.change( function() {
var wartoscBiezaca = $(this).val();

g_wybrany_nr_galerii = wartoscBiezaca;
$g_input_nr_galerii.val( wartoscBiezaca );
});	


$g_suwak_nr_podstrony_galerii.change( function() {
var wartoscBiezaca = $(this).val();

g_wybrany_nr_podstrony_galerii = wartoscBiezaca;
$g_input_nr_podstrony_galerii.val( wartoscBiezaca );
});	
    
    
$('#wybrany_nr_zwieksz').click( function() {
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


$('#wybrany_nr_zmniejsz').click( function() {
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

    
$('#wybrany_nr_podstrony_zwieksz').click( function() {
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

    
$('#wybrany_nr_podstrony_zmniejsz').click( function() {
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
    
    
    
$('#galeria_wybrany_nr').blur( function() {
    
var wartoscBiezaca = parseInt( $(this).val() );
wartoscBiezaca = NormalizujZakresPolaInput( wartoscBiezaca );    
$(this).val( wartoscBiezaca );    // pobierz bieżącą wartośc i dokonaj ewentualnej korekty dla zakresu
g_wybrany_nr_galerii = wartoscBiezaca;
$g_suwak_nr_galerii.val( wartoscBiezaca );
});
    

$('#podstrona_wybrany_nr').blur( function() {
    
var wartoscBiezaca = parseInt( $(this).val() );
wartoscBiezaca = NormalizujZakresPolaInput( wartoscBiezaca, 'wybórPodstrony' );    
$(this).val( wartoscBiezaca );    // pobierz bieżącą wartośc i dokonaj ewentualnej korekty dla zakresu podstron
g_wybrany_nr_podstrony_galerii = wartoscBiezaca;
$g_suwak_nr_podstrony_galerii.val( wartoscBiezaca );
});
    
    
$('#suwak_galerii_submit').click( function( evt ) 
{
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
        // porządek odwrotnie chronologiczny - 'p1' lub 'p0' lub jego brak wskazuje na pierwszą od końca podstronę z pięcioma elemenatmi, 'p2' na przedostatnią, ... 
        // konieczne obliczenie pozycji 'spisu treści' - da się ustalić numerycznie jako m-ta podstrona z wszystkich galerii
        // celem jest pozyskanie stamtąd adresu dla wybranej N-tej galerii 
    var adresPodstrony =  '/' + 'galeria,k0,p' + podstronaWGalerii + '.html' ;    // sumowanie ciagu tekstowego
 
    // DEBUG_MODE    
        /*  var trescWygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nrPodstronyGaleriiMAX + "<br />"; 
            trescWygenerowana += "WYBRANA: " + wybranyNrGalerii + ", PODSTRONA: " + podstronaWGalerii + ", POZYCJA_W_GALERII: +" + pozycjaWGalerii + "<br />"; 
            trescWygenerowana += "<br /> Dopasowano na " + podstronaWGalerii + ". podstronie, z przesunięciem " + pozycjaWGalerii ;
            trescWygenerowana += ". Łączny adres to: \"" + g_adres_strony + adresPodstrony + "\"</p>";
            $('#status_wybranej_galerii').html( trescWygenerowana );*/
        
  //      if ( $('#nazwa_galerii').find('h2').text() != "" ) $('#nazwa_galerii').addClass('szara_zawartosc');  // warunkowe nadanie tymczasowej szarości dla każdej z już wyświetlonego podglądu szczegółów galerii
    var zawartoscH2 = $('#nazwa_galerii').find('h2').text();    
        if ( zawartoscH2 != '' )
        {
        console.info('W <h2> do zabarwienia na szaro siedzi treść "' + zawartoscH2 + '" i nie chce zmienić koloru w IE/Edge.');    
        $('#nazwa_galerii').addClass('szara_zawartosc');  // warunkowe nadanie tymczasowej szarości dla każdej z już wyświetlonego podglądu szczegółów galerii ...NIE DZIAŁA w IE
        }

    ZablokujPrzycisk( evt.target );     // blokada ewentualnego kolejnego wywołania w trakcie oczekiwnia na obsługę   
        
    $( g_miejsce_na_zdjecia ).empty();
    $('nav#nawigacja_galeria').empty(); 
    // $('#wczytywanie_podstrony').show(100);  
    PokazRamkeLadowania('podstrona');   // pokazanie ramki ładowania -- najbliższy obszar to podstrona galerii 

    PrzewinEkranDoElementu('div#glowna', 500, -50);  // przesunięcie do podglądu galerii, aby widzieć reakcję i postęp ładowania           
        
    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "wybrana_galeria_rekurencja", { 'pozycjaWGalerii' : pozycjaWGalerii } ); 	// ES6 unfriendly
    }
return false;  // to jest lepszy i konieczny warunek na "niewysyłanie formularza" -- warunkowe zaczytywanie albo "nierobienie nic" po kliknięciu
}); // click('#suwak_galerii_submit')-END

    
$('#suwak_podstrony_submit').click( function(evt) {
evt.preventDefault; // nie wykonuj domyślnego SUBMIT po kliknięciu
    if ( g_ilosc_wszystkich_paginacji_galerii > 0 )
    {
    var tagDocelowyDoZaczytania = 'div#skladowisko_wybrane_galerie_spis';	// tu ma byc nowe miejsce w spisie
    var wybranyNrPaginacji = NormalizujZakresPolaInput( $g_input_nr_podstrony_galerii.val(), 'naRzeczPaginacjiSpisuGalerii' ); // odczytanie z formularza jak jest + weryfikacja zakresu
          // http://zlobek.chojnow.eu/galeria,k0,p38.html	<-- 'k0' == 'kategoria WSZYSTKO', 'pXYZ' to XYZ-ta 'p'-odstrona w danej galerii (zawiera max 5 elem.)
    var adresPodstrony =  '/' + 'galeria,k0,p' + wybranyNrPaginacji + '.html' ;    // po prostu podstawienie do ciagu tekstowego
 
    // DEBUG_MODE    
    /* var trescWygenerowana = "<p>ILOŚĆ_GALERII_MAX: " + g_ilosc_wszystkich_galerii + ", ILOŚĆ_PODSTRON_MAX: " + nrPodstronyGaleriiMAX + "<br />"; 
    trescWygenerowana += "WYBRANA: " + wybranyNrGalerii + ", PODSTRONA: " + podstronaWGalerii + ", POZYCJA_W_GALERII: +" + pozycjaWGalerii + "<br />"; 
    trescWygenerowana += "<br /> Dopasowano na " + podstronaWGalerii + ". podstronie, z przesunięciem " + pozycjaWGalerii ;
    trescWygenerowana += ". Łączny adres to: \"" + g_adres_strony + adresPodstrony + "\"</p>";

    $('#status_wybranej_galerii').html( trescWygenerowana );	*/        
    //$('div#wybrane_galerie_spis').addClass('szara_zawartosc');      
        if ( $('#wybrane_galerie_spis').find('span:first').text() != '' ) $('#wybrane_galerie_spis').addClass('szara_zawartosc');  // warunkowe nadanie tymczasowej szarości dla każdej z już wyświetlonego podglądu
        
    ZablokujPrzycisk( evt.target );     // blokada ewentualnego kolejnego wywołania, gdyby wymusić kolejno w trakcie tej obsługi zdarzenia           
        
    WczytajZewnetrznyHTMLdoTAGU( tagDocelowyDoZaczytania, g_protokol_www + g_adres_strony, adresPodstrony, g_element_zewnetrzny_spis, 
                                "wybrany_spis_galerii", { 'wybranaPaginacja' : wybranyNrPaginacji } ); 	// ES6 unfriendly
    
    $('div#wybrany_zaczytany_spis h2 span').text( wybranyNrPaginacji.toString() + '.' );    
    $('div#wybrany_zaczytany_spis').show(100);
    // $('div#wczytywanie_wybrane_galerie_spis').show(100);
    PokazRamkeLadowania('wybrane_galerie_spis');    
        
    PrzewinEkranDoElementu('div#wybrany_zaczytany_spis', 500, -50);    // naddatek korekty, aby widzieć efekt szarosci... który jest niepotrzebny dle  
    //PrzewinEkranDoElementu('nav#spis_sterowanie', 500, -100);    // nie można przewinąc do 'div#wybrany_zaczytany_spis' jeśli jest jeszcze niewidoczny
    }
return false;  // konieczny warunek pomimo .preventDefault na "niewysyłanie formularza" -- warunkowe zaczytywanie albo "nierobienie nic" po kliknięciu
}); // click('#suwak_podstrony_submit')-END     
    
	
    
$('h2#selektor_naglowek').click(function () {
    if ( $(this).hasClass('rozwiniety') ) $(this).removeClass('rozwiniety').next('div').hide(100);
    else $(this).addClass('rozwiniety').next('div').show(100);
});    
	
	/*	
$(function(){
var contentURI= 'http://zlobek.chojnow.eu/u_tygryskow,a147.html table.galeria';    // URL-do-przechwycenia, " " i #id-elementu-docelowego
$('#zawartosc_do_podmiany').load('przechwytywacz.php?url_zewn='+ contentURI);
});
*/
$('#testowy_adres_button').click(function() {
var testowy_adres_galerii = "http://zlobek.chojnow.eu/30-u_misiow,z1058,p1.html";
	
$('#http_adres').val( testowy_adres_galerii ); // przypisanie wartości domyślnej do pola wpisywania 
	
});
	

    // uruchomienie
$('#nawigacja_galeria').on("click", ".przycisk_galeria", function( evt ) { // IMG z galerii obiektem zdarzenia
var $this = $(this);	
var serwer = g_protokol_www + $this.attr('data-adres_strony') + '/';
var ktoraPodstrona = $this.attr('value');    

//$( g_wczytywanie_podstrony ).show(100); 
PokazRamkeLadowania('podstrona');   // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 

//alert("kliknięto '.przycisk_galeria'... albo kontener: " + this.tagName );
//alert("VAL: '" + $this.attr('value') + "', DATA-TAG: " + $this.attr('data-tag') );

console.log('Naciśnięto wywołanie ' + ktoraPodstrona + '. podstrony danej galerii');  
// ?!?!
//alert( 'TAG: ' + $this.attr('data-tag') + ' ADRES: ' + $this.attr('data-adres_strony') + ' GALERIA: ' + $this.attr('data-adres_galerii') + ' ELEMENT: ' + $this.attr('data-elem_zewn') );
//WczytajZewnetrznyHTMLdoTAGU( nowyDiv.attr('id'), g_adres_strony, odnosnik_podstrony, g_element_zewnetrzny, true);

//WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);
WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), serwer, $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona", 
                            { 'ktoraPodstrona' : ktoraPodstrona } );    // ES5, nie ES6

ZablokujPrzycisk( evt.target );   // blokowanie aktualnie naciśniętego przycisku do kolejnej podstorny-galeriowej; nie wymaga aktywowania, bo lista pod-galerii zostaje wygenerowana na nowno z pominięciem "aktualnego" przycisku == zawartośc aktulanej podstrony galerii    

});	//  on("click")-$('#nawigacja_galeria')-END	
	
	   // "przycisk" ładujący kolejne +5 galerii (max), porządek ujemnie chronologiczny
$('#spis_sterowanie').on("click", "#zaladuj_galerie_spis", function() { 
g_suma_klikniec_zaladuj++;	// zliczaj naciśnięcia na ten przycisk

    if ( g_suma_klikniec_zaladuj < ( g_zaczytana_ilosc_paginacji_galerii + 1) ) // bieżącą stronę też liczyć jako paginację, dlatego +1
    {
    //g_biezaca_pozycja_galerii++;  // zwiększenie licznika, przejście do wywołania kolejnej podstrony
    // licznik zwiększa się już PO nacisnięciu odnosnika i PRZED zakończeniem przetwarznia uprzednio zaczytanych treści !!! 
    // co najwyżej kolejność może być inna na liście wyników

        if ( g_biezaca_pozycja_galerii <= g_zaczytana_ilosc_paginacji_galerii )
        {
        // $( g_wczytywanie_spis ).show(100); // wyświetlenie informacji o uruchomieniu wczytywania podstrony galerii - działania w tle 
        // PokazRamkeLadowania('spis');  //  -- to jest zbedne, wewnatrz ZaczytajSpisGalerii() jest dodane wyświetlenie  

        console.log('Na ' + g_suma_klikniec_zaladuj + ' żądanie zaczytano kolejną podstronę w galerii ' + g_biezaca_pozycja_galerii + ' z ' + g_zaczytana_ilosc_paginacji_galerii + ' podstron.');

        //g_ilosc_zaczytanych_galerii = g_ilosc_zaczytanych_galerii + 5; //inkrementacja o każde 5 zdjęc z poszczególnych zaczytanych galerii 	

        ZaczytajSpisGalerii();
        //wyświetlenie-dodanie kolejnego spisu do już wyświetlonej listy odnosników	
        //WczytajZewnetrznyHTMLdoTAGU( $this.attr('data-tag'), $this.attr('data-adres_strony'), $this.attr('data-adres_galerii'), $this.attr('data-elem_zewn'), "galeria_podstrona"	);
        } 
    }
});	// on("click")-$('#spis_sterowanie')-END		

	
/*	
$('#galeria_spis').on("click", ".kontener_odnosnik", function(){ 
var $this = $(this);
alert('Naciśnięto i wywołano zdjęcia z galerii "' + $this.find('div:first h2').text() + '"' ); 	
// przewinięcie ekranu do lokalizacji galerii
	
// wstawienrianimacji na ładowanie
	
// załadowanie odnosnika z 	
return; // wyjście, aby nie przechodzić do odnosnika	
});	//  on("click")-$('#nawigacja_galeria')-END		
*/	
    // DLA KOLEJNYCH GALERII: '$('#galeria_spis').on("click", "a", function(e){'
$('#galeria_spis, #wybrane_galerie_spis').on("click", "a", function ( e ) {    // testowo dopisano także inne 'kliknięcia' - "click auxclick contextmenu"
    
// console.log (e);     // DEBUG dla 'kliknięć'
    /*
    if ( e.type == "contextmenu" )
    {
    console.log("Menu kontekstowe");
    // return false;
    }*/
    
    /*  
    //if ( e.which == 2 ) // jeśli naciśnięto to ŚPM - ŚRODKOWYM przyciskiem myszy
    if ( e && (e.which == 2 || e.button == 4 ) )
    {
    e.preventDefault();
    alert("ŚPM!");
    return false;    
    //$(this).attr('href', '#');  // ;)
    }    
    
    if ( e.which == 3 ) // jeśli naciśnięto to PPM?! - PRAWYM przyciskiem myszy
    {
    e.preventDefault();
    alert("INNY-PM!");
    //return false;    
    //$(this).attr('href', '#');  // ;)
    } */
    // testowanie innych przycisków/kliknięc

e.preventDefault();	// "nieprzechodzeniedalej" po odnośnku    
var $this = $(this);
var galeriaDocelowa = $this.attr('data-href');	// pierwotnie był odczyt bezpośrednio z istniejącego 'href', teraz w jego miejscu 'data-href'
    
var tytulGalerii = $this.text();	  // przypisanie treści -- tytułu dla danej galerii (wstępnie, jeśli naciśnięto na nagłówek, a nie na obrazek -- bo nie posiadałby tekstu)   
var opisGalerii = $this.parents('.kontener_odnosnik').find('.opis_odnosnik').html();	 // było .text(), ale teraz zyskujemy formatowanie tekstu
var dataGalerii = $this.parents('.kontener_odnosnik').find('.data_odnosnik').text();       // tu bezwzględnie tylko tekst
var srcObrazkaGalerii = $this.parent().siblings('div.zdjecie_odnosnik').find('a img').attr('src');    
	
	if ( tytulGalerii.length == 0 )  // jeżeli naciśnięto odnośnik z obrazkiem, ten drugi zawiera już treść odnośnika
    {
    tytulGalerii = $this.parent().siblings('div.tytul_odnosnik').find('a h2').html();	 // było .text( ... )
    galeriaDocelowa =  $this.attr('data-href');    
    srcObrazkaGalerii = $this.find('img').attr('src');    
    }
//alert('g_tag_do_podmiany, g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/', galeriaDocelowa, g_element_zewnetrzny, "galeria_podstrona")
//alert('WczytajZewnetrznyHTMLdoTAGU( tag: ' + g_tag_do_podmiany_zdjecia + ', domena: ' + g_protokol_www + g_adres_strony + '/' + g_folder_serwera + '/' + ', zasób: ' + galeriaDocelowa + ', elem: ' + g_element_zewnetrzny + ') ... MYSZA NAJECHAŁA');
console.log('ZDARZENIE: "Naciśnięto" i wywołano odnośnik dla galerii "' + tytulGalerii + '"' ); 	

    // załaduj tytuł, opis i obrazek dla danej galerii, po czym załaduje się jej pierwszą podstronę	
UzupełnijNaglowekBiezacejGalerii ( { 'tytul' : tytulGalerii, 'opis' : opisGalerii, 'srcObrazka' : srcObrazkaGalerii, 'data' : dataGalerii } );    

    // wstawienie animacji na postęp ładowania
// $( g_wczytywanie_podstrony ).show(100);
    PokazRamkeLadowania('podstrona');

    // od razu zerowanie zawartości kontenerów docelowych do zaczytania zawartości
$('nav#nawigacja_galeria').empty(); 
$('div#skladowisko').empty(); 
	
WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_zdjecia, g_protokol_www + g_adres_strony + '/' , galeriaDocelowa, g_element_zewnetrzny, "galeria_podstrona" ); 	
//return; // wyjście, aby nie przechodzić do odnosnika... gdyby .preventDefault() zawiodło	
PrzewinEkranDoElementu('div#glowna', 700, -6);   		// przewinięcie ekranu do lokalizacji galerii
});	//  on("click")-$('#galeria_spis')-END			
		
	
    // wkrótce REZYGNACJA z poniższego!
$('#http_adres_submit').click(function() {	// submit ble?
	
//wycięte do wyżej !!!
/*
$('button.przycisk_galeria').on("click", function(){

alert( 'TAG: ' + this.attr('data-tag') + ' ADRES: ' + this.attr('data-adres_strony') + ' GALERIA: ' + this.attr('data-adres_galerii') + ' ELEMENT: ' + this.attr('data-elem_zewn') );
//WczytajZewnetrznyHTMLdoTAGU( this.attr('data-tag'), this.attr('data-adres_strony'), this.attr('data-adres_galerii'), this.attr('data-elem_zewn'), true	);
});	
*/

var pelny_adres_wpisany = $('#http_adres').val(); // !!! uwaga! dane z formularza... przetrzepać jak poniżej, dodatkowo na usuwanie spacji dodać regexpa...
	
String.prototype.stripHTML = function () {			// "przetrzepywacz", wywołanie poniżej
var tagiUsuwane = /<(?:.|\s)*?>/g;
return this.replace(tagiUsuwane, "");
};

pelny_adres_wpisany = pelny_adres_wpisany.stripHTML(); // czyszczenie z formularza niechcianego nadmiaru

	//alert( 'PEŁNY_ADRES_BEZ_TAGÓW: ' + pelny_adres_wpisany ) ; // takie tam test-info
	
    if ( pelny_adres_wpisany.indexOf( g_adres_strony ) != -1 )  // albo że .indexOf() != -1 // pelny_adres_wpisany.includes('zlobek.chojnow.eu') TRUE
	{				// + jeszcze jakieś warunki na poprawność
	var pelny_adres = g_protokol_www + g_adres_strony + "/";	// przypisanie samego adresu z protokołem
	//var pelny_adres  = pelny_adres_wpisany;				
    $('#form_error').slideUp(200); //zwinięcie
	}
	else
	{
	g_wyszukiwany_serwer = "";	// zerowanie potrzebne?!
    $('#form_error').slideDown(500); // rozwinięcie
	return false;	 // !!! i wyjście z przetwarzania !!!
	}
	
var adres_tej_galerii = pelny_adres_wpisany.substr( pelny_adres.lastIndexOf('/') + 1 ); // szukanie podciągu od "/ do adresu_zasobu.html" 

	//alert('pełny_adres: "' + pelny_adres + '", adres_tej_galerii: "' + adres_tej_galerii + '"');
	//$('#http_adres').val( g_adres_strony + adres_tej_galerii );
$('#http_adres').val( pelny_adres + adres_tej_galerii );	
$('#http_adres').prop("disabled", true); 								// wyłączenie, aby nie klikac wielokrotnie || attr() vs prop()
$('#http_adres_submit').prop("disabled", true);	 // wyłączenie, aby nie klikac wielokrotnie || attr() vs prop()
$('#testowy_adres_button').prop("disabled", true);	 // wyłączenie, aby nie klikac wielokrotnie || attr() vs prop()

//$( g_wczytywanie_podstrony ).show(100);
PokazRamkeLadowania('podstrona');

console.log( 'ADRES_STRONY: ' + g_adres_strony + ', ADRES_GALERII: ' + adres_tej_galerii + ', ZNACZNIK_ZEWN: ' + g_element_zewnetrzny + '\nRAZEM: ' + g_adres_strony + adres_tej_galerii + ' | ' + g_element_zewnetrzny	) ;

	
/* 
cała galeria siedzi w tabeli o klasie .galeria, w komórkach osadzone miniatury z odnośnikami do galerii zdjęć. Całość dzielona na podstrony po 6 x 3 zdjęcia (18 szt.)  
*/
	
	/*
  $.get( pelny_adres, function(data) {
			alert('Coś');
    $('zawartosc_do_podmiany').html(data);
  });
	*/
	
// to poniżej powinno działać tylo dla tej samej domeny/lokalizacji co skrypt, wiec porażka 

WczytajZewnetrznyHTMLdoTAGU( g_tag_do_podmiany_zdjecia, g_protokol_www + g_adres_strony + '/', adres_tej_galerii, g_element_zewnetrzny, "galeria_podstrona" ); 

return false; // !!! konieczne przy click/submit! || operować na obiekcie klikanym
}); // click-END-#http_adres_submit

    
// ---------- *** FUNKCJE ZDARZENIOWE - GLOBALNE *** --------------	    
    
	
$('#banner').hover( function() {
    $(this).find('#slonce_logo').addClass('animacja_1');
    },
    function() {
    $(this).find('#slonce_logo').removeClass('animacja_1');	
    }
); // #banner hover-END

$(window).on('resize', function() {
var szeroskoscOkna = AktualnyRozmiarOkna('#wymiary');
    
    // warunkowe ukrywanie elementu z grą, gdy najpierw naciśnięto "Zagraj" -- element posiada style INLINE, których nie nadpisuje standardowy CSS w @media
    /*  if ( szeroskoscOkna < 1300 ) 
    {
    $('#gra').hide();
    }   */
    
});    

    
$(document).on('keypress', function( evt ) {    // warunkowanie globalne względem nacisnięcia klawisza 
var elementZdarzenia = evt.target.tagName.toLowerCase();
console.log('KLAWISZ: ', evt);
console.info('Element zdarzenia to ', elementZdarzenia);    
var nawigacjaKlawiaturowa = evt.originalEvent ? evt.originalEvent.keyCode : evt.keyCode,
    czyAlt = evt.originalEvent ? evt.originalEvent.altKey : evt.altKey;
    
    if ( ( nawigacjaKlawiaturowa == 39 ) && ( czyAlt ) ) evt.preventDefault(); // GLOBALNIE: [->] + [Alt] -- nadrzędnie względem przeglądarki Firefox, IE nie słucha się
    if ( ( nawigacjaKlawiaturowa == 37 ) && ( czyAlt ) ) evt.preventDefault(); // GLOBALNIE: [<-] + [Alt] -- nadrzędnie względem przeglądarki Firefox, IE nie słucha się
    
    if ( elementZdarzenia.indexOf('input') < 0 )   // ma NIE OBWIĄZYWAĆ wewnątrz pól input czy innych ewentulanych  
    {
    //console.log('KLAWISZE: ', evt);    
        if ( evt.which == 8)
        {
        evt.preventDefault();
        }
    
    }
});    
    
    
$('#galeria_spis').on("click", ".krzyzyk_zamykanie", function(){ 
var $this = $(this),
    kontenerBledu = $this.parents('.blad');
    kontenerBledu.hide(300, function() { $(this).remove(); });  // usuń powiązany komunikat (jednorazowy) - tylko dla wskazanej klasy ".bład" pozostałe dwie eymagaja innych działań niż zamknięcie ramki komunikatu
    
});
    

    
$('#debugger_zamykanie').click(function(){ 
/*var $this = $(this),
    kontenerBledu = $this.parents('.blad');
    kontenerBledu.hide(300, function() { $(this).remove(); });  // usuń powiązany komunikat (jednorazowy) - tylko dla wskazanej klasy ".bład" pozostałe dwie eymagaja innych działań niż zamknięcie ramki komunikatu*/
// ...
UkryjDebuggowanie();
});    
    
    
    
    
$('div#zagraj').click( function() {
    $('div#gra').show(300);
    PrzewinEkranDoElementu( 'div#gra', 500, 10 ); // + korekta marginesu górnego elementu
//    InicjujGre();
    RozmiescCzesciWzorcowo();
    // ...
    
});    
    
    
$('#gra_start').click( function() {
    // ...
    RozmiescCzesciWzorcowo();
    // ...
});    
    
    // nie działa mi w JQ, próba powrotu do JS... te sdame zdarzenie i funkcje użyte w wywołaniu 
/*
$('body').on('dragstart', '.przenosny', PoczatekRuchuPrzeciagania ); // $('#gra).on... bez zmian
    
$('body').on('drop', '.przenosny', RuchUpuszczania );   // RuchUpuszczania 
    
$('body').on('dragover', '.przenosny', RuchPrzeciagania );  // RuchPrzeciagania   
    
    */


    
var Przeciaganie = ( function() {
    
function PoczatekRuchuPrzeciaganiaJS ( e )  // 'dragstart'
{
//e = e || window.event;    
g_ktoraGrafika = e.target;      // !!! wpisanie namiarów na przeciagany element, który będzie dalej używany w kolejnych zdarzeniach 
    //this.style.opacity = '0.9';
g_mojX = e.offsetX === undefined ? e.layerX : e.offsetX ;   // róznica odległoścvi pomiedzy kliknięciem, a początkiem klikniętego elementu  
g_mojY= e.offsetY === undefined ? e.layerY : e.offsetY ;    // jakoby Firefox był nadal oporny i te współrzędne na przekór trzyma w innych atrybutach
   // pobranie pozycji "globalnej" danego elementu - ofsetu
var pozycjaElementu = OkreslPolozenieElementu ( e.target );
e.target.setAttribute( 'data-offset_x', e.target.style.left );
e.target.setAttribute( 'data-offset_y', e.target.style.top );
e.target.setAttribute( 'data-mysz_pocz_x', e.pageX );
e.target.setAttribute( 'data-mysz_pocz_y', e.pageY );    

ResetujZIndexWszystkimJS();    
    var pionowosc = g_ktoraGrafika.style.zIndex;
    if ( ( pionowosc > 100 ) && ( pionowosc < 1000 ) ) g_ktoraGrafika.style.zIndex = parseInt( g_ktoraGrafika.style.zIndex ) + 100;    
    // poruszany wyskakuje przed szereg podczas wyciągania co najwużej kilka razy i tak już zostaje... 
    // ...w ramach tego działania (ale może zostać przykryty częsciowo przez sąsiedni element)
console.log('Podczas przeciągania: g_mojX:', g_mojX, ' [ (e.layerX:', e.layerX, ', e.offsetX:', e.offsetX,'), (g_mojY:', g_mojY, ' (e.layerY:', e.layerY,
            ', e.offsetY:', e.offsetY,')], zaś globalnie to (', pozycjaElementu.left, ', ', pozycjaElementu.top, 
            '), MYSZ (', e.pageX, ',' , e.pageY, ' )', 'ELEMENT (', e.target.style.left, ',' , e.target.style.top, ' )' );
}
    
function RuchPrzeciaganiaJS ( e )    // 'dragover'
{
//e = e || window.event;
   // wszelkie dziwne działania, które mogą wyniknąć podczas chwytania i pzrenoszenia elementu
    // w zasadzie "nicnierobienie();" o ile można wszelkie działania 'dragover' przeglądarek tym olać
    g_ktoraGrafika.style.opacity = 0.5;
    g_ktoraGrafika.style.outlineColor = "#d00";
    
e.preventDefault();      
return false;   // dodane    
}        
    
function RuchUpuszczaniaJS ( e )  // 'drop'
{
//e = e || window.event;
 // przestawione znów do góry    
var scena = document.querySelector('#rysunek'); 
var polozenieTla = OkreslPolozenieElementu( scena );    // dostaję { top, left }
//e.preventDefault(); // bez interpretacji i przetwarzania, gdy przeciągamy element w inny element (zwłaszca taki, który nie może być kontenerem, czyli <img> w <img>! )
//g_ktoraGrafika.style.left = parseInt( e.pageX - g_mojX ) + 'px'; // od współrzędnych globalnych odejmij wcześniejsze położenie elementu ... i nic się nie dzieje
//g_ktoraGrafika.style.top = parseInt( e.pageY - g_mojY ) + 'px';    
/*g_ktoraGrafika.style.left = parseInt( e.pageX - polozenieTla.left + g_przesuniecieTlaX - g_mojX ) + 'px';    
g_ktoraGrafika.style.top = parseInt( e.pageY - polozenieTla.top + g_przesuniecieTlaY - g_mojY ) + 'px';*/  
//g_ktoraGrafika.style.left = e.pageX - e.target.getAttribute( 'data-mysz_pocz_x' ) - polozenieTla.left + parseInt( g_przesuniecieTlaX ) - g_mojX + 'px';    
//g_ktoraGrafika.style.top = e.pageY - e.target.getAttribute( 'data-mysz_pocz_y' ) - polozenieTla.top + parseInt( g_przesuniecieTlaY ) - g_mojY + 'px';    

//g_ktoraGrafika.style.left = e.pageX - polozenieTla.left - parseInt( g_przesuniecieTlaX ) + g_mojX + 'px';    
//g_ktoraGrafika.style.top = e.pageY - polozenieTla.top - parseInt( g_przesuniecieTlaY ) + g_mojY + 'px';    
g_ktoraGrafika.style.left = e.pageX - polozenieTla.left - parseInt( g_przesuniecieTlaX ) + 'px';    // o dziwo dwie poniższe linie są wierniejsze ułożeniu finalnemu?!
g_ktoraGrafika.style.top = e.pageY - polozenieTla.top - parseInt( g_przesuniecieTlaY ) + 'px';      // tu też?!

g_ktoraGrafika.style.outlineStyle = "solid";    
g_ktoraGrafika.style.outlineColor = "#00d"; 
g_ktoraGrafika.style.opacity = 1;
    
/*g_ktoraGrafika.style.left = 200 + 'px';    
g_ktoraGrafika.style.top = 100 + 'px';  */
    
console.log("Przeciąganie! e.pageX: ", e.pageX, ", g_mojX:", g_mojX, ", położenieTła.left:", polozenieTla.left, ", g_przesunięcieTłaX:", g_przesuniecieTlaX, 
            ", e.pageY:", e.pageY, ", g_mojY:", g_mojY, ", położenieTła.top:", polozenieTla.top,", g_przesunięcieTłaY:", g_przesuniecieTlaY );
console.log("Docelowy element ma mieć zatem (", g_ktoraGrafika.style.left, ", " ,g_ktoraGrafika.style.top, ").");    
e.preventDefault();
return false;
}
       
function ResetujZIndexWszystkimJS ()
{
var elementy = document.querySelectorAll('img.przenosny');  // manipulacja bezpośrednio w JS (DOMie)
    for ( var i = elementy.length-1 ; i >= 0 ; i-- )
    {
    elementy[i].style.zIndex = 20;  // ustawianie z-indeksu na wartość wzorcową (różnica pomiędzy początkiem)
    }
}    

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
ktoraGrafika.addEventListener('touchmove', function() {
    //debug
console.log('Dotyk ekranu - przeciąganie elementu');    
    var pozycjaX = dotykJednopalczasty.pageX + ruchOsX;
    var pozycjaY = dotykJednopalczasty.pageY + ruchOsY;
    
    // pozycjonowanie elementu do poruszania
    ktoraGrafika.style.left = pozycjaX + 'px';
    ktoraGrafika.style.top = pozycjaY + 'px';
}, false); // jako 'bublowanie'    
} // function PoczatekDotykuJS-END
    
    
function KlikniecieObrazkaJS ( e ) 
{
e.target.style.zIndex = e.target.style.zIndex + 1;
}
    
    
document.querySelector('#gra').addEventListener('dragstart', PoczatekRuchuPrzeciaganiaJS, false );
document.querySelector('#gra').addEventListener('dragover', RuchPrzeciaganiaJS, false );
document.querySelector('#gra').addEventListener('drop', RuchUpuszczaniaJS, false );

document.querySelector('#gra').addEventListener('touchstart', PoczatekDotykuJS, false );
    
/*var obrazki = document.querySelectorAll('img.przenosny');
    obrazki.forEach( function ( obrazek ) {
    obrazek.addEventListener('click', KlikniecieObrazkaJS, false );    
    });*/

    
})();   // Przeciaganie-END   
    
	
// ***************************************************************************	
// ---------- *** AUTOURUCHAMIANIE *** --------------	 
// ***************************************************************************		

InicjujRamkiLadowania();    
//WystartujDebuggerLokalny( 'ZEPSUJ!' );    
WystartujDebuggerLokalny();
GenerujPowiadomienieOBledzie(); // wymuszony test po raz pierwszy    
    
UbijReklamy();    
InicjujPrzyciskiWyboruGalerii();
InicjujPrzyciskiWyboruPodstronyGalerii();    
	
ZaczytajSpisGalerii();
	
// testowo też do autouruchamiania gry - pierwsza plansza
InicjujGre();
OdkryjEmail();     
    
	
	// sterowanie wielkością czcionki nagłówka
	
	//$("#banner h1.logo").fitText();
$("#napisy h1").fitText(0.9, { minFontSize: '15px', maxFontSize: '62px' });
$("#napisy h2").fitText(1.6, { minFontSize: '8px', maxFontSize: '23px' });
$("#napis_spod h3").fitText(3, { minFontSize: '7px', maxFontSize: '17px' });    

//$('#wymiary').addClass('animacja_zanikanie2');  // dynamiczne przypisanie klasy    
AktualnyRozmiarOkna('#wymiary');

	
}); //document-ready-END


