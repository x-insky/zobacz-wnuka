
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
  
