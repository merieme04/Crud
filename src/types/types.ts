
export interface PaginatedResponse<T> {
  content: T[];          // Les données de la page actuelle
  totalElements: number; // Nombre total d'éléments
  totalPages: number;    // Nombre total de pages
  size: number;          // Taille de chaque page
  number: number;        // Numéro de la page actuelle
}


export type Person = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    cin: string;
    ville: 'CASABLANCA' | 'RABAT'  | '';
    telephone: string;
  };
  