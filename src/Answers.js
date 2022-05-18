import React from "react";

export default function Answers(props) {
  const styles = props.show
    ? {
        backgroundColor: props.isHeld
          ? props.isCorrect
            ? "#59E391"
            : "#F8BCBC"
          : props.isCorrect
          ? "#59E391"
          : "#D6DBF5",
      }
    : {
        backgroundColor: props.isHeld ? "#59E391" : "#D6DBF5",
      };
  return (
    <div
      key={props.key}
      className="answer"
      style={styles}
      onClick={props.holdAnswer}
    >
      {props.value
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&")}
    </div>
  );
}