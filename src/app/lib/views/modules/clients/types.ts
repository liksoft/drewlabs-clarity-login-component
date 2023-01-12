import { BuiltType, StrConstraint, TypeOf } from "@azlabsjs/built-type";

/**
 * Individual client type compiler instance
 */
export const IndividualClient = BuiltType._object(
  {
    id: BuiltType._num({ coerce: true }),
    number: BuiltType._str().nullish(),
    validatedAt: BuiltType._str().nullish(),
    firstname: BuiltType._str(),
    lastname: BuiltType._str(),
    businesslink: BuiltType._str({ coerce: true }),
    type: BuiltType._str({ coerce: true }),
    phonenumber: BuiltType._str({
      coerce: true,
      constraint: new StrConstraint().nullish(),
    }),
    activity: BuiltType._str().nullish(),
    civility: BuiltType._str({ coerce: true }).nullish(),
    status: BuiltType._str({ coerce: true }),
  },
  {
    validatedAt: "member.validatedAt",
    firstname: "by.firstname",
    lastname: "by.lastname",
    businesslink: "member.businessLinkId",
    type: "member.categoryId",
    phonenumber: "by.address.phoneNumber",
    activity: "member.activity",
    civility: "by.civilStateId",
    status: "member.membershipStatusId",
  }
);

/**
 * Moral client type compiler instance
 */
export const MoralClient = BuiltType._object(
  {
    id: BuiltType._num({ coerce: true }),
    number: BuiltType._str().nullish(),
    registrynumber: BuiltType._str({ coerce: true }).nullish(),
    label: BuiltType._str({ coerce: true }),
    activitysector: BuiltType._str({ coerce: true }).nullish(),
    type: BuiltType._str({ coerce: true }).nullish(),
    phonenumber: BuiltType._str({ coerce: true }).nullish(),
    activity: BuiltType._str({ coerce: true }).nullish(),
    status: BuiltType._str({ coerce: true }).nullish(),
  },
  {
    registrynumber: "receiptNumber",
    label: "socialReason",
    activitysector: "member.activitySectorId",
    type: "member.categoryId",
    phonenumber: "address.phoneNumber",
    status: "member.membershipStatusId",
    activity: "member.activity",
  }
);

export const StakeHolder = BuiltType._object(
  {
    id: BuiltType._num({ coerce: true }),
    firstname: BuiltType._str({ coerce: true }).nullable(),
    lastname: BuiltType._str({ coerce: true }),
    contact: BuiltType._str(),
    accountnumber: BuiltType._str({ coerce: true }),
    createdAt: BuiltType._str().nullish(),
    membernumber: BuiltType._str().nullish(),
  },
  {
    accountnumber: "accountNumber",
    firstname: "customer.firstname",
    lastname: "customer.firstname",
    contact: "customer.address.phoneNumber",
  }
);

export const Zones = BuiltType._object({
  label: BuiltType._str(),
  id: BuiltType._str()
});

/**
 * Individual client type definition
 */
export type IndividualClientType = TypeOf<typeof IndividualClient>;

/**
 * Moral client type definition
 */
export type MoralClientType = TypeOf<typeof MoralClient>;

/**
 * Stake holder type
 */
export type StakeHolderType = TypeOf<typeof StakeHolder>;

/**
 * Zone type
 */
export type ZonesType = TypeOf<typeof Zones>;
