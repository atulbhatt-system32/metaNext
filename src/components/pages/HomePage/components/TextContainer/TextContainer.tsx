import React from "react";

interface TextContainerProps {
  title: string;
  children?: React.ReactNode;
}

const TextContainer = ({ title, children }: TextContainerProps) => {
  return (
    <div className="text-container">
      <p className="text-container-title">{title}</p>
      <div className="content-container text-container-content">{children}</div>
    </div>
  );
};

export default TextContainer;
