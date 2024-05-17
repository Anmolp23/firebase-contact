import React from 'react'
import Modal from './Modal'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { collection,addDoc, updateDoc,doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {

const addContact=async(contact)=>{
try{
const contactRef=collection(db,"contactss");
await addDoc(contactRef,contact);
onClose();
alert("contact saved successfully");
}catch(error){
    console.log(error);
}
}

const updateContact=async(contact,id)=>{
try{
const contactRef=doc(db,"contactss",id);
await updateDoc(contactRef,contact);
onClose();
alert("contact updated successfully");
}catch(error){
console.log(error);
}
}

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
    <Formik
    validationSchema={contactSchemaValidation}
    initialValues={
        isUpdate ? {
            name:contact.name,
            email:contact.email,
        }:{
        name:"",
        email:"",
        }
    }
    onSubmit={(values)=>{
        console.log(values);
        isUpdate ? updateContact(values, contact.id) : addContact(values);
    }}
    >
    <Form className='flex flex-col gap-4'>
    <div className='flex flex-col gap-3'>
    <label htmlFor='name'>Name</label>
    <Field name="name" className='h-10 border' />
    </div>
    <div className='flex flex-col gap-3'>
    <label htmlFor='email'>Email</label>
    <Field name="email" className='h-10 border' />
    </div>
    <button type="submit" className=' self-end border bg-orange px-3 py-1.5'>
    {isUpdate ? "update": "Add"}Contact</button>
    </Form>
    </Formik>

    </Modal>
    </>
  )
}

export default AddAndUpdateContact