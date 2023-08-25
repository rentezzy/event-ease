export type TUser = {
  displayName: string;
  avatar: string;
  contacts: TContacts;
};
export type TContacts = {
  friends: { name: "Friends"; users: string[] };
} & Record<string, TContactGroup>;
export type TContactGroup = {
  name: string;
  users: string[];
};
