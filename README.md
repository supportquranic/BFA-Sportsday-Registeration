# Department of Graphic Design — Sports & Design Fest 2026

Official event management portal, live administration tracker, and master execution plan for the Department of Graphic Design (BFA Morning & BFA Evening).

## 🚀 Live Portal Links (GitHub Pages)

Once GitHub Pages is enabled on the `main` branch (from repository **Settings → Pages**):

- 📝 **Student Registration Portal:**
  `https://supportquranic.github.io/BFA-Sportsday-Registeration/`
  *(Direct alias: `https://supportquranic.github.io/BFA-Sportsday-Registeration/register.html`)*

- 📊 **Live Admin Dashboard:**
  `https://supportquranic.github.io/BFA-Sportsday-Registeration/admin.html`

- 📋 **Full Event Execution Plan:**
  `https://supportquranic.github.io/BFA-Sportsday-Registeration/plan.html`

---

## 📂 Project Architecture

This project is built **100% frontend-only with zero backend required**. All student submissions are stored in browser `localStorage` and shared in real-time across all portals.

| File | Purpose |
| :--- | :--- |
| `index.html` / `register.html` | **Student Registration Portal**: Interactive entry form with custom-designed Google Sans dropdowns, merged Semester & Shift selection (8 classes), and dynamic subforms for Cricket roles, Stalls, Media crew, and Design contests. |
| `admin.html` | **Live Admin Dashboard**: Real-time counter badges (Total, Morning, Evening, Cricket, Badminton, Stalls, Media & Design), detailed role breakdown chips, real-time search & filter, single-click Excel/CSV export, and JSON backup. |
| `plan.html` / `Design_Sports_Fest_2026_Google_Sans-1.html` | **Official Master Plan Document**: Executive 12-section blueprint detailing 8-over Cricket Derby, 8-team Badminton bracket, Unified Campaign Design contest, Separate Jersey Design, Committee rosters, and event-day timeline. |

---

## 🎨 Visual Identity & Technical Stack
- **Typography:** Google Sans (`https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap`)
- **Design System:** Soft pastel aesthetic (`--a` Cream, `--b` Blush Rose, `--c` Lavender, `--d` Amber, `--e` Peach, `--f` Sky Blue) with deep charcoal typography.
- **Storage Engine:** HTML5 `localStorage` key `sports_fest_2026_registrations_v1`.
- **Exporting:** Client-side UTF-8 CSV generation for direct Microsoft Excel compatibility.

