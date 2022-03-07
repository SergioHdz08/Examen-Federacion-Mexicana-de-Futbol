import { CdkStepper} from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-cdk-stepper',
  templateUrl: './cdk-stepper.component.html',
  styleUrls: ['./cdk-stepper.component.css'],
  providers:[{provide: CdkStepper, useExisting: CdkStepperComponent}]
})
export class CdkStepperComponent extends CdkStepper implements OnInit {

  progress!: number;

  ngOnInit(): void {
    setTimeout(()=>{
      this.progress = 100 /this.steps.length;
    },100);
  }

  selectStepByIndex(index: number): void{
    this.selectedIndex = index;
  }

  backStep(){
    this.progress -=100 / this.steps.length;
    console.log(this.progress);
  }

  nextStep(){
    if(this.selected?.stepControl?.valid){
      this.progress += this.progress <100 ? 100 / this.steps.length: 0;
      this.next();
    }else{
      if(this.selected?.stepControl == undefined){
        this.progress += this.progress < 100 ? 100 /this.steps.length: 0
        this.next();
      }
    }
  }

}
