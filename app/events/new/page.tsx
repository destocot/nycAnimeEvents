import { CreateEventForm } from "@/components/create-event-form";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Fragment } from "react";

const CreateEventPage = async () => {
  return (
    <Fragment>
      <Header>
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </Header>

      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
          <CreateEventForm />
        </div>
      </main>
    </Fragment>
  );
};

export default CreateEventPage;
