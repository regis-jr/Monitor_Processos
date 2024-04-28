import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../process.service';
declare var google: any;

@Component({
  selector: 'app-process-chart',
  templateUrl: './process-chart.component.html',
  styleUrls: ['./process-chart.component.scss']
})
export class ProcessChartComponent implements OnInit {
  data: any;
  chart: any;

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.initializeChart.bind(this));
  }

  initializeChart() {
    this.data = new google.visualization.DataTable();
    this.data.addColumn('string', 'Tempo');
    this.data.addColumn('number', 'Uso da CPU (%)');
    this.chart = new google.visualization.LineChart(document.getElementById('process_chart'));
    this.updateChart();
    setInterval(() => this.updateChart(), 2000); 
  }

  updateChart() {
    const currentTime = new Date(); // Usar o tempo local do cliente
    const time = `${this.padZero(currentTime.getHours())}:${this.padZero(currentTime.getMinutes())}:${this.padZero(currentTime.getSeconds())}`;
    
    this.processService.getProcesses().subscribe(processes => {
      this.data.removeRows(0, this.data.getNumberOfRows()); // Limpar dados existentes
      processes.forEach(process => {
        this.data.addRow([time, process.cpuUsage]); // Usar o mesmo tempo para todos os dados
      });
      this.chart.draw(this.data, this.getChartOptions());
    });
  }
  

  getChartOptions() {
    return {
      title: 'Uso total da CPU',
      backgroundColor: '#f5f5f5',
      colors: ['#007bff'],
      lineWidth: 2,
      hAxis: {
        title: 'Tempo',
        titleTextStyle: { color: '#333' },
        textStyle: { color: '#333' }
      },
      vAxis: {
        title: '',
        titleTextStyle: { color: '#333' },
        textStyle: { color: '#333' },
        minValue: 0,
        maxValue: 100
      }
    };
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }
}

