import {  Pagination as BootstrapPagination, Spinner } from "react-bootstrap";
import { useState } from "react";

import { useGetAnnouncementsQuery } from "@api";

import styles from "./AnnouncementListPage.module.scss";
import AnnouncementThumbnail from "./AnnouncementThumbnail";
import { ErrorBoundaryProvider } from "@providers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <BootstrapPagination>
      <BootstrapPagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pages.map((page) => (
        <BootstrapPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </BootstrapPagination>
  );
};

const PageTemplate: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const { data, error, isLoading } = useGetAnnouncementsQuery({ page, pageSize });

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <div>Error loading announcements</div>;

  return (
    <div className={styles.announcementsList}>
      <div className="container">
        {/* Bootstrap row for thumbnails */}
        <div className="row">
          {data?.announcements.map((announcement) => (
            <div key={announcement.id} className="col-md-4 mb-3">
              <AnnouncementThumbnail announcement={announcement} />
            </div>
          ))}
        </div>

        {/* Pagination controls in a new row */}
        <div className="row">
          <div className="col-12 d-flex justify-content-center mt-3">
            <Pagination
              currentPage={data?.page || 1}
              totalPages={Math.ceil((data?.totalCount || 0) / pageSize)}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export const AnnounecementListPage = () => (
    <ErrorBoundaryProvider>
        <PageTemplate />
    </ErrorBoundaryProvider>
  );
