"use client";
import Button from "@/app/components/Button";
import Checkbox from "@/app/components/Checkbox";
import { MainContext } from "@/app/context/context";
import { saveAndGetNextQuestion } from "@/app/server-actions";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const QuizPage = () => {
  const router = useRouter();
  const { question, setQuestion, setResult } = useContext(MainContext);
  const [answers, setAnswers] = useState([]); /* [1, 2, 3] */
  const [loading, setLoading] = useState(false);
  console.log(question);

  // Clear the answers when the question changes
  useEffect(() => {
    setAnswers([]);
  }, [question]);

  const handleOnClick = async () => {
    setLoading(true);
    const response = await saveAndGetNextQuestion(question.no, answers);
    if (response.score !== undefined) {
      // it is a result
      setResult(response);
      router.replace("/result");
    } else {
      // else it is a question
      setQuestion(response);
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
      <div className="bg-white pt-10 p-5 rounded-t-3xl w-full">
        <p className=" font-bold text-lg mb-3">{question.question}</p>
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
