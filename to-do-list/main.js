// 初始變數
let myTodo = document.querySelector('#my-todo')
let addBtn = document.querySelector('#addBtn')
let input = document.querySelector('#newTodo')
let myCompleted = document.querySelector('#my-completed')
let box = document.querySelector('#box')

// 資料
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}

// 函式
function validateItem(text) {
  const item = input.value
  input.value = ''
  if (item.replace(/\s/g, '').length === 0) {
    input.placeholder = 'please enter a task'
  } else {
    addItem(item)
    input.placeholder = 'add item'
  }
  /*
  if(item) {
    addItem(item)
    input.value = ''
    input.placeholder = 'add item'
  } else {
    input.placeholder = 'please enter a task'
  }
  */
}

function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  myTodo.appendChild(newItem)
}

// Event Listeners
addBtn.addEventListener('click', validateItem)

input.addEventListener('keypress', event => {
  if (event.keyCode === 13) validateItem()
})

box.addEventListener('click', function (event) {
  const target = event.target
  const parent = target.parentElement
  if (target.classList.contains('delete')) {
    parent.remove()
  } else if (target.tagName === 'LABEL') {
    target.classList.toggle('checked')
    const item = document.createElement('li')
    item.innerHTML = parent.innerHTML
    parent.remove()
    if (target.classList.contains('checked')) {
      myCompleted.appendChild(item)
    } else {
      myTodo.appendChild(item)
    }
  }
})
