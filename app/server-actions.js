"use server";

import { wait } from "./utils";

export const getQuestion = async (questionNumber) => {
  const res = await fetch(`http://localhost:3000/api/question?no=${questionNumber}`);
  const data = await res.json();
  return data;
};

export const saveAndGetNextQuestion = async (no, answers) => {
  const res = await fetch(`http://localhost:3000/api/question?no=${no}`, {
    method: `POST`,
    body: JSON.stringify({ no, answers }),
  });
  const resData = await res.json();
  if (resData.success) {
    return await getQuestion(resData.no + 1);
  } else {
    return null;
  }
};
