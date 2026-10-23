/*
  STREET CHASERS PRODUCT CATALOG
  ADMIN EDITING GUIDE:
  1. Open this file in VS Code.
  2. Add, edit or remove product objects in the products array below.
  3. Put product photos in images/products/ and use the relative path, e.g. "images/products/black-cap.jpg".
  4. Save the file and refresh the website.
  5. Prices are displayed as MWK. Use a number for price, e.g. 15000.
  6. For products not yet in stock, set available: false. Customers can still ask about availability.
*/
const products = [
  {
    id: "cap-001",
    name: "Street Chasers Cap",
    category: "Caps",
    price: 12000,
    image: "images/products/black-cap.jpg",
    description: "Everyday streetwear cap.",
    available: true
  },
  {
    id: "tee-001",
    name: "Classic Street T-Shirt",
    category: "T-Shirts",
    price: 18000,
    image: "images/products/black-tshirt.jpg",
    description: "A clean essential for your daily fit.",
    available: true
  },
  {
    id: "trouser-001",
    name: "Everyday Street Trousers",
    category: "Trousers",
    price: 28000,
    image: "images/products/trousers.jpg",
    description: "Comfortable style for everyday wear.",
    available: true
  },
  {
    id: "short-001",
    name: "Casual Street Shorts",
    category: "Shorts",
    price: 16000,
    image: "images/products/shorts.jpg",
    description: "Easy-going style for warmer days.",
    available: true
  },
  {
    id: "socks-001",
    name: "Everyday Socks",
    category: "Socks",
    price: 5000,
    image: "images/products/socks.jpg",
    description: "A simple finishing touch for your fit.",
    available: true
  },
  {
    id: "hoodie-001",
    name: "Classic Street Hoodie",
    category: "Hoodies",
    price: 35000,
    image: "images/products/hoodie.jpg",
    description: "Layer up with a streetwear classic.",
    available: true
  }
];
