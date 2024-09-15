import { AppModeType, Environment } from "./environment.types";

export const stagingEnv: Environment = {
  mode: AppModeType.staging,
  manualActionsStartDate: "2018-07-31T12:00:00.000Z",
  tweakPollInterval: 20000,
  bdmApi: {
    client: "https://dev.masterteam.backoffice.codebehind.tech/",
    host: "https://dev.masterteam.monitoring.codebehind.tech/",
    serverSideZone: "+01:00",
    dateTimeFormat: "DD.MM.YYYY HH:mm",
    dateFormat: "DD.MM.YYYY",
    language: "SR",
  },
};
