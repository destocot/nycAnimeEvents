import { CreateEventForm } from "@/components/create-event-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const CreateEventPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl min-h-screen">
      {/* HEADER */}
      <div className="mb-4 sticky rounded-b top-0 bg-background/10 z-10 p-2 gap-2 backdrop-blur-lg">
        <Link
          href="/"
          className="text-xl text-balance sm:text-2xl font-semibold tracking-tight"
        >
          Upcoming NYC Anime Events
        </Link>
      </div>

      {/* MAIN */}
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateEventForm />
          </CardContent>
        </Card>
      </main>

      {/* FOOTER */}
      <div className="h-8 my-4" />
    </div>
  );
};

export default CreateEventPage;
