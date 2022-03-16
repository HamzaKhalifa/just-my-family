export enum RelationshipEnum {
  Unset = 'Unset',
  Father = 1,
  Mother = 2,
  Brother = 3,
  Sister = 4,
  Son = 5,
  Daughter = 6,
  Wife = 7,
  Husband = 8,
}

export const relationshipEnumToText = (relationshipEnum?: RelationshipEnum): string => {
  if (!relationshipEnum) return ''

  let associations = {
    [RelationshipEnum.Unset]: 'Unset',
    [RelationshipEnum.Father]: 'Father',
    [RelationshipEnum.Mother]: 'Mother',
    [RelationshipEnum.Brother]: 'Brother',
    [RelationshipEnum.Sister]: 'Sister',
    [RelationshipEnum.Son]: 'Son',
    [RelationshipEnum.Daughter]: 'Daughter',
    [RelationshipEnum.Wife]: 'Wife',
    [RelationshipEnum.Husband]: 'Husband',
  }

  return associations[relationshipEnum] || 'Unset'
}
