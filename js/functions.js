console.log("hello world!");

//---------Seleccionar elementos
const title = document.getElementById("txt");
//console.log(title);

const image = document.getElementsByClassName("logo");
//console.log(image[1]);

const tags = document.getElementsByTagName("section");
//console.log(tags[6]);

const elem = document.querySelectorAll(".logo")
//console.log(elem);


//--------Crear elemento y agregar attribute
const parent = document.querySelector(".products");
const newElem = document.createElement("section");
newElem.setAttribute("class","new");

parent.append(newElem);


//------Attributes
const logo = document.querySelector(".logo");
//logo.setAttribute("src", "img/mexico.jpeg");
console.log(logo.getAttribute("src"));
console.log(logo.hasAttribute("src"));
//logo.removeAttribute("src");

if(logo.hasAttribute("src")) {
    //alert("tiene src!")
}


//-------CSS Classes
const parent2 = document.querySelector(".products");
const parent3 = parent2.firstElementChild;
const price = parent3.lastElementChild;

price.classList.add("red");
price.classList.replace("red","blue");
price.classList.remove("blue");

//----- Modificar Texto
const button = document.getElementsByClassName("carButton");
console.log(button[0].innerText);

button[0].innerText = "BUY";

//-----Modificar Style
console.log(button[0].style);
//button[0].style.backgroundColor = "gray";


//--------Eventos 

const elemButton = button[0];
elemButton.addEventListener('click', () => {
    elemButton.classList.toggle("toggle");
});

const iconRemove = document.querySelectorAll(".remove");
console.log(iconRemove);

iconRemove.forEach(elem => {
    elem.addEventListener("click", () => {
        const elemParent = elem.parentElement;
        elemParent.remove();
        cartCount--;
        updateBadge();
    })
});

const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

cartIcon.addEventListener("click", () => {
    cart.classList.toggle("show");
});

const product = document.querySelector(".mouse");

product.addEventListener("mouseenter", () => {
    product.style.opacity = ".5";
})

product.addEventListener("mouseleave", () => {
    product.style.opacity = "1";
})
//Codigo nuevo
//Seleccion de elemntos
const sidebar = document.querySelector(".sidebar");
const menuIcon = document.querySelector(".menu-icon");
const closeSidebarIcon = document.querySelector(".close-sidebar");
const cartIconContainer = document.querySelector(".cartIcon-container");
const badge = document.querySelector(".badge");
const buyButton = cart.querySelector(".carButton");
//Contador de productos en el carrito
let cartCount = cart.querySelectorAll("section").length;
updateBadge();

//Function para actualizar badge
function updateBadge() {
  badge.innerText = cartCount;
  console.log("Productos en el carrito:", cartCount);
}

// Abrir y cerrar Sidebar
menuIcon.addEventListener("click", () => {
  console.log("Abriendo sidebar");
  sidebar.classList.add("show");
});

closeSidebarIcon.addEventListener("click", () => {
  console.log("Cerrando sidebar");
  sidebar.classList.remove("show");
});

//Agregar productos al carrito
//Intento A:

// Seleccionar todos los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Recorrer cada botón y asignar el evento
addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Obtener el <section> del producto
    const productSection = button.parentElement;

    // Crear un nuevo <section> para el carrito
    const cartItem = document.createElement("section");

    // Crear y asignar la imagen
    const img = document.createElement("img");
    img.setAttribute("src", productSection.querySelector("img").getAttribute("src"));

    // Crear y asignar el título
    const title = document.createElement("h3");
    title.innerText = productSection.querySelector("h2").innerText;

    // Crear y asignar el precio
    const price = document.createElement("p");
    price.innerText = productSection.querySelector("p").innerText;

    // Crear el icono de remover
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("remove");
    const removeImg = document.createElement("img");
    removeImg.setAttribute("src", "img/icons/remove.svg");
    removeIcon.appendChild(removeImg);

    // Evento para eliminar el producto del carrito
    removeIcon.addEventListener("click", () => {
      cartItem.remove();
      cartCount--;
      updateBadge();
    });

    // Ensamblar los elementos en el <section>
    cartItem.appendChild(img);
    cartItem.appendChild(title);
    cartItem.appendChild(price);
    cartItem.appendChild(removeIcon);

    // Insertar antes del botón COMPRAR
    cart.insertBefore(cartItem, buyButton);

    // Incrementar el contador y actualizar badge
    cartCount++;
    updateBadge();

    console.log(`Producto agregado: ${title.innerText}`);
  });
});

//Funcionalidad extra, alert con el total de precio
buyButton.addEventListener("click", () => {
  const cartQty = cart.querySelectorAll("section");
  let total = 0;

  cartQty.forEach(item => {
    const priceText = item.querySelector("p")?.innerText || "";
    const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(price)) {
      total += price;
    }
  });

  alert(`El total de tu compra es: $${total.toFixed(2)}`);
});