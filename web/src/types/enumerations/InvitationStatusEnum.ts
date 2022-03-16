export enum InvitationStatusEnum {
  Pending = 0,
  Received = 1,
  Approved = 2,
}

export const invitationStatusEnumToText = (
  status: InvitationStatusEnum
): string => {
  const statusTextAssociation = {
    [InvitationStatusEnum.Pending]: 'Pending',
    [InvitationStatusEnum.Approved]: 'Approved ❤',
    [InvitationStatusEnum.Received]: 'Received',
  }

  return statusTextAssociation[status] || ''
}
