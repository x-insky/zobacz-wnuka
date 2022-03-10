v0.5.71 - fix display of higher indications of selected gallery and gallery list subpages, selection sliders got description on hover

* v0.5.71 -- [2022-03-10]

[*] MODIFIED

-- index.php
* replaced twice the invalid `alt` attribute with `title`
  - the content of one of the attributes was updated
* removing unnecessary HTML new lines or comments
  - removed commented out php code displaying the contents of the global table
  - the content of the above comment was visible explicitly as php code (but commented out!)
  - ultimately moved as a comment inside the php block (no longer generated as HTML content)

-- zlobek-styl.css
* reduced side padding for text boxes with a range value selection
  - longer / larger values ​​are not clipped by an invisible background
  - information field with the display of the selected value via a slider, buttons or direct editing of the value

[F] FIXED

-- zlobek-styl.css
* improved display of longer/larger gallery numbers and gallery list subpages

-- index.php
* displaying a description for a slider (correct use of attributes for an existing description) 

---------------------------

v0.5.70 - summary of update v0.5.70

* v0.5.70 -- [2022-03-09]

[*] MODIFIED

-- zlobek-styl.css
* repairs to all CSS content from header thru main area into footer
* degradation the specificity for selectors
  - mostly removed overpowered element type peceding the ID and its descendants
  - removed double IDs inside one selector
  - shortened selectors by deleting middle element class selectors, when ancestor and descendant were well defined
* changed some ID attributes into classes if possible
  - almost the same or similar names but changed notation with dashes instead of underscores
  - modified references to the newly changed class names into HTML and JS
* sorting of CSS attributes inside definitions
  - some kind universal hierarchy of order for attributes (mainly for relatively complicated definitions)
* cleaning up the definition of animations and its names
  - removed unused definitions
* removed unused code: old comments, ancient or doubled attributes, etc
* removed also extra spaces, tabs an other whitepsaces and bad indenations

-- index.php
* updated references to the renamed class names

-- witryna.js
* updated references to the renamed class names for the logic

---------------------------

v0.5.70 - CSS cleaning, approach #4 - dynamically loading table of contents

* v0.5.70 -- [2022-02-24]

[*] MODIFIED

-- zlobek-styl.css
* refactoring selectors in the area of ​​a dynamically loaded table of contents
* getting rid of the excess force of selectors
  - removed redundant 'id' attributes pointing to an ancestor container
  - removed unnecessary ancestor classes
  - removed redundant ancestor/parent element type
  - left the element type in the basic element selector (only for a complicated structure and many pseudo-classes/states of the container and/or sub-elements)
* changing class names to a character with dashes instead of underscores between words
* sorting of CSS attributes
  - unified according to the used hierarchy of importance of the attributes
  - deleting commented content
  - fixes for duplicate attributes

-- witryna.js
* class names changed in CSS were used for dynamically generated content
  - a lot of name changes in dynamically built structures
  - the lack of use of class names changed in CSS in several functions building the dynamic structure of HTML did not generate any content
  - possible lack of synchronization in class names or only partial renaming created incorrect content
  - correctness tests in generating content

-- index.php
* one class name updated (only one static change)

---------------------------

v0.5.69 - CSS cleaning, approach #3 - header section (banner)

* v0.5.69 -- [2022-02-23]

[*] MODIFIED

-- index.php
* renaming some ID attributes into classes for elements inside the '#naglowek_kontener' section
  - a slight reorganization of the container structure, after merging it is a section with the '.banner-kontener/banner-container' class
  - attempts were made to keep the existing names or given similar names for the created class attributes
  - renamed the misleading ID names to functional class names

-- zlobek-styl.css
* cleaning the style sheet from redundant selectors
  - attempts to lower the specificity of selectors while maintaining the developed system
  - reduction of unnecessary or unused attributes with their values
  - evidently standing and commented out content has been removed
  - possible changes in the order of the attributes
* customization of existing ID selectors per class
  - matching according to the current changes in the names of elements and containers in HTML
  - testing the correctness of displaying the website after the changes

-- witryna.js
* tracking changes made for HTML and CSS
  - changes for events or references

---------------------------

v0.5.68 - CSS cleaning, approach #2 - general content

* v0.5.68 -- [2022-02-20]

[*] MODIFIED

-- index.php
* changed attribute 'id=witryna/site' to class 'glowny-kontener/main-container'

-- witryna.js
* updated changed '#id' for '.class' selectors

-- zlobek-styl.css
* cleaning the stylesheet from unnecessary, outdated or inappropriate content
  - general selectors stage and in the vicinity of the website header
* lowering the power (specificity) of the selector from id to the class 'glowny-kontener/main-container'
  - the class provides the same uniqueness, a strong selector unnecessary for a container
  - better name that specifies the function of the element
  - fixed references to existing items with tests
* reduced specificity of selectors for components of error notifications (class 'error')
  - unnecessary selectors of parent element class also with type of this element
  - renaming all further references, e.g. in screen width queries
* shifted in sequence for defined selectors for consistent declaration order
  - taking into account the order of selectors at key elements/page containers and/or taking into account the vicinity of elements
  - grouping of selectors evidently present only in certain elements/containers

[-] REMOVED

-- zlobek-styl.css
* removed evidently old and unused styles or their original attribute definitions
  - content saved as old comments, inside a given selector
  - often several proposed values ​​for a given attribute or group of attributes with values ​​were commented on

[F] FIXED

-- zlobek-styl.css
* FIXES #85 - 'Focus status issue inside gallery item title (Firefox only)'
  - an additional and explicit declaration that removes the outline around a link inside another link element
  - correct display in FF, without side effects in other browsers

---------------------------

v0.5.67 - cleaning CSS, approach number one

* v0.5.67 -- [2022-02-17]

[*] MODIFIED

-- zlobek-styl.css
* verification of the hierarchy and order of defined styles for design elements
  - a lot of changes in the ordering, not in the definition structure itself
  - attempts to better group the definitions of elements according to their function or location in the HTML document
  - made or modified descriptive changes for the structure (definition comments for the main blocks of the site or significant elements) that do not modify the existing CSS
  - the purpose of changes is readability and/or better logical connections between defined components/blocks/groups of website elements
* overview of the styles used
  - getting rid of unused/stale/commented attributes or their previous definitions
  - removed obviously outdated and unnecessary attribute definitions
  - some commented out "proposals", "holdings" or "ideas" were left for further consideration
  - if there are still any attribute definitions that do not contribute to the system, they have also been removed
  - new or corrected existing comments (mainly typos or explanations of the purposefulness of a given attribute or attributes)

---------------------------

v0.5.66 - fight against 'advertising windmills', the next part & not the last

* v0.5.66 -- [2022-02-16]

[+] ADDED

-- zlobek-styl.css
* defined styles to not showing of advertising content for the current hosting
  - partial success, less unwanted content in the browser
  - remotely loaded ad containers are attached to the page content anyway, they come with in-line styles & '!important' values :/
  - 'bare' mobile browsers are not quite good at blocking ads (this is not the fault of current modifications!)
  - example hosting problems: in mobile CH v98 pop-ups looped and 'overflow' blocked for the top container, so you cannot scroll the screen (AD-killer required :/ )

[*] MODIFIED

-- zlobek-styl.css
* correction of the arrangement of selectors inside sheet for the same target elements
  - increased right padding for even vertical alignment for text form fields between two forms

---------------------------

v0.5.65 - quick correction of displaying the list of read galleries (old browsers only)

* v0.5.65 -- [2022-02-13]

[*] MODIFIED

-- zlobek-styl.css
* previously used "display: inline-block" attribute on most browsers to ensure correct display of items
  - known attribute, recognizable even in IE8 and similar age browsers (renewed FF, CH and old OP version numbering when introducing HTML v5)
  - standard and correct interpretation, even for medium-up-to-date web browsers
  - error present temporarily even for CH versions around 20 (and approximately also FF)
* for old browsers the content is displayed incorrectly in the layout of adjacent elements positioned in this way
  - list of read gallery titles in a disarray, each of the elements of the list is displayed at a different height
  - the problem grows with more elements in the container
  - the same for displaying a selected gallery subpage, also "levitation" of list items
  - solved by specifying an additional attribute for an item displayed as 'inline-block'
  - an explicit specification of some value for the attribute 'vertical-align' is required

---------------------------

v0.5.64 - CSS: centering of the gallery titles read, no border on the photo preview in the lightbox, increased top margin of the visit notification

* v0.5.64 -- [2022-02-12]

[*] MODIFIED

-- zlobek-styl.css
* elements of subsequent galleries or their subpages are centered horizontally
  - the list of gallery titles for the next loaded gallery subpages is evenly displayed horizontally
  - equal arrangement of gallery list items
  - there are no unevenness in the layout - more free space on the right side of the screen (visible before passing the next defined thresholds of the screen width)
  - obtained a slightly different arrangement of elements, which is interesting for a small number of elements on a narrower screen
  - resignation from the attribute 'float: left' in favor of 'display: inline-block'
  - also resignation from the 'overflow: hidden' attribute in the parent container (the attribute is important for the correct display of elements from 'float')
  - also possible horizontal centering using 'float', but configuration of the layout required for each of the five screen width modes (from one to five elements per line can be displayed; more work is required for the same effect as it's now)
* the same element centering correction was used to display the list of titles of galleries for a specific subpage of the gallery list
* lightbox: removed the red border when viewing consecutive photos in browse mode
  - used a more specific selector taking into account its display area
* last visit notification gets more space (more top margin)

---------------------------

v0.5.63 - new class for handling button shutdown events for error notifications

* v0.5.63 -- [2022-02-10]

[+] ADDED

-- zlobek-styl.css
* added a general '.wysrodkowane/centered' class to center elements horizontally (for inline elems)
  - after the selector s strengthened, it was used for the element in the footer of the site

[*] MODIFIED

-- index.php
* initial use in the footer of a new class for centering elements in the frame (together with the '.ramka/frame' class), e.g. a text message

-- witryna.js
* added for clarity, an additional class to the button to close error messages
  - site logic adds a new class to the close button for the message being built
  - modified the crash handling code - greater readability of event handling (easy knowing what is the event object)
  - the namespace for event delegation still matters, but it is easier to manipulate the repeating element type
  - the event is handled on one or more displayed messages (and not with the 'id' attribute like the other buttons)
* minor purges in the encountered code: spaces, indentations, spotted typos in the comments

---------------------------

v0.5.62 - all site close buttons are now standardized

* v0.5.62 -- [2022-02-09]

[*] MODIFIED

-- zlobek-styl.css
* changed the style of the close button for the error notification to the already proven theme by class '.zamykanie/closing'
  - tested display and behavior of the general button class along with style changes in this notification
  - uniform appearance, behavior and interaction with adjacent elements in the notification for different screen widths
  - complete resignation from the previous class of '.krzyzyk_zamykania/cross_of_closing'
* moved the definition of the general class of the '.zamykanie/closing' button to the beginning of the CSS sheet
  - easier reference between elements of the website structure, which are using the functionality of closing or hiding content
* cleaning in styles: unnecessary indents, spaces, new lines and clearly redundant definitions (often out of date and commented out)

-- witryna.js
* modified the function 'GenerujPowiadomienieOBledzie'
  - function produces an element with a description of the error with the class '.zamykanie/closing'
* modified the handling of the delegated event in the '#galeria_spis' area to the changed closing class name
  - there is a namespace/event space
  - explicitly referring to this class as an event object, there is no dedicated other class for closing the error notification (the class is used throughout the site for styling the close buttons)

---------------------------

v0.5.61 - unification of closing buttons: shape, location and behavior

* v0.5.61 -- [2022-02-08]

[*] MODIFIED
 
-- index.php
* added '.zamykanie/closing' class to the close buttons for the '#gra/game' and '#biezaca_galeria/current_gallery' sections
  - all to standardize the size, shape, location and behavior with other close buttons of the website
* changed the order of the layout for the section '#odpluskwiacz_ajaksowy/ajax_debugger' 
  - displacement from the end of the site to the beginning
  - logical with going from top to bottom and selecting from the keyboard
  - this section if displayed is always on top
* cleaning: removed old comments and unnecessary newlines
  - fixed indentation for block '#spis_tresci/table_of_contens'

-- zlobek-styl.css
* adopted a common class for closing buttons
  - removed button wrap around adjacent button elements, based on float styles
  - minimal offsets from the right corner, depending on the width of the screen
  - added inability to select the text content of the button (symbol of 'X')
* corrected the impact of close buttons on the title of the currently displayed gallery or the main title in the footer
  - padding ranges for different screen widths were tested for encountered some of the longest titles 
  - tests probably eliminated minor distortions of the structure of the selected gallery, in the case of long titles with short words at certain screen widths
* added the original syntax for the encountered pseudo-element selectors
  - generally it's redundant operations, because browsers interpret pseudo-class syntax for pseudo-elements anyway

-- witryna.js
* corrected the generating of the closing button inside the 'DostawPrzyciskZamykaniaDoBiezacejGalerii/DeliveryCloseButtonToCurrentGallery' function
  - includes a unified class for close buttons when building HTML

---------------------------

v0.5.60 - minor fixes for positioning buttons for closing sections '#poco' and '#pomoc'

* v0.5.60 -- [2022-02-07]

[+] ADDED

-- zlobek-styl.css
* created a generic class ".zamykanie/closing" for the close buttons
  - same visual style with :hover and :focus
  - a square not a rectangle
  - improved vertical centering for 'X'
  - no empty outline above top edge of selected element when state :focus
  - used as a test for the close buttons in the '#poco' and '#help' sections
  - uses :focus and :hover states in the same manner

[*] MODIFIED
 
-- index.php
* changed element type for close buttons from <div> to <aside>
  - added a new class ".zamykanie/closing" to them right away
  - no conflict with the already defined styles - no disturbed hierarchy of items in the footer, in existing queries with increasing screen width (the button should be one of the first item in the container to quickly switch to it with the [Tab] key)

-- zlobek-styl.css
* increased top or side padding in <h2> subheads of '#poco' and '#help' sections
  - for the purpose of not being covered by the closing button for this section

---------------------------

v0.5.59 - close buttons for the 'help' and 'poco' sections

* v0.5.59 -- [2022-02-06]

[+] ADDED

-- index.php
* aded two close buttons
  - one each for the '#help' and '#poco' sections

-- witryna.js
* added event handling for pressing new closing buttons
  - events similar to those already existing for the closing buttons
  - operation by clicking the mouse or pressing a button on the keyboard

[*] MODIFIED
 
-- zlobek-styl.css
* styles were copied, using selectors on existing closing elements
  - also in the upper right corner of its parent, absolutely positioned
* merged already existing selectors to avoid duplicate definitions

-- witryna.js
* code cleaning
  - unnecessary spaces, indents and redundant new lines

---------------------------

v0.5.58 - quick fixes in the '#poco' section

* v0.5.58 -- [2022-02-05]

[*] MODIFIED

-- index.php
* some corrections in the text of sentences in sections '#poco' and '#help'

-- zlobek-styl.css
* the bordered element '.ramka/frame' in the '#poco' section is already centered on wider screens than 1400px
  - increased slightly margins above and below this element
* added slight rounding of corners for elements in the 'superlatives' section
* cleaning in the code (unequal indentations, unnecessary comments, etc.)

---------------------------

v0.5.57 - goodbye to unused CSS references, 'poco' columns & frame

* v0.5.57 -- [2022-02-04]

[*] MODIFIED

-- zlobek-styl.css
* removed empty selectors without definition
  - unused declarations (current or past testing)
  - identical to the wrong ones, because they introduce an unnecessary burden on the browser
* modified presentation of the new frame in the '#poco' section  
* removed CSS selectors without reference in the project
* combined identical definitions of similar items
* removed unnecessary and commented content
 
-- index.php
* modified 'poco' section
  - balanced the content of the height of the left and right columns
  - added info in frame at the end of section (content cut from right column)
* removed unnecessary and commented content

---------------------------

v0.5.56 - polished superlatives section

* v0.5.56 -- [2022-02-02]

[*] MODIFIED

-- zlobek-styl.css
* as a variety, every second element in the superlative list is shifted to the right
* slightly increased padding to contain the image of the sun when its zooming in
* modified selector for :hover state with consideration of the element instead of the picture itself for the sake of animation
  - the image inside an element rotates as long as the cursor is on that element
  - you don't need to hit the picture with the cursor
* better interactivity indication for :hover state on element
  - darker background under the element like most interactive elements of this site
  - no response to clicking, it's not the goal

---------------------------

v0.5.55 - interactivity in developing the advantages of the site

* v0.5.55 -- [2022-02-01]

[+] ADDED

-- zlobek-styl.css
* added rotation and scaling animation
  - also a filter property for brightness and contrast
  - assigned the animation to the images of the bullet list of superlatives
  - animation activated with the :hover state

[*] MODIFIED

-- index.php
* list of superlatives
  - all the texts of a list surrounded by a <span> elements
  - added additional sub-item for the list
  - the content of another sub-item was slightly modified to match the tone of the entire list

-- zlobek-styl.css
* improved the form of presenting the advantages for the website
  - every second line is distinguished from the light background
  - finally, the background distinguishing feature for odd enumeration elements has been introduced, i.e. the list begins and ends with highlighting the background
* modified existing styles for list bullet
  - rotation animation was improper for a non-square image (no centering due to unbalanced padding; image is square)

---------------------------

v0.5.54 - shortened a bit texts, removed remnants of HTML comments and typos

* v0.5.54 -- [2022-01-31]

[*] MODIFIED

-- index.php
* removed backlogged HTML comments
  - old content, no longer contributing to the state of the site
  - but still visible in the  HTML code view in the browser
* changed the order and slightly slimmed down the content in the '#poco' section
  - changed the order of content in individual columns 
  - merged the content of two similar headers into one (logically on plus)
  - redefined some long sentences in the merged descriptive section
  - the list of superlatives is more complete
  - but in total not too many letters in the text blocks were removed
* two typos were corrected

-- zlobek-styl.css
* added bottom padding for the list of superlatives
  - the next header is pushed more from the last element of the list 

---------------------------

v0.5.53 - ALT is an IMG attribute, not an A elem's

* v0.5.53 -- [2021-12-07]

[*] MODIFIED

-- witryna.js
* shifted 'alt' attribute generation from `a` element to `img`
   - slightly changed content in relation to the source server
* slighty modified the content of the 'title' attribute in the element `a` 
* modification of the descriptive content for displayed an enlarged photo size
* other changes to the 'GenerujPodstronyGalerii' function code:
  - commented out the logging for found thumbnails in the gallery
  - deleted some old comments

---------------------------

v0.5.52 - fixes of 'active text selections, missing alt inside imgs, small bottom gap'

* v0.5.52 -- [2021-12-05]

[+] ADDED

-- zlobek-styl.css
* created a new class for an enumerated list

[*] MODIFIED

-- index.php
* fixed slider's "selectionDirection" attribute from "backward" to "forward"
  - slider have operated and operates normally (LTR), value grows to with slider moves the right side

-- witryna.js
* verified and updated almost all of the site images to have to an 'alt' attribute - applies to [fix_2]
  - introduced the missing 'alt' attribute for the list of generated lists (both lists: subsequent subpages and gallery subpages on request)
  - title pictures for individual galleries on the external souce server do not have the 'alt' attribute!!!
  - for both generated lists, this attribute was introduced based on the gallery title
* changed minimally the content structure of the 'alt', 'title' and 'data' attributes for thumbnails in the gallery details preview (gallery subpages)
  - better presented photo titles when hovering over them with the cursor and when viewing full-size via Lightbox
* corrected some typos inside comments and some brace syntax

-- zlobek-styl.css
* added "user-select" attribute with value "none" to many site components - applies to [fix_1]
  - this change eliminates the possibility of selecting text in elements that should be part of the navigation
  - added, among others to: the game launch component, the loading button for the next gallery, notifications about loading (all three occurences) and info about the previous site visit
  - also included close buttons inside error messages and for closing out parent components
  - introduced twelve changes in total for the above-mentioned elements
  - interesting funcionaliy: in the error message component it is not possible to copy the error title, but the detailed content from inside is accessible
* simply added more space into container for current gallery thumbnails - applies to [fix_3]

[F] FIXED

**fixes: #76 - 'Possible mistakes: active text selections, missing alt inside imgs, small bottom gap'**:

1. should it be possible to select texts inside, for example buttons' or components'?

2. verifying the existence of the 'alt' attribute for all `<img>` elements, displayed on the page

3. too small space between the displayed elements of any gallery and the bottom of its container

---------------------------

v0.5.51 - fixes of 'resource unavailable message, small font, lots of text'

* v0.5.51 -- [2021-11-16]

[+] ADDED

-- zlobek-styl.css
* created a new class for an enumerated list

-- new file 'grafiki/slonce_plus_36x36.png'
* a background file for enumeration
  - has a plus sign inside

[*] MODIFIED

-- index.php
* few attempts to make the text slimmer and to increase its readability - applies to [fix_3]
  - measures to shorten existing texts or to get rid of them at all
  - introduced shorter and clearer sentences
  - elimination of some of the complexities
  - replaced the text block in one of the paragraphs with one unordered list (for visual learners)
  - breakdown of subsequent sentences unrelated to the context one after another (in a given group, only if it's possible) into separate paragraphs or at least separated them with newline markers
  - as at the beginning long texts are displayed on demand, inside hidden containers at startup, so the site is not so covered with text
* used new "tech" class to describe all techlnologies used and not used in this project

-- witryna.js
* corrected the source container cleaning mechanism - applies to [fix_1]
  - removed remnants of unnecessary links
  - instead of a complicated condition, used a simple zeroing of the contents of this container

-- zlobek-styl.css
* slightly increased start level for the global font size on the site - applies to [fix_2]
  - applies to the narrowest screens ("mobile first")
  - a slight jump from 65% to 70%
  - a significant increase could cause the existing elements of the site to overlap or be repulsed!
  - slightly increased text size for the second width threshold (threshold above 320px, from 70% to 75%)
  - next screen width thresholds unchanged, existing text scaling kept
* increased by 25% font size for the text description of a given gallery in the gallery list item component
  - applies only to the second threshold of the screen width (in the range of 320..469 pixels)
  - then the gallery list items are placed one above the other, takes up the entire available screen width
  - in the second threshold, the gallery element is the widest among all screen size variants (later, above 470px the screen width, two to five gallery elements can be displayed in each row)
* moved in places some definitions inside the main stylesheet
* used notation with leading zero before fractional value for encountered CSS attributes
* called explicitly class "tech" as the definition of list items
  - required to be able to display a different set of list items with differently defined styles inside footer area

[F] FIXED

* fixes: #74 - 'resource unavailable message, small font, lots of text'

1. fixed the text cursor to jump off the screen

2. the small font has been slightly enlarged on narrow screens

3. Attempts to reduce text overload

(4. fixed the progress bar overlapping text in the notifier component)
  - previously unnoticed problem
  - used a larger gap

---------------------------

v0.5.50 - summary of software requirements and dynamic data inside footer area

* v0.5.50 -- [2021-11-13]

[+] ADDED

-- index.php
* added a frame informing about the minimum software requirements
  - displayed on request in the footer area (*Help* button)
  - quite visible due to the contrasting background
  - application version requirements are from https://caniuse.com/
  - it concerns the correct use of ES5 and UX at the level of acceptable *progressive enchancement* of this website
  - jQuery takes care of most of the compatibility issues, but the UX part is not fulfilled in lower versions of browsers or browsers shows  errors

[*] MODIFIED

-- zlobek-styl.css
* corrected the way of displaying the bitmap background in the list item, displayed in the footer area
  - background image appears always at 50% of the element height
  - mainly applies to narrow screens, where the content of the element does not fit 100% on one line on the screen
  - surprisingly, the modification without adversely affecting wider screens
  - uses CSS motto: "the last CSS attribute declaration is used, which is understood by browsers"
  - also better alignment of a first item
* added a border for the presentation of dynamically generated content in PHP variables on the server
  - better view of the summary, improved display without the right margin
  - the frame includes all existing server variables

---------------------------

v0.5.49 - removed annoying advertisements on a new hosting (v3)

* v0.5.49 -- [2021-10-09]

[*] MODIFIED

-- witryna.js
* updated a filter against ads, inside 'UbijReklamy' function
  - caused by annoying advertisements on a new hosting (site launches a new tab or a new window of a web browser full of ads)
  - few aggresive and wide ads on a top of the page destroys mobile layout

-- zlobek-styl.css
* decreased footer's margin bottom
  - there is no text ads below footer on a new hosting

---------------------------

v0.5.48 - better a11y for keyboard navigation via [Tab]

* v0.5.48 -- [2020-07-31]

[+] ADDED

-- zlobek-styl.css
* unification of styles to highlight interactivity of interactive elements
  - all active interactive elements accessible via the keyboard have a red dotted border
  - not only fields and form buttons or only selected interface buttons
  - the appearance of the elements changed and visible in the :focus state
* better visual presentation of the keyboard navigation
  1. the background of each item in the gallery list changes after selecting the "anchor", which is the title of a given gallery
  2. the list of thumbnails in the preview of a given gallery subpage is scaled when viewed from the keyboard via [Tab]
    - navigation through thumbnail images shows the current item
    - you can see successively selecting with the cursor on each thumbnail from the list
    - behavior :focus as with :hover state (scaling + 10%)
* some test styles for new states

-- witryna.js
* generating "artificial focus state" by dynamically assigning classes to the ancestor, as a reaction to events on the child element
  - ancestor/container behavior change, depending on child's hover/focus state
  - assigning and taking back a class as reacting on "focus" and "blur" events
* new content, which is just shown after loading, get the status :focus
  - provides improved element navigation through the keyboard
  - :focus on new content that is within close range of the trigger element
* minor corrections in the comments

-- index.php
* added "tabindex" attribute to both *notifier* components
  - the entire area of ​​the element signals interaction
  - the ability to immediately hide the selected element by clicking it or confirming the action with the keyboard ([Space] or [Enter]) 

[F] FIXED

-- witryna.js
* minor corrections inside comments

-- zlobek-styl.css
* improved few typos inside comments

-- _changelog.md
* minor typo corrections of few last text log

---------------------------

v0.5.47 - fixed the redisplaying of current gallery

* v0.5.47 -- [2020-01-23]

[+] ADDED

-- zlobek-styl.css
* added default hidden state for closing button for current gallery
  - connected with element 'div#nazwa_galerii #biezaca_galeria_zamykanie'
  - reenabled  later by JS logic, when current gallery container is shown or its any subpage (showned as inline CSS)

-- witryna.js
* created new function "PokazPrzyciskZamykaniaDlaBiezacejGalerii" for the purpose of showing the current gallery closing button
  - closing button now appears with fading animation
  - possible tuning with time of fading in miliseconds or just use of default time
* next new function "UkryjPrzyciskZamykaniaDlaBiezacejGalerii" works as an opposite to "PokazPrzyciskZamykaniaDlaBiezacejGalerii"
  - it hides the button with fading animation of given time (uses miliseconds)
* added invocations of previously mentioned functions inside JS logic:
  - "PokazPrzyciskZamykaniaDlaBiezacejGalerii" starts when any gallery subpage is displayed - inside function "WczytajZewnetrznyHTMLdoTAGU", when is loaded any gallery (or its subpage -- started by gallery index) or *selected gallery number from the form* is activated (or also any it's subpage)   
* built new function "AktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii" as a new event listener
  - the purpose is to enable firing of the closing action (for the whole conatiner) only when this button is displayed or its showing up
  - another function should block this action when button is not displayed or it starts fading (the opposite function "DezaktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii" should play then) 
  - copied function body from the event delegation from ancestor element with id of "glowna"  
  - listens for the "click" or "keydown" event directly on closing button element of current displayed gallery...
  - ... the same events and logic as defined inside an ancestor element (a whole container)
  - it replaces the event delegation for closing button, which delegation was previoulsy defined
  - it allows the use of animations for showing and hiding this button (actually the fading animations are used) while event listening and respond only when the closing button is visible (or it is appearing)!!!
  - newly built function "DezaktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii" is an opposite for previously defined "AktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii"
* newly built function "DezaktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii" is an opposite for just defined "AktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii"
  - it removes event listeners for the "click" or "keydown" events
  - it allows to use any animations of disappearing on the event item and RESPONDS ONLY WHEN THE CLOSING BUTTON IS VISIBLE OR SHOWS UP
  - it should cancel all defined interactions on it, when starts to disappear (that was impossible on previously dual state: only SHOWN/HIDED)
  - logic copied from the previously defined event delegation on closing button, which is inside of element with id of "glowna" (NOT used "ON" state but currently it UNREGISTERS specified events with "OFF" function) while the event element is not visible or it starts to fade
  - fires when any current gallery element is changed or its subgallery is loading (with conjunction of firing "DezaktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii" and "UkryjPrzyciskZamykaniaDlaBiezacejGalerii" 

[*] MODIFIED

-- zlobek-styl.css
* modified light text shadow to medium gray for each span elment inside h2 (selector: "div#glowna h2 span")
  - a light yellow text color looks better on bright background, when has some kind dark border
  - ligth glow it's nice but ... it's too bright for easy read, and on mobile screen the backrtound is even brigter (bacground gradient differ from desktop resolution)    
  - connected with current gallery title and it's number inside current gallery header
  - refers also to subgallery page number just before loaded thumbnails

-- witryna.js
* changed the way of adding the event listeners to the closing button for the currently dispalyed gallery
  - no more event delegation for "click" and "keydown" actions (previouly defined on ancestor "#glowna" for capturing the events on element with id of  "#biezaca_galeria_zamykanie"
  - separate events for closing action are added, when this button stays visible - by invocation of "AktywujZamykanieDlaPrzyciskuZamykaniaDlaBiezacejGalerii" function
  - also while hiding or fading the closing button the event for "click" or "keydown" are unregistered, so the action of closing the whole current gallery container is rather impossible to run (somehow it's still possible to perform, but the logic seems to set correctly!!! )  
* added extra invocation of "PokazBiezacaGalerie" function as the rescue for immidiately displaying the container for the currently displayed gallery
  - added in each place, when any gallery is displayed first time or its active subpage changes 
  - works fine, even the closing button was used AFTER the pressing any subgallery button (this precedence teoritecally is impossible in logic, but there is some kind of timeout or just the outdated hardware)!!!
  - rescue action saves a lot, instead of big effort of blocking the asynchronic actions!
  - a huge impact of this improvement on the proper working of displaying current gallery or its any subpage
 
[-] REMOVED

-- witryna.js
* commented out previously actions on button of current gallery closing with conjunction to event delegation on its ancestor
  - just to remeber the place in code: '$('#glowna').on("click keydown", "#biezaca_galeria_zamykanie", function( e ) {...}'

[F] FIXED

-- witryna.js
* it is now posible to show and hide button for closing current gallery with fading animation of that button (or use any animation with this element)
  - the purpose is to disable the event listener while this button is dissapearing and reenable listening, when the button starts to showing up
  - the event listner is temporaty removed and later reenabled
  - also removed the previously defined event delegation for this events 
  - (+): a beetter user experience with animations, not just "suddenly variant" ("I'm here/I'm absent now"); nobody likes things showing up from out of nowhere and super-ultra-fast disappearing that things
  - (-): jQuery event delegation works fine, but it doesn't work with fast changes (or my laptop is so old, that this ugly trick with closing the whole current gallery container still works... :/ ); not directly resolved the problem of closing the current gallery description (a whole conatiner)midiately after the any subpage was started to download requested content :(
  -... but the whole container is redisplayed immediately, when any content is loaded - when any subpage of current gallery is loaded 
  - see "MODIFIED" section of this update for more information
* added an extra call to "PokazBiezacaGalerie" function, which prevents from hidden current gallery conatiner
  - invocation is added to each functions, where the the current gallery is displayed by forst time or it's redisaplyed (e.g. changing current gallery subpage)
  - mentioned this just before (see more at "MODIFIED" section)

* closes: #71 - 'You can still close the current gallery IMMEDIATELY AFTER you start loading any of its subpages!' ~'You can still close the current gallery JUST AFTER reading another page!'~

---------------------------

v0.5.46 - quick fix for the closing button of the current gallery 

* v0.5.46 -- [2020-01-21]

[+] ADDED

-- zlobek-styl.css
* added "exclusive" styles for the gallery close button (item with id "current_closing_gallery")
  - this element is based on previously set styles that another close button has
  - here only the differences in cascading are defined (but by default the style with the entire line, like a block element - this is how the left margin was defined)
  - but a modification was also made for the "MINIMUM 320px screen" query, which changes the behavior to flowing around on the right, but with no margin to occupy the entire horizontal line!

-- witryna.js
* defined new function "Delete Button Close for Current Gallery"
  - it blocks pressing the 'X' button by dropping it
  - the reaction on pressing the 'X' button inside the currently displayed gallery is difficult
  - simply removes the "this button", but also shifts focus to the nearest element element (here the button for selecting any gallery or selecting a subpage number with a table of contents)
  - such a two-step operation in terms of operating the clavirer (so that the "focus" status is not lost)

[*] MODIFIED

-- zlobek-styl.css
* changed the margin value around the thumbnail element, for the photos from the current gallery subpage
  - applies to the horizontal margin change from 0.5 to 0.75 [em]
  - this unification introduces harmony in the display of elements, i.e. the same vertical and horizontal spacing relative to all elements
  - this does not introduce any order, only that the elements will be at the same distance between them
  - not all photos within the gallery subpage have the same dimensions, they differ not only in layout (horizontal / vertical)
  - that's why sometimes little chaos are noticeable with different ratios, however, we have no influence on this - thumbnail images are downloaded from the server and can come from different devices (cellphone, camera ... of different configurations and ratio)
* added "random gibberish" inside the commented content of selected CSS rules so that browsers do not directly interpret the commented attribute as DISABLED RULE! (these comments should already disappear or be replaced so far !; or it is also an error in FF)
  - such interpretation was encountered during tests, and the commented content blocked access to updating the value of a given rule
* slightly changed the attributes for the close button of the current gallery - item with id "#biezaca_galeria_zamykanie"
  - moved evenly to the right and top edges of the parent, almost regardless of the screen resolution used

-- witryna.js
* the function "DostawPrzyciskZamykaniaDoBiezacejGalerii" behaves more conditionally
  - it creates the closing item for the current gallery only if that component does not have a closing button
  - therefore it will not create two or more adjacent buttons next to each other
* event handling modified after pressing the close button of the currently displayed gallery subpage
  - a new call has been added for the function "UsunPrzyciskZamykaniaDlaBiezacejGalerii" 
  - only the order of calling functions within this event has been changed
  - the call to the "Lock" button and "Delete" button for Closing Gallery are moved to the beginning of the operation
* also changed the displaying of the selected gallery number
  - modified the handling of the event of pressing the submit button with id "slider_gallery_submit"
  - little changes inside only by modifying the order of called functions, moved the call of the "ZablokujPrzycisk" and "UsunPrzyciskZamykaniaDlaBiezacejGalerii" functions to the beginning of the request service
* in a similar tone was changed the navigation event, which is fired inside the navigation on the subpages of the currently displayed gallery - "click" event on "elements" gallery button "inside the container "#nawigacja_galeria" (event delegation!)
  - also moved earlier calls to certain functions inside this event have, which are responsible for additional actions (such as blocking the currently pressed button or deleting / hiding another element) 
  - ... so moved the "ZablokujPrzycisk" and "UsunPrzyciskZamykaniaDlaBiezacejGalerii" function fires at the beginning of the event handling operations
  - adeed function "UsunPrzyciskZamykaniaDlaBiezacejGalerii" here, so that the currently displayed button does not perform the closing action, i.e. hiding the entire detail component of the current gallery
  - this function also removes the mentioned button, so that after having refreshed the view for the current subpage this button would be generated again
  - if the button were hidden with an animation (introducing a delay!), there is a chance to press it before it was hidden; this showuld hide the entire component of the current gallery before updating its selected subpage ...
  - ... this may lead to the display paradox of this component, e.g., only the subpage will be updated and it will only be displayed, after waiting for it to be read (the gallery header will be permanently hidden until the display of any gallery is called [... by pressing any item from the list / table of contents displayed above or selecting any number from the given range on request]); choosing gallery subpages would not display a description of the gallery;

[F] FIXED

-- witryna.js
* see descriptions of changed functions in the "MODIFIED" section of this update, it applies to functions:
  - "DostawPrzyciskZamykaniaDoBiezacejGalerii"
  - "submit" events on the element with the id "suwak_galerii_submit" - loading any gallery number
  - "click" events on an element with the class "przycisk_galeria" inside the element with the id "nawigacja_galeria" - navigating the subpages of the currently displayed gallery
* the above functions protect against calling the closing of the current gallery during other activities, i.e. loading another subpage of the gallery or updating the content of the current gallery by the selected gallery number
  - as it turned out, there is a small chance for simultaneous or almost simultaneous calling by pressing the closing button 'X' after calling another of these actions,
  - unfortunately in a possible scenario it is likely to hide the header of the current gallery or the entire component (element) from reading the updated content
  - it is difficult, but nevertheless feasible, and adding animations or delays for the "'X' closing element" only increases the chance of this variant occurring
  - that's why its fading animation was abandoned and its immediate removal from DOM structures was used
* immediate removal of the closing element during navigation activities helps maintain the continuity of displaying the current gallery, because it is difficult to press this close button (it is impossible, for some reason there is a slight delay, but simply used old test equipment introduces this delay ;) )
* the quickly disappearing button of closing the current gallery does not introduce chaos in hiding this element, which could hinder the operation of the function displaying any selected gallery number (events on the element "#suwak_galerii_submit")
* downside are possible costly operations on the close button of the current gallery
  - it must be deleted and recreated for each gallery or subpage displayed
  - but we gain simplicity of use, you do not need to test the tri-state (exist | not_exist | show / hide), which would require complex verification before displaying the button
  - verification of the element existence would be necessary before carrying out any action on this button, in each case of displaying current gallery or an operation on its subpages (or selecting any gallery number also!)  

* closes: #69 - 'Duplication of the button to close the current gallery or / and parallel loading of another subpage when closing the current gallery.'

---------------------------

v0.5.45 - added improvements for the displayed current gallery

* v0.5.45 -- [2020-01-19]

[+] ADDED

-- index.php
* added placeholder for the <div> with id of 'biezaca_galeria_zamykanie' just for informative purpose
  - the whole parent element is overwritten in each remote reading of any gallery

-- witryna.js
* JS logic changed for the subpoint of command # 1 - explained in the fixed section for the current file, see update notes in section 'fixed'
* added new event support for pressing the button with the id 'biezaca_galeria_zamykanie' (closing by mouse and keyboard)
  - as a delegation of events on the parent element (with id of "glowna")
  - calls the newly defined function "UkryjBiezacaGalerie"

-- zlobek-styl.css
* the new closing element of the current gallery with the id "current gallery" is dynamically created via JS
  - styles were used, as for the previously defined element "#game_closing" (a selector has been added to existing rules)
  - the behavior for the "focus" and "hover" states was also copied

[*] MODIFIED

-- zlobek-styl.css
* styles changed - see bullets 2 - 5 for the file "zlobek-styl.css" in section [FIXED] (requested inside issue #67)
* the border styles of the close button have been changed to make it more visible on a light background (especially in the header area of ​​the current gallery)

-- witryna.js
* removed test logins in the console to perform actions on ads inside the 'UbijReklamy' function
  - forgotten to comment after the previous auction (v0.5.44)

[F] FIXED

-- witryna.js
* added a button to close the preview of the current displayed gallery (item #1 from the order list of issue #67)
  - a specific function 'DostawPrzyciskZamykaniaDoBiezacejGalerii' has been created, which injects the code to display the closing element to the header of the current gallery
  - the closing element is only shown *AFTER* the list of thumbnails from the gallery is displayed
  - it is important because by default you could close the current gallery component before displaying the gallery subpage from the navigation menu (a list of thumbnails or menu would be displayed, but previous elements would be hidden!)
  - the 'DostawPrzyciskZamykaniaDoBiezacejGalerii' function is activated inside the Load External HTML function into the TAG (variant 'gallery_page' and 'selected gallery')
* the newly defined function 'ShowBiezacaGalerie' is also used to display the entire container again on the current gallery (after being hidden by a button, but it is also started dynamically inside the function updating content for the current gallery or its subpage)
  - it does not directly show the entire container again, but its individual elements are shown (the container with the "#global" id does not disappear, it is visible throughout the program)
* created function "UkryjBiezacaGalerie", which serves to hide individual parts of the current gallery
  - called as a reaction to the operation of pressing the button from id "current gallery_closing"
  - works the other way around in relation to "HideBiezacaGalerie"

-- zlobek-styl.css
* recommendations were used to modify the appearance of the current gallery (original numbering from the command of issue #67 is used):

2. reduced the bottom margin between the descriptive content of the gallery and the list of thumbnail images
3. the thumbnails of the current gallery images are aligned centered, without being aligned to the left of the screen
  - padding was removed from <a> tags, but margin for <img> tags added by the value of the padding removed
  - efforts were made to keep the previous dimensions of margins / padding
  - the maximum height of the photo thumbnail has been changed from 130px to 150px, which means that portrait photos become taller and larger than the panoramic ones (depending on the dimensions of the thumbnails in a specific gallery, which means that sometimes the vertical thumbnails are larger and the horizontal ones are over 50% smaller - - side effect!)
  - the appearance of the thumbnails depends on the images used in the specific subpage (their size ratio), which makes it difficult to determine the possible arrangement of a maximum of eighteen elements (or any smaller number in a given sub-gallery) in different screen / window width
  - an attempt was made to set a gap from the left of 1em (0.5 for parent padding and 0.5em for element margin), but the minimum indentation from the left is difficult to achieve when centering the content (the gap is always greater or rarely equal for this "guaranteed" access from parent's edge)
  - it is influenced by centering a different number of elements of variable (unsteady!) width, their wrapping to the next row and an indefinite value of the width of the parent element, for a smooth width of the screen / window
4. content with information about no subpage has been added, for galleries containing only photos on the first subpage
  - since there is no other subpage, an appropriate message is displayed under the thumbnail preview
  - for other subpages, the subpage's navigation menu is displayed (as before)
5. the padding for <a>, which is the parent of the <img> element, has been removed so that the frame surrounding the thumbnail is shaped like a given image
  - the problem concerned mainly IE browsers, in other web browsers this shape was still consistent

* closes: #67 - 'Current gallery improvements'

---------------------------

v0.5.44 - removed annoying advertisement, less invasive moved down

* v0.5.44 -- [2020-01-18]

[F] FIXED

-- witryna.js
* a new filter against ads has been added inside 'UbijReklamy' function
  - now **almost** every added content from the hosting is removed
  - applies to any invasive advertising content added at the beginning of the website (immediately after the <body> tag and at the end, just behind the visible footer
  - This applies especially to banners that come to the fore (first plan)
  - removed the harmful effect of breaking the graphics system on a narrow screen, which was triggered by the appearance of cryptocurrency advertising
  - of course, the effect was eliminated, i.e. the immediate removal of the banner (also and its hiding ;) ) after its appearance on the page (it is rather imperceptible to be observed)
  - some unfinished structure of the contact form, hidden at the end of the website (behind the footer area) has also been removed
* decided to move advertising content (stuck to cba.pl) from the very beginning of the site, to its end, just behind the static footer
  - such an exception for less invasive advertising
  - let the hosting service still have the impression that it goes with content to the beginning of the content (not to the end or none)
* a more defensive approach was considered, consisting in blocking the loading of external scripts, especially from materials added by the hosting
  - this would eliminate the cause, not just the effect (here the advertising effect)
  - it would be a much more efficient approach, because JavaScript would not have to dynamically create new elements in the DOM tree, after a while to remove these new elements from the HTML structure
  - it would require earlier loading scripts responsible for blocking ads and separating them from the JS logic in general, which could simplify or complicate the project (discussion issue)
  - a case open for later, although this is not the goal of killing free hosting ;)
* added or changed some of the content in the comments inside this function
* fixes: #66 - 'Annoying advertising banner on mobile screens'

---------------------------

v0.5.43 - removed the duplicate link to an external CSS file; displayed list of website cookies

* v0.5.43 -- [2020-01-17]

[+] ADDED

-- index.php
* added displaying of all used values in the site's cookie table (list)
  - displaying inside the "debug_mode" block after pressing the "Help"  button ("Pomoc")
  - this site currently uses only two easily identifiable cookies
  - other possible items on this list are generated by the server to which this site has been made available (e.g. cba.pl)

[F] FIXED

-- index.php
* removed static HTML line that was below the block that dynamically generated a link to the style sheet, depending on the server environment ("production" or "dev")
  - fixes: #64 - 'double linking to external CSS files'

---------------------------

v0.5.42 - game content closed on demand, also fixed the rule of displayed paragraph under the main rules of header

* v0.5.42 -- [2019-09-21]

[+] ADDED

-- index.php
* added new 'div' element with id 'gra_zamykanie' inside container element with id 'zasady', which is located inside game area
  - closing element added
  - not inside container class of 'kontener' but before him, so the closing element could be placed in top rigth corner of game area
  - added with 'tabindex' attibute, so it could be reach by keyboard also (important when without mouse, but the dragging needs mouse or another pointing device)

-- zlobek-styl.css
* new selector added for styling th enew closing button for the whole game area
  - selector: 'div#zasady #gra_zamykanie'
  - rules based on the closing button of the error notification, but some attributes are different from that basis class
  - a 'float' property is a main difference, here is used another positioning
* added also changed displaying behavior when displayed in 'hover' or 'focus' state
  - the same noticeable yellow background color used as on another closing buttons
* created also a new selector for 'float clearing'
  - just for safety of CSS, another content in this container is always higher than this button-like-element so everything is all right
  - selector: 'div#zasady #gra_zamykanie:after'

-- witryna.js
* added new event function for serving any clicking or keypressing (precisely: 'keydown'!) on new closing button ith id 'gra_zamykanie'
  - when selected mouse button or keybord button was pressed the action is started
  - just a simple hiding (sliedUp() actually for better UX) of game area as an action (for now any other action is not caused)
  - if game area will be shown again, the partial images will be rearanged to its initial position

[*] MODIFIED

-- zlobek-styl.css
* changed the proper pseudo class to activate the selector 
  - not 'p:first' but 'p:first-of-type' is a right working pseudo class, so replaced selector 'div#gra div#zasady p:first' to 'div#gra div#zasady p:first-of-type'
  - changed also top margin for that selector to adjust the displayed content to be positioned just before buttons of actions
* altered the 'top' attribute value from '45px' to '60px' inside selector for 'zasada2' class
  - adjusted by trial and error for this value so it look much better than under the rotated header text

[F] FIXED

-- witryna.js
* added the requested solution for new functionality
  - new closing buttons is placed in top right corenr of game area
  - it operates on click or by pressing the [Space] or [Enter] like another button-like-elements located in this webapp
  - tested in few browsers, works fine for now
  - fixed also the text of paragraph rules to be displayed below the main rules (not under the headers, which covered that paragraphs)
  - fixes: #62 - 'Game content and closing.'

---------------------------

v0.5.41 - at least Internt Explorer v9 is required to display galleries and play a game; fixed creating new HTML object by jQuery instead JS (compatibility!)

* v0.5.41 -- [2019-09-20]

[*] MODIFIED

-- witryna.js
* refactored the function body 'RozmiescCzesci' to use jQuery compatible expressions instead straigth JavaScript code
  - JS syntax used before was not understanded by IE9 and below
  - replaced code for HTML object creation and placing into DOM by methods of jQuery
  - previous creation of a HTML object and its parameterization was done by JavaScript, jQuery was only used to place already created HTML object inside DOM
  - IE9 and previous verions don't understand object 'Element.classList' and its methods (ES5?)
  - much easier than working with polyfils for 'Element.prototype.className'
  - almost the same replacing syntax only the 'css' attribute builded differently and once for all style properties
  - rearanged order of all the computed values of variables, and moved them up at the beggining of the loop body
  - fixed also the 'class' attribute, which is treated like a keyword and cannot be used in IE8 and below
  - possible solution is by 'quoting' it (using single or double quotes) or use 'className' as a different name for this attribute inside JS
* fixed also another uses of 'class' attributes inside the jQuery code for creating elements in any function
  - replaced three occurences 'class' key attrbute by "class" word (with quote symbols) inside object definitions in function 'GenerujPodstronyGalerii'

[F] FIXED

-- witryna.js
* the web applications works fine from now on IE9
  - changed general JavaScript to jQuery notation, which is more compatible with older browsers
  - function 'RozmiescCzesci' runs normally and finally all the picture parts are initially placed and prepared for dragging
  - info: IE9 as the first MS browser with HTML5 standard and enchanced parsing speed of JS scripts, so previous versions might go away (sorry native WinXP users)
  - fixes: #61 - 'Problem with starting the website on IE9.'

---------------------------

v0.5.40 - restored animated belt inside information notifications, with interactivity now; removed unused code for nonexisting elements

* v0.5.40 -- [2019-09-18]

[+] ADDED

-- zlobek-styl.css
* defined hover state for element of 'powiadamiacz' class
  - slighty changes background color for darker hue and interactive cursor
  - impossible to use the same dark color 'cornflowerblue' as other elements are using because the inner belt uses that color and this belt is barely visible on dark background
* also defined pseudo element style, when any information notification is in hover
  - selector: 'div.powiadamiacz:hover:after 
  - adds a new absolute positioned element, placed in top right corner of current notification
  - a 'X' is placed on yellow background but about 30% smaller than any of existing on page equivalent
  - with yellow background closing element looks like on hover, not modified its state (impossible for pseudo emlements?)
* added new style for any direct child of 'h4' elements which are 'spans'
  - selector: 'h4 > span'
  - defined just the same color as 'spans' inside 'h3' elements, but the shadow underneath is set another, much darker and sharper
* a simple removing unnecessary spaces before colons

-- witryna.js
* added new click event function which collapses the informational notification on demand by jQuery slideUp() method
  - uses event delegation: element with '.powiadamiacz' class placed inside 'div#zaczytany_spis'
  - works only for NOT animated now elements, so click action must be performed before programmed imminent time of dissapearance

[*] MODIFIED

-- funkcje.php
* heavily changed the logic of function 'Czy_bylo_przekierowanie'
  - just for gaining any value from redirection while project still in development
  - commneted out previously test value of debuging text, because the condition can't be met
  - test value if there is no redirection to simply display 'debug value, no redirection' and always have this notification on each page refresh, just to test displaying content of informational notifcation

-- index.php
* changed the condition of displaying information notification, which might display first notification about redirection
  - simplified the condition to be based on content or value of used variable
  - if there is any value then notification is displayed
  - changed the static text of notification, that informs about possibility of closing current notification
* changed the text of second information notification
  - the same informing static text for possibility of closing current message
  - also using 'h3' elements instead previously used 'h4' for better reading (for established CSS styles) and 'span' elements for displaying of highlighted dynamic value

-- zlobek-styl.css
* removed all 'display' property for 'powiadamiacz' class container, because any element inside with transitions was not animated initially
  - removed from base class definition and participation of ancestor
  - instead using values 'none' for hiding and 'block' for showing element an attribute of 'visibility' with conjunction of 'height'
  - attribute equality for not showing element: 'display: none' is equal to 'visibility: hide' and 'heigh: 0px'
  - attribute equality for showing: 'display: block' is equivalent of 'visibility: visible' and 'height: auto'
  - added also attribute for positioning new content (as new context) and defined a similar transition like for any element of gallery list

-- witryna.js
* slighty changes inside function body 'PokazIUkryjPowiadomieniaOOdwiedzinach'
  - removed expression to modify CSS attribute of 'visibility' of any information notification
  - not needed because is controlled by CSS already (the action had performed earlier buy JS, duality is unnecessary)
* mentioned in new comments for code which needs change for compatibility

[-] REMOVED

-- witryna.js
* removed unused events on nonexisting elements
  - deleted the click event function on element '#testowy_adres_button' with some commented out content
  - deleted the click event function on button with id 'http_adres_submit'which was used in early times to view any gallery by providing given gallery address (URL) inside form field
  - deleted old code inside commented content for click event on '.kontener_odnosnik' inside '#galeria_spis' (event delegation), which is already defined and working fine

[F] FIXED

-- zlobek-styl.css
* restored the animations based on transitions inside any informational notification
  - removed 'display' attribute, which with its value 'none' cancels any declared animations for inside elements (on initial stage)
  - replaced 'display' attribute by pair 'visibilty' and 'height' (see 'modified' section of this update, 'zlobek-styl' fragment for details)
  - fixes: #59 - 'Restores display of "back progress bar" for informational notification.'

---------------------------

v0.5.39 - PREV/NEXT buttons reenabled after error; none, one or two button groups for subgallery links

* v0.5.39 -- [2019-09-16]

[+] ADDED

-- zlobek-styl.css
* added new style for 'h6', which is a container inside navigation menu of current gallery
  - selector: 'nav#nawigacja_galeria h6'
  - just to limit the distance from the top, from the text of subheader
  - the previously gap was not equal space in above and below of the buttons (upper was bigger)

[*] MODIFIED

-- witryna.js
* slighty altered the body of main function 'WczytajZewnetrznyHTMLdoTAGU'
  - all changes conected with 'galeria_podstrona' variant, affected the code only inside this switch block
  - removed the unnecessary dot inside text notification of error, when any subpage is not loaded correctly (changed text parameter of internal calling a function 'GenerujPowiadomienieOBledzie'
  - used another call of 'OdblokujPrzycisk' function for possible reenabling of button (activating from deactivate state), which leads to previous or next subgallery from current displayed gallery
  - in that calling it's imposiible to guess which element with specified id was disabled, so the jQuery selector is based on 'value' attribute of that element
* slighty changed logic of function 'GenerujPodstronyGalerii'
  - created new variable to count the subgallery links
  - if there is any subgallery the displayed is changed text of subheader and two buttons, which lead to PREV/NEXT subgallery 
  - using new variable as a differentiator, which conditionally shows the all subgallery links only when they was count as two or more occurences
  - also a short subheader is placed between buttons PREV/NEXT and direct links
  - removed unused variables and comments which was used only for inform and loging of position of main container for current gallery before and after the notification of loading content was displayed
  - the idea of sliding the visible fragment of page to the top by little is dead, when the notification is closing and dissapears 
* used the common style rules to clean of white spaces (no extra spaces, irregular tab keys, aligned assignment statement, etc.)
  
[F] FIXED

-- witryna.js
* fixed the problem of inactive button after unsuccessful request
  - no difference it was real error or simulated one
  - added another selector for reenabling disabled button
  - one of PREV/NEXT buttons might be disabled because of used range, so the 'value' attribute is used to select the other-and-better-one and activate it
  - the logic looking for both button groups which lead to given requested subgallery (both elements use different selectors, more complicated is used for PREV/NEXT buttons) 
  - added also a requested fix for dispalying only direct subgallery links (precisely and properly: buttons), when there is more subgalleries than two or three
  - used two as the optimal value, because there is a possible one-click-way which directly leads to second, third or any listed gallery 
  - fixes: #57 - 'Problem with repeating the BACK / NEXT button actions for viewing the subgalleries for current gallery.'

---------------------------

v0.5.38 - improved status of AJAX belt, display elements in each line on narrow screens; (reopened issue #48 for update 'v0.5.34') 

* v0.5.38 -- [2019-09-15]

[+] ADDED

-- zlobek-styl.css
* added three new selectors for three element, which styles is reset on first media query threshold (on screens wider than 320px)
  - all of them are placed inside AJAX status notification (AJAX belt)
  - targeted the inner container and its two internal elements type
* first element is an inner container with selector: '#odpluskwiacz_ajaksowy div:first-child'
  - added right padding to be at least 55px from the appropriate notification element (decreases the inner containg size for any inline elements placed inside in such a way that closing button is placed next to that content)
  - reset the top padding to 0px (previously it was vertical size of closing button-like element  -- now displayed next to)
  - added also a lower padding bottom just for better visual of the whole notification element (not 1em just 0.2em) 
* the second selector is connected to the any button element of AJAX state element
  - selector: '#odpluskwiacz_ajaksowy button'
  - most important changed for 'inline-block' display, also reduced the width to 'auto'
  - for visual reception added some padding on top and bottom, so the two buttons lokks almost the same like others on a page
* third selector is conected with 'label' element, so it changes back it as inline type (uses 'display: inline-block' precisely and negates the 100% width to 'auto' value)
  - selector: '#odpluskwiacz_ajaksowy label'
  
[*] MODIFIED

-- index.php
* altered the label text inside lower form
  - current text is 'Numer podstrony listy galerii' instead 'Numer podstrony spisu treści'
* renamed to 'proper' the text content of button inside footer, which fires 'AJAX Simulation'(R)
  - no more joke-spelling content
  - changed also the id of this element for proper spelling 'symulacja_button' from joke name
* trying to altered the place of div with id 'debugger_zamykanie' inside 'div' element with id 'odpluskwiacz_ajaksowy' to be first element not the last inside its container
  - the existing place is OK, only on narrow screens there was problems connected with the elment order (not the same order as displayed)
  - order depends also from the browser vendor, is diferent in IE and e.g. FF
  - implication on keyboard navigation, leaved the intention of change for better usability!
  - just altered the closing tag of 'h4' element inside code (not really implication on content)

-- zlobek-styl.css
* renamed the selector for 'button#symulancja_button' to 'button#symulacja_button'
  - resigned from the silly name (kind of joke)
* changed selector for inner container of AJAX state notification
  - from '#odpluskwiacz_ajaksowy div:first-child' to '#odpluskwiacz_ajaksowy > div:first-child'
  - also for purpose of easy change the HTML order inside this container, especially for closing element
  - without the changes the styles refers to closing component not a inner container!
  - solves the problem of selecting now and any later ideas could help for better usability or just keyboard navigation)
  - also added basis style, a top-padding of size the absolute positioned button + few px (set 60px, so the button always is in the top of the notification on narrow screens)
  - also added little padding at the bottom, which is changed by next media query threshold (from 1em to 0.2em, but it's relational, based on font size)
* changed the block style for displaying buttons and notification inside AJAX belt (with included 100% width) 
  - used in the most narrow screens only, next media query thereshold changes it for inline as defaults 
  - added some attributes for breaking the words or wrapping the text to another line (a set: 'word-wrap', 'word-break', 'white-space: normal'
  - and also added some margins above and beneath the basic style (only for button basis)
* altered also the label element inside AJAX belt to be 100% wide and block type
  - only for basic style to be similar to two above buttons
* altered the behavior of element with class 'status_ajaksa', which shows actual GOOD/BAD simulation state inside AJAX state notification belt
  - on super narrow screen this element text content is breaked and moved to the next lne (the same as buttons below) 
* removed few unnecessary white characters (spaces, tabs, indents, etc) 

-- witryna.js
* renamed the selector for defined event function of click
  - no more "$('#symulancja_button')" because renamed the id of taht element to 'symulacja_button'
  - unnafected the logic just simple rename, mentioned inside oter project files
* altered the minimal value in pixel for 'h3' element of header
  - now the lower ranged is 9px instead 7px before
  - just slighty better readability (if reading a few pixel high font could be easy and nice)
  
[F] FIXED

-- zlobek-styl.css
* added a changed basis style, if screen width not exceeds 320px
  - improved the previously update/commit of status of AJAX displaying in one line (connected with update 'v0.5.34') 
  - not changed the structure of element belt, done by CSS styling
  - the same size and similar looking elements inside this AJAX belt (mainly a block level displaying for two buttons and status notification element, which makes them similar)
  - achieved the same look for all almost every button elements on narrow screens
  - fixes: #48 - 'Displaying the AJAX status bar.' (reopen!)

---------------------------

v0.5.37 - v0.5.37 - better UX when loading next subpage notification is displayed inside button, no wrong centering or altered shape of the button, no empty line also inside button static text

* v0.5.37 -- [2019-09-14]

[+] ADDED

-- index.php
* added new 'aside' element for 'semantic use' of sliders and also  semantic use for 'div' element, like HTML5 instructs.
  - this description explains the values of the sliders, why they are reversed for each other
  - 'float' attributes are used, each sub-span-element uses special class, which defines placement inside parent 'aside' element
  - changed both the sliders same way, by adding this little explanations 

-- zlobek-styl.css
* defined new 'lewy' class which only purpose is to arrange element on left side of its conatiner using 'float' attribute
  - a general purpose class
* the same idea but reversed logic used inside new class of 'prawy'
  - places the any element inside right border of its parent container
  - builded with intentions of multi purpose class 
* created another and the same selector after multiple existing for loading notification 'h2#zaladuj_galerie_spis.animacja img' for modify specified attributes of inner notification of loading
  - this is smaller notification, so put there the rules of limitting size of graphics (used pixel and em units respectively)
* defined also inversed style, when element is not animated and od course not shoved
  - uses selector 'h2#zaladuj_galerie_spis img' (no 'animacja' class inside 'h2' element)
  - the most important is hiding the element and total decreasing its size to 0px in each axis 
  - also for performance reason is very important removing rotating animation (invisible image can rotate all the time without that!)
* created also the style for shoving and hiding the place for eventual displayed current request inside the button (if multiple request were send)
  - showing uses selector: 'h2#zaladuj_galerie_spis.animacja span' and is just for displaying the element (even if it's empty); another rule also reset the size of text for text size of parent
  - hiding selector 'h2#zaladuj_galerie_spis span' which hides the content and squeezes the area where text could be displayed (defines also 'text-shadow' and connected 'transition' property, which works fine later, when any content is displayed)
  - added extra selector 'h2#zaladuj_galerie_spis:hover span' for better UX

[*] MODIFIED

-- index.php
* removed all the white characters inside loading next gallery subpage loading button
  - connected with h2-element-button-like with id 'zaladuj_galerie_spis'
  - removed all spaces between elements because all of them are inline elements!
  - it's so hard to style this element type when screen size is unknown, and the size of an element is determined by its content
* altered 'scr' attribute of an image, which is a part of inner notification of loading (mentioned above)
  - replaced the previously empty value by the same path like has any other loading notification (not hardoced inside JavaScript function but added from of the same beginning) 
  - the styles will show or hide this image, driven by JavaScript logic

-- zlobek-styl.css
* altered the 'transition' attribute for element with id 'zaladuj_galerie_spis'
  - a listing of all four changing attributes instead 'all' value
  - the same values used each time
  - a more efficient declaration variant of two step animations
* created new styles for sliders indicators (interprets their directions)
  - placed just before sliders and above them 
  - used another block level container each time for not use class specifity
  - used 'aside' element as a container and a 'span' tag for text markers with little horizontal padding
  - each slider marker is connected inside HTML with specified class, which describes floating behavior (left or right side)
* changed the behavior of the animating notification inside button
  - used specified parent class as a differentiator, not a class of specified element which is animated
  - this way at once another element inside button might be styled
  - selector changed from 'h2#zaladuj_galerie_spis img.animacja' to 
'h2#zaladuj_galerie_spis.animacja img'
  - in this multi selector commented out attribute 'vertical-align'
* used the same style for rules (no space or spaces betweeen value and semicolon)

-- witryna.js
* modified the expressions inside function 'PokazAnimacjeLadowaniaDlaPrzycisku'
  - no longer operating directly on image element but its parent
  - the differentiator class moved up to parent container (a semi-button-element), which controls the behavior of its elements by defined rules of CSS selectors
  - this way at once is possible to control both image and the text content, by displaying the given element or not (and also something more)
  - just adding or removing a class for button-like-element to manipulate its visible content (in simplification)
  - any direct operations on parameters of used 'img' or 'span' element is no longer needed, so the function can simply operate on the parent element by adding/removing given differentiator class (CSS rules do the rest)
  - the hardcoded path to image is no longer needed, the image is controlled by CSS (and initially not displayed, just JS logic is for that)
  - so moved for now old code of conditional logic into comments and writed out simplified versions, which operates on given class name (here 'animacja')
  - no more direct operations on 'img' elements, a much simplified logic by parent class and cooperation with new CSS rules
* the same idea but opposite logic used inside modified function 'UkryjAnimacjeLadowaniaDlaPrzycisku'
  - also replaced the manipulations on 'img' element to altering its parent element; replaced all syntax to use the button-like-element and created CSS rules
  - that way simplified the code and improved the application
  
[F] FIXED

-- witryna.js & index.php & zlobek-styl.css
* fixed the inner notification of loading content for next subpage of gallery list
  - the image inside button notification was the problem of unwanted restyling of the button
  - slighty impact the 'span' element and its height of 'font-size' attribute
  - it added the extra vertical padding, not centered text content due to the negative margins, and with square empty dimensiuons it breaks the shape of the whole loading button, when it was invisible (it occupied the same area no matter is visible or not)
  - needed the squeezes the all inlin econtent, because they are inline elments (so hard to do by styling, when dynamic content is in use with many screen sizes)
  - fixes: #54 - Problem centering the content of the next subpage loading button for the gallery list'

---------------------------

v0.5.36 - conditionally displayed notification of loading next gallery list subpage inside a button, displays only when selected subpage list is visible; reversed the horizontal direction of slider for selecting gallery number (the same logic of newly/older, inverse display)

* v0.5.36 -- [2019-09-13]

[+] ADDED

-- zlobek-styl.css
* added a new default state for not displaying rotating animation of loading content
  - selector: 'h2#zaladuj_galerie_spis img'
  - needed for 'static state' to not showing that element on initial stage
  - only when something will happen in the background the element will be shown with rotating animation 
  - differentiator is displaying the selected gallery subpage, which is inserted between area of loading button and the displayed area of notification (some content in the vertical area,so the notification might be scrolled to the invisible upper area of displayed window)
  - noticeable is a moving the text content to the left for the horizontal centering of the text of button when the extra elemements aren't displayed
  - the size of the graphic element was also limited by its maximum dimensions (the absolute in pixels and later for relational units, which depends from the current font size of current element of 'button-like') 
* needed also an extra class 'animacja' for enabing animation
  - controlled by JS
  - only if the section of selected gallery subpage is displayed the image inside button is showed and animated
  - done by functions of updating state 'PokazAnimacjeLadowaniaDlaPrzycisku' and 'UkryjAnimacjeLadowaniaDlaPrzycisku', which shows, hides or just updates the actual state of loading next subpages of gallery list
* due to more content inside button increased the size of the button-like element
  - possible displaying counted requests and animation of rotating image of sun into the button, after its pressing
  - selector: 'nav#spis_sterowanie h2#zaladuj_galerie_spis'
  - increased 'max-width' from '16' to '18em'

-- witryna.js
* defined new function 'PokazAnimacjeLadowaniaDlaPrzycisku' for showing the actual state of the loading next subgallery notification
  - a notification is dislayed inside button-like elements, which initiate the loading by its click  
  - displays the same image, which will be rotating
  - if were requested more than one subpages at one time by multiple clicks on that button, then the notification also displays this current number of requests (in 'span' element, just after that rotating sun image)
  - this function also updates the state if clicked a given button while any request was going on
  - uses the conditionally logic from function 'PokazRamkeLadowania', where is launched
  - displays the same number as previously mentioned function, but not above 'button' only inside that button-like-element
  - added extra condition to only display button-inside-notification if any selected subpage of gallery list is displayed for not displayed the same notification near both elements (and not confused the user by the two moving animations and eventual two number near of it)
  - so on the start there is no possibility to display inner notification before any displaying of selected subpage from gallery list
  - new function uses ':visible' pseudoclass and adds a specified class 'animacja' to notify that now new inner content might be presented inside load-button (at first run!) 
* declared new function 'UkryjAnimacjeLadowaniaDlaPrzycisku' which is the inverse of function 'PokazAnimacjeLadowaniaDlaPrzycisku' previously described
  - general purpose is to update or remove the notification from the inside of button
  - it updates the state, when the request is finished, so if the total request number is more than one than will be just decremented (like it parent function 'UkryjRamkeLadowania' works)
  - but there is no next active request the whole notification disappear
  - after hiding a notification the attribute 'src' is removed and the additionally class 'animacja' is removed form 'img' element  
  - it prevents the empty content to be still increased the size of the button-like-element (a problem may be visible in older browsers, which don't remove 'img' element form DOM, when its attribute 'src' is empty or not exists!)
  - tested the notifications on many situations in many web browsers, works prefectly fine

[*] MODIFIED

-- index.php
* trying to replace the notification of loading content for next subpage
  - not good solution when element with selected gallery subpage is displayed in beteen of the all already displayed gallery subpages and the next gallery subpage
  - the notification of loading for next gallery subpage is irrelevent for the area, where the readed content is plaeced
* decided to add an extra loading notification inside a button which fires that notification and contents also
  - on initial state the rotating sun is not displayed or even animated, because it needs a displayed element with content of selected subgallery page of gallery list   
  - only when something is displayed or even prepared for displaying the  button is animated and has extra content (actual counted requests on each pressing)
* prepared the structure for above, to display another data inside a button
  - added empty 'img' element, without 'src' attribute and also an empty 'span' element within 'h2' element of id 'zaladuj_galerie_spis'
  - 'src' attribute value replaced by later logic of JS, which also changes the numeric content of next 'span' element

-- zlobek-styl.css
* modified default state for all animating notifications of loading contents
  - just few attributes of centering image content on vertical and for adding little space when displayed (space between text and rotating graphic) 
  - added a visibility by default
  - modified the selector lists, now each on its own line and with new selector 'h2#zaladuj_galerie_spis img.animacja' (mentioned in 'added' section)
* modified the direction of slider for selecting any gallery number form given range
  - now value on the left is newer (and higher) than a value from the right side, which is lower and older
  - some kind of similarity with next slider, which position on the left refers to the newer value than from right side
  - above is behavioral similarity, no visual (mirror differences)  
  - selector for top slider: 'div#selektor input#suwak_galerii'
  - just a 'direction' attribute with 'negative' value 'rtl' for Western people
  - trying also the vertical transforming for slider but it isn't 100% reliable for older browsers   

-- witryna.js
* modified the function 'PokazRamkeLadowania' by adding another call for newly created function 'PokazAnimacjeLadowaniaDlaPrzycisku'
  - the general purpose is to show an extra loading notification inside a button, which fires that notifiaction
  - fires only when 'spis' variant is active inside interal switch statement
  - any checkings moved inside that fired function
  - any actions are taken only when internal condition is met (is displayed another element?)
* the same reverse logic is used in modified function 'UkryjRamkeLadowania', which fires newly defined function 'UkryjAnimacjeLadowaniaDlaPrzycisku' only when loading action connects with 'spis' variant of internal switch statement
  - general purspose is to update or delete the displayed notification inside button, which loads next gallery subpage from full list
  - as a mirror function for showing, with negative consequences

[F] FIXED

-- witryna.js
* not changed the place of displaying notification of loading next gallery subpage (read the notes of 'modified' section for 'index.php' file)
  - kept the original place of notification (at the place, where new content will be added)
  - added new place for the same notification when any selected subpage from galery list is displayed 
  - the same animation and request number (if exists) is shown when high element between button and current notification is displayed
  - just to not confuse user of the site by two notifications for the same purpose
  - tested on many conditions and after updates works fine and displays the same values inside button as in standard notification 
  - fixes: #52 - 'Location of the notification about loading the next gallery subpage'

---------------------------

v0.5.35 - improved browsing of the current gallery and its sub galleries; subgallery buttons centered

* v0.5.35 -- [2019-09-11]

[+] ADDED

-- zlobek-styl.css
* set the centered text content for the navigating subgallery (a list of buttons inside element with 'container' class)
  - selector: 'nav#nawigacja_galeria > div'
* added styles for new PREVIOUS/NEXT buttons to change subpage of current gallery
  - to purpose of making it big and noticeable for easy click and traverse thru any subpages of this gallery (if there is any)
  - the same styles as buttons of footer 
  - selector: 'nav#nawigacja_galeria h6 button'

[*] MODIFIED

-- zlobek-styl.css
* added some padding to the container for buttons inside footer (element with id 'przyciski_stopka')
  - only 0.75em of top paddin for visual sepeartion and easy click of footer buttons or the subpage gallery button above

-- witryna.js
* modefied the logic of funtion 'GenerujPodstronyGalerii' to display PREVIOUS/NEXT buttons for any gallery which has any subpages
  - PREV/NEXT button displayed before any generated subpage link (button correctly)
  - create two new variables as objects for holding the state of every two button
  - the atribute list corresponds to necessary attributes of given button (displayed text, active state) or has extra data attributes like any direct subgallery button (its subpage number and part of URL for that subgallery)
  - added a code inside the same loop for counted which element should be previous and which next for the current one
  - using that logic a button-object are changed, so it's can store gallery numer and part of its URL address)
  - if previously mentioned attributes has changed then rest of the button attributes is conditionally changed (its title and active state) and code creates the buttons inside memory 
  - buttons elements created as jQuery objects with HTML parameters (look at detailed attributes and their values)
  - now buttons are inserted into the DOM, just before direct gallery subpage buttons (greater and always above the regular subgallery links)
  - depending from chosen subpage number or the total number of subgalleries the displayed result might be different
  - connected with 'fixed' section of this update
* created also an empty table for collecting any direct subgallery button
  - only after the loop ends this table is inserted at once with one or several items
  - much effective than inserting into DOM each button at end of after each loop (now collecting is used instead inserting) ;)
* the same event logic used as for any subpage button click!
  - nothing new created for serving 'click' event :)
  - the same class used and inside the same container (event delegation!)

* commented out an expression for element with selector of '#glowna div#komentarz' because it's no longer exists

[F] FIXED

-- witryna.js
* modified the code of displaying buttons
  - added new elements with previously changed logic of function 'GenerujPodstronyGalerii'
  - uses the same event as any direct subgallery (subpage) button
  - tested on many subgalleries and corrected any bad logic
  - just little CSS correction for displayed centered tecxt content
- fixes: #50 - 'Improved browsing of the current gallery and its sub galleries'

---------------------------

v0.5.34 - AJAX status bar: content & buttons; one line status on narrow, later the same like it was (because good & simple); closing button moved by ONE px

* v0.5.34 -- [2019-09-10]

[+] ADDED

-- zlobek-styl.css
* added new style for buttons inside AJAX status bar
  - selector: '#odpluskwiacz_ajaksowy button'
  - added block-like displaying (important, not to be inline element!) and just a little margins from top and bottom 
  - used to scale the width of the whole belt by dynamic content holded in one row (because is less high when all the elements are in a row and it's similar to the height of the closing button)
  - another explanation: the button is the highest of all the elements in a container, when the all elements are in one line, so it sets rthe width of the main element of AJAX status belt 

[*] MODIFIED

-- zlobek-styl.css
* changed the basis of displaying status of AJAX, an element with class 'status_ajaksa'
  - now it's block element and after first media query threshold at 320px it changes to previously defined 'inline' (correctly: previously defined 'inline-block', but it's too high in comparision to next buttons)
  - changed vertical paddings from 0.35em to 0.6em
  - added little margins from top and bottom, only a 0.2em
* not needed to change place of closing item-like-button on each or on selected screen size
  - selector: '#debugger_zamykanie'
  - right top corner good positioned while height of a container is greater 
  - lowered just by ONE pixel to the left and TWO from the top inside general rule (previously it was 4px on each mentioned side) 
  - content of the AJAX status belt is always higher by few pixels than before
  - no very visible fluctuations of the height of the whole AJAX container and its impact on perception of changing position of closing button
  - very slim bottom gap under the closing button is visible at few dozen pixel, in range 600-800px (depends from browser)
* added few comments for save previous values of attributes or to explains new values

[F] FIXED

-- zlobek-styl.css
* AJAX status bar 'doing by trying'
  - its hard to do anything for super narrow screens, rather a tests of displaying and not for standard use
  - previously layout was preserved and is rather good by its simplicity
  - more structures and more CSS for better positioning effects, JS might be good also for building another structure
  - trying to surround the interactive elements to controlling their position, but on super narrow screens thats another problem  
  - just a simple change of the width of the proper status bar (with 'status_ajaksa' class) on smallest screen size
  - not changed the size of the buttons because it will kill the simplicity
* not changed AJAX status bar closing button into the same style as closing of notification error (if exists with closing button) 
  - another dimensions, error notification title belt is always bigger and has more height (so the rectangular shape of a button fits better)
  - here a rectangular button might be floating on belt or even its fragment might be outside of its area (only bottom side)
  - still used square shape, but slighty increased height of the whole belt container, by few pixels to better fit the closing button always inside its parent (absolute positioning!)
  - also the closing button won't need the positioning on each media query (just few px changed off its absolute position) for better displaying on almost each size of displays
* fixes: #48 - 'Displaying the AJAX status bar.'

---------------------------

v0.5.33 - buttons of page improved on narrow screens, on super narrow too; no overlaping of the error notifiactions

* v0.5.33 -- [2019-09-08]

[*] MODIFIED

-- zlobek-styl.css
* buttons are 100% width of its container
  - a wrapping text content if longer text than available width
  - changed all et
* changed the rules for attribute 'display'
  - value of 'initial' is not recognised properly by IE browsers, used the 'inline' context for previously defined 'block' values for any declared element
  - changed mainly for global class definition 'szerszy_guzik' and buttons of footer area
* altered the place of define for selector 'div#selektor input'
  - moved up for connection with another definitions of input form elements in neighborhood
  - a standard 'input' element for forms
* defined a basis for styling the button on narrow screens
  - uses the same rules for both selectors for standard input button and the submit button (mainly for the same width)
  - used both selectors: 'div#selektor input[type=button]' and 'div#selektor input[type=submit]'
  - the most important is to allow a line break or even a word break, when text content (correctly: a value of parameter named 'value', exactly!) of the button is larger than a place to display
  - the text content may break to two or more lines or even break a word!
  - so three extra CSS attribs are needed ('word-wrap', 'word-break' and 'white-space') and theirs correct values (in this project meanings)
  - it's possibkle to squish browser window to minimal width to observe strange looking high buttons (below 200px or even 100px width) 
* moved to comments few selectors ('div#selektor input[type=button]',     '#suwak_info > div input' and '#suwak_podstrona_info > div input') due to rearranged content of flex elements (on wider screens)
  - not needed declarations when flexbox is working
* added a compatibility with super thin screens to 'button' elements of footer
  - new attributes of selector 'footer#stopka button' for breaking the words to another lines
  - also decremented the default padding to 1em for horizontal space (before was 2em)
  - the wider padding of footer buttons works fine in defined media query new rule (2em as the value of first threshold, like the previously defined value)
* redefined the style for the last 'div' container of element 'div#wybor_galerii'
  - uses also the same rules for selector for last 'div' container of 'div#wybor_podstrony_galerii'
  - removed the minimal flexbox item width from the basis style (no more 250px of basis width when mobile -first) 
  - the selected basis works for widths of screen more than 320px, by definition inside first media query threshold
  - if possible on widths less than 320px the 'incremement/decrement' block might be next to 'randomize/submit' buttons (depend from the browser and operating system, which allows decreasing browser window width below 200px; most of developer tool allow to that as the simulation of displaying content for selected width)
  - below it's possible because the last group of buttons lost its minimal flexbox width of 250px (as a basis width, added after exceeding 320px by screen size inside media query) 
* increased the bottom margin of each error notification
  - changed 12px to 2em for better experience on narrow screens
  - also more 'breatching room' on wider screens
  - more units, should work better even if value of a unit is changing
  - yes, dynamic values based on relative units == current font size matters on each used media query threshold (only if font size is changing)

---------------------------

v0.5.32 - not as wide buttons on narrow screens; proportional logo 

* v0.5.32 -- [2019-09-07]

[*] MODIFIED

-- zlobek-styl.css
* moved any styles of button elements and inputs of that type with minimum width into media query
  -trying to achieve basic style of input element, which fills the 100% o the its container on mobile-first look
  - aded the 'display: block' and 'width: 100%' to any button elements
  - changed the 'display' property to 'initial' or 'inline' on first media query threreshold of 320px
  - used main containers as ancestors ids for picking only selected descendant input buttons or regular button elements
* works fine for the most of buttons inside selecting form and inside footer
  - the submit buttons and input buttons with more text for future re-check (strange behavior below 190px if possble to narrow browser window for that)
* added few comments connected with changes (explains or saves previous values of used attribute)
   
[F] FIXED

-- zlobek-styl.css
* fixed the typo inside dimensions of div with id 'slonce_logo', which is a main logo background with animation
  - not '266px' but '256px' wied as the originasl background file (256x256px wide)  
* changed the basis rule of buttons inside footer and inside block of selecting any gallery numer of subpage number of gallery list
  - basic style with 100% width of its container and 'display: block' property
  - changes of above default attributes are inside first media query, when screen is 320px wide or more
  - much of testing the form look with proper attibuted and theirs values
  - probably for future re-testing, because screens narrower than 190px not always shows the butons wih more text context  
(but it's hard to tight window of popular web browsers below 200px, only some dev tools allows that)
  - fixes: #45 - 'Buttons on super narrow screens'
  
---------------------------

v0.5.31 - no flaws for inputed values inside numeric form fields, no zero problem, known circumstances of conversions: no octal vs hex vs decimal vs string
	
* v0.5.31 -- [2019-09-05]

[+] ADDED

-- witryna.js
* created function 'KonwertujNaLiczbe', which helps for any numeric convertion to decimal base
  - conversion for possible input string values (a text)
  - helps to convert to decimal base, if input is hex or octal notation
  - returns 1 as a minimal range safe value of if inputed value wasn't number

[*] MODIFIED

-- witryna.js
* uses a newly created function 'KonwertujNaLiczbe' wherever value is gained from imput fields
  - modified logic to use that function inside submit actions ('click' precisely) of both form buttons 'suwak_galerii_submit' and 'suwak_podstrony_submit' (cosmetic alteration order of assign expressions)
  - modified also the two 'blur event' functions to use that function (elements: 'galeria_wybrany_nr' and 'podstrona_wybrany_nr')
  - also added inside 'change' event of slider if any 'tamperer' tries to change its values (previously verification used not much on unproper values), used in elements: 'suwak_galerii' and 'suwak_podstrony'
  - this function adds another example of 'DRY' methodology used into the project ;)  
* fixed the problem of zero inside function 'NormalizujZakresPolaInput'
  - just small change of not used range, to join '0' value into this range
  - two times changed, for both serving input fields
  - connected with 'fixed' section of this update
* added some comments for changed or new logic

[F] FIXED

-- witryna.js
* fixed problem of converting numeric values from numeric input fields
  - using function 'KonwertujNaLiczbe' wherever any conversion from any fields form might place
  - added explicit decimal base value as a proper second parameter of 'parseInt' function inside function 'KonwertujNaLiczbe' body
* changed also the problem of converting 'zero value' put inside numeric field
  - just correction of range inside 'NormalizujZakresPolaInput' (mentioned in 'modified' section)
  - fixes: #42 - 'Verification of converting values from numeric fields'
 
---------------------------

v0.5.30 - correction of submit buttons of TWO forms, of selection any gallery number or separate SECOND form of selecting subpage number from gallery list; cleaning the 'index.php' file from placed logic of JS and PHP; swithced scripts; slighty thinner forms

* v0.5.30 -- [2019-09-02]

[+] ADDED

-- index.php
* created new 'form' element for choosing gallery subpage from an existing list of subpages
  - new id 'wybierz_podstrone' and any needed attributes
  - used to wrap all the existing form elements, which are for selecting given subpage of gallery list (as master parent of this part)
  - connected with 'fixed' section of this update

-- funkcej.php
* created function 'Czy_serwer_localhost' to check if current server works at 'localhost' (concluding 'localhost' as still 'development environment', not 'production environment')
  - based on a logic from taken code
  - just few altering, to build a function with return value
* created function 'Czy_bylo_przekierowanie' to check if link to server comes from external site or from here
  - based on a logic from taken code from 'index.php'
  - return true / false value, after few alterings

[*] MODIFIED

-- index.php
* moved part of php code from the first php block into file 'funkcje.php'
  - created there functions from moved logic
  - only the callings of that new functions left 
* redefined elements of selecting any gallery number or any gallery subpage form gallery list
  - altered 'form' element to be a valid form only for upper part of existing selection structure
  - created new form with new id, to wrap all the elements of the previously lower part of selection structure
  - some indentations might had changed
  - see 'fixed' section of this update
* changed the order of external scripts tags
  - moved the script element of 'lightbox' up, just before conditionally generated 'script' tag of 'witryna.js' (generated by php logic)
  - needed do this, beacuse now inside 'witryna.js' is placed code which previously was inside internal 'script' element
  - 'witryna.js' uses an object of lighbox which was defined and linked later, so the conflict with non existing object was close!

-- zlobek-styl.css
* removed unused selector 'form#wybierz_galerie' with empty rules
* renamed each selector, where selector 'form#wybierz_galerie' was used as ancestor
  - replaced all 'form#wybierz_galerie' selectors to a 'div#selektor' 
  - a 'div#selektor' is an ancestor for a 'form#wybierz_galerie'' element used to keep all already declared styles (about dozen selector counts)
  - tested, repaired and ... many times re-tested 
* previous changes needs alteration of media queries also
* little alteration of the width of the selection forms container
  - changed the 'div' element with id 'selektor' on mid sized screens after 940px threshold
  - slighty narrowed width, changed from 99% to 97% of width of its container
  - better look on wider screens

-- witryna.js
* inserted the whole content from internal script of index.php file
  - only one expression, placed as one line near end of the file content

[-] REMOVED

-- index.php
* removed last 'script' tag from page
  - the only internal 'script' element, without 'src' attribute  
  - moved its code into last lines of file 'witryna.js' 

[F] FIXED

-- index.php
* fixed selecting subpage of gallery list by pressed Enter inside input box
  - rebuilded structure of existing form
  - new 'form' element needed, exactly for that few selection elements of lower part (from previously exiting form for the all elements)
  - **'Enter' key reffers to FIRST encountered submit button of a given form**
  - it was a given gallery number submit element, not submit button of given subpage of gallery list (even though it was more neighborly, and inside the same parent element)
  - ... but defined later in HTML as a __second submit button__ of a big form, and it can't be connected by default with given input field
- fixes: #41 - 'Problem with approving the selected gallery subpage using the keyboard.'

---------------------------

v0.5.29 - changed the already changed changes

* v0.5.29 -- [2019-08-21]

[*] MODIFIED

-- _changelog.md
* changed some early changes log to common style of this file of changes ;) 
  - trying to use the same style as *new* changes
  - changes were introduced on the earliest versions of log file, i.e. the project surroundings in versions v0.1.X
  - only this MarkDown like style content changed, which was introduced on first commits

---------------------------

v0.5.28 - showing less of debugging dump; initially hided elements or just hidden inside comments also removed; contents indented; CSS cleanings and removing unnecessary selectors & rules, towards the same code style

* v0.5.28 -- [2019-08-19]

[*] MODIFIED

-- index.php
* removed some old debugging content from php, which are displayed inside 'pre' tag in footer area (container with id 'pomoc')
  - the rest of the php printed variable values wil be removed soon 
* changed static text near this temporary content between elements
  - moved from regular 'strong' element to 'h4' header element
* removed the commented content of previously defined form fields, where user have to put working URL address to any gallery
  - input, two buttons and also few connected headers has gone 
* removed the commented contents of static text of disabled JavaScript notification
* above removings are here (and not inside 'removed' section) because no working content has been removed
  - just deletions on prepared to deletion and commented out content
* decreased indentation of 'div' element with id 'spis_tresci' and its content
* changed indentations for a lots of form elements, inside 'div' element with id 'selektor'

-- zlobek-styl.css
* removed that commented content, which no longer looks like it's needed
  - some old code, that is not used and replaced by new rules
  - or the long not used elements (see 'removed' section)
  - removed also commented definitions, especially with no defined rules
  - removed any comments not related to rules or selector, especially if there are between selectors
  - also the old commented out rules has gone, which was already replaced or another defined (especially indented rules inside comments)
  - removed already commented i.g. each repeated definition for '#wymiary' selector inside media queries, because now the first media query threshold defines excellent alignment for the all wider screens 
* CSS review and cleanings
  - trying to use the same unified style inside this file
  - removed unnecessary new lines (doubled or tripled), where are completely unnecessary
  - used one empty line space between regular next HTML items or CSS selectors
  - only an another groupings needs extra line space
  - changed opening curly brace to be in the same line like its selector
  - this brace goes to new line only at multiple selectors rule
  - on multiple selectors, each of them is inside a new line, and the opening curly brace is underneath
* moved up styles for internal debbuging of AJAX state, before definitions of animations and media query
* added indentations for each unused defined animation
  - extra comment added with updated name of the animation, which is used now
* changed some comments texts, added few words for better comprehension

[-] REMOVED

-- index.php
* removed the two unused elements with the same id of 'form_error'!
  - yes, two named identically until now 
  - a hiden content, which previously shown the simple error notification, when the value was out from given range
  - never used, no connected logic
  - now the sliders or numeric field is set to min or max by JS, when the input value is wrong (after blur or on submit event) 

-- zlobek-styl.css
* removed selectors for unused elements of old and simple notifications of errors, based on 'p' elemennts
  - got rid common style for error notifications: 'p.blad', 'p.blad_dolaczenia', 'p.blad_odswiez'
* removed selector for 'form_error' while its element is unused
* removed all defined styles for form elements, which previously was inside form with id 'wyszukaj'
  - deleted selectors and rules for: fieldset, text input, regular button of submit

---------------------------

v0.5.27 - better notification of disabled JS, uses common style of internal notifications for AJAX errors (from now its width slighty changed both way); initial hiding of dimensions and info notify; removal noJS notify, not removing informational notifications; TODO: 'display: none' vs animated contents; removed old commented CSS

* v0.5.27 -- [2019-08-12]

[+] ADDED

-- zlobek-styl.css
* created rules to initial hide of displaying the temporary informational notification and another element of displaying the the current size of browser working area
  - useful when JS is disabled
  - used with conjunction of main ancestor, of its special class 'brak_js'
  - selector of notification: 'brak_js div.powiadamiacz'
  - selector of area notification: 'brak_js div#wymiary'
  - attribute 'visibility' is used with 'hidden' to not display the elements
  - but the regular positioned element of info notification always occupy its place, even it's invisible!
  - added rule 'display: none' to informational notification to complete hide it, but its content can't be properly displayed and animated from now!
* remove above problems for better solution... ASAP!

[*] MODIFIED

-- index.php
* redefined error notification of disabled JavaScript
  - used the defined element structure and styles from defined inner error notification system
  - comented out the old notification
  - moved the text elements of notification into new structure of notification
  - its only a text in better structure element, cannot use any interactivity or any logic of JS, because it disabled!
  - achieved better UX and overall same style of notification
* moved 'div' element of id 'wymiary' inside main element of page 'witryna'
  - to achieve initial hiding that element by CSS, when JS is not functional in browser 
* added comment inside internal 'script' tag
* slighty changed the few words in comments or moved it to another line 

-- zlobek-styl.css
* modified the width of any error notification element of class 'blad' from 90% to 94% inside base style of element
  - better area usage on very small screens
  - but altered the width of error notification on media query threshold, when wider than 470px (limits the error notification to 88%)
* modified 'the standard look and behavior' the element of informational notification
  - element is visible only when JS is working
  - removed previously defined rule 'visibility: hidden' 
  - restored property 'display' to 'block' and 'visibility' to 'visible' value due to newly added initial hiding of ancestor class 'brak_js' 
  - conflict: added comment notification of not displayed inner belt, which 'width' attribute should be animated after the element started to be visible on the page!
* the same logic of CSS initial hidding used to restoring visibility for element of id 'wymiary'
  - value of 'visible' placed into rule of its own selector (no dependency of parent class)
* removed all stylish rules from main element of notification for disabled JavaScript, id of 'brak_skryptow'
  - got rid background and border color definition
  - remains rules only for 'display' and 'padding' property
  - but the padding values changes from  '1.5em 2em' to '1.2em 0.2em'
  - correction is needed because padding values are to big on small screens (added an extra comment for that)

-- witryna.js
* changed expressions inside function 'InicjalizujCSSzAktywnymJS'
  - now the working JS will remove error notification of disabled Javascript from the DOM, previously hided by CSS rule
  - added comments inside this function
  - put into a comment a previously code, which make visible the element with id 'wymiary' (now CSS do it automatically, so commented it also)
* alterations inside function 'PokazIUkryjPowiadomieniaOOdwiedzinach'
  - break changing style of element onto two expressions to gain a 'gap' between jQuery changes of selected attributes
  - also to change the 'width' attribute lastly, after set transition parameter
  - for test purposes disabled the removal of informational notifications from the page, it's just hided 

[-] REMOVED

-- zlobek-styl.css
* removed selector 'div#brak_skryptow h2' for previous notification of disabled JS title style
  - now unnecessary, because new definition uses style for an error notification of AJAX
* removed unused selector for distinguish current gallery title or number in gallery details
  - selector: 'div#glowna div#nazwa_galerii h2 span' 
  - and its dependent pseudoelement: 'div#glowna div#nazwa_galerii h2 span:after'
* removed commented and not used for a long time group of rules inside few selectors:
  - 'div#spis_tresci nav#spis_sterowanie h2#zaladuj_galerie_spis'
  - ''div#spis_tresci nav#spis_sterowanie h2#zaladuj_galerie_spis:focus' (& ':hover' too)
  - 'div#selektor h2#selektor_naglowek'

---------------------------

v0.5.26 - information notification changed; trying to hide elements but proper empty area and animated content should be displayed later by working JS, by 'PokazIUkryjPowiadomieniaOOdwiedzinach', and finally removed; no meta-robots tag; redefined static texts of footer area

* v0.5.26 -- [2019-07-18]

[*] MODIFIED

-- index.php
* altered the text of variable to direct show, that local server is used, even if no redirection
  - value used in displayed information notification
* removed 'robots' meta tag, because its value is default, so the whole tag is useless
* added XML style ending to existing meta tag of description 
* changed the static texts which are fragments of both information notifications, about redirection and about last visit date
* rearrange the static text of footer area, mainly inside container of id 'poco'
  - broken text content of longer paragraphs into new shorter paragraph, which are separated by subheaders
  - trying to keep the logically context of previus longer description
  - the rule of short text for web content was applied
* altered some texts of paragraphs, subheadings or list items
* changed many comments for better explanatory content

-- zlobek-styl.css
* added hidden visibility rule to 'div' element of 'powiadamiacz' class (temporary visible notification)
  - needed some property to be initial hided from CSS
  - JS will reenable visibility for element but the area is constantly occupied by that element no mater of value of visibility!
  - 'display: none' is better for no-area but the elements inside can't be animated by transition when element is initally not displayed, so when JS reenable their content some of them will be invisible!	
* trying to alter the inner element of informational notification that way, to its occupied area will be empty and after showing its content will be full operate and be animated 
  - added block type display to belt of initial 100% width (rather this is not the right way...)
* removed few new lines or empty spaces or tabs

-- witryna.js
* renamed function 'UkryjPowiadomieniaOOdwiedzinach' to 'PokazIUkryjPowiadomieniaOOdwiedzinach'
  - just for right name, because now first expression from its body are showing the contents of selected and initially hided element, by changing visibility attribute (instead previously changing the display property)
  - changed also the behavior, now after the hiding animation the element is removed form the DOM structure 
* removed loging from function 'UbijReklamy'
  - the right effect is visible in browser, until the hosting find the new big ads
  - changed the name in invocation of that function, of course

---------------------------

v0.5.25 - conditionally loading of minified versions of resources (CSS & JS) if available; meta tags 'description' & 'robots' in head; better reenabling button & functions: 'UbijREklamy', 'GenerujPodstronyGalerii' & 'WystartujDebuggerLokalny'; removed dual-basic notify of error for next-page-loads; removed displayed 'localhost'; no seconds inside info notify; debug notes in footer surrounded by box

* v0.5.25 -- [2019-07-11]

[+] ADDED

-- new file 'zlobek-styl.min.css'
* a minified version of 'zlobek-styl.css' file
* for use on any external hosting (in 'production' environments) by conditionally generated 'link' tag, linked from 'index.php' file
* 49,8% of original file size, in the time of this update (w/o zip transfer)

-- new file 'witryna.min.js'
* a minified version of 'witryna.min.js' file
* for use on any external hosting by conditionally generated 'script' tag from 'index.php' file
* for 'productional' use
* 18,2% of original file size, in the time of this update (w/o server compression)

-- index.php
* added meta tags inside page head
  - added meta tag of 'description' to describe the page to searchers 
  - added meta tag of 'robots' but it's unnecessary when using default values of 'index, follow' and will be removed soon
* created a logic of conditionally linking regular or minified version of needed resource
  - used here for linking to a CSS file
  - firstly the server environment detects variant of server, if it's local or remote
  - depending this value as a differentiator, the external files are linked
  - used here with 'link' attribute, precisely its 'href' attributre value
  - a whole HTML element is built inside condition for simplicity, even if only a value of its attribute is changing
  - a php function 'file_exists()' is used in condition to determine, if specified file exists
  - if there is no minified file as specified, then the regular one is passed as a result of extra condition
* the same idea works for loading another external resources, which can be minified, i.g. another CSS files or 'scripts'
  - added new conditionally loaded script source, as main file of page logic
  - 'script' element just before ending of 'body' tag
* a lot less network traffic, less data to download

[*] MODIFIED

-- index.php
* modified stored time inside variable, now it's hours and minutes only
  - removed seconds because it's illogical from human point of view (it's too precisely specified time) 
* moved inside comment the debug notification of local server, which was displayed under the page header
* changed paragraph and added subheader just before place, where the debugging content is displayed (inside help section of footer)
  - no more silly text
  - all the content inside box wit container class, thich determines max width of that container
* altered some comments, indentations, new lines or ending spaces

-- zlobek-styl.css
* changed lastly defined rule for error description of any notification (screens wider than 940px only)
  - increased left padding from 9.5 to 10.5em
  - added extra comment inside rule

-- witryna.js
* changed selection of previously disabled button, when navigating on gallery subpage ('galeria_podstrona' variant)
  - invoked from inside of function 'WczytajZewnetrznyHTMLdoTAGU'
  - from now the simpler and better working form of selector is used
  - id of particular button is used with conjunction of its ordering number 
  - no more too complicated selector with class and element counting and substraction at the end (sometimes misleading!)
  - the same number used, which is taken from button extra defined attribute
* finally removed the old style error notifications for internal notification system, mainly for simulating Ajax requests
  - last place used was for displaying unsuccessful requests of loading next subpage of gallery list 
  - previously logic generated double notification elements for new error, with old and new style already defined
  - later defined notifications are better looking and working, so after many tests they should remains
  - moved the prototype of error notifications into the comment 
* slighty altered logic inside function 'GenerujPodstronyGalerii', where the subgallery navigation buttons are build
  - the number at the ending of each gallery button id is determined by value of passed 'href' attribute 
  - this number is not based on current step of internal loop  
* removed unnecessary condition from function 'WystartujDebuggerLokalny'
  - mainly removed that condition and returned to one level less of indentations for almost all of defined here functions
  - but changed also the logic of auto displaying of Ajax status belt, depending from the server environment ('localhost: T/F') or extra parameter
* expanded function 'UbijReklamy'
  - renamed local variable name from 'cbaReklamaBig' to '$cbaReklamaBig'
  - added condition to work if selected element was find
  - added new code to removal new wide advertisement on selected hosting
  - added loging statement to ensure that ad was here ;)
* put into the comment the invocation of function, which displays the sample of error notification for test purposes
  - just before commented out tested the longer text description and  layout with many new lines
* JS code review
  - added comments with current code description, if needed
  - fixed mainly infirmities of comments: typos, missing letters or words 
  - better indentations

---------------------------

v0.5.24 - info notifications with changed logic, now counting days of last visit and visit counter (also set in cookie); error notification text on right on wider screens; altered time of narrowing of belt inside info notification; a lot of debug info in footer area 

* v0.5.24 -- [2019-07-06]

[+] ADDED

-- index.php
* added the php code for counting the visits of the site
  - for now the plain number is set into cookie
  - define init value and some conditional logic if readed value form cookie is't right
  - after each page display or it's refresh, a counter of visit is incremented by one and new value is stored init cookie of 'zlobek_zliczacz'
  - also a two years of expiration set for this cookie 

-- zlobek-styl.css
* added new style for error notification description ('p' element inside 'div.blad'), when screen size exceeds 940px
  - no text wrapping around image-like exclamation by high left padding value

[*] MODIFIED

-- index.php
* changed the logic of referral link read, code inside first php block
  - conditionally check both values of server environment and if they are present then try to obtain referral address
  - if it's a local server, then referral string is pre and postfixed
  - a 'strpos' function catch: 'false' vs '0 <= value'!!!
* changed also the code of readed and created cookie, connected with last visit time
  - the time value isn't saved as it is, to save the value inside cookie it's substracted by ten million of seconds (a big number is an equivalent about 115 days)
  - when read this value from cookie, addition the same specified value is needed to retrieve proper value of time and date
  - yes, encrypted value is a better way but this is simple use of cookie
  - time and date values retrieved as previously on seperate variables
  - if inner condition about differention in passed time of last cookie set is met, then the total days value is computed and stored as an integer value, and the extra differentiator of this state is set (variable indicator for cookie and passed unit of time)
* just for debbuging and testing purposes modified the condition for showing info notification of site refferal
  - it's always true, no dependants from server environment
* if the cookie state variable is true, then the condition let displaying a message with previously visited date and time, your total visit number from and how long time passed since last visit in days
  - to goal is presenting that notification only when about one week has passed since previous page visit, but it's hard to change text that notification without tampering cookie value
  - visit counter is conditionally displayed if it's value is at least one (the text of notification changes)
  - so for now the condition of counted time is much decreased, only to a one minute to frequently displays of this notification
* added some variables and expression to display their results into  debugging content inside footer area (placed with other debugging code inside container with id 'pomoc')
  - generating almost all of server environment values to show the difference between browsers (mainly new vs old version, almost no differences between current products)
  - also printed some of inside conditional code values, used inside server processing this page
  - just for observing the state and correcting conditional statements 
  - all content here for future removal

-- witryna.js
* changed logic inside function 'UkryjPowiadomieniaOOdwiedzinach'
  - added extra condition for general safety and not for setting too low numbers
  - altered the formula of generated duration, based on given parameter
  - achieved little longer animation durations, when values are multiples of five
  - changed the passed value to 20 on function invocation
  
---------------------------

v0.5.23 - changed error notification of selected gallery, first stage of loading display; no displacements on page by error notification image; no overlaping between error notifications; info notifications touched: builded as common, separately animated belts, date and time separation in text; max width of notfication types; fixed: selected number of gallery in notification

* v0.5.23 -- [2019-06-28]

[+] ADDED

-- zlobek-styl.css
* defined new style for any 'p' element inside notification element with class 'powiadamiacz' 
  - centered text with little margin on top
* added new rules for error description ('p' element), inside notifier element of class 'blad'
  - the same 1em paddings from left and right side, and slighty less from bottom side
  - defined max height of 130px, which is always more than high of left sided exclamation (image-like element uses float left)
* defined new delimiters for width notifier element inside media queries
  - info notification can't be wider than 1100px (selector: 'div.powiadamiacz' on +1180px screens)
  - error notification can't be wider than 1200px (selector: 'div.blad' on +1300px screens)

[*] MODIFIED

-- index.php
* changed the expressions inside first php block, before HTML output
  - commented out starting of session
  - breaking formated date variable into two variables, separate for date and hour
  - easier use of separately date and time variables
* changed the structure of info notification
  - now each of notification element has class 'powiadamiacz', where the previously common style is stored
  - id of item is for targeting purpose
  - added static text inside 'p' element, that inform this notification will disappear after short time
  - using the two variables of time and date the text of notification is built easier    

-- zlobek-styl.css
* removed possible overlaping error notifications on hover
  - connected with every more than one 'div' with class of 'blad' 
  - changed bottom margin of error notification to fixed 12px instead 0.8em previously
  - on thiner screens problem might be visible, when the pixels from 'ems' shrinks
* modified the minimal width of container for an error description from 120 to 140px
  - this element contains also the image-like warning exclamation on the top (screens thinner than 470px) or rather on the left side of notify (wider screens)
  - fixed minimal height helps when the description text of error is short and/or there is no button
  - also that is always higher than the heght of the image-like warning, which is inside
* removed 1em right padding of 'p' element inside error notification container ('div' with class 'blad') for the basic style
  - this padding value is restored after screen reaches width of 470px
* removed selectors for two info notification but added here one common class of 'powiadamiacz' for that 'div' elements
  - removed selector 'div#powiadamiacz_przekierowania' and 'div#powiadamiacz_ciastka'
* redefined margins of semi-image exclamation inside each error notify on screens at least 470px wide (second media query threshold)
  - (selector: 'div.blad .blad_ikona') 
  - experiments with values, trying optimal fit by already defined values as percentage margins
  - decreased right margin to 3% from 7% previously
  - margin left also returned to 10% from 12% lastly value
  - totally removed bottom margins because the button after text content of error notofication was moved to the right!!!
  - but the worse was the moved gallery content to the bottom of the page - A TOTAL CHAOS AND DISPLACEMENT OF ELEMENT ORDER ON FIRST ROW OF GALLERY LIST when error notification is displayed!!!
  - standard problems of float, described it inside new comment
* some new lines or tabs might changed

-- witryna.js
* altered logic of function 'WczytajZewnetrznyHTMLdoTAGU', 'wybrana_galeria_rekurencja' variant, where given gallery number is passed to be displayed (first stage)
  - altered the default object definiotion, if not set any attributes by function parameter (here added attrib 'wybranyNrGalerii' with value of  1)
  - later this value is used to display given gallery number inside a title of error notification, as proper selected value in form field
  - an old error notification saved in comment just before changed function invocation
  - if any error occurs when loading that given gallery number ast stage two (after reading its subpage number and target address is gained), then the notification text is right presented, and fixed the closing parenthesis is removed from the target string
  - repaired the invocation inside event function when click on submit button with id 'suwak_galerii_submit', now contains new attribute with selected gallery number
  - connected with 'fixed' section of this update 
* changed the logic of function 'UkryjPowiadomieniaOOdwiedzinach'
  - now the each notification is treated separately, so the different animation duration of a decreasing width of belt is set to any of them
  - similar code is usede for each existing notification to differentiate the time of transition
  - a randomization to nearly 50% of given time from parameter for each element of info notification (time shortened by random value to max 50% original value of function parameter)
  - similar code as before, just separately generated with each notification info belt element
* code cleaning: added new comments, fixed typos in few of them

[F] FIXED

-- witryna.js 
* now error notifications contains selected gallery number, indepedently that was first or second error stage of loading selected gallery number
  - added extra attribute to passed object to a function to easy differentiate selected gallery number on each stage
  - used that number inside function for any purpose, mainly displaying of error
  - see first list element of 'modified' section of this update, inside file 'witryna.js' 
  - fixes: #37 - 'The selected gallery number is not displayed in the error notification'

---------------------------

v0.5.22 - info notifications about last visit and referral link address, animations of hiding, cookie of last visit; more debug info inside footer; better hiding site email address

* v0.5.22 -- [2019-06-27]

[+] ADDED

-- index.php
* few environment verifications inside first php block
  - read actual time
  - assigned 'true/false' to referral variable '$czy_z_przekierowania', depends from address referral value is the same like server name
  - a cookie is set with the name of 'zlobek_wizyta' with the current value of time, and a two years of valid this cookie at the end of php block
* later the logic verifies the values of variables '$czy_z_przekierowania' and '$ciastko_poprzedniej_wizyty'
  - if any of this variables is set then the notify is built, using different texts and variables
  - a 'div' element with id 'powiadamiacz_przekierowania' is conditionally built, which contains info about referral address
  - another condition check to built a 'div' element of id 'powiadamiacz_ciastka', which notify about proevious visit the site in the past (date and hour of previously visit is displayed inside)
* added displaying values of cookie and connected variables with this cookie, that might conditionally assigned when the condition of passed time is met
  - displaying under the already displayed values of server environment
  - test purpose only for debugging the conditions and assigns 

-- zlobek-styl.css
* added global style for 'span' elements, which are direct childern of 'h1' or 'h2' or 'h3'
  - easy differentiate by color, depending form each parent type
* added new styles for notification items, which are generated from php
  - the same style defined for two elements of ids 'powiadamiacz_przekierowania' and 'powiadamiacz_ciastka'
  - defined 90% width, light background color and noticeable blue border with rounded corners
* builded rules to style for negative progress bar with animation
  - defined initial 100% width but JS changes it to 0% after a page is shown
  - transition animation used to animate two state of this belt, between shorten it width from 100% to 0%
  - animated by transition proceed ten second long time, much longer than standard transition time    
  - linear time function used for exact animation of passing time
  - used also filter rule for IE 6--9 to achieve gradient effect in this older browsers

-- witryna.js
* defined new function 'UkryjPowiadomieniaOOdwiedzinach' for purpose of hiding the notification info by JS, which previously might by conditionally built by php 
  - passed parameter changes the duration time of animation in seconds
  - default is 5 seconds time
  - function changes given time duration of transition and belt width directly inside CSS for each belt of notification (for each of max two of notifications)
  - the same duration animation of transition is set for each belt element, so if there are two notification the showed animation is the same
  - setTimeout function is used for starting animation of hiding after given time (multiplying that time, because milisecond units)
  - at the end the whole notification or notifications element is hided by 'slideUp' animation
* added the invocation of 'UkryjPowiadomieniaOOdwiedzinach' inside auto run code block
  - set 10 second as animation time for now 

[*] MODIFIED

-- index.php
* changed the logic from first php block, before any HTML output
  - rebuilt conditionally check if specified cookie is set
  - checking value from cookie and if it greater than specified value then is saved into another variable to further display
  - comparing time used in previous conditional is set to be greater than 60s, which guarantee a good testing of showing an info notification
  - the finally used value of time shoul be much longer, about one week is to achieve (hard to test in local development that long period)
* added the correct ending tag for 'h2' element of the game rule, with class 'zasada1' ('/h1' prevously)

-- witryna.js
* altered the function 'OdkryjEmail' body
  - now the email address string is built by more puzzle elements (the protocol string is concatenated from more fragments)

---------------------------

v0.5.21 - testing status of server and its environment by php, preparation for cookies and saved data; experiments on internal notification system, a form of displaying an image element and notification text; flex container redefined in footer

* v0.5.21 -- [2019-06-24]

[+] ADDED

-- new file 'funkcje.php'
* a php file with a declared list of functions
  - for now only one function declared inside
* linked form main 'index.php' file

-- funkcje.php
* defined function 'Wyswietl_zmienna_serwera' which returns a string containing given value of variable from superglobal table of $_SERVER
  - returned value contains variable name of superglobals and its value (concatenation is used)
  - purpose of displaying given value with given parameter name

-- index.php
* new php logic at the start of file
  - linked to another file, where function definition are stored (for now only one function: see 'funkcje.php')
  - added php session initialization
* added some default values for initializing the few state variables
  - later the coditional statement changes their values if condition is met
  - tested for redirection, if the regerer link coming form external site
  - tested for existing specific cookie name, if it's registered inside browser data
* added special container for displaying status of php server
  - placed inside footera area, inside container of id 'pomoc'
  - displayed on demand when displayed container of id 'pomoc' by button click
  - created container static content and series of invokes of defined function 'Wyswietl_zmienna_serwera' to display given parameter value of used server and the name of specified parameter (long invocations list)

[*] MODIFIED

-- index.php
* modified init php block at the file beginning (see 'added' section)
  - renamed variable name from '$serwerLokalny' to '$serwer_lokalny' for all its encounters (php style)

-- zlobek-styl.css
* modified the right padding of error notification text description
  - a 'p' element inside a 'div' element of class 'blad' 
  - added bigger pading for better visual presentation
* altered all margins value for element of class 'blad_ikona' inside error notifier (selector: 'div.blad .blad_ikona')
  - testing the best selected value for positioning
  - but if any button might exists inside given notification, then itsn't anymore horizontal centered inside the whole notification element
* changed the selectors of flex containers, placed inside footer
  - new definition is needed when changed structure of the footer elements
  - new selectors based on pseudo-classes: 'div#pomoc > div:first-of-type' and 'div#poco > div:first-of-type'

---------------------------

v0.5.20 - static content rearranged, mainly in footer; game area rules also redefined; new CSS for arrangements; test notification is possible to close; longer page title @localhost

* v0.5.20 -- [2019-04-16]

[+] ADDED

-- zlobek-styl.css
* defined 'em' element which is directly inside any header (h1...h6)
  - the same one rule for listed headers selector
  - to purpose of font being bold also, not only standard italic
* defined the style for heade 'h2' and 'h3' inside game container of id 'gra'
  - for 'h2' set gold text and +60% bigger font
* defined the rules for game rules container, a 'div' with id 'zasady'
  - a positioning context for its content ('position: relative')
  - fixed heigt in pixels and hidden overflow outside its area
* defined CSS rules for first, second and third game rule inside specified classes
  - similar between each classes but another absolute positions and transform method 
  - (common rules, build pattern class?)  

[*] MODIFIED

-- index.php
* added dynamic variant of page title, when runs on local server then ' - localhost' is added to existing title
* renamed 'div' element id from 'reguły' to 'zasady' inside game area
  - also added some indentation to containing elements
previously (as first) in this group
* changed the presentation of main rules of the game
  - used 'h2' elements inside rules container, instead one 'h1' element
  - added new class to each existing 'h2' element of rules
  - different class name for each 'h2' element because class defines a position of its element (used here: 'zasada1' and 'zasada2')
  - there are only two element for now, but also three classes has been defined for now
  - positions are temporary, testing for a better places in progress
  - element of rules is being animated before it finally lands on desired place
* little changes in some block of text, subheaders or headers
  - redefined text content of footer
  - list elements reordered, few items added
  - slighty altered text of game rules
  - 'mdash' HTML character added instead regular dash 

-- witryna.js
* unblocked closing button for test run of test and default error notification, which is launched with each page refresh 
  - for purpose of easy get rid that content if no Ajax requests or any internal error notification are being tested 
* cosmetic changes of few indentations or empty lines

---------------------------

v0.5.19 - unified page buttons, increased size; CSS logic of noJS by main container class, static footer content visible on init; renamed functions

* v0.5.19 -- [2019-04-05]

[+] ADDED

-- index.php
* added to a outermost 'div' of id 'witryna' a class 'brak_js'
  - as a differentiator of working JS or not is CSS
* added a new 'div' element with id 'przyciski_stopka' as a wrapper of buttons inside footer

-- zlobek-styl.css
* added new delarations for text inputs filed inside form of id 'wybierz_galerie'
  - font size to 140% as global form elements style
* set all submit buttons inside the same form
  - bolded font style for easy differentiate confirmation buttons
* added new definition for 'div' element with id 'brak_skryptow'
  - a 'block' display is set
  - with preceding the main container by class 'brak_js' has a higher specificy than a regular, already defined in CSS 
  - this element should be initially displayed on page, when the JS is not present
* defined new rules for showing 'div' element with id 'przyciski_stopka'
  - container of footer buttons
  - initially not displayed ('display: none') when page starts, because of page main div has class 'brak_js' (selector: '.brak_js #przyciski_stopka')
  - only after JS later removing this class, the element will show the buttons inside (rule of regular block display defined by shorter selector of only this element '#przyciski_stopka', with no ancestor defined inside selector)
* defined new selector for initial showing static elements, which are controlled by JS
  - forces the footer content to be displayed when JS is not present in browser
  - it allows to read about purpose of this site, which was previously unaccessible without active JS
  - added two selectors with ancestor element class and a ids of two 'div' elemnet from footer ('.brak_js div#poco' and 'div#pomoc') to change their initial display property to 'block') 
* the same idea assigned to game area content, added new ancestor class but the display property is set to 'none'
  - an opposite logic not to show that content when JS is disabled
  - no value of game when is no JS (game fueled by JS!) 

[*] MODIFIED

-- index.php
* used the same classes in builded structure form field of lower form as the form above
  - removed class 'maly_guzik' from the class list of both form elements of lower selection buttons
  - gained the same look of both buttons selection, the same their sizes
* changed the text of displayed message for disabled JavaScript

-- zlobek-styl.css
* modified global style of all buttons and inputs type of button of page form field
  - the same size and look of both types buttons
  - 40% more horizontal padding (0.25em to 0.35em) and slighty increased font size (by 5 percent point)
* shortened the selector for the 'div#zagraj' and its hover state
* slighty correction of padding for 'h4' element inside game init button in header
  - selector  'div#zagraj div#zagraj_srodek h4.gra_odnosnik'
* modifed general font size inside form for all form inputs
  - increased to 140%, but many element has already defined this by its own declarations 
* redeclared class 'maly_guzik'
  - set padding style like newly defined global styl efor buttons
* redefine stykle for class 'szerszy_guzik'
  - now some kind of global class, removed the container form selector
  - slighty increased paddings
  - added the same font size of 140% and added new margins with 'auto' for horizontal contering 
* changed the display property of 'div' element with id 'brak_skryptow'
  - negation to 'none' from previously rule of 'block'
  - as a initial hide, when the JS will remove 'brak_js' of a main parent container 
* changed style for button inside footer
  - increased font size to 140% from 120%
  - increased horizontal padding to 0.35em and added little margins from left and bottom
* shortened the selectors of elements inside footer area only to its id name, with removing id of ancestor
  - general purpose is to initial hiding by new CSS rules defined, which don't allow to show the element when the ancestor still has got given class
  - removed ancestor id for button with id 'symulancja_button'
  - the same for 'div' element of 'poco' and 'pomoc' but here a purpose is to show that static content, especially when the JS is not present (important difference!)
* shortened also the selector of game area container to purpose of initial hiding
* added indentation for some new rules

-- witryna.js
* redefined order of internal logic inside function 'GenerujSpisGalerii'
  - moved the block of code for cleaning source container from unnecessary expression to the end of the function
  - it logic that come content can't be removed while some instructions need the 'data' gathered inside source container (here: a list of all links to all subpages is needed to count that elements)
  - the removal code works fine at the ending of this function, when the all work is done with 'source data'
  - changed the emptying code to total clean of source container, the whole 'table' tag is removed 
  - altered text of some comments inside this function 
* changed name and the logic of function, from the name  'UstawCSSzAktywnymJS' to 'InicjalizujCSSzAktywnymJS'
  - removed previously expressions, which reenables hided content for each specified element (each time defined a new value of 'visibility' or 'display' for given elements)
  - now the showing or hiding the particular element is defined inside a CSS, and the only place where JS removes or adds anything on page init is removing class of 'brak_js' from element with id 'witryna'!
  - this ancestor class defines hiding or showing its descendant elements (behavior change defined in CSS in this update)  
- but the changes inside logo with adding class and animation is continued and for dimension element is also preserved
* renamed few already defined function with propere use 'initialize' word ('initialize' not 'initiate', in translation)
  - also changed each place where function is fired
  - changed name of function 'InicjujPrzyciskiWyboruGalerii' to 'InicjalizujPrzyciskiWyboruGalerii'
  - changed name of function 'InicjujPrzyciskiWyboruPodstronyGalerii' to 'InicjalizujPrzyciskiWyboruPodstronyGalerii'
  - changed name of function 'InicjujRamkiLadowania' to 'InicjalizujRamkiLadowania'
  - changed name of function 'InicjujLocalStorage' to 'InicjalizujLocalStorage'
  - changed name of function 'InicjujGre' to 'InicjalizujGre'
* better code
  - removed blank lines, added or rearranged few comments or its typos 

---------------------------

v0.5.18 - noJS first problem, re-initied CSS to hide/change behavior when noJS, later reenable by JS; new pulsing anim of button; descriptive logic of function 'WczytajZewnetrznyHTMLdoTAGU'; meaning re-naming; removed old page elements & CSS

* v0.5.18 -- [2019-04-02]

[+] ADDED

-- index.php
*  added 'div' element with id 'brak_skryptow' inside 'header' area
  - placed there some default content, which will be displayed when JavaScript is disabled in web browser
  - this element will be immediately hide by JavaScript, just when the DOM structure will be accessible (specifically jQuery will fire hiding method)
  
-- zlobek-styl.css
* defined a new style for elements which is active, when Javascript is not present inside browser
  - noticeable dark red background color with white letters and yellow border
  - targets 'div' element with id 'brak_skryptow' as a main container
* defined new animtion config class named 'animacja_pulsowanie_kolorow', which is similary defined as previously used 'animacja_zmiana_kolorow'
  - different animation is used, where colors belongs to the colors used inside this project
  - much shorter time of lap, 10 seconds instead of 30
  - also defined new animation 'pulsowanie_kolorow', which is defined based on 'zmiana_kolorow' keyframes

-- witryna.js
* defined new function 'UstawCSSzAktywnymJS' to reset the style of selected page elements 
  - some elements was intentionally changed just a moment ago in a CSS, by initially set, e.g. to be invisible or hided or changed their behavior like animation, initial placement
  - changed the elements, which are always showed but when is no JS logic, their content may be empty or improper or just unnecessary, so the better way is to hide the element or change its initial behavior 
  - used for proper initialization elements of the page by JavaScript, which disables the hiding values of CSS atributes or resets the new changes like before used in this project
  - when no JS is enabled in browser, then the selected elements of page shouldn't be visible
  - so it's the real purpose rather than application logic for gradually showing contents of this application!
  - invocation of this function is added to the auto run block of JS code
* above function 'UstawCSSzAktywnymJS' used for resetting initial behavior of elements
  - hides text notification of disabled JavaScript (when it's enabled now, right, because this is a JS code ;) ), by hiding 'div' with id of 'brak_skryptow'
  - showing element with id 'wymiary', where showing are the active size of working area of browser
  - moving harder the sun to the left top corner of logo and removing its rotating animation (displacement and animation should works only on hover state, not on initial page display when JS operates)
* changed the hover state event function, because the class name has changed from 'animacja_1' to 'animacja_slonca'
  - the same behavior of logo element, despite changed name of class (it's only a different name)

[*] MODIFIED

-- index.php
* added extra two classes for element with id 'slonce_logo'
  - the element of animating sun inside page header 
  - added class of 'startowe_przesuniecie', which positioning the sun the same as in hover state (moving it to bottom and right by defined pixels value)  
  - and second added class 'animacja_slonca', which enables rotating animation by default, without hover state needed (hover event is build by JS, then the class is added or removed)
  - both classes initialy enables the same state as hovering on header area, when JS is enabled 
* changed class name, which has button element with id 'symulancja_button', placed inside footer area
  - changed class name from 'animacja_zmiana_kolorow' to 'animacja_pulsowanie_kolorow'

-- zlobek-styl.css
* alterations for 'div' of id of 'slonce_logo'
  - removed from hover state a rule for 'transform-origin' which was really a default value, and already defined in basis element (temporary put it inside comment)
  - added also the same absolute positioning coordinates for hover state, with added class 'startowe_przesuniecie' and with both )hover + that class)
  - some kind of negation of rule DRY!
* changed displayed style of element with id 'wymiary'
  - set default 'visibility' to 'hidden' value, which don't allow to be displayed initially inside browser, but later 'visibility' can be enabled by JS
* renamed animation config class name from 'animacja_1' to self explaining 'animacja_slonca' ('animation of the sun' in translation)
* indented definition of class 'animacja_zmiana_kolorow'
* keeping common style for CSS file
  - removed uneccessary spaces, tab keys, or typos inside comments 

-- witryna.js
* added descriptive comment inside function 'WczytajZewnetrznyHTMLdoTAGU', which describe each variant (or each case of possible loading content by Ajax request)
   - a good reminder of purpose for each case value of switch statement for passed parameter, also a default value
* altered logic of function 'GenerujSpisOdczytanejGrupyGalerii', where after the whole reading requested content, the source container is emptying from any contents
  - but this function isn't operated yet!
* used the same logic of emptying source container after reading ('BAR', like a spy ;) ) inside function 'GenerujSpisGalerii'
  - emptying expression added at the end of this function
  - for purpose of better keyboard navigation, element is placed ouside the visible area of page window but is still accessible by 'Tab' key
  - inside one element in moment of creating this page was ~40 subpages and this number still grows
  - each subpage of gallery list is displayed inside original nursery webserwer, so it's presented also in this source container
  - ech link to a subpage is an extra unnecessary 'Tab' pressing, so much irritating when you can't use mouse!!!  

[-] REMOVED

-- index.php
* removed 'div' element with id 'komentarz' which content of notification text was constantly hided, so it's no neccessary to hold this item and its content on page

-- zlobek-styl.css
* removed declarations for non existing elements inside project (file 'index.php' or its dynamically genarated contents inside browser)  
  - removed 'h1.zmienny' with 'hover' state
  - removed 'div' element with id 'komentarz', because it's not used inside index file

---------------------------

v0.5.17 - replaced FIFO to LIFO queue function, new logic of undisplayed next subpages of gallery list, redisplaying collection by button inside notification error; renamed id of button element of notification (genarated); renamed id of loading notification: HTML, CSS and JS changes

* v0.5.17 -- [2019-02-04]

[+] ADDED

-- witryna.js
* defined new function 'PobierzOstatnieNieodebrane' as a LIFO queue
  - picks and removes the last element of the unsuccessful notification from the table of un-done Ajax calls
  - opposite to already defined function 'PobierzPierwszeNieodebrane'
  - probably to replacemnet of that function
  - defines the order of serving un-done Ajax requests
  - internally used inside event function on button click inside internal error notiifcation (button id of 'przywroc_niewczytane')
* defined new function 'UsunKomunikatLubZmienNumeracjeWTresci' to purpose of replacing content existing notification of error or remoing the whole notification element 
  - added safety conditions, to verify if there is any element of notification and to check if its the only one (even though the passed id name)
  - if it was the only error for gallery subpage list then the whole error notification is removed form the page with 'slideUp', the jQuery animation (like for the rest of error notifications)
  - but when it was more of them encountered then the function removes the current notification text and replaces it by the previous notification 
  - the element of previous request is removed form the collection and its specified quantity (subpage gallery number and error uccurence) modifies the numbers from the text of notiofication
  - but when quantity result is '1', then the extra condition removes string ' x [quantity]' from  the notification title
  - at the end function reapplies animation of yellow blink to that notify element

[*] MODIFIED

-- index.php
* changed id of element from 'wczytywanie_podstrony' to  'wczytywanie_podstrona'
  - a notificationelement of loading content of current gallery details and its each subpage

-- zlobek-styl.css
* renamed all the exististing selectors, where the '#wczytywanie_podstrona' was a content
  - renamed to '#wczytywanie_podstrony'

-- witryna.js
* changed names of all jQuery selectors, where the previously '#wczytywanie_podstrona' was used and now its '#wczytywanie_podstrona'
  - renamed also semi-global variable with new selector content (previously used, now storaged logic inside comments)
  - changed also initialization semi-global variable inside function 'InicjujRamkiLadowania' where the structure of all loading notification is built
* finally added invocation of newly defined function 'UsunKomunikatLubZmienNumeracjeWTresci' into body of 'WczytajZewnetrznyHTMLdoTAGU' function
  - variant 'spis_galerii', which displays next subpages of gallery list
  - used here to redisplay of any subpage, which cannot be displayed before
  - at the end of the conditional logic the button of the notification is reenabled to be active (newly name of id of button is used)
  - also the notification text changes to be displayed for the previously noticed error, for previous subpage loading error (the whole text concerns another notification error of previous loading) 
  - but if there was only one error notification, then  the whole element of notification is removed and error count is decrementeded to '0' value (really an errou counter is differentiator of removal of cumulated error notification which concerns)
  - slighty changed also the text of first occurence of the loading error of gallery subpage
  - now contains a text with extra new line, so looks better on wider screens with picture-like exclamation on the left side of text notification
* altered text of returned html string inside function 'GenerujPowiadomienieOBledzie'
  - here builded notification element contains newly set id attribute with value 'przywroc_niewczytane' which is used in click event and for a differentiator to enable/disable this button by JS
(see also 'fixed' section of this update)
  - prevoiusly the butoon has a class attribute instead id, inside returned HTML content
  - added new attribute 'title' which can explain, that the action is only possible when internal Ajax status is OK (displays this text when mouse hover on button)
* added some fixed conditionally logic inside function 'ZmienTrescKomunikatu'
  - uses the whole jQuery object, when there is only one notification on the page
* renamed function 'PobierzPierwszyNieodebrany' to 'PobierzPierwszeNieodebrane'
  - just a better semantic name for FIFO selector
  - probably the better way is using the last one picker, the LIFO queue (to rethink)
* changed definition for click event serve, while event object id has changed  from 'przywroc_strone' to 'przywroc_niewczytane'
  - contains all the logic for removing last/first of un-done request of loading next gallery subpage (inside comment added notes of pro and cons)
  - decided to use LIFO queue by defined function 'PobierzOstatnieNieodebrane' instead FIFO function on collection of undisplayed subpages of gallery list
  - removed bad indentation from function body
* JS code improvements
  - typos, generally inside comments
  - extra spaces
  - added comments if explain or refresh something is needed

[F] FIXED

* fixed button click event of internal error notification
  - alteredy inserted element of notification has the same class name as event object has id inside event function
  - so event listened the clicking of non exist element id, and the page logic generated and replacing content for any next error but there was no connection bestween two actions
  - there was no way to initialize the logic from notification, by click on placed there button
  - finally renamed the generated content of error notification with newly created id instead class attribute of the button
  - also for better distinguish of element, renamed this new id to 'przywroc_niewczytane' (insteda previously defined id of 'przywroc_strone')
  - the same 'przywroc_niewczytane' id is used inside event function on click on it
  - also the 'przywroc_niewczytane' is used inside jQuery selectors to disable or reenable the button while click event action persists 
  - fixes: #34 - 'No response to the button inside the error notification'

---------------------------

v0.5.16 - on the offensive with JS logic of unsuccessful subpages adding, for now still as scaffolding; changed the button id from class; FIFO declared as a method of removing request form the un-done list

* v0.5.16 -- [2019-02-01]

[+] ADDED

-- witryna.js
* defined new function 'PobierzPierwszyNieodebrany'
  - some kind implementation of FIFO queue
  - used inside event function of re-done of previously unsuccessful request

[*] MODIFIED

-- index.php
* changed the structure of object which is collected as an item of table, inside semi-global variable 'g_niewyslane_podstrony'
  - from now are collected four attributes instead previously two
  - changed first atrtribute name from 'address' to 'fullAddress' in translation
  - 'tag' attribute not changed
  - new attribute 'adresZasobu' and 'elementWitryny' intercepted from function parameters (the same names but with php-style names) for purpose of remebering the whole inforamtion about request
* uncommented code for again adding of un-done displaying of next gallery subpage after a click on button with id 'zaladuj_galerie_spis'
  - function 'WczytajZewnetrznyHTMLdoTAGU', 'spis_galerii' variant 
  - for now only a condition is operating and some its expressions, e.g. decrementing sum of un-done displays of subpages and the button of notification is re-enabled (if there are more notifications == more undisplayed content)
  - commented out invocation of non existing yet function
* changed the used attributes names inside variables, which was renamed previously, e.g. 'adresPelny' (named previosly 'adres', 'address' in translation) 
* changed event of clicking on id attribute of generated content, instead class attribute
  - the same name attribute 'przywroc_strone' 
  - but function 'GenerujPowiadomienieOBledzie' generates the HTML element with class attribute!
* also a logic of this event function changed
  - modified the first nested condition
  - added extra condition inside with correct interceptor file name
  - added some temporary code, for now placed inside comment
  - but also some code added: blocking of clicked button, showing loading notification and the most important which is invocation of 'WczytajZewnetrznyHTMLdoTAGU' with passed parameters from the object of previously unsuccessful action! (added also log statement in console)
  - passing of extra object with specified parameter ('{ trybPowtorki : true }') which indicates an re-done of action when invokes 'WczytajZewnetrznyHTMLdoTAGU'!
  - using a declared function 'PobierzPierwszyNieodebrany' which selects and removes the first element from unsuccessful actions collection
  - the returned first element of list of request is used as an active object and all the actions are carried on this object
* code reviev
  - added comment if existing code expression needed description
  - fixed typos, mainly in comments

---------------------------

v0.5.15 - defined & used function to altering the whole content of already displayed error notification (action: next page of gallery list), scaffolded logic on re-action after error occurs on notification button; notification title with sum of errors; altered logic of changing content of error notification; JS cleaning

* v0.5.15 -- [2019-01-31]

[+] ADDED

-- witryna.js
* defined function 'ZmienTrescKomunikatu'
  - changes the whole content of already displayed error notification
  - need element object of page and two error text (for title and description text) to passed as arguments
  - conditional sttement of existing element to change, and when it's true then the content is changed as passed parameters
  - function body taken from content where is fired, then slighty modified (taken from 'WczytajZewnetrznyHTMLdoTAGU')
* defined new event function for clicking on button inside internal notification error
  - targeted specific class 'przywroc_strone' of notification button, inside container with id 'galeria_spis'
  - an event delegation of click function
  - logic verify an application state and conditionally trying to perform a selected actions
  - IMPORTANT: for now only the scaffolding of logic defined, only a disabling a button is visible as an action! 
  - used pseudo code or description of logic inside comment

[*] MODIFIED

-- index.php
* altered 'title' attrib of span with id 'status_ajaksa', where the Ajax status is displayed and extra explained by mouse hovering
  - added longer text 

-- witryna.js
* slighty altered logic function 'WczytajZewnetrznyHTMLdoTAGU', on variant of 'spis_galerii' (inserting next gallery subpage, next group of items)
  - if no provided attrib value, then default logic works
  - the list of unsend actions is build conditionally, not always the new item is inserted as previously
  - to purpose not inserting the same element multiple times into collection!
* added comement inside future builded condition statement
  - for now only a pseudocode or listed executions of not defined functions yet
  - to purpose od serving second time of the same action on button from error notification, which was previously un done from button of load-next-gallery-subpage (last modified notify text is directly connected with unsuccessful action)
* altered console log statement with inclusion of counted sum of unsuccessful actions and number of current subpage of gallery on this unsuccessful action
* altered logic of displaying of title for internal notification error while any notification exists on page
  - a title contains total number of unsuccessful actions, not only is placed inside its description modified 
* internal use of function 'ZmienTrescKomunikatu' to modify content of existing error notification
  - no more direct manipulation on live content, which was generated by antother function (which was also defined not to manipulate on DOM object!)
* modified added class to element when is passed ON option of attrib  'opcje.przyciskAkcjiDolacz' inside 'GenerujPowiadomienieOBledzie'
  - from now is 'przywroc_strone' class addition instead of class 'dodaj_strone'
* code reviev
  - renamed variable ty camelCase style
  - added spaces after each line comment, if the text of comments touched a closing slash symbols of given comment
  - added space between words in statements (like text concatenation)
  - fixed typos, mainly in comments
  - added comment if existing code expression needed description

---------------------------

v0.5.14 - start page link in logo title, current gallery details with gradient backgrounds; replacements in logic for generating improvement internal notifications of errors (mainly in function 'WczytajZewnetrznyHTMLdoTAGU'), all with animation of newly created; footer content touched

* v0.5.14 -- [2019-01-30]

[+] ADDED

-- index.php
* added anchor element which surrounds the whole div element with id 'napisy'
  - wrapped a whole logo element with a link which leads to itself (to main site), href leads to itself 
  - a popular web convention of adding link to start from main page
  - here is SPA, so it's some kind of starting point or page refresh

[*] MODIFIED

-- index.php
* extended some values of list elements inside footer area
* also some '&nbsb;'-spaces replaced with regular spaces from list elements of that footer area
* replaced few tab characters by new line characters in HTML

-- zlobek-styl.css
* changed background color of element with id 'nazwa_galerii'
  - background of current gallery title and description
  - bottom centered radial gradien with instead of full color 
  - a previous color definition stays as a polyfill for older browsers
* defined new background for next element of class 'jasne_tlo_galeria'
  - the same colors of gradient, but defined its center to the top of element
  - a horizontal reflection of previously defined gradient
  - also a previous definition of background color stays as a polyfill for older browsers
* removed background color definition from element with id 'skladowisko', which is inside an element with newly defined class 'jasne_tlo_galeria'
  - to purpose not covering defined gradient in wider element (its container) by its background color
* changed fill style of animation in its configuration of class 'animacja_zolty_blysk' from 'both' to 'forwards'

-- witryna.js
* altered internal notification of error inside function 'WczytajZewnetrznyHTMLdoTAGU' on 'spis_galerii' variant
  - an extended description with more intuitive text is passed to an argument while launching function 'GenerujPowiadomienieOBledzie' to build this notification
* before error notification is built, a text of its description is concatenated with some other parts
  - the whole error description text is builded as a HTML with emphasis on usuccessful requested gallery number and counted number of total occurences that unsuccessful action of showing gallery subpage
  - all the important numbers are surrounded by 'strong' tags, and thats way they are presented better 
  - the current subpage number is calculated from last unsuccessful request address, and not by counting next subpages of gallery list!
* later notification is build with concatenated description, which is used to first time creation a new internal notification error 
  - ... or the logic is trying to modify the content of existing notification by owned string of current error
  - in case of modify the existing notification, a class with conected CSS animation must be reapplied to that element, so it's removed and added in two expressions, because jQuery won't allow to reapply the same class to element, which already owns that class (important!)
  - but when notification of error loading-next-gallery-subpages is first time builded, then the function 'GenerujPowiadomienieOBledzie' must use a object parameter of 'dodatkowaKlasa' with new value 'blad_dolaczania' (instead previous value 'dolacz'), so the already defined logic inside that function can do the job right
  - also a basic version of notification is generated (but soon won't)
* changed also an element to scroll to in page
  - now page is scrolled to place of new notification, which is always placed before old style notification (yes, soon will be removed), with basic notification text (e.g. not contains desired subpage number) 

* renamed local variable name to more meaningful name inside function 'WczytajZewnetrznyHTMLdoTAGU' on 'wybrana_galeria_rekurencja' variant

* altered internal notification of error inside function 'WczytajZewnetrznyHTMLdoTAGU' on 'wybrana_galeria' variant
  - commented out logic of temporary showing container with generated new content before finish the reading of source and couldn't replace that container content, so it might be uneccessary
  - slighty changed the description of notification text, replacing acronym by full word and adding "second stage" instead meaningless 'concrete' in tranlations 

* changed internal notification of error inside function 'WczytajZewnetrznyHTMLdoTAGU' on 'wybrany_spis_galerii' variant (selected subpage of gallery list)
  - altered the text of notification from general to detailed
  - read out requested gallery number form address of request
  - put that value inside notification title and description of an error, where surround it by 'strong' tag 

* changed generated text for current gallery inside function 'GenerujPodstronyGalerii', where the current gallery subpage is displayed
  - replaced word 'selected' by 'current' in translation
* added new comment or altered text of few existing

---------------------------

v0.5.13 - added focus style like hover on active like-buttons-elements and belts, when keyboard navigation; redefined click event to support keypress/keydown too; redefined event functions to hide focus state on anchors on selected elements; better notifications of internal errors, now with gallery number on title and subgallery in details; scaled notification of error when hover; bolded text button & cycle animation; blinking animation for new notification (first time presented); verified function of sliding to page content; fixed slow animation of a disappearing element by complicated transition

* v0.5.13 -- [2019-01-24]

[+] ADDED

-- zlobek-styl.css
* added global active state for all element
  - removed outline from any element
* added global style for 'a' elements on state 'active' and 'focus'
  - outline removal while 'active'
  - adding dotted outline when 'focused'
* added global strong style for 'strong' elements
* added hover state for any generated notification of error, a 'div' element with class of 'blad'
  - changed original size of element by transform it about +5%  in both directions
  - animated transform by smooth transition, defined in basis element
  - possibly focus state is not affected
* added the same rule to the 'focus' state, like element which already has a 'hover' state, an element with class 'krzyzyk_zamykanie' 
  - just added another selector for the same element, next to the already defined state
* with the same idea added selector '#debugger_zamykanie:focus' into previous existing selector with 'hover', for an element of closing for Ajax status belt   
* used the the same idea of adding new pseudoclass selectors on another elements to restyle them the same, as did it inside previously declared and similar selector
  - added 'h2#zaladuj_galerie_spis:focus' next to existing one with ':hover' state
  - or into next belt of selecting gallery numbers: 'div#selektor h2#selektor_naglowek:focus'
  - interactive elements of loading or sliding new content acts the same on hovering by cursor or on focusing by keyboard
* defined special style for button with id 'symulancja_button' of show/hide Ajax status belt
  - rule of bold font style, for noticeable its text visibility
* defined new animation to cyclic color change
  - from black to black generally but with some noticeable seven colors between last black
  - most of used colors in this animation are similar to already used site palette, but some of the are totally different for drawing attention of user to click the button of Ajax status and encouragement to have fun with Ajax contoling state
* defined also new class to configure properties of previously mentioned animation
  - added long time of 30 second duration and inifinite loop
  - class was assigned into a button of id 'symulancja_button', which sits inside footer 
  - tested many variants of colors and duration times to gain a nice and smooth changing colors of text 

-- witryna.js
* defined a new event function, fired when 'click' or 'keypressed' on 'a' elements inside container with id 'glowna' (a container for current gallery details)
  - to purpose of hiding a red outline on active element (here an anchor element outside thumbnail, linking to a original image element), after its click a 'blur()' method is fired
  - function could block default actions, might stop default behavior when space is used to fire a link with thumbnail, uses 'preventDefault()' on event object
  - detailed: a space key won't scroll a page content, when operate on 'a' tag inside id of 'glowna' container
  - a false 'click' is generated after pressing space key
  - some kind of hack defined here 

[*] MODIFIED

-- index.php
* added a class of 'animacja_zmiana_kolorow' to a button with id of 'symulancja_button' inside footer
  - class definition includes connected animation named 'zmiana_kolorow' 
* changed name of element on a list, inside footer 

-- zlobek-styl.css
* altered transition definition for class 'blad' of a 'div' element
  - defined precisely animated argument inside transition
  - only for selected argument 'shadow' and 'transform', instead for 'all' (all animated attributes isn't)
  - improved efficiency of animation (see fixed section of rhis file)
* redefined animation of 'zolty_blysk'
  - more changes than only a border color
  - added more stages and a changes of background color
  - animation for existing and styled element, colors must fit to already defined 

-- witryna.js
* temporary commented out declaration of 'use strict' for the impact on whole project (and this file)
* many changes of internal notifications texts inside logic defined in function 'WczytajZewnetrznyHTMLdoTAGU', details below 
* changed message inside generated notification of internal error while displaying new gallery details or any subpage of current gallery, starting from one (sometimes the only one)
  - notification title element contains a number conected gallery, which cannot be readed
  - the error description contains also a given gallery subpage number, which cannot be readed and the overall gallery number, where problem encountered   
* changed the default internal message error while first read problem occurs ('spis_galerii' variant)
  - with better explanatory text now
* added new style of defined notification for any internal error which concerns loading of next gallery subpage ('spis_galerii' variant)
  - next to the old style notification a improved notification shows
  - yes, for now two notofication are coming out! (just for a test purpose and to finish developing it)
  - added title, detailed description and action button which should allow repeat unsuccesfull action (for now it can't do anything)
  - content of the notifications should update on every next error of that type, now only the old one is updated
  - also its class is changed, so the next error animates the whole element (now only the first ocurrence changes anything)
  - for now only the previously defined notification are changed by yellow animation on every new error 
* altered the message text of internal notification while providing specified gallery number ('wybrana_galeria_rekurencja' variant, which is the first step of two to displaying it)
  - the given gallery number is not mentioned, but the title and decription broadcasts the number of its subpage, where is placed
now
  - also mentioned that it's the initial step of loading contents (to gain address for given gallery number)
*  altered the message text of internal notification while providing specified gallery number ('wybrana_galeria' variant, thich is the second and the final step of displaying it)
  - displays the final notice and the desired gallery number in title
* modified the logic inside function 'GenerujPowiadomienieOBledzie'
  - changed the defaults of the option for adding animation and using CSS animation class
  - expanded logic of builded HTML structure
* modified logic of function 'PrzewinEkranDoElementu'
  - placed previous logic inside conditional statement
  - for safety purpose of doing an action only on existing page element  as passed parameter (...previously an error occurs)
* just a simple change of single quotes to double quotes in definition of global event function of 'keypress' event
* modified function event when 'clicked' or 'keypressed' on element with id of 'selektor_naglowek'
  - when clicked then auto blur status is applied on event element,  which provides an auto removal of a red outline from event element
  - defined logic: 'blur()' method removes focus state of event object  
  - but after a keypress of space key, there is no more scrolling content of the page which is standard functionality for that key
  - uses 'preventDefault()' method for blocking that event
* modified the logic of actions 'click' and 'keydown' on any elements of gallery list (regular or selected subpages of gallery list items)
  - any 'a' element inside this containers are blurred after a click
  - no changing focus when Space or Enter key is used (focus remains on that element while new contents is being loaded) 
* little but significant changes inside event on every closing button of class 'krzyzyk_zamykanie' inside generated notification of error (container with id of 'galeria_spis')
  - blocking scrolling of page contents when pressed space (if scrolling available), so only a notification is closed by space
  - also verified animation 'slideUp' of jQuery lib (two version ago it was simply hide)
  - 'slideUp' is better for context, when closing it's rolled up as unactual notification 
  - also a better distinguish an short animation, when only one dimension is changing 
  - fixed connected with CSS problem and its animations efficiency
* cleanings
  - fixed some typos inside comments
  - added some comments
  - added comments with function name at the ending of the some declared functions  

[F] FIXED

-- zlobek-styl.css
* altered transition definition for class 'blad' of a 'div' element
  - removed 'all' from defined transition attributes, instead used only selected arguments 'shadow' and 'transform' with parameters on a list
  - a clue was an old web browser, which don't understands the power of CSS transitions, and the animation of hiding notification was smooth and immediately started, after a click/keypress
  - improved efficiency of animation, now it's playing smoothly 
  - fixes: #31 - 'Slow and not smooth hide animation (internal page notifications)

---------------------------

v0.5.12 - code cleanings of JS: grouping defined functions into similar code blocks; removed test alert box triggered by keyboard; CSS: paddings & margins

* v0.5.12 -- [2019-01-21]

[*] MODIFIED

-- zlobek-styl.css
* added small pading from top to 'h6' element inside footer to push away by little copyright text from buttons
* also added little margin after each error notify

-- witryna.js
* code cleanings
  - removed empty lines, added or removed spaces in function declarations or its calls 
  - changed comon style of curly braces in new lines
  - added few comments with function names on their endings
  - also some content of comment changed by better descriptive texts
* added or changed comments as named group of functional code or grouped similar logic
  - extended the lines of comment with grouping content
* moved function definitions connected with game logic into one common place with grouping comments
  - changed place of few functions: 'PoczatekRuchuPrzeciaganiaJS', 'RuchPrzeciaganiaJS', 'RuchUpuszczaniaJS', 'ResetujZIndexWszystkimJS', 'PoczatekDotykuJS', 'KlikniecieObrazkaJS'
* moved function definitions of global events into newly created area with new group name comment
  - it concerns: 'resize' on window object and 'keypress' of the whole document
* removed the alert box notification when triggered by keypressed  'Space' or 'Enter' key on global event 'keypressed' 
  - no more test notification on keypressed this two keys, when operate keyboard on any anchor elements
  - previously defined test notifications works fine only at 'standard' anchor elements, it means that which has 'href' attribute
  - previously defined code worked fine on external link in header and for any generated contents of current gallery but no element inside gallery list
* removed unused code from event function of 'click' and 'keypress' on any gallery list item 'a' tag (inside container ids: 'galeria_spis' and 'wybrane_galerie_spis')
  - removed absolutely temporary code, sitting inside comments inside that event function
* changed places of function definitions for events into one logically grouped place, e.g. 'global events' or 'keypressed gallery list elements'

---------------------------

v0.5.11 - improved project folder structure, linked logic in one place; secondary jQuery fuse & rerun; current year in footer

* v0.5.11 -- [2019-01-17]

[+] ADDED

-- new folder 'lib'
* as a container for any external libraries
* any locally existing Javascript resources should be linked from here to 'index.php' or 'witryna.js'
* may contains functional elements of used libs, such as CSS, graphic content or any other neccessary files if they're needed

-- index.php
* added displaying current year in footer as the upper range
  - changed at 2019 so scope can't be wrong unless server is configured badly
* added reserve link to jQuery library if occured a problem of loading primary link from page head
  - some kind of fuse if still a jQuery object not defined iun browser
  - secondary link when activated then links library code inside page body
  - secondary link to jQuery is always local while primary might be external, depeds from used server and user location (local when using 'localhost' hosting)
  - a hack nesting 'script' tag inside external 'script' tag

[*] MODIFIED

* modified locations of all used JavaScript libraries and their subfolders to use a 'lib' folder
  - the same file versions still in use, changed only their location and linking to

-- index.php
* changed all paths to libraries used in project to use a folder of 'lib'
  - paths in 'scr' attributes of 'script' tags are just prefixed with that folder name
* little touches on list element inside footer
* and cleaning new lines, indentation of 'script' tags and their contents at the end of the file

---------------------------

v0.5.10 - php ON, conditionally linking ext files; external minifications; so many logic changes but still invisible; interceptor file updated; visible red focus on all active elments of interface, when operating by keyboard, tabindex="0" is a goal; gallery number & title in yellow; restyled footer area; dimmension element hack for its dimensions

* v0.5.10 -- [2019-01-15]

[+] ADDED

-- index.php
* conditionally testing of environment and possible resetting value of a given variable 
  - first php logic inside, just before any output content
  - value of a variable tested inside later conditions, to determine 'local development' vs 'remote production'
  - on production environment any kind of 'thin files' should be linked into project (*.js, *.css or others) as an opposite to develompent versions
* first php variable testing condition
  - if true then php outputs link to the unminified library version, othervise it's linked to minified file
  - yes, the conditional could change only 'src' of the file but outputting the whole 'script' element is more clearly
* for a test purpose the actual value of environment is showed under the page header, inside the 'h2' element
* added 'tabindex' attributes with values od '0' inside any element with connected action or event
  - mainly for 'h2' element as button of loading next-gallery-subpage or  'h2' next to it of a belt of expanded form of selecting galleries
  - and also inside any closing button of existing (e.g. closing of Ajax status belt) or generated element
  - interface elements of forms already owns internal 'tabindex=0' attribute even if not explicit specified 

-- zlobek-styl.css
* added global style for focus state to any page element
  - works with all standard and active elements of web interface (inputs, buttons, etc.)
  - a noticeable red border with dots
  - also works with regular HTML element when they has added 'tabindex' attribute! (important!)
* added first style for 'h6' element, just centering for now
  - only that element needs centering contents, all the texts inside 'p' elements inside footer should be aligned left, right or justified for better readability

-- witryna.js
* defined function 'ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera' to determine if received content is right (and also that parameters of the request were connected with nursery web server address) 
* defined function 'GenerujDomyslnePowiadomienieOBledzieSerwera' to display a standard form of Ajax request error
  - it could present any common error of improper readed page of nursery serwer or any wrongfully request
  - uses the standard title and text of error comunicate, changes only a parameters of Ajax call inside notification details 
* defined function 'OdczytajSpisGalerii' to build an improvement content generator for gallery subpages
  - used 'GenerujSpisGalerii' as logic basis and later refactored
  - for now it's just a definition, function isn't ready to use, to be fired (sic!) 
  - for future use, because it uses different content generation method, based on existing objects and their attributes to create elements of page
  - but after a rebuilded logic should replace an origin logic of  'GenerujSpisGalerii' 
  - WORKING PURPOSE: a much simpler and shorter approach with basis, that explicit input data generates explicitly output structured data
  - returned data are table of object with attribs, that describes any gallery item
  - there is no any HTML element creating, just a read and building structured data 
  - uses internally special defined subfunctions for blocks of original code 
* another defined function of 'GenerujSpisOdczytanejGrupyGalerii', which allows to generate any content from given parameters
  - also a refactored code from logic of existing function 'GenerujSpisGalerii' (for outputting next groups of gallery list subpages) and 'GenerujSpisGalerii' (for outputting selected subpages by a given subpage number)
  - due to problems with global logic, many cross-conditions and setting few values for now unfinished
  - but the refactored code better and faster should build any element structure by given objects from parameters
  - much simplier way of creating, but it's hard to put all page logic inside one function ... :(
  - future tests and using a 'OdczytajSpisGalerii' function to gain entry data will bring success
* defined new function 'UstawSuwakiJakOdczytanoPierwszymPrzebiegiem' to set the default values of sliders (or simple input form field) at the half of teh max readed value
  - fired after first read of source container, which almost guarantee  readings of max values inside project
  - the input fields are immediately set by this values

[*] MODIFIED

-- przechwytywacz.php
* changed returned string if unnable to read expected content or any valuable content
  - returned special text with the most meaningfull fragment of string '!-A-W-A-R-I-A-!' for indicate an error of read of source (mainly incorrect address to source read)
  - existing of this string value is verified JS logic when passed along 
* code review: remotypos, spaces, new lines and comment 

-- index.php
* linked a minified file of slideshow logic from 'index.php'
  - linked 'lightbox\js\lightbox.min.js' instead of 'lightbox\js\lightbox.js' file
  - the same logic, just a minified JS code in place of regular to achieve about 50% less bytes to download
* wrapped the copyright notes inside footer into a 'h6' element
* extended a list inside footer by few elements, recently added into the project           
* added 'alt' attributes into Ajax status belt
  - as a detailed information of meaning every interface element
* linked minified version of a slideshow plugin instead regular JS file from file 'index.php' ('lightbox/js/lightbox.min.js')
  -  the same file used in application, regardless the environment variant

-- zlobek-styl.css
* commented out the selector for indicating current gallery number inside gallery title, placed inside details of gallery
  - preoviously defined 'span' styles used for styling that gallery number and its title also
  - styles for pseudo element also putted in comment
* added darker shadow under the main picture, which is placed inside current gallery details
* modified the align of text to justify, for all paragraphs inside footer area
* modified the rules for 'wymiary' element, which shows actual dimension of available screen area
  - modified fluid placement (centered on 50% any screen size) with defined width in relative units and nagative margin also (calculated as 50% of given width)
  - this is a simply one place set, inside first media query threshold (like a pro)
  - previously defined sizes inside almost all thresholds has been commented out
  - but the element size is increased with connected increased font size, which its dimansion are based on 'ems' not fixed px size 

-- witryna.js
* moved definition of function 'InicjujPrzyciskiWyboruGalerii' to an application helpers area
* moved definition of function 'InicjujPrzyciskiWyboruPodstronyGalerii' into an application helpers area
* delicate touches inside function 'GenerujSpisGalerii'
  - just a changes of few spaces, new lines or used code style
  - corrected few comments also
* little modifications inside function 'GenerujSpisWybranejGalerii'
  - added 'tabindex' attribute with value of '0' to 'a' element of generated gallery title
  - only for first title anchor but no the secondary 'a' element with image inside to unnecessary second keystroke of tab key on every item of gallery list
  - changed comment style
* added extra safety expression inside function 'OdczytajTresciOdnosnikaWybranejGalerii'
  - just default value is 0 when parameter is not specified (means: read from the first encountered element)
  - the gallery subpage is computed by function (and its inner formula) for given gallery number, not just readed from its context or counted subpage
  - function build a complete object, which attributes describes any gallery
  - modified loging with subpage of given gallery
* just a few touches inside function 'UzupełnijNaglowekBiezacejGalerii'
  - added string 'Galeria nr ' to displayed content of gallery title as a prefix
  - surrounded each value from a variable by a 'span' element wit closing tag, so given gallery name and its number might be styled differently form static text of 'h2' element 
  - comments content changes 
* fixed typo in comment inside function declaration 'KtoraPodstronaWGalerii' 
* changed text of notification inside function 'UkryjRamkeLadowania'
  - removed temporary content for observe behavior and debugging purpose
  - removed additional string ' (- dbg)' from displayed value when multiple request of given type finishes
  - update of displayed value with decrementation of previous displayed value, if it was more than one (amount request can't be displayed when was no more than one)
* little changes inside function 'GenerujPowiadomienieOBledzie'
  - added 'tabindex' with default '0' value to closing element of built notification
  - fixed typo in comment inside function 
* cosmetic changes inside function 'WystartujDebuggerLokalny'
  - added the comment and commented out previously content of assigning value into variable 
* moved defined functions 'InicjujPrzyciskiWyboruGalerii' and 'InicjujPrzyciskiWyboruPodstronyGalerii' into another place of 'witryna.js' file
  - a similar code should be kept near similar function
  - the above functions are tools functions, moved up them inside definiotion list
* fixed typo and spaces inside function 'UsunPobraneZadanie'
* extend events on 'h2' element with id 'selektor_naglowek'  (an upper belt of form of selecting any gallery or subpage number)
  - actions can by made by 'click' and 'keypress' also
  - added a conditional logic, which reacts only for particular keys or mouse buttons (allowed: LMB, Space, Enter)
* extended events on element with id 'zaladuj_galerie_spis'
  - added 'keypress' event, similar to the previous event function 
  - an element is changed only when three allowed keys (the same trio)  triggers an action
  - all the previously defined logic of change placed inside a condition
  - but also modified the another insider condition, which decides about blocking any furher operations on that element (added +1 to count current action)
  - ... which allows to proper count of all subpages and block any further 'clicks/keypresses' if exceeds subpage max number
  - aded console statement to log and verify actions
  -  improved indentations inside this event function
* added event of 'keydown' on elements inside ids 'galeria_spis' or 'wybrane_galerie_spis' (between 'keypress' or 'keydown' here is no difference, no keyboard combinations alowed now)
  - event delegation, works on 'a' elements inside previously mentioned two containers
  - the same trio of working trigger (LMB, Space & Enter) and conditionally read this keys
  - added comments inside
  - fixed also reading a gallery number from event object
  - later that number is used to display into current gallery title
  - rearanged logic to read the gallery title also
  - finally the gallery number and title is read from given gallery, and it's no important what was an event object (a main picture or title in header) - used a function 'UzupełnijNaglowekBiezacejGalerii' to display a current gallery summary
* modified the global event of keypress on any element of page (document is a selector)
  - trying to invoke an alert() when 'a' element is triggered by Space or Enter key just for a test purpose (not shows)
* code cleanings
  - unified the 'vertical allignation' inside declarations, comments (just keepeing the same style & spaces, e.g. inside semi-global variable declarations) or one space before any text of the comment
  - added proper indentations for code inside 'WczytajZewnetrznyHTMLdoTAGU', because the defined callback for 'load()' function wasn't previously indented
  - added necessary comments if needed
* changed the logic by using function 'ZweryfikujIstnieniePrawidlowejOdpowiedziSerwera' any content is presented only when the right values were sent and answered
  - extra block of biconditional logic inserted before output anything on the screen
  - if the returned content from the Ajax request don't contains selective word, that means the content is expected
  - if a content contains keyword, the default notify of error is provided by newly defined function 'GenerujDomyslnePowiadomienieOBledzieSerwera' and the logic won't allow to show any right content above error notification
* changes inside function 'GenerujSpisGaleriiPierwszyPrzebieg'
  - changed texts to longer of the first and second notification of error, which is generated from this function
  - removed two comments, when previously was defined an event function of click on button to page refresh
* used defined function 'GenerujPowiadomienieOBledzie' to generate notification in default block of switch statement
  - no needed direct DOM modification
  - but few simple error notification still based on DOM changes on demand (defined inside logic of error catching)
* changed the description of a test notification of error, which shows on page init and after each refresh
  - just a test notice, no actual error

---------------------------

v0.5.9 - internal error notifications improved, &shadow; separated logic of many function calls; form buttons wider; 

* v0.5.9 -- [2018-11-29]

[+] ADDED

-- zlobek-styl.css
* added a shadow to a class of error notification 

-- witryna.js
* added false error notification as a test, with button
  - starts on page init
  - just a test notification to observe a behavior of connected action elements (notification closing or page refreshing)

[*] MODIFIED

-- index.php
* added 'szerszy_guzik' class to lower form buttons of selecting any gallery subpage number (for submit and randomizer)

-- zlobek-styl.css
* marked some styles to future removal by comments
* added a style for 'span' element, inside a 'h2' element of title
  - as a better distinguish of gallery number  
  - also added content for created pseudoelement, created by CSS

-- witryna.js
* added more descriptive statement text of any prepared error notification instead just a status texts of unsuccessful Ajax request
  - for easier distinction between notifications of any action requests
* modified place of click event on element with 'odswiez_strone' class
  - an event on button inside error notification
  - moved from the conditional area of code 
  - moved to the end of the file as a global registered event
* added an indentation to function declaration code of 'CzyscNiepotrzebneElementy', which is placed inside function 'WczytajZewnetrznyHTMLdoTAGU'
* separated conditional code statements of function 'GenerujSpisGalerii' into a function 'GenerujSpisGaleriiPierwszyPrzebieg'
  - code logic from conditional first run
  - direct call from a function 'GenerujSpisGalerii'
* added extra conditional statement inside function ''GenerujSpisGaleriiPierwszyPrzebieg''
  - a purpose of possible Ajax error, so generating a notification of error is a good thing
  - of course an own defined function is a better way to a notify, than a DOM manipulation
  - added a secondary condition to get proper values of requested number (here the highest gallery number), if something fails when reading that number by a first time
* changed a lower range by one inside a conditional statement, inside function 'GenerujSpisGalerii'
  - corrected after many random tests by displaying lists of galleries
* changed parameter name inside function 'OdczytajTresciOdnosnikaWybranejGalerii'
  - to goal of better comprehension by right name
  - changed every internal use of new name as variable
* slighty modification inside inside function 'UzupełnijNaglowekBiezacejGalerii' to generate content with new 'span' tag, which surrounds a current gallery number
  - it's just a test, number not always presented (possible error in display) if not directly selected by an upper form! (TODO of course)
* modification inside function 'GenerujPowiadomienieOBledzie'
  - changed order of definition existing attributes of default object
  - few attributes doubles the already defined ones
  - simplified the logic and structure of built object
  - added more conditional and working logic inside already defined logic of adding buttons inside a notify 
  - also slighty changed logic of adding a closing button of that notification
* code cleanigs
  - removed unnecessary empty new lines
  - added or removed spaces inside declared functions

---------------------------

v0.5.8 - jQuery lib v1 instead v3; Loading Content Notification System in use, showing simultaneous number of requests; blocking & unblocking buttons after action done; enchanced error notifies in use; default keyboard actions blocked

* v0.5.8 -- [2018-11-26]

[+] ADDED

-- new file 'jquery-1.12.4.js'
* changed library version for compatibility with older browsers (IE mostly)
  - unpacked version for development purposes for now
  - linked inside 'index.php' instead previously used version of 'jquery-3.2.1.js'

-- index.php
* added empty 'span' element inside of 'h2' element inside of each three of Ajax loading notifier 
  - placed after an 'img' tag, at the ending of 'h2' tag
  - a prepared structure for inserting new contents to that 'span'
  - styles for 'span' inside 'h2' already defined and in use

-- witryna.js
* defined function 'ZablokujPrzycisk' for deactivated a given button or input form element
  - e.g. interestingly used inside submit form event function (with event object data)
* defined also a reversed logic function named 'OdblokujPrzycisk', which reenables previously disabled button/input form element
* defined an global event function as a response on clicking given beyboard buttons or key combination
  - uses 'keypress' event (not 'keydown' or 'keyup' event)
  - it should block defined key or key combination of defined actions
  - used here to block commonly used standard actions of 'previous_page' ('[Alt]' + '[<-]' and also '[Backspace]') or 'next_page' ('[Alt]' + '[->]')
  - hack or improvement: pressing the '[Backspace]' key don't fires the blocking event inside any input text form fields (really the logic event is reversed)
* placed the initial call of function 'InicjujRamkiLadowania' inside a auto runs block

[*] MODIFIED

-- witryna.js
* few semi-global variables placed in a comment
  - not used in referencing to the page element
* changed type variable 'g_prezentacja_wczytywania'  from object to array
* use of defined in previous update a function 'PokazRamkeLadowania' and 'UkryjRamkeLadowania' for show / hide notification while Ajax request is processing
* changed logic of hiding notofications of loading contents inside function 'WczytajZewnetrznyHTMLdoTAGU'
  - now the 'UkryjRamkeLadowania' function is fired as a first expression of a 'load()' callback
  - does not matter which variant of callback will fire, the notification is always hided
  - works good for any case of that function, but no in case 'wybrana_galeria_rekurencja', where is recursion case is also used
  - while recursion works the each variant of success / failure is considered, so the hiding function is fired from beginnings of specific conditional expression
  - using that logic to perform the same number of variants of notification hiding as the quantity of variants of previously showed notifications (for now there are three different areas of loading notifications)
* every action button or input of that type on click is temporary disabled, it's impossible to redo any action until current action is complete
  - the goal is to block multiple request for the same action which might occur on still active button
  - when Ajax request is done (success or failure) the button is reenabled (or the new button or buttons list is created with active)
  - expression of reenabling is near the expression of hiding notification (inside cases: 'wybrana_galeria' or 'galeria_podstrona' or 'wybrany_spis_galerii') where the form or gallery nav button might be previously clicked and still inactive
  - thats why it's almost impossible to observe few requests until you can press fast any other of the neighboring buttons (if possible)
  - this could generate unknown gallery subpage because the last clicked gallery subpage might not be expected to be displayed (greedy vs undetermined alghoritm)
  - all the buttons might be disabled during Ajax request but no load-next-gallery-subpage big button (which is actually 'h2' element)
* its possible from now to observe all the quantity of the multiple Ajax requests send by pressing repeatedly the load-next-gallery-subpage button (or previously mentioned click on many buttons)
  - all the loading notification counts, with greater than one count, will generate that number isnide a notifiaction!
  - the counter is decremented on each hide action of given element and for debugging purpose its value is presented with added ' (- dbg)' string
* wherever possible from now is used previously defined function 'GenerujPowiadomienieOBledzie' to display an error details
  - replaced code of direct DOM manipulations
* changed logic inside function 'GenerujSpisGalerii'
  - counting of clicks on load-next-gallery-subpage-button is moved directly to the anonymous event function
  - a problem of new click when previous click is served (important!) 
  - moved the logic of hiding that notification inside 'WczytajZewnetrznyHTMLdoTAGU' when any callback of 'load()' starts (success/failure) 
* used 100% the same constants like referenced to the HTML id
  - changed 'spis_wybrane_galerie' to 'wybrane_galerie_spis'
  - changed took place inside many functions, which reads or modify the value or status of the connected HTML element 
* extended logic of function 'PokazRamkeLadowania' to display number of active Ajax calls connected with given notification now
  - presenting only a number if value is greater from one
  - removes any number when its value is one now
* also extended function 'UkryRamkeLadowania' in similar way
  - present actual quantity of Ajax requests, connected with given element
  - actual state is decrement beforre showing
  - any number is only showed when the value is greater than one
  - for decremented values equals one the simple variant is presented
  - of course when its value is zero or low then it's finally hided as before
  - important: added additional and temporary' (- dbg)' string to displayed content for debugging purposes, meaning that something was substarcted before showing!
* near the event functions of clicking the active elements are placed as many calls to 'PokazRamkeLadowania' with conected element of page
  - it allows for using system of simultaneous Ajax calls and extended notifications of loading
  - or it's placed nside named functions which fired from that event function
* changed logic to block next Ajax request inside event click on element with 'przycisk_galeria' class
  - impossible to reclick on the same button number while Ajax request incomplete
* removed showing element content immediately when click on load-next-gallery-subpage button
  - showing gallery subpage starts when Ajax request is done somehow

[-] REMOVED

-- jquery-3.2.1.js
* changed library version for compatibility with older browsers (IE mostly)
  - used unpacked version for development purposes for now
  - linked from 'index.php' instead previously used version of 'jquery-3.2.1.js'

-- jquery-3.2.1.min.js
* a minified version not really used inside this project
  - for now the project state it's not production state
  - removed from folder of application
  - probably a further replacement by that library @ v1
  - to absolute removal from project from now

---------------------------

v0.5.7 - prepared logic for hide/show of notifications of loading contents by Ajax; exchanged color of closing buttons; centered belt of Ajax status; alt in imgs; renamed id of loading notification

* v0.5.7 -- [2018-11-20]

[+] ADDED

-- index.php
* added an 'alt' attribute inside all 'img' tag
  - for now with empty content

-- witryna.js
* added semi-global variable for collecting the state of all page loading notifications, named 'g_prezentacja_wczytywania'
  - used by many later defined function
* JS logic allows for showing the animated notification while one or few Ajax requests were send simultaneously
  - the same or similar sent request are counted (wielokrotnie)
  - used mainly by showing next pages of gallery list, the load button might be pressed few times before any content returns from any  of Ajax requests (unordered resolving, also important!)
* created function 'InicjujRamkiLadowania' to initialize that state
  - defines a table of object, where each element is referenced to page element by its id and number of occurrences
  - numbers initialized as 0
* defined a function 'PokazRamkeLadowania' which allows to show given notifier element with specified time of appearing this animations
  - defined for every notify element of loading content with rotating image inside
  - added verifying logic values of parameters
  - uses a referenced names similar to ids of existing notification elements on page
  - uses also a consecutive number describing a occurence of next notification element on a page
  - only if element is defined on an inner list then its status might change by parameter, which increases counter of given element inside object
  - only if value of counter of given parameter is positive (important!), the specified element is showed on page with given time of appearing animation 
* defined function 'UkryRamkeLadowania' which hides specified notification of loading content
  - used when ended processing of Ajax request 
  - logic as an opposite to previously defined function 'PokazRamkeLadowania'
  - hides given element of notification only when its internal counter value is zero or below
  - hiding ends with animation with given time as a parameter
* two previously declared function for showing or hiding notification are not yet used on page!
* added conditiona statement for test purpose of listening the state change to 'complete' of a 'load()' function
* added many comments near the many conditional statements inside function 'WczytajZewnetrznyHTMLdoTAGU'
  - or in other places of JS code, when any descriptive content is needed

[*] MODIFIED

-- index.php
* changed name of id of the gallery loading notification element 
   - changed from 'wczytywanie' to 'wczytywanie_podstrony'
  - notification inside currently displayed gallery or its subpage 
  - for distinguish from othe better names of loading notifications
* slighty modified content inside list in footer area

-- zlobek-styl.css
* exchanged background color of site closing buttons
  - all buttons have exchanged their background color with their hover state background color and back again
  - also exchanged colors of borders
  - exchanged yellow color to medium gray and vice versa
  - including class 'krzyzyk_zamykanie' of notification and id 'debugger_zamykanie' of Ajax status belt
  - a better notification of possible actions
* proper centered of Ajax status belt with right side

-- witryna.js
* changed JS code references for already changed name of element id ('wczytywanie_podstrony')
* cosmetic change of text of an error notification inside function 'WczytajZewnetrznyHTMLdoTAGU'

---------------------------

v0.5.6 - added compatibility of html5shiv; '&times' better for all than regular 'x', fit CSS & JS for that

* v0.5.6 -- [2018-11-16]

[+] ADDED

-- index.php
* added link to external script source, a 'html5shiv' script
  - enables styling of 'unknown HTML5 elements' if youy are using an old version of IE 

[*] MODIFIED

-- index.php
* added down arrow imnside footer button to indicate drop-down content underneath
* changed closing 'x' symbol from a letter to special HTML character inside a Ajax status belt
* decreased indentations inside HTML code of page head area

-- zlobek-styl.css
* changed styles for exchanged 'x' symbol of any closing action inside any notification
   - class 'krzyzyk_zamykanie' needed corrected padding and line height due new element has different dimensions
  - removed paddings from media gueries of wider screens 
* added thin border around closing button of Ajax debugger with id 'debugger_zamykanie'
  - almost the same colors like fill color of the element, also in hover state

-- witryna.js
* delicate modification of generated content inside function 'GenerujPowiadomienieOBledzie'
  - uses a special HTML symbol of 'times;' instead regular 'x' letter for closing button when is builded a regular notification of error

---------------------------

v0.5.5 - Simulatron of Ajax, advanced controll, lot of logic & display; with OOP inside for logic & localSorage; better notifications with 'X', one sample notif @ start; restyled notif; footer button ON/OFF; header background

* v0.5.5 -- [2018-10-30]

[+] ADDED

-- index.php
* added a button with id of 'symulancja_button' inside footer area

-- zlobek-styl.css
* redefined a styles for an improved notifications
  - better styles for advanced structure, with rounded corners
  - increased font side to 1.5em to all text inside
  - the whole container has really a darkblue background, which looks like title belt (title content is positioned by its padding)
  - fixed size of element with exclamation-like-image
  - all its content is centered and placed each on top of others, exclamation point  first then description text
  - later the looks changes because of media queries, exclamation point is moved to the left side and the descriptive text to the right (works above 470px screen wide)
  - the description area is dark red with inner dark shadow, with set 'min-height' needed for wider screens when text content might be too short (low actually) to fit exclamation-like-image inside the whole notification
  - the element look is modified by media query, the exclamation-like-image is placed to the left of red background
* defined a paragraph style for centering the copyright notes inside footer

-- witryna.js
* added an click event of new button in footer of id 'symulancja_button'
  - a toggle for hide/show of Ajax status belt	
* added event delegation for click on 'krzyzyk_zamykanie' of every notification, which inide container of id 'galeria_spis'
  - a DOM up traversing, to hide parent element of clicked one, then start the animation on it and when it finish finally removes parent item 
* added similar event for click on 'debugger_zamykanie' of status belt of Ajax
  - fires a defined function for hiding that content, a function 'UkryjDebuggowanie'
 
[*] MODIFIED

-- index.php
* rebuilded an Ajax state notification, a better structure and basis for further styling 
* moved an ajax controlling state structure from place under header area to end of the HTML page
  - just a semantic rearranging the content, the ajax state content is fixed positioned on the top of the page
* a new paragraph surrounds a copyright notes, inside a footer, after its buttons
  - for better displaying and centering  

-- zlobek-styl.css
* increased width from 90% to 94% for 'p' elements of class 'blad'
* slighty changed background under the header when widh is greater than 1300px
  - a horizontal threshold (a 'jump') between blue colors is unnoticeable 
  - slighty modified ranges inside used radial gradient to smooth transition
  - the same colors definiotion as previously
  - defined a rule of full color backgound as a polyfill for super old browsers, without knowing the gradients
* changed global style 'status_ajaksa' for more interesting look
  - uses transparent background color as a basis
  - increased paddings
* the classses which JS dynamically adds has also a semi transporent background with less intensive color like their existing border
  - saved definitions for no support of transparency, a full color background which stays as previously defined

-- witryna.js
* uses owned function definitions of 'GenerujPowiadomienieOBledzie' for displaying a notification on errors
  - replaced some logic which displays simple notification by own code
  - no more inserted contents by hand, no more searching given element inside DOM and create a new content as text and inserting it into a specified element ('p' element here)
  - just use already defined function and put every needed parameters inside it to displaying expected notification
  - an easy way to remove notification by click at 'X', and the indicate content will be gone with animation of sliding
* for now function 'GenerujPowiadomienieOBledzie' works for every unsuccessful Ajax request but not for a gallery subpage, when the old notify method is still used
  - for that case must be defined advanced logic of changing content, not creating a new notify each times error occurs
  - and extra parameter must be passed to perform advanced logic
* notification with sample texts is always showed while initial page loading for a test purpose
  - just a presentation of a properly working content generator
  - easy to remove by 'X' button
* added verification logic inside function 'WczytajZewnetrznyHTMLdoTAGU'
  - removes possible active gray filter from current gallery element when displaying new content after interrupted Ajax request (after selecting any gallery number)
  - not a fully functional code by now, works nice for standard notifications, mosly for generated once on each error
 
* modifed logic inside function 'GenerujPowiadomienieOBledzie' to build advanced notifications
  - added more attributes and values inside default object
  - changes at generated structure, added more conditional logic for purspose inserting contents and elements with given classes
  - also a functional content, like closing button is configurable
* changed logic inside function 'WystartujDebuggerLokalny'
  - now uses two parameters, second is for 
  - uses like a OOP principles ;)
  - defined extra functions to perform standard operations, the same operations with long expressions which are duplicated in several places now
  - removed long old code by specified task function
  - slighty enchanced logic, added cleaning localStorage if value is modified or named differently
  - at the end this 'debugger' inits the function of showing controls of Ajax state (place probably for further rethink)
* functions used here:
  - 'AwariaWLocalStorage' sets a specified variable with value inside localStorage, indicating a 'BAD' state
  - 'NaprawaWLocalStorage' also sets a specified variable with value inside localStorage, but is opposite to previous and indicating a 'GOOD' state
  - 'ZerujLocalStorage' cleans used variable and its value inside localStorage space (removal) 
  - 'OdczytajLocalStorage' reads the specific value from localStorage and then verified that value with two possibilities, if matching any of them then it's returned
  - 'InicjujLocalStorage' internally uses function 'OdczytajLocalStorage' and depending from the result it can display belt for controlling state of an Ajax with checkbox field checked or unchecked (fires 'PokazDebuggowanie' to show all the status content)
  - 'PokazDebuggowanie' reveals all the Ajax status belt with animation
  - 'UkryjDebuggowanie' hides belt of Ajax status area
* changed selectors inside footer buttons to simply ids of elements when set event

---------------------------

v0.5.4 - ajax debugger & status info, engine of artificial notifications & localStorage, (& explainations); new logic of places with error notif; Error Notification System v0.2, not use by now; page refresh-button

* v0.5.4 -- [2018-10-24]

[+] ADDED

-- index.php
* added a structure 'Ajax Debugger' just before gallery list into adiv with id of 'odpluskwiacz_ajaksowy'
  - all the content placed into container class but the whole visible element is a element 'h4' content
  - new line between content as a distributor 
  - first row is a notifier of a state (working / errors)
  - second row changes the state with buttons and their actions
  - checkbox allows to remeber action as a permanent if is selected before click on button

-- zlobek-styl.css
* added style to describe simple displaying of 'Ajax debugger'
  - set of two or more rows (second row may be divided, depending of the available width)
  - initial hiding of the whole structure
  - first row uses a class 'status_ajaksa', where defined transparent border color and little padding to push away element border
* created also a two classes 'status_norma' and 'status_awaria', where defined only a border color
  - these two classes are used by JS logic to assign only one of them to element with 'status_ajaksa' class
* added new class for describing complex element of bug notify 
  - a class with name 'blad' for 'div' elements
  - different from a previously defined class 'blad' for 'p' elements ( these classes are similar but used in different elements)
  - added also a stylesd for their subelements like: 'h2' - title, 'p' - error details, class 'blad_ikona' - like image attention, class 'krzyzyk_zamykanie' - an interactive element of closing
  - also added hover state with changed look on interactive element to point a possible action
  - on the left or upper side of main element is placed 'warning image', the closing button is situated on the top-right corner
  - the description is displayed afer a title of the message
  - selected dark red as background color and noticeable light colored texts as any description or title 
  - a goal to create many error notifications by JS and live changing of the content of the page 

-- witryna.js
* explaination the logic of 'Ajax Debugger' here (with connection of its new HTML structure):
  - presents the actual state of the ajax debugger with colors
  - notification with green border means not interrupted actions
  - notification with red border the ajax actions are disrupted
  - next line box controlls the above border and Ajax request behavior, buttons changes that binary state from right work to error
  - checkbox is used to remeber the state between any page reload, if selected then later action is remembered on client browser

* constructed function 'GenerujPowiadomienieOBledzie' to build an error notification by given options
  - uses default inside 
  - also uses jQuery 'extend()' method to extend collection by given parameters
  - at least is needed a title and a description to build a standard notification with closing button
  - it's possible to build singulary notification with special value of attached attribute (used to build and modify the same notification element)
  - a conditional builing of an inside structure, depending from the value of given parameters (with extra content returned, e.g. buttons, additional classes, etc.) 
  - fired when any unsuccessful Ajax request or any error occurs connected with Ajax
* added a sample notification with sample title and description
  - there is no error now, it's just a test of a working system of 'Live Inserting Content'!
  - but if something goes wrong with server or forced error occurs (from simulated environment of function 'WystartujDebuggerLokalny') then the 'real notification' will be presented
  - for now old errors notification system works, not yet replacement by this new function

* declared function 'WystartujDebuggerLokalny' to purpose of internally controlling state of ajax calls
  - uses few declared inside functions
* 'ZepsujAjaksa' is a function which can disturb in any Ajax request by messing in its address (incorect URL to file and/or bad query string)
  - it also immediatelly changes the border color of the status notification to the red
* 'NaprawAjaksa' is a function which is opposite to previously defined and it restores a good configuration of Ajax
  - it removes class of 'status_awaria' and adds 'status_norma' to the status element so it's immediatelly noticeable that Ajax status is OK now (by green border around status element)
* inside function ''WystartujDebuggerLokalny' defined also an event system on click on any two buttons under the status area
  - buttons are ON/OFF switches and fires a functions, connected to the given click event (previously defined as 'NaprawAjaksa' or 'ZepsujAjaksa')
  - also on every click of button is verified state of checkbox
  - if it's set then a special values is set insida a localStorage mechanism
  - depending that values the overall 'WystartujDebuggerLokalny' function operates
* standard way is a positive working of logic with internal calling of 'NaprawAjaksa' inside
  - but if special parameter value is present in firing of 'WystartujDebuggerLokalny' or inside a localStorage are stored another special value then is fired function 'ZepsujAjaksa'
  - a checkbox is auto selected if it's stored a special variable and its value inside localStorage -- definitely the site won't work well then, and a notification of error will be shown
* with above logic it's possible to behaviorally testing a communications between nursery webserver and this application
  - simulating or just playing with try of reading of contents
  - it's possible to catch new errors on new states of application
  - localStorage saves the state for current web browser, resetting the state is possible by removing selection of checkbox and clicking on change-state-of-Ajax button

[*] MODIFIED

-- index.php
* added new item inside a list in footer 

-- zlobek-styl.css
*  changed style of displaying list elements inside unordered list in footer area
  - changed element do be displayed as 'inline-block' from previously defined 'inline'
  - changed also a 'line-height' atribute from 28px to 18px for almost identical look
  - added a little of bottom margin, which was impossible before 
  - see more inside fixed section of this update    

-- witryna.js
* placed declaration 'use strict' at the beginning of file
* changed logic condition of displaying error notifications while loading gallery list subpages (case 'spis_galerii')
  - importance of init states of counting of loaded elements, when is first displaying of the error notification
  - added extra button inwith action of rerfreshing the page in browser window
  - click event function declared immediately after adding content (event delegations) 
* also changed logic of every other notification of gallery subpage, is displayed first time or its content is edited if previously existed on page
  - similar to previously defined logic, where all the errors are counted continuously if they coming from loading gallery subpage
  - also uses a page scrolling to show current error notification
* added a two extra error notifications inside function 'GenerujSpisGalerii'
  - one of them might occur when improper values were readed from nursery webserwer
  - or any disrupt occur and received content might be incomplete
  - the first condition and notification is more likely then the second one, but if something was really were wrong then the previously generated conted form the 'WczytajZewnetrznyHTMLdoTAGU' will be displayed only!
  - added numbers '(1)' and '(2)' inside each of extra two notification content to easier distinguish between them when requested content were received but it turned out that it was incomplete 
  - tested many times and this extra conditions ocassionally might be met

[F] FIXED

-- zlobek-styl.css (& also depends from content inside 'index.php' or any generated content by JS)
* changed displaying style of list element, previosly it was 'inline', now 'inline-block' 
  - a well known option defined in CSS and working good for many years
  - block element is more configurable by CSS (Eureca! I've reinvented the wheel! ;) )
  - changes the behavior of element, its content is trying to fit inside the border and/or it's padding, eventually it increase this element height
  - the whole block element is enlarged to next line, when it's too much content inside it to fit in one row of available space
  - if any 'artificial spaces' are between content, the element can't be displayed properly in one o more lines (TODO: fix a content inside 'index.php') 
  - abandon all 'artificial spaces' in future of making texts, when creating static or generated content
  - fixes: #25 - 'Problem with breaking content (CSS)'

---------------------------

v0.5.3 - collecting of unsuccessful ajax requests, one place of notification of that & flashing last error notif; yellow h3s better visible; bigger buttons in upper form field

* v0.5.3 -- [2018-10-19]

[+] ADDED

-- witryna.js
* added semi global variable for collecting of unsuccessful ajax request  ('g_niewyslane_podstrony')
  - element is an object which saves a full address and a number of requested gallery inside
  - each element is added to collection inside function 'WczytajZewnetrznyHTMLdoTAGU', when that function is called with param 'spis_galerii'
  - adding just before any ajax request connected with read of next gallery subpage list 
  - on successful resolves this element is removed from the list
  - but in any error occurs that object stays inside the list of not done 
* added an extra condition to first displaying of an error notification or changing an existing notification
  - notification as a singular and one item for errors connected with next gallery page
* whatever goes wrong with next gallery subpage a user screen will be shifted to a place where the actual content of error is displayed
  - upper area of page is a target place, just before any gallery list items
  - current notification text with newly defined animation
* defined a function 'UsunPobraneZadanie' for purpose removing item from the list of unsuccessful calls by given attribute value
  - done by internal search inside a collection if any element's attrib is the same as given parameter
  - then the element of match is removed from the list and its previously index is returned
  - returned false means that no element found and nothing was removed
  - above function is fired on each successful ajax calls, when requested data received 

-- zlobek-styl.css
* added a two classes for distinguish new 'error' notification of 'p' element
  - basis as a defined already common 'error' 
  - defined selectors in one rules set of modified class 'blad'
* defined a 'szerszy_guzik' class for input buttons
  - slighty wider basis than inputs defined by 'maly_guzik' class
  - less pading for wider labels
* defined new animation 'zolty_blysk' and an the same named 'animacja_zolty_blysk' class for notifying about newly inserted errors
  - animation like a differentiator of active element
* added modificators for wider screen by media queries
  - redefined slighty wider 'min-width' on some thresholds for form buttons
   
[*] MODIFIED

-- index.php
* added an extra class to the first button group of selecting any gallery number
  - visually bigger buttons inside upper form fields
  - for test purpose of usability on touch screens 
* changed some word order or text of a header inside footer
* modified a value of fittext call function for main heading of logo
 
-- zlobek-styl.css
* changed global 'h3' element
  - colored to yellow from previously violet
  - changed shadow from light gray to darker for better contrast under yellow texts
* modified class 'blad' as the basis for another class element
  - slighty decreased font size to 1.7em from 2ems
  - added padding around
  - increased border width from 2px to 3px
* little changes on class 'maly_guzik'
  - min-width increased by 10px to 130px
  - slighty decreased horizontal padding
* added indentions to lastly defined animations

-- witryna.js
* modified logic inside function 'GenerujSpisGalerii'
  - if any error occurs while initial ajax request and some values can't be readed then page display an error notificastion and any further actions will be suspended
  - no show up navigation links or action button in that case
  - immediate page refresh needed or delayed action by undefined waiting time for working nursery webserver
* changes logic of computing target coordinates for dropped puzzle elements
  - inside function 'RuchUpuszczaniaJS'
* changed expression inside function 'UbijReklamy', because hosting company changed method of displaying their big adverisements
* code cleanings
  - removed unnecessary spaces from the code (mainly before commas, inside functions calls, etc.)
  - or added extra spaces or comments on function declaration endings

---------------------------

v0.5.2 - draggable items of game are initially arranged after clicks; hosting ad-killer; newer footer contents; slighty improved readability of some JS code

* v0.5.2 -- [2018-09-25]

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

* v0.5.1 -- [2018-09-24]

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

-- zlobek-styl.css
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

-- zlobek-styl.css
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

updated project state to v0.1.2

* v0.1.2 -- [2017-10-07]

[*] MODIFIED

-- index.php
* small changes in container ids
  - modified contents of selected buttons and text sections
* testing behavior for successful and unsuccessful communication with nursery server

[-] REMOVED

-- index.php
* **temporary disabled** auto loading a table of contents

---------------------------

v0.1.1a - updated project state

* v0.1.1a -- [2017-10-05]

[+] ADDED

-- index.php
* trying to automatic display a table of contents (first page)
  - auto start after each page opening or refreshing
  - opens home page last gallery list from nursery server (first page of table of gallery contents)
  - generated links for viewing only (misleading targets)
  - no visual notifications while fetching content from server like in gallery subpage while loading current gallery
* you can browse now between subgalleries
  - buttons now have working actions
  - only if there any subgalleries exists
  - *button or buttons as a link to any other than actual displayed subgallery* (modified)

[*] MODIFIED

-- index.php
* many changes inside file, mainly inside 'script' section...
* lot of indentation changes, many new lines and rearranged contents
  - tab keys vs spaces and vice versa
  - used some comments in HTML

[!] BUG! 

* cannot view any galleries
   - the target area for uploaded images does not appear
   - thumbnail images are not displayed
   - only descriptions of photos without proper photos visible in the yellow test field
   - reference error in console: "TypeError: nr_galerii is undefined" 

[F] FIXED

-- index.php
* the above bug (cannot view any galleries)
* specified right source container to search in

---------------------------

v0.1b - added project files

* v0.1b - [2017-09-25]

[+] ADDED

-- new file 'index.php'
* main index.php file
* for now all the HTML content and the overall logic (JavaScript) lands here 

-- new file 'przechwytywacz.php'
* interceptor file

-- new file 'index.php'
* main index.php file

-- new file 'reset.css'
* added css reset file

-- new file 'styl.css'
* many CSS rules in file
* added styles with gradients or single color background (polyfills)
* added simple media queries

-- new file 'jquery-3.2.1.js' (untracked!)
* added jQuery lib v3.2.1
* this file linked from 'index.php'

-- new file 'jquery-3.2.1.min.js' (untracked!)
* added jQuery lib v3.2.1, as minified file

-- new folder 'lightbox'
* a place for holding Lightbox jQuery plugin 
* also with three subfolders inside to hold all needed resources
  - self explanatory names of resources as subfolders name: 'css', 'images' and 'js'
* not mentioned here every file, see summary @git!
  - the most important file to link is 'lightbox/js/lightbox.js' (unminified version)

-- new file '_changelog.md'
* added log file (this file!)

[@] SUMMARY

-- Available funcionalities:
* displaying a first page of any gallery provided by form
  - displays subpage referers for current gallery only if any exist
  - not yet possible to browse any subpage even if available
* only full working address to gallery allows to display them in this page
  - accepts only links to this nursery website
  - incorect value or no value displays error notyfication
  - incorect link referrer may display wrong or no gallery page
* enables slideshow for any displayed images (thumbnail photos)  
* sample address hardcoded into form field
  - re-entering default value by nearest button
* only one time views of a gallery
  - trigger buttons get disabled after use
  - needs a page refresh
  - added refresh button in page header
* yellow box just for checking existency of gallery subpages (only for viewing!)
* added simple hide / show animation triggered by buttons in footer
* added basic loging of actions in console* (modified)
  