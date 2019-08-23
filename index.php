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

            <div id="banner">
                <div id="logo">
                    <div id="slonce_logo"><!-- <img src="grafiki/slonce.png"> --></div>
                </div>
                <div id="napisy">
                    <h1 class="logo">Zobacz Wnuka!</h1>
                    <h2 class="logo">Galeria ze <span>Żłobka Słoneczko</span> w Chojnowie</h2>
                    <p class="clearfix2" ></p>

                </div>
                <div id="napis_spod">
                    <h3>Serwis umożliwia łatwiejszy podgląd rozrabiajacych wnuków przez dziadków ... i nie tylko. Treści pochodzą z witryny <a class="odnosnik_czerwony" href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a></h3>
                </div>

            </div>

            <div id="naglowek_kontener">

                <h1 class="zmienny">Do uruchomienia galerii wymagane podanie adresu witryny ze zdjęciami <button id="odswiez" style="margin: 0.05em; padding: 0.1em 0.6em; font-size: 60%;">Odśwież</button></h1>
                <h3>Wpisz/wklej pełny adres do przeglądania galerii z witryny <a class="odnosnik_czerwony" href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a> lub po prostu skorzystaj z poniższej listy galerii</h3>
                <div id="formularz">
                    <form action="#" method="post" id="wyszukaj">
                        <fieldset>
                            <label for="http_adres">Adres galerii</label>
                            <input type="text" id="http_adres" name="http_adres" placeholder="np. http://zlobek.chojnow.eu/u_tygryskow,a146.html" alt="Podaj adres podstrony konkretnej galerii" />
                            <input type="button" id="testowy_adres_button" name="testowy_adres_button" value="Testowy adres" />
                            <input type="submit" id="http_adres_submit" role="submit" value="Zobacz wnuki" />
                            <div id="form_error">Wymagane uzupełnienie pola tekstowego, wpisz adres podstrony z serwisu zlobek.chojnow.eu</div>				
                        </fieldset>
                    </form>
                </div>	

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
                                                    <input type="range" min="1" selectionDirection="backward" id="suwak_galerii" name="suwak_galerii" list="suwak_znaczniki" alt="Wybierz numer galerii z zakresu" />
                                                    <datalist id="suwak_znaczniki">
                                                        <option value="1" label="1">
                                                        <option value="25">
                                                        <option value="50" label="50%">
                                                        <option value="75">
                                                        <option value="100" label="max">
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div id="suwak_info">
                                                <div>
                                                    <input type="button" id="wybrany_nr_zmniejsz" class="maly_guzik" value="-1" />
                                                    <input type="button" id="wybrany_nr_zwieksz" class="maly_guzik" value="+1" />
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
                                                    <input type="range" min="1" selectionDirection="backward" id="suwak_podstrony" name="suwak_podstrony" list="suwak_znaczniki2" alt="Wybierz numer galerii z zakresu" />
                                                    <datalist id="suwak_znaczniki2">
                                                        <option value="1" label="1">
                                                        <option value="5">
                                                        <option value="10" label="50%">
                                                        <option value="25">
                                                        <option value="50" label="max">
                                                    </datalist>
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
            </div>	<!-- div#naglowek_kontener -->
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
		
	   </div> <!-- glowna -->

	<footer id="stopka">&copy;2018 v0.4.6 <button id="poco_button">Ale po co?</button> <button id="pomoc_button">Pomoc</button>
        <div id="poco">
            <div class="kontener">
                <h3>Jaki jest cel?</h3>
                <p>Ta strona odpowiada żywotnym potrzebom całego społeczeństwa. To jest witryna na skalę naszych możliwości. Ty wiesz, co my robimy tym serwisem? My otwieramy oczy niedowiarkom. Patrzcie, to nasze, przez nas wykonane i to nie jest nasze ostatnie słowo.</p>
                <h3>Po polskiemu</h3>
                <p>Galerię żłobka przeglądało się karygodnie, więc należało coś z tym zrobić. Wcześniejsza obsługa tego serwisu również była mało intuicyjna, ale z czasem zapewniono (w miarę) łatwe nawigowanie pomiędzy kolejnymi zdjęciami w ramach wielu galerii. Bieżący wygląd interefejsu stanowi niemal końcową funkcjonalność witryny. Dla testów i zauważalności postępów nad intuicyjnością interejsu zachowano relikt z formularzem i koniecznością kopiowania odnośników.</p>
                <h3>Jeszcze raz</h3>
                <p>Poniższa witryna ma za zadanie tylko ułatwić korzytanie z materiałów zawartych w serwisie żłobka. Twórcy zależy na przedłużeniu życia myszy oraz powierzchni dotykowych komputerów, dlatego jego celem jest przeniesienie obciążenia na klawisze strzałek oraz w przyszłości na ewentulane kółko myszy (funkcjonalność zależna od dostawcy usług, a w zasadzie wyboru innego dostawcy).     
                <h3>Informacje i zastrzeżenia</h3>
                <p>Wszelkie prawa do materiałów i zdjęć należą do ich właścicieli, tj. instytucji Żłobka w Chojnowie - <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a> oraz serwisu e-informator - <a href="http://e-informator.pl/" target="_blank">e-informator.pl</a>.</p>
            </div>
        </div>
        <div id="pomoc">
            <div class="kontener">            
                <h3>Witryna wymaga dostępu do lokalizacji, skąd pochodzą oryginalne materiały.</h3>
                <p>Niniejszy serwis służy tylko do łatwiejszego wyświetlania galerii z osobami skazanymi na pobyt w żłobku. Bezwzględnie jest wymagany dostęp do oryginalnego serwisu.</p>
                <h3>Kopiuj-wklej</h3>
                <p>Pierwotna funkcjonalnośc wymagała podania działającego odnośnika do serwisu zlobek.chojnow.eu, konkretnie do jednej z wielu galerii. Wiązało się to z koniecznością przekazania adresu, po uprzednim odwiedzeniu witryny żłobka i skopiowania zawartości z paska adresu. Teraz wklajanie w pole formularza nie jest wymagane i prawodpodobnie ta uprzykrzająca funkcjonalnośc zostanie wkrótce usunięta.
                <h3>Podstrony</h3>
                <p>Przeglądanie w galeriach ograniczających klikanie działa prawiłowo dla maksymalnie osiemnastu obrazków w galerii. Serwis ma umożliwić łatwą nawigację pomiędzy kolejnymi obrazkami.</p>
                <h3>Uwaga</h3> 
                <p>Witryna umożliwia oglądanie pokazu zdjęć poprzez mechanizm galerii tylko dla wskazanego żłobka, serwis nie wyświetli pokazu zdjęć dla innych adresów.</p>
                <h3>Użyte technologie - oczywistości</h3> 
                <ul>
                    <li class="tech_tak">HTML5</li>
                    <li class="tech_tak">CSS3</li>
                    <li class="tech_tak">RWD&nbsp;+&nbsp;<em>mobile&nbsp;first</em></li>
                    <li class="tech_tak">Flexbox</li>                        
                    <li class="tech_tak">JavaScript</li>
                    <li class="tech_tak">jQuery</li>
                    <li class="tech_tak">AJAX</li>
                    <li class="tech_tak"><em>progressive&nbsp;enhancement</em></li>                        
                    <li class="tech_tak">kompatybilność</li>
                    <li class="tech_tak">PHP</li>
                </ul>
                <h3>Zgodność źródeł z konwencjami JS na poziomie 99,7% ;P</h3> 
                <ul>
                    <li>WielBłąd(&nbsp;),&nbsp;a&nbsp;caMel()</li>
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
