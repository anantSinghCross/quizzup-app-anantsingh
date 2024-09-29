import { NextResponse } from "next/server";

// Normally we would get and save data on a DB
const allQuestions = [
  {
    no: 0,
    question: "What is a group of unicorns known as?",
    choices: ["A herd", "A shimmer", "A crowd", "A rainbow"],
    // "answers": [1]
  },
  {
    no: 1,
    question: "Which animal sleeps the most?",
    choices: ["Sloth", "Cat", "Koala", "Bat"],
    // "answers": [2]
  },
  {
    no: 2,
    question: "Which ancient people invented the toothbrush?",
    choices: ["Romans", "Egyptians", "Greeks", "Africans"],
    // "answers": [1]
  },
  {
    no: 3,
    question: "Which of the below fruits can be green in color?",
    choices: ["Apple", "Banana", "Papaya", "Orange"],
    // "answers": [0, 1, 2]
  },
  {
    no: 4,
    question: "Which monument is depicted below?",
    image:
      "https://www.holidify.com/images/cmsuploads/compressed/eiffel-tower-975004_20190807180942.jpg",
    choices: ["Taj Mahal", "Chichen Itza", "Colosseum", "Eiffel Tower"],
    // "answers": [3]
  },
];
const correctAnswers = {
  '0': [1],
  '1': [2],
  '2': [1],
  '3': [0, 1, 2],
  '4': [3],
}
let userAnswers = {};

export async function GET(req) {
  const quesNumber = req.nextUrl.searchParams.get("no");
  // this means that there is no next question and the result should be shown
  if(+quesNumber > allQuestions.length - 1){
    let score = 0;
    for(let index in correctAnswers){
      if(correctAnswers[index].sort().join() === userAnswers[index].sort().join()){
        score += 1;
      }
    }
    return NextResponse.json({
      score,
      totalQuestions: allQuestions.length,
      percentage: Math.ceil((score/allQuestions.length)*100)
    })
  }
  return NextResponse.json(allQuestions[quesNumber]);
}

export async function POST(req) {
  const body = await req.json();
  const { no, answers } = body;
  userAnswers[no] = answers;
  console.log(userAnswers);
  return NextResponse.json({success: true, no});
}
