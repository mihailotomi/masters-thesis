import { useAuthCodePkce } from "@hooks";
import styles from "./LoginPage.module.scss";
import config from "@config";

const LoginPage = () => {
  const { getAuthorizationUrl } = useAuthCodePkce({
    authorizationUrl: config.environment.oidc.authorizationEndpoint,
    clientId: config.environment.oidc.clientId,
    redirectUrl: config.environment.oidc.loginCallbackUrl,
  });

  const onButtonClick = async () => {
    const authorizationUrl = await getAuthorizationUrl();
    window.location.href = authorizationUrl;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className={`card text-center p-5 ${styles.card}`} style={{ width: "30rem" }}>
        <div className="card-body">
          <div className="mb-4">
            <img src="/assets/logo.png" alt="Logo" className={`img-fluid ${styles.logo}`} />
            <h2>OБАВЕШТЕЊА</h2>
          </div>
          <button className={`btn btn-primary w-100 ${styles.btnPrimary}`} onClick={onButtonClick}>
            Пријави се
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
