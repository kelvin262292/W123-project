# Test info

- Name: Cross-Browser Compatibility Testing >> chromium Browser Tests >> Search functionality works on chromium
- Location: D:\W123-project\tests\cross-browser.spec.ts:53:7

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "error"
Received string:        "<!DOCTYPE html><html lang=\"en\"><head>
    <script type=\"module\">import { injectIntoGlobalHook } from \"/@react-refresh\";
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;</script>

    <script type=\"module\" src=\"/@vite/client\"></script>

    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <link rel=\"stylesheet\" href=\"/src/index.css\">

    <title>Chef</title>

    <meta property=\"og:image\" content=\"/og-preview.png\">
  <style type=\"text/css\" data-vite-dev-id=\"D:/W123-project/src/index.css\">*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
5. Use the user's configured `sans` font-feature-settings by default.
6. Use the user's configured `sans` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: Inter var, ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured `mono` font-family by default.
2. Use the user's configured `mono` font-feature-settings by default.
3. Use the user's configured `mono` font-variation-settings by default.
4. Correct the odd `em` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role=\"button\"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden=\"until-found\"])) {
  display: none;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}
.pointer-events-none {
  pointer-events: none;
}
.static {
  position: static;
}
.fixed {
  position: fixed;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.sticky {
  position: sticky;
}
.inset-0 {
  inset: 0px;
}
.-right-1 {
  right: -0.25rem;
}
.-top-1 {
  top: -0.25rem;
}
.bottom-0 {
  bottom: 0px;
}
.bottom-1\\/3 {
  bottom: 33.333333%;
}
.bottom-1\\/4 {
  bottom: 25%;
}
.bottom-2 {
  bottom: 0.5rem;
}
.bottom-20 {
  bottom: 5rem;
}
.bottom-3 {
  bottom: 0.75rem;
}
.bottom-32 {
  bottom: 8rem;
}
.bottom-4 {
  bottom: 1rem;
}
.bottom-40 {
  bottom: 10rem;
}
.bottom-6 {
  bottom: 1.5rem;
}
.left-0 {
  left: 0px;
}
.left-1\\/2 {
  left: 50%;
}
.left-1\\/3 {
  left: 33.333333%;
}
.left-1\\/4 {
  left: 25%;
}
.left-10 {
  left: 2.5rem;
}
.left-2 {
  left: 0.5rem;
}
.left-3 {
  left: 0.75rem;
}
.left-3\\/4 {
  left: 75%;
}
.left-4 {
  left: 1rem;
}
.right-0 {
  right: 0px;
}
.right-1 {
  right: 0.25rem;
}
.right-1\\/3 {
  right: 33.333333%;
}
.right-1\\/4 {
  right: 25%;
}
.right-2 {
  right: 0.5rem;
}
.right-20 {
  right: 5rem;
}
.right-3 {
  right: 0.75rem;
}
.right-4 {
  right: 1rem;
}
.top-0 {
  top: 0px;
}
.top-1 {
  top: 0.25rem;
}
.top-1\\/2 {
  top: 50%;
}
.top-1\\/4 {
  top: 25%;
}
.top-10 {
  top: 2.5rem;
}
.top-2 {
  top: 0.5rem;
}
.top-20 {
  top: 5rem;
}
.top-3 {
  top: 0.75rem;
}
.top-3\\/4 {
  top: 75%;
}
.top-32 {
  top: 8rem;
}
.top-4 {
  top: 1rem;
}
.top-40 {
  top: 10rem;
}
.top-8 {
  top: 2rem;
}
.z-10 {
  z-index: 10;
}
.z-50 {
  z-index: 50;
}
.z-40 {
  z-index: 40;
}
.mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.my-8 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-12 {
  margin-bottom: 3rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.mb-8 {
  margin-bottom: 2rem;
}
.ml-1 {
  margin-left: 0.25rem;
}
.mr-3 {
  margin-right: 0.75rem;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-12 {
  margin-top: 3rem;
}
.mt-16 {
  margin-top: 4rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-6 {
  margin-top: 1.5rem;
}
.mt-8 {
  margin-top: 2rem;
}
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.flex {
  display: flex;
}
.inline-flex {
  display: inline-flex;
}
.table {
  display: table;
}
.grid {
  display: grid;
}
.hidden {
  display: none;
}
.aspect-square {
  aspect-ratio: 1 / 1;
}
.h-1 {
  height: 0.25rem;
}
.h-10 {
  height: 2.5rem;
}
.h-12 {
  height: 3rem;
}
.h-16 {
  height: 4rem;
}
.h-2 {
  height: 0.5rem;
}
.h-20 {
  height: 5rem;
}
.h-24 {
  height: 6rem;
}
.h-28 {
  height: 7rem;
}
.h-3 {
  height: 0.75rem;
}
.h-32 {
  height: 8rem;
}
.h-4 {
  height: 1rem;
}
.h-40 {
  height: 10rem;
}
.h-48 {
  height: 12rem;
}
.h-5 {
  height: 1.25rem;
}
.h-6 {
  height: 1.5rem;
}
.h-64 {
  height: 16rem;
}
.h-8 {
  height: 2rem;
}
.h-96 {
  height: 24rem;
}
.h-full {
  height: 100%;
}
.max-h-32 {
  max-height: 8rem;
}
.max-h-\\[80vh\\] {
  max-height: 80vh;
}
.max-h-\\[90vh\\] {
  max-height: 90vh;
}
.min-h-screen {
  min-height: 100vh;
}
.w-1 {
  width: 0.25rem;
}
.w-10 {
  width: 2.5rem;
}
.w-12 {
  width: 3rem;
}
.w-16 {
  width: 4rem;
}
.w-2 {
  width: 0.5rem;
}
.w-20 {
  width: 5rem;
}
.w-24 {
  width: 6rem;
}
.w-28 {
  width: 7rem;
}
.w-3 {
  width: 0.75rem;
}
.w-32 {
  width: 8rem;
}
.w-4 {
  width: 1rem;
}
.w-40 {
  width: 10rem;
}
.w-5 {
  width: 1.25rem;
}
.w-6 {
  width: 1.5rem;
}
.w-64 {
  width: 16rem;
}
.w-8 {
  width: 2rem;
}
.w-full {
  width: 100%;
}
.w-px {
  width: 1px;
}
.min-w-\\[60px\\] {
  min-width: 60px;
}
.max-w-2xl {
  max-width: 42rem;
}
.max-w-4xl {
  max-width: 56rem;
}
.max-w-md {
  max-width: 28rem;
}
.max-w-none {
  max-width: none;
}
.flex-1 {
  flex: 1 1 0%;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.grow {
  flex-grow: 1;
}
.-translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-x-full {
  --tw-translate-x: -100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.-translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-x-full {
  --tw-translate-x: 100%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-0 {
  --tw-translate-y: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-2 {
  --tw-translate-y: 0.5rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.translate-y-8 {
  --tw-translate-y: 2rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-110 {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.scale-95 {
  --tw-scale-x: .95;
  --tw-scale-y: .95;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes bounce {

  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
.animate-bounce {
  animation: bounce 1s infinite;
}
@keyframes pulse {

  50% {
    opacity: .5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes spin {

  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.cursor-pointer {
  cursor: pointer;
}
.list-disc {
  list-style-type: disc;
}
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.flex-col {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.items-start {
  align-items: flex-start;
}
.items-end {
  align-items: flex-end;
}
.items-center {
  align-items: center;
}
.justify-end {
  justify-content: flex-end;
}
.justify-center {
  justify-content: center;
}
.justify-between {
  justify-content: space-between;
}
.gap-12 {
  gap: 3rem;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-6 {
  gap: 1.5rem;
}
.gap-8 {
  gap: 2rem;
}
.gap-form-field {
  gap: 16px;
}
.space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-x-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(2rem * var(--tw-space-x-reverse));
  margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.space-y-12 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(3rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(3rem * var(--tw-space-y-reverse));
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
}
.divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-divide-opacity, 1));
}
.overflow-auto {
  overflow: auto;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-x-auto {
  overflow-x: auto;
}
.overflow-y-auto {
  overflow-y: auto;
}
.break-all {
  word-break: break-all;
}
.rounded {
  border-radius: 8px;
}
.rounded-2xl {
  border-radius: 1rem;
}
.rounded-3xl {
  border-radius: 1.5rem;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.rounded-md {
  border-radius: 0.375rem;
}
.rounded-xl {
  border-radius: 0.75rem;
}
.rounded-l-full {
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
}
.rounded-l-lg {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.rounded-r-full {
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
}
.rounded-r-lg {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.rounded-t-3xl {
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
}
.border {
  border-width: 1px;
}
.border-2 {
  border-width: 2px;
}
.border-4 {
  border-width: 4px;
}
.border-x {
  border-left-width: 1px;
  border-right-width: 1px;
}
.border-b {
  border-bottom-width: 1px;
}
.border-b-2 {
  border-bottom-width: 2px;
}
.border-t {
  border-top-width: 1px;
}
.border-dashed {
  border-style: dashed;
}
.border-blue-200 {
  --tw-border-opacity: 1;
  border-color: rgb(191 219 254 / var(--tw-border-opacity, 1));
}
.border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.border-blue-600 {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity, 1));
}
.border-gray-100 {
  --tw-border-opacity: 1;
  border-color: rgb(243 244 246 / var(--tw-border-opacity, 1));
}
.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
}
.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.border-gray-800 {
  --tw-border-opacity: 1;
  border-color: rgb(31 41 55 / var(--tw-border-opacity, 1));
}
.border-green-200 {
  --tw-border-opacity: 1;
  border-color: rgb(187 247 208 / var(--tw-border-opacity, 1));
}
.border-red-200 {
  --tw-border-opacity: 1;
  border-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.border-transparent {
  border-color: transparent;
}
.border-white\\/20 {
  border-color: rgb(255 255 255 / 0.2);
}
.border-white\\/50 {
  border-color: rgb(255 255 255 / 0.5);
}
.border-white\\/70 {
  border-color: rgb(255 255 255 / 0.7);
}
.border-yellow-200 {
  --tw-border-opacity: 1;
  border-color: rgb(254 240 138 / var(--tw-border-opacity, 1));
}
.border-t-transparent {
  border-top-color: transparent;
}
.bg-black\\/20 {
  background-color: rgb(0 0 0 / 0.2);
}
.bg-black\\/50 {
  background-color: rgb(0 0 0 / 0.5);
}
.bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.bg-blue-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(191 219 254 / var(--tw-bg-opacity, 1));
}
.bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
.bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.bg-gray-900 {
  --tw-bg-opacity: 1;
  background-color: rgb(17 24 39 / var(--tw-bg-opacity, 1));
}
.bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.bg-green-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(74 222 128 / var(--tw-bg-opacity, 1));
}
.bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.bg-green-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(22 163 74 / var(--tw-bg-opacity, 1));
}
.bg-indigo-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(199 210 254 / var(--tw-bg-opacity, 1));
}
.bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.bg-orange-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 247 237 / var(--tw-bg-opacity, 1));
}
.bg-pink-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(251 207 232 / var(--tw-bg-opacity, 1));
}
.bg-pink-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(244 114 182 / var(--tw-bg-opacity, 1));
}
.bg-pink-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 39 119 / var(--tw-bg-opacity, 1));
}
.bg-purple-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 232 255 / var(--tw-bg-opacity, 1));
}
.bg-purple-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(233 213 255 / var(--tw-bg-opacity, 1));
}
.bg-purple-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(192 132 252 / var(--tw-bg-opacity, 1));
}
.bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.bg-purple-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(168 85 247 / var(--tw-bg-opacity, 1));
}
.bg-purple-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(147 51 234 / var(--tw-bg-opacity, 1));
}
.bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.bg-red-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));
}
.bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.bg-white\\/10 {
  background-color: rgb(255 255 255 / 0.1);
}
.bg-white\\/20 {
  background-color: rgb(255 255 255 / 0.2);
}
.bg-white\\/30 {
  background-color: rgb(255 255 255 / 0.3);
}
.bg-white\\/40 {
  background-color: rgb(255 255 255 / 0.4);
}
.bg-white\\/5 {
  background-color: rgb(255 255 255 / 0.05);
}
.bg-white\\/50 {
  background-color: rgb(255 255 255 / 0.5);
}
.bg-white\\/60 {
  background-color: rgb(255 255 255 / 0.6);
}
.bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
.bg-yellow-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 204 21 / var(--tw-bg-opacity, 1));
}
.bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.bg-black {
  --tw-bg-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));
}
.bg-opacity-50 {
  --tw-bg-opacity: 0.5;
}
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.bg-gradient-to-t {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
}
.from-black\\/20 {
  --tw-gradient-from: rgb(0 0 0 / 0.2) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-black\\/30 {
  --tw-gradient-from: rgb(0 0 0 / 0.3) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-black\\/60 {
  --tw-gradient-from: rgb(0 0 0 / 0.6) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-100 {
  --tw-gradient-from: #dbeafe var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(219 234 254 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-100\\/30 {
  --tw-gradient-from: rgb(219 234 254 / 0.3) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(219 234 254 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-400 {
  --tw-gradient-from: #60a5fa var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(96 165 250 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-50 {
  --tw-gradient-from: #eff6ff var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(239 246 255 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-500 {
  --tw-gradient-from: #3b82f6 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-500\\/10 {
  --tw-gradient-from: rgb(59 130 246 / 0.1) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-500\\/5 {
  --tw-gradient-from: rgb(59 130 246 / 0.05) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-blue-600 {
  --tw-gradient-from: #2563eb var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(37 99 235 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-gray-50 {
  --tw-gradient-from: #f9fafb var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(249 250 251 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-green-500 {
  --tw-gradient-from: #22c55e var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(34 197 94 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-green-500\\/5 {
  --tw-gradient-from: rgb(34 197 94 / 0.05) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(34 197 94 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-orange-500 {
  --tw-gradient-from: #f97316 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(249 115 22 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-pink-400 {
  --tw-gradient-from: #f472b6 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(244 114 182 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-purple-100\\/30 {
  --tw-gradient-from: rgb(243 232 255 / 0.3) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(243 232 255 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-purple-500 {
  --tw-gradient-from: #a855f7 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(168 85 247 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-red-500 {
  --tw-gradient-from: #ef4444 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(239 68 68 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-white {
  --tw-gradient-from: #fff var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-yellow-400 {
  --tw-gradient-from: #facc15 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(250 204 21 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-yellow-400\\/20 {
  --tw-gradient-from: rgb(250 204 21 / 0.2) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(250 204 21 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.via-black\\/40 {
  --tw-gradient-to: rgb(0 0 0 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(0 0 0 / 0.4) var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.via-orange-500 {
  --tw-gradient-to: rgb(249 115 22 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), #f97316 var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.via-orange-500\\/20 {
  --tw-gradient-to: rgb(249 115 22 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(249 115 22 / 0.2) var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.via-pink-500 {
  --tw-gradient-to: rgb(236 72 153 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), #ec4899 var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.via-purple-600 {
  --tw-gradient-to: rgb(147 51 234 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), #9333ea var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.via-transparent {
  --tw-gradient-to: rgb(0 0 0 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), transparent var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.via-white {
  --tw-gradient-to: rgb(255 255 255 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), #fff var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.via-yellow-200 {
  --tw-gradient-to: rgb(254 240 138 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), #fef08a var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.to-black\\/60 {
  --tw-gradient-to: rgb(0 0 0 / 0.6) var(--tw-gradient-to-position);
}
.to-blue-50 {
  --tw-gradient-to: #eff6ff var(--tw-gradient-to-position);
}
.to-blue-500 {
  --tw-gradient-to: #3b82f6 var(--tw-gradient-to-position);
}
.to-blue-500\\/5 {
  --tw-gradient-to: rgb(59 130 246 / 0.05) var(--tw-gradient-to-position);
}
.to-cyan-600 {
  --tw-gradient-to: #0891b2 var(--tw-gradient-to-position);
}
.to-emerald-600 {
  --tw-gradient-to: #059669 var(--tw-gradient-to-position);
}
.to-orange-500 {
  --tw-gradient-to: #f97316 var(--tw-gradient-to-position);
}
.to-pink-400 {
  --tw-gradient-to: #f472b6 var(--tw-gradient-to-position);
}
.to-pink-500 {
  --tw-gradient-to: #ec4899 var(--tw-gradient-to-position);
}
.to-pink-600 {
  --tw-gradient-to: #db2777 var(--tw-gradient-to-position);
}
.to-purple-100 {
  --tw-gradient-to: #f3e8ff var(--tw-gradient-to-position);
}
.to-purple-400 {
  --tw-gradient-to: #c084fc var(--tw-gradient-to-position);
}
.to-purple-50 {
  --tw-gradient-to: #faf5ff var(--tw-gradient-to-position);
}
.to-purple-500 {
  --tw-gradient-to: #a855f7 var(--tw-gradient-to-position);
}
.to-purple-500\\/10 {
  --tw-gradient-to: rgb(168 85 247 / 0.1) var(--tw-gradient-to-position);
}
.to-purple-500\\/5 {
  --tw-gradient-to: rgb(168 85 247 / 0.05) var(--tw-gradient-to-position);
}
.to-purple-600 {
  --tw-gradient-to: #9333ea var(--tw-gradient-to-position);
}
.to-red-400 {
  --tw-gradient-to: #f87171 var(--tw-gradient-to-position);
}
.to-red-500 {
  --tw-gradient-to: #ef4444 var(--tw-gradient-to-position);
}
.to-red-500\\/20 {
  --tw-gradient-to: rgb(239 68 68 / 0.2) var(--tw-gradient-to-position);
}
.to-red-600 {
  --tw-gradient-to: #dc2626 var(--tw-gradient-to-position);
}
.to-transparent {
  --tw-gradient-to: transparent var(--tw-gradient-to-position);
}
.to-violet-600 {
  --tw-gradient-to: #7c3aed var(--tw-gradient-to-position);
}
.to-white {
  --tw-gradient-to: #fff var(--tw-gradient-to-position);
}
.bg-clip-text {
  -webkit-background-clip: text;
          background-clip: text;
}
.object-cover {
  -o-object-fit: cover;
     object-fit: cover;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 0.75rem;
}
.p-4 {
  padding: 1rem;
}
.p-5 {
  padding: 1.25rem;
}
.p-6 {
  padding: 1.5rem;
}
.p-8 {
  padding: 2rem;
}
.px-10 {
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}
.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-12 {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.pb-4 {
  padding-bottom: 1rem;
}
.pl-10 {
  padding-left: 2.5rem;
}
.pl-12 {
  padding-left: 3rem;
}
.pl-5 {
  padding-left: 1.25rem;
}
.pr-12 {
  padding-right: 3rem;
}
.pr-4 {
  padding-right: 1rem;
}
.pt-2 {
  padding-top: 0.5rem;
}
.pt-3 {
  padding-top: 0.75rem;
}
.pt-4 {
  padding-top: 1rem;
}
.pt-6 {
  padding-top: 1.5rem;
}
.pt-8 {
  padding-top: 2rem;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;
}
.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.text-6xl {
  font-size: 3.75rem;
  line-height: 1;
}
.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-bold {
  font-weight: 700;
}
.font-light {
  font-weight: 300;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.capitalize {
  text-transform: capitalize;
}
.leading-relaxed {
  line-height: 1.625;
}
.text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.text-blue-700 {
  --tw-text-opacity: 1;
  color: rgb(29 78 216 / var(--tw-text-opacity, 1));
}
.text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
.text-blue-900 {
  --tw-text-opacity: 1;
  color: rgb(30 58 138 / var(--tw-text-opacity, 1));
}
.text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
.text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
.text-orange-600 {
  --tw-text-opacity: 1;
  color: rgb(234 88 12 / var(--tw-text-opacity, 1));
}
.text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
}
.text-primary {
  --tw-text-opacity: 1;
  color: rgb(79 70 229 / var(--tw-text-opacity, 1));
}
.text-purple-600 {
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity, 1));
}
.text-purple-800 {
  --tw-text-opacity: 1;
  color: rgb(107 33 168 / var(--tw-text-opacity, 1));
}
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
.text-secondary {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.text-transparent {
  color: transparent;
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.text-yellow-200 {
  --tw-text-opacity: 1;
  color: rgb(254 240 138 / var(--tw-text-opacity, 1));
}
.text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
}
.text-yellow-800 {
  --tw-text-opacity: 1;
  color: rgb(133 77 14 / var(--tw-text-opacity, 1));
}
.line-through {
  text-decoration-line: line-through;
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 1;
}
.opacity-20 {
  opacity: 0.2;
}
.opacity-30 {
  opacity: 0.3;
}
.opacity-5 {
  opacity: 0.05;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-75 {
  opacity: 0.75;
}
.opacity-80 {
  opacity: 0.8;
}
.opacity-90 {
  opacity: 0.9;
}
.opacity-95 {
  opacity: 0.95;
}
.shadow-2xl {
  --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-xl {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.drop-shadow-2xl {
  --tw-drop-shadow: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.filter {
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.backdrop-blur-sm {
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
}
.transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.delay-200 {
  transition-delay: 200ms;
}
.duration-100 {
  transition-duration: 100ms;
}
.duration-1000 {
  transition-duration: 1000ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.duration-500 {
  transition-duration: 500ms;
}
.duration-700 {
  transition-duration: 700ms;
}
.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.ease-linear {
  transition-timing-function: linear;
}

:root {
  --color-light: #ffffff;
  --color-dark: #171717;
}

.accent-text {
  --tw-text-opacity: 1;
  color: rgb(71 85 105 / var(--tw-text-opacity, 1));
}

body {
  font-family:
    \"Inter Variable\",
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    \"Segoe UI\",
    Roboto,
    \"Helvetica Neue\",
    Arial,
    \"Noto Sans\",
    sans-serif,
    \"Apple Color Emoji\",
    \"Segoe UI Emoji\",
    \"Segoe UI Symbol\",
    \"Noto Color Emoji\";
  color: var(--color-dark);
  background: var(--color-light);
}

/* only use this to update the style of the auth input fields. use a different class for all other input fields */
.auth-input-field {
  width: 100%;
  border-radius: 12px;
  border-width: 1px;
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.auth-input-field:hover {
  --tw-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 1px 4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.auth-input-field:focus {
  --tw-border-opacity: 1;
  border-color: rgb(79 70 229 / var(--tw-border-opacity, 1));
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(79 70 229 / var(--tw-ring-opacity, 1));
}

/* only use this to update the style of the auth buttons. use the button class for all other buttons */
.auth-button {
  width: 100%;
  border-radius: 8px;
  --tw-bg-opacity: 1;
  background-color: rgb(79 70 229 / var(--tw-bg-opacity, 1));
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-weight: 600;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.auth-button:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(67 56 202 / var(--tw-bg-opacity, 1));
  --tw-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 1px 4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.auth-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Enhanced Banner carousel animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInUp {
  from { 
    opacity: 0; 
    transform: translateY(50px) scale(0.9); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes expand {
  from { width: 0; }
  to { width: 6rem; }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes glowText {
  0%, 100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
  50% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4); }
}

@keyframes bounceGentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes bounceX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

@keyframes floatMedium {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(-3deg); }
}

@keyframes floatFast {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}

@keyframes floatParticle {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  25% { transform: translateY(-5px) translateX(2px); }
  50% { transform: translateY(-10px) translateX(0px); }
  75% { transform: translateY(-5px) translateX(-2px); }
}

@keyframes wave {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

@keyframes waveReverse {
  0%, 100% { transform: translateX(100%); }
  50% { transform: translateX(-100%); }
}

@keyframes pulseHot {
  0%, 100% { 
    transform: scale(1); 
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); 
  }
  50% { 
    transform: scale(1.05); 
    box-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 0 30px rgba(239, 68, 68, 0.6); 
  }
}

@keyframes flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes pulsePrice {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes pulseButton {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.01); }
}

@keyframes countUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Animation classes */
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
.animate-fade-in-delay { animation: fadeIn 0.8s ease-out 0.2s both; }
.animate-fade-in-delay-2 { animation: fadeIn 0.8s ease-out 0.4s both; }
.animate-slide-in-up { animation: slideInUp 0.6s ease-out; }
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
.animate-expand { animation: expand 0.8s ease-out 0.3s both; }
.animate-gradient-shift { 
  background-size: 200% 200%; 
  animation: gradientShift 3s ease infinite; 
}
.animate-gradient-flow { 
  background-size: 200% 200%; 
  animation: gradientFlow 3s ease infinite; 
}
.animate-glow-text { animation: glowText 2s ease-in-out infinite; }
.animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
.animate-bounce-gentle { animation: bounceGentle 2s ease-in-out infinite; }
.animate-bounce-x { animation: bounceX 0.5s ease-in-out; }
.animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
.animate-sparkle-delay { animation: sparkle 1.5s ease-in-out infinite 0.5s; }
.animate-sparkle-fast { animation: sparkle 1s ease-in-out infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-float-slow { animation: floatSlow 4s ease-in-out infinite; }
.animate-float-medium { animation: floatMedium 3.5s ease-in-out infinite; }
.animate-float-fast { animation: floatFast 2.5s ease-in-out infinite; }
.animate-float-particle { animation: floatParticle 3s ease-in-out infinite; }
.animate-float-particle-delay { animation: floatParticle 3s ease-in-out infinite 1s; }
.animate-float-particle-fast { animation: floatParticle 2s ease-in-out infinite; }
.animate-wave { animation: wave 4s ease-in-out infinite; }
.animate-wave-reverse { animation: waveReverse 4s ease-in-out infinite; }
.animate-pulse-hot { animation: pulseHot 1.5s ease-in-out infinite; }
.animate-flash { animation: flash 1s ease-in-out infinite; }
.animate-pulse-price { animation: pulsePrice 2s ease-in-out infinite; }
.animate-pulse-button { animation: pulseButton 2s ease-in-out infinite; }
.animate-count-up { animation: countUp 0.5s ease-out; }

/* Out of stock overlay */
.out-of-stock-overlay { position: relative; }
.out-of-stock-overlay::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6); z-index: 1; border-radius: 1rem;
}
.out-of-stock-overlay::after {
  content: 'HẾT HÀNG'; position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotate(-15deg); color: white;
  font-weight: bold; font-size: 1.5rem; z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); letter-spacing: 2px;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Parallax background */
.parallax-bg {
  transform-style: preserve-3d;
}

/* Enhanced hover effects */
.hover-lift {
  transition: all 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Smooth transitions */
* {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #667eea, #764ba2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #5a6fd8, #6a4190);
}

.hover\\:-translate-y-0\\.5:hover {
  --tw-translate-y: -0.125rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:-translate-y-1:hover {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:-translate-y-2:hover {
  --tw-translate-y: -0.5rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:rotate-1:hover {
  --tw-rotate: 1deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:scale-110:hover {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:scale-125:hover {
  --tw-scale-x: 1.25;
  --tw-scale-y: 1.25;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:border-blue-200:hover {
  --tw-border-opacity: 1;
  border-color: rgb(191 219 254 / var(--tw-border-opacity, 1));
}

.hover\\:border-blue-400:hover {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
}

.hover\\:border-gray-400:hover {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));
}

.hover\\:border-white:hover {
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}

.hover\\:bg-blue-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-blue-500:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-gray-200:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-gray-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-green-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-green-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(21 128 61 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-pink-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(190 24 93 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-purple-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-purple-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(126 34 206 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-red-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));
}

.hover\\:bg-white\\/10:hover {
  background-color: rgb(255 255 255 / 0.1);
}

.hover\\:bg-white\\/20:hover {
  background-color: rgb(255 255 255 / 0.2);
}

.hover\\:bg-white\\/30:hover {
  background-color: rgb(255 255 255 / 0.3);
}

.hover\\:bg-white\\/75:hover {
  background-color: rgb(255 255 255 / 0.75);
}

.hover\\:from-blue-700:hover {
  --tw-gradient-from: #1d4ed8 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(29 78 216 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.hover\\:from-green-600:hover {
  --tw-gradient-from: #16a34a var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(22 163 74 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.hover\\:from-yellow-300:hover {
  --tw-gradient-from: #fde047 var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(253 224 71 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.hover\\:to-blue-600:hover {
  --tw-gradient-to: #2563eb var(--tw-gradient-to-position);
}

.hover\\:to-orange-400:hover {
  --tw-gradient-to: #fb923c var(--tw-gradient-to-position);
}

.hover\\:to-purple-700:hover {
  --tw-gradient-to: #7e22ce var(--tw-gradient-to-position);
}

.hover\\:text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.hover\\:text-blue-700:hover {
  --tw-text-opacity: 1;
  color: rgb(29 78 216 / var(--tw-text-opacity, 1));
}

.hover\\:text-blue-800:hover {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}

.hover\\:text-gray-600:hover {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}

.hover\\:text-gray-800:hover {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}

.hover\\:text-primary-hover:hover {
  --tw-text-opacity: 1;
  color: rgb(67 56 202 / var(--tw-text-opacity, 1));
}

.hover\\:text-purple-600:hover {
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity, 1));
}

.hover\\:text-secondary-hover:hover {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}

.hover\\:text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\\:text-gray-700:hover {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}

.hover\\:underline:hover {
  text-decoration-line: underline;
}

.hover\\:shadow:hover {
  --tw-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 1px 4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:shadow-2xl:hover {
  --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:shadow-lg:hover {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:shadow-xl:hover {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:shadow-yellow-500\\/25:hover {
  --tw-shadow-color: rgb(234 179 8 / 0.25);
  --tw-shadow: var(--tw-shadow-colored);
}

.focus\\:border-blue-500:focus {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}

.focus\\:border-red-500:focus {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}

.focus\\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:ring-blue-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1));
}

.focus\\:ring-red-500:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(239 68 68 / var(--tw-ring-opacity, 1));
}

.disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\\:bg-gray-400:disabled {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}

.disabled\\:opacity-50:disabled {
  opacity: 0.5;
}

.group:hover .group-hover\\:-translate-x-1 {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\\:translate-x-1 {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\\:translate-y-0 {
  --tw-translate-y: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\\:scale-110 {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.group:hover .group-hover\\:from-black\\/50 {
  --tw-gradient-from: rgb(0 0 0 / 0.5) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.group:hover .group-hover\\:via-black\\/30 {
  --tw-gradient-to: rgb(0 0 0 / 0)  var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), rgb(0 0 0 / 0.3) var(--tw-gradient-via-position), var(--tw-gradient-to);
}

.group:hover .group-hover\\:to-black\\/50 {
  --tw-gradient-to: rgb(0 0 0 / 0.5) var(--tw-gradient-to-position);
}

.group:hover .group-hover\\:text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.group:hover .group-hover\\:text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}

.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}

@media (min-width: 640px) {

  .sm\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {

  .md\\:col-span-2 {
    grid-column: span 2 / span 2;
  }

  .md\\:block {
    display: block;
  }

  .md\\:inline {
    display: inline;
  }

  .md\\:flex {
    display: flex;
  }

  .md\\:hidden {
    display: none;
  }

  .md\\:h-\\[500px\\] {
    height: 500px;
  }

  .md\\:h-\\[600px\\] {
    height: 600px;
  }

  .md\\:w-auto {
    width: auto;
  }

  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .md\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .md\\:flex-row {
    flex-direction: row;
  }

  .md\\:justify-center {
    justify-content: center;
  }

  .md\\:space-x-6 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1.5rem * var(--tw-space-x-reverse));
    margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .md\\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }

  .md\\:p-6 {
    padding: 1.5rem;
  }

  .md\\:text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .md\\:text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }

  .md\\:text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  .md\\:text-5xl {
    font-size: 3rem;
    line-height: 1;
  }

  .md\\:text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }

  .md\\:text-7xl {
    font-size: 4.5rem;
    line-height: 1;
  }

  .md\\:text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

@media (min-width: 1024px) {

  .lg\\:col-span-1 {
    grid-column: span 1 / span 1;
  }

  .lg\\:col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:col-span-3 {
    grid-column: span 3 / span 3;
  }

  .lg\\:block {
    display: block;
  }

  .lg\\:hidden {
    display: none;
  }

  .lg\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .lg\\:flex-row {
    flex-direction: row;
  }
}

@media (min-width: 1280px) {

  .xl\\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style><style type=\"text/css\">[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}</style></head>
  <body>
    <div id=\"root\"><div class=\"min-h-screen bg-gray-50\"><section aria-label=\"Notifications alt+T\" tabindex=\"-1\" aria-live=\"polite\" aria-relevant=\"additions text\" aria-atomic=\"false\"></section><div class=\"flex flex-col min-h-screen\"><header class=\"bg-white shadow-md sticky top-0 z-50\"><div class=\"container mx-auto px-4\"><div class=\"flex items-center justify-between py-4\"><button class=\"flex items-center space-x-2\" data-testid=\"logo-button\"><div class=\"w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center\"><span class=\"text-white font-bold text-xl\">Y</span></div><span class=\"text-2xl font-bold text-gray-900\">Yapee</span></button><form class=\"hidden md:flex flex-1 max-w-2xl mx-8\" data-testid=\"search-form\"><div class=\"relative w-full\"><input placeholder=\"Tìm kiếm sản phẩm...\" class=\"w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-l-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none\" data-testid=\"search-input\" type=\"text\" value=\"\"><svg class=\"absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\"></path></svg></div><button type=\"submit\" class=\"px-8 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors font-semibold\" data-testid=\"search-button\">Tìm</button></form><div class=\"flex items-center space-x-4\"><button class=\"hidden md:flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors\" data-testid=\"poster-button\"><span class=\"text-2xl\">🌟</span><span>Poster</span></button><button class=\"relative p-2 text-gray-700 hover:text-blue-600 transition-colors\" data-testid=\"cart-button\"><svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9\"></path></svg></button><button class=\"hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors\" data-testid=\"login-button\"><svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\"></path></svg><span>Đăng nhập</span></button><button class=\"md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors\" data-testid=\"mobile-menu-button\"><svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6h16M4 12h16M4 18h16\"></path></svg></button></div></div><div class=\"md:hidden pb-4\"><form class=\"flex\" data-testid=\"mobile-search-form\"><div class=\"relative flex-1\"><input placeholder=\"Tìm kiếm sản phẩm...\" class=\"w-full px-4 py-2 pl-10 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none\" data-testid=\"mobile-search-input\" type=\"text\" value=\"\"><svg class=\"absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z\"></path></svg></div><button type=\"submit\" class=\"px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors\" data-testid=\"mobile-search-button\">Tìm</button></form></div></div></header><main class=\"flex-1\"><div class=\"container mx-auto px-4 py-8\"><nav class=\"flex items-center space-x-2 text-sm text-gray-600 mb-6\"><button class=\"hover:text-blue-600\">Trang chủ</button><span>/</span><span class=\"text-gray-900 font-medium\">Kết quả tìm kiếm: \"laptop\"</span></nav><div class=\"flex flex-col lg:flex-row gap-8\"><div class=\"hidden lg:block w-64 space-y-6\"><div class=\"bg-white rounded-2xl p-6 shadow-md\"><h3 class=\"font-semibold text-gray-900 mb-4\">Danh mục</h3><div class=\"space-y-2\"><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">Điện tử</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">Thời trang</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">Gia dụng</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">Sách &amp; Văn phòng phẩm</span></label></div></div><div class=\"bg-white rounded-2xl p-6 shadow-md\"><h3 class=\"font-semibold text-gray-900 mb-4\">Khoảng giá</h3><div class=\"space-y-4\"><div class=\"flex space-x-2\"><input placeholder=\"Từ\" class=\"flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500\" type=\"number\" value=\"\"><input placeholder=\"Đến\" class=\"flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500\" type=\"number\" value=\"\"></div><button class=\"w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors\">Áp dụng</button></div></div><div class=\"bg-white rounded-2xl p-6 shadow-md\"><h3 class=\"font-semibold text-gray-900 mb-4\">Đánh giá</h3><div class=\"space-y-2\"><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><div class=\"flex items-center space-x-1\"><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span></div><span class=\"text-sm\">trở lên</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><div class=\"flex items-center space-x-1\"><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-gray-300\">⭐</span></div><span class=\"text-sm\">trở lên</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><div class=\"flex items-center space-x-1\"><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-gray-300\">⭐</span><span class=\"text-gray-300\">⭐</span></div><span class=\"text-sm\">trở lên</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><div class=\"flex items-center space-x-1\"><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-gray-300\">⭐</span><span class=\"text-gray-300\">⭐</span><span class=\"text-gray-300\">⭐</span></div><span class=\"text-sm\">trở lên</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><div class=\"flex items-center space-x-1\"><span class=\"text-yellow-400\">⭐</span><span class=\"text-gray-300\">⭐</span><span class=\"text-gray-300\">⭐</span><span class=\"text-gray-300\">⭐</span><span class=\"text-gray-300\">⭐</span></div><span class=\"text-sm\">trở lên</span></label></div></div><div class=\"bg-white rounded-2xl p-6 shadow-md\"><h3 class=\"font-semibold text-gray-900 mb-4\">Tags</h3><div class=\"space-y-2\"><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">smartphone</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">apple</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">cao-cap</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">laptop</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">macbook</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">ao-polo</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">nam</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">cotton</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">noi-com</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">dien-tu</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">gia-dung</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">giay</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">sneaker</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">unisex</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">may-pha-ca-phe</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">espresso</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">sach</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">ky-nang</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">giao-tiep</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">tai-nghe</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">bluetooth</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">chong-on</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">chan-ga</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">noi-that</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">but-bi</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">parker</span></label><label class=\"flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg\"><input class=\"rounded border-gray-300\" type=\"checkbox\"><span class=\"text-sm\">van-phong</span></label></div></div></div><div class=\"flex-1\"><div class=\"flex items-center justify-between mb-6\"><div><h1 class=\"text-2xl font-bold text-gray-900\">Kết quả tìm kiếm: \"laptop\"</h1><p class=\"text-gray-600 mt-1\">Tìm thấy 1 sản phẩm</p></div><div class=\"flex items-center space-x-4\"><button class=\"lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50\"><svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z\"></path></svg><span>Lọc</span></button><select class=\"bg-white border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500\"><option value=\"newest\">Mới nhất</option><option value=\"price_asc\">Giá thấp đến cao</option><option value=\"price_desc\">Giá cao đến thấp</option><option value=\"rating_desc\">Đánh giá cao nhất</option><option value=\"popularity\">Phổ biến nhất</option></select></div></div><div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6\" data-testid=\"product-grid\"><div class=\"group block w-full text-left cursor-pointer\" data-testid=\"product-card-macbook-air-m3\"><div class=\"bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden \"><div class=\"relative overflow-hidden\"><img alt=\"MacBook Air M3\" class=\"w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500\" src=\"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500\"><div class=\"absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold\">-7%</div><button class=\"absolute bottom-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-700 shadow-lg z-10\" data-testid=\"add-to-cart-macbook-air-m3\" aria-label=\"Thêm MacBook Air M3 vào giỏ hàng\"><svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9\"></path></svg></button></div><div class=\"p-4\"><h3 class=\"font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors\">MacBook Air M3</h3><div class=\"flex items-center space-x-1 mb-2\"><div class=\"flex text-yellow-400\"><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-yellow-400\">⭐</span><span class=\"text-gray-300\">⭐</span></div><span class=\"text-sm text-gray-500\">(89)</span></div><div class=\"flex items-center space-x-2\"><span class=\"text-xl font-bold text-red-600\">27.990.000đ</span><span class=\"text-sm text-gray-500 line-through\">29.990.000đ</span></div></div></div></div></div></div></div></div></main><footer class=\"bg-gray-900 text-white\"><div class=\"container mx-auto px-4 py-12\"><div class=\"grid grid-cols-1 md:grid-cols-4 gap-8\"><div class=\"space-y-4\"><div class=\"flex items-center space-x-2\"><div class=\"w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center\"><span class=\"text-white font-bold\">🛍️</span></div><span class=\"text-xl font-bold\">Yapee</span></div><p class=\"text-gray-400\">Yapee cung cấp các sản phẩm chất lượng cao với giá cả phải chăng. Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.</p><div class=\"flex space-x-4\"><a href=\"#\" class=\"w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors\"><span>📘</span></a><a href=\"#\" class=\"w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors\"><span>📷</span></a><a href=\"#\" class=\"w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors\"><span>🐦</span></a></div></div><div class=\"space-y-4\"><h3 class=\"text-lg font-semibold\">Chăm sóc khách hàng</h3><ul class=\"space-y-2 text-gray-400\"><li><a href=\"#\" class=\"hover:text-white transition-colors\">Trung tâm trợ giúp</a></li><li><a href=\"#\" class=\"hover:text-white transition-colors\">Liên hệ</a></li><li><a href=\"#\" class=\"hover:text-white transition-colors\">Hướng dẫn mua hàng</a></li><li><a href=\"#\" class=\"hover:text-white transition-colors\">Chính sách đổi trả</a></li></ul></div><div class=\"space-y-4\"><h3 class=\"text-lg font-semibold\">Về Yapee</h3><ul class=\"space-y-2 text-gray-400\"><li><a href=\"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')\" class=\"hover:text-white transition-colors\">Giới thiệu</a></li><li><a href=\"#\" class=\"hover:text-white transition-colors\">Chính sách bảo mật</a></li><li><a href=\"#\" class=\"hover:text-white transition-colors\">Điều khoản sử dụng</a></li><li><a href=\"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')\" class=\"hover:text-white transition-colors\">Câu hỏi thường gặp</a></li></ul></div><div class=\"space-y-4\"><h3 class=\"text-lg font-semibold\">Thông tin liên hệ</h3><ul class=\"space-y-2 text-gray-400\"><li class=\"flex items-start space-x-2\"><span>📍</span><span>74 đường số 13, Phường Bình Trị Đông B, quận Bình Tân, TP. Hồ Chí Minh</span></li><li class=\"flex items-center space-x-2\"><span>📞</span><span>0333.938.014</span></li><li class=\"flex items-center space-x-2\"><span>✉️</span><span>cskh@yapee.vn</span></li><li class=\"flex items-center space-x-2\"><span>🕒</span><span>8h00 - 19h00, Thứ Hai - Chủ Nhật</span></li></ul></div></div><div class=\"border-t border-gray-800 mt-8 pt-8 text-center text-gray-400\"><p>© 2024 Yapee. Tất cả quyền được bảo lưu.</p></div></div></footer></div></div></div>
    <script type=\"module\" src=\"/src/main.tsx?t=1749492914409\"></script>
  

</body></html>"
    at D:\W123-project\tests\cross-browser.spec.ts:67:33
```

# Page snapshot

```yaml
- region "Notifications alt+T"
- banner:
  - button "Y Yapee"
  - textbox "Tìm kiếm sản phẩm..."
  - img
  - button "Tìm"
  - button "🌟 Poster"
  - button:
    - img
  - button "Đăng nhập":
    - img
    - text: Đăng nhập
- main:
  - navigation:
    - button "Trang chủ"
    - text: "/ Kết quả tìm kiếm: \"laptop\""
  - heading "Danh mục" [level=3]
  - checkbox "Điện tử"
  - text: Điện tử
  - checkbox "Thời trang"
  - text: Thời trang
  - checkbox "Gia dụng"
  - text: Gia dụng
  - checkbox "Sách & Văn phòng phẩm"
  - text: Sách & Văn phòng phẩm
  - heading "Khoảng giá" [level=3]
  - spinbutton
  - spinbutton
  - button "Áp dụng"
  - heading "Đánh giá" [level=3]
  - checkbox "⭐ ⭐ ⭐ ⭐ ⭐ trở lên"
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ trở lên
  - checkbox "⭐ ⭐ ⭐ ⭐ ⭐ trở lên"
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ trở lên
  - checkbox "⭐ ⭐ ⭐ ⭐ ⭐ trở lên"
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ trở lên
  - checkbox "⭐ ⭐ ⭐ ⭐ ⭐ trở lên"
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ trở lên
  - checkbox "⭐ ⭐ ⭐ ⭐ ⭐ trở lên"
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ trở lên
  - heading "Tags" [level=3]
  - checkbox "smartphone"
  - text: smartphone
  - checkbox "apple"
  - text: apple
  - checkbox "cao-cap"
  - text: cao-cap
  - checkbox "laptop"
  - text: laptop
  - checkbox "macbook"
  - text: macbook
  - checkbox "ao-polo"
  - text: ao-polo
  - checkbox "nam"
  - text: nam
  - checkbox "cotton"
  - text: cotton
  - checkbox "noi-com"
  - text: noi-com
  - checkbox "dien-tu"
  - text: dien-tu
  - checkbox "gia-dung"
  - text: gia-dung
  - checkbox "giay"
  - text: giay
  - checkbox "sneaker"
  - text: sneaker
  - checkbox "unisex"
  - text: unisex
  - checkbox "may-pha-ca-phe"
  - text: may-pha-ca-phe
  - checkbox "espresso"
  - text: espresso
  - checkbox "sach"
  - text: sach
  - checkbox "ky-nang"
  - text: ky-nang
  - checkbox "giao-tiep"
  - text: giao-tiep
  - checkbox "tai-nghe"
  - text: tai-nghe
  - checkbox "bluetooth"
  - text: bluetooth
  - checkbox "chong-on"
  - text: chong-on
  - checkbox "chan-ga"
  - text: chan-ga
  - checkbox "noi-that"
  - text: noi-that
  - checkbox "but-bi"
  - text: but-bi
  - checkbox "parker"
  - text: parker
  - checkbox "van-phong"
  - text: van-phong
  - 'heading "Kết quả tìm kiếm: \"laptop\"" [level=1]'
  - paragraph: Tìm thấy 1 sản phẩm
  - combobox:
    - option "Mới nhất" [selected]
    - option "Giá thấp đến cao"
    - option "Giá cao đến thấp"
    - option "Đánh giá cao nhất"
    - option "Phổ biến nhất"
  - img "MacBook Air M3"
  - text: "-7%"
  - button "Thêm MacBook Air M3 vào giỏ hàng":
    - img
  - heading "MacBook Air M3" [level=3]
  - text: ⭐ ⭐ ⭐ ⭐ ⭐ (89) 27.990.000đ 29.990.000đ
- contentinfo:
  - text: 🛍️ Yapee
  - paragraph: Yapee cung cấp các sản phẩm chất lượng cao với giá cả phải chăng. Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng.
  - link "📘":
    - /url: "#"
  - link "📷":
    - /url: "#"
  - link "🐦":
    - /url: "#"
  - heading "Chăm sóc khách hàng" [level=3]
  - list:
    - listitem:
      - link "Trung tâm trợ giúp":
        - /url: "#"
    - listitem:
      - link "Liên hệ":
        - /url: "#"
    - listitem:
      - link "Hướng dẫn mua hàng":
        - /url: "#"
    - listitem:
      - link "Chính sách đổi trả":
        - /url: "#"
  - heading "Về Yapee" [level=3]
  - list:
    - listitem:
      - link "Giới thiệu":
        - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
    - listitem:
      - link "Chính sách bảo mật":
        - /url: "#"
    - listitem:
      - link "Điều khoản sử dụng":
        - /url: "#"
    - listitem:
      - link "Câu hỏi thường gặp":
        - /url: "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
  - heading "Thông tin liên hệ" [level=3]
  - list:
    - listitem: 📍 74 đường số 13, Phường Bình Trị Đông B, quận Bình Tân, TP. Hồ Chí Minh
    - listitem: 📞 0333.938.014
    - listitem: ✉️ cskh@yapee.vn
    - listitem: 🕒 8h00 - 19h00, Thứ Hai - Chủ Nhật
  - paragraph: © 2024 Yapee. Tất cả quyền được bảo lưu.
```

# Test source

```ts
   1 | import { test, expect, devices } from '@playwright/test';
   2 |
   3 | // Cross-Browser Testing Suite for Week 3
   4 | test.describe('Cross-Browser Compatibility Testing', () => {
   5 |   
   6 |   // Test on different browsers
   7 |   const browsers = ['chromium', 'firefox', 'webkit'];
   8 |   
   9 |   browsers.forEach(browserName => {
   10 |     test.describe(`${browserName} Browser Tests`, () => {
   11 |       
   12 |       test(`Homepage loads correctly on ${browserName}`, async ({ page }) => {
   13 |         await page.goto('http://localhost:5173');
   14 |         
   15 |         // Wait for main content
   16 |         await page.waitForSelector('h1', { timeout: 10000 });
   17 |         
   18 |         // Check if main elements are visible
   19 |         await expect(page.locator('h1')).toBeVisible();
   20 |         await expect(page.locator('nav')).toBeVisible();
   21 |         
   22 |         // Take screenshot for documentation
   23 |         await page.screenshot({ 
   24 |           path: `docs/cross-browser-${browserName}-homepage-${Date.now()}.png`,
   25 |           fullPage: true 
   26 |         });
   27 |         
   28 |         console.log(`${browserName}: Homepage loaded successfully`);
   29 |       });
   30 |       
   31 |       test(`Navigation works on ${browserName}`, async ({ page }) => {
   32 |         await page.goto('http://localhost:5173');
   33 |         
   34 |         // Test navigation links
   35 |         const navLinks = [
   36 |           { text: 'Trang chủ', expected: '/' },
   37 |           { text: 'Danh mục', expected: '#categories' },
   38 |           { text: 'Giới thiệu', expected: '#about' }
   39 |         ];
   40 |         
   41 |         for (const link of navLinks) {
   42 |           await page.click(`a:has-text("${link.text}")`);
   43 |           await page.waitForTimeout(1000);
   44 |           
   45 |           // Verify navigation worked
   46 |           const currentUrl = page.url();
   47 |           expect(currentUrl).toContain('localhost:5173');
   48 |           
   49 |           console.log(`${browserName}: Navigation to ${link.text} works`);
   50 |         }
   51 |       });
   52 |       
   53 |       test(`Search functionality works on ${browserName}`, async ({ page }) => {
   54 |         await page.goto('http://localhost:5173');
   55 |         
   56 |         // Wait for search input
   57 |         await page.waitForSelector('input[placeholder*="Tìm kiếm"]', { timeout: 10000 });
   58 |         
   59 |         // Perform search
   60 |         await page.fill('input[placeholder*="Tìm kiếm"]', 'laptop');
   61 |         await page.press('input[placeholder*="Tìm kiếm"]', 'Enter');
   62 |         
   63 |         await page.waitForTimeout(2000);
   64 |         
   65 |         // Verify search results or no errors
   66 |         const pageContent = await page.content();
>  67 |         expect(pageContent).not.toContain('error');
      |                                 ^ Error: expect(received).not.toContain(expected) // indexOf
   68 |         
   69 |         console.log(`${browserName}: Search functionality works`);
   70 |       });
   71 |       
   72 |       test(`Authentication works on ${browserName}`, async ({ page }) => {
   73 |         await page.goto('http://localhost:5173');
   74 |         
   75 |         // Test login flow
   76 |         await page.click('button:has-text("Đăng nhập")');
   77 |         await page.waitForTimeout(1000);
   78 |         
   79 |         // Fill login form
   80 |         await page.fill('input[placeholder="Email"]', 'test@example.com');
   81 |         await page.fill('input[placeholder="Mật khẩu"]', 'password123');
   82 |         
   83 |         // Submit form
   84 |         await page.click('button[type="submit"]:has-text("Đăng nhập")');
   85 |         await page.waitForTimeout(3000);
   86 |         
   87 |         // Verify no critical errors
   88 |         const pageContent = await page.content();
   89 |         expect(pageContent).not.toContain('critical error');
   90 |         
   91 |         console.log(`${browserName}: Authentication flow works`);
   92 |       });
   93 |       
   94 |       test(`Cart functionality works on ${browserName}`, async ({ page }) => {
   95 |         await page.goto('http://localhost:5173');
   96 |         
   97 |         // Wait for products to load
   98 |         await page.waitForTimeout(3000);
   99 |         
  100 |         // Look for add to cart buttons
  101 |         const addToCartButtons = page.locator('button:has-text("Thêm vào giỏ")');
  102 |         const buttonCount = await addToCartButtons.count();
  103 |         
  104 |         if (buttonCount > 0) {
  105 |           // Click first add to cart button
  106 |           await addToCartButtons.first().click();
  107 |           await page.waitForTimeout(2000);
  108 |           
  109 |           console.log(`${browserName}: Cart functionality works`);
  110 |         } else {
  111 |           console.log(`${browserName}: No add to cart buttons found`);
  112 |         }
  113 |       });
  114 |     });
  115 |   });
  116 |   
  117 |   test.describe('Mobile Device Testing', () => {
  118 |     
  119 |     test('Mobile layout - iPhone', async ({ browser }) => {
  120 |       const context = await browser.newContext({
  121 |         ...devices['iPhone 12']
  122 |       });
  123 |       const page = await context.newPage();
  124 |       
  125 |       await page.goto('http://localhost:5173');
  126 |       await page.waitForTimeout(3000);
  127 |       
  128 |       // Check mobile layout
  129 |       const viewport = page.viewportSize();
  130 |       expect(viewport?.width).toBeLessThanOrEqual(414);
  131 |       
  132 |       // Take mobile screenshot
  133 |       await page.screenshot({ 
  134 |         path: `docs/mobile-iphone-${Date.now()}.png`,
  135 |         fullPage: true 
  136 |       });
  137 |       
  138 |       // Test mobile navigation (hamburger menu)
  139 |       const mobileMenu = page.locator('[data-testid="mobile-menu"]');
  140 |       if (await mobileMenu.isVisible()) {
  141 |         await mobileMenu.click();
  142 |         await page.waitForTimeout(1000);
  143 |       }
  144 |       
  145 |       await context.close();
  146 |       console.log('iPhone layout test completed');
  147 |     });
  148 |     
  149 |     test('Mobile layout - Android', async ({ browser }) => {
  150 |       const context = await browser.newContext({
  151 |         ...devices['Pixel 5']
  152 |       });
  153 |       const page = await context.newPage();
  154 |       
  155 |       await page.goto('http://localhost:5173');
  156 |       await page.waitForTimeout(3000);
  157 |       
  158 |       // Check mobile layout
  159 |       const viewport = page.viewportSize();
  160 |       expect(viewport?.width).toBeLessThanOrEqual(393);
  161 |       
  162 |       // Take mobile screenshot
  163 |       await page.screenshot({ 
  164 |         path: `docs/mobile-android-${Date.now()}.png`,
  165 |         fullPage: true 
  166 |       });
  167 |       
```