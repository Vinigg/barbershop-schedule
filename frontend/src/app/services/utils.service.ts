import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatPhoneNumber(phone: string): string {
    if (!phone) return '';

    // Remove todos os caracteres não numéricos
    const cleaned = phone.replace(/\D/g, '');

    // Aplica a máscara: (XX)XXXXX-XXXX ou (XX)XXXX-XXXX
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]})${match[2]}-${match[3]}`;
    }

    return phone; // Retorna o original se não for possível formatar
  }
}
