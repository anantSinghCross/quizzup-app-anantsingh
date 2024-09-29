"use client";
import Button from "@/app/components/Button";
import ProgressBar from "@/app/components/ProgressBar";
import ScoreCard from "@/app/components/ScoreCard";
import { MainContext } from "@/app/context/context";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { unstable_noStore as noStore } from 'next/cache';

const ResultPage = () => {
  noStore();
  const router = useRouter();
  const {result} = useContext(MainContext);
  return (
    <div className="flex h-screen w-full max-w-sm flex-col items-center justify-end bg-violet-300">
      <div className="bg-white pt-10 p-5 rounded-t-3xl w-full">
        <p className=" font-bold text-2xl mb-3 text-center">Your Result</p>
        <div className="flex flex-col gap-4">
          <ProgressBar percentage={result.percentage}/>
            <ScoreCard score={result.score} isCorrect={true}/>
            <ScoreCard score={result.totalQuestions - result.score}/>
          <div className="flex p-4 items-center border gap-2 rounded-lg">
            <p className="text-xl">⏱️</p>
            <p>
              <span className="font-bold text-lg">{result.totalSecondsTaken} seconds </span>spent in total
            </p>
          </div>
        </div>
      </div>
      <Button
        extraClasses="bg-white"
        onClick={() => {
          router.replace("/start");
        }}
      >
        Begin Again
      </Button>
    </div>
  );
};

export default ResultPage;
