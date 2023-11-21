"use client";

import React from 'react'
import { Button, TextField } from '@radix-ui/themes'

//Import necessari per il MarkDownEditor
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";


const NewTicketPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
          <TextField.Input placeholder='Titolo' />
        </TextField.Root>    
        <SimpleMDE placeholder='Descrizione problema' />
        <Button>Crea nuovo ticket</Button>
    </div>
  )
}

export default NewTicketPage