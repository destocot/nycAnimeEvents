import { PrintButton } from "@/components/print-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/lib/db";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type EventPageProps = { params: { id: string } };

const CreateEventPage = async ({ params }: EventPageProps) => {
  const eventId = params.id;

  const event = await db.event.findUnique({
    where: { eventId },
    include: { eventDates: true },
  });

  if (!event) notFound();

  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      {/* HEADER */}
      <div className="mb-4 sticky rounded-b top-0 bg-background/10 z-10 p-2 gap-2 backdrop-blur-lg">
        <div className="flex justify-between">
          <Link
            href="/"
            className="text-xl text-balance sm:text-2xl font-semibold tracking-tight"
          >
            Upcoming NYC Anime Events
          </Link>
          <PrintButton />
        </div>
      </div>

      {/* MAIN */}
      <main>
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle>{event.title}</CardTitle>
            <CardDescription className="leading-normal">
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.image ?? ""} alt={event.title} className="w-full" />
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={event.source}>
                More details
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* FOOTER */}
      <div className="h-8 my-4" />
    </div>
  );
};

export default CreateEventPage;
