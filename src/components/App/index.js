import React, { useEffect, useState } from "react";

import Layout from "../Layout";
import Loader from "../Loader";
import Main from "../Main";
import Quiz from "../Quiz";
import Result from "../Result";

import { shuffle } from "../../utils";
import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";

const initData = [
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Video Games",
    question:
      "What is the protagonist&#039;s title given by the demons in DOOM (2016)?",
    correct_answer: "Doom Slayer",
    incorrect_answers: ["Doom Guy", "Doom Marine", "Doom Reaper"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Entertainment: Film",
    question: "What was the first monster to appear alongside Godzilla?",
    correct_answer: "Anguirus",
    incorrect_answers: ["King Kong", "Mothra", "King Ghidora"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Sports",
    question: "How many points did LeBron James score in his first NBA game?",
    correct_answer: "25",
    incorrect_answers: ["19", "69", "41"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Geography",
    question: "What is the official language of Costa Rica?",
    correct_answer: "Spanish",
    incorrect_answers: ["English", "Portuguese", "Creole"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Geography",
    question: "What is the capital of Denmark?",
    correct_answer: "Copenhagen",
    incorrect_answers: ["Aarhus", "Odense", "Aalborg"],
  },
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 120,
    seconds: 0,
  });
  const [isQuizStarted, setIsQuizStarted] = useState(true);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  const startQuiz = (data, countdownTime) => {
    setLoading(true);
    setLoadingMessage({
      title: "Loading your quiz...",
      message: "It won't be long!",
    });
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(data);
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = (resultData) => {
    setLoading(true);
    setLoadingMessage({
      title: "Fetching your results...",
      message: "Just a moment!",
    });

    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
      setLoading(false);
    }, 2000);
  };

  const replayQuiz = () => {
    setLoading(true);
    setLoadingMessage({
      title: "Getting ready for round two.",
      message: "It won't take long!",
    });

    const shuffledData = shuffle(data);
    shuffledData.forEach((element) => {
      element.options = shuffle(element.options);
    });

    setData(shuffledData);

    setTimeout(() => {
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  const resetQuiz = () => {
    setLoading(true);
    setLoadingMessage({
      title: "Loading the home screen.",
      message: "Thank you for playing!",
    });

    setTimeout(() => {
      // setData(null);
      setCountdownTime(null);
      setIsQuizStarted(false);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const results = [...initData];
    initData.forEach((element) => {
      element.options = shuffle([
        element.correct_answer,
        ...element.incorrect_answers,
      ]);
    });

    setLoading(false);
    startQuiz(
      results,
      countdownTime.hours + countdownTime.minutes + countdownTime.seconds
    );
  }, []);

  return (
    <Layout>
      {loading && <Loader {...loadingMessage} />}
      {/* {!loading && !isQuizStarted && !isQuizCompleted && (
        <Main startQuiz={startQuiz} />
      )} */}
      {data && !isQuizCompleted && (
        <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz} />
      )}
      {!loading && isQuizCompleted && (
        <Result {...resultData} replayQuiz={replayQuiz} resetQuiz={resetQuiz} />
      )}
    </Layout>
  );
};

export default App;
