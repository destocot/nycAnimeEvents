import { Header } from "@/components/header";
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
import { Fragment } from "react";

type EventPageProps = { params: { id: string } };

const CreateEventPage = async ({ params }: EventPageProps) => {
  const eventId = params.id;

  const event = await db.event.findUnique({
    where: { eventId },
    include: { eventDates: true },
  });

  if (!event) notFound();

  return (
    <Fragment>
      <Header>
        <PrintButton />
      </Header>

      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <Card className="border-0 sm:border">
          <CardHeader className="space-y-2">
            <CardTitle>{event.title}</CardTitle>
            <CardDescription className="leading-normal">
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.image ?? "/placeholder.jpg"}
              alt={event.title}
              className="w-full aspect-video rounded object-cover object-top"
            />
          </CardContent>
          <CardFooter className="justify-end">
            <Button asChild>
              <Link href={event.source}>
                More details
                <ArrowRightIcon size={16} className="ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </Fragment>
  );
};

export default CreateEventPage;
