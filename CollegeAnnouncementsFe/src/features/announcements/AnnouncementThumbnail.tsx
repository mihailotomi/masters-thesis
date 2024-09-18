import { Card } from "react-bootstrap";

import { Announcement, AnnouncementPriorityType } from "@entities";
import { FaFileAlt } from "react-icons/fa";

interface AnnouncementThumbnailProps {
  announcement: Announcement;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  
  const getThumbnailColor = (priority: AnnouncementPriorityType) => {
    console.log(priority);
    
    switch (priority) {
      case AnnouncementPriorityType.CRITICAL:
        return "danger";
      case AnnouncementPriorityType.HIGH:
        return "warning";
      case AnnouncementPriorityType.NORMAL:
        return "secondary"; 
      default:
        return "secondary";
    }
  };
  
  interface AnnouncementThumbnailProps {
    announcement: Announcement;
  }
  
  const AnnouncementThumbnail: React.FC<AnnouncementThumbnailProps> = ({ announcement }) => {
    const thumbnailColor = getThumbnailColor(announcement.priority);
    const formattedDate = formatDate(announcement.validUntil);
    const hasDocuments = announcement.documents && announcement.documents.length > 0;
  
    return (
      <Card className={`text-white mb-3`} bg={thumbnailColor}>
        <Card.Body className={`position-relative ${hasDocuments ? "pe-5" : ""}`}>
          {/* Conditionally render the file icon */}
          {hasDocuments && (
            <FaFileAlt
              size={24}
              className="position-absolute top-0 end-0 m-2"
              title="Has attached documents"
            />
          )}
          <Card.Title>{announcement.title}</Card.Title>
          <Card.Text>{announcement.content}</Card.Text>
          <Card.Footer className="text-end">
            <small>Важи до: {formattedDate}</small>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  };

export default AnnouncementThumbnail;
