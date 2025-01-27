import { Component, OnInit } from '@angular/core';
import { AllserviceService } from '../serviceall/allservice.service';

interface Command {
  id: number;
  date: string;
  client_id: number;
  restaurant_id: number;
}

@Component({
  selector: 'app-gestion-commande',
  templateUrl: './gestion-commande.component.html',
  styleUrls: ['./gestion-commande.component.css']
})
export class GestionCommandeComponent implements OnInit {

  commands: Command[] = [];
  showAddEditPopup: boolean = false;
  showConfirmationPopup: boolean = false;
  isEditing: boolean = false;
  commandIdToDelete: number | null = null;
  commandForm: Command = {
    id: 0,
    date: '',
    client_id: 0,
    restaurant_id: 0,
  };

  constructor(private commandService: AllserviceService) {}

  ngOnInit(): void {
    this.loadCommands();
  }

  loadCommands(): void {
    this.commandService.getcommands().subscribe(
      (data) => {
        this.commands = data;
      },
      (error) => {
        console.error('Error loading commands:', error);
      }
    );
  }

  addCommand(): void {
    this.commandService.addCommand(this.commandForm).subscribe(
      () => {
        console.log('Command added successfully');
        this.loadCommands();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Error adding command:', error);
      }
    );
  }

  updateCommand(): void {
    this.commandService.updatecommand(this.commandForm.id, this.commandForm).subscribe(
      () => {
        console.log('Command updated successfully');
        this.loadCommands();
        this.closeAddEditPopup();
      },
      (error) => {
        console.error('Error updating command:', error);
      }
    );
  }

  openAddPopup(): void {
    this.isEditing = false;
    this.commandForm = {
      id: 0,
      date: '',
      client_id: 0,
      restaurant_id: 0,
    };
    this.showAddEditPopup = true;
  }

  openEditPopup(command: Command): void {
    this.isEditing = true;
    this.commandForm = { ...command };
    this.showAddEditPopup = true;
  }

  closeAddEditPopup(): void {
    this.showAddEditPopup = false;
  }

  confirmDelete(commandId: number): void {
    this.showConfirmationPopup = true;
    this.commandIdToDelete = commandId;
  }

  deleteOrder(): void {
    if (this.commandIdToDelete !== null) {
      this.commandService.deletecommand(this.commandIdToDelete).subscribe(
        () => {
          console.log('Command deleted successfully');
          this.loadCommands();
          this.closeConfirmationPopup();
        },
        (error) => {
          console.error('Error deleting command:', error);
        }
      );
    }
  }

  closeConfirmationPopup(): void {
    this.showConfirmationPopup = false;
    this.commandIdToDelete = null;
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateCommand();
    } else {
      this.addCommand();
    }
  }
}
