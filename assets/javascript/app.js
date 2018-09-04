let questions = [
    {
        id: 0,
        question: 'With which sport is Michael Jordan associated?',
        choices: ['Swimming','Football','Basketball','Tennis','Running'],
        answer: 'Basketball'
    },
    {
        id: 1,
        question: 'My Heart Will Go On came from which movie?',
        choices: ['Titanic','La La Land','Star Wars', 'The Aviator','Inception'],
        answer: 'Titanic'
    },
    {
        id: 2,
        question: "Name the world's largest ocean.",
        choices: ['Indian', 'Atlantic', 'Pacific', 'Arctic', 'Southern'],
        answer: 'Pacific'
    },
    {
        id: 3,
        question: 'The hardest natural substance known is what?',
        choices: ['Stone', 'Diamond', 'Iron', 'Cotton', 'Glass' ],
        answer: 'Diamond'
    },
    {
        id: 4,
        question: 'Name the seventh planet from the sun.',
        choices: ['Pluto', 'Mars', 'Jupiter', 'Mercury', 'Uranus'],
        answer: 'Uranus'
    },
    {
        id: 5,
        question: "What color is a panda?",
        choices: ['Blue & Yellow', 'Orange & White', 'Black & White', 'Red & Green', 'Blue & Red'],
        answer: 'Black & White'
    },
    {
        id: 6,
        question: 'What colour is a Welsh poppy?',
        choices: ['Yellow', 'Red', 'Blue', 'White', 'Pink'],
        answer: 'Yellow'
    },
    {
        id: 7,
        question: 'Which is the only mammal that cannot jump?',
        choices: ['Lion', 'Tiger', 'Elephant', 'Bear', 'Dog'],
        answer: 'Elephant'
    },
    {
        id: 8,
        question: 'What company is the largest producer of computer software for the personal computer?',
        choices: ['Apple', 'IBM', 'Microsoft', 'Cisco', 'Facebook'],
        answer: 'Microsoft'
    },
    {
        id: 9,
        question: 'Where is the smallest bone in the body?',
        choices: ['Arm', 'Leg', 'Face', 'Finger', 'Ears'],
        answer: 'Ears'
    }
]
var yourtime = 60;
var myanswer = [];


// Display Choice List
function displayChoice(queid, arr){
   var options = '';
   for(let i=0; i<arr.length; i++){
    //console.log(queid+arr[i])
          options = options + 
                    `<p>
                    <label class="radio">
                        <input class="choice" data-choice="${arr[i]}" type="radio" name="${queid}">
                        <span> ${arr[i]} </span>                         
                    </label> 
                    </p>                             
                    `
  }
  return options
}

// Display Question
function displayQuestion(){
    questions.forEach(question => {
        $('.container').append(`
            <div class="row">
                <h5 class="question">${question.id+1}. ${question.question}</h5> 
            </div>   
            <div>   
            ${displayChoice(question.id, question.choices)}   
            </div>                      
        `)
    })
}

// Start Game
function startGame(){
    $('.content').html(`<h1>Time Remaining: <span class="time"> ${timeConverter(yourtime)} </span></h1>`) 
    $('.content').append(`<div class="container"></div>`)
    $('.content').append(`<button id="submit" class="btn btn-primary" type="submit">Submit</button>`)
    displayQuestion()  
    for(let i=0; i<questions.length; i++){
        myanswer[i] = ''
    }

}

// Convert time in MM:SS display format
function timeConverter (t) {
    var minutes = Math.floor(t / 60)
    var seconds = t - (minutes * 60)

    if (seconds < 10) {
      seconds = '0' + seconds
    }

    if (minutes === 0) {
      minutes = '00'
    } else if (minutes < 10) {
      minutes = '0' + minutes
    }
    return minutes + ':' + seconds
}

// set time limit for the game, update time left for every second
setInterval(function() {
    if (yourtime > 0){
       $('.time').html(timeConverter(yourtime))   
    }
    else {
        getResult()
    }
    yourtime--
}, 1000)
  

// Get and Display Result
function getResult(){
    
    // Log Result 
    for(let k = 0; k < myanswer.length; k++){
        console.log('Correct Ans: ' + questions[k].answer + '; My Answer: ' + myanswer[k]) 
    }

    let correctCtn = 0;
    let unanswerdCtn = 0;

    for(let i = 0; i < questions.length; i++){
        if (myanswer[i] === '')
        {
            unanswerdCtn++;
        }
        else if (myanswer[i] === questions[i].answer){             
            correctCtn++
        }
    }

    $('.content').html(`<div">
                            <li class="result">Finished!</li>
                            <li class="result">Correction Answer: ${correctCtn}</li>
                            <li class="result">InCorrect Answer: ${questions.length-correctCtn-unanswerdCtn}</li>
                            <li class="result">Unanswerd:${unanswerdCtn}</li>
                        </div>`
                      )
}

// Game Start Here 
$('#startGamebtn').on("click", function(){
   startGame()
})

// Submit Answer and Get Result
$(document).on('click', "#submit", function () {
    getResult()
})

$(document).on('click', '.choice', function(){
    myanswer[$(this).attr('name')] = $(this).attr('data-choice')   
})
