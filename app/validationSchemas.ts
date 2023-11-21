import * as z from "zod";

export const creaTicketSchema = z.object({
    titolo: z.string().min(1, 'Titolo è obbligatorio').max(255, 'Titolo troppo lungo! Massimo 255 caratteri consentiti!'),
    descrizione: z.string().min(1, 'Descrizione è obbligatoria'),
});
