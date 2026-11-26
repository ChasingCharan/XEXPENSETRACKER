import React, { useState } from "react";
import "./EditExpenseModal.css";

const EditExpenseModal = ({ expense, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: expense.name || expense.title || "",
    price: expense.amount ?? expense.price ?? "",
    category: expense.category || "",
    date: expense.date || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...expense,
      title: formData.title,
      price: Number(formData.price),
      category: formData.category,
      date: formData.date,
    });

    onClose();
  };

  return (
    <div className="edit-expense-overlay" onClick={onClose}>
      <div
        className="edit-expense-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Edit Expense</h2>

        <form onSubmit={handleSubmit}>
          <div className="edit-modal-row">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="edit-modal-row">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-modal-actions">
            <button type="submit" className="save-expense-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="edit-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;