import React from "react";

interface RoundButtonProps {
  children: any;
  onClick: () => void;
  className?: string;
}

const RoundButton = (props: RoundButtonProps) => {
  return (
    <div className={"round-button " + props.className} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default RoundButton;
