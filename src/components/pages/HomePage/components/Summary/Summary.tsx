import React from "react";

interface SummaryItem {
  text: string;
  references: [number, number][];
}

interface SummaryProps {
  items: SummaryItem[];
  hoveredIndex: number | null;
  onSummaryItemHover: (index: number | null) => void;
  onSummaryItemClick: (references: [number, number][]) => void;
}

const Summary = ({
  items,
  hoveredIndex,
  onSummaryItemHover,
  onSummaryItemClick,
}: SummaryProps) => {
  return (
    <div className="summary-container">
      {items.map((item, index) => (
        <span
          key={index}
          className={`summary-item ${hoveredIndex === index ? "hovered" : ""}`}
          onMouseEnter={() => onSummaryItemHover(index)}
          onMouseLeave={() => onSummaryItemHover(null)}
          onClick={() => onSummaryItemClick(item.references)}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default Summary;
