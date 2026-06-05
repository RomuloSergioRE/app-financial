import type { ToastType } from "./style";

export interface ToastContentProps {
  type: ToastType;
  message: string;
  toastId: string | number;
}
