export enum Status {
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  INVALID_STATUS = "INVALID_STATUS",
}

export const stringToStatus = (str: string): Status => {
  const normalized = str.toUpperCase().replace(" ", "");
  if (
    !Object.values(Status).includes((normalized as unknown) as Status) ||
    normalized === Status.INVALID_STATUS
  )
    return Status.INVALID_STATUS;
  return (normalized as unknown) as Status;
};
