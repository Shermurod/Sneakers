/********************************** Sketka vaqti tugadi *************************************/

const sketkaVaqqti = new Date();
sketkaVaqqti.setSeconds(sketkaVaqqti.getSeconds() + 10);

const mdl = document.getElementById("meningModal");
const yopilModal = document.getElementById("closeModal");
const sketka = document.getElementsByClassName("sketka")[0];

let modalChiqqan = false;
const pulDiv = document.createElement("div");
let ishla = true;
let vaqtincha = 125;
const haqiqiynarx = 250;

function teskariSana() {
  const hozir = new Date();
  const hisobla = sketkaVaqqti - hozir;

  if (hisobla <= 0) {
    if (!modalChiqqan) {
      mdl.style.display = "flex";
      modalChiqqan = true;
    }

    if (ishla) {
      vaqtincha = haqiqiynarx;
      ishla = false;
      updatePrice();
    }
    return;
  }

  const days = Math.floor(hisobla / (1000 * 60 * 60 * 24));
  const hours = Math.floor(hisobla % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const minutes = Math.floor(hisobla % (1000 * 60 * 60) / (1000 * 60));
  const seconds = Math.floor(hisobla % (1000 * 60) / 1000);

  document.getElementById("days").textContent = days < 10 ? "0" + days : days;
  document.getElementById("hours").textContent =
    hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").textContent =
    minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").textContent =
    seconds < 10 ? "0" + seconds : seconds;
}

/****************************** Sketka vaqti tugadi modalni yopish *************************************/

yopilModal.addEventListener("click", () => {
  mdl.style.display = "none";
  pulDiv.textContent = `$${vaqtincha}`;
  pulDiv.style.fontSize = "24px";
  pulDiv.style.fontWeight = "bold";
  pulDiv.style.textAlign = "start";
  pulDiv.style.marginBottom = "30px";
  pulDiv.style.marginLeft = "30px";

  sketka.parentNode.replaceChild(pulDiv, sketka);
});

setInterval(teskariSana, 1000);
teskariSana();

/************************** Rasmni almashtirish *******************************/

const katta = document.querySelector(".rasmkatta");
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("click", () => {
    items.forEach(img => img.classList.remove("active"));
    item.classList.add("active");
    katta.src = item.src;
  });
});

/**************************rasmli slayderni ochish********************************/

const modal = document.getElementById("modalcha");
const openModalBtn = document.getElementById("kattarasm");
const closeModalBtn = document.getElementById("yopil");
const slides = document.querySelectorAll(".slide");
const thumbnails = document.querySelectorAll(".thumbnail");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

let currentSlide = 0;

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  showSlide(currentSlide);
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.classList.toggle("active", i === index);
  });
}

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

/************************** + va - tugmalari bilan mahsulot miqdorini boshqarish ****************************/

const qush = document.getElementsByClassName("pelus");
const ayir = document.getElementsByClassName("menus");
const raqam = document.getElementsByClassName("raqam")[0];

let number = 0;

[...qush].forEach(q =>
  q.addEventListener("click", () => {
    number++;
    raqam.textContent = number;
  })
);

[...ayir].forEach(a =>
  a.addEventListener("click", () => {
    if (number > 0) {
      number--;
      raqam.textContent = number;
    }
  })
);

/************************** Savatga mahsulot qo'shish ****************************/

const cartItems = [];
const addToCartBtn = document.getElementById("add-to-cart");

addToCartBtn.addEventListener("click", () => {
  const itemName = "Fall Limited Edition Sneakers";
  const itemPrice = 125.0;

  const existingItem = cartItems.find(item => item.name === itemName);
  if (existingItem) {

    existingItem.quantity += number;
    existingItem.price = existingItem.originalPrice * existingItem.quantity;
  } else {
    cartItems.push({
      name: itemName,
      price: itemPrice * number,
      originalPrice: itemPrice,
      quantity: number
    });
  }

  updateCart();
  number = 0;
  raqam.textContent = number;
});

/************************** Savatni yangilash ****************************/

function updateCart() {
  const cartQuantity = document.getElementById("cart-quantity");
  const cartTotal = document.getElementById("cart-total");

  let totalPrice = 0;
  let totalQuantity = 0;

  cartItems.forEach(item => {
    totalPrice += item.price;
    totalQuantity += item.quantity;
  });

  cartQuantity.textContent = totalQuantity;
  cartTotal.textContent = totalPrice.toFixed(2);
}

/************************** Savatga mahsulot qo'shish tugmasi bosilganda ****************************/

const cartDropdown = document.getElementById("cartDropdown");
document.getElementById("open-cart").addEventListener("click", () => {
  cartDropdown.style.display =
    cartDropdown.style.display === "block" ? "none" : "block";
});

/************************** Savatni tozalash (Checkout) ****************************/

const checkoutBtn = document.getElementById("checkout");
const cartMessage = document.createElement("div");

checkoutBtn.addEventListener("click", () => {

  cartItems.length = 0;

  updateCart();

  cartMessage.textContent = "Savat bo'shadi! Savatdagi mahsulotlar tozalandi.";
  cartMessage.style.fontSize = "20px";
  cartMessage.style.fontWeight = "bold";
  cartMessage.style.color = "#4caf50";
  cartMessage.style.textAlign = "center";
  cartMessage.style.marginTop = "20px";

  document.body.appendChild(cartMessage);

  setTimeout(() => {
    cartMessage.style.display = "none";
  }, 3000);
});