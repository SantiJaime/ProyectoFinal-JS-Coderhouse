const nav = document.querySelector("#nav");

const container = document.createElement("div");
container.classList.add("container-fluid");

const a = document.createElement("a");
a.classList.add("navbar-brand");
a.innerHTML = `<img src="../imgs/MinimercadoLogo.png" alt="Minimercado Logo" width="120px">`;
a.href = "../index.html";
container.appendChild(a);

const button = document.createElement("button");
button.classList.add("navbar-toggler", "bg-white");
button.type = button;
button.setAttribute("data-bs-toggle", "collapse");
button.setAttribute("data-bs-target", "#navbarNav");
button.setAttribute("aria-controls", "navbarNav");
button.setAttribute("aria-expanded", "false");
button.setAttribute("aria-label", "Toggle navigation");
button.innerHTML = `<span class="navbar-toggler-icon"></span>`;
container.appendChild(button);

const div = document.createElement("div");
div.classList.add("collapse", "navbar-collapse");
div.id = "navbarNav";

const ul = document.createElement("ul");
ul.classList.add("navbar-nav");

const li1 = document.createElement("li");
li1.classList.add("nav-item");
li1.innerHTML = `<a class="nav-link text-white fs-5" href="../index.html">
<i class="bi bi-basket2"></i> Productos</a>`;
ul.appendChild(li1);

const li2 = document.createElement("li");
li2.classList.add("nav-item");
li2.innerHTML = `<a class="nav-link text-white fs-5" href="../pages/cart.html">
<i class="bi bi-cart4"></i> Mi carrito</a>`;
ul.appendChild(li2);

const buttonAdmin = document.createElement("a");
buttonAdmin.classList.add("btn", "btn-light");
buttonAdmin.href = "../pages/admin.html";
buttonAdmin.innerText = "Administrar productos";

div.appendChild(ul);

container.appendChild(div);
nav.appendChild(container);
