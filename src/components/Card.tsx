import { FaRegEdit } from 'react-icons/fa';
import { Person } from '../types/types';
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from 'next/router';


const Card = ({ person, onDelete }: CardProps) => {

  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/editPerson/${id}`); // Redirige vers /edit/[id] (page de modification)
  };


  return (
    <div className='flex flex-col lg:flex-row text-sm lg:text-base bg-orangebag justify-between items-center gap-2 rounded-lg border drop-shadow border-orange-200 py-4 px-6'>
      <div className='w-full font-medium text-base '>{person.nom} {person.prenom}</div>
      <div className='w-full'>{person.email}</div>
      <div className='w-full'>{person.cin}</div>
      <div className='w-full'>{person.ville}</div>
      <div className='w-full'>{person.telephone}</div>
      <div className='flex flex-row justify-end w-full lg:w-auto lg:gap-5 gap-3 '>
      <button className=' text-orange-400 px-5' onClick={() => handleEdit(person.id)}>
          <FaRegEdit />
        </button>
      <button className=' text-orange-400 px-5 ' onClick={() => onDelete(person.id)} >
      <RiDeleteBinLine />
      </button>
      </div>
    </div>
  );
};


interface CardProps {
  person: Person;
  onDelete: (id: number) => void;
}

export default Card;
