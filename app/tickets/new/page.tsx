"use client";

import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
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

  return (
    <form 
      className='max-w-xl space-y-3' 
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/tickets', data)

        //Dopo aver salvato il ticket mando l'utente alla pagina dei ticket
        router.push('/tickets')
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
  )
}

export default NewTicketPage