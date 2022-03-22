import {
  ActivitySector,
  BusinessLink,
  CivilState,
  Configurable,
  FileType,
  Gender,
  MaritalStatus,
  MembershipStatus,
  Place,
  TimeStampsAware,
} from "./common";

// #region clients module models

export interface MemberFile {
  id: number;
  fileTypeId: number;
  reference?: string;
  expiredAt?: string;
  fileId: number;
  fileType: string | FileType;
}

export interface Category extends Configurable {
  typeId: number;
  disabled: boolean;
  type: string;
}

export interface StakeHolder {
  id: number;
  type: number | string;
  customerId: number;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Address {
  id: number;
  city: number;
  district: number;
  country: number;
  address?: string;
  phoneNumber: string;
  otherPhoneNumber: string;
  postalBox: string;
  email: string;
  prefecture: string;
  municipality: string;
  detail: string;
  addressDistrict?: Place;
  addressCity?: Place;
  addressCountry?: Place;
}

export interface Customer extends TimeStampsAware {
  id: number | string;
  genderId: number;
  civilStateId: number;
  addressId?: number;
  maritalStatusId: number;
  firstname: string;
  lastname: string;
  profession: string;
  birthdate: string;
  nationality: string;
  birthplace: string;
  secondFirstname?: string;
  secondLastname?: string;
  spouceFirstname?: string;
  spouceLastname?: string;
  children?: number;
  gender?: Gender | string;
  address?: Address;
  maritalstatus?: MaritalStatus;
  civilState?: CivilState;
  accountStakeHolders?: StakeHolder[];
  customerFiles?: MemberFile[];
}
export interface Individual {
  id: number | string;
  memberId: number | string;
  customerId: number | string;
}

export interface Moral {
  id: number | string;
  memberId: number;
  addressId: number;
  socialReason: string;
  legalForm: string;
  receiptNumber: string;
  approvalNumber: string;

  // Relations
  files?: MemberFile[];
  address?: Address;
  membercategory?: Category | string;
  createdAt: string;
  updatedAt: string;
}
export interface Member extends TimeStampsAware {
  // Interface definitions
  id: number;
  membershipId: number;
  activitySectorId: number;
  businessLinkId: number;
  activity: string;
  businesslink?: BusinessLink | string;
  activitysector?: ActivitySector;
  membership?: Membership;
  individual?: Individual;
  moral?: Moral;
}

export interface Membership extends TimeStampsAware {
  categoryId: number;
  statusId: number;
  closedAt?: string;
  deactivatedAt?: string;
  validatedAt?: string;
  revokedAt?: string;

  // Relations
  status?: MembershipStatus;
  member?: Member;
  statusChanges?: MembershipStatusChanges[];
  category?: Category;
}

export interface MembershipStatusChanges extends TimeStampsAware {
  id: number;
  membershipId: number;
  currentStatusId: number;
  previousStatusId: number;
  reason?: string;
  date: string;
  membership?: Membership;
  currentstatus?: MembershipStatus;
  previoustatus?: MembershipStatus;
}

export interface MoralMemberPartiesSignatory extends TimeStampsAware {
  id: number;
  customerId: number;
  moralId: number;
}

// #region clients module models
