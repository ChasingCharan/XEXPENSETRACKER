
import React, { useState } from "react";
import "./AddExpenseModal.css";

const AddExpenseModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        date: "",
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

        const newExpense = {
            id: Date.now(),
            name: formData.title,
            amount: Number(formData.price),
            category: formData.category,
            date: formData.date,
        };

        onAdd(newExpense);
        onClose();
    };

    return (
        <div className="expense-modal-overlay" onClick={onClose}>
            <div className="expense-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Add Expenses</h2>

                <form onSubmit={handleSubmit}>
                    <div className="modal-row">
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

                    <div className="modal-row">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
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

                    <div className="modal-actions">
                        <button type="submit" className="add-expense-btn">
                            Add Expense
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
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

export default AddExpenseModal;
