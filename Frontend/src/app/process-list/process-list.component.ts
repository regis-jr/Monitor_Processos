import { Component, OnInit } from '@angular/core';
import { ProcessData } from '../process-data';
import { ProcessService } from '../process.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.scss'
})
export class ProcessListComponent implements OnInit {

  processes: ProcessData[] = [];
  sortingCriterio: string = 'id';
  ascendingOrder: boolean = true;

  constructor(private processService: ProcessService) { }

  ngOnInit(): void {
    this.loadProcesses();
    setInterval(() => {
      this.loadProcesses();
    }, 500);
  }

  
  loadProcesses() {
    this.processService.getProcesses().subscribe(processes => {
      this.processes = processes;
      this.sort(this.sortingCriterio);
    });
  }

  sort(criterio: string) {
    
    if (criterio === this.sortingCriterio) {
      this.ascendingOrder = !this.ascendingOrder;
    } else {

      this.ascendingOrder = true;

      this.sortingCriterio = criterio;

    }
    
    
    switch(criterio) {
      case 'id':
        this.processes.sort((a, b) => a.id - b.id);
        break;
      case 'name':
        this.processes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'cpuUsage':
        this.processes.sort((a, b) => a.cpuUsage - b.cpuUsage);
        break;
      case 'memoryUsage':
        this.processes.sort((a, b) => a.memoryUsage - b.memoryUsage);
        break;
      default:
        // Ordenação por id
        this.processes.sort((a, b) => a.id - b.id);
    }
  }



  convertBytestoMB(bytes: number): number{
    return bytes / (1024 * 1024);
  }

}
