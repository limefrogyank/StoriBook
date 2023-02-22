# StoriBook
Display a series of webpages within a single LMS course page in a window that includes popout navigation, navbar navigation, and full-screen modes.  This window is fully responsive on both large and small screens.  A print button is included to merge all webpages into one long view without the menu that is easily printable.  

## Usage ##
Copy the files in the bin directory or clone this repo and build it yourself using `npm run build`.  Add **only** the javascript file to your html page:
```
<script src="dist/bundle.js"></script>
```
Then, use the custom web element called `<stori-book>` along with `<stori-page>` to build your StoriBook.
```
<stori-book>
    <stori-page title="Very long title to show how it fits into the space given." src="page1.html">Page1</stori-page>
    <stori-page title="page2" src="page2.html">Page2</stori-page>	
    <stori-page title="page3" src="page3.html">Page3</stori-page>
</stori-book>
```
The `title` attribute on each `<stori-page>` is required for the menu label and a title header when in narrow screen mode.  The `src` attribute is required in order to download the html file.  Currently, NO html sanitation is built-in, so please only link to html files you control on your own domain.  The text content inside each `<stori-page>` shown in the example is completely optional.  It doesn't show in the rendered page, but it WILL show in a WYSIWYG html editor.  Otherwise, this web-element will be completely invisible in the editor.  

`<stori-book>` can take a few optional attributes:  

`menu-width` controls how wide the side menu is in wide, narrow, and full-screen screen modes.  It accepts a standard css width such as '200px', '30%', etc.   

`default-page-number` can adjust the starting page that is shown when this element loads.  It uses a one-based index and the starting page will always be page 1 (the first one) if the attribute is not used.

`viewHeight` is a special attribute that lets you use viewheight css (e.g. 'height: 80vh') inside an iframe.  For example, on D2L Brightspace, applying height: 80vh will not work on an element in a Content page, because that content page is inside an iframe and the iframe is set to expand as much as the content.  This setting lets you use that feature inside an iframe as if it was not in one.  The default value is 80 (as in 80vh).  If you want a different view height you can change it here.  If you want to use a fixed height such as '500px', you can instead use plain css or add it to the `<stori-book>` style tag.

### Files in your LMS ###

On D2L, you could simply make a regular Content page that is visible to students and put the `<stori-book>` in that page.  Then, you make several more Content pages that will be the content for your `<stori-page>`s.  Make them invisible so students won't be able to see them.  If your links are relative, they will still be visible to the students when they visit the main page with the `<stori-book>`.

### Credits ###
This is based on design work started by Jennifer Lucas.

