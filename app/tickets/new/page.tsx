"use client";

import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewTicketPage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
          <TextField.Input placeholder='Titolo' />
        </TextField.Root>    
        <TextArea placeholder='Descrizione problema' />
        <Button>Crea nuovo ticket</Button>
    </div>
  )
}

export default NewTicketPage