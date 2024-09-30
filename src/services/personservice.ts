import axios from 'axios';
import { PaginatedResponse, Person } from '../types/types'; 
const API_URL = 'http://localhost:8081/api/persons';

// Créer une nouvelle personne
export const createPerson = async (person: Person): Promise<Person> => {
  try {
    const response = await axios.post<Person>(API_URL, person);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la personne:", error);
    throw new Error('Erreur lors de la création de la personne');
  }
};

// Récupérer une personne par ID
export const getPersonById = async (id: number): Promise<Person> => {
  try {
    const response = await axios.get<Person>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la personne avec l'ID ${id}:`, error);
    throw new Error(`Erreur lors de la récupération de la personne avec l'ID ${id}`);
  }
};

// Supprimer une personne par ID
export const deletePerson = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Erreur lors de la suppression de la personne avec l'ID ${id}:`, error);
    throw new Error(`Erreur lors de la suppression de la personne avec l'ID ${id}`);
  }
};

// Récupérer toutes les personnes
export const getAllPersons = async (searchTerm = '', page = 1, size = 7) => {
     try{
  const response = await axios.get<PaginatedResponse<Person>>(API_URL, {
    params: {
      keyword: searchTerm,
      page: page - 1,
      size: size,
    },
  });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error("Erreur lors de la récupération des données");
  }
};

// Mettre à jour une personne
export const updatePerson = async (id: number, personDetails: Person): Promise<Person> => {
  try {
    const response = await axios.put<Person>(`${API_URL}/${id}`, personDetails);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la personne avec l'ID ${id}:`, error);
    throw new Error(`Erreur lors de la mise à jour de la personne avec l'ID ${id}`);
  }
};

export const getPersonsByNom = async (searchTerm: string, page: number = 0, size: number = 5): Promise<PaginatedResponse<Person>> => {
  try {
    const response = await axios.get<PaginatedResponse<Person>>(
      `${API_URL}/search?keyword=${searchTerm}&page=${page}&size=${size}`
    );

    // Retourner directement la réponse paginée qui contient 'content' et les informations de pagination
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des personnes avec le nom`, error);
    throw new Error(`Erreur lors de la récupération des personnes avec le nom`);
  }
};