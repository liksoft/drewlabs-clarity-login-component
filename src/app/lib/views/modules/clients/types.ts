import { BuiltType, TypeOf } from "@azlabsjs/built-type";

export const Address = BuiltType._object({
  id: BuiltType._num({ coerce: true }).nullish(),
  country: BuiltType._str().nullish(),
  city: BuiltType._str().nullish(),
  phoneNumber: BuiltType._str({ coerce: true }).nullish(),
  district: BuiltType._str().nullish(),
  address: BuiltType._str().nullish(),
  otherPhoneNumber: BuiltType._str().nullish(),
  postalBox: BuiltType._str().nullish(),
  email: BuiltType._str().nullish(),
  prefecture: BuiltType._str().nullish(),
});

export const Customer = BuiltType._object(
  {
    maritalstatus: BuiltType._num({ coerce: true }).nullish(),
    profession: BuiltType._num({ coerce: true }).nullish(),
    gender: BuiltType._num({ coerce: true }).nullish(),
    sex: BuiltType._str({ coerce: true }).nullish(),
    civilstate: BuiltType._num({ coerce: true }).nullish(),
    birthdate: BuiltType._str({ coerce: true }).nullish(),
    nationality: BuiltType._str({ coerce: true }).nullish(),
    birthplace: BuiltType._str({ coerce: true }).nullish(),
    secondfirstname: BuiltType._str({ coerce: true }).nullish(),
    secondlastname: BuiltType._str({ coerce: true }).nullish(),
    spoucefirstname: BuiltType._str({ coerce: true }).nullish(),
    spoucelastname: BuiltType._str({ coerce: true }).nullish(),
    children: BuiltType._num({ coerce: true }).nullish(),
  },
  {
    maritalstatus: "maritalStatusId",
    profession: "professionId",
    gender: "genderId",
    sex: "sex",
    civilstate: "civilStateId",
    birthdate: "birthdate",
    nationality: "nationality",
    birthplace: "birthplace",
    secondfirstname: "secondFirstname",
    secondlastname: "secondLastname",
    spoucefirstname: "spouceFirstname",
    spoucelastname: "spouceLastname",
    children: "children",
  }
);

/**
 * Individual client type compiler instance
 */
export const IndividualMember = BuiltType._object(
  {
    id: BuiltType._num({ coerce: true }),
    memberid: BuiltType._num({ coerce: true }),
    accountNumber: BuiltType._str().nullish(),
    validatedAt: BuiltType._str().nullish(),
    firstname: BuiltType._str(),
    lastname: BuiltType._str(),
    businesslink: BuiltType._str({ coerce: true }),
    type: BuiltType._str({ coerce: true }),
    phonenumber: BuiltType._str({
      coerce: true,
    }).nullish(),
    activity: BuiltType._str().nullish(),
    civility: BuiltType._str({ coerce: true }).nullish(),
    status: BuiltType._str({ coerce: true }),
    address: Address.nullish(),
    personal: Customer.nullish(),
  },
  {
    memberid: "member.id",
    validatedAt: "member.validatedAt",
    firstname: "by.firstname",
    lastname: "by.lastname",
    businesslink: "member.businessLinkId",
    type: "member.categoryId",
    phonenumber: "by.address.phoneNumber",
    activity: "member.activity",
    civility: "by.civilStateId",
    status: "member.membershipStatusId",
    address: "by.address",
    personal: "by",
  }
);

/**
 * Moral client type compiler instance
 */
export const MoralMember = BuiltType._object(
  {
    memberid: BuiltType._num({ coerce: true }),
    validatedAt: BuiltType._str().nullish(),
    id: BuiltType._num({ coerce: true }),
    accountNumber: BuiltType._str().nullish(),
    registrynumber: BuiltType._str({ coerce: true }).nullish(),
    label: BuiltType._str({ coerce: true }),
    activitysector: BuiltType._str({ coerce: true }).nullish(),
    type: BuiltType._str({ coerce: true }).nullish(),
    phonenumber: BuiltType._str({ coerce: true }).nullish(),
    activity: BuiltType._str({ coerce: true }).nullish(),
    status: BuiltType._str({ coerce: true }).nullish(),
    businesslink: BuiltType._str({ coerce: true }),
    address: Address.nullish(),
    legalform: BuiltType._str({ coerce: true }).nullish(),
    receiptnumber: BuiltType._str({ coerce: true }).nullish(),
    approvalnumber: BuiltType._str({ coerce: true }).nullish(),
    // signatories: BuiltType._array(Customer).nullish()
  },
  {
    memberid: "member.id",
    validatedAt: "member.validatedAt",
    registrynumber: "receiptNumber",
    label: "socialReason",
    activitysector: "member.activitySectorId",
    type: "member.categoryId",
    phonenumber: "address.phoneNumber",
    status: "member.membershipStatusId",
    activity: "member.activity",
    businesslink: "member.businessLinkId",
    receiptnumber: "receiptNumber",
    approvalnumber: "approvalNumber",
    legalform: "legalFormId",
    // signatories: 'by'
  }
);

export const StakeHolder = BuiltType._object(
  {
    id: BuiltType._num({ coerce: true }),
    firstname: BuiltType._str({ coerce: true }).nullable(),
    lastname: BuiltType._str({ coerce: true }),
    contact: BuiltType._str(),
    accountnumber: BuiltType._str({ coerce: true }),
    createdAt: BuiltType._str(),
    membernumber: BuiltType._str().nullish(),
    address: Address.nullish(),
  },
  {
    accountnumber: "accountNumber",
    firstname: "customer.firstname",
    lastname: "customer.firstname",
    contact: "customer.address.phoneNumber",
    address: "address",
  }
);

export const Zones = BuiltType._object({
  label: BuiltType._str(),
  id: BuiltType._str(),
});

export const Member = BuiltType._object({
  id: BuiltType._num({ coerce: true }),
  validatedAt: BuiltType._str().nullish(),
  status: BuiltType._str({ coerce: true }),
  activity: BuiltType._str().nullish(),
  type: BuiltType._str({ coerce: true }),
  category: BuiltType._str({ coerce: true }).nullish(),
  accountNumber: BuiltType._str({ coerce: true }).nullish(),
  label: BuiltType._str({ coerce: true }),
  businesslink: BuiltType._str({ coerce: true }),
  address: Address.nullish(),
});

export const Signatory = BuiltType._object(
  {
    id: BuiltType._num({ coerce: true }),
    createdAt: BuiltType._str(),
    firstname: BuiltType._str({ coerce: true }).nullable(),
    lastname: BuiltType._str({ coerce: true }),
    contact: BuiltType._str().nullish(),
    moralid: BuiltType._num({ coerce: true }).nullish(),
    address: Address.nullish(),
    profession: BuiltType._num().nullish(),
  },
  {
    firstname: "customer.firstname",
    lastname: "customer.firstname",
    contact: "customer.address.phoneNumber",
    profession: "customer.professionId",
    moralid: "moralId",
  }
);

export const Status = BuiltType._object({
  id: BuiltType._num(),
  label: BuiltType._str({ coerce: true }),
  activated: BuiltType._bool({ coerce: true }).nullish(),
  closed: BuiltType._bool({ coerce: true }).nullish(),
  deactivated: BuiltType._bool({ coerce: true }).nullish(),
  revoked: BuiltType._bool({ coerce: true }).nullish(),
});

/**
 * Individual client type definition
 */
export type IndividualMemberType = TypeOf<typeof IndividualMember>;

/**
 * Moral client type definition
 */
export type MoralMemberType = TypeOf<typeof MoralMember>;

/**
 * Stake holder type
 */
export type StakeHolderType = TypeOf<typeof StakeHolder>;

/**
 * Zone type
 */
export type ZonesType = TypeOf<typeof Zones>;

/**
 * Member instance type
 */
export type MemberType = TypeOf<typeof Member>;

/**
 * Address instance type
 */
export type AddressType = TypeOf<typeof Address>;

/**
 * Individual member personal details instance type
 */
export type CustomerType = TypeOf<typeof Customer>;

/**
 * Signatory type
 */
export type SignatoryType = TypeOf<typeof Signatory>;

/**
 * Member status built type
 */
export type StatusType = TypeOf<typeof Status>;
