import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  @ViewChild('name') uname! : ElementRef; 
  ngOnInit(): void {
  }

  startQuiz() {
      console.log('user Which had Recently Applying for Quiz be like :',this.uname.nativeElement.value)
     localStorage.setItem('QuizUser',this.uname.nativeElement.value)
  }

}
