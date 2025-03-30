import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SimulationsService } from '../simulations.service';
import { Simulation } from '../../models/simulation';
import { DialogService } from 'primeng/dynamicdialog';
import { SimulationAddComponent } from '../simulation-add/simulation-add.component';

@Component({
  selector: 'app-simulation-list',
  imports: [
    DatePickerModule,
    TableModule,
    ButtonModule,
    CommonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ToastModule,
    DropdownModule,
    FormsModule
  ],
  providers: [MessageService, DialogService],
  templateUrl: './simulation-list.component.html',
  styleUrl: './simulation-list.component.css'
})
export class SimulationListComponent implements OnInit {
  simulationList = signal<Simulation[]>([]);
  private simulationsService = inject(SimulationsService);
  private messageService = inject(MessageService);
  private dialogService = inject(DialogService);

  ngOnInit(): void {
      this.simulationsService.getAllSimulations().then(list => {
        this.simulationList.set(list);
      }).catch(err => this.handleError(err, "ERROR GETTING SIMULATIONS"))
  }

  handleError(err: any, summary: string) {
    console.log(err);
    this.messageService.add({
      summary,
      severity: 'warn',
      life: 2000,
      detail: err.message
    });
  }

  goToAdding() {
    this.dialogService.open(SimulationAddComponent, {
      header: "Créer une simulation",
      focusOnShow: false,
      width: '40%',
      closable: true,
    });
  }

  proceedToSubcription(simulation: Simulation) {
    this.dialogService.open(SimulationAddComponent, {
      header: "Créer une simulation",
      focusOnShow: false,
      width: '40%',
      closable: true,
      data: {simulation}
    });
  }

  endDatePassed(simulation: Simulation) {
    const now = Date.now();
    const endDate = new Date(simulation.endDate).getTime();
    return endDate <= now;
  }
}
