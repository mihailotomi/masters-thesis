import config from "@config";
import { useAuthCodePkce, useJwt } from "@hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useGetKeyListMutation, useGetUserTokenMutation } from "@store";
import { authActions } from "@reducers";
import { alertService } from "@providers";

export function useLoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { getAuthorizationUrl, getTokenUrl } = useAuthCodePkce({
    authorizationUrl: config.environment.oidc.authorizationEndpoint,
    clientId: config.environment.oidc.clientId,
    redirectUrl: config.environment.oidc.loginCallbackUrl,
  });

  const [getUserToken] = useGetUserTokenMutation();
  const [getKeyList] = useGetKeyListMutation();

  const { verifyAndDecodeJwe } = useJwt();

  const onLoginSuccess = ({
    token,
    user,
  }: {
    token: string;
    user: any;
  }) => {
    dispatch(
      authActions.setCurrentUser({
        token: token,
        id: user.sub,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
        username: user.preferred_username,
      }),
    );
    alertService.success(`Zdravo, ${user?.name}`);
    navigate(state?.returnTo || "/", { replace: true });
  };

  const onLoginError = () => {
    navigate("/login");
    alertService.danger("Nešto je pošlo po zlu!");
  };

  const getAndVerifyTokens = async (code: string) => {
    const data = await getUserToken(getTokenUrl(code)).unwrap();
    const keyList = await getKeyList(config.environment.oidc.keyListEndpoint).unwrap();
    const user = await verifyAndDecodeJwe(data.id_token, keyList.keys);

    onLoginSuccess({token:data.access_token, user})

    return { token: data.access_token, user, id_token: data.id_token };
  };

  return { getAndVerifyTokens, getAuthorizationUrl, onLoginError };

}
