let products = [];

const getProducts = () => {
  fetch("/products.json")
    .then((response) => response.json())
    .then((res) => {
      products = res;
      showProducts(res);
    });
};

const addProdInCart = (id) => {
  let cartLS = JSON.parse(localStorage.getItem("cart")) || [];

  const prodExistIndex = cartLS.findIndex((prod) => prod.id === id);

  if (prodExistIndex !== -1) {
    const updatedProduct = {
      ...cartLS[prodExistIndex],
      cantidad: cartLS[prodExistIndex].cantidad + 1,
    };

    cartLS.splice(prodExistIndex, 1, updatedProduct);
    Toastify({
      text: `Ha agregado 1 unidad más de ${updatedProduct.nombre} a su carrito`,
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    const prod = products.find((prod) => prod.id === id);
    cartLS.push(prod);
    Toastify({
      text: `El producto ${prod.nombre} ha sido agregado al carrito`,
      duration: 2000,
      close: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
  localStorage.setItem("cart", JSON.stringify(cartLS));
};

const divProducts = document.querySelector("#divProducts");
const searchProd = document.querySelector("#searchProd");

const showProducts = (products) => {
  divProducts.innerHTML = "";
  products.forEach((prod) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col-lg-3 col-md-6 col-sm-6 my-3";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card text-white bgCards";

    const img = document.createElement("img");
    img.src = prod.img;
    img.className = "card-img-top";
    img.alt = prod.nombre;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.innerText = prod.nombre;

    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.innerText = `$${prod.precio}`;

    const button = document.createElement("button");
    button.className = "btn btn-light w-100 add-prod";
    button.innerText = "Agregar al carrito";
    button.setAttribute("idProd", prod.id);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(button);

    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);

    colDiv.appendChild(cardDiv);

    divProducts.appendChild(colDiv);
  });
  const addProdButtons = document.querySelectorAll(".add-prod");

  addProdButtons.forEach((button) => {
    button.addEventListener("click", (ev) => {
      const idProd = parseInt(ev.target.getAttribute("idProd"));
      addProdInCart(idProd);
    });
  });
};

const searchProduct = (ev) => {
  const { value } = ev.target;

  const filteredProducts = products.filter((prod) => {
    let nombre = prod.nombre.toLowerCase();
    return nombre.includes(value.toLowerCase());
  });

  if (filteredProducts.length === 0) {
    divProducts.innerHTML = `<h3 class="text-center">No se encontraron resultados</h3>`;
    return;
  }
  showProducts(filteredProducts);
};

getProducts();

searchProd.addEventListener("input", searchProduct);
