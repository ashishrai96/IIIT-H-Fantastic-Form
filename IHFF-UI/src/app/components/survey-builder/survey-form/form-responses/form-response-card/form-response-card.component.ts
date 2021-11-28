import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/models/constants.model';
import { FormElement } from 'src/app/shared/models/form-element.model';

@Component({
  selector: 'app-form-response-card',
  templateUrl: './form-response-card.component.html',
  styleUrls: ['./form-response-card.component.scss']
})
export class FormResponseCardComponent implements OnInit {

  @Input() value: FormElement;
  @Input() graphData: any;
  @Input() index: number;

  constants = Constants;

  stackedData;
  stackedOptions = {
    tooltips: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  };


  pieData;
  pieOptions = {
    plugins: {
        legend: {
            labels: {
                color: 'blue'
            }
        }
    }
  };

  constructor() { }

  ngOnChanges() {
    console.log(this.value, this.graphData, this.index);

    if(this.value.type == this.constants.FORM_ELEM_LIKER_SCALE_OPTION) {
      let stack = { labels: [ ...this.value.statements ], datasets: [] };

      for(let i=0; i < this.value.choices.length; i++) {
        let arr = [];
        for(let j=0; j<this.value.statements.length; j++) {
          arr.push(this.graphData[j][i]);
        }

        let obj = {
          type: 'bar',
          label: this.value.choices[i],
          backgroundColor: this.getRandomColor(),
          data: arr
        };

        stack.datasets.push(obj);
      }

      this.stackedData = { ...stack };
    }
    else if(this.value.type == this.constants.FORM_ELEM_CHOICE_OPTION) {
      let colors = [];
      let hoverColors = [];
      this.value.choices.forEach(() => {
        let c = this.getRandomColor();
        colors.push(c);
        hoverColors.push(c+'cf');
      });
      this.pieData = {
        labels: [ ...this.value.choices ],
        datasets: [
          {
            data: [ ...this.graphData ],
            backgroundColor: [ ...colors ],
            hoverBackgroundColor: [ ...hoverColors ]
          }
        ]
      };
    }
  }

  ngOnInit(): void {
    
  }

  getRandomColor() {
    let color = '#'+Math.floor(Math.random()*16777215).toString(16);;
    return color;
  }

}
