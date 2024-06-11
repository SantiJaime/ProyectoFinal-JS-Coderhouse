let cartLS = JSON.parse(localStorage.getItem("cart")) || [];
const divMenu = document.querySelector("#divMenu");
const divTicket = document.querySelector("#divTicket");

const buttonEmptyCart = document.createElement("button");
buttonEmptyCart.classList.add("btn", "btn-light");
buttonEmptyCart.innerText = "Vaciar carrito";

buttonEmptyCart.addEventListener("click", () => {
  if (cartLS.length === 0) {
    Toastify({
      text: "Su carrito ya se encuentra vacío",
      duration: 2500,
      style: {
        background: "linear-gradient(to right, #ffffff, #f0f0f0)",
        color: "#000000",
      },
    }).showToast();
    return;
  }
  Swal.fire({
    title: "¿Estás seguro de vaciar tu carrito?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Carrito vaciado correctamente",
        duration: 2500,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
    localStorage.removeItem("cart");
    cartLS = [];
    showCart();
  });
});

divMenu.appendChild(buttonEmptyCart);

const deleteProdInCart = (id) => {
  Swal.fire({
    title: "¿Estás seguro de eliminar este producto de tu carrito?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Toastify({
        text: "Producto eliminado correctamente",
        duration: 2500,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    }
    const filteredCart = cartLS.filter((prod) => prod.id !== id);

    localStorage.setItem("cart", JSON.stringify(filteredCart));

    cartLS = filteredCart;
    showCart();
  });
};

const subtractQuantity = (id) => {
  const prod = cartLS.find((prod) => prod.id === id);
  if (prod && prod.cantidad > 1) {
    prod.cantidad--;

    const prodQuantity = document.getElementById(`${id}`);
    prodQuantity.innerText = prod.cantidad;

    const prodTotalPrice = document.getElementById(`precioTotal${id}`);
    prodTotalPrice.innerText = `$${prod.cantidad * prod.precio}`;

    localStorage.setItem("cart", JSON.stringify(cartLS));
    updateTotals();
  }
};

const addQuantity = (id) => {
  const prod = cartLS.find((prod) => prod.id === id);
  if (prod) {
    prod.cantidad++;

    const prodQuantity = document.getElementById(`${id}`);
    prodQuantity.innerText = prod.cantidad;

    const prodTotalPrice = document.getElementById(`precioTotal${id}`);
    prodTotalPrice.innerText = `$${prod.cantidad * prod.precio}`;

    localStorage.setItem("cart", JSON.stringify(cartLS));
    updateTotals();
  }
};
const updateTotals = () => {
  if (cartLS.length > 0) {
    let cantTotalProductos = cartLS.reduce(
      (total, prod) => total + prod.cantidad,
      0
    );

    let subtotal = cartLS.reduce(
      (total, prod) => total + prod.precio * prod.cantidad,
      0
    );

    let precioFinal = cantTotalProductos >= 20 ? subtotal * 0.85 : subtotal;

    const totalProductosElement = document.getElementById("totalProductos");
    totalProductosElement.innerText = cantTotalProductos;

    const subtotalElement = document.getElementById("subtotal");
    subtotalElement.innerText = `$${subtotal}`;

    const precioFinalElement = document.getElementById("precioFinal");
    precioFinalElement.className = "fw-bold"
    precioFinalElement.innerText = `$${precioFinal}`;
  }
};

const showCart = () => {
  const table = document.querySelector("#tableId");
  table.innerHTML = "";

  if (cartLS.length > 0) {
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const headers = [
      "ID",
      "Producto",
      "Precio unitario",
      "Cantidad",
      "Eliminar",
      "Precio total",
    ];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.scope = "col";
      th.innerText = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.className = "table-group-divider";

    cartLS.forEach((prod) => {
      const tr = document.createElement("tr");

      const th = document.createElement("th");
      th.scope = "row";
      th.innerText = prod.id;
      tr.appendChild(th);

      const tdName = document.createElement("td");
      tdName.innerText = prod.nombre;
      tr.appendChild(tdName);

      const tdPrice = document.createElement("td");
      tdPrice.innerText = `$${prod.precio}`;
      tr.appendChild(tdPrice);

      const tdQuantity = document.createElement("td");
      const divQuantity = document.createElement("div");
      divQuantity.className =
        "d-flex justify-content-center align-items-center gap-2";

      const btnDecrease = document.createElement("button");
      btnDecrease.className = "btn btn-outline-danger p-1 decrease-btn";
      btnDecrease.setAttribute("idProd", prod.id);
      btnDecrease.innerHTML = '<i class="bi bi-dash-lg"></i>';

      const h6Quantity = document.createElement("h6");
      h6Quantity.id = prod.id;
      h6Quantity.innerText = prod.cantidad;

      const btnIncrease = document.createElement("button");
      btnIncrease.className = "btn btn-outline-success p-1 increase-btn";
      btnIncrease.setAttribute("idProd", prod.id);
      btnIncrease.innerHTML = '<i class="bi bi-plus-lg"></i>';

      divQuantity.appendChild(btnDecrease);
      divQuantity.appendChild(h6Quantity);
      divQuantity.appendChild(btnIncrease);
      tdQuantity.appendChild(divQuantity);
      tr.appendChild(tdQuantity);

      const tdDelete = document.createElement("td");
      tdDelete.className = "text-center";
      const btnDelete = document.createElement("button");
      btnDelete.className = "btn btn-outline-danger delete-btn";
      btnDelete.setAttribute("idProd", prod.id);
      btnDelete.innerHTML = '<i class="bi bi-trash3-fill"></i>';
      tdDelete.appendChild(btnDelete);
      tr.appendChild(tdDelete);

      const tdTotalPrice = document.createElement("td");
      tdTotalPrice.id = `precioTotal${prod.id}`;
      tdTotalPrice.innerText = `$${prod.cantidad * prod.precio}`;
      tr.appendChild(tdTotalPrice);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (ev) => {
        const idProd = parseInt(
          ev.target.closest(".delete-btn").getAttribute("idProd")
        );
        deleteProdInCart(idProd);
      });
    });

    const increaseButtons = document.querySelectorAll(".increase-btn");
    increaseButtons.forEach((button) => {
      button.addEventListener("click", (ev) => {
        const idProd = parseInt(
          ev.target.closest(".increase-btn").getAttribute("idProd")
        );
        addQuantity(idProd);
      });
    });

    const decreaseButtons = document.querySelectorAll(".decrease-btn");
    decreaseButtons.forEach((button) => {
      button.addEventListener("click", (ev) => {
        const idProd = parseInt(
          ev.target.closest(".decrease-btn").getAttribute("idProd")
        );
        subtractQuantity(idProd);
      });
    });
    updateTotals();
  } else {
    table.innerHTML = `<h3 class="text-center">Aún no agregó productos en su carrito</h3>`;
    divTicket.innerHTML = "";
  }
};

showCart();
