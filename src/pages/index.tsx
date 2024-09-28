import Card from "@/components/Card";
import localFont from "next/font/local";
import Link from "next/link";



export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen justify-center items-center bg-cover bg-center bg-no-repeat gap-20 lg:gap-36"
    style={{ backgroundImage: "url('/images/baground.jpg')" }}>

   <Link href="/ajoutPerson">
  <div className='flex justify-center items-center text-lg lg:text-xl font-semibold bg-orangebag w-80 h-40 lg:w-96 lg:h-48 rounded-lg border drop-shadow-lg shadow-lg border-orange-500 text-orange-400'>
    Ajouter une personne
  </div>
  </Link>
  <Link href="/getAllPerson">
  <div className='flex justify-center items-center text-lg lg:text-xl font-semibold bg-orangebag w-80 h-40 lg:w-96 lg:h-48 rounded-lg border drop-shadow-lg shadow-lg border-orange-500 text-orange-400'>
    Consulter les personnes
      </div>
      </Link>
     </div>

  );
}
