import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../process.service';
declare var google: any;

@Component({
  selector: 'app-process-chart',
  templateUrl: './process-chart.component.html',
  styleUrls: ['./process-chart.component.scss']
})
export class ProcessChartComponent implements OnInit {

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.processChart.bind(this));

    
    setInterval(() => {
      this.processChart();
    }, 1000);
  }

  processChart() {
    this.processService.getProcesses().subscribe(processes => {
      const data = new google.visualization.DataTable();
      data.addColumn('datetime', 'Tempo');
      data.addColumn('number', 'Uso em (%)');

      
      const currentTime = new Date();
      const rows = processes.map((process, index) => {
        const time = new Date(currentTime.getTime() - (processes.length - index) * 500);
        return [time, process.cpuUsage];
      });

      data.addRows(rows);

      const options = {
        title: 'Uso da CPU (%)',
        curveType: 'function',
        legend: { position: 'none' },
        backgroundColor: '#f5f5f5',
        colors: ['#007bff'],
        lineWidth: 2, 

        hAxis: {
          title: ' ',
          format: 'HH:mm:ss',
          titleTextStyle: { color: '#333' },
          textStyle: { color: '#333' },
          gridlines: { color: '#ddd', count: -3 } 
        },
        vAxis: {
          title: '',
          titleTextStyle: { color: '#333' },
          textStyle: { color: '#333' },
          gridlines: { color: '#ddd' },
          minValue: 0,
          maxValue: 100,
          ticks: [0, 20, 40, 60, 80, 100]  
        }
      };

      const chart = new google.visualization.LineChart(document.getElementById('process_chart'));
      chart.draw(data, options);
    });
  }

}


