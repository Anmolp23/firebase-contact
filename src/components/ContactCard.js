import { deleteDoc,doc } from 'firebase/firestore';
import React from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclouse from '../hooks/useDisclouse';

const ContactCard = ({contact}) => {
  const {isOpen,onClose,onOpen}=useDisclouse();
  
  const deleteContact=async(id)=>{
    try{
      await deleteDoc(doc(db,"contactss",id));
      alert("contact deleted successfully");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <div key={contact.id} className='bg-yellow flex justify-between items-center p-4 rounded-lg mt-4'>
    <div className='flex gap-2'>
    <HiOutlineUserCircle className='text-orange text-5xl'/>
    <div className='font-medium'>
      <h2 className='font-bold'>{contact.name}</h2>
      <p className='text-sm'>{contact.email}</p>
    </div>
    </div>
    <div className='flex gap-2 ml-4' >
      <RiEditCircleLine className='text-xl text-slate-900 cursor-pointer mt-1' onClick={onOpen} />
      <IoMdTrash className='text-2xl text-orange cursor-pointer' onClick={()=>deleteContact(contact.id)} />
    </div>
  </div>
  <AddAndUpdateContact 
  contact={contact} 
  isUpdate 
  isOpen={isOpen} 
  onClose={onClose}
  />
  </>
  )
}

export default ContactCard