# 🎯 Modular Promotional Banner System

A fully **modular, configurable, and responsive** HTML/CSS/JS system to generate dynamic promotional banners using reusable layout components and JSON-based configuration.

Perfect for developers or teams looking to **scale banner production** with consistent design variants and responsive behavior.

---

## 📦 Features

- 🧩 Modular templates: Left/Right decor, Content, Image (Foreground & Background)
- ⚙️ Config-driven rendering via `promoConfig.json`
- 🌐 Query-string based banner loading (`?type=promo1`)
- 📱 Mobile responsive (auto layout adjustment)
- 🖼️ Design variants managed via folder structure (variant-a, variant-b, etc.)
- 🚀 Easy live preview with Live Server (VS Code)

---

## 🗂️ Project Structure

```
modular-promo-banner/
├── assets/                         # Images and icons
├── config/
│   └── promoConfig.json           # All promo types and their config
├── left-decor/
│   └── variant-a.html             # Left decoration templates
├── right-decor/
│   └── variant-a.html             # Right decoration templates
├── promo-content/
│   └── variant-a.html             # Promo content blocks
├── promo-image/
│   ├── background/
│   │   └── variant-a.html
│   └── foreground/
│       └── variant-a.html
├── promo.html                     # Main banner container
├── promo.js                       # Dynamically injects HTML and config
├── style.css                      # Shared styles (desktop + mobile)
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/modular-promo-banner.git
cd modular-promo-banner
```

### 2. Open in VS Code

```bash
code .
```

### 3. Start with Live Server

Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.

Then open `promo.html` and right-click → **Open with Live Server**

Default preview URL:

```
http://localhost:5500/promo.html?type=promo1
```

> ✅ Replace `promo1` with any key defined in `config/promoConfig.json`

---

## 🧠 How It Works

- You define a **`type`** in the query string.
- The `promo.js` script:
  - Loads the config for that type
  - Dynamically fetches all modular HTML pieces
  - Injects placeholder values like `{{imageUrl}}` using the config
- Mobile-specific styles apply automatically via media queries

---

## ✏️ Customization

- Add new variants in their respective folders (e.g. `variant-b.html`)
- Edit or add new entries in `promoConfig.json`
- Adjust mobile styles inside the `@media` section in `style.css`
- Update colors, phone numbers, headings, etc. through config only

---

## 🧪 Example Config

```json
"promo1": {
  "config": {
    "headingSpans": [
      { "text": "Live", "color": "#FC2810" },
      { "text": "Online", "weight": "700", "size": "48px" },
      { "icon": "assets/tick.svg", "text": "Batch Starting Soon" }
    ],
    "phoneNumber": "+91-1234567890"
  },
  "variant": {
    "left-decor": "a",
    "right-decor": "b",
    "promo-conetent": "a",
    "promo-bg": "b",
    "promo-fg": "b"
  }
}
```

## 👋 Author

Made with ❤️ by [Your Name](https://github.com/vijevira)  
