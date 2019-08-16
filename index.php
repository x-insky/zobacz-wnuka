<!DOCTYPE html>
<html lang="pl">
	<head>
		<meta charset="utf-8">
		<title>Galeria ze Żłobka w Chojnowie</title>
		<link rel="shortcut icon" href="./grafiki/slonce_ikona.png" />
		<link rel="stylesheet" href="reset.css">
		<link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">  <!-- czcionka Muli -->	
        <link rel="stylesheet" href="styl.css">
        <link rel="stylesheet" href="lightbox/css/lightbox.css">

        <script src="jquery-3.2.1.js"></script>
        <script src="lightbox/js/lightbox.js"></script>
		<script src="witryna.js"></script>

	</head>

<body>

	<div id="witryna">

	<header id="naglowek">
	
	<div id="banner">
		<div id="logo">
			<div id="slonce_logo"><!-- <img src="grafiki/slonce.png"> --></div>
		</div>
		<div id="napisy">
			<h1><span>Zobacz Wnuka!</span> Galeria ze <span>Żłobka Słoneczko</span> w Chojnowie</h1>
 		<h3>Serwis umożliwia łatwiejszy podgląd rozrabiajacych wnuków przez dziadków ... i nie tylko. Treści pochodzą z witryny <a class="odnosnik_czerwony" href="http://zlobek.chojnow.eu/" target="_blank">zlobek.chojnow.eu</a></h3>
 		<p class="clearfix2" />
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
					<h2>Lista galerii ze żłobka</h2>
					 <div id="galeria_spis">
					 	
					 </div>
					 <div id="spis_sterowanie">
							<p id="status_galerii_spis"></p>
					 <h2 id="zaladuj_galerie_spis" class="przycisk clearfix2">Załaduj kolejne galerie</h2>	
					 </div>
					 <div id="wczytywanie_spis"><h2>Trwa wczytywanie... <img src="grafiki/slonce_60x60.png" /></h2>
		    </div>
		    	
					 <div id="galeria_spis_podmiana" class="clearfix">
					 	
					 </div>
				</div>	
		</div>		
	</header>

 <div id="glowna">
			<div id="komentarz">
			<!--<h2>A poniżej może pojawią się zdjęcia wnuków, o ile podamy dobry adres i reszta zadziała prawidłowo...</h2>-->
			</div>
			
		<div id="nazwa_galerii">
			 <h2></h2>
			 <p></p>
		</div>	
		
		<div id="wczytywanie"><h2>Trwa wczytywanie...  <img src="grafiki/slonce_60x60.png" /></h2>
		</div>
				
		<div id="skladowisko"></div>
						
	<nav id="nawigacja_galeria">
	</nav>
								
	 <div id="zawartosc_do_podmiany">
			<!-- a tu miniaturki z adresu zewnętrznego oraz klikane przejście do galerii -->
		</div>
		
		
	</div>

	<footer id="stopka">&copy;2017 v0.2.6 <button id="poco_button">Ale po co?</button> <button id="pomoc_button">Pomoc</button>
	
	 <div id="poco">
	  <h3>Jaki jest cel?</h3>
	   <p>Ta strona odpowiada żywotnym potrzebom całego społeczeństwa. To jest witryna na skalę naszych możliwości. Ty wiesz, co my robimy tym serwisem? My otwieramy oczy niedowiarkom. Patrzcie, to nasze, przez nas wykonane i to nie jest nasze ostatnie słowo.</p>
	  <h3>Po polskiemu</h3>
	   <p>Galerię żłobka przeglądało się karygodnie, więc należało coś z tym zrobić. Wcześniejsza obsługa tego serwisu również była mało intuicyjna, ale z czasem zapewniono (w miarę) łatwe nawigowanie pomiędzy kolejnymi zdjęciami w ramach wielu galerii. Bieżący wygląd interefejsu stanowi niemal końcową funkcjonalność witryny. Dla testów i zauważalności postępów nad intuicyjnością interejsu zachowano relikt z formularzem i koniecznością kopiowania odnośników.</p>
	  <h3>Jeszcze raz</h3>
	  <p>Poniższa witryna ma za zadanie tylko ułatwić korzytanie z materiałów zawartych w serwisie żłobka. Twórcy zależy na przedłużeniu życia myszy oraz powierzchni dotykowych komputerów, dlatego jego celem jest przeniesienie obciążenia na klawisze strzałek oraz w przyszłości na ewentulane kółko myszy (funkcjonalność zależna od dostawcy usług, a w zasadzie wyboru innego dostawcy).     
	  <h3>Informacje i zastrzeżenia</h3>
	   <p>Wszelkie prawa do materiałów i zdjęć należą do ich właścicieli, tj. instytucji Żłobka w Chojnowie - <a href="http://zlobek.chojnow.eu" target="_blank">zlobek.chojnow.eu</a> oraz serwisu e-informator - <a href="http://e-informator.pl/" target="_blank">e-informator.pl</a>.</p>
	 </div>
	 <div id="pomoc">
  <h3>Witryna wymaga dostępu do lokalizacji, skąd pochodzą oryginalne materiały.</h3>
 	 <p>Niniejszy serwis służy tylko do łatwiejszego wyświetlania galerii z osobami skazanymi na pobyt w żłobku. Bezwzględnie jest wymagany dostęp do oryginalnego serwisu.</p>
 	<h3>Kopiuj-wklej</h3>
 	 <p>Pierwotna funkcjonalnośc wymagała podania działającego odnośnika do serwisu zlobek.chojnow.eu, konkretnie do jednej z wielu galerii. Wiązało się to z koniecznością przekazania adresu, po uprzednim odwiedzeniu witryny żłobka i skopiowania zawartości z paska adresu. Teraz wklajanie w pole formularza nie jest wymagane i prawodpodobnie ta uprzykrzająca funkcjonalnośc zostanie wkrótce usunięta.
 	<h3>Podstrony</h3>
  	<p>Przeglądanie w galeriach ograniczających klikanie działa prawiłowo dla maksymalnie osiemnastu obrazków w galerii. Serwis ma umożliwić łatwą nawigację pomiędzy kolejnymi obrazkami.</p>
  <h3>Uwaga</h3> 
 	 <p>Witryna umożliwia oglądanie pokazu zdjęć poprzez mechanizm galerii tylko dla wskazanego żłobka, serwis nie wyświetli pokazu zdjęć dla innych adresów.</p>
	 </div>
	
	</footer>	
	
</div>	<!-- DIV#witryna -->
	
</body>
</html>
