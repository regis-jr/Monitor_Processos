import { Component, OnInit } from '@angular/core';
import { ProcessService } from '../process.service';
declare var google: any;

@Component({
  selector: 'app-memory-chart',
  templateUrl: './memory-chart.component.html',
  styleUrls: ['./memory-chart.component.scss']
})
export class MemoryChartComponent implements OnInit {

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.memoryChart.bind(this));

    setInterval(() => {
      this.memoryChart();
    }, 1000);
  }

  memoryChart() {
    this.processService.getProcesses().subscribe(processes => {
      const totalMemoryUsage = processes.reduce((acc, process) => acc + process.memoryUsage, 0);
      const totalMemoryUsageMB = this.convertBytesToMB(totalMemoryUsage);

      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Category');
      data.addColumn('number', 'Memória (MB)');
      data.addRows([
        ['', totalMemoryUsageMB]
      ]);

      const options = {
        title: 'Uso Total de Memória (MB)',
        legend: { position: 'none' },
        hAxis: {
          title: '',
          minValue: 0
        },
        bars: 'horizontal',
        colors: ['#4B0082']
      };

      const chart = new google.visualization.BarChart(document.getElementById('memory_chart'));

      chart.draw(data, options);
    });
  }

  convertBytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }
}

