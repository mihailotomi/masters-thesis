import { toast } from "react-toastify";

export function success(text: string) {
  toast.success(text, {
    className: "toast-success-container",
  });
}

export function danger(text: string) {
  toast.error(text, {
    className: "toast-error-container",
  });
}

export function warn(text: string) {
  toast.warn(text, {
    className: "toast-warn-container",
  });
}

export function info(text: string) {
  toast.info(text, {
    className: "toast-info-container",
  });
}
