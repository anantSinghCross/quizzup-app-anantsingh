"use client";
import Button from "@/app/components/Button";
import Checkbox from "@/app/components/Checkbox";
import { MainContext } from "@/app/context/context";
import { saveAndGetNextQuestion } from "@/app/server-actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const QuizPage = () => {
  const router = useRouter();
  const { question, setQuestion, setResult, totalQuestions } = useContext(MainContext);
  const [answers, setAnswers] = useState([]); /* [1, 2, 3] */
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  console.log(question);

  // Clear the answers when the question changes
  // set the timer and reset on question change
  useEffect(() => {
    setAnswers([]);
    const intervalId = setInterval(() => {
      setSeconds(p => p+1)
    }, 1000);
    return () => {
      setSeconds(0);
      clearInterval(intervalId);
    }
  }, [question]);

  const handleOnClick = async () => {
    setLoading(true);
    const response = await saveAndGetNextQuestion({no: question.no, answers, seconds});
    if (response.score !== undefined) {
      // it is a result
      setResult(response);
      router.replace("/result");
    } else {
      // else it is a question
      setQuestion(response.question);
    }
    setLoading(false);
  };

  const handleAnswerClick = (answerIndex) => {
    setAnswers((p) => {
      let updatedAnswers = [];
      if (p.includes(answerIndex)) {
        updatedAnswers = p.filter((item) => item !== answerIndex);
      } else {
        updatedAnswers = [...p];
        updatedAnswers.push(answerIndex);
      }
      console.log(updatedAnswers);
      return updatedAnswers;
    });
  };

  return (
    <div className="flex h-screen w-full max-w-sm flex-col items-center justify-end bg-violet-300">
      <div className="relative bg-white pt-10 p-5 rounded-t-3xl w-full">
        <div className="absolute flex items-baseline top-0 -translate-y-1/2 left-7 p-4 px-5 bg-white rounded-full text-xl font-semibold">
          <p className=" font-bold text-3xl">{question.no+1}</p><p className=" text-base text-slate-400">/{totalQuestions}</p>
        </div>
        <div className="absolute top-0 -translate-y-1/2 right-7 p-2 bg-white rounded-full text-xs text-slate-500 font-semibold">
          Time: {seconds}s
        </div>
        <p className=" font-bold text-lg mb-3">{question.question}</p>
        <div className="flex justify-center">
          {question.image && (
            <Image
              src={question.image}
              width={500}
              height={500}
              style={{ width: "60%", height: "auto" }}
            />
          )}
        </div>
        <div className="flex flex-col gap-2 py-2">
          {question?.choices?.map((item, index) => (
            <Checkbox
              key={item}
              label={item}
              checked={answers.includes(index)}
              onChange={() => handleAnswerClick(index)}
            />
          ))}
        </div>
      </div>
      <Button
        disabled={answers.length === 0}
        extraClasses="bg-white"
        onClick={handleOnClick}
        loadingText="Saving..."
        loading={loading}
      >
        Next
      </Button>
    </div>
  );
};

export default QuizPage;
