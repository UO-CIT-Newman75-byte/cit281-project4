const { wrapResponseSerializer } = require('pino-std-serializers');
const { data} = require('./p4-data.js');

module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer
};
function getQuestions() {
    let result1 = data.map(({question}) => question);
    return result1 ;
}

function getAnswers() {
    let result2 = data.map(({answer}) => answer);
    return result2;
}

function getQuestionsAnswers() {
    const clonedArr = JSON.parse(JSON.stringify(data));
    return clonedArr;
}

function getQuestion(number = "") {
    let questionObj = {
        question: "",
        number: "",
        error: "",
    };
    if(!Number.isInteger(number)) {
    questionObj.error = "Question number must be an integer"; 
    }else if(number < 1)
    { questionObj.error = "Question number must be >= 1" }
    else if(number > data.length)
    { questionObj.error = "Question number must be less than the number of questions (3)" }
    else {
      index = number - 1;
      questionObj.number = number;
      questionObj.question = data[index].question;
    }
  return questionObj;
}

function getAnswer(number = "") {
  let answerObj = {
      answer: "",
      number: "",
      error: "",
  };
  if(!Number.isInteger(number)) {
    answerObj.error = "Answer number must be an integer"; }
    else if(number < 1)
    { answerObj.error = "Answer number must be >= 1" }
    else if(number > data.length)
    { answerObj.error = "Answer number must be less than the number of questions (3)" }
    else {
      index = number - 1;
      answerObj.number = number;
      answerObj.answer = data[index].answer;
    }
    return answerObj;
}

function getQuestionAnswer(number = "") {
  const question = getQuestion(number);
  const answer = getAnswer(number);

  if (question.error.length !== 0) {
    return question;
  } else if (answer.error.length !== 0) {
    return answer;
  } else {
    return {...question, answer: answer.answer};
  }
}

function addQuestionAnswer(info = {}) {
  const { question = "", answer = ""} = info;
  
  const response = { 
    error: "",
    message: "",
    number: -1,
  };

  if (typeof info !== "object") {
    response.error = "Object question property required"
  } else if (question.length === 0)
  {response.error = "Object question property required"}
  else if (answer.length === 0)
  {response.error = "Object answer property required"}
else {
  data.push({ question, answer});
  response.message = "Question added";
  response.number = data.length;
}

return response;
}

function updateQuestionAnswer(info = {}) {
  const { question = "", answer = ""} = info;
  
  const response = { 
    error: "",
    message: "",
    number: -1,
  };

  if (typeof info !== "object") {
    response.error = "Object question property required"
  } else if (question.length === 0)
  {response.error = "Object question property required"}
  else if (answer.length === 0)
  {response.error = "Object answer property required"}
else {
  data.forEach((question, index) => {
    if(index === info.question) {
        if (info.question) {
       data[index].question = info.question;
       }
       if (req.params.answer) {
       data[index].answer = req.params.answer; 
 }
   }
});
  response.message = "Question updated";
  response.number = data.length;
}

return response;
}

function deleteQuestionAnswer(info = {}) {
  const { question = "", answer = ""} = info;
  
  const response = { 
    error: "",
    message: "",
    number: -1,
  };

  if (typeof info !== "object") {
    response.error = "Object question property required"
  } else if (question.length === 0)
  {response.error = "Object question property required"}
  else if (answer.length === 0)
  {response.error = "Object answer property required"}
else {
  console.log("placeholder");
  console.log(data);
  data = data.filter((question,index) => index !== req.params.number);
  response.message = "Question deleted";
  response.number = data.length;
}

return response;
}


/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = true;
  const testGetAs = true;
  const testGetQsAs = true;
  const testGetQ = true;
  const testGetA = true;
  const testGetQA = true;
  const testAdd = true;      // Extra credit
  const testUpdate = true;   // Extra credit
  const testDelete = true;   // Extra credit

  // getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
  }
  
  // getAnswers()
  if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
  }
  
  // getQuestionsAnswers()
  if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
  }
  
  // getQuestion()
  if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
  }
  
  // getAnswer()
  if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
  }
  
  // getQuestionAnswer()
  if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    )
  };

  // deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(0)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}

// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}

// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}