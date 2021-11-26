import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { Constants } from 'src/app/shared/models/constants.model';
import { FormElement } from 'src/app/shared/models/form-element.model';
import { SurveyBuilderService } from '../../survey-builder.service';

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.scss']
})
export class FormResponsesComponent implements OnInit {

  formTitle: string = "";
  formArray: FormElement[] = [];
  questionArray: any[] = [];
  graph = {};

  activeTab:number = 0;
  indivForm:FormElement;
  currentIndex:number = 0;

  readonly = true;

  constructor(private activateRoute: ActivatedRoute, 
    private surveyBuilderService: SurveyBuilderService, private loader:LoaderService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      if(params && params['creatorId'] && params['title']){
        this.loadFormResponse(params['creatorId'], params['title']);
      }
    });
  }

  changeTab(index) {
    this.activeTab = index;

    if(index == 1){
      this.loadIndividualForm(0);
    }
  }

  loadIndividualForm(idx: number) {
    if(idx < 0 || idx >= this.formArray.length){
      return;
    }

    this.indivForm = this.formArray[idx];
    this.currentIndex = idx;
  }

  loadFormResponse(creatorId, formTitle){
    this.loader.start();
    this.surveyBuilderService.loadResponseByFormId(creatorId, formTitle).subscribe((resp:any) => {
      console.log(resp);
      this.formTitle = formTitle;
      this.formArray = [ ...resp.response ];
      console.log("formArray==", this.formArray);
      this.graph = {};

      let stmtData = {};
      let choiceData = {};
      let textData = [];
      resp['response'].forEach(form => {
        form['items'].forEach((item, questionIdx) => {
          // item == Question
          if(!(questionIdx in this.questionArray)) {
            this.questionArray[questionIdx] = item;
          }
          
          if(item.type == Constants.FORM_ELEM_LIKER_SCALE_OPTION) {
            if(questionIdx in this.graph) {
              stmtData = this.graph[questionIdx];
            }
            // console.log("items ==== ",item);
            // console.log(stmtData);

            for(let i=0; i<item.statements.length; i++) {
              let ans = item.answer[i];
              let ansIdx = item.choices.findIndex(x => x==ans);
              if(!(i in stmtData)){
                stmtData[i] = new Array(item.choices.length).fill(0);
              }
              if(ansIdx != -1)
                stmtData[i][ansIdx]++;
            }

            this.graph = {
              ...this.graph,
              [questionIdx]: stmtData
            };
          }
          else if(item.type == Constants.FORM_ELEM_CHOICE_OPTION) {
            // console.log("choices item =====", item);
            choiceData = new Array(item.choices.length).fill(0);
            if(questionIdx in this.graph) {
              choiceData = this.graph[questionIdx];
            }

            if(Array.isArray(item.answer)) {
              for(let val of item.answer){
                let idx = item.choices.findIndex(x => x==val);
                if(idx != -1)
                  choiceData[idx]++;
              }
            }
            else {
              let idx = item.choices.findIndex(x => x==item.answer);
              if(idx != -1)
                choiceData[idx]++;
            }

            this.graph = {
              ...this.graph,
              [questionIdx]: choiceData
            };
          }
          else if(item.type == Constants.FORM_ELEM_TEXT_OPTION) {
            if(questionIdx in this.graph) {
              textData = this.graph[questionIdx];
            }

            if(item.answer.length > 0){
              textData.push(item.answer);
            }

            this.graph = {
              ...this.graph,
              [questionIdx]: textData
            };
          }
        });
      });

      console.log(this.graph);
      this.loader.stop();
    },
    err => {
      this.loader.stop();
    });



  }

}
