import { eventTheme } from "../services/theme";

export type TEvent = {
  invitationText: string;
  endAt: string;
  startAtDay: string;
  startAt: string;
  title: string;
  createdAt: CreatedAt;
  description: string;
  theme: keyof typeof eventTheme;
  invited: string[];
};

interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}
