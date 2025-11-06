const addBtn = document.getElementById("addProductBtn");
const modal = document.getElementById("uploadModal");
const closeModal = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveBtn");
const gallery = document.getElementById("gallery");

let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  gallery.innerHTML = "";
  products.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      ${p.type === "image"
        ? `<img src="${p.media}" alt="${p.title}"/>`
        : `<video src="${p.media}" controls></video>`}
      <div class="info">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">Buy Now</a>
      </div>
    `;
    gallery.appendChild(card);
  });
}

addBtn.onclick = () => modal.classList.remove("hidden");
closeModal.onclick = () => modal.classList.add("hidden");

saveBtn.onclick = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const link = document.getElementById("link").value;
  const file = document.getElementById("media").files[0];

  if (!title || !link || !file) {
    alert("Please fill all required fields!");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const mediaType = file.type.startsWith("video") ? "video" : "image";
    const product = {
      title,
      description,
      link,
      media: e.target.result,
      type: mediaType,
    };
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    modal.classList.add("hidden");
  };
  reader.readAsDataURL(file);
};

// Load initial products
renderProducts();
