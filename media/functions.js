$(function() {
    const slider = document.querySelector(".quiz-board-wrapper");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const resultsBtn = document.querySelector(".results-btn");
    const slides = document.querySelectorAll(".slider");
    var quiz = $('.quiz-board');
    var slideNumber = 0;

    var questions = [{
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      correctAnwserCount: 1,
      choicesCount: 1,
      anwsers: []
    }, {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?",
      correctAnwserCount: 1,
      choicesCount: 1,
      anwsers: []
    }, {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt?",
      correctAnwserCount: 1,
      choicesCount: 1,
      anwsers: []
    }, {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
      correctAnwserCount: 1,
      choicesCount: 1,
      anwsers: []
    }];

    display();
    initialize();

    function initialize() {
      for (index = 1; index <= questions.length; index++) {
        var maxAnwserCount = index + 2;
        var minAnwserCount = 1;
        var count = Math.floor(Math.random() * (maxAnwserCount - minAnwserCount + 1)) + minAnwserCount;
        questions[index-1].correctAnwserCount = count;
        questions[index-1].choicesCount = maxAnwserCount;
      }

      console.log('Anwsers');
      console.log(questions);
    }


    function display() {
        quiz.fadeOut(function() {
        $('#question').remove();
        //console.log(slideNumber + ' ' + questions.length);
        if(slideNumber < questions.length){
          var nextQuestion = createQuestionElement(slideNumber);
          quiz.append(nextQuestion).fadeIn();
          if (questions[slideNumber].anwsers.length > 0) {
            for(var item in questions[slideNumber].anwsers){
              var value = questions[slideNumber].anwsers[item];
              $('input[value=' + (value-1) + ']').prop('checked', true);
            }
          }

          if(slideNumber === 0){
            $('#prev').hide();
            $('#results').hide();
          } else if (slideNumber == questions.length-1) {
            $('#prev').show();
            $('#next').hide();
            $('#results').show();
          } else {
            $('#prev').show();
            $('#next').show();
            $('#results').hide();
          }
        }
      });
    }

  function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });

      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);

      var question = $('<p>').append(questions[index].question);
      qElement.append(question);

      var radioButtons = renderAnwsers(index);
      qElement.append(radioButtons);

      return qElement;
    }

  function renderAnwsers(index) {
      var anwserList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < (index + 1) + 2; i++) {
        item = $('<li>');
        input = '<input type="checkbox" name="answer" value=' + i + ' />';
        input += '<span>' + (i+1) + '</span>';
        item.append(input);
        anwserList.append(item);
      }
      return anwserList;
    }

    function choose() {
      //console.log("slide " + slideNumber);
      var checkboxes = document.querySelectorAll('input[name="answer"]:checked');
      var checked = [];
      for (var i = 0; i < checkboxes.length; i++) {
        checked.push(parseInt(checkboxes[i].value)+1);
      }
      if (slideNumber > 0) {
        questions[slideNumber-1].anwsers = checked;
      }
      console.log(questions);

    }

    function displayScore() {
      var score = $('<p>',{id: 'question'});

      var correctCount = 0;
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].anwsers.length === questions[i].correctAnwserCount) {
          correctCount++;
        }
      }

      score.append('<div class="results-question">' + 'Your RESULT: ' + correctCount + '/' + questions.length + ' !!!' + '</div>');
      score.append('<br><br><br>');

      for (var i = 0; i < questions.length; i++) {
        score.append('<div class="results-question">' +'Question ' + (i+1) + '</div>' + '<div class="results-answer">' +  ' Anwsers: ' + questions[i].anwsers)+ '</div>';
        score.append('<br>');
      }
      score.append('<br>');
      return score;
    }

    nextBtn.addEventListener("click", () => {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      //slides[slideNumber].classList.add("active");
      slideNumber++;

      choose();
      display();

    });


    prevBtn.addEventListener("click", () => {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      //slides[slideNumber].classList.add("active");
      slideNumber--;

      choose();
      display();
    });


    resultsBtn.addEventListener("click", () => {

      slideNumber++;
      choose();
      var emptyAnwser = [];
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].anwsers.length === 0) {
          emptyAnwser.push(i+1);
        }
      }

      if(emptyAnwser.length > 0){
        const alertHTML = '<div class="alert">Questions ' + emptyAnwser + ' are left unanwsered.</div>';
        document.body.insertAdjacentHTML('beforeend', alertHTML);
        setTimeout(() => document.querySelectorAll('.alert').forEach(e => e.remove()), 3000);
        slideNumber--;
      } else {
        $('#prev').hide();
        $('#next').hide();
        $('#results').hide();
        $('#question').remove();
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
      }

    });

    //image slider autoplay
    var playSlider;

    var repeater = () => {
      playSlider = setInterval(function(){
        slides.forEach((slide) => {
          slide.classList.remove("active");
        });


        //slides[slideNumber].classList.add("active");
      }, 4000);
    }
    repeater();

    //stop the image slider autoplay on mouseover
    slider.addEventListener("mouseover", () => {
      clearInterval(playSlider);
    });

    //start the image slider autoplay again on mouseout
    slider.addEventListener("mouseout", () => {
      repeater();
    });

});
