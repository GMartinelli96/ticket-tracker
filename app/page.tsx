import prisma from "@/prisma/client";
import RiepilogoTicket from "./components/RiepilogoTicket";
import { TicketStato } from "@prisma/client";
import TicketGrafici from "./components/TicketGrafici";
import { Flex, Grid } from "@radix-ui/themes";
import UltimiTicket from "./components/UltimiTicket";

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

  return <Grid columns={{initial: "1", md:"2"}} gap="5" >
      <Flex direction="column" gap="4">
        <RiepilogoTicket aperti={aperti} chiusi={chiusi} inLavorazione={inLavorazione}  />
        <TicketGrafici aperti={aperti} chiusi={chiusi} inLavorazione={inLavorazione} />
      </Flex>
      <UltimiTicket />
  </Grid>;
}