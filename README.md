# SNEAKER_PRO | Standard Site (Accessible)

## 📌 Project Overview
This repository demonstrates a **WCAG 2.1 Level AA** compliant e-commerce experience. It proves that high-end, modern aesthetics can coexist with robust accessibility. Every feature is designed to maximize conversion by removing friction for 100% of the population.

## ✅ Key Accessibility Features

### 1. Robust Focus Management
Implements programmatic focus shifting. When a modal opens, focus is "trapped" within that container to prevent the user from tabbing into background elements. When closed, focus is restored to the specific button that triggered the action.



### 2. ARIA Live Regions & Announcements
Uses a hidden `aria-live="assertive"` announcer. Dynamic updates—such as "Item added to cart" or "Speedster 500 removed"—are communicated to screen readers instantly without requiring a page refresh.

### 3. Semantic Landmarks & Structure
Utilizes `<main>`, `<header>`, `<footer>`, `<article>`, and `<section>` tags. These landmarks allow assistive technology users to jump directly to the content they need, such as the product gallery or the checkout form.



### 4. Real-time Accessible Validation
Uses `aria-invalid` and `aria-describedby` to link error messages to inputs. The errors are identified in text (not just color) and are removed dynamically the moment the user satisfies the input requirements.



### 5. Interaction Safety
Includes a "Skip to Content" link for power users and full `Escape` key support for dismissing all overlays. The carousel includes a manual Pause/Play toggle to accommodate users sensitive to motion.

## 💰 Business Impact
* **Reduced Cart Abandonment:** By guiding users through errors and providing a predictable keyboard flow, we reduce the "frustration drop-off."
* **SEO Optimization:** Semantic HTML is more easily indexed by search engine crawlers, leading to better organic rankings.
* **Compliance:** Meets legal requirements for the Americans with Disabilities Act (ADA) and the European Accessibility Act (EAA).

## 🛠 Tech Stack
* **HTML5:** Fully semantic markup.
* **CSS3:** WCAG-compliant contrast ratios and high-visibility focus indicators.
* **Vanilla JavaScript:** ARIA-aware state management and focus trapping logic.