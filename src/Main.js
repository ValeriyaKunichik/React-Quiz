import React from "react";
import Test from "./Test";

export default function Main() {
  const [mainPage, setMainPage] = React.useState(true);
  return (
    <div>
      {mainPage && (
        <div className="main-page">
          <h1 className="main-title">General Knowledge Quiz</h1>
          <p className="main-text">Are you ready?</p>
          <button
            className="main-button"
            onClick={() => {
              setMainPage(false);
            }}
          >
            Start quiz
          </button>
        </div>
      )}
      {mainPage === false && <Test />}
    </div>
  );
}