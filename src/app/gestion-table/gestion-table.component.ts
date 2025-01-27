import { Component, OnInit } from '@angular/core';
import { AllserviceService } from '../serviceall/allservice.service';

interface Table {
  id: number;
  number: string;
  capacity: number;
  restaurant_id: number;
}


@Component({
  selector: 'app-gestion-table',
  templateUrl: './gestion-table.component.html',
  styleUrls: ['./gestion-table.component.css']
})
export class GestionTableComponent implements OnInit {

  tables: Table[] = [];
  showAddEditPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  isEditing: boolean = false;
  tableIdToDelete: number | null = null;
  tableForm: Table = {
    id: 0,
    number: '',
    capacity: 0,
    restaurant_id: 0,
  };

  constructor(private tableService: AllserviceService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getalltable().subscribe(
      (data) => {
        this.tables = data;
      },
      (error) => {
        console.error('Error loading tables:', error);
      }
    );
  }

  addTable(): void {
    this.tableService.addtable(this.tableForm).subscribe(
      () => {
        console.log('Table added successfully');
        this.loadTables();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Error adding table:', error);
      }
    );
  }

  updateTable(): void {
    this.tableService.updatable(this.tableForm.id, this.tableForm).subscribe(
      () => {
        console.log('Table updated successfully');
        this.loadTables();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Error updating table:', error);
      }
    );
  }

  openAddPopup(): void {
    this.isEditing = false;
    this.tableForm = {
      id: 0,
      number: '',
      capacity: 0,
      restaurant_id: 0,
    };
    this.showAddEditPopup = true;
  }

  openEditPopup(table: Table): void {
    this.isEditing = true;
    this.tableForm = { ...table };
    this.showAddEditPopup = true;
  }

  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  confirmDelete(tableId: number): void {
    this.showConfirmationPopup = true;
    this.tableIdToDelete = tableId;
  }

  deleteTable(): void {
    if (this.tableIdToDelete !== null) {
      this.tableService.deletable(this.tableIdToDelete).subscribe(
        () => {
          console.log('Table deleted successfully');
          this.loadTables();
          this.closeConfirmationPopup();
        },
        (error) => {
          console.error('Error deleting table:', error);
        }
      );
    }
  }

  closeConfirmationPopup(): void {
    this.showConfirmationPopup = false;
    this.tableIdToDelete = null;
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateTable();
    } else {
      this.addTable();
    }
  }
}
