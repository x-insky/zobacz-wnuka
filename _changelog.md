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
  
