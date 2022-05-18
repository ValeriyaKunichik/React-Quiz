import React from "react";
import Answers from "./Answers";

export default function Question(props) {
  const [answers, setAnswers] = React.useState(props.item.answers);
  const [aswInfo, setAswInfo] = React.useState({
    q_id: props.item.id,
    correct: false,
  });

  React.useEffect(() => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].isCorrect && answers[i].isHeld) {
        return setAswInfo((prev) => ({
          ...prev,
          correct: true,
        }));
      }
    }
    return setAswInfo((prev) => ({
      ...prev,
      correct: false,
    }));
  }, [answers]);

  const { passData } = props; //destructuring

  React.useEffect(() => {
    //passing data from child to parent component
    passData(aswInfo);
  }, [aswInfo, passData]);

  function holdAnswer(id) {
    setAnswers((oldAnswer) =>
      oldAnswer.map((answ) => {
        return answ.id === id
          ? { ...answ, isHeld: !answ.isHeld }
          : { ...answ, isHeld: false };
      })
    );
  }

  const answerElements = answers.map((answer) => (
    <Answers
      key={answer.id}
      value={answer.answer}
      isHeld={answer.isHeld}
      holdAnswer={() => holdAnswer(answer.id)}
      show={props.show}
      isCorrect={answer.isCorrect}
    />
  ));

  return (
    <div className="question-container">
      <p key={props.key} className="question-text">
        {props.item.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
      </p>
      <div className="answers">{answerElements}</div>
    </div>
  );
}