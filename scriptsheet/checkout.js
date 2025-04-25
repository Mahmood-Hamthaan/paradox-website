// Loads the cart data from localStorage and displays it in the table
function loadCart() {
  const cartData = JSON.parse(localStorage.getItem('currentOrder')) || []; // Get saved cart or default to empty array
  const tbody = document.querySelector('#orderTable tbody'); // Select the cart table body
  let grandTotal = 0; // Initialize grand total

  tbody.innerHTML = ''; // Clear previous cart rows

  // Loop through each item in the cart
  cartData.forEach(item => {
    const total = item.quantity * item.price; // Calculate total price for the item
    grandTotal += total; // Add to grand total

    // Create a table row for the item
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${total.toFixed(2)}</td>
      </tr>
    `;
    tbody.innerHTML += row; // Add the row to the table body
  });

  // Display the grand total
  document.getElementById('grandTotal').innerText = `${grandTotal.toFixed(2)}`;
}

// Validates the payment form and shows a thank-you message on success
function submitPayment() {
  // Get form values and remove extra spaces
  const fullname = document.getElementById('fullname').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const cardNumber = document.getElementById('card-number').value.trim();
  const expiry = document.getElementById('expiry-date').value.trim();
  const cvv = document.getElementById('cvv').value.trim();

  // Validate full name (at least 2 letters)
  if (!/^[A-Za-z\s]{2,}$/.test(fullname)) {
    alert("Enter a valid name.");
    return;
  }

  // Validate address (at least 5 characters)
  if (address.length < 5) {
    alert("Enter a valid address.");
    return;
  }

  // Validate phone number (exactly 10 digits)
  if (!/^\d{10}$/.test(phone)) {
    alert("Enter a 10-digit phone number.");
    return;
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Enter a valid email address.");
    return;
  }

  // Validate card number (16 digits)
  if (!/^\d{16}$/.test(cardNumber)) {
    alert("Enter a 16-digit card number.");
    return;
  }

  // Validate expiry date format (MM/YY)
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    alert("Enter expiry in MM/YY format.");
    return;
  }

  // Validate CVV (3 digits)
  if (!/^\d{3}$/.test(cvv)) {
    alert("Enter a 3-digit CVV.");
    return;
  }

  // If all fields are valid, hide the form and show the thank-you message
  document.getElementById('checkoutForm').classList.add('hidden');
  document.getElementById('thankYouMessage').classList.remove('hidden');

  // Calculate and display the delivery date (7 days from now)
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 7);
  document.getElementById('deliveryDateOutput').innerText = delivery.toDateString();
}

// Load the cart automatically when the page loads
window.onload = () => {
  loadCart();
};
