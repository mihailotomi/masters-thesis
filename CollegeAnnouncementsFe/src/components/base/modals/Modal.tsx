import { FC, PropsWithChildren, useEffect } from "react";
import { Modal as MD } from "react-bootstrap";

import { Button } from "../buttons";
import styles from "./Modal.module.scss";

export type ModalProps = {
  children: React.ReactNode;
  open?: boolean;
  title?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode | null;
  size?: "sm" | "lg" | "xl";
  headerClassName?: string;
  onClose?: () => void;
  onOpen?: () => void;
  onSave?: () => void;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open = false,
  title,
  header,
  footer,
  children,
  size = "lg",
  headerClassName,
  onClose,
  onOpen,
  onSave,
}: ModalProps) => {
  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleSave = () => {
    if (onSave) onSave();
    if (onClose) onClose();
  };

  const handleShow = () => {
    if (onOpen) onOpen();
  };

  useEffect(() => {
    if (open) {
      handleShow();
    }
  }, [open]);

  return (
    <MD size={size} show={open} onHide={handleClose}>
      {/* MODAL HEADER */}
      {header || (
        <MD.Header closeButton className={headerClassName || styles.header}>
          <MD.Title>{title ?? ""}</MD.Title>
        </MD.Header>
      )}
      {/* MODAL BODY */}
      <MD.Body>{children}</MD.Body>
      {/* MODAL FOOTER */}
      {footer === null ? (
        ""
      ) : (
        <MD.Footer>
          {footer || (
            <>
              <Button variant="outline-secondary" onClick={handleClose}>
                Zatvori
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Sačuvaj
              </Button>
            </>
          )}
        </MD.Footer>
      )}
    </MD>
  );
};
