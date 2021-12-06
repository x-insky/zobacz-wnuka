# *Zobacz wnuka* in strict translation from Polish means *See a Grandson* (or also *Look At Grandson* with *LAG* abbreviation for easy remember).

Allowing easier viewing of photo galleries with grandsons, granddaughters, grandchildren in general or with just small children for anyone who is interested. 

---

## Project goal

### This project allows to view a photo slideshows and navigate between groups of photos from external webserver.
  
[TRY IT OUT NOW](http://zobacz-wnuka.5v.pl/)
  
The site reads groups of photos from the original nursery website and allows them to be presented as a slideshow (for each photo gallery or its subgroup). It uses a responsiveness for the displayed content, presenting it in a similar layout, almost regardless of the screen size of the device with a web browser. 

### Brief Summary 
+ SPA App driven by JavaScript
+ uses AJAX and PHP magic
+ easy navigation
+ RWD & mobile friendly
+ accessibility with keyboard navigation
+ runs on most everything
+ and much more

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
  - not every browser offers the "monkey" add-on mechanism, which changes JavaScript behavior (e.g. *Greasemonkey*, *Tampermonkey* or *Violentmonkey*)
  - often the mobile version of the web browser does not have this functionality
* no additional configuration of "~monkey"
  - does not require downloading additional code to *this site* get changed functionality and appearance
* no need to repeat this process on **each of the browsers used on each device**
* just use & don't worry about anything
  - not everyone is an expert on JavaScript or frontend (which is a shame, the world would be a better place ); )

### Mode of action
This site is a SPA application and its content is read from the nursery website. The nursery server does not offer any API, so you can't directly use Ajax queries to get the requested content.

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

### Functionalities
* availability
  - operation via keyboard or / and mouse
  - the behavior of the [space key] has been changed, also enabling confirmation of some actions (e.g. loading subsequent elements when the trigger element has focus) not only on standard interactive elements such as form elements
  - disabling some keyboard shortcuts for navigation (they do not work only when typing / navigating)
* browsing the gallery or part of it (subpage containing up to 18 photos) as a slide show (lightbox plugin)
  - easy switching between possible groups of photos (subpages) in a given gallery
* responsive appearance, matched to the width of 99.98% of displays produced
* reading table of contents groups from the nursery webserver in groups of five, in order from the most recent entry
* choosing from already read groups as the start of displaying and viewing the indicated gallery
* direct selection of any gallery from all available through the form (text box or slider)
  - a random button as a random selection option
* direct selection of any subpage of the table of contents, where are placed next gallery groups
  - selection via form (text box or slider)
  - a button as a random machine that streamlines the blind selection
* interactive messages informing about failed queries
  - standard actions that can in most cases be called again
  - the ability to redo an unsuccessful request for loaded tables of contents
* query failure simulator
  - the ability to simulate failures and activate a fully functional server (this will not work properly exactly when a real failure occurs)
* resistance to user actions
  - numeric form entry fields secured against providing a non-numeric value
  - tested correct interface operation for various user activities
* a game of matching elements to the background image as an experimental addition
  - still in the unfinished phase
  - still without counting points and collecting results

### Difficulties encountered
- [x] nursery server may be unavailable (overloaded, shut down or under maintenance)
- [x] a failure may occur while processing a request
- [x] the request can be handled but not delivered to the user's browser
- [x] the number of galleries before the first reading of the site is unknown
- [x] the number of pages of the table of contents is also unknown
- [x] galleries are assigned dynamic from the end, in groups of five, each addition of a new element at the beginning changes the arrangement of existing subpage groups, moving elements by one (element indexes are preserved)
- [x] each gallery has its serial number (this index) and a unique address, made up of the title (along with matching the specification of the www addresses)\
- [x] **it is therefore impossible to display the gallery with the selected number without specifying which subpage of the table of contents it belongs to and you need to display / download this subpage to obtain a working address**

...
