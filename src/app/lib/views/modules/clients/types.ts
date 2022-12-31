import { BuiltType, StrConstraint, TypeOf } from "@azlabsjs/built-type";

/**
 * Individual client type compiler instance
 */
export const IndividualClient = BuiltType._object(
  {
    number: BuiltType._str({ coerce: true }),
    validatedAt: BuiltType._str(),
    firstname: BuiltType._str(),
    lastname: BuiltType._str(),
    businesslink: BuiltType._str({ coerce: true }),
    type: BuiltType._str({ coerce: true }),
    phonenumber: BuiltType._str({
      coerce: true,
      constraint: new StrConstraint().nullish(),
    }),
    sex: BuiltType._str({ coerce: true }),
    civility: BuiltType._str({ coerce: true }),
    status: BuiltType._str({ coerce: true }),
  },
  {
    validatedAt: "member.validatedAt",
    firstname: "by.firstname",
    lastname: "by.lastname",
    businesslink: "member.businessLinkId",
    type: "member.categoryId",
    phonenumber: "by.address.phoneNumber",
    sex: "by.genderId",
    civility: "by.civilStateId",
    status: "member.membershipStatusId",
  }
);

/**
 * Moral client type compiler instance
 */
export const MoralClient = BuiltType._object(
  {
    number: BuiltType._str({ coerce: true }),
    registrynumber: BuiltType._str({ coerce: true }),
    label: BuiltType._str({ coerce: true }),
    activitysector: BuiltType._str({
      coerce: true,
      constraint: new StrConstraint().nullish(),
    }),
    type: BuiltType._str({
      coerce: true,
      constraint: new StrConstraint().nullish(),
    }),
    phonenumber: BuiltType._str({
      coerce: true,
      constraint: new StrConstraint().nullish(),
    }),
    status: BuiltType._str({
      coerce: true,
      constraint: new StrConstraint().nullish(),
    }),
  },
  {
    registrynumber: "receiptNumber",
    label: "socialReason",
    activitysector: "member.activitySectorId",
    type: "member.categoryId",
    phonenumber: "address.phoneNumber",
    status: "member.membershipStatusId",
  }
);

/**
 * Individual client type definition
 */
export type IndividualClientType = TypeOf<typeof IndividualClient>;

/**
 * Moral client type definition
 */
export type MoralClientType = TypeOf<typeof MoralClient>;
