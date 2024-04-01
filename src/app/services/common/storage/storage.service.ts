import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    console.log('is storage null: ' + this._storage)
    this.init().then(() => console.log('StorageService initialized'));
  }

  async init() {
    this._storage = await this.storage.create();
  }

  public get(key: string) {
    return this._storage?.get(key);
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }
}
