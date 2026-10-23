const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const emptyMessage = document.getElementById("emptyMessage");

function formatPrice(price) {
  return "MWK " + Number(price || 0).toLocaleString("en-US");
}
function orderMessage(product) {
  return `Hello Street Chasers, I would like to order/ask about this product:\nProduct: ${product.name}\nCategory: ${product.category}\nPrice shown: ${formatPrice(product.price)}\nIs it available? Please confirm the available sizes/colours and how I can get it.`;
}
function productCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  const imageBox = document.createElement("div");
  imageBox.className = "product-image";
  const img = document.createElement("img");
  img.src = product.image || "";
  img.alt = product.name;
  img.loading = "lazy";
  img.onerror = () => {
    imageBox.innerHTML = `<div class="image-fallback"><span>✦</span><small>Product photo coming soon</small></div>`;
  };
  imageBox.appendChild(img);
  const info = document.createElement("div");
  info.className = "product-info";
  const category = document.createElement("div");
  category.className = "product-category";
  category.textContent = product.category || "Clothing";
  const title = document.createElement("h3");
  title.textContent = product.name;
  const description = document.createElement("p");
  description.className = "product-description";
  description.textContent = product.description || "";
  const price = document.createElement("div");
  price.className = "product-price";
  price.textContent = formatPrice(product.price);
  const order = document.createElement("a");
  order.className = "order-button";
  order.target = "_blank";
  order.rel = "noopener";
  order.href = "https://wa.me/265884232800?text=" + encodeURIComponent(orderMessage(product));
  order.textContent = product.available === false ? "Ask if available ↗" : "Order / Ask on WhatsApp ↗";
  info.append(category, title, description, price, order);
  card.append(imageBox, info);
  return card;
}
function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const filtered = products.filter(p => {
    const matchesText = [p.name, p.category, p.description].join(" ").toLowerCase().includes(query);
    const matchesCategory = category === "All" || p.category === category;
    return matchesText && matchesCategory;
  });
  grid.replaceChildren(...filtered.map(productCard));
  emptyMessage.hidden = filtered.length > 0;
}
searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", renderProducts);
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mainNav").classList.toggle("open");
});
document.querySelectorAll("#mainNav a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("mainNav").classList.remove("open");
}));
renderProducts();
