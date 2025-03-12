import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

export interface Tag {
  name: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  number: string;
  tags: Tag[];
}

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: []
})
export class ClientFormComponent implements OnInit {

  @Input() data: Client | null = null;
  form: FormGroup;

  statuses = ['Ativo', 'Atrasado', 'Cancelado'];
  showDeleteConfirm = false;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      number: ['', Validators.required],
      tags: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        email: this.data.email,
        status: this.data.status,
        number: this.data.number
      });

      this.data.tags.forEach(tag => this.addTag(tag.name));
    }
  }

  // TAGS
  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }
  addTag(tagName: string): void {
    this.tags.push(this.fb.control(tagName));
  }
  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  // SAVE
  saveData() {
    if (this.form.valid) {
      if(this.data){
        this.clientService.updateClient(this.form.value, this.data.id)
      }else{
        this.clientService.createClient(this.form.value)
      }
    } else {
      console.log('Form is invalid');
    }
  }

    // DELETE
    showDeleteConfirmation() {
      this.showDeleteConfirm = true;
    }
    confirmDelete() {
      this.showDeleteConfirm = false;
    }
    cancelDelete() {
      this.showDeleteConfirm = false;
    }
}
