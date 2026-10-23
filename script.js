const STORAGE_KEY = "streetChasersProductsV1";
const WHATSAPP_NUMBER = "265884232800"; // Malawi country code + number without the leading 0
let products = loadProducts();

const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const countLabel = document.getElementById("productCount");
const form = document.getElementById("productForm");
const message = document.getElementById("managerMessage");
const imageInput = document.getElementById("productImage");

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();

function loadProducts() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveProducts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (err) {
    showMessage("Could not save. The photo may be too large; try a smaller image.");
    return false;
  }
}
function showMessage(text) { message.textContent = text; }
function escapeHTML(value="") {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function formatPrice(value) {
  if (value === "" || value === null || value === undefined) return "Ask for price";
  return "MWK " + Number(value).toLocaleString("en-US");
}
function renderProducts() {
  const search = document.getElementById("searchInput").value.trim().toLowerCase();
  const shown = products.filter(p => [p.name,p.category,p.description,p.sizes].join(" ").toLowerCase().includes(search));
  countLabel.textContent = `${shown.length} PRODUCT${shown.length === 1 ? "" : "S"}`;
  emptyState.hidden = shown.length !== 0;
  grid.innerHTML = shown.map(p => `
    <article class="product-card">
      <div class="product-image">
        ${p.image ? `<img src="${p.image}" alt="${escapeHTML(p.name)}" loading="lazy">` : `<div class="placeholder-art" aria-label="Street Chasers placeholder">SC</div>`}
        ${p.category ? `<span class="product-tag">${escapeHTML(p.category)}</span>` : `<span class="product-tag">Street Chasers</span>`}
      </div>
      <div class="product-info">
        <div class="product-category">STREET CHASERS / ${escapeHTML(p.category || "COLLECTION")}</div>
        <div class="product-title-row"><h3 class="product-title">${escapeHTML(p.name)}</h3><span class="product-price">${formatPrice(p.price)}</span></div>
        ${p.description ? `<p class="product-description">${escapeHTML(p.description)}</p>` : ""}
        ${p.sizes ? `<p class="product-sizes">Sizes: ${escapeHTML(p.sizes)}</p>` : ""}
        <div class="product-actions">
          <button class="button button-dark" type="button" data-quote="${escapeHTML(p.id)}">Request quote ↗</button>
          <button class="button button-outline" type="button" data-order="${escapeHTML(p.id)}">Order via WhatsApp</button>
        </div>
        <div class="product-actions">
          <button class="edit-product" type="button" data-edit="${escapeHTML(p.id)}">Edit product</button>
          <button class="delete-product" type="button" data-delete="${escapeHTML(p.id)}">Delete</button>
        </div>
      </div>
    </article>`).join("");
}
function whatsappLink(product, orderType="quotation") {
  const price = product.price === "" || product.price == null ? "Please share the price" : formatPrice(product.price);
  const text = `Hello Street Chasers! I would like to request a ${orderType} for:\n\nProduct: ${product.name}\nPrice shown: ${price}\nCategory: ${product.category || "Not specified"}\nSizes: ${product.sizes || "Please advise"}\n\nPlease confirm availability, final price and delivery/pickup options. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
grid.addEventListener("click", event => {
  const quote = event.target.closest("[data-quote]");
  const order = event.target.closest("[data-order]");
  const edit = event.target.closest("[data-edit]");
  const del = event.target.closest("[data-delete]");
  if (quote || order) {
    const id = (quote || order).dataset[quote ? "quote" : "order"];
    const product = products.find(p => p.id === id);
    if (product) window.open(whatsappLink(product, quote ? "quotation" : "order"), "_blank", "noopener");
  }
  if (edit) startEdit(edit.dataset.edit);
  if (del) {
    const product = products.find(p => p.id === del.dataset.delete);
    if (product && confirm(`Delete "${product.name}" from this browser's store?`)) {
      products = products.filter(p => p.id !== product.id);
      if (saveProducts()) { renderProducts(); showMessage("Product deleted."); }
    }
  }
});
document.getElementById("searchInput").addEventListener("input", renderProducts);

function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    if (!file.type.startsWith("image/")) return reject(new Error("Please choose an image file."));
    if (file.size > 1.5 * 1024 * 1024) return reject(new Error("Please use an image smaller than 1.5 MB so it can save in your browser."));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.readAsDataURL(file);
  });
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  const saveButton = document.getElementById("saveProductButton");
  saveButton.disabled = true;
  const editId = document.getElementById("editId").value;
  const old = products.find(p => p.id === editId);
  try {
    const pickedImage = await readImage(imageInput.files[0]);
    const item = {
      id: editId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      name: document.getElementById("productName").value.trim(),
      price: document.getElementById("productPrice").value,
      category: document.getElementById("productCategory").value.trim(),
      sizes: document.getElementById("productSizes").value.trim(),
      description: document.getElementById("productDescription").value.trim(),
      image: pickedImage || (old ? old.image : "")
    };
    if (!item.name) throw new Error("Enter a product name.");
    if (old) products = products.map(p => p.id === editId ? item : p);
    else products.unshift(item);
    if (saveProducts()) {
      renderProducts(); resetForm();
      showMessage(old ? "Product updated." : "Product added to your storefront.");
      document.getElementById("shop").scrollIntoView({behavior:"smooth"});
    }
  } catch (err) { showMessage(err.message || "Something went wrong. Try again."); }
  finally { saveButton.disabled = false; }
});
function startEdit(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  document.getElementById("editId").value = p.id;
  document.getElementById("productName").value = p.name;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productCategory").value = p.category || "";
  document.getElementById("productSizes").value = p.sizes || "";
  document.getElementById("productDescription").value = p.description || "";
  imageInput.value = "";
  document.getElementById("saveProductButton").textContent = "Save changes";
  document.getElementById("cancelEditButton").hidden = false;
  showMessage("Editing: " + p.name);
  document.getElementById("manage").scrollIntoView({behavior:"smooth"});
}
function resetForm() {
  form.reset();
  document.getElementById("editId").value = "";
  document.getElementById("saveProductButton").textContent = "＋ Add product";
  document.getElementById("cancelEditButton").hidden = true;
}
document.getElementById("cancelEditButton").addEventListener("click", resetForm);
document.getElementById("exportButton").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(products, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "street-chasers-products.json"; a.click();
  URL.revokeObjectURL(url); showMessage("Product list exported. Keep this backup somewhere safe.");
});
document.getElementById("importButton").addEventListener("click", () => document.getElementById("importFile").click());
document.getElementById("importFile").addEventListener("change", async event => {
  const file = event.target.files[0]; if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    if (!Array.isArray(parsed) || parsed.some(p => !p.name || !p.id)) throw new Error("That file does not look like a Street Chasers product list.");
    if (!confirm(`Import ${parsed.length} products? This will replace the products in this browser.`)) return;
    products = parsed; if (saveProducts()) { renderProducts(); showMessage("Product list imported."); }
  } catch (err) { showMessage(err.message || "Could not import that file."); }
  finally { event.target.value = ""; }
});
document.getElementById("clearProductsButton").addEventListener("click", () => {
  if (!products.length) return showMessage("There are no products to clear.");
  if (confirm("Remove ALL products saved in this browser? Export a backup first if needed.")) {
    products = []; if (saveProducts()) { renderProducts(); resetForm(); showMessage("All products cleared from this browser."); }
  }
});
