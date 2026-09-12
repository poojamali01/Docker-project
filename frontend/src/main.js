import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `
  <header>
    <h1>🧶 Crochet Corner</h1>
    <p>Handmade with love ❤️</p>
  </header>

  <main>
    <h2>Our Crochet Products</h2>

    <div id="products" class="products">
      <p>Loading products...</p>
    </div>

    <section class="add-product">
      <h2>Add a Product</h2>

      <input id="productName" placeholder="Product name" />

      <input
        id="productPrice"
        type="number"
        placeholder="Price"
      />

      <input
        id="productDescription"
        placeholder="Description"
      />

      <button id="addProduct">
        Add Product
      </button>
    </section>
  </main>
`;

const productsContainer = document.querySelector("#products");

async function loadProducts() {
  try {
    const response = await fetch("http://localhost:5000/api/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    if (products.length === 0) {
      productsContainer.innerHTML = `
        <p>No products available.</p>
      `;
      return;
    }

    productsContainer.innerHTML = products
      .map(
        (product) => `
          <div class="product">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <strong>₹${product.price}</strong>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error(error);

    productsContainer.innerHTML = `
      <p>Unable to load products.</p>
    `;
  }
}

async function addProduct() {
  const name = document.querySelector("#productName").value;
  const price = document.querySelector("#productPrice").value;
  const description =
    document.querySelector("#productDescription").value;

  if (!name || !price) {
    alert("Please enter product name and price.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          price,
          description
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    document.querySelector("#productName").value = "";
    document.querySelector("#productPrice").value = "";
    document.querySelector("#productDescription").value = "";

    await loadProducts();
  } catch (error) {
    console.error(error);

    alert("Unable to add product.");
  }
}

document
  .querySelector("#addProduct")
  .addEventListener("click", addProduct);

loadProducts();
