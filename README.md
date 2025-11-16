# The Family Recipe Cookbook

Static, single–page style cookbook site built from Mom’s handwritten recipes.

## Project structure

- `index.html` – Landing page with four sections (Cakes & Sweets, Breads & Breakfast, Savory & Homemade, Household Tips).
- `cakes-and-sweets.html` – Cakes & sweets recipes.
- `breads-and-breakfast.html` – Breads & breakfast recipes.
- `savory-and-homemade.html` – Savory & homemade recipes.
- `household-tips.html` – Household cleaning tips.
- `assets/styles.css` – Shared styling and layout.
- `assets/script.js` – Shared behavior (search, filters, collapsible sections).
- `assets/img/` – Hero images and any static illustrations.

No build step is required; the site is pure HTML/CSS/JS.

## Running locally

Open `index.html` directly in a browser, or serve the folder with a simple static server, for example:

```bash
cd /path/to/Recetas-Rosa
python -m http.server 8080
```

Then visit `http://localhost:8080/` in your browser.

## Deploying to Netlify

1. Create a new GitHub repository (for example `moms-recipes`) under the `denizen-star` account.
2. Push this project to that repository.
3. In Netlify, choose **Add new site → Import an existing project → GitHub**, then select the repository.
4. Use these settings:
   - **Build command**: _leave empty_ (no build).
   - **Publish directory**: `.` (project root).
5. Deploy the site.

### Custom subdomain

Once the site is deployed on Netlify:

1. Add the custom domain `moms-recipies.kervinapps.com` in the Netlify domain settings.
2. In your DNS provider for `kervinapps.com`, create a CNAME record:
   - **Name**: `moms-recipies`
   - **Type**: `CNAME`
   - **Value**: _the Netlify site URL_ (e.g. `your-site-name.netlify.app`)
3. Wait for DNS to propagate; Netlify will provision SSL automatically.


