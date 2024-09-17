import { Card } from "react-bootstrap";

import { Announcement, AnnouncementPriorityType } from "@entities";

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
    console.log(thumbnailColor);
    
    const formattedDate = formatDate(announcement.validUntil);
  
    return (
      <Card className={`text-white mb-3`} bg={thumbnailColor}>
        <Card.Body>
          <Card.Title>{announcement.title}</Card.Title>
          <Card.Text>{announcement.content}</Card.Text>
          <Card.Footer className="text-end">
            <small>Važi do: {formattedDate}</small>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  };

export default AnnouncementThumbnail;
