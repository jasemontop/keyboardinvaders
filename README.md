# Mimi's Squishies — Official Store

## Local preview (NO Node)
Open the `public` folder in VS Code and use Live Server on `public/index.html`.
Owner login is disabled in the local Live Server preview.
Products/orders created locally are demo data stored only in that browser.

## Render live setup
1. Upload this project to GitHub.
2. In Render, create a PostgreSQL database.
3. Create a Web Service from the GitHub repo.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `DATABASE_URL` = Render PostgreSQL internal database URL
   - `ADMIN_PASSWORD` = your private admin password (set this only in Render)
   - `SQUARE_ENV` = `sandbox` while testing
   - `SQUARE_APP_ID`
   - `SQUARE_LOCATION_ID`
   - `SQUARE_ACCESS_TOKEN`
7. Deploy.

The server creates its `products` and `orders` tables automatically.

## Product photos
Owner → Add Product accepts an image up to 2 MB. It is stored with the product in PostgreSQL, so it appears for every visitor. For a larger store, migrate photos to object storage/CDN later.

## Going live with Square
Test with Sandbox first. When ready:
- Set `SQUARE_ENV=production`
- Replace the app ID, location ID, and access token with production credentials.
- Redeploy.
Do not put the access token in frontend files or GitHub.

## Important
Before accepting real orders, test checkout, inventory changes, mobile layout, pickup/shipping rules, taxes, refunds, and your fulfillment workflow. Shipping cost/tax calculation and automated email confirmations are not included yet.


Store location: St. Croix, U.S. Virgin Islands
Customer contact: 340-208-3944
Categories: Squishies / Others
The live store starts empty; add your real inventory from Owner → Add Product.

Security note: never commit your real ADMIN_PASSWORD to GitHub. Set it only in Render Environment Variables.
