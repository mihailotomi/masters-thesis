import { FormBuilder } from "@components";
import { createAnnouncementForm } from "./createAnnouncementConfig";
import { ErrorBoundaryProvider } from "@providers";

function Page() {
  return (
    <div className="d-flex justify-content-center mt-2">
      <FormBuilder
        form={createAnnouncementForm}
        onSubmit={() => {}}
        submitButtonContent={"Креирај обавештење"}
        title="Креирање обавештења"
      />
    </div>
  );
}

export const CreateAnnouncementPage = () => (
  <ErrorBoundaryProvider>
      <Page />
  </ErrorBoundaryProvider>
);
