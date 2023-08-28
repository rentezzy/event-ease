import { Dayjs } from "dayjs";
import { eventTheme } from "../services/theme";

export type TEvent = {
  eid: string;
  invitationText: string;
  endAt: string;
  startAtDay: string;
  startAt: string;
  title: string;
  createdAt: CreatedAt;
  createdBy: string;
  description: string;
  theme: keyof typeof eventTheme;
  invited: string[];
  accepted: string[];
  declined: string[];
};
export type TCreateEvent = Omit<
  TEvent,
  | "endAt"
  | "startAt"
  | "accepted"
  | "declined"
  | "createdBy"
  | "createdAt"
  | "startAtDay"
  | "eid"
> & {
  startAt: Dayjs;
  endAt: Dayjs;
};
interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}
