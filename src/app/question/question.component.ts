import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public questions : any = [];
  public currentQuestion  : number  = 0; 
  public name : String = "";
  public points : number = 0 ;
  counter = 60;
  correctAnswer:number = 0 ;
  IncorrectAnswer : number = 0;
  interval$ : any;
  progress : string = "0";
  isQuizCompleted: boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('QuizUser')!;
    this.getQuestionEach();
    this.startCounter();
  }

  getQuestionEach(){
    this.questionService.getQuestionJson().subscribe((res)=>{
      this.questions = res.questions;
      console.log("Here are the Questions be like :",this.questions.questions)
    })
  }

  nextQuestion(){
    this.currentQuestion = this.currentQuestion+1;
  }

  prevQuestion() {
    this.currentQuestion = this.currentQuestion -1 ;
  }

  answer(questionNo:number,option:any)
  {
    if(questionNo === this.questions.length)
    {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if(option.correct)
    {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      },1000)
     
    }
    else
    {
      setTimeout(() => {
        this.currentQuestion++;
        this.IncorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points -= 10;
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
    .subscribe((val)=>{
      this.counter--;

      if(this.counter === 0)
      {
        this.currentQuestion ++;
        this.counter = 60;
        this.points -= 10;
      }
    });
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.currentQuestion = 0;
    this.resetCounter();
    this.getQuestionEach();
    this.points = 0;
  }


  getProgressPercent() {
    this.progress = ((this.currentQuestion/this.questions.length)*100).toString();
    return this.progress;
  }

}
