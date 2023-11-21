"use client";

import { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

//Import necessari per il MarkDownEditor
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { useRouter } from 'next/navigation';

interface TicketForm {
  titolo: string;
  descrizione: string;
}

const NewTicketPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<TicketForm>();
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
              {...register("titolo", { required: true })}
            />
          </TextField.Root>    
          
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

          <Button>Crea nuovo ticket</Button>
      </form>
    </div>
  )
}

export default NewTicketPage