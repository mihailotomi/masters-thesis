import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for navigation
import { useGetAnnouncementByIdQuery } from "@api"; // Assuming you have an API hook to fetch a single announcement

const dummyPdfUrl = "http://www.ftn.kg.ac.rs/docs/65774-Obavestenje%20o%20pocetku%20skol.%20godine%20.pdf";

const AnnouncementDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the ID from the URL
  const { data: announcement, error, isLoading } = useGetAnnouncementByIdQuery(id!); // Fetch the announcement details

  if (isLoading) return <div>Loading...</div>;
  if (error || !announcement) return <div>Error loading announcement details</div>;

  return (
    <div className="d-flex
      flex-column
      justify-content-center align-items-center w-100 h-100 mt-5">

    <Card className="mb-3 col-8 ms-5">
      <Card.Body>
        <Card.Title>{announcement.title}</Card.Title>
        <Card.Text>{announcement.content}</Card.Text>

        {/* If the announcement has documents, show the dummy PDF */}
        {announcement.documents && announcement.documents.length > 0 && (
            <div>
            <h5>Документи
            </h5>
            <iframe
              src={dummyPdfUrl}
              title="Dummy PDF"
              width="100%"
              height="750px"
              ></iframe>
            <div className="mt-2">
              <Button href={dummyPdfUrl} target="_blank" variant="primary">
                Преузми
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
        </div>
  );
};

export default AnnouncementDetails;