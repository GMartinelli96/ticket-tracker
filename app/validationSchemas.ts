import * as z from "zod";

export const ticketSchema = z.object({
    titolo: z.string().min(1, 'Titolo è obbligatorio').max(255, 'Titolo troppo lungo! Massimo 255 caratteri consentiti!'),
    descrizione: z.string().min(1, 'Descrizione è obbligatoria'),
});

export const patchTicketSchema = z.object({
    titolo: z.string().min(1, 'Titolo è obbligatorio').max(255, 'Titolo troppo lungo! Massimo 255 caratteri consentiti!').optional(),
    descrizione: z.string().min(1, 'Descrizione è obbligatoria').optional(),
    incaricatoId: z.string().min(1, 'Incaricato è obbligatorio').max(255).optional().nullable(),
});
