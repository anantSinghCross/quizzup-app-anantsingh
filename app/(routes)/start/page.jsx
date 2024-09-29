'use client'
import Button from "@/app/components/Button";
import { MainContext } from "@/app/context/context";
import { getQuestion } from "@/app/server-actions";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useActionState } from "react-dom";
import { unstable_noStore as noStore } from 'next/cache';

const StartPage = () => {
  noStore();
  const router = useRouter()
  const { setQuestion, setTotalQuestions } = useContext(MainContext);
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async () => {
    setLoading(true);
    const {question, totalQuestions} = await getQuestion(0); // Quiz will always start from 0th question
    setQuestion(question);
    setTotalQuestions(totalQuestions);
    router.replace('/quiz');
  }

  return (
    <div className="flex h-screen w-full max-w-sm flex-col items-center justify-between bg-gradient-to-t from-violet-300 to-white">
      <div className="m-5 text-2xl font-semibold">upraised</div>
      <div className="relative rounded-full bg-white h-44 w-44 text-3xl shadow-lg font-extrabold text-rose-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Quiz</div>
      </div>
      <Button loading={loading} onClick={handleStartQuiz} loadingText="Starting...">Start</Button>
    </div>
  );
};

export default StartPage;
