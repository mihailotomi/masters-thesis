import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ThumbnailAnnouncement.module.scss';

interface ThumbnailProps {
  title: string;
  priority: string;
  content: string;
}

export const Thumbnail = ({ title, priority, content }: ThumbnailProps) => {
  return (
    <div className={`card ${styles.thumbnailCard}`} style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Priority: {priority}
        </h6>
        <p className="card-text">
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </p>
        <a href="#" className="btn btn-primary">Read More</a>
      </div>
    </div>
  );
};

