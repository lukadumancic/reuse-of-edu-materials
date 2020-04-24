import React from "react";
import RoundButton from "./RoundButton";

interface CardProps {
  title: string;
  date?: Date;
  onClick: () => void;
  deleteClick?: (e: any) => void;
}

const Card = (props: CardProps) => {
  return (
    <div className="card" onClick={props.onClick}>
      {props.deleteClick && (
        <RoundButton
          className="tool-button"
          onClick={props.deleteClick}
        >
          x
        </RoundButton>
      )}
      <div>
        <span>{props.title}</span>
        <span>
          {props.date && new Date(props.date).toLocaleDateString("hr")}
        </span>
      </div>
    </div>
  );
};

export default Card;
