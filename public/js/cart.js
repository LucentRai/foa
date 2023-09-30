// Find out food name and price, store in menu[]
let menu = [];
const foods = document.querySelectorAll('.card-body');
if(foods){
	foods.forEach( el => {
		menu.push({
			name: el.querySelector('.card-title').innerHTML,
			price: el.querySelector('.d-flex').querySelector('small').querySelector('span').innerHTML
		});
	});
}

// Add to cart
const tbody = document.querySelector('tbody');
const addToCartBtns = document.querySelectorAll('.addToCartBtn');
addToCartBtns.forEach( (btn, i) => {
	btn.addEventListener('click', addToCartDom);
});

function addToCartDom(e) {

		const newTr = document.createElement('tr');
		const c1 = document.createElement('td');
		c1.textContent = '1';
		const c2 = document.createElement('td');
		c2.textContent = 'name';

		const c3 = document.createElement('td');

		// This ones for the quantity input
		const inputGroup = document.createElement('div');
		inputGroup.classList.add('input-group');
		inputGroup.style.width = '100px';

		const span1 = document.createElement('span');
		span1.classList.add('input-group-btn');

		const btnDec = document.createElement('button');
		btnDec.classList.add('btn', 'btn-seconday');
		btnDec.setAttribute('id', 'decrement');
		btnDec.textContent = '-';

		const inputQuantity = document.createElement('input');
		inputQuantity.classList.add('form-control');
		inputQuantity.setAttribute('type', 'text');
		inputQuantity.setAttribute('id', 'quantity');
		inputQuantity.setAttribute('name', 'quantity');
		inputQuantity.setAttribute('value', '1');

		const span2 = document.createElement('span');
		span2.classList.add('input-group-btn');

		const btnInc = document.createElement('button');
		btnInc.classList.add('btn', 'btn-seconday');
		btnInc.setAttribute('id', 'increment');
		btnInc.textContent = '+';
		
		span1.appendChild(btnDec);
		span2.appendChild(btnInc);
		inputGroup.appendChild(span1);
		inputGroup.appendChild(inputQuantity);
		inputGroup.appendChild(span2);
		c3.appendChild(inputGroup);

		const c4 = document.createElement('td');
		c4.textContent = '10000';
		newTr.appendChild(c1);
		newTr.appendChild(c2);
		newTr.appendChild(c3);
		newTr.appendChild(c4);
		tbody.appendChild(newTr);

		quantitySlider();
}

function quantitySlider() {
	
// Get references to the input field and buttons
const quantityInput = document.getElementById('quantity');
const decrementButton = document.getElementById('decrement');
const incrementButton = document.getElementById('increment');

// Add click event listeners to the buttons
decrementButton.addEventListener('click', () => {
		// Decrease the quantity when the decrement button is clicked
		updateQuantity(-1);
});

incrementButton.addEventListener('click', () => {
		// Increase the quantity when the increment button is clicked
		updateQuantity(1);
});

// Function to update the quantity value
function updateQuantity(change) {
		// Get the current quantity value and convert it to a number
		let currentValue = parseInt(quantityInput.value);

		// Ensure the quantity is at least 1
		currentValue = Math.max(currentValue + change, 1);

		// Update the input field with the new quantity value
		quantityInput.value = currentValue;
}

const cartItem = document.querySelector('#cartNum');

if(cartItem.innerHTML === ''){
	cartItem.style.display = "none";
	localStorage.setItem('cartItems', 0);
}
}