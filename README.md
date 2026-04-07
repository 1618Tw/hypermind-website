# Changes
I have changed the hardware page with a more simple one because the animations are not ready yet. I have made the opne roles and lab page, still a draft but good to have it. Made some changes over the landing page, added more cream.

# Hypermind Website

Static website for **Hypermind** — Local Intelligence.  
Two pages: the main landing page and the UBIQ product page.

---

## Project Structure

```
hypermind_web_site_new/
│
├── index.html          ← Main landing page
├── ubiq.html           ← UBIQ product page
│
├── css/
│   ├── style.css       ← Shared styles (colours, buttons, navbar, footer, modal)
│   ├── home.css        ← Styles specific to index.html
│   └── ubiq.css        ← Styles specific to ubiq.html
│
├── js/
│   └── main.js         ← Shared JavaScript (navbar, modal, scroll-reveal, footer effect)
│
└── assets/
    ├── images/         ← Drop new images here
    ├── logo.png
    ├── ubiq.png
    ├── hardware.png
    ├── alex.jpeg
    ├── bpifrance.png
    ├── f40.png
    ├── galion.avif
    ├── nvidia.png
    ├── scaleway.png
    ├── stationf.png
    └── 26_02_27- Ubiq video (final words + no flashlights).mp4
```

---

## How to Open

No build step required. Open any HTML file directly in your browser:

- **Mac:** double-click `index.html`, or right-click → Open With → your browser
- **Any OS:** drag `index.html` into a browser window

For the video on `ubiq.html` to load correctly, open via a local server (not by double-clicking):

```bash
# Python 3 (pre-installed on Mac)
python3 -m http.server 3000
```

Then visit **http://localhost:3000** in your browser.

---

## How to Edit

### Change text / content
Open the relevant HTML file and search (`Cmd+F`) for the text you want to change.

### Change colours
Open [css/style.css](css/style.css) and edit the `:root` variables at the top:

```css
:root {
  --dark:  #39081E;   /* Deep maroon — main background */
  --cream: #FFF8E0;   /* Warm off-white — light sections */
  --peach: #FFA886;   /* Soft peach — hover states */
  --coral: #FF6B4B;   /* Coral orange-red — primary accent */
}
```

### Change the font
The font is **Archivo** loaded from Google Fonts. To swap it:
1. Go to [fonts.google.com](https://fonts.google.com), pick a new font, copy its `<link>` tag
2. Replace the Google Fonts `<link>` in both `index.html` and `ubiq.html`
3. Update `--font` in [css/style.css](css/style.css)

### Add a new sponsor logo
1. Drop the logo file into `assets/`
2. In both HTML files, find the `marquee-track` section and add:
   ```html
   <img src="assets/your-logo.png" alt="Company Name" class="sponsor-img" />
   ```
   Add it in **both** the original and the duplicate block (needed for the seamless loop).

### Add a new partnership card
In `index.html`, copy an existing `.partner-card` block inside `#partnerships` and update the name, quote, role, and photo.

### Add a new page
1. Copy `ubiq.html` as a starting point
2. Link `css/style.css` (shared) + create a new `css/yourpage.css`
3. Add a link to it in the navbar of both existing pages

---

## Deploying (sharing with the team)

The fastest way is **Netlify Drop**:
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag and drop the entire `hypermind_web_site_new` folder
3. Share the generated URL

Make sure you drop the **folder** (not just an HTML file) so all assets are included.

---

## Brand Reference

| Token    | Value     | Used for                        |
|----------|-----------|---------------------------------|
| `--dark` | `#39081E` | Backgrounds, text on light      |
| `--cream`| `#FFF8E0` | Light section backgrounds, text |
| `--peach`| `#FFA886` | Hover states, muted accents     |
| `--coral`| `#FF6B4B` | CTAs, labels, primary accent    |
| Font     | Archivo   | All text                        |
