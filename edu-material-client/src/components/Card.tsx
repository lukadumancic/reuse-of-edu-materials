import React from "react";

interface CardProps {
  title: string;
  date?: Date;
  onClick: () => void;
}

const Card = (props: CardProps) => {
  return (
    <div className="card" onClick={props.onClick}>
      <div>
        <span>{props.title}</span>
        <span>{props.date && props.date.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Card;
