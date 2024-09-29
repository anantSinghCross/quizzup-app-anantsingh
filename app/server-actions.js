"use server";

export const getQuestion = async (questionNumber) => {
  const res = await fetch(`${process.env.HOST_NAME}/api/question?no=${questionNumber}`);
  const data = await res.json();
  return data;
};

export const saveAndGetNextQuestion = async ({no, answers, seconds}) => {
  const res = await fetch(`${process.env.HOST_NAME}/api/question?no=${no}`, {
    method: `POST`,
    body: JSON.stringify({ no, answers, seconds }),
  });
  const resData = await res.json();
  if (resData.success) {
    return await getQuestion(resData.no + 1);
  } else {
    return null;
  }
};
