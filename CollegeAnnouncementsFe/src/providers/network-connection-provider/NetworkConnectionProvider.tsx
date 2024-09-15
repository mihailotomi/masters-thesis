import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import { MdOutlineSignalWifiConnectedNoInternet4, MdOutlineSignalWifi4Bar } from "react-icons/md";

import { useNetworkState } from "@hooks";

import styles from "./NetworkConnectionProvider.module.scss";

export const NetworkConnectionProvider: FC<PropsWithChildren> = ({ children }) => {
  const networkState = useNetworkState();
  const [showModal, setShowModal] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!networkState.online) {
      setShowModal(true);
      setWasOffline(true);
    } else if (wasOffline) {
      setShowModal(true);
      setWasOffline(false);
      setTimeout(() => setShowModal(false), 2000);
    }
  }, [networkState.online]);

  return (
    <>
      {showModal && (
        <Modal show={showModal} className={styles.modal}>
          <Modal.Body
            className={classNames([
              networkState.online ? styles.modal__success : styles.modal__error,
              styles.modal__body,
            ])}
          >
            {networkState.online ? (
              <div>
                <MdOutlineSignalWifi4Bar className={styles.modal__icon} />
              </div>
            ) : (
              <div>
                <MdOutlineSignalWifiConnectedNoInternet4 className={styles.modal__icon} />
              </div>
            )}

            <p className={styles.modal__message}>
              {networkState.online
                ? "Internet konekcija uspostaljena."
                : "Nema internet konekcije!"}
            </p>
          </Modal.Body>
        </Modal>
      )}
      {children}
    </>
  );
};
