// Scroll animation or any interactivity can go here
console.log("Portfolio site loaded.");

// --- To-Do List Functionality ---
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const todoEmpty = document.getElementById('todo-empty');

function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodos();
  todoList.innerHTML = '';
  if (todos.length === 0) {
    todoEmpty.style.display = 'block';
  } else {
    todoEmpty.style.display = 'none';
  }
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo;
    const delBtn = document.createElement('button');
    delBtn.title = 'Delete';
    delBtn.innerHTML = '🗑️';
    delBtn.onclick = () => {
      todos.splice(idx, 1);
      saveTodos(todos);
      renderTodos();
    };
    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

addTodoBtn.onclick = () => {
  const value = todoInput.value.trim();
  if (value) {
    const todos = getTodos();
    todos.push(value);
    saveTodos(todos);
    todoInput.value = '';
    renderTodos();
  }
};

todoInput.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') addTodoBtn.click();
});

document.addEventListener('DOMContentLoaded', renderTodos);

// --- Product Listing Functionality ---
const products = [
  { name: 'Smartphone', category: 'electronics', price: 299, rating: 4.5, img: '📱' },
  { name: 'Laptop', category: 'electronics', price: 899, rating: 4.7, img: '💻' },
  { name: 'Novel', category: 'books', price: 15, rating: 4.2, img: '📖' },
  { name: 'T-Shirt', category: 'clothing', price: 20, rating: 4.0, img: '👕' },
  { name: 'Headphones', category: 'electronics', price: 99, rating: 4.3, img: '🎧' },
  { name: 'Jeans', category: 'clothing', price: 40, rating: 4.1, img: '👖' },
  { name: 'Textbook', category: 'books', price: 60, rating: 4.8, img: '📚' },
];

const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');
const productList = document.getElementById('product-list');
const productEmpty = document.getElementById('product-empty');

function renderProducts() {
  let filtered = [...products];
  const category = categoryFilter.value;
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  switch (sortBy.value) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }
  productList.innerHTML = '';
  if (filtered.length === 0) {
    productEmpty.style.display = 'block';
  } else {
    productEmpty.style.display = 'none';
  }
  filtered.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `<div class="product-img">${product.img}</div><strong>${product.name}</strong><br>Category: ${product.category}<br>Price: $${product.price}<br>Rating: ${product.rating}`;
    productList.appendChild(div);
  });
}

categoryFilter.onchange = renderProducts;
sortBy.onchange = renderProducts;
document.addEventListener('DOMContentLoaded', renderProducts);

// --- Smooth scroll for nav links ---
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
