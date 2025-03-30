import { Component, inject, OnInit, signal } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SimulationsService } from '../simulations.service';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-simulation-add',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    FloatLabelModule,
    SelectModule,
    ButtonModule,
    ToastModule,
    DatePickerModule
  ],
  providers: [MessageService],
  templateUrl: './simulation-add.component.html',
  styleUrl: './simulation-add.component.css'
})
export class SimulationAddComponent implements OnInit {
  private ref = inject(DynamicDialogRef);
  private simulationsService = inject(SimulationsService);
  private messageService = inject(MessageService);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  private currentUser = this.authService.currentUser();

  loading = signal(false);
  form = this.formBuilder.nonNullable.group({
    productCode: ['', Validators.required],
    vehicleCategoryCode: ['', Validators.required],
    power: [0, Validators.required],
    valueNew: [0, Validators.required],
    valueVenal: [0, Validators.required],
    circulationDate: [new Date(), Validators.required]
  });
  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductList();
  }

  getProductList() {
    this.simulationsService.getAllProducts().then(list => {
      this.products.set(list);
    }).catch(err => this.handleError(err, "ERROR GETTING PRODUCTS"));
  }

  getCategoryList() {
    this.simulationsService.getAllCategories().then(list => {
      this.categories.set(list);
    }).catch(err => this.handleError(err, "ERROR GETTING CATEGORIES"));
  }

  handleError(err: any, summary: string) {
    console.log(err);
    this.messageService.add({
      summary,
      severity: 'warn',
      life: 5000,
      detail: err.message
    });
  }

  startSimulation() {
    const {circulationDate, power, productCode, valueNew, valueVenal, vehicleCategoryCode } = this.form.getRawValue();
    this.loading.set(true);
    this.simulationsService.createSimulation({
      circulationDate, power, productCode, userId: this.currentUser!.id, valueNew, valueVenal, vehicleCategoryCode
    }).then(result => {
      console.log(result);
    }).catch(err => this.handleError(err, "ERROR SIMULATION")).finally(() => this.loading.set(false));
  }
}
