import prisma from "@/prisma/client";
import RiepilogoTicket from "./components/RiepilogoTicket";
import { TicketStato } from "@prisma/client";
import TicketGrafici from "./components/TicketGrafici";

export default async function Home() {
  const aperti = await prisma.ticket.count({
    where: { stato: TicketStato.APERTO },
  });
  const inLavorazione = await prisma.ticket.count({
    where: { stato: TicketStato.IN_LAVORAZIONE },
  });
  const chiusi = await prisma.ticket.count({
    where: { stato: TicketStato.CHIUSO },
  });

  return <TicketGrafici aperti={aperti} inLavorazione={inLavorazione} chiusi={chiusi} />;
}