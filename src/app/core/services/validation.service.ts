import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  forbiddenFilterValues = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s]/

  validateName(name: string) {
      return this.forbiddenFilterValues.test(name);
  }
}
