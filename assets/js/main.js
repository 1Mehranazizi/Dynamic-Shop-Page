let main = document.getElementById("main");
const paginationContainer = document.querySelector(".pagination");
const fromPriceInput = document.querySelector(".from-price__input");
const upToPriceInput = document.querySelector(".up-price__input");
const buttonFilter = document.querySelector(".btn-filter");
const filterSelected = document.querySelectorAll(".brand-input");
const filterSelectedType = document.querySelectorAll(".type-input");
let pageNumber = 1;
let productNumber = 9;
let fromPrice = "";
let upToPrice = "";
let checkedItem = [];
let checkedItemType = [];
let defualtBrand = [];
let defualtType = [];

const productsArray = [
  {
    name: "VivoBook X543MA",
    brand: "Asus",
    price: 629,
    type: "LapTop",
    image: "laptop1",
  },
  {
    name: "MacBook Air 2020",
    brand: "Apple",
    price: 999,
    type: "LapTop",
    image: "laptop2",
  },
  {
    name: "Surface Book 3",
    brand: "Microsoft",
    price: 2499,
    type: "LapTop",
    image: "laptop3",
  },
  {
    name: "iPhone 13 Pro Max",
    brand: "Apple",
    price: 1299,
    type: "Phone",
    image: "phone1",
  },
  {
    name: "Galaxy S20 FE",
    brand: "Samsung",
    price: 599,
    type: "Phone",
    image: "phone2",
  },
  {
    name: "Redmi Note 10 Pro",
    brand: "Xiaomi",
    price: 399,
    type: "Phone",
    image: "phone3",
  },
  {
    name: "EOS 90D",
    brand: "Canon",
    price: 1299,
    type: "Camera",
    image: "camera1",
  },
  {
    name: "D7500",
    brand: "Nikon",
    price: 1199,
    type: "Camera",
    image: "camera2",
  },
  {
    name: "D3500",
    brand: "Nikon",
    price: 699,
    type: "Camera",
    image: "camera3",
  },
  {
    name: "Studio BUDS",
    brand: "Beats",
    price: 199,
    type: "Headset",
    image: "headphone1",
  },
  {
    name: "Solo Pro",
    brand: "Beats",
    price: 399,
    type: "Headphone",
    image: "headphone2",
  },
  {
    name: "FreeBuds Pro",
    brand: "Huawei",
    price: 399,
    type: "Headset",
    image: "headphone3",
  },
  {
    name: "Miamo-WT2105",
    brand: "Xiaomi",
    price: 59,
    type: "SmartWatch",
    image: "watch1",
  },
  {
    name: "Apple Watch series 7",
    brand: "Apple",
    price: 69,
    type: "SmartWatch",
    image: "watch2",
  },
  {
    name: "GT2 Pro VID-B19",
    brand: "Huawei",
    price: 199,
    type: "SmartWatch",
    image: "watch3",
  },
];

let products = productsArray;

//For When No Filter Has Been Applied

productsArray.forEach((item) => {
  defualtBrand.push(item.brand);
  defualtType.push(item.type);
});

//Apply Filter Function

function applyFilter() {
  fromPrice = fromPriceInput.value;
  upToPrice = upToPriceInput.value;
  checkedItem = [];
  checkedItemType = [];

  filterSelected.forEach((item) => {
    if (item.checked) {
      checkedItem.push(item.id);
    }
  });

  filterSelectedType.forEach((item) => {
    if (item.checked) {
      checkedItemType.push(item.id);
    }
  });
  products = productsArray.filter(function (e) {
    if (checkedItem.length === 0) {
      checkedItem = defualtBrand;
    }
    if (checkedItemType.length === 0) {
      checkedItemType = defualtType;
    }
    return (
      e.price >= fromPrice &&
      e.price <= upToPrice &&
      checkedItem.includes(e.brand) &&
      checkedItemType.includes(e.type)
    );
  });
  displayProduct();
}

//This Function is for displaying products

function displayProduct() {
  main.innerHTML = "";
  let endShow = productNumber * pageNumber;
  let startShow = endShow - productNumber;

  let produtcInPage = products.slice(startShow, endShow);

  produtcInPage.forEach((item) => {
    const productContainer = document.createElement("div");
    productContainer.className = "col-12 col-lg-4 mb-4";
    productContainer.innerHTML = `
      <div class="card border-0 bg-white product-card">
        <div class="card-body d-flex flex-lg-column">
          <div class="card-img position-relative me-3">
            <img src="./assets/img/${item.image}.jpg" class="img-fluid product-image" alt="product">
              <a href="#" class="position-absolute"><b class="bi bi-heart-fill"></b></a>
          </div>
          <div class="card-info d-flex flex-column justify-content-between">
            <div>
              <a href="#" class="d-block fw-bold card-title mb-0">${item.name}</a>
              <small class="d-block text-muted opacity-50">${item.brand}</small>
            </div>
            <div class="rate-price d-flex justify-content-between align-items-lg-center mt-4 flex-column flex-lg-row">
              <p class="product-price text-muted fw-bold m-0">$ ${item.price}</p>
              <div class="d-flex align-items-center">
                <span class="text-warning"><b class="bi bi-star-fill"></b></span>
                <span class="text-warning"><b class="bi bi-star-fill"></b></span>
                <span class="text-warning"><b class="bi bi-star-fill"></b></span>
                <span class="text-warning"><b class="bi bi-star-fill"></b></span>
                <span class="text-warning"><b class="bi bi-star-fill"></b></span>
              </div>
            </div>
            
          </div>
        </div>
        <div class="card-footer border-0 bg-white">
            <div class="btn-container text-center mb-2">
              <button class="btn btn-product__card w-100 py-2 py-lg-1 px-4" id="${item.name}"><b class="bi bi-plus-lg me-1"></b>Add To Cart</button>
            </div>
        </div>
      </div>
      `;
    main.appendChild(productContainer);
  });

  //Creat paginatins

  let paginationCount = Math.ceil(products.length / productNumber);
  let counterWihle = 1;
  paginationContainer.innerHTML = "";
  if (products.length / productNumber > 1) {
    while (counterWihle <= paginationCount) {
      const paginationItem = document.createElement("span");
      paginationItem.classList.add("pagination-item");
      paginationItem.id = counterWihle;
      paginationItem.innerText = counterWihle;
      counterWihle++;
      paginationContainer.appendChild(paginationItem);

      if (paginationItem.innerText == pageNumber) {
        paginationItem.classList.add("active");
      }
    }
  }
  //Add To Cart Notis
  const btnAddToCart = document.querySelectorAll(".btn-product__card");
  btnAddToCart.forEach((item) => {
    item.addEventListener("click", addCart);
  });
}
displayProduct();

//This function is to chanhe the page number

function changePageNumber(event) {
  const id = event.target.id;
  if (id) {
    pageNumber = event.target.innerText;
    displayProduct();
  }
}

//Add to cart notis
const notis = document.querySelector(".notis-container");
let notisContainer = document.createElement("div");
notisContainer.classList.add("card-body");

function addCart(event) {
  notisContainer.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
  <p class="mb-0">"${event.target.id}"added to your cart <b class="bi bi-check-circle-fill ms-2"></b></p>
  <a href="#" class="d-d-inline-block text-primary fw-bold">Show Cart</a>
  </div>
  `;
  notis.appendChild(notisContainer);
  setTimeout(function () {
    notis.style.display = "none";
  }, 4000);
  notis.style.display = "flex";
}

paginationContainer.addEventListener("click", changePageNumber);
buttonFilter.addEventListener("click", applyFilter);
