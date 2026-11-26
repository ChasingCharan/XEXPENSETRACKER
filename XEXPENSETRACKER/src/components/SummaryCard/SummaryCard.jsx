import React from "react";
import "./SummaryCard.css";

const SummaryCard = ({
  title,
  amount,
  amountColor,
  buttonText,
  buttonColor,
  onButtonClick,
}) => {
  return (
    <div className="summary-card">
      <p className="summary-card-title">
        {title}:{" "}
        <span style={{ color: amountColor }}>
          ₹{amount}
        </span>
      </p>

      <button
        className="summary-card-button"
        style={{ background: buttonColor }}
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SummaryCard;