import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {
  isEditModalOpen = new BehaviorSubject(true);

  constructor() { }

  /* isEditModalOpen */
  getEditModalOpen() {
    return this.isEditModalOpen;
  }

  setEditModalOpen(isOpen: boolean) {
    this.isEditModalOpen.next(isOpen);
  }

}
