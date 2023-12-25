let products = [
    { id: 1, name: 'Laptop - Model X', category: 'Electronics', price: 1200 },
    { id: 2, name: 'Smartphone - Model Y', category: 'Electronics', price: 800 },
    { id: 3, name: 'Wireless Headphones', category: 'Electronics', price: 120 },
    { id: 4, name: 'Digital Camera', category: 'Electronics', price: 500 },
    { id: 5, name: 'Fitness Tracker', category: 'Electronics', price: 80 },
    
    { id: 6, name: 'Leather Jacket', category: 'Fashion', price: 150 },
    { id: 7, name: 'Running Shoes', category: 'Fashion', price: 80 },
    { id: 8, name: 'Designer Sunglasses', category: 'Fashion', price: 100 },
    { id: 9, name: 'Men\'s Watch', category: 'Fashion', price: 200 },
    { id: 10, name: 'Handbag', category: 'Fashion', price: 120 },
    
    { id: 11, name: 'Coffee Maker', category: 'Home & Kitchen', price: 50 },
    { id: 12, name: 'Blender', category: 'Home & Kitchen', price: 40 },
    { id: 13, name: 'Robot Vacuum Cleaner', category: 'Home & Kitchen', price: 250 },
    { id: 14, name: 'Cookware Set', category: 'Home & Kitchen', price: 120 },
    { id: 15, name: 'Bedding Set', category: 'Home & Kitchen', price: 80 },
    
    { id: 16, name: 'Adventure Backpack', category: 'Outdoor', price: 70 },
    { id: 17, name: 'Camping Tent', category: 'Outdoor', price: 120 },
    { id: 18, name: 'Hiking Boots', category: 'Outdoor', price: 90 },
    { id: 19, name: 'Portable Grill', category: 'Outdoor', price: 60 },
    { id: 20, name: 'Binoculars', category: 'Outdoor', price: 100 },
    
    { id: 21, name: 'Novel - Mystery Thriller', category: 'Books', price: 15 },
    { id: 22, name: 'Cookbook - Healthy Recipes', category: 'Books', price: 20 },
    { id: 23, name: 'Self-Help Book', category: 'Books', price: 18 },
    { id: 24, name: 'Science Fiction Novel', category: 'Books', price: 12 },
    { id: 25, name: 'Educational Children\'s Book', category: 'Books', price: 10 },
    
    { id: 26, name: 'Desktop Monitor', category: 'Electronics', price: 250 },
    { id: 27, name: 'Gaming Console', category: 'Electronics', price: 400 },
    { id: 28, name: 'Portable Speaker', category: 'Electronics', price: 80 },
    { id: 29, name: 'Wireless Mouse', category: 'Electronics', price: 30 },
    { id: 30, name: 'External Hard Drive', category: 'Electronics', price: 70 },
    
    { id: 31, name: 'Dress - Evening Gown', category: 'Fashion', price: 180 },
    { id: 32, name: 'Men\'s Suit', category: 'Fashion', price: 250 },
    { id: 33, name: 'Running Shorts', category: 'Fashion', price: 25 },
    { id: 34, name: 'Winter Scarf', category: 'Fashion', price: 30 },
    { id: 35, name: 'Athletic Socks', category: 'Fashion', price: 10 },
    
    { id: 36, name: 'Air Purifier', category: 'Home & Kitchen', price: 120 },
    { id: 37, name: 'Robotic Lawn Mower', category: 'Home & Kitchen', price: 300 },
    { id: 38, name: 'Smart Thermostat', category: 'Home & Kitchen', price: 80 },
    { id: 39, name: 'Juicer', category: 'Home & Kitchen', price: 60 },
    { id: 40, name: 'Digital Bathroom Scale', category: 'Home & Kitchen', price: 35 },
    
    { id: 41, name: 'Camping Backpack', category: 'Outdoor', price: 100 },
    { id: 42, name: 'Portable Hammock', category: 'Outdoor', price: 40 },
    { id: 43, name: 'Water Bottle - Insulated', category: 'Outdoor', price: 20 },
    { id: 44, name: 'Pocket Knife', category: 'Outdoor', price: 15 },
    { id: 45, name: 'Camping Lantern', category: 'Outdoor', price: 25 },
    
    { id: 46, name: 'Classic Novel Collection', category: 'Books', price: 50 },
    { id: 47, name: 'Biography - Famous Personality', category: 'Books', price: 30 },
    { id: 48, name: 'Children\'s Picture Book Set', category: 'Books', price: 25 },
    { id: 49, name: 'Mystery Detective Series', category: 'Books', price: 45 },
    { id: 50, name: 'Educational Puzzle Book', category: 'Books', price: 15 },
];

let selectedProduct = null;
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').addEventListener('input', searchProducts);
    document.getElementById('selectProductBtn').addEventListener('click', selectSearchedProduct);
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    document.getElementById('reviewCartBtn').addEventListener('click', reviewCart);
    document.getElementById('category').addEventListener('change', searchProducts);
    document.getElementById('loginBtn').addEventListener('click', login);
    document.getElementById('registerBtn').addEventListener('click', register);
    document.getElementById('guestLoginBtn').addEventListener('click', guestLogin);
});

function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedCategory = document.getElementById('category').value.toLowerCase();

    let suggestedProducts = [];

    const matchingProducts = products.filter(product => 
        (searchTerm === '' || product.name.toLowerCase().includes(searchTerm)) && 
        (selectedCategory === '' || product.category.toLowerCase() === selectedCategory)
    );

    if (matchingProducts.length > 0) {
        suggestedProducts = matchingProducts.sort((a, b) => a.price - b.price);
    } else if (selectedCategory) {
        
        suggestedProducts = products.filter(product => product.category.toLowerCase() === selectedCategory);
    }

    displaySuggestedProducts(suggestedProducts);
}

function displaySuggestedProducts(suggestedProducts) {
    const suggestionDiv = document.getElementById('suggestion');
    const suggestedProductsList = document.getElementById('suggestedProducts');
    suggestedProductsList.innerHTML = '';

    suggestedProducts.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price}`;
        listItem.onclick = () => selectProduct(product);

        
        const betterDeal = findBetterDeal(product);
        if (betterDeal) {
            listItem.innerHTML += ` <span style="color: green;">Better Deal: ${betterDeal.name} - $${betterDeal.price}</span>`;
        }

        suggestedProductsList.appendChild(listItem);
    });

    suggestionDiv.style.display = suggestedProducts.length > 0 ? 'block' : 'none';
}


function findBetterDeal(product) {
    const categoryProducts = products.filter(
        p =>
            p.category.toLowerCase() === product.category.toLowerCase() &&
            p.id !== product.id &&
            p.price < product.price
    );

    return categoryProducts.length > 0 ? categoryProducts[0] : null;
}

function selectSearchedProduct() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedCategory = document.getElementById('category').value.toLowerCase();

    const matchingProducts = products.filter(product => 
        (searchTerm === '' || product.name.toLowerCase().includes(searchTerm)) && 
        (selectedCategory === '' || product.category.toLowerCase().includes(selectedCategory))
    );

    if (matchingProducts.length > 0) {
        displaySuggestedProducts(matchingProducts);
    } else {
        
        const categoryProducts = products.filter(product => 
            selectedCategory === '' || product.category.toLowerCase().includes(selectedCategory)
        );

        displaySuggestedProducts(categoryProducts);
    }
}

function selectProduct(product) {
    selectedProduct = { ...product, quantity: 1, size: 'medium' };
    document.getElementById('selectedProduct').textContent = `${selectedProduct.name} - $${selectedProduct.price}`;
    document.getElementById('suggestion').style.display = 'none';
}

function addToCart() {
    if (selectedProduct) {
        selectedProduct.quantity = parseInt(document.getElementById('quantity').value);
        selectedProduct.size = document.getElementById('size').value;
        cart.push(selectedProduct);
        alert(`${selectedProduct.name} added to cart!`);
    } else {
        alert('No product selected!');
    }
}

function reviewCart() {
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Quantity: ${item.quantity}, Size: ${item.size}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteFromCart(index);

        listItem.appendChild(deleteButton);
        cartItemsList.appendChild(listItem);
    });
}

function deleteFromCart(index) {
    cart.splice(index, 1);
    reviewCart();
}

function placeOrder() {
    if (cart.length > 0) {
        const orderTotal = calculateOrderTotal(); 
        window.location.href = `payment.html?total=${orderTotal}`;
    } else {
        alert('Your cart is empty. Add items before placing an order.');
    }
}

function calculateOrderTotal() {
   
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful!');
                
            } else {
                alert('Login failed. ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                
            } else {
                alert('Registration failed. ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username && password) {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Login successful!');
                    showMainContent();
                } else {
                    alert('Login failed. ' + data.message);
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        guestLogin();
    }
}


function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                showMainContent();
            } else {
                alert('Registration failed. ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function guestLogin() {
    alert('Guest login successful!');
    showMainContent();
}

function showMainContent() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}