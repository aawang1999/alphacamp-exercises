// ======= default data =======
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const button = document.querySelector("#submit-button");

// 菜單資料
let productData = [
  {
    id: "product-1",
    imgUrl:
      "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "馬卡龍",
    price: 90
  },
  {
    id: "product-2",
    imgUrl:
      "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "草莓",
    price: 60
  },
  {
    id: "product-3",
    imgUrl:
      "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "奶茶",
    price: 100
  },
  {
    id: "product-4",
    imgUrl:
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "冰咖啡",
    price: 180
  }
];
// ======= 請從這裡開始 =======
let total = 0
cart.innerHTML = ''

// fills in item cards
const cards = document.querySelectorAll('.card')
cards.forEach((card, i) => {
  card.querySelector('.card-title').innerText = productData[i].name
  card.querySelector('.card-text').innerText = productData[i].price
  card.querySelector('.card-img-top').src = productData[i].imgUrl
})

// initializes item amounts to 0
productData.forEach(product => {
  product.count = 0
})

// add order by incrementing the item count
function addOrder(e) {
  const card = e.target.parentElement.parentElement.parentElement
  const itemIndex = [...card.parentElement.children].indexOf(card)
  productData[itemIndex].count++
  updateCart()
}

// updates the order list
function updateCart() {
  total = 0
  cart.innerHTML = ''
  productData.forEach(product => {
    if (product.count !== 0) {
      const item = document.createElement('li')
      item.className = 'list-group-item'
      item.innerHTML = `${product.name} X ${product.count}`
      total += product.price * product.count
      cart.appendChild(item)
    }
  })
  totalAmount.innerHTML = total
}

// shows the receipt
function showReceipt() {
  let receipt = ''
  if (total === 0) {
    receipt = '購物車內沒有餐點'
  } else {
    receipt = `感謝購買\n總金額：${total}`
  }
  alert(receipt)
  resetCart()
}

// resets everything
function resetCart() {
  total = 0
  cart.innerHTML = ''
  totalAmount.innerHTML = '--'
  productData.forEach(product => {
    product.count = 0
  })
}

// detects adding items to cart
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    addOrder(e)
  }
})

// detects order confirmations
button.addEventListener('click', showReceipt)