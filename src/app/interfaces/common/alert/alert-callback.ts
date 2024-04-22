import {Alert} from "./alert";

export interface AlertCallback {
  (alert: Alert): void;
}
