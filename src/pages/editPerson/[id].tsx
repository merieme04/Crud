import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Person } from '@/types/types';
import { getPersonById, updatePerson } from '@/services/personservice';

export default function EditPerson() {
  const router = useRouter();
  const { id } = router.query; 

  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    nom: '',
    prenom: '',
    email: '',
    cin: '',
    ville: '',
    telephone: ''
  });

  // Charger les données de la personne en fonction de l'ID
  useEffect(() => {
    const fetchPerson = async () => {
      if (id) {
        try {
          const data = await getPersonById(Number(id)); 
          setPerson(data);
          setFormValues({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            cin: data.cin,
            ville: data.ville,
            telephone: data.telephone
          });
          setLoading(false);
        } catch (err) {
          setError('Erreur lors du chargement des données.');
          setLoading(false);
        }
      }
    };

    fetchPerson();
  }, [id]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (person) {
      try {
        const validVille = formValues.ville === 'CASABLANCA' || formValues.ville === 'RABAT' ? formValues.ville : '';
        await updatePerson(person.id, { ...formValues, id: person.id, ville: validVille });
                router.push('/getAllPerson'); 
      } catch (err) {
        setError('Erreur lors de la mise à jour des données.');
      }
    } 
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (loading) {
    return <div className='flex items-center justify-center w-40 rounded-lg 
    border drop-shadow border-orange-200 bg-orangebag py-4 px-6'>
      Chargement...</div>;
  }

  if (error) {
    return <div className='text-red-700'>{error}</div>;
  }

  return (

    <div className='flex flex-col p-5 gap-4'>
      <div className=' text-black font-semibold text-lg'> Modifier la personne    </div>
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
              name="nom"
              type="text" value={formValues.nom}
               onChange={handleChange} required />
              <input  className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
               type="text" name="prenom"
                value={formValues.prenom}  onChange={handleChange} required />
              <input  className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
               type="email" name="email"
               value={formValues.email} onChange={handleChange} required />
              <input  className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
               type="text" name="cin"
                value={formValues.cin}
               onChange={handleChange} required />
              <select className='w-auto rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
                 name="ville"
                 value={formValues.ville}
                 onChange={handleChange} required>
                <option value="">Sélectionner une ville</option>
                <option value="CASABLANCA">Casablanca</option>
               <option value="RABAT">Rabat</option>
              </select>
              <input  className='w-96 rounded-lg px-4 py-2 focus:outline-none focus:ring-0 border items-center drop-shadow border-orange-200 '
                type="text" name="telephone"
                value={formValues.telephone}
                onChange={handleChange} required />
          </div>
          <div className="h">
      <img
        src="/images/edtLogo.jpg"
        alt="Paella dish"
        className="hidden lg:flex w-80 h-72 m-14 ml-24 mt-20 "
      />
    </div>
            </div>
            <div  className=' flex w-full justify-end pr-8  '>        
            <button className='bg-orange-400 items-center rounded-lg border drop-shadow shadow-lg border-orange-500 px-16 py-2 text-white'
             type="submit">Sauvegarder</button>
           </div>
         </form>
    </div>

    
  );
}
