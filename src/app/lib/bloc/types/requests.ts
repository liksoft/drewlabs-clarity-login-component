export type AddressRequestModel = {
  country: string;
  city: string;
  district: string;
  phone_number: string;
  other_phone_number: string;
  address: string;
  email: string;
  prefecture: string;
  municipality: string;
};

type FileRequestModel = {
  content: string | Blob;
  file_type_id?: number | string;
  expired_at?: string;
  reference?: string;
};

export type CustomerRequestModel = {
  marital_status_id: number | string;
  gender_id: number | string;
  civil_state_id: number | string;
  address_id: number | string;
  firstname: string;
  lastname: string;
  second_firstname: string;
  second_lastnam: string;
  spouce_firstname: string;
  spouce_lastname: string;
  profession: string;
  birthdate: string;
  nationality: string;
  birthplace: string;
  files: Partial<FileRequestModel>[] | Partial<FileRequestModel>;
  member_id: number|string;
};

export type MoralRequestModel = {
  social_reson: string;
  legal_form: string;
  receipt_number: string;
  approval_number: string;
  address_id: number | string;
  files: Partial<FileRequestModel>[] | Partial<FileRequestModel>;
  signatories: Partial<CustomerRequestModel>[];
  member_id: number|string;
};

export type MemberRequestModel = {
  category_id: number | string;
};

export type MembershipRequestModel = CustomerRequestModel & {
  moral: Partial<MoralRequestModel>;
  address: Partial<AddressRequestModel>;
  individual: Partial<CustomerRequestModel>;
  stake_holders: Partial<StakeHolderRequestModel>[];
  membership_id: number | string;
  activity_sector_id: number | string;
  business_link_id: number | string;
  activity: string;
  member?: Partial<MemberRequestModel>;
};

export type StakeHolderRequestModel = {
  account_id: number | string;
  type: number | string;
  customer: Partial<CustomerRequestModel>;
};


export type MoralMemberRequestType = {

};
