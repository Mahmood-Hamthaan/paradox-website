// Moves selected items from input fields to the cart table and updates the grand total
function movecart() {
  const inputs = document.querySelectorAll('input[type="number"]'); // Get all quantity input fields
  const tbody = document.querySelector('#orderTable tbody'); // Get the table body of the order table
  tbody.innerHTML = ''; // Clear previous rows in the cart
  let grandTotal = 0; // Initialize grand total

  // Loop through each input field
  inputs.forEach(input => {
    const quantity = parseInt(input.value) || 0; // Get quantity, default to 0 if invalid
    const name = input.getAttribute('name'); // Get product name
    const price = parseFloat(input.getAttribute('data-price')) || 0; // Get product price, default to 0

    // Only add to cart if quantity is greater than 0
    if (quantity > 0) {
      const total = quantity * price; // Calculate total price for this item
      grandTotal += total; // Add to grand total

      // Create a new row with item details and a remove button
      const row = `
        <tr>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>$${price.toFixed(2)}</td>
          <td>$${total.toFixed(2)}</td>
          <td><button onclick="removeItem('${name}')">🗑</button></td>
        </tr>
      `;
      tbody.innerHTML += row; // Append the new row to the table
    }
  });

  // Update the grand total display
  document.getElementById('grandTotal').innerText = `${grandTotal.toFixed(2)}`;
}

// Removes an item from the cart by resetting its quantity and refreshing the cart
function removeItem(productName) {
  const input = document.querySelector(`input[name="${productName}"]`); // Find the input field for the product
  if (input) {
    input.value = 0; // Set its value to 0
    movecart(); // Refresh the cart
  }
}

// Saves the current cart with selected quantities as a favourite order using localStorage
function saveToFavourites() {
  const data = Array.from(document.querySelectorAll('input[type="number"]')) // Get all inputs
    .filter(input => parseInt(input.value) > 0) // Keep only those with quantity > 0
    .map(input => ({ name: input.name, value: input.value })); // Create an array of item name and quantity

  // Check if cart is empty
  if (data.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Save to localStorage
  localStorage.setItem('favouriteOrder', JSON.stringify(data));
  alert("Order saved as favourite!");
}

// Applies the previously saved favourite order from localStorage to the input fields
function applyFavourites() {
  const data = JSON.parse(localStorage.getItem('favouriteOrder')); // Get saved order from localStorage
  if (data) {
    data.forEach(item => {
      const input = document.querySelector(`input[name="${item.name}"]`);
      if (input) {
        input.value = item.value; // Set quantity based on saved value
      }
    });
    movecart(); // Refresh cart with applied favourites
  } else {
    alert("No favourite order found.");
  }
}

// Clears the saved favourite order from localStorage
function clearFavourites() {
  localStorage.removeItem('favouriteOrder'); // Remove saved order
  alert("Favourites cleared.");
}

// Finalizes the cart by saving current items to localStorage and redirects to checkout page
function buyNow() {
  const inputs = document.querySelectorAll('input[type="number"]');
  const cartData = [];

  // Loop through inputs and collect items with quantity > 0
  inputs.forEach(input => {
    const quantity = parseInt(input.value) || 0;
    if (quantity > 0) {
      const name = input.name;
      const price = parseFloat(input.getAttribute('data-price')) || 0;

      cartData.push({
        name,
        quantity,
        price
      });
    }
  });

  // If cart is empty, alert and stop
  if (cartData.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  // Save current cart to localStorage and navigate to checkout page
  localStorage.setItem('currentOrder', JSON.stringify(cartData));
  window.location.href = 'checkout.html';
}
