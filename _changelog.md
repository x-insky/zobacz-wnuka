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
  
