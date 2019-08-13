# *Zobacz wnuka* in strict translation from Polish: *See Grandson* as the name or *Look At Grandson* with *LAG* abbreviation for easy remember.
---

## Project goal
Allowing easier viewing of photo galleries with granddaughters or with children with a different family relationship (son / daughter, brother / sister, godson / goddaughter, cousin / cousin, etc.). Or just for anyone interested.\

The site reads groups of photos from the original nursery website and allows them to be presented as a slideshow (for each photo gallery or its subgroup). It uses a responsiveness for the displayed content, presenting it in a similar layout, almost regardless of the screen size of the device with a web browser.

### Statement
> The project is not intended to deter, ridicule, harm or in any way impede the activities of the original nursery website. Nor is it intended to reduce trust for the author's original site or his commercial activities.
---

## More details - TL;DR

### Cause
* outdated nursery website interface, adapted to computer screens (generally large, i.e. wide screens)
  - screens narrower than 950px require horizontal scrolling
  - problematic enlargement and scrolling of content on phone screens
  - difficult navigation for subpages - small links
* no attached and active library (plugin) for the slide show on the nursery website
  - annoying photo browsing for their larger group
  - requires an additional "back" click (using the mouse or button in the browser) or / and scrolling down to select the next thumbnail image within the current gallery

### Approaching to the problem
Instead of modifying each used browser separately by adding plugins that allow you to modify the content displayed, it was decided to create a website that will present the same version to all browsers, regardless of the equipment used.

#### Benefits
* no browser configuration
  - not every browser offers the "monkey" add-on mechanism, which changes JavaScript behavior (e.g. Greasemonkey, Tampermonkey, or Violentmonkey)
  - often the mobile version of the web browser does not have this functionality
* no additional configuration of "~monkey"
  - does not require downloading additional code to *this site* get changed functionality and appearance
* no need to repeat this process on **each of the browsers used on each device**
* just use & don't worry about anything
  - not everyone is an expert on JavaScript or frontend (which is a shame, the world would be a better place ); )

### Mode of action
This site is a SPA application and its content is read from the nursery website. The nursery server does not offer any API, so you can't directly use Ajax queries to get the requested content. \
\
Just a series of queries to the nursery web site through the middleware is done, the response is received and processed in the background, and results are generated within this application.

#### Details at a glance
* remote reading of the nursery website
  - right configuration on a PHP server is very handfull (and needed!) 
* Ajax is used in communication with the agent (proxy)
  - response visible in the interface as a reaction to user or application actions (forcing)
  - successful or unsuccessful query result
  - possibility of re-asking
* the vast majority of application logic supported by JavaScript
* each time by viewing or refreshing this website in your browser, you starting to build an information about the nursery website from the beginning
* no active JS in the web client prevents the application from working
  - only the message about disabled JavaScript is visible
  
  
  ...
