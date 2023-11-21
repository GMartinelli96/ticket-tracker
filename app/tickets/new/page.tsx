"use client";
//Import necessari per il MarkDownEditor
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import z, { set } from 'zod';

import { creaTicketSchema } from '@/app/validationSchemas';
import MessaggioErrore from "@/app/components/MessaggioErrore";
import Spinner from "@/app/components/Spinner";

//Al posto di creare un'interfaccia uso lo schema, tanto la validazione è la stessa!
type TicketForm = z.infer<typeof creaTicketSchema>

const NewTicketPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TicketForm>({
    resolver: zodResolver(creaTicketSchema),
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className='max-w-xl'>
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit(async (data) => {
          try{
            setIsSubmitting(true);
            await axios.post('/api/ticketssss', data)
    
            //Dopo aver salvato il ticket mando l'utente alla pagina dei ticket
            router.push('/tickets')
          }
          catch(err){
            setError("Qualcosa è andato storto nell'inserimento del ticket!")          
          }
          finally{
            setIsSubmitting(false);
          }
          
        })}
      >
          <TextField.Root>
            <TextField.Input 
              placeholder='Titolo' 
              {...register("titolo")}
            />
          </TextField.Root>    
          <MessaggioErrore>
            {errors.titolo?.message}
          </MessaggioErrore>

          <Controller 
            name='descrizione'
            control={control}
            render={({ field }) => (
              <SimpleMDE 
                placeholder='Descrizione problema' 
                {...field}
              />
            )}
          />    
          <MessaggioErrore>
            {errors.descrizione?.message}
          </MessaggioErrore>

          <Button disabled={isSubmitting}>
            Crea nuovo ticket
            {isSubmitting && <Spinner />}
          </Button>
      </form>
    </div>
  )
}

export default NewTicketPage