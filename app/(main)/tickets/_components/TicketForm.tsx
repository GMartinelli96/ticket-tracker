"use client";
//Import necessari per il MarkDownEditor
import "easymde/dist/easymde.min.css";

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@radix-ui/themes';
import axios from 'axios';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import z from 'zod';

import MessaggioErrore from "@/app/components/MessaggioErrore";
import Spinner from "@/app/components/Spinner";
import { creaTicketSchema } from '@/app/validationSchemas';
import { Ticket } from "@prisma/client";

//Al posto di creare un'interfaccia uso lo schema, tanto la validazione è la stessa!
type TicketFormData = z.infer<typeof creaTicketSchema>

//Disabilito SSR per il MDE, infatti questo ha interazioni col client e non va bene!
const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"), 
  {
    ssr: false,
  }) 

const TicketForm = ( { ticket } : { ticket?: Ticket}) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TicketFormData>({
    resolver: zodResolver(creaTicketSchema),
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try{
      setIsSubmitting(true);
      await axios.post('/api/tickets', data)

      //Dopo aver salvato il ticket mando l'utente alla pagina dei ticket
      router.push('/tickets')
    }
    catch(err){
      setError("Qualcosa è andato storto nell'inserimento del ticket!")          
    }
    finally{
      setIsSubmitting(false);
    }
  })

  return (
    <div className='max-w-xl'>
      <form 
        className='space-y-3' 
        onSubmit={onSubmit}
      >
          <TextField.Root>
            <TextField.Input 
              defaultValue={ticket?.titolo}
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
            defaultValue={ticket?.descrizione}
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

export default TicketForm