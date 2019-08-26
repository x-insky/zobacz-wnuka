<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Galeria ze Żłobka w Chojnowie</title>
		<link rel="shortcut icon" href="./grafiki/slonce_ikona.png" />
		<link rel="stylesheet" href="reset.css">
		<link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">  <!-- czcionka Muli -->	
		<link rel="stylesheet" href="zlobek-styl.css">
		<link rel="stylesheet" href="lightbox/css/lightbox.css">

		<script src="jquery-3.2.1.js"></script>

	</head>

<body>

	<div id="witryna">

        <header id="naglowek">
        <!-- <div class="kontener">  -->

            <!-- tu </div> - kontener - tylko na nagłówek, tj. logo z animacjami (a nie całą zawartość zamnknąc w tych okowach... choć ideaklnie pasuje to ułatwienie  --> 

            <div id="naglowek_kontener">

                <div id="banner">

                    <div id="logo">
                        <div id="slonce_logo"><!-- <img src="grafiki/slonce.png"> --></div>
                    </div>
    
                    <div id="napisy">
                    <h1 class="logo">Zobacz Wnuka!</h1>
                    <h2 class="logo">Galeria ze <span>Żłobka Słoneczko</span> w&nbsp;Chojnowie</h2>
                    <p class="clearfix2" ></p>
                    </div>
                    
                    <div id="zagraj">
                        <div id="zagraj_srodek">
                        <h4 class="gra_odnosnik">Czekasz na załadowanie?</h4>
                        <h3 class="gra_odnosnik">Zagraj w grę!</h3>
                        <p class="gra_odnosnik">&gt;</p>
                        </div>
                    </div>
                    
                    <div id="napis_spod">
                    <h3>Serwis umożliwia łatwiejszy podgląd rozrabiających wnuków przez dziadków... i nie tylko. Treści pochodzą&nbsp;z&nbsp;witryny <a class="odnosnik_kolor" href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a></h3>
                    </div>

                </div> <!-- div#banner -->
                
            </div>	<!-- div#naglowek_kontener -->    
                
                <!-- formularz-antyk
                <h1 class="zmienny">Do uruchomienia galerii wymagane podanie adresu witryny ze zdjęciami <button id="odswiez" style="margin: 0.05em; padding: 0.1em 0.6em; font-size: 60%;">Odśwież</button></h1>
                <h3>Wpisz/wklej pełny adres do przeglądania galerii z witryny <a class="odnosnik_czerwony" href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a> lub po prostu skorzystaj z poniższej listy galerii</h3>
                <div id="formularz">
                    <form action="#" method="post" id="wyszukaj">
                        <label for="http_adres">Adres galerii</label>
                        <input type="text" id="http_adres" name="http_adres" placeholder="np. http://zlobek.chojnow.eu/u_tygryskow,a146.html" alt="Podaj adres podstrony konkretnej galerii" />
                        <input type="button" id="testowy_adres_button" name="testowy_adres_button" value="Testowy adres" />
                        <input type="submit" id="http_adres_submit" role="submit" value="Zobacz wnuki" />
                        <div id="form_error">Wymagane uzupełnienie pola tekstowego, wpisz adres podstrony z serwisu zlobek.chojnow.eu</div>				
                    </form>
                </div>	 
                        -->


                <div id="spis_tresci">
                    <div id="zaczytany_spis">
                        <h2>Lista galerii ze Żłobka</h2>
                        <div class="ciemne_tlo_spis">
                            <div class="kontener">
                                <div id="galeria_spis">
                                </div>
                            </div>    
                        </div>
                    </div>
                
                    <div id="wybrany_zaczytany_spis">
                        <h2>Lista galerii z wybranej <span></span> podstrony</h2>
                        <div id="wczytywanie_wybrane_galerie_spis">
                            <h2>Trwa wczytywanie... <img src="grafiki/slonce_60x60.png" /></h2>
                        </div>
                        <div class="ciemne_tlo_spis">                        
                            <div class="kontener">
                                <div id="wybrane_galerie_spis">
                                </div>
                            </div>
                        </div>
                        <div id="skladowisko_wybrane_galerie_spis">
                        </div>
                    </div>
                    
                    
                    
                    
                    <nav id="spis_sterowanie">
                        <div class="kontener">
                        <p id="status_galerii_spis"></p>
                        </div>
                        <h2 id="zaladuj_galerie_spis" class="przycisk clearfix2">Załaduj kolejne galerie</h2>

                        
                        <div id="wczytywanie_spis">
                        <h2>Trwa wczytywanie... <img src="grafiki/slonce_60x60.png" /></h2>
                        </div>

                        <div class="kontener">
                            <div id="selektor">     
                                <h2 id="selektor_naglowek">...lub wybierz dowolną galerię poniżej <span>rozwiń ▼</span></h2>
                                <div>
                                    <form action="#" method="post" id="wybierz_galerie" autocomplete="off">
                                        <div id="wybor_galerii">
                                         <div id="suwak">
                                                <div>
                                                <label for="galeria_wybrany_nr">Wybrany numer galerii:</label>
                                                <input type="text" id="galeria_wybrany_nr" name="galeria_wybrany_nr" maxLength="4" />
                                                </div>
                                                <div>
                                                <input type="range" min="1" selectionDirection="backward" id="suwak_galerii" name="suwak_galerii" alt="Wybierz numer galerii z zakresu" />
                                                </div>
                                            </div>
                                            <div id="suwak_info">
                                                <div>
                                                <input type="button" id="wybrany_nr_zmniejsz" class="maly_guzik" value="◄" />
                                                <input type="button" id="wybrany_nr_zwieksz" class="maly_guzik" value="►" />
                                                </div>
                                            </div>
                                            <div>
                                                <input type="button" id="losuj_zakres" name="losuj_zakres" value="Losuj galerię" />
                                                <input type="submit" id="suwak_galerii_submit" name="suwak_galerii_submit" role="submit" value="Zobacz wybrany" />
                                                <div id="form_error">Wymagany wybór spośród dostępnych numerów galerii</div>			
                                            </div>	
                                        </div>  <!-- div#wybor_galerii -->  
                                        
                                    <div id="wybor_podstrony_galerii">
                                         <div id="suwak_podstrony">
                                                <div>
                                                <label for="podstrona_wybrany_nr">Wybrany numer podstrony:</label>
                                                <input type="text" id="podstrona_wybrany_nr" name="podstrona_wybrany_nr" maxLength="4" />
                                                </div>
                                                <div>
                                                <input type="range" min="1" selectionDirection="backward" id="suwak_podstrony" name="suwak_podstrony" alt="Wybierz numer galerii z zakresu" />
                                                </div>
                                            </div>
                                            <div id="suwak_podstrona_info">
                                                <div>
                                                <input type="button" id="wybrany_nr_podstrony_zmniejsz" class="maly_guzik" value="◄" />
                                                <input type="button" id="wybrany_nr_podstrony_zwieksz" class="maly_guzik" value="►" />
                                                </div>
                                            </div>
                                            <div>
                                                <input type="button" id="losuj_zakres_podstrony" name="losuj_zakres_podstrony" value="Losuj podstronę" />
                                                <input type="submit" id="suwak_podstrony_submit" name="suwak_podstrony_submit" role="submit" value="Zobacz wybrany" />
                                                <div id="form_error">Wymagany wybór spośród dostępnych numerów podstron galerii</div>			
                                            </div>	
                                        </div>  <!-- div#wybor_podstrony_galerii --> 
                                        
                                        
                                    </form>
                                </div>    
                            </div> <!-- div#selektor -->
                        </div>  <!-- div.kontener -->
                        <div id="skladowisko_status_wybranej_galerii">
                        </div>

                        <div id="status_wybranej_galerii">
                        </div>
                        <!-- tu było #wczytywanie  ... -->


                        <div id="galeria_spis_podmiana" class="clearfix">
                        </div>
                    </nav>	
                </div>  <!-- div#spis_tresci -->
        <!--    </div>	-->  <!-- div#naglowek_kontener -->
            <!-- </div> -->  <!-- div-kontener  (na próbę) -->
        </header>

        <div id="glowna">
            <div id="komentarz">
            <!--<h2>A poniżej może pojawią się zdjęcia wnuków, o ile podamy dobry adres i reszta zadziała prawidłowo...</h2>-->
            </div>

            <div id="nazwa_galerii">
                <div class="kontener">
                <h2></h2>
                <img />
                <p></p>
                </div>    
            </div>	

            <div id="wczytywanie"><h2>Trwa wczytywanie...  <img src="grafiki/slonce_60x60.png" /></h2>
            </div>
            
            <div class="jasne_tlo_galeria">
                <div class="kontener">
                    <div id="skladowisko"></div>
                </div>
            </div>
            
            <nav id="nawigacja_galeria">

            </nav>

            <div id="zawartosc_do_podmiany">
                <!-- a tu miniaturki z adresu zewnętrznego oraz klikane przejście do galerii -->
            </div>
		
        </div> <!-- <div id="glowna"> -->

        
        <div id="gra">
            <div id="reguły">
                <div class="kontener">    
                <h1>Pokoloruj duży obrazek poprzez ułożenie małych obrazków we właściwych miejscach.</h1>
                <h2>Użyj myszy lub gładzika komputera, bo małe ekrany dotykowe są be (póki co jest dramat)!</h2>
                <p style="text-decoration: line-through;"><em>Podobne widowisko teatralne</em> jest z użyciem czegokolwiek na czymkolwiek do obsługi przeciągania, więc póki co zdobywanie punktów i budowanie rankingów jest odłożone w bliżej nieokreslone <em>kiedyś</em>.</p>   
                <p style="text-decoration: line-through;">Rozgrywka jest na czas, spróbuj osiągnąć możliwie najlepszy wynik (zakładając, że system nie oszukuje przy przydziale punktów).</p>
                </div>
            </div>
            <div id="sterowanie">
                <div class="kontener">
                <button>Start/Od nowa</button> <button>Losuj planszę</button> <button>Pokaż podpowiedź</button> <button>Moje wyniki</button>                
                </div>

            </div>
            <div class="kontener">
                <div id="plansza" droppable="true" ondrop="" ondragover=""> <!-- "ON!? to je gupie" -->
                    <div id="rysunek">
                    </div>
                    <div id="prawy_zasobnik">
                    </div>
                    <div id="dolny_zasobnik">
                    </div>
                </div>
            </div>
        </div> <!--     <div id="gra">  -->
        
        
        <footer id="stopka">&copy;2018 v0.4.16 <button id="poco_button">Ale po co?</button> <button id="pomoc_button">Pomoc</button>
            <div id="poco">
                <div class="kontener">
                    <h3>Dla Hani</h3>
                    <p>Bo tak! Z mniejszą dedykacją dla Szymonka i Ninki też. Niech za jakiś czas maluchy zobaczą siebie, jak wyglądały kiedyś (czyli teraz).</p>
                    <h3>Jaki jest cel?</h3>
                    <p>Ta strona odpowiada żywotnym potrzebom całego społeczeństwa. To jest witryna na skalę naszych możliwości. Ty wiesz, co my robimy tym serwisem? My otwieramy oczy niedowiarkom. Patrzcie, to nasze, przez nas wykonane i to nie jest nasze ostatnie słowo.</p>
                    <h3>Jeszcze raz po polskiemu</h3>
                    <p>Poniższa witryna ma za zadanie ułatwić korzytanie z materiałów zawartych w oryginalnym serwisie żłobka. Chęć przedłużenia życia myszom oraz powierzchniom dotykowym komputerów zdecydowała o zmniejszeniu obciążenia (konkretnie z niepotrzebnego klikania kursorem w przycisk <em>powrót</em> -- [&lt;-] i kolejnego niepotrzebnego kliknięcia w kolejne zdjęcie, itd. aż do końca danej galerii przemnożone przez ilość podstron danej galerii...). Nadmiernie porysowanych ekranów w telefonach, czy tabletach też nie chemy, prawda? Nazbyt zużyty przycisk myszy lub wytarty (albo przebity) gładzik w laptopie zmusza do zakupu urządzenia wskazującego... <p>
                    <h3>(to nie jest antyreklama pewnego sklepu komputerowego)</h3>    
                    <p>Po prostu ten serwis zapewnia oszczędność czasu użytkownikowi, a do tego zmniejsza zużycie pasma internetowego użytkownika (pakietu transmisji danych na tzw. <em>urządzeniach mobilnych</em>) w porównaniu do przeglądania orygionalnej witryny. Do tego nie katuje serwera przy każdym dużym obrazku. Same plusy wynikają z korzystania z tej <em>nakładki</em>, zachęcam do dalszego korzystania.</p>    
                    <h3>Informacje i zastrzeżenia</h3>
                    <p>Wszelkie prawa do materiałów (treści tekstowych i zdjęć) należą do ich właścicieli, tj. instytucji Żłobka w Chojnowie - <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a> oraz serwisu e-informator - <a href="http://e-informator.pl/" target="_blank">e-informator.pl</a>.</p>
                    <h3>Kontakt</h3>
                    <p>Wszelkie uwagi, skargi, wnioski i propozycje funkcjonalności lub zaobserwowane błędy w działaniu serwisu można słać na poniższy adres email <a href="#" id="adres_email">nieodbieram@gdzieś.w.internecie.com</a></p>
                </div>
            </div>
            <div id="pomoc">
                <div class="kontener">            
                    <h3>To tylko przeglądarka</h3>
                    <p>Niniejszy serwis służy do łatwiejszego wyświetlania galerii z osobami skazanymi na pobyt w żłobku. Bezwzględnie jest wymagany dostęp do macierzystego serwisu www, bez niego nie pojawiają się treści tutaj.</p>
                    <h3>Pożegnanie <em>kopiuj-wklej</em></h3>
                    <p>Pierwotna funkcjonalnośc wymagała podania działającego odnośnika do serwisu zlobek.chojnow.eu, konkretnie do jednej z wielu galerii. Wiązało się to z koniecznością przekazania adresu, po uprzednim odwiedzeniu witryny żłobka i skopiowania zawartości z paska adresu. Teraz przegląd galerii odbywa się bezpośrednio na tej witrynie.</p>
                    <h3>Podstrony</h3>
                    <p>Przeglądanie w galeriach ograniczających klikanie działa prawiłowo dla maksymalnie osiemnastu obrazków w galerii. Serwis ma umożliwić łatwą nawigację pomiędzy kolejnymi obrazkami.</p>
                    <h3>Uwaga</h3> 
                    <p>Witryna umożliwia oglądanie pokazu zdjęć poprzez mechanizm galerii tylko dla wskazanego żłobka, serwis nie wyświetli pokazu zdjęć dla innych adresów.</p>
                    <h3>Użyte technologie - co tutaj zawarto (oczywistości i nie~)</h3> 
                    <ul>
                        <li class="tech_tak">HTML5</li>
                        <li class="tech_tak">CSS3</li>
                        <li class="tech_tak">RWD&nbsp;+&nbsp;<em>mobile&nbsp;first</em></li>
                        <li class="tech_tak">Flexbox</li>                        
                        <li class="tech_tak">JavaScript</li>
                        <li class="tech_tak">jQuery</li>
                        <li class="tech_tak">AJAX</li>
                        <li class="tech_tak">PHP</li>
                        <li class="tech_tak">SPA</li>                        
                        <li class="tech_tak"><em>progressive&nbsp;enhancement</em></li>                        
                        <li class="tech_tak">kompatybilność</li>
                    </ul>
                    <h3>Zgodność źródeł z konwencjami JS na poziomie 99,7% ;P</h3> 
                    <ul>
                        <li>WielBłąd(&nbsp;),&nbsp;a&nbsp;camelCamel()</li>
                        <li>no(n)Tacja&nbsp;{...}</li>
                    </ul>
                    <h3>Czego tutaj nie ma</h3> 
                    <ul>
                        <li class="tech_nie">Angular.js</li>
                        <li class="tech_nie">React</li>
                        <li class="tech_nie">Bootstrap</li>
                        <li class="tech_nie">ES6&nbsp;===&nbsp;ES2015</li>
                        <li class="tech_nie">promesy</li>                    
                        <li class="tech_nie">Node.js</li>
                        <li class="tech_nie">SASS/LESS/PostCSS</li>
                        <li class="tech_nie">CSS&nbsp;Grid</li>
                        <li class="tech_nie">SVG?</li>
                    </ul>
                    <h3>Nadal na etapie projektowania</h3>
                    <p>Status projektu nieukończony, nadal nie w <em>produkcji</em>.</p> 
                </div>
            </div>
        </footer>	
	
    </div>	<!-- DIV#witryna -->
	

		<script src="fittext/jquery.fittext.js"></script>	
		<script src="witryna.js"></script> 		
		<script src="lightbox/js/lightbox.js"></script>
        <script>
            lightbox.option({ albumLabel : "Zdjęcie %1 z %2"
            });
        </script>
		
		
</body>
</html>
