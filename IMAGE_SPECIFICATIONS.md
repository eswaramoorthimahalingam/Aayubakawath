# Image Specifications — Aayubakwath Website

> **For Graphic Designer** — Use this guide to prepare all images for the website.

---

## General Guidelines

| Guideline | Detail |
|-----------|--------|
| **File Format Priority** | WebP > JPG > PNG |
| **Max File Size** | Under 500KB (under 200KB for product images) |
| **Color Profile** | sRGB |
| **Naming Convention** | Descriptive lowercase with hyphens (e.g., `product-ashwagandha-powder.webp`) |
| **Product Images** | Use transparent or white backgrounds. Object-fit: contain (full product visible) |
| **Banner Images** | Object-fit: cover. Keep important content in center safe zone |
| **No Text on Images** | All text is HTML/CSS overlays — do NOT bake text into images |
| **Consistent Lighting** | All product photos should have consistent lighting and angle |
| **Mobile-First** | Design for 375px width minimum |

---

## 1. PRODUCT IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Product Card** (grid/list) | **1:1.15** (slightly taller than square) | 800×920px | WebP/JPG/PNG | Responsive | Primary + secondary image (hover swap). Object-fit: contain |
| **Product Detail Page** | **1:1** (square) | 1200×1200px | WebP/JPG/PNG | Responsive | Main zoomable image. Object-fit: contain |
| **Product Thumbnails** | **1:1** (square) | 200×200px | WebP/JPG/PNG | 64×64px | Small clickable thumbnails below main image |
| **Before/After (product)** | **1:1** (square) | 800×800px | WebP/JPG | Responsive | Displayed in 3-column grid. Object-fit: cover |

---

## 2. BANNER IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Hero Carousel** (4 images) | **16:9** | 1920×1080px | PNG | 52vh mobile, 100vh desktop | Ken Burns zoom animation. Object-fit: cover |
| **Promo Banner** (FirstBanner) | Full-width | 1920×600px | PNG | Full-width, auto-height | "Welcome / Save 30%" section. Opacity 80% overlay |
| **Offer Banners** (API-driven) | Full-width | 1920×500px desktop / 1920×250px mobile | WebP/JPG | 250–500px height | Fetched from backend API. Object-fit: cover |
| **Shop Page Banner** | Full-width | 1920×400px | JPG | Full-width, auto-height | Product listing page header |

---

## 3. CATEGORY IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Category Cards** | **1:1** (square) | 400×400px | WebP/JPG/PNG | 130px mobile, 160px tablet, 200px desktop | Currently using emoji fallbacks. If adding images: centered icon style |

---

## 4. TRUST / CERTIFICATION BADGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Promise Icons** (4 badges) | **1:1** (square) | 200×200px | JPG | 56×56px | Preservative Free, GMO Free, Gluten Free, No Added Sugar |
| **Certificate Gallery** (11 images) | Natural (preserve original) | 800×600px min | JPG | Responsive | Displayed with object-fit: contain |

---

## 5. BEFORE/AFTER REVIEW IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Client Review Sliders** (3 pairs = 6 images) | **16:9** | 1200×675px | JPG | Full-width, 320px height | Before/after comparison sliders. Object-fit: cover |

---

## 6. BLOG IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Blog Page Banner** | Full-width | 1920×520px | JPG | 400px mobile, 520px desktop | Min-height responsive. Object-fit: cover |
| **Blog Article Thumbnails** (6 images) | **16:9** | 800×450px | PNG | 208px grid, 280–400px featured | Object-fit: cover |

---

## 7. ABOUT PAGE IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Mission/Vision** | Full-width | 1920×420px | JPG/JPEG | 420px height | Object-fit: cover |
| **About Section** | **4:3** | 1200×900px | JPG/JPEG | Responsive | Rounded corners (2.5rem). Object-fit: cover |
| **Our Story** | **1:1** mobile, **4:3** desktop | 800×800px / 1200×900px | JPG | Responsive | Object-fit: cover |
| **Various About Images** (7 images) | **1:1** or **4:3** | 800×800px or 1200×900px | JPG/JPEG | Responsive | Object-fit: cover |

---

## 8. OTHER PAGE IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Contact Page Banner** | Full-width | 1920×520px | JPG | 400px mobile, 520px desktop | Object-fit: cover, object-position: center |
| **Dealership/Bulk Order** | **4:3** | 1200×900px | JPG | Responsive, max-w-2xl | Object-fit: cover |
| **Ingredient Icons** (3 images) | **1:1** (square) | 400×400px | PNG | 112×112px | Ashwagandha, Brahmi, Amla |
| **Testimonial Avatars** | **1:1** (circular) | 200×200px | JPG/PNG | 36–48px | Circular crop. Faces should be centered |

---

## 9. BACKGROUND / DECORATIVE IMAGES

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Login/Register Background** | **16:9** | 1920×1080px | PNG | Full panel | Opacity 60%, mix-blend-overlay effect |
| **Offer Modal** | **1:1** | 800×800px | JPG | 50% width of modal | Right half of split modal. Object-fit: cover |

---

## 10. LOGO

| Usage | Aspect Ratio | Resolution | Format | Display Size | Notes |
|-------|-------------|------------|--------|-------------|-------|
| **Brand Logo** | **1:1** (square) | 200×200px | JPG | 36–40px | Rounded corners. Used in header, footer, splash screen |

---

## IMAGE COUNT SUMMARY

| Category | Count |
|----------|-------|
| Product Images (per product) | 2+ (primary + hover) |
| Hero Carousel | 4 |
| Promo Banner | 1 |
| Offer Banners | As needed (API-driven) |
| Shop Page Banner | 1 |
| Category Images | As many as categories |
| Promise Icons | 4 |
| Certificate Gallery | 11 |
| Before/After Review Pairs | 3 pairs (6 images) |
| Blog Banner | 1 |
| Blog Article Thumbnails | 6 |
| About Page Images | ~10 |
| Our Story | 1 |
| Contact Page Banner | 1 |
| Dealership | 1 |
| Ingredient Icons | 3 |
| Testimonial Avatars | 3 |
| Login/Register Background | 1 (shared) |
| Offer Modal | 1 |
| Brand Logo | 1 |

---

## DELIVERY CHECKLIST

- [ ] All product images at 1:1.15 ratio (800×920px)
- [ ] All product detail images at 1:1 ratio (1200×1200px)
- [ ] 4 hero carousel images at 16:9 (1920×1080px)
- [ ] Promo banner at 1920×600px
- [ ] 4 trust badge icons at 1:1 (200×200px)
- [ ] 11 certificate images
- [ ] 3 before/after pairs (6 images) at 16:9
- [ ] Blog banner at 1920×520px
- [ ] 6 blog thumbnails at 16:9
- [ ] All about page images at 4:3 or 1:1
- [ ] Contact banner at 1920×520px
- [ ] Dealership image at 4:3
- [ ] 3 ingredient icons at 1:1
- [ ] 3 testimonial avatars (circular crop)
- [ ] Login background at 16:9
- [ ] Offer modal image at 1:1
- [ ] Brand logo at 1:1 (200×200px)
- [ ] All files in WebP format (JPG/PNG fallback if needed)
- [ ] All files under 500KB (product images under 200KB)
