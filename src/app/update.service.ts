import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private updates: SwUpdate) {
    if (this.updates.isEnabled) {
      this.updates.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          this.promptUser();
        }
      });
    }
  }

  private promptUser() {
    if (confirm('A new version of the app is available. Do you want to update?')) {
      this.updates.activateUpdate().then(() => document.location.reload());
    }
  }
}
