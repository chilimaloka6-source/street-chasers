STREET CHASERS CLOTHING STORE — ADMIN GUIDE
===========================================

WHAT IS INCLUDED
- index.html: website structure and page content
- style.css: design, colours, responsive/mobile layout
- app.js: product display, search/filter and WhatsApp order links
- products.js: THE FILE YOU EDIT TO ADD PRODUCTS, PRICES AND PICTURE PATHS
- images/street-chasers-logo.png: Street Chasers logo
- images/products/: place your product photos in this folder

HOW TO OPEN
1. Extract the ZIP folder.
2. Open the extracted Street_Chasers_Clothing_Store folder in VS Code.
3. Open index.html in a browser to preview it. You can use the VS Code Live Server extension if installed.

HOW TO ADD A PRODUCT
1. Take or prepare a clear product picture.
2. Copy the picture into images/products/ (example: red-cap.jpg).
3. Open products.js in VS Code.
4. Add a new object inside the products array. Separate objects with commas.

Example:
{
  id: "cap-002",
  name: "Red Street Cap",
  category: "Caps",
  price: 15000,
  image: "images/products/red-cap.jpg",
  description: "Red cap with adjustable strap.",
  available: true
},

Important:
- Keep the image filename and path exactly the same as the actual file.
- Supported categories: Caps, T-Shirts, Trousers, Shorts, Socks, Hoodies, Other.
- Set price as a number without commas: 15000 (not "15,000").
- available: true means it is listed as available; false tells customers to ask whether it is available.
- Save products.js and refresh the browser.
- On a live website, upload/push the changed products.js and new picture file(s) to your hosting/GitHub repository so customers see the updates.

WHATSAPP ORDER FLOW
Each product has a WhatsApp button that opens a message to 0884 232 800 asking about the selected product, displayed price and availability. The website does not take payment or automatically reserve stock. You confirm stock, size/colour and delivery/payment arrangements directly with the customer.

PHONE NUMBER NOTE
The website uses Malawi's international WhatsApp format: 265884232800. This corresponds to local number 0884 232 800. Test the WhatsApp link on your phone before publishing.

SAMPLE PRODUCTS
The sample prices and items in products.js are placeholders. Edit them to match your real stock and prices before publishing.
