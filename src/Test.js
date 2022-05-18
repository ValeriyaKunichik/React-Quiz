import React from "react";
import Question from "./Question";

export default function Test() {
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [checkAnswers, setCheckAnswers] = React.useState({});
  const [count, setCount] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const [newTry, setNewTry] = React.useState(0);
  let ret = [];

  function getAnswerArray(correct_answer, incorrect_answers) {
    let arr = incorrect_answers;
    arr.push(correct_answer);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let ret_arr = [];

    for (let i = 0; i < arr.length; i++) {
      ret_arr.push({
        id: i,
        answer: arr[i],
        isCorrect: arr[i] === correct_answer ? true : false,
        isHeld: false,
      });
    }
    return ret_arr;
  }

  const passData = (data) => {
    let new_obj = checkAnswers;
    new_obj[data.q_id] = data.correct;
    setCheckAnswers(new_obj);
  };

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => setAllQuestions(data.results));
  }, [newTry]);

  for (let i = 0; i < allQuestions.length; i++) {
    ret.push({
      id: i,
      question: allQuestions[i].question,
      answers: getAnswerArray(
        allQuestions[i].correct_answer,
        allQuestions[i].incorrect_answers
      ),
    });
  }

  const questions = ret.map((item) => {
    return (
      <Question key={item.id} item={item} passData={passData} show={show} />
    );
  });

  function countCorrectAnsws() {
    Object.values(checkAnswers).forEach((val) => {
      if (val === true) {
        setCount((old) => old + 1);
      }
    });
    setShow(true);
  }

  function newTest() {
    setShow(false);
    setAllQuestions([]);
    setCheckAnswers([]);
    setCount(0);
    ret = [];
    setNewTry((old) => old + 1);
  }

  return (
    <div className="test-page">
      {questions}
      {show ? (
        <div className="score-info">
          <div className="score">You scored {count}/5 correct answers</div>
          <button className="new-button" onClick={newTest}>
            Play again
          </button>
        </div>
      ) : (
        <button className="check-button" onClick={countCorrectAnsws}>
          Check answers
        </button>
      )}
    </div>
  );
}