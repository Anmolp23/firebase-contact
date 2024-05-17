import './App.css';
import Navbar from './components/Navbar';
import {FiSearch} from 'react-icons/fi'
import {AiFillPlusCircle} from 'react-icons/ai'
import { useEffect,useState } from 'react';
import {collection,getDocs,onSnapshot} from 'firebase/firestore';
import { db, auth } from './config/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';

function App() {
const [contacts,setContacts]=useState([]);
const [user, setUser] = useState(null);
const [isOpen,setOpen]=useState(false);
const onOpen=()=>{
  setOpen(true);
}

const onClose=()=>{
  setOpen(false);
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return () => unsubscribe();
}, []);

useEffect(()=>{
  const getContacts=async()=>{
  try{
  const contactsRef=collection(db,"contactss");

  onSnapshot(contactsRef,(snapshot)=>{
    const contactLists=snapshot.docs.map((doc)=>{
      return {
      id: doc.id,
      ...doc.data(),
    };
    });
    setContacts(contactLists);
    return contactLists;
  });
    }catch(error){
    console.log(error);
    }
    };
    getContacts();
  },[user]);

const handleSignIn = async () => {
  try {
    await signInWithEmailAndPassword(auth, 'test@gmail.com', 'anmol23');
  } catch (error) {
    console.log(error);
  }
};

const filterContacts = (e) => {
  const value = e.target.value;

  const contactsRef = collection(db, "contactss");

  onSnapshot(contactsRef, (snapshot) => {
    const contactLists = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const filteredContacts = contactLists.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );

    setContacts(filteredContacts);

    return filteredContacts;
  });
};

  return (
    <>
   <div className="mx-auto max-w-[370px] px-4">
   <Navbar />
   <button onClick={handleSignIn}></button>
   <div className='flex gap-3'>

   <div className='relative flex items-center flex-grow'>
    <FiSearch className='text-white ml-1 text-3xl absolute' />
    <input type="text" 
    className='h-10 flex-grow rounded-md border border-white bg-transparent text-white text-xl pl-10'  
    onChange={filterContacts}
    />
   </div>

   <div className='text-white text-5xl mt-1 cursor-pointer'>
    <AiFillPlusCircle onClick={onOpen} className='cursor-pointer text-5xl text-white'/>
   </div>

   </div>
   
   <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (
            "not found"
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
   <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
   </>
  );
}

export default App;
