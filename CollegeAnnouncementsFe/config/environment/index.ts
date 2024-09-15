import { devEnv } from "./development";
import { AppModeType, Environment } from "./environment.types";
import { stagingEnv } from "./staging";

const getEnv = (): Environment => {
  switch (import.meta.env.MODE as AppModeType) {
    case AppModeType.staging:
      return stagingEnv;
    default:
      return devEnv;
  }
};

export default getEnv();
