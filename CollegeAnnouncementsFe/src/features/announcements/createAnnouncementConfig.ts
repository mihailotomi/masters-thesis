import { Form, required } from "@components";
import { AnnouncementAudienceType, AnnouncementPriorityType } from "@entities";

export type CreateAnnouncementFormBuilderType = {
    title: string;
    content: string;
    validUntil: string;
    priority: string;
    audience: string;
}

export const createAnnouncementForm: Form<CreateAnnouncementFormBuilderType> = {
    title: {
      type: "text",
      defaultValue: "",
      label: "Наслов",
      required: true,
      validators: [required()],
    },
    content: {
      type: "textarea",
      defaultValue: "",
      label: "Садржај",
      required: true,
      validators: [required()],
    },
    validUntil: {
      type: "text",
      defaultValue: "",
      label: "Важи до",
      required: true,
      validators: [required()],
    },
    priority: {
      type: "select",
      defaultValue: "",
      label: "Приоритет",
      options: [{value: AnnouncementPriorityType.CRITICAL, label:"ХИТНО"},
         {value: AnnouncementPriorityType.HIGH, label:"ВИСОК"},
         {value: AnnouncementPriorityType.CRITICAL, label:"НОРМАЛНО"}],
      required: true,
      validators: [required()],
    },
    audience: {
      type: "select",
      defaultValue: "",
      label: "Обавештење за",
      options: [{value: AnnouncementAudienceType.EMPLOYEES, label:"Запослене"},
        {value: AnnouncementAudienceType.STUDENTS, label:"Студенте"},
        {value: AnnouncementAudienceType.STUDENTS, label:"Све"}],
      required: true,
      validators: [required()],
    },
  };
  