// #region Configuration model definitions
export interface Configurable {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string;
}

// Address country type definitions
export interface Country extends Configurable {}

// Address city type definitions
export interface City extends Configurable {
  countryId: number;
}

// Address district type definitions
export interface District extends Configurable {}

// Clients civil state type definitions
export interface CivilState extends Configurable {}

// Clients Sex(M|F) type definitions
export interface Sex extends Configurable {}

// Clients marital status type definitions
export interface MaritalStatus extends Configurable {}

// Clients document types type definitions
export interface DocumentType extends Configurable {}

export interface BusinessLink extends Configurable {}

export interface MemberType extends Configurable {
  disabled: boolean;
}

export interface MemberCategory extends Configurable {
  memberTypeId: number;
  disabled: boolean;
  type: string;
}

export interface MembershipStatus extends Configurable {}
// #endregion

export interface CustomerPicture {
  id: number;
  fileId: number;
}

export interface CustomerDocument {
  documentTypeId: number;
  customerId: number | string;
  reference: string;
  expiredAt: number;
  fileId: number;
  documentType: DocumentType | string;
}

export interface Customer {
  id: number | string;
  sexId: number;
  civilStateId: number;
  addressId: number;
  maritalStatusId: number;
  firstname: string;
  lastname: string;
  profession: string;
  birthdate: string;
  nationality: string;
  birthplace: string;
  secondFirstname: string;
  secondLastname: string;
  spouceFirstname: string;
  spouceLastname: string;
  children: number;
  sex: Sex | string;
  address: Address;
  maritalstatus: MaritalStatus;
  civilstate: CivilState;
  accountstakeHolders: StakeHolder[];
  customerphotos: CustomerPicture[];
  customerdocuments: CustomerDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  typeId: number;
  statusId: number;
  closedAt?: string;
  deactivatedAt?: string;
  createdAt: string;
  updatedAt: string;
  validatedAt?: string;
  revokedAt?: string;
  type: MemberType;
}

export interface MembershipStatusChanges {
  id: number;
  membershipId: number;
  currentStatusId: number;
  previousStatusId: number;
  reason: string;
  date: string;
  membership?: Membership;
  currentstatus?: MembershipStatus;
  previoustatus?: MembershipStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  // Interface definitions
  id: number;
  statusId: number;
  membershipId: number;
  activitySectorId: number;
  businessLinkId: number;
  activity: string;
  businesslink: BusinessLink | string;
  activitysector: ActivitySector;
  moral?: string;
  membership?: Membership;
  membershipstatus: string;
  individual?: IndividualMember;
  createdAt: string;
  updatedAt: string;
}

export interface IndividualMember {
  id: number | string;
  categoryId: number;
  memberId: number | string;
  customerId: number | string;
  customer?: Customer;
  membercategory: MemberCategory | string;
}

export interface MoralMember {
  id: number | string;
  memberId: number;
  addressId: number;
  categoryId: number;
  socialReason: string;
  legalForm: string;
  receiptNumber: string;
  approvalNumber: string;
  moraldocuments?: MoralMemberDocument[];
  address?: Address;
  membercategory?: MemberCategory | string;
  createdAt: string;
  updatedAt: string;
}

export interface MoralMemberPartiesSignatory {
  id: number;
  customerId: number;
  moralId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MoralMemberDocument {
  id: number;
  moralId: number;
  documentTypeId: number;
  reference: string;
  expiredAt: string;
  fileId: number;
  documentType: string | DocumentType;
  createdAt: string;
  updatedAt: string;
}

export interface StakeHolder {
  // Interface definitions
  id: number | string;
  type: number | string;
  customerId: number | string;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  isActive: string;
}

export interface ActivitySector {
  id: number;
  label: number;
}

export interface Address {
  id: number;
  cityId: number;
  districtId: number;
  countryId: number;
  address: string;
  phoneNumber: string;
  otherPhoneNumber: string;
  postalBox: string;
  email: string;
  prefecture: string;
  municipality: string;
  detail: string;
  country: Country;
  city: City;
  district: string | District;
}
