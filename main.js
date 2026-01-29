let products = [];
let filteredProducts = [];

// Load dữ liệu từ db.json
fetch("db.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    filteredProducts = [...products];
    renderTable(filteredProducts);
  })
  .catch(error => console.error("Lỗi load JSON:", error));


// Render bảng
function renderTable(list) {
  const table = document.getElementById("productTable");
  table.innerHTML = "";

  list.forEach(p => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <img src="${p.images[0]}" alt="${p.title}" width="80">
      </td>
      <td>${p.title}</td>
      <td>${p.category.name}</td>
      <td>$${p.price}</td>
      <td>${p.description}</td>
    `;

    table.appendChild(row);
  });
}


// 🔍 Tìm kiếm theo tên (oninput)
function searchProduct() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(keyword)
  );

  renderTable(filteredProducts);
}


// 🔤 Sắp xếp tên A → Z
function sortNameAsc() {
  filteredProducts.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  renderTable(filteredProducts);
}

// 🔤 Sắp xếp tên Z → A
function sortNameDesc() {
  filteredProducts.sort((a, b) =>
    b.title.localeCompare(a.title)
  );
  renderTable(filteredProducts);
}

// 💰 Giá tăng
function sortPriceAsc() {
  filteredProducts.sort((a, b) => a.price - b.price);
  renderTable(filteredProducts);
}

// 💰 Giá giảm
function sortPriceDesc() {
  filteredProducts.sort((a, b) => b.price - a.price);
  renderTable(filteredProducts);
}
