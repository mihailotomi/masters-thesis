import { Loader } from "../loader";

export const AppLoader = () => {
  return (
    <div
      className="d-flex
      flex-column
      justify-content-center align-items-center w-100 h-100 position-fixed top-0 left-0 bg-white bg-opacity-25 z-50"
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: "140px",
          height: "140px",
          maxWidth: "140px",
          maxHeight: "140px",
        }}
      >
        <Loader size="x-large" />
      </div>
      <div className="sr-only mt-4">
        <p className="text-secondary display-6 text-center">Dobrodošli,</p>
        <p className="text-secondary h5">aplikacija se učitava...</p>
      </div>
    </div>
  );
};
