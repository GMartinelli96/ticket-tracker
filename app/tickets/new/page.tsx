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
import z from 'zod';

import { creaTicketSchema } from '@/app/validationSchemas';

//Al posto di creare un'interfaccia uso lo schema, tanto la validazione è la stessa!
type TicketForm = z.infer<typeof creaTicketSchema>

const NewTicketPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TicketForm>({
    resolver: zodResolver(creaTicketSchema),
  });
  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color="red" className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
      )}
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit(async (data) => {
          try{
            await axios.post('/api/ticketssss', data)
    
            //Dopo aver salvato il ticket mando l'utente alla pagina dei ticket
            router.push('/tickets')
          }
          catch(err){
            setError("Qualcosa è andato storto nell'inserimento del ticket!")          
          }
          
        })}
      >
          <TextField.Root>
            <TextField.Input 
              placeholder='Titolo' 
              {...register("titolo")}
            />
          </TextField.Root>    
          {errors.titolo && (
            <Text color="red" as="p">
              {errors.titolo.message}
            </Text>
          )}

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
          {errors.descrizione && (
            <Text color="red" as="p">
              {errors.descrizione.message}
            </Text>
          )}

          <Button>Crea nuovo ticket</Button>
      </form>
    </div>
  )
}

export default NewTicketPage