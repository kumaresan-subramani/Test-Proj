import { AfterViewInit, Component, OnChanges, OnInit ,ViewChild , Input, ElementRef } from '@angular/core';
import  {TreeChart} from "d3-org-chart";

@Component({
  selector: 'kd-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  styleUrls: ['./d3-org-chart.component.scss']
})
export class D3OrgChartComponent implements OnInit ,OnChanges , AfterViewInit{

  @ViewChild("chartContainer") chartContainer!: ElementRef <HTMLElement>;
  @Input() data: any[];
  chart : any ;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new TreeChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  updateChart() {
    if (!this.data) {
      return; 
    }
    if (!this.chart) {
      return; 
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .svgWidth(500)
      .initialZoom(0.4)
      .onNodeClick( (d: string) => console.log(d + " node clicked"))
      .render();
  }

}
