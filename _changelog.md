v0.5.2 - draggable items of game are initially arranged after clicks; hosting ad-killer; newer footer contents; slighty improved readability of some JS code

* v0.5.2  -- [2018-09-25]

[+] ADDED

-- index.php
* added some id to target functional element
  - assigned new id 'gra_start' to  button inside 'game area'

-- witryna.js
* added 'use strict' declaration at beginning of the code
* built function 'UbijReklamy' to removal
advertisement contents which are inserted to page by current hosting company
  - removals only ads which destroys layout, i.g. too wide pictures, which set page width to its width
  - traversing & removing parent container with all ad content
  - some text based ads left as it is
  - added function call to autostart block of page logic
* created function 'RozmiescCzesciWzorcowo' to initially arange all draggable pictures into right container
  - based on the existing function 'RozmiescCzesci'
  - fires when click on button-like structure in page header
  - also added as click event response do button with id 'gra_start'
* created function 'UsunCzesci' to permanently removal draggable items from the page
  - not yet connnected to program logic
  
[*] MODIFIED

-- index.php
* rearranged texts order inside footer
  - some outdated paragraphs removed
  - some old content replaced with new texts (e.g. RWD, live removal of hosting advertisements by JavaScript)
* removed double empty lines
 
-- zlobek-styl.css
* changed bottom margin to absolute units
  - the same 32 pixels equivalent on wide screen
  - unchangeable on narrower screens

-- witryna.js
* changed written styles of code in few function declarations
  - added just few spaces for better readability of code source

---------------------------

v0.5.1 - just a regular CSS styles cleaning inside a CSS file

* v0.5.1  -- [2018-09-24]

[*] MODIFIED

-- zlobek-styl.css
* CSS cleaning style
  - added proper indentations to rules inside all defined selectors
  - text of rule is indented by one tab unit (or four spaces) inside a selector
  - still in test or temporary rules are indented more
  - 'so many changes' -- looks like it's different file but it's not
  - the same rules, just another indentations
  - some irrelevant content may have disappeared

---------------------------

v0.5 - animated dimensions of a screen/window @ change; better readability of main headers; footer columns; text-shadows of headers; better texts; greater +1/-1 btns; header link; main gallery photo on smallest screens; recursion gray logic; title with coma no problem; html like xhtml; fixed counting from zero when div5;

* v0.5 -- [2018-09-24]

[+] ADDED

-- index.php
* added new absolute positioned div element of id 'wymiary' to showing **actual size of the visible content inside browser window**
  - dimmensions of all active area where is displayed page
  - available area might change when browser window resizes or flipps screen of mobile device or a web browser hides its toolbars while scrolling contents (some mobile browsers saves space of constantly showed address bar, status menu, e.t.c.)
  - area element appers when available width or height changed, always presenting the actual size of program window or screen it that moment
* added a main header texts for each of two groups in footer
  - easy distinguis which content is presenting after a click on a button in footer
  - before cointaner element, not inside that container class
* added two divs to divide text content on a half
  - purpose is to get two column layout in each of two sections of footer
* added XML style endings for all tags without ending tag 

-- zlobek-styl.css
* styled the new 'wymiary' element
  - displays in the bottom of the screen in semi transparent rectangle (if available) in fixed position
  - experimenting with dimensions of this element by putting new size in almost every threshold of media query
* defined new animation to hide element with dimensions
  - after short time 'area element' shifts down outside the visible part of the screen
* defined also a class where that animation is configured
  - class addition or removing is controlled by JavaScript, which is fired by browser events
* added all purpose 'flex_kontener' class for marking any element as a flex container
* also added a definition for a flex item for first 'div' element encountered inside a flex container
* added a style to raise flex container and flex items but without using previously defined general class
  - here used a structure of elements with connection to the concrete parent element
  - also a pseudo classes are used to target first or last element of given type
* added the largest media query threshold as a method to hide game content when screen size is below 1300px
  - should operate with JavaScript because showing 'game contents' is logic which is triggered by click on specified button
* added bright shadow with slighty blur to secondary text of logo
  - for better distinguis dark blue text on bluish background
* added a polyfill for a 'szara_zawartosc' class for old Internet Explorers
  - existing filter declaration is preceded by simple 'filter: grayscale;' which alows 'gray 100% filter' to work in IE 6..9
* added subtle dark gray shadow with high blur for 'span' elements inside 'h2' in header area

-- witryna.js
* builded a function 'AktualnyRozmiarOkna' to get actual size of the window, screen or working space of screen
  - it returns the size and also displays the result inside a given element
  - adding a class of defined animation to hide a result after a short period of time
  - conditionally tested if an element is already animating or after an ended animation
  - uses a jQuery hack to add again the same class to the element to achieve element animation from the beginning
* created an event for changing size of the window/screen
  - fired when screen size or window size changes
  - can be fired repeatedly like the nature of resize event

[*] MODIFIED

-- index.php
* changed accordingly labels of forms increment / decrements buttons as '+1' / '-1'
  - removed all previously labels with symbols
* also changed label text of selecting subpage from gallery list
* changed text content of some paragraphs and header inside 'game area'
  - as a better explaination of rules or purposes

-- zlobek-styl.css
* changed 'h1' headers
 - text color is now yellow, used in logo header and game section main text
  - changed first text-shadow to darker sharp shadow to easy distinguish letters on complementary color of blue background
  - expressive logo text
* increased by about 20% size of form buttons for incrementing / decrementing
  - no need to set a new dimension, just a font size of button text is increased to 140%
  - also increased horizontal padding from 0.25em to 0.45em
  - for easier use of touch screens 
* changed style of 'h2' element
  - slighty increased vertical padding
  - shadow under the element without oblique displacement and with brighter color and lower blur ratio
* modifed the style of 'h3' element
  - changed color from darkmagenta to violet with increased font size to 135% (from previously 125%)
  - added soft shadow of gray color (slighty darker than before)
* increased font size to 125% for 'h4' elements (instead 115% before)
* changed color of 'h3' elements inside header to yellow
  - added a semi dark shadow with average blur ratio
  - a nice and sharp look even while text font is reducing
* changed default style of 'odnosnik_kolor' class from yellow to creamy white
  - hover state also affected, changed color from white to almost black and added contrast creamy white
  - also included new 'text-shadow' property in transition definition (with color already defined)
* removed bottom margin from container for all readed content, a div element with id of 'galeria_spis'
* added medium dark shadow under the 'h2' headers
  - easier to read text from next-subpage-load button and top belt of selecting form
  - the same style for both elements in one place
* increased margin from 1em to 1.5em of next-subpage-load button
* modified default mobile-first basis for main gallery photo inside current gallery details
  - 'img' itself set to block type
  - increased usability on smallest screens
  - 'float: left' enabled by media query above 320px width screen
  - added a transition for 'margin-top', which change was defined already in media query
* added gray shadow for every yellow notification texts, just next to the rotating sun image

-- witryna.js
* modified all messages text if there was a typo
* removed unnecessary blank lines or outdated comments
* conditionally removings class 'szara_zawartosc' if given element has it
  - used with recursions when the final functions call should remove grays and display a expectations content there  
* changed logic when counting last occurrence of number in given URL inside function 'GenerujPodstronyGalerii'
  - avoided an error for the title that contains the comma separator
* added new comments if necessary

[F] FIXED

-- witryna.js
* modified logic and formula inside function 'KtoraPodstronaWGalerii'
  - used a condition to set the value additional variable to '1' or leaves the default value of '0'
  - using that variable as a corrector inside slighty modified formula
  - generally speaking it increments the result in some condition or just leaves that value unmodified
  - tested with different total galleries number and from now the result is always good
  - fixes: #23 - 'Periodic problem with gallery numbering'

---------------------------

v0.4.19 - loading notification moved up, text before subgallery nav, buttons labelled 'subgallery'; CSS: generic first, cleanings, comment-headers, hand icon for selective forms bar; F: removed white border of sliders in FF;

* v0.4.19 -- [2018-08-23]

[*] MODIFIED

-- index.php
* moved up notification of loading of next gallery subpage, an element with id of 'wczytywanie_spis'
  - placed before a button of loading next subpage
  - so it's before when selected subpage gallery list is visible also
* for test purpose changed label text of increment/decrement buttons
  - using another symbols of arrows due to problems with displaing some of 'triangle arrows' on some old browsers
* added another attribute to the object inside last block of 'script' tags
  - used for global initialization fittext addon

-- zlobek-styl.css

* moved up definitions of generic styles for elements or classes
  - the next selectors sometimes redefines this already defined styles  by placing parent class or ids at the begining of their selectors  
  - anything is added to generic and always increase specifity of selector
* added a pointer icon to 'h2' of id 'selektor_naglowek' to easily differentiate possible action on this element
  - also added separately icon for child 'span' element
* CSS cleaning
  - completely removed from file, already commented rules, 'mobile-last' with 'max-width' values instead 'min-width'
  - removed unnecessary new lines
* added comment lines with names as separators for grouped content
  - it groups many selectors by similar topics or areas of the page
  - each semantic group contents is easier to find
  - it was done before and intentionally, there wasn't only a named  descriptions for groups
  - also added new comments as a subgroups or headers, to easier distiguish any content of CSS 

-- witryna.js
* little changes inside function 'GenerujPodstronyGalerii'
  - first any previous content of possible navigations are removed by 'empty()' method
  - and secondly to empty container may be placed generic text, that informs about any subpage, only if any subpage of given gallery exists
  - if so the button or buttons are placed under the previously generated text of header
  - changed the label on the button form 'Gallery #No' to 'Subpage #No' 
  - all the dynamic content is surronded by container class that limits the total width of its contents on larger screens

[F] FIXED

-- zlobek-style.css
* removed white border  around the slider, which is in a focus state
  - changed color of used outline to transparent inside vendor specified selector ':-moz-focusring '
  - still in use 3px thin border around slider but it's invisible now
  - couldn't change any internal behavior of thin black border, which is also dotted
  - probably a usability thing that can't be styled by a programmer
  - fixes: #21 - 'Firefox: a white box around the active form'
  - modified also the color of outline itself to value of 'none' inside vendor specified selector ('::-moz-range-thumb') to stayed a center of slider handle in the same place when is hovered, focused or inactive

---------------------------

v0.4.18 - verified media queries for 4 gallery items in a line; touches CSS of sliders and draggable 'imgs'; cleaning of coding style of styles

* v0.4.18 -- [2018-08-15]

[*] MODIFIED

-- zlobek-styl.css
* verified the media query tresholds for proper displaying of given number of gallery list items
  - tested why four items cannot be displayed in one line, when screen wides from about 500 to 1200px  
  - above 700px wide the page shows three gallery items side by side
  - above 940px is displayed a four gallery items in one row
  - five elements when it's wider than 1180px
* redefined global selector for any draggable ('[draggable]') element to a child and draggable 'img' element of container 'gra'
* trying to create more compatible look the slider between main browsers
  - experimented with paddings, margins and their values (negatives also)
  - mainly to achieve similar look into Chrome
  - slighty changes color of sliders, especially for extended IE style
  - also modified in IE a separate hover and focus state for achieving three different sizes of the handle of the slider
* slighty changes of padding inside footer by media queries
* matched indentations to be equal or just similar inside the same selector, especially in defined media query

---------------------------

v0.4.17 - modified headings & pagraphs texts of footer; and theirs padings also; computing of subgallery number; arrangement of current gallery details on wider screens;

* v0.4.17 -- [2018-08-12]

[*] MODIFIED

-- index.php
* changed texts of paragraphs of many paragraph and subheaders in footer area and in 'game area'
  - extended for some longer sentences
  - some of them were shortened
  - used quotations, cites and parentheses

-- witryna.js
* removed conditional statement inside function 'KtoraPodstronaWGalerii'
  - now the same formula used to calculate subpage based by given gallery number
  - probably a possible error in computations if total gallery number is divisible by 5!!!
  - hard to test when last digit in number of lastly added gallery (total gallery number) isn't 0 or 5
  - it's hard to test when gallery total number is read form another place and any substitution of it or simulations breaks loaded subpages numbers or the awaitet result (fault of grouping results in reverse order, which affects the numbering of each subpage)  

-- zlobek-styl.css
* increased paddings for current gallery details container, with id of 'nazwa_galerii'
* increased left padding for current gallery description to visual align it in vertical axis with photo
* modified recently builded layout inside current gallery details on wide screens
  - moved into 940px treshold of media query from previously defined in 1180px
  - slighty decreased images top margin to 2em from previously 2.5em 
  - increased left padding  for a title element to 6.5em (previously it was 5em) 
* increased by 10% font size for paragraphs inside footer
* added extra bottom pading after a last paragraph inside footer

---------------------------

v0.4.16 - anims touched game-init-button; email address & its security; footer content reordered by little; greater buttons in game section

* v0.4.16 -- [2018-08-07]

[+] ADDED

-- index.php
* added few header with paragraph inside footer
  - added a fake email adres to be updated by JS
  - simple safety against web crawlers
* added a paragraph inside game area

-- witryna.js
* added a function 'OdkryjEmail' to build a real contact email in a place of faked one in static html page (php here)
  - it changes a text of existing email string and also modifies its 'href' parameter
  - the actual email address is concatenated from few fractions with use 'String.fromCharCode(64)' to encode '@' symbol
  - function can be run with parameters ('code is reusable, right?') but without them it should build working contacty email to the author, dedicated to this project
* added above function call to block of auto run code

-- zlobek-styl.css
* added a hover state for parent which is a whole container, but real change is padding inside 'h3' element in bottom line
  - looks like yellow rectangle pushes away text of blue left rectangle
  - defined a little delay, but even without it, a whole effect looks fine 

[*] MODIFIED

-- zlobek-styl.css
* increased horizontal padding inside class 'gra_odnosnik' for better organising the space inside parent container
  - changed differently in both 'h3' and 'h4' elements
* added margin from top to all buttons inside div container with id 'sterowanie'
* buttons in game section are greater from a while ago  

[-] REMOVED

-- witryna.js
* removed 'auxclick' and 'contextmenu' as a possible trigger of the event function on any gallery list element

---------------------------

v0.4.15 - easy differentiate gallery number in hover details

* v0.4.15 -- [2018-07-28]

[*] MODIFIED

-- zlobek-styl.css
* restored strong color to easy differentiate gallery number (left value) from subpage number (right value)
  - the same color as legend in central elemend whe whole belt
* just a cosmetic touches of comments & spaces

---------------------------

v0.4.14 - header area retested; styled button of game init; no-status-bar; drag & drop event redefinitions

* v0.4.14 -- [2018-07-28]

[+] ADDED

-- index.php
* added unified class 'gra_odnosnik' to all elements of semi-button-structure with id of 'zagraj', inside of page header

-- zlobek-styl.css
* added basic style for a standard elements
  - extends for elements: 'button', 'a', 'em' and 'form'
* created new styles fo the button-like element and its subelement
  - added many changes on hover state to animate changes by transitions
  - added yellow shadow and new color of the border
  - added lighter colors for backgrounds
  - added darker colors for texts
  - many tests with placements and better visual reception of the whole element
* modified a style by adding a max-height attribute to properly displaying of paragraph inside lower belt of the header
  - lets be scaled text size along with logo text scaling when screen size changes
  - possible little fluctuations inserted by media query to hold all the text content when font size is changing and also a width is different
* added fixed height for a parent of every gallery item title
  - uses an 'em' units so it can be scaled with changes of the font size of the title, which is placed inside
* polished also any of the inside items of any gallery list
  - added poining mouse cursor on 'a' elements to proper looks when its attrib 'href' was removed  

[*] MODIFIED

-- index.php
* modified text of the lower belt inside header
  - added non breaking spaces near the short words
* renamed and rebuilded class for original nursery URL ('odnośnik czerwony' to 'odnosnik_kolor')
  - slighty changed style and added transition animation on hover  
* used arrows-like shapes inside buttons of form for gallery selecting number
* added a paragraph styled with strikethrough
* changed some paragraph texts inside footer
  - also added a few sentences

-- zlobek-styl.css
* modified height of container with id 'banner' inside the header to 290px as the mobile basis (+10px)
  - and it's possible to grow to 330px after
  - but for wider screen than 470px its size is set to 190px (also +10px from previous defined)
  - but for the width treshold more than 940px element high is lowed to standard 170px 
* styled all subelements inside button-like-structure with id 'zagraj' in the header to arrange them
  - previously styled with silly idea 
  - rearanged styles for better look (mentioned also in added section)
  - changed many attributes, depending of the elements placing or its content
* added style to newly class 'gra_odnosnik' which is used inside by all text element of button-like-element
  - mainly positioning, size and margins
  - also well defined transition in one place for three elements
  - also added conditional style, depending from the parent elementent's class or id to distinguish lines of button-like-element
  - added new content based on pseudoelement
  - class 'gra_odnosnik' previously used name was 'zagraj_play'
* fixed arrangement of the items inside of selected gallery
  - on screens wider than 1180px the image is placed near the left upper corner and gallery title is slighty moved to the right
  - it helps to better experience of showing content especially when image is high and the text description is very short
  - there is no possibility that gallery title is on the image 
  - tested inside many mentioned situations and selected best values for shifting image or gallery title inside their parent container  

-- witryna.js
* commented changing of the opacity of dragged element inside event function 'PoczatekRuchuPrzeciagania' and 'PoczatekRuchuPrzeciaganiaJS'
* moved 'preventDefault()' call at the end of ovent functions 'RuchPrzeciaganiaJS' and 'RuchPrzeciagania' for 'dragover' event
  - changed opacity and border color for the event element
* added extra behavior on 'drop' inside function 'RuchUpuszczania' and 'RuchUpuszczaniaJS' for 'drop' event
  - trying to get coordinates and change position of the element using absolute positioning or relative from 'game' context
  - needed to rethink about distance from top left corner of the element ant the point where mouse cursor 'drags' that item  
  - for now achieved 'jumping placement' 
* trying to start touch event inside function 'PoczatekDotykuJS' where is added also another listener to the same element, the 'touchmove' event
* change parameters for fittext initialization for target element inside lower dark belt inside header 

[-] REMOVED

-- witryna.js
* there is no more showing of a status for readed gallery elements into violet rectangle, just before load-next-subpage button
  - updating of that summary text is also disabled
  - everything mentioned is inside comment for so

---------------------------

v0.4.13 - game content on demand; second Vanilla JS event system; restyled draggable elems

* v0.4.13 -- [2018-07-27]

[+] ADDED

-- witryna.js
* game content is presented after a pressing a button structure in header with id of 'zagraj'
  - aded an event serving function

[*] MODIFIED

-- zlobek-styl.css
* modified style for draggable elements 
  - added popular vendor prefixes
  - added auto dimensions
* added pointer cursor for the game content init button structure, with 'zagraj' id
* non-style-content inside style sheet wrapped with comment
* changed default border of the draggable images to dotted style
* removed showing of game contents on the highest treshold of media query
  - showing the board only on demand by pressing the button-like-element inside the page header 

-- witryna.js
* restored the right connections between events and their event calling functions
  - previously was switched event functions for 'drag' with 'drop' event function
* added returning false value to end of function 'RuchPrzeciagania'
  - also added this statement to the end of new function 'RuchPrzeciaganiaJS', which similary function but written in pure JavaScript
* changed appearance of dragged element inside function 'PoczatekRuchuPrzeciagania' for better distinguish dragging (for 'dragstart' event)
  - just added a little transparency by 10%
* added a second event system, handled by Vanilla JavaScript
  - added similar definitions inside a one declared function with subfunctions declarations
  - new function names similary to already defined jQuery functions
  - defined almost the same behavior with default JS DOM manipulation
  - the purpose is to check the right behavior and select better solution
  - trying to include touch events also

---------------------------

v0.4.12 - centered logo with **proportionally** resized fittext; header changes to fit a logo; first game board centered

* v0.4.12 -- [2018-07-26]

[+] ADDED

-- index.php
* added a structure like button for future stars of the game
  - placed element into header area as a div element with 'zagraj' id
* added a new header text inside 'game' area
* added an attribute 'droppable' with value of 'true' into a element with id 'plansza' for enabling drop functionality
  - also added an empty values to new event like attributes 'ondrop' and 'ondragover'

-- zlobek-styl.css
* added a silly styles for game-start-button
  - just for distinction of each planned elements
  - visible only on the widest screens (+1400px)
  - any screen shrinks below set media query tresholds hides this structure with id 'zagraj'
* added new styles for div with 'napisy' id inside a media query
  - changed position 
  - magic begins with new 'max-width' of 75%, which allows for center the childs elements text
  - increasing screen size allow the proportionall grow of the size of text for childs elements (fith fittext plugin)
  - the max size of a header and set values for text are limiting this groving

-- witryna.js
* added new functions 'OkreslPolozenieElementu' and 'kreslPolozenieElementuJS' to determine the absolute position of given element
  - function with postfix 'JS' returns selected size of an element and its position relative to the viewport

[*] MODIFIED

-- zlobek-styl.css
* set styles for logo elements for placing it in central of header element
* modified style of logo in almost each treshold of used media queries to ensure a nice look
* a header container is higher on basic mobile-first layout - 'banner' id 
  - to hold whole content with a moving sun animation without covering any texts of logo inside div element of id 'napisy'
  - modified to -100px lower version when width grows by media query (with 180px total width)
  - added +30px to element with id 'napisy' (for total high of 310px) when screen width reaches 320px  to better fit a growing text of logo
  - screens wider than 470px changes layout to horizontal from semi vertical 
  - tested width of available tresholds to hold all logo text in horizontal way
  - logo text resized properly with constrains of screen width between changes horizontal/vertical layout
* rearranged order of many attributes inside few CSS declarations

-- index.php
* changed indentations of elements inside their groups
  - removed unnecessary indentations for siblings
* tiny changes at text content of few headers

-- witryna.js
* tested fittetxt plugin with many changes values of used parameters to display logo text as big as possible on any screen sizes
  - logo texts displayed mostly on two lines (excluding narrow screens)
  - tests connected with fix from this update
* added an anonymous function when ocurs 'onload' event for loading content into a newly created image
  - defined all maths inside that event function
  - correctly readed image sizes when 'it loads'
  - function event uses all the same calculations as previously defined 
  - linked with second 'fixed' section of this update
* changed the all drag & drop event object delegation
  - before was defined a element with 'gra' id, now it's a 'body'
  - also changed a function for given event (switched 'RuchPrzeciagania' with 'RuchUpuszczania')   

[F] FIXED

-- zlobek-styl.css
* no more of logo text shrinking while screen width is decreased and left it in smalest size
  - fixed proportional sizing of the logo, based on actual width of the screen
  - added new width attribute of '100%' for parent container of any logo text's element
  - an absolute positioned parent needs a set specific width attribute  
  - fixes #6 - 'logo texts size decreases when page window shrinks but won't increase if window width grows'

-- witryna.js
* a bus picture is not centered inside area of a 'game' desk element
  - fixed unknown size of a not yet loaded image
  - added an anonymous function to serve 'load' event  
  - fixes #18 - 'a bus picture is not centered inside area of a 'game' desk element' from v0.4.11
  
---------------------------

v0.4.11 - origin of starting of game logic; picture loading in backgrounds; first puzzle quest elems

* v0.4.11 -- [2018-07-25]

[+] ADDED

-- 10 new files (in words: 'ten'), first starting with the name 'grafiki/gra/autobus/cz_01.png'
* one of an images for a game puzzle
  - one of the draggable element
* next one is 'cz_02.png' and the last one in series is 'cz_10.png'
  - every file is set with transparency

-- index.php
* added a one button with show prompt text

-- zlobek-styl.css
* added style for any draggable element ([draggable])
  - used high 'z-index' value
* defined a fixed style for any selected draggable element
  - uses an own class 'przenosny' mostly for img elements

-- witryna.js
* added a semi global list of variables for using a future funcionality of builded game
* changed logic of a start game
  - first is auto fired of function 'InicjujGre', which fires internally function 'LosujPlansze' to gain a level number/name
  - later is fired a function 'WybierzPlansze' which pick a level by given number or name and a level is built 
  - the assigned images are loaded into main game area and it's centered inside of that container in axis Y and X
 - image inserted as a background image 
* a defined function 'RozmiescCzesci' arranges the set of 'parts' insidea workable area
  - function 'InicjujGre' starts 'RozmiescCzesci' as a last with passed number/name of the level or needed parts list lenght
  - any element in a list is placed absolute on the next element in vertical axis with little horizontal shift
  - every two is shifted by several dozen px in right
* defined a set of functions to run as a event service in any event encounter
* later defined an event listener with assign of already defined functions as a respones on a given event
  - defined also event delagation, uses an event on a specified element (with class 'przeciagany') which is inside given container with id 'gra'
  - function 'PoczatekRuchuPrzeciagania' on a 'dragstart' event response
  - function 'RuchPrzeciagania' on a 'dragover' event response   
  - function 'RuchUpuszczania' on a 'drop' event response

 [*] MODIFIED

-- zlobek-styl.css
* resized containers inside game area 
  - mostly added 100px in any direction to most important containers
  - using fixed size of given containers & absolute positioning
  - if it's possible the elements uses a full width of container which is 1400px
  - mostly low values of 'z-index' is used, only for element 'div#rysunek' is needed a value higher than 1

---------------------------

v0.4.10 - indroduced game background; wide gradient under logo; CSS cleanings

* v0.4.10 -- [2018-07-24]

[+] ADDED

-- new folder 'grafiki/gra'
* as a container for any future puzzle game 

-- new folder 'grafiki/gra/autobus'
*  first prepared folder for internal use in game quest

-- new file 'grafiki/gra/autobus/autobus.png'
* a background file for game interaction
  - first puzzle quest
  - so far in PNG format, later maybe in SVG if capable 

-- zlobek-styl.css
* added gradient under the logo
  - defined inside media query
  - mix of two gradients with semi transparent colors in one background
  - used color from blue to the same color as the parent's element background color (light blue turning steel)
  - visible only on widest screens, with more than 1400px

-- witryna.js
* added scaffolding for future use of interactive game
* defined function 'InicjujGre' just to start the game
* defined function 'WybierzPlansze' to choose a starting level of game
  - for now always returns 'autobus' level with bus graphic
* all game logic not yet connected with page elements except inserting a background for a given element
  - autostart of 'InicjujGre' on each page refresh
  - so it looks like graphic file was loaded by a webpage itself, as a standard GET request... but it's not
  - for now the whole game elements are fully visible, there is no interaction

[*] MODIFIED

-- index.php
* little changes of indentations in header 

-- zlobek-styl.css
* redefined styles on widest screens of element 'div#naglowek_kontener' by media queries
  - bottom rounded corners changes
  - also redefined background as an semi transparent gradient image (mentioned in added section)

[F] FIXED

-- zlobek-styl.css
* removed duplicated selector for 'div#naglowek_kontener'
  - joined efficient rules into one selector
* fixed selector for applying defined rules for two elements with ids and one with subordinated class element
* fixed extra ';' inside gradient definition in rule for element 'div.dolna_zaslonka'

---------------------------

v0.4.9 - form in header gone, rebuilded header and changed when great screen; sliders of form polished;  

* v0.4.9 -- [2018-07-23]

[+] ADDED

-- zlobek-styl.css
* added first styles directly for main header element
  - previously used only as main level container
* added hover state styles with shadows to sliders of forms
  -  achieved effect like backlight bright
* added extra media query for the widest screens which are more than 1400px
  - redefines some rules for elements
  - for now used only to control 'div' element with 'banner' id (centers that element and adds border and rounds only bottom corners to it)

[*] MODIFIED

-- index.php
* removed container class element from header

-- zlobek-styl.css
*  added all rounded corners for main header's child elements (previously only selected top or bottom was round)
* 'div' element with id of 'naglowek_kontener' treaded as main logo box
  - added max-width for visible header
  - if screen size exceeds max-width of container then element gets white border and it's horizontal centered (modified by styles of media query)  
* added transition to all sliders attributes
  - with box-shadow in white color on hover state it's nice effect in almost every browser
  - added box-shadow attribute inside vendor specific selectors (if supports it; feature mentioned in added section)

[-] REMOVED

-- index.php
* finally the form has been removed from the page header
  - it is no longer necessary to enter the address of a particular gallery that had to be obtained when using the original nursery site
  - temporary inserted the whole form elements into one big comment

---------------------------

v0.4.8 - CSS fixes of sliders

* v0.4.8 -- [2018-07-22]

[*] MODIFIED

-- index.php
* temporary changed label texts of incrementation/decrementation buttons of form
  - always in purpose of selecting the better final variant (meaning and display)
* tiny changes at text of 'h3' header inside footer

-- zlobek-styl.css
* styles of slider for IE
  - changed color of slider track from orange to dark blue
  - a tiny grow of slider handles when active (focus state)  

[F] FIXED

-- zlobek-styl.css
* a better displaying of sliders inside a form in Firefox browser
  - no more white rectangles under the sliders
  - only in focus state a white border is present (only if previously was used keyboard)
  - added an indicator of possible mouse clicking (pointer icon)
* Chrome: fixed displaying own styles instead of that's builded into browser
  - as it's possible in older versions
  - slider flickering on hover state is impossibly to removed by growing overall size height or use negative margins for whole slider
  - focus/hover as simple notification with increased height of handle (possible removing it if it do too much to unstyle other elements in focus state)  
  - not relevant state of focus for very old browser version 

[-] REMOVED

-- index.php
* removed datalist element as a selected units of markers for both form sliders

---------------------------

v0.4.7 - prefixed sliders, gradient backgrounds of forms; game area scaffolding

* v0.4.7 -- [2018-07-21]

[+] ADDED

-- index.php
* from now all page header content is inside container class 
* added HTML structure for purpose of future game
  - just before footer

-- zlobek-styl.css
* new style for the sliders
  - removed horizontal paddings
  - added noticeable yellow circle style for handles
  - added styles with vendor prefixes, the order of declarations is important
  - Chrome reads prefixes for Firefox only  :( 
  - incorrect displaying in new Firefox browser - white rectangle under the narrow slider area
  - extra vendor style for IE browser for color of left and right side of the slider
* styled layout for group of elements of 'game' section
  - fixed arrangement of elements, regardless of the screen width
  - using float, fixed sizes and absolute positioning
  - using delimiter of width 1300px
* trying to show a whole container of 'game' section only on the widest screen
  - added default hiding of parent container
  - inserted on selected media query displaying of it
* changed background color of the list element in footer to lighter color

[*] MODIFIED

-- zlobek-styl.css
* a gradient background inside form selections
  - replaced semi-random colors to reflected radial gradients
  - mirror arrangement of colors between two form areas

---------------------------

v0.4.6 - no-main-div; container class everywhere; initial hidings & absolute relocations; new lists in footer; parent container for galleries lists; greater thumbnails; flex-buttons-group; 

* v0.4.6 -- [2018-07-19]

[+] ADDED

-- new file 'nie_ikona.png'
* a background file for list element in footer
  - with 'NO' meaning

-- new file 'tak2_ikona.png'
* a background file for list element in footer
  - with 'YES' meaning

-- new file 'tak_nie_ikona.png'
* a background file for list element in footer
  - with 'IDK' meaning

-- index.php
* added extra container for the gallery list elements and for a selected subpage of gallery list
  - a full width block container with the same background color as gallery list container
  - just a insertion of a stylized element between the existing layout
  - a block with a container class with maximum width is placed inside along with the entire structure of the gallery list as before
  - the same look is repeating for selected subpage for gallery list
* insertions of container class element inside where it's possible
  - inside all full width main items or deeper inside theirs structure 
  - also in footer area
* inserted structure which containing a list of the used technologies, as well as a summary of what IS NOT inside this project or what is done differently
  - small graphics are used as a bullet inside background

-- zlobek-styl.css
* created a common class with full width and dark background for any gallery list container 
* builded styles for new lists in footer structure
  - a horizontal list of used features
  - uses new pictures as background in three variants

[*] MODIFIED

-- index.php
* returned to the standard block element 'div' instead of 'main'
  - the element for displaying current gallery details sometimes "don't want to be" properly styled ;)
  - a compatibility problem with olders browsers and their builded treatment of 'main' tag

-- zlobek-styl.css
* significantly reduced a margin for a top level page container
  - not wastes area of small screens
* updated initial hidden status for any functional page element (e.g. status bar, navigation, buttons)
* changes inside media queries tresholds
  - a very slight alteration of margin sizes for top level container
  - always a fluid changes in percentages of width size
  - changed behaviour of flex-elements from displaying inline to be a box element in selected range of screen width (tested on button groups)
  - tested in many widths range to obtain an optimal layout (as many content on so little surface)
* altered all the styles for 'div' element instead of 'main' for identity 'glowna'
  - also rewrited the subelement selectors
* moved source container for read pictures away from viewable area of page
  - also with hidden state
* increased max height of an image into current gallery details to 130px from 116px
  - of course this not included scaled transformation by +10%

-- witryna.js
* slighty changes inside a function 'WczytajZewnetrznyHTMLdoTAGU'
  - removed initial showing of contents for gallery items container
  - no more reveal its content just before any action (success or fail) 
  - changed emptines of element with id 'nawigacja_galeria', now empty means also with one element with container class inside ;)
  - any buttons is placed inside this element with 'kontener' class not directly in parent element
  - added reveal animations when showing violet summary bar (just before big button load-next-subpage)
* changed target elements if using previously defined element as 'main' tag (when calling function 'PrzewinEkranDoElementu') 

---------------------------

v0.4.5 - mobile-first CSS; flexible elements of list gallery; parent container of that list with limited width on wider screens; computed subpage as fix

* v0.4.5 -- [2018-07-18]

[+] ADDED

-- index.php
* added a container class that surrounds the entire area of gallery list elements
  - a selected subpage of gallery list is unaltered for now to achieve a difference in view 

-- zlobek-styl.css
* a truly 'mobile-first' styles!
* rewritten all basic and default styles for all elements for mobile look
  - font size basis and box style layout for main elements (each on the top of other)
  - smaller size of element of gallery item list, with decreased margin or paddings with regarding the smaller font size (relative units)
  - the content of gallery element also decreased to view, i.g. reduced photo max size (dimmensions of the photos may vary between any galleries)
  - photo thumbnails might be scaled down in CSS to match them to its given max size
  - set initially width of button load-next-subpage
* rewritten media query logic for 'min-width' logic instead of 'max-width'
* added five media queries tresholds for distinguis elements look depending of the screen size
  - five steps like five gallery elements in a line of readed contents
  - experiments with the size of gallery list elements
  - also inner elements of gallery list are size altered while screen or browser window width changes
  - e.g. proportional shrinks or expands of image sizes or font sizes
  - a font size of page grows on each treshold (like proportional growth)
  - added distinct styles for elements if the specified screen width has been reached, into any given treshold
  - obtained responsive gallery items list mainly for redefined styles
* default hidings for all container with future contents (i.g. subpage navigations, status bars, current gallery thumbnails, ... ) 
* slighty alterations
  - increased vertical margins for main headers
  - decreased padding in footer area

[*] MODIFIED

-- witryna.js
* function 'GenerujPodstronyGalerii' always shows navigation container, regardless of whether it has any content (buttons)
* cosmetic code alterations
  - few variables renamed as camelCase style
  - added few explanatory comments
  - or just removed outdated comments

-- zlobek-styl.css
* replaced old media queries of 'max-width' style by newly defined ones (see added section of this update)

[-] REMOVED

-- zlobek-style.css
* moved old media queries into comments
* removed outside visible area the loaded source of the selected gallery

-- index.php
* removed a temporary pseudo link in footer without 'href' attrib

[F] FIXED

-- witryna.js
* corrected sequent subpage numerations
  - modified code of function 'GenerujPodstronyGalerii' not to use simple incremented counter
  - internaly that function uses function 'KtoraPodstronaWGalerii' to compute subpage number using given gallery number
  - fixes: #15 - 'Error displaying the next page number in sequential loading.'

---------------------------

v0.4.4 - href attrib gone, testing look & behavoir with data-href

* v0.4.4 -- [2018-07-13]

[+] ADDED

-- zlobek-styl.css
* added 'artificial' notyfication of working links on 'a' tag areas
  - simply a pointer icon (hand icon) on any encountered 'a' tag inside given container
  - 'a' tags without href attribute don't acts like active links by default

-- index.php
* placed a temporary pseudo link in footer with removed 'href' attrib just for a test purpose 

[*] MODIFIED

-- witryna.js
* removed href attribute for all gallery links
  - intended to block unatended clicks by second or middle mouse buttons
  - it could generate '404 page' for bad address on this server
  - it's almost impossible to block default bahavior of mouse in any web browser
  - sometimes it works in given web browser but depends also from it's version (sometimes older means better but there is no common point)
* instead a 'href' attribute for all 'a' involved tags added 'data-href' equivalent
  - elements from source container are read and few times altered, at the end they go into target container without 'href' attribute
  - used as 'href' in any 'internal' clicks 
* it's easier to remove a common attribute from 'anchor' tags than plays with advanced event systems
  - in many situations a click reponse is a inner browser thing, that user or frontend programmer can't control!
  - a paradox: it's simplier managing semi-anchor-tags by own events than operate on a already built ones!
* altered code to use 'data-href' instead default attrib
* for test purpose added extra click variants of any mouse button to select any element of gallery list
  - shows an alert message if pressing gallery item by right or middle mouse button

-- zlobek-styl.css
* hided source container of readed contents for gallery list subpages (element just before dark violet rectangle of status)
* hidden also source container of readed contents for selected gallery subpages (previously a gray rectangle with red border under the selecting form area)
* thats why added extra bottom margin for selecting form area for better view of  parent element with gray background

---------------------------

v0.4.3 - selected gallery subpages enchanced; cleaning inside a project files, obtained smaller project size 

* v0.4.3 -- [2018-07-10]

[+] ADDED

-- witryna.js
* added logic to output a fully functionally elements of any selected subpage of gallery list 
  - added needed code inside a function 'GenerujSpisWybranejGalerii'
  - the same look and behavior like elements of 'standard' galleries from sequential list
* added for test purposes a JS alert boxes when any gallery link is clicked by right or medium mouse button
 
[*] MODIFIED

-- index.php
* shortened header text for selected gallery list subpage

-- zlobek-styl.css
* a CSS cleaning
  - changed arrangement of the rules just for easy comprehension purposes
  - only a little alterations inside of rules values

-- witryna.js
* removed unecessary attribs from readed contents for headers
  - i.g. external site classes are unwanted
* changed class membership for short gallery titles inside all galleries elements (now class 'higher', before was class 'lower') 
* slighty changes in variables or attributes names

[-] REMOVED

--witryna.js
* JavaScript code cleaning
* removed a lot of unnecessary comments

---------------------------

v0.4.2 - improved gallery elements with animations at smaller size; unified colors & anim for load-next-subpage button; beautify code, texts & comments

* v0.4.2 -- [2018-07-07]

[+] ADDED

-- zlobek-styl.css
* added na semi transparent belt at the bottom of any gallery list element
  - to cover any longer text description
  - vertical semi-transparent gradient is used for graduadly hiding the edge of rectangle
  - a full color rectangle is used as a CSS polyfil for older browsers
* added styles for extra info structure of any gallery
  - different text colors used for different meaning
* expanded styles every gallery item on hover state
  - reveals extra info about each gallery
  - a motion animation based on transition
  - the scrolled element is placed off visible part of its parent element by default
  - nice final effect of bright title, photo and info on darker background on hover state
* unified colors and styles for load-next-gallery button
  - added transition for hover state with little latency time
  - added the extra text-shadow for text

-- witryna.js
* generates structure for all gallery items
  - a easy to recognise last loaded galleries and theirs gallery numbers and subpage belonging to that gallery list
  - works for now only for the sequentially browsed gallery list - by function 'GenerujSpisGalerii' 
  - function 'GenerujSpisWybranejGalerii' displays 'test contents' for any subpage of gallery list requested by a form
 
[*] MODIFIED

-- zlobek-styl.css
* decreased each gallery item list to exactly 500px (from 575px before)
  - also marked as relative element to its contents

-- witryna.js
* stopped displaying of a technical info at the beginning of gallery description of any gallery
* more complex structure returned by function 'GenerujSpisGalerii' for  each element of gallery
* code cleanings for better syntax or overall quality: 
* changed semi-global-variables declarations inside an one group to use just only one 'var' keyword 
* improved the quality of the texts in the messages inside variables
* eventual variable names with an underscore replaced by a version in camelCase notation
* replaced eventual typos or no spaces to a their properly edited versions
* **alloweed names for notCamelCase variables only for semi global variables and for variables with identical names as element's ids** 

---------------------------

* v0.4.1 - selected subpage of gallery list with CSS & full working logic; proper counting clicks/subpages and displaying full list of galleries; current gallery texts; extended event delegation

* v0.4.1 -- [2018-07-05]

[+] ADDED

-- index.php
* created empty elements set without any content and attributes
  - just a skeleton for later insertions anything inside them by JavaScript

-- zlobek-styl.css
* no added style but all in the selected subpage of gallery items element are styled the same as page of content items
  - a JS adds an already defined common classes
* added a style for active displayed gallery subpage number in yellow color
  - displayed the same as the marked selected subpage number from the all gallery list inside the text of its header

-- witryna.js
* Javascript builds any selected subpage of gallery list
  - uses an already defined class to create the same looking elements
* added new elements of selected subpage to event listeners for click event
  - no logic distinguishion between 'standard' gallery elements readed in groups of five
  - extended the jQuery selector to sum of this two groups  

[*] MODIFIED

-- index.php
* renamed few main project containers ids

-- zlobek-styl.css
* the same rules for renamed ids of main containers == selectors

-- witryna.js
* stopped displaying of technical info at the beginning of gallery description of any gallery
  - works only for any subpage of gallery list requested by a form
* removed counting of clicks on next-gallery-load button from  function 'GenerujSpisGalerii' which role is to display
  - moved counter into event serving function of a click
  - only at first function call is used auto increment of this counter
  - see related element of 'fixed' section this update
* rethought of counting of already loaded subpages
  - display function builds new content so it's right place
  - incrementation only after susscessful reads
* conditionally hiding of notyfication element for loading next subpage of gallery list inside function 'GenerujSpisGalerii'
  - can't be visible when reached last subpage
* slighty change in name of ids for selected subpage of gallery list
  - just to distinction by JS not CSS
* use of passed value of parameter inside function 'GenerujSpisWybranejGalerii' to remove source content which is unnecessary now  
* modified order of generated contents inside function 'UzupełnijNaglowekBiezacejGalerii'
  - text of header is placed first to prevent from disruptions of floated 'img' element on narrow screen
* increased by one a range for counting of clicks of button inside conditional logic of click callback function
  - proper displaying of the last page of gallery lists by sequential demands
* extended set of elements on which clicks event listen
  - mentiones also at 'added' section
  - working set containing sequentaially loaded items and items loaded from specified subpage, provided by form
  - just added second container to jQuery selector
  - delegated event handlers still in use and works unchanged
* 'span' tag surrounds the current gallery subpage number which is inside generated subtitle, just before thumbnails list
  - better visual wyróżnienie of current subpage
  - uses defined CSS style

[F] FIXED

-- witryna.js
* fixed displaying of the second subpage of gallery list
  - removed extra incrementation from code logic 
  - autoload works for first subpage then button loads next subpages on demand, starting from second subpage not third
  - everything is displayed now in sequentially loaded subpages
  - closes: #13 - 'Problem displaying the second subpage of the gallery list' - from v0.4

---------------------------

v0.4 - selected subpage & her content, used logic of refactored function

* v0.4 -- [2018-07-04]

[+] ADDED

-- index.php
* a notifier element of loading content for selected subpage from gallery list

-- zlobek-styl.css
* styles for a place with selected gallery subpages are copied from 'standard' table of contents
* a notyfication elements are styled the same
  - css selectors mentioned three times for three elements of notifycations
  - each element must be targeted individually by id so it can't be used class selector 
 
-- witryna.js
* added new function 'GenerujSpisWybranejGalerii' with purpose outputing content based given parameter
  - function require three parameters, first is a source container to reads from, the second one is target container, and the extra third parameter is a offset differentiator from source container
  - function reads all the needed text contents, build new elements structure and inserts it into a target element
  - for now just simple form of display of target container but all the titles and images are in place
  - for test purpose a source container is temporary visible by CSS and it's placed into usable area near the real output
  - needs a previous call of function 'NaprawBrakujaceSRCwKontenerze' which sets all the src attribs to absolute from the nursery server
  - logic taken from previously defined function 'GenerujSpisGalerii' with a lot of changes and improvements
* all te sliders ale placed in the half ot their range

[*] MODIFIED

-- zlobek-styl.css
* used new elements as a selectors for already defined styles

-- witryna.js
* added extra info about semi-global variables into theirs comments
* corrected few defined animations with 'animate' functions
  - proper scrolling by adding 'px' unit

---------------------------

v0.3.12 - contents appears firstly later navigation shows up; elements hided by default; logic & view of subpage list selection, rolled forms; improvements security and code reuse;

* v0.3.12 -- [2018-07-03]

[+] ADDED

-- index.php
* prepared place for content selected by form of any gallery subpage choose
  - below full list of table of contents
  - HTML structure ready for future use

-- zlobek-styl.css
* added style for moving and rotation the element with yellow text fragment
  - on/off element state depending of the parent's class memebership
  - also hover state with transition and horizontal shift
* taking care of details: bottom rounded corners of the top belt dissapears when the whole structure is opened
  - rounding showes at the bottom of top level container when it's open
  - but when it's closed then top belt is rounded in every corner

-- witryna.js
* at previously update added displaying the date of publishing given gallery inside it's detailed header, belowe the selected title 
* added logic to use the form of selecting any subpage from gallery list
  - similar behavior as used before in selecting any gallery number
  - the same increments, decrements and picking random number but inside another range
  - logic disallow for transgression of given range, buttons just can't change value above or below range
  - entered value is always converted to a number from given range!
  - changes at slider coresponds with changes to a numeric field and vice versa
* builded logic to serves to showing and hiding of form fields with selections
  - rolled (hiding state) or fully showed with use of animations
  - simply adds or removes a class
  - a CSS reference to animations and transitions on neighboring containers 
* shows that form in closed variant when first Ajax request is succeed
  - parent container is exposed
* extra semi-global variable needed for selected gallery list subpage number 
* added connected function 'InicjujPrzyciskiWyboruPodstronyGalerii' for initial setting of value inside slider and related numeric form field
  - value between 1 to 5 is returned (as selected into slider/field)
* added logic to rounded corners of top belt or the whole container of the selecting gallery number or any subpages list

[*] MODIFIED

-- index.php
* changed yellow text fragment from top belt of selecting any gallery or gallery subpage by given number
* also changed symbols of buttons inside that form
  - only one button group changed
  - arrows instead incrementation/decrementation
  - test purpose for better user experience (which version is better?)

-- zlobek-styl.css
* added styles to default hiding of the whole structure of selecting any gallery before any contents is loaded from nursery server
* hides also the button of next-galleries-subpage
* the selecting structure is closed by default
  - to open it just click on the top belt
  - this belt shows or hides (on/off state) of the form contents
* changed a one transition on hover state on any thumbnail
  - gradual appearance and 'darkening' of the shadow while it grows with image
  - opposite to instantly dark shadow under the picture as was before

-- witryna.js
* changed more intuitive names for switch based operations inside function 'WczytajZewnetrznyHTMLdoTAGU'
 - use new values as a function parameters when calling that function
* more secured code when comparings with 0 value
* added second parameter to function 'NormalizujZakresPolaInput' to achieve controlling another section with slider and max value
  - second param is just a differentiator, which determines first or second slider area
  - general purpose function should target form element by it's id/class name as a passed extra parameter

---------------------------

v0.3.11 - subpage selection structure, slideshow translation, gallery subpage notifier, redefined function logic & parameters, displayed gallery list text

* v0.3.11 -- [2018-07-02]

[+] ADDED

-- index.php
* created second structure to select, a subpage of any gallery list
  - placed beneath gallery number selection
* added global configuration for slideshow of any gallery inside jQuery addon
  - inside script tag passed translated text for displaying sequence of photos (like 'photo X from total Y photos') 

-- zlobek-styl.css
* flexbox used for group of newly added selection of any subpage from gallery list
  - as in previous container (any gallery number)  
  - also with noticeable background colors 

-- witryna.js
* selected subpage of current gallery is *properly* mentioned in header (before the thumbnails)
  - works fine even on change any subpage from that gallery

[*] MODIFIED

-- index.php
* renamed elements ids 

-- zlobek-styl.css
* changed background color of gallery item list on hover state to noticeable violet instead slighty blue
* the same solor used in hover state of the top bar of selector container any gallery number

-- witryna.js
* modified default value of parameter if not exists inside function 'WczytajZewnetrznyHTMLdoTAGU'
  - a beginning space character provided as separator or builded object with default values of attributes
* removed conflict in names of varaibles from parameters passed to previous function
* modified parameters used by function 'UzupełnijNaglowekBiezacejGalerii'
  - instead of list with each attribut name this function expects an one object data with all needed attributes
  - an object with all attribs and their values might by passed in function call
* removed page scrolling when first Ajax request for provided gallery number
  - page is scrolled to element with data returned from second Ajax request
* added parameters validator inside function 'GenerujPodstronyGalerii'
  - just a simple test for range or value type
  - defaults provided
* just after click on any new gallery title or photo, any previous thumbnails from gallery details are removed immediately
  - shows loading notification inside that area until new thumbnails show up
* better formatting text descriptions of any gallery
  - may contain html characters inside, not just the whole decription as a one 'p' tag without any formatting fractions (e.g. 'br' tags, 'strong', 'em', 'span', ...)

---------------------------

v0.3.10 - first refactoring, lots changes in logic but only a few differences visible

* v0.3.10 -- [2018-07-01]

[+] ADDED

-- index.php
* added extra parent container on element where are inserted table of contents 

-- zlobek-styl.css
* extra styles for hiding too much content for newly added page element

-- witryna.js
* finally when selected gallery number is submitted by form then displays it's details 
  - it temporary displays subpage from original server where that galery belongs (diagnostics purpose only) but when finish Ajax call that visible subpage is removed
  - if there was previously visible gallery details then they are gray filtered until selected gallery finish it's loading (with second attempt)
  - when first Ajax call is done and successful then displays selected gallery details (title, photo and description which could be previously marked as gray) 
  - removes Ajax loading notification and a gray filter only when second Ajax call is complete (yes, possible error)  
* added on page displaying info about selected gallery when using selections by form
  - added details about selected gallery: selected number, subpage number, offset on subpage, computed max subpage
* added function 'KtoraPozycjaWGalerii' which converts passed gallery number into position on it's subpage
  - returning number is from 0 to 4 as an element offset
* added function 'MaksymalnaIloscPodstronGalerii' which computes total number of subpages based on higher (or last) gallery number
* added function 'KtoraPodstronaWGalerii' to compute gallery list subpage which given gallery belongs 
  - it's always dynamic, may change on every or maximum to every fifth newly added gallery
  - the used formula may be bad, sometimes is misleading depending on subgallery or the offset
  - it uses internally other newly added functions
* added function 'UsunBrakujaceSRCwIMGPozaPrzekazanym' which removes 'src' attribs from specified container for all contains image elements but leaves specified one by parameter 
  - uses two params, first for container second is the offset
* selected subpage of current gallery is mentioned in header   
* added comments for function endings for functions declarations which are longer than few lines or few screens

[*] MODIFIED

-- index.php
* inserted necessary indetations between subelements in HTML code

-- zlobek-styl.css
* increased spaces between subpage navigation buttons (inside current gallery)
* changed border color to more bluish when hover on any item on gallery list

-- witryna.js
* modified function 'OdczytajTresciOdnosnikaWybranejGalerii'
  - now reads from parameter for exactly provided element and search specific subelement number
  - returns readed values as an object which contains needed attributes and theirs values
* modified function 'NaprawBrakujaceSRCwKontenerze' which restores 'src' attrib to absolute path to nursery server 
  - first param as HTML container indicator to search in
  - second param specifies the img set (always are two possibilites but the first is a default action)
  - if second param is set then function do not-default-action
* modified function 'UsunBrakujaceSRCwKontenerze' which removes src attribs for all element in specified container
  - the same idea as in previously mentioned and changed functions  
  - first param as HTML container indicator to search in
  - second param is indicator of container type, better describes target img
* changed behaviour of function 'GenerujPodstronyGalerii'
  - added default action if provided no parameters
  - default is to show first page of gallery list (recently added elemenents)
* renamed function 'UzupełnijBiezacaGalerie' to 'UzupełnijNaglowekBiezacejGalerii'
* changed logic of event controlled by form: stopped default actions on form submit and logic uses recently added functions
  - finally it works with recursion in function 'WczytajZewnetrznyHTMLdoTAGU'
  - extra data passed into first call that function 
* improved indentations and better comments
* changed method of countings clicks on button next-subpage-loader
  - auto load of first page should also be counted!

---------------------------

v0.3.9 - two files, for new ideas and for deprecated working

* v0.3.9 -- [2018-06-27]

[+] ADDED

-- new file '_do_wprowadzenia.js'
* for purpose gathering all future JavaScript code to insert on project
  - code is not yet used in project or maybe it's not completed
  - a collection useful functions on future use, but not needed now when is a lack of structure/logic/ ... in the project 
  - generally helper functions should be designed here separately
  - new ideas or just the seeds of ideas
* list might contains not fully working code
* the inside code is not linked yet with the project or any it's file

 -- new file '_juz_wyrzucone.js'
* just a vessel for not used code
  - empty for now
* should contains alredy removed JavaScript code from the project
  - a delayed complete removal of functions
  - a waiting room before dissapear or changed return to project
  - little chance to again use of any code fragment
  - using a SVN is better but just a relic
* not directly linked from any project file
  - just a separated container (trash bin to fill or sth similar)

---------------------------

v0.3.8 - functional container class, automated gallery display, greater buttons, (no more address form) and more

* v0.3.8 -- [2018-06-26]

[+] ADDED

-- index.php
* added all purpose 'container' class (exactly "kontener") at top level  containers of page

-- zlobek-styl.css
* this container class from now has a max-width in pixels
  - useful for grouping purposes and aligning items horizontally (and also somehow vertically)
*  prepared 'szara_zawartosc' class intented for notifyining temporary disabled blocks and it's contents
  - semi transparent gray filter

-- witryna.js
* added function 'UzupełnijBiezacaGalerie' for automated insertions of contents for actual gallery based on provided parameters
  - used in any click event service and repetitive showing operations 
  - any needed parameters readed from click event object
  - also takes care of rebuilding image for current gallery
  - a detailed html structure is an output
* few semi-global variables added for each needed attribute/element

[*] MODIFIED

-- index.php
* changed container structure inside flexbox controlled layout (selecting any gallery number)
  - to achieve layout where label and gallery number input field are rather on the top of the slider (mostly on any screen width)
  - and also display wide slider as possible on any screen width

-- zlobek-styl.css
* changed basis and grow of flex-elements (containers for form elements)
* slight widening of buttons inside area of selecting any gallery
* previous style also included in subpage navigation buttons inside current gallery

-- witryna.js
* inserts input-buttons (type=button) instead real buttons elements (just for existing styling purposes)
* changed operations on gallery readings to collect needed attributes to build a current gallery header (fires 'UzupełnijBiezacaGalerie' function)
* displaying gallery details provided by form marked for deprecation in project
  - by comment for now only

---------------------------

v0.3.7 - click-counter of next-page-load, flexbox container & easy pick, two times scrolling, scaled-thumbnail-hover, gallery main photo

* v0.3.7 -- [2018-06-25]

[+] ADDED

-- index.php
* temporary added few slider's markers to indicate a used range (only a few beginning static values!)
  - a HTML standard doesn't work properly in all tested browsers

-- witryna.js
* added a semi-global variable as click counter on next-subpage-loader button
  - as a delimiter of max request number (ajax call) for existing galleries list subpages
  - used mainly inside click event service 
  - won't allow any next Ajax request if the limit is exceed
* a page is scrolled to gallery details first time directly when gallery item list is clicked and the second time immediately when new content is loaded
  - scrolling to element is a callback function for first time showing container
* page tries to scroll only for far view from newly added content, not to change of vertical view when unnecessary

[*] MODIFIED

-- index.php
* changed proper indentations of all page nested elements
* used <main> tag instead standard div element for grouping main content (gallery details) 

-- zlobek-styl.css
* introduced flexbox to control layout inside container of selecting any gallery number
  - added noticeable background colors for flex-elements (inside flex-container) for test purpose
* increased size of the selection elements of that form
  - easier to use by mobile users
  - also increased font size and padding for form elements
  - distinguished submit button by bold font 
* softly modified appearance of gallery list items 
  - slighty decreased font size for longer titles 
  - added darker border on hover state
* added an extra scale transformation (+10% element size) to any thumbnail of displayed gallery when hover
  - effect with conjunction of transition animation
  - previously only shadow as a distinguisher
* sets main photo of selected gallery from the left of gallery details (with floats)

-- witryna.js
* a gallery main photo is inserted into actual gallery details
* modified scrolling as mentioned in ADDED section

---------------------------

v0.3.6 - moving screen and verifying entered numeric value

* v0.3.6 -- [2018-06-22]

[+] ADDED

-- witryna.js
* uses function 'PrzewinEkranDoElementu' in new places as a notify of placing new contents (new subpages list or new gallery or it's subpage) after each success ajax call
  - not only to notify any error as previously using
  - it moves view to page element with new content
* added function 'NormalizujZakresPolaInput' as a getter and veryfication value of numeric field of selected gallery
  - sets min or max value if entered value isn't in range (depend it's lower or higher than the range)
  - field also sets slider value (previously value came from the slider or buttons +1/-1)
  - two ways of setting selected gallery number from now: by numeric field or slider
  - used in blur event and form submiting

[*] MODIFIED

-- index.php
* changed indentations of all page elements, the most in footer area

-- witryna.js
* changed function name 'PrzewinDoElementu' to 'PrzewinEkranDoElementu'
  - renamed also all used executions
  - used also in new places as a notify of placing new contents (new subpages list or new gallery or it's subpage)
* little amendments of code style

---------------------------

updated to v0.3.5 - first ajax call, counting logic, error ajax notif., scroll animation f.

* v0.3.5 -- [2018-06-21]

[+] ADDED

-- zlobek-styl.css
* added simple look to error notification 

-- witryna.js
* added helper function 'PrzewinDoElementu' for page scrolling animation to any given element
  - works only for visible elements
  - with parameter for duratrion of animation
* added logic do display any errors of Ajax call if any encountered
  - code inside function 'WczytajZewnetrznyHTMLdoTAGU' in each switch statement variant
  - provided with and error code and detailed status
  - uses page scrolling animation function

[*] MODIFIED

-- witryna.js
* changed the behavior of first ajax call for newest galleries list (first page of a nursery server page)
  - sets semi-global variables
  - it initialized the form for chosing any gallery number
* changed counting of the already loaded gallery list subpages and actual position in that list
  - differentelly counted while gets success or failure of ajax response
* cleanup: unified indentaions in many code blocks inside nested conditions
* added few console messages for diagnostics

---------------------------

updated to v0.3.4 - a simple typo inside meta tag

* v0.3.4 -- [2018-03-28]

[F] FIXED

-- witryna.js
* a simple typo inside meta tag in head section
  - 'name' not 'neme'!
  - fixes: #7 - issue: 'responsive layout don't works on smarthones'

---------------------------

updated to v0.3.3 - gallery selection by number with JS logic

* v0.3.3 -- [2018-03-28]

[+] ADDED

-- witryna.js
* added function 'CzyscNiepotrzebneElementy()' to remove unnecesary elemenents from received data from interceptor file
  - used in each of string data returned by ajax query
  - for cleaning of unsued images (e.g. image path removed inside 'src' attribute)
  - gained no notifications about non-downloaded files (also unavailable ones) and reduced data transfer
  - list of unused images internally provided
* added few semi-global variables to memorize values provided by choice form of any gallery number, and a title with a description for a current gallery

[*] MODIFIED

-- witryna.js
* added secured versions for readed contents from page contents to convert into numerical values if that values should be numerical
  - values are enforced to be numerical in many encountered instances, before they are saved in a variables 
  - changed conversion methods depending from the context
* changed method of counting encountered subpages of galleries list with skipping first and last elements
* added handling code for the slider, three buttons and a numeric field of a form
  - default and max values provided by readed contents 
  - any slider moves or clicks on buttons will modyfy value inside numeric field
  - a good control logic when using only buttons or slider
  - submit button uses logic of 'advanced mathematics' to determine gallery URL by provided gallry number ;)
* modified parameters of function 'WczytajZewnetrznyHTMLdoTAGU'
  - added extra differentaitor for provide additional data (object)
  - added try..catch block for each variant of switched work with load() function inside try block
  - also added extra info about success/failure of Ajax call inside catch block 
* added extra switch variant of 'WczytajZewnetrznyHTMLdoTAGU' to load selected gallery by chosen number ('spis_galerii_rekurencja')
  - necessary to another recursive call 'WczytajZewnetrznyHTMLdoTAGU' inside that function
  - uses data from mentioned earlier object
  - added also another extra switch variant ('spis_galerii_wybor')
  - no control logic added, it's just a scaffolding for any future code addisions
  - added default switch action just for error notification

* IMPORTANTS for 'WczytajZewnetrznyHTMLdoTAGU':
  - needed to determine a fully specified address of a gallery from server, there is no way to display any gallery only by it's number!
  - every gallery address is written as a connection of gallery number and a gallery title, writen as a proper URL form
  - the only way to obtain gallery address is to determine the subpage number where that gallery belong
  - also a position inside of any subpage is needed (asequence: first or second (if available) ... or fifth (if available))
  - the last subpage with gallery list may contains form one to five elements!

* added helper function 'OdczytajTrescOdnosnikaWybranejGalerii' for reading URL of provided element by it's number (sequence from 1 to 5 on that subpage)
  - it's also modifies of current gallery title and description
  - a photo connected with a selected gallery number (determined by subpage and sequence) is added for current gallery section

---------------------------

updated to v0.3.2 - viewport, box-sizing, container, choiced form

* v0.3.2 -- [2018-03-09]

[+] ADDED

-- new file 'zlobek-styl.css'
* renamed from 'styl.css'
* added 'box-sizing: border-box' for all page elements
* added 'kontener' class for limit elements max-width
* inserted styles for new html structures (choice form)

-- index.php
* added 'viewport' meta tag
  - enables proper tests on mobile devices (after publishing the site on external server)

* added structure for selecting any gallery by any given number from a range
  - added numeric form field and a slider for that purpose
  - added randomize button
  - added button for confirm selected number

[*] MODIFIED

-- index.php
* moved external scripts from head section to the closing body tag, including 'jquery.fittext.js', 'witryna.js' and 'lightbox.js' but without 'jquery' file
* renamed few containers from div tags to html semantic elements (header, nav, i.e.)
* renamed few headers text

-- zlobek-styl.css
* temporary showed again diagnostics for encountered elements of gallery table of contents and actual subpage
 
---------------------------

updated to v0.3.1 - interceptor file rebuilded

* v0.3.1 -- [2018-03-07]

[*] MODIFIED

-- przechwytywacz.php
* changed returned string from interceptor file
  - now returns directly only an element contains table of contents (single subpage from all subpages) or expected gallery details (any gallery subpage)
  - string '<table width="700" class="galeria">...</table>' is returned as a success of ajax call
* +++ about 40% to 60% bytes less in returned contents in any success call, depending of contents +++
  - average between 6kB to 10kB instead of 14k to 20k bytes returned by previous version of interceptor
  - so about ~50% overhead removed
* added logic to any remote readed contents
  - if problem occurs then site returns string contains fully readed HTML page (any subpage)
  - not guarantined receving a page data in successful ajax call, that contains expected data
  - if returned page not contained expected data in any form the returned is a specified string as a notifier

---------------------------

updated to v0.2.7 - rebuild of header, site title distinguishion, fittext 

* v0.2.7 -- [2018-03-03]

[+] ADDED

-- new folder 'fittext'

-- new file 'fittext/jquery.fittext.js'
* enables text scaling depending on parent element size
  - screen size as a delimiter
  - to reducing the size of a text trather than an enlarge 
* added styles for new structure of header with logo

[*] MODIFIED

-- index.php
* rebuilded structure of page header

-- styl.css
* increased site name's distinctiveness (logo text)
  - significantly font text increased

-- witryna.js
* added ability reduce of text of logo and under the logo
  - configured size of the logo texts for 'fittext' addon
* added logic in ajax handler depending of success or failure (WczytajZewnetrznyHTMLdoTAGU)
- differentiator inside each switch statement
- errors logged into console if encounters any are described with detailed status

[!] BUG
-- index.php
* logo texts size is decreasing when page shrinks but remains the same and not grows when page width increases

---------------------------

updated to v0.2.6 - color unifies, removed displayed diagnostics & fixes for form use 

* v0.2.6 -- [2017-12-07]

[*] MODIFIED

-- index.php
* changed few texts inside header and footer

-- styl.css
* unified background colors of a header's elements
* background colors for main areas also unified
  - changes near button next-page-loader
* changed colors of a few headers
  - slighty modified hover state or depending from theirs placing
* expanded the size of buttons in header and footer

-- witryna.js
* loaded contents treated as html fragments not like regular text
  - better works with further styling
  - for some elements it's safer when their content is a text 

[F] FIXED

-- styl.css
* proper displaying of loaded contents in gallery table of contents
  - no more unintentional shift of content from the left (padding or margin)

-- witryna.js
* fixed loading contents for a gallery by form field
  - derived from v0.1.1a
  - moved logic inside a callback function
  - proper handling of form data like a regular click from gallery lists
  - handled equally within the same callback function for the form button click or gallery item click 

[-] REMOVED 

-- index.php
* removed text header just before place where gallery details will be displayed as a first time

-- styl.css
* visually removed containers for displaying diagnostics for encountered elements of gallery table of contents and actual subpage
* also removed yellow belt containing counter of encountered subpages of currently displayed gallery

---------------------------

updated to v0.2.5 - external JavaScript, page header, new pics, animating logo

* v0.2.5 -- [2017-11-20]

[+] ADDED

-- witryna.js
* finally moved JavaScript logic to this file!!!
* added logic for animating logo picture when hover

-- slonce.png
* new file for page header as main graphic theme and logo
  - treated as a background image

-- slonce_60x60.png
* new file as a notification graphic

-- styl.css
* added inside margin for entire page
* added styles for the new header section and its inside elements
* intended rotating of logo when hover state on its parent
  - works with conjunction of JS
  - dynamically added or removed classes
  - also with transitions (translations and rotations)
* each element inside of gallery table of contents now has max height as delimiter for its internal content
  - setled height for title, main picture or visible text for any gallery item
  - these dimensions are changed in media queries (dimmensions increase in proportion to the width of the screen)
  - only works for really narrow screens

[*] MODIFIED

-- index.php
* removed Javascript to external file 'witryna.js'
  - placed into header of file from body element
* created real page header section with page title, descriptive text and site logo
* cleaned up HTML structure 
  - proper use of indentations
   
-- styl.css
* added 50% greater picture of sun for all loading notifications
  - file 'slonce_60x60.png'
  - better visual reception in rotating animation inside notifications
* changed rotating animation to more long and more smooth version 
* added greater shadow after hover on any gallery item thumbnail 

[-] REMOVED 

-- slonce_40x40.png
* unnecessary if there is a more detailed version

-- index.php
* removed unnecessary comments and empty spaces

---------------------------

updated to v0.2.4 - modified counting of loaded galleries

* v0.2.4 -- [2017-11-05]

[*] MODIFIED

-- index.php
* changed counting method of already displayed galleries
  - based on loaded gallery subpages (portions of tables of contents) 
* changed condition of calculate gallery title size
* exchanged with each other places of notifications for loading a given gallery with their place of title and description
  - notification is placed after gallery title but before thumbnail list

---------------------------

updated project state to v0.2.3 - text overflow

* v0.2.3 -- [2017-11-03]

[*] MODIFIED

-- styl.css
* description text of any gallery always fits into the element of the given gallery list
  - nothing goes outside the container
  - any excess text outside the available space is cropped (or hidden)
  
---------------------------

updated project state to v0.2.2

* v0.2.2 -- [2017-10-15]

[+] ADDED

-- new graphic file 'grafiki/slonce_ikona.png'
* added as site icon for browser window

-- style.css
* styled each element of table of contents as the same height
* styled button next-page-loader
  - added noticeable hover state

-- index.php
* set site icon
* introduced title styling depending of title number of characters (string length)
  - font size reducing for longer title
* each gallery chosen to show now is displayed with their title and description
  - title and decription text above the photos
* after click on element of table of contents, the view in page window is scrolled to the element which contains details of current gallery 
* displaying dimmension of each of table of contents element inside that element
  - for diagnostics only
  - short abbreviated text preceding a proper description

[*] MODIFIED

-- index.php
* temporary notification placed beneath next-pages button
  
[-] REMOVED 

-- index.php
* temporary alerts from clicking gallery elements 

[!] BUG

-- index.php
* using the form field may not display any gallery details
  - no scrolling effect also

---------------------------

updated project state to v0.2.1

* v0.2.1 -- [2017-10-12]

[+] ADDED

-- new folder 'grafiki'

-- new graphic file 'grafiki/slonce_40x40.png'

-- style.css
* added styles for auto loaded contens and every later loaded table of contents
  - height of the element depends of its content (image height and amount of desctriptive text)
  - may occur different layout look depending from the loaded content
  - also added hover state for every contents item 
* added CSS animation for every loading notifications
  - based on rotating of an image

-- index.php
* added proper showing of table of contents 
  - presents title, main photo, description and publish date for every gallery titles
  - loaded items floats on the page side by side 
* navigation based on loaded table of contents
  - every click on gallery title or photo element triggers displaying related gallery
  - added temporary notification (JS alert)
* added visual notification while loading contens
  - works for any galery subpage also (while loading starts)
* added big button for loading next elements from table of content
  - when triggered each time notification of loading contents is displayed before showing this contents
* temporary added summary of quantity of subpages table of content under the big button
* also temporary added diagnostics displayed next to element (right side)
  - displays: quantity of all galleries, counted subpages and actual position in subpages

[*] MODIFIED

-- index.php
* renamed global variables (shorted versions)
* slight modified parameters of function 'WczytajZewnetrznyHTMLdoTAGU'
  - function 'WczytajZewnetrznyHTMLdoTAGU' works like switch based on the last parameter as differentiator
  - function builded as a big swich statement

[F] FIXED

-- index.php
* displaying any gallery by form filled is also possible like it was before 
  - but it's also uncomfortable

---------------------------

updated project state to v0.1.3

* v0.1.3 -- [2017-10-08]

[*] MODIFIED 
-- index.php
* restored auto loading a table of contents
* renamed few project global variables in php by prefixing them with 'g_'
* a good starting point for next changes

---------------------------

# v0.1.2 - updated project state

# v0.1.2 -- [2017-10-07]

## MODIFIED [*]
### index.php
* small changes in container ids
  - modified contents of selected buttons and text sections
* testing behavior for successful and unsuccessful communication with nursery server

## REMOVED [-]
### index.php

* **temporary disabled** auto loading a table of contents

---------------------------

# v0.1.1a - updated project state

# v0.1.1a -- [2017-10-05]

## ADDED
### index.php
* trying to automatic display a table of contents (first page)
  - auto start after each page opening or refreshing
  - opens home page last gallery list from nursery server (first page of table of gallery contents)
  - generated links for viewing only (misleading targets)
  - no visual notifications while fetching content from server like in gallery subpage while loading current gallery
* you can browse now between subgalleries
  - buttons now have working actions
  - only if there any subgalleries exists
  - *button or buttons as a link to any other than actual displayed subgallery* (modified)

## MODIFIED
### index.php
#### BUG! 
* cannot view any galleries
   - the target area for uploaded images does not appear
   - thumbnail images are not displayed
   - only descriptions of photos without proper photos visible in the yellow test field
   - reference error in console: "TypeError: nr_galerii is undefined" 

#### FIXED! the above bug (cannot view any galleries)
  * specified right source container to search in

---------------------------

# v0.1b - added project files

# v0.1b - [2017-09-25]

## ADDED

* PHP: 
  - main index.php file
  - interceptor file (przechwytywacz.php)
* CSS:
  - added css reset file
  - many CSS rules in file
  - added styles with gradients or single color background (polyfills)
  - added simple media queries
* JS:
  - added jQuery lib v3.2.1
  - added 'lightbox', a jQuery plugin with all needed resources
* OTHERS:
  - added log file ('_changelog.md' - this file)

Available funcionalities:
* displaying a first page of any gallery provided by form
  - displays subpage referers for current gallery only if any exist
  - not yet possible to browse any subpage even if available
* only full working address to gallery allows to display them in this page
  - accepts only links to this nursery website
  - incorect value or no value displays error notyfication
  - incorect link referrer may display wrong or no gallery page
* enables slideshow for any displayed images (thumbnail photos)  
* sample address hardcoded into form field,
  - re-entering default value by nearest button
* only one time views of a gallery
  - trigger buttons get disabled after use
  - needs a page refresh
  - added refresh button in page header
* yellow box just for checking existency of gallery subpages (only for viewing!)
* added simple hide / show animation triggered by buttons in footer
* *added basic loging of actions in console* (modified)
  
