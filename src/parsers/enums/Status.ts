export enum Status {
  ONGOING,
  COMPLETED,
}

export const stringToStatus = (str: string): Status => {
  const normalized = str.toUpperCase().replace(" ", "");
  return (normalized as unknown) as Status;
};
