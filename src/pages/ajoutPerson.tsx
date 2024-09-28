import { useState } from 'react';
import { createPerson } from '../services/personservice';
import { Person } from '../types/types';

export default function AjoutPerson() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [cin, setCin] = useState('');
  const [ville, setVille] = useState<'CASABLANCA' | 'RABAT' | ''>('');
  const [telephone, setTelephone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson: Person = { id: 0, nom, prenom, email, cin, ville, telephone }; 
    try {
      await createPerson(newPerson);
    
      setNom('');
      setPrenom('');
      setEmail('');
      setCin('');
      setVille('');
      setTelephone('');
      alert('Personne ajoutée avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la personne:', error);
    }
  };

  return (
    <div className='flex flex-col p-5 gap-4'>
      <div className=' text-black font-semibold text-lg'> Ajouter une Personne    </div>
      <div className=' w-full border border-gray-200'></div>
      <form className='flex flex-col gap-4 lg:gap-20 lg:pt-8' onSubmit={handleSubmit}>
        <div className='flex flex-row gap-6 lg:gap-32 lg:pl-20 '>
          <div className='flex flex-col text-gray-400 font-medium gap-16 lg:gap-12 pt-6 lg:pt-8 lg:p-6'>
             <label>Nom </label>
             <label>Prénom </label>
             <label>Email </label>
             <label>CIN </label>
             <label>Ville </label>
             <label>Telephone </label>
          </div>
          <div className='flex flex-col gap-11 lg:gap-8 p-4' >
              <input  className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 items-center border drop-shadow border-orange-200 '
               type="text" value={nom} name="nom" onChange={(e) => setNom(e.target.value)} required />
              <input  className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
               type="text" name="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
              <input  className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
               type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input  className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
               type="text" name="cin" value={cin} onChange={(e) => setCin(e.target.value)} required />
              <select className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
                name="ville" value={ville} onChange={(e) => setVille(e.target.value as 'CASABLANCA' | 'RABAT')} required>
                <option value="">Sélectionner une ville</option>
                <option value="CASABLANCA">Casablanca</option>
               <option value="RABAT">Rabat</option>
              </select>
              <input  className='w-96 rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
                type="text" name="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
          </div>
          <div className="hidden lg:flex">
      <img
        src="/images/ajoutLogo.jpg"
        alt="Paella dish"
        className=" w-72 h-72 m-14 ml-24 mt-20 "
      />
          </div>
           </div>
        <div  className=' flex w-full justify-end lg:pr-8  '>        
         <button className='bg-orange-400 items-center rounded-lg border drop-shadow shadow-lg border-orange-500 px-16 py-2 text-white'
          type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  );
}
