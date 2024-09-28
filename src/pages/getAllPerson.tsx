import { useEffect, useState } from 'react';
import { getAllPersons, deletePerson } from '../services/personservice';
import { Person } from '../types/types';
import Card from '@/components/Card';
import { IoSearchOutline } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

export default function GetAllPerson() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([]); 

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Nombre de personnes par page

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const data = await getAllPersons();
        setPersons(data);
        setFilteredPersons(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données.');
        setLoading(false);
      }
    };

    fetchPersons();
  }, []);

  // Fonction pour gérer la recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filtrer les personnes en fonction du terme de recherche
    const filtered = persons.filter(person =>
      person.nom.toLowerCase().includes(value.toLowerCase()) || // Recherche par nom
      person.prenom.toLowerCase().includes(value.toLowerCase()) // Recherche par prénom
    );
    
    setFilteredPersons(filtered);
    setCurrentPage(1); // Reset pagination lors de la recherche
  };

  // Fonction pour supprimer une personne
  const handleDelete = async (id: number) => {
    try {
      await deletePerson(id);
      // Met à jour l'état après suppression
      const updatedPersons = persons.filter(person => person.id !== id);
      setPersons(updatedPersons);
      setFilteredPersons(updatedPersons);
    } catch (err) {
      setError(`Erreur lors de la suppression de la personne avec l'ID ${id}.`);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);
  const indexOfLastPerson = currentPage * itemsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - itemsPerPage;
  const currentPersons = filteredPersons.slice(indexOfFirstPerson, indexOfLastPerson);

  // Gérer la navigation entre les pages
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className='flex items-center justify-center w-40 rounded-lg 
    border drop-shadow border-orange-200 bg-orangebag py-4 px-6'>
      Chargement...</div>;
  }

  if (error) {
    return <div className='text-red-800'>{error}</div>;
  }

  return (
    <div className='flex flex-col px-5 py-3 gap-4'>
      <div className='flex justify-end items-center gap-6 '>
        <div className='flex flex-row w-80 border items-center border-gray-200 rounded-lg'>
          <input
            className='w-full border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-0'
            type="text"
            placeholder="Rechercher... "
            value={searchTerm}
            onChange={handleSearch}
          />
          <IoSearchOutline className='text-gray-500 mx-4' size={24} />
        </div>
        <IoMdNotificationsOutline className='text-gray-500 mr-6' size={24} />
      </div>
      <div className='text-start text-black font-semibold text-lg'>Liste des personnes</div>
      <div className='border border-gray-200'></div>

      <div className='hidden lg:flex flex-row text-gray-400 font-medium justify-between items-center px-6'>
        <div className='w-full'>Nom</div>
        <div className='w-full'>Email</div>
        <div className='w-full'>CIN</div>
        <div className='w-full'>Ville</div>
        <div className='w-full pr-40'>Numéro</div>
      </div>
      
      <div className='flex flex-col gap-2'>
        {currentPersons.map((person) => (
          <Card key={person.id} person={person} onDelete={handleDelete} />
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-end mt-4 gap-4'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded text-gray-100 ${currentPage === 1 ? 'bg-gray-100' : 'bg-gray-300 text-gray-700'}`}
        >
          <MdArrowBackIos />
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded text-gray-100 ${currentPage === totalPages ? 'bg-gray-100' : 'bg-gray-300 text-gray-700'}`}    >
          <MdArrowForwardIos />
        </button>
      </div>


    </div>
  );
}
