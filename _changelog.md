v0.3.6 - moving screen and veryfying enetred numeric value

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
  
