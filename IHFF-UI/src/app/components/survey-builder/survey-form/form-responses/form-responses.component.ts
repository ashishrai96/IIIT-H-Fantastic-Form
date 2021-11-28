import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { Constants } from 'src/app/shared/models/constants.model';
import { FormElement } from 'src/app/shared/models/form-element.model';
import { SurveyBuilderService } from '../../survey-builder.service';
import * as Exceljs from "exceljs";
import * as FileSaver from "file-saver";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.scss']
})
export class FormResponsesComponent implements OnInit {

  formTitle: string = "";
  formArray: any[] = [];
  questionArray: any[] = [];
  graph = {};
  liveUrl: string;
  formActive:boolean = false;
  activeTab:number = 0;
  indivForm:FormElement;
  currentIndex:number = 0;
  creatorId: number;

  readonly = true;

  constructor(private activateRoute: ActivatedRoute, private messageService: MessageService,
    private surveyBuilderService: SurveyBuilderService, private loader:LoaderService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      if(params && params['creatorId'] && params['title']){
        this.formTitle = params['title'];
        this.creatorId = params['creatorId'];
        this.loadFormResponse(params['creatorId'], params['title']);
      }
    });

    let url = window.location.href;
    this.liveUrl = url.replace("responses", "live");
  }

  goToLiveForm(){
    window.location.href = this.liveUrl;
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

  deactivateForm(){
    this.surveyBuilderService.deactivateForm(this.creatorId, this.formTitle).subscribe((resp:any) => {
      console.log(resp);
      this.messageService.add({
        severity: 'success',
        summary: 'Form Deactivated'
      });
      this.loadFormResponse(this.creatorId, this.formTitle);
    },
    err=>{
      console.log(err);
      this.messageService.add({
        severity: 'error',
        summary: 'Something went wrong!'
      });
    });
  }

  loadFormResponse(creatorId, formTitle){
    this.loader.start();
    this.surveyBuilderService.loadResponseByFormId(creatorId, formTitle).subscribe((resp:any) => {
      console.log(resp);
      this.formTitle = formTitle;
      this.formActive = resp.active;
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


  async exportExcel() {
    if(this.formArray.length <= 0){
      return;
    }

    const workbook = new Exceljs.Workbook();
    workbook.created = new Date();
    workbook.modified = new Date();

    const sheet = workbook.addWorksheet('Responses');
    sheet.columns = [];
    this.formArray[0].items.forEach((ques, idx) => {
      sheet.columns = [
        ...sheet.columns,
        { header: ques.question,
          key: String(ques.questionId),
          width: 40,
        },
      ];
    });

    this.formArray.forEach((form: any) => {
      let items:FormElement[] = form.items;
      let resp = {};
      items.forEach(quest => {
        let ans = quest.answer;
        if(Array.isArray(quest.answer)){
          ans = "";
          quest.answer.forEach(a => { ans += a+", " });
          ans = ans.substr(0, ans.length-2);
        }
        resp = {
          ...resp,
          [quest.questionId]: ans
        }
      });
      sheet.addRow({...resp});
    });

    sheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if(rowNumber == 1 && cell.value){
          row.getCell(colNumber).fill = {
            type: 'pattern', pattern: 'darkGrid', fgColor: { argb: '73989D' }
          };
          row.getCell(colNumber).font = {
            bold: true, size: 16
          };
          row.getCell(colNumber).border = {
            top: { style: 'thick' },
            right: { style: 'thick' },
            bottom: { style: 'thick' },
            left: { style: 'thick' }
          };
        }
        else if(cell.value){
          row.getCell(colNumber).border = {
            top: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' }
          };
        }
      });
  });

    let blobType: string = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: blobType }); 
      FileSaver.saveAs(blob, this.formTitle+" Responses");
     });

  }

}
