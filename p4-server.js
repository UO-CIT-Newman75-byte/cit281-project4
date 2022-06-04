const fastify = require("fastify")();
const fs = require('fs');

const {
    getQuestions,
    getAnswer,
    getQuestionsAnswers,
    getQuestion,
    getAnswers,
    getQuestionAnswer,
} = require("./p4-module.js");

fastify.get("/cit/question", (request, reply) => {
reply
.code(200)
.header("Content-Type", "text/json; charset=utf-8")
.send({error: "", statusCode: 200, questions: getQuestions()});
});

fastify.post("/cit/question", (request, reply) => {
    const response = {
        error: "",
        statusCode: 201,
        question: "",
        number: "",
    };

    const qa = addQuestionAnswer(request.body)
    if (qa.error.length > 0) {
        response.statusCode = 409;
        response.error = qa.error;
    } else {
        response.number = qa.number;
    }

reply 
.code(response.statusCode)
.header("Content-Type", "text/json; charset=utf-8")
.send(response);
});

fastify.put("/cit/question", (request, reply) => {
    let { number = ""} = request.params;

    const response = {
        error: "",
        statusCode: 200,
        number: "",
    };

    if ( number === "") {
        response.error = "Number route parameter required";
        response.statusCode = 404;
    } else {
        number = parseInt(number);

    const qa = addQuestionAnswer({number, ...request.body})
    if (qa.error.length > 0) {
        response.statusCode = 409;
        response.error = qa.error;
    } else {
        response.number = qa.number;
    }
}

reply 
.code(response.statusCode)
.header("Content-Type", "text/json; charset=utf-8")
.send(response);
});

fastify.delete("/cit/question/:number", (request, reply) => {
    let { number = "" } = request.params;
    
    const response = {
        error: "",
        statusCode: 200,
        number: "",
        };
        
    if ( number === "") {
        response.error = "Number route parameter required";
        response.statusCode = 404;
    } else {
        number = parseInt(number);

    const qa = deleteQuestionAnswer({number, ...request.body})
    if (qa.error.length > 0) {
        response.statusCode = 409;
        response.error = qa.error;
    } else {
        response.number = qa.number;
    }
}});

fastify.get("/cit/question/:number", (request, reply) => {
    let { number = " " } = request.params;
    const response = {
        error: "",
        statusCode: 200,
        question: "",
        number: "",
    };
    if (number === "") {
       response.error = "Number route parameter required";
       response.statusCode = 404;
    } else {
        number = parseInt(number);
    
   const questionInfo = getQuestion(number);

    if (questionInfo.error.length > 0) {
        response.error = questionInfo.error;
        response.statusCode = 404;
    } else {
        response.question = questionInfo.question;
        response.number = number;
    }
   }
    reply 
    .code(response.statusCode)
    .header("Content-Type", "text/json; charset=utf-8")
    .send(response);
   });

   fastify.get("/cit/answer/:number", (request, reply) => {
       let {number = ""} = request.params;
       const response = {
           error: "",
           statusCode: 200,
           question: "",
           number: "",
       };
       if (number === "") {
          response.error = "Number route parameter required";
          response.statusCode = 404;
       } else {
           number = parseInt(number);
       
      const answerInfo = getAnswer(number);

       if (questionInfo.error.length > 0) {
           response.error = answerInfo.error;
           response.statusCode = 404;
       } else {
           response.question = answerInfo.question;
           response.number = number;
       }
      }
       reply 
       .code(response.statusCode)
       .header("Content-Type", "text/json; charset=utf-8")
       .send(response);
      });


fastify.get("/cit/answer", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({error: "", statusCode: 200, answers: getAnswers() });
});

    fastify.get("/cit/questionanswer", (request, reply) => {
        reply
        .code(200)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({error: "", statusCode: 200, questions: getQuestionsAnswers()});
    });

     
fastify.get("/cit/questionanswer/:number", (request, reply) => {
const {number} = request.params;
const q = getQuestionAnswer(parseInt(number));
if (number > 3) {
    statusCode = 404;
} else if (number < 1) {
    statusCode = 404;
} else {
    statusCode = 200;
}
    reply
    .code(200)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({error: "route not found", statusCode: 404});
});

fastify.get("/cit/*", (request, reply) => {
    reply
    .code(404)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({error: "route not found", statusCode: 404});
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
if (err) {
console.log(err);
process.exit(1);
}
console.log(`Server listening on ${address}`);
});