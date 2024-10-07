import { Header } from "@/components/header";
import { LinkButton } from "@/components/link-button";
import { Fragment } from "react";

const SubmitEventSuccessPage = async () => {
  return (
    <Fragment>
      <Header></Header>

      <main className="px-2 py-4 container mx-auto max-w-4xl">
        <div className="mt-4">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              Event Successfully Submitted
            </h1>
            <p className="opacity-50 text-sm max-w-prose">
              Thank you for submitting an event to the calendar. All events are
              subject to approval.
            </p>
            <div className="flex gap-2">
              <LinkButton href="/" label="Return to Home" />
              <LinkButton
                href="/events/new"
                variant="secondary"
                label="Submit Another Event"
              />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default SubmitEventSuccessPage;
