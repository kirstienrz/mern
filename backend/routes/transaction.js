// backend/routes/transaction.js
const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/sendEmail');
const Transaction = require('../models/Transaction'); // Your transaction model

router.post('/update', async (req, res) => {
  try {
    const { orderId, updatedDetails, email } = req.body;

    // Update the transaction in the database
    const transaction = await Transaction.findByIdAndUpdate(orderId, updatedDetails, { new: true });

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found.' });
    }

    // Trigger email
    const emailContent = `
      <h3>Updated Transaction Details</h3>
      <p>Here are the updated details for your order:</p>
      <ul>
        ${updatedDetails.products
          .map(
            (product) =>
              `<li>${product.name} - ${product.quantity} x ${product.price} = ${product.quantity * product.price}</li>`
          )
          .join('')}
      </ul>
      <p><strong>Subtotal:</strong> ${updatedDetails.subtotal}</p>
      <p><strong>Grand Total:</strong> ${updatedDetails.grandTotal}</p>
    `;

    await sendEmail(email, 'Your Order Has Been Updated', emailContent);

    return res.status(200).json({ success: true, message: 'Transaction updated and email sent!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
