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
    const currentTime = new Date();
    const startTime = new Date(currentTime.getTime() - 30000); 

    this.processService.getProcesses().subscribe(processes => {
      const data = new google.visualization.DataTable();
      data.addColumn('datetime', 'Tempo');
      data.addColumn('number', 'Uso em (%)');

      const rows = processes.map((process, index) => {
        const time = new Date(currentTime.getTime() - (processes.length - index) * 2000);
        return [time, process.cpuUsage];
      });

      
      const filteredRows = rows.filter(row => row[0] >= startTime && row[0] <= currentTime);

      data.addRows(filteredRows);

      const options = {
        title: 'Uso da CPU (%)',
        legend: { position: 'none' },
        backgroundColor: '#f5f5f5',
        colors: ['#007bff'],
        lineWidth: 2, 

        hAxis: {
          title: 'Tempo',
          format: 'HH:mm:ss',
          titleTextStyle: { color: '#333' },
          textStyle: { color: '#333' },
          gridlines: { color: '#ddd' } 
        },
        vAxis: {
          title: 'Uso em (%)',
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



