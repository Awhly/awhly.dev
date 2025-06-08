# awhly.dev – My Personal Website

A modern, personal website inspired by Instagram and Discord, featuring a consistent UI, animated backgrounds, and interactive elements.

---

## Features

- **Consistent Top-Bar:** Navigation bar on all pages for seamless browsing.
- **Animated Video Background:** Modern, looping video background for visual appeal.
- **Profile/About Section:** Playful profile with avatar, badges, and about info.
- **Posts Section:** Horizontally scrolling posts grid using flexbox.
- **Project Cards:** Projects page with interactive cards, status badges, dates, and action buttons.
- **Contact Wall:** Contact page with a grid of cards, FontAwesome icons, and playful effects.
- **Resume Page:** Embedded PDF viewer and download button, styled to match the site.
- **Error/Maintenance Page:** Friendly, on-brand error/maintenance page (`nothing.html`).
- **Playful UI Effects:** Animated arrows, scroll-to-top button, music player, and more.
- **Custom Font:** Uses Ginto Nord font throughout for a unique, modern look.
- **Responsive Design:** Works on desktop and mobile, with robust asset and navigation paths.

---

## File Structure

- `index.html` – Main site (profile, posts, badges, music player, etc.)
- `projects.html` – Projects grid with cards, badges, and interactive buttons
- `contactme.html` – Contact wall with cards and icons
- `resume.html` – Resume viewer and download
- `nothing.html` – Error/maintenance page
- `style.css` – Main styles (index, resume, nothing)
- `script.js` – All interactivity, navigation, and playful effects
- `banners/`, `avatar/`, `emojies/` – Asset folders for images, video, and icons

---

## Notable UI/UX Details

- **Navigation:** Top-bar links work across all pages; asset paths are robust for hosting.
- **Font:** Ginto Nord loaded via `@font-face` in CSS and set as default.
- **Posts:** Displayed left-to-right (horizontal scroll) using flexbox.
- **Project Cards:** Include status badges, project dates, and interactive (or disabled) buttons.
- **Contact Cards:** Grid layout with FontAwesome icons and playful hover effects.
- **Resume:** Embedded PDF with download button, styled to match the site.
- **Error Page:** `nothing.html` provides a friendly, styled fallback for errors/maintenance.
- **Playful Effects:** Animated arrows, music player, scroll-to-top button, and more.

---

## How to Use / Host

1. **Clone or download** the repository.
2. **Ensure all asset folders** (`banners/`, `avatar/`, `emojies/`) and the font file are present.
3. **Open `index.html`** in your browser, or deploy the folder to your preferred static hosting provider.
4. **All navigation and asset paths** are set up for robust hosting.

---

## Customization

- **Add your own posts, projects, or contact methods** by editing the respective HTML files.
- **Change the background video** by replacing `banners/banner.webm`.
- **Add new badges, emojis, or avatars** in the `emojies/` and `avatar/` folders.

---

## Credits

- **Font:** Ginto Nord (included in repo)
- **Icons:** FontAwesome (loaded via CDN)
- **Design inspiration:** Instagram, Discord
- **All code and assets** © Awhly

---

## License

GPL 3.0

---

## Maintenance

- For downtime or errors, `nothing.html` will be shown as a friendly fallback.
- All major features and styling are modular and ready for further tweaks or new content.

---

## Contact

See the [Contact Me](https://awhly.dev/contactme) page for ways to reach out!
