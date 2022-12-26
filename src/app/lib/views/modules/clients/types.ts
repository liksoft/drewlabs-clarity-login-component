import { BuiltType, TypeOf } from "@azlabsjs/built-type";

/**
 * Individual client type compiler instance
 */
export const IndividualClient = BuiltType._object({
  number: BuiltType._str({ coerce: true }),
  createdAt: BuiltType._str(),
  firstname: BuiltType._str(),
  lastname: BuiltType._str(),
  businesslink: BuiltType._str({ coerce: true }),
  type: BuiltType._str({ coerce: true }),
  phonenumber: BuiltType._str({ coerce: true }),
  sex: BuiltType._str({ coerce: true }),
  civility: BuiltType._str({ coerce: true }),
  status: BuiltType._str({ coerce: true }),
});

/**
 * Moral client type compiler instance
 */
export const MoralClient = BuiltType._object({
  number: BuiltType._str({ coerce: true }),
  registrynumber: BuiltType._str({ coerce: true }),
  label: BuiltType._str({ coerce: true }),
  activitysector: BuiltType._str({ coerce: true }),
  type: BuiltType._str({ coerce: true }),
  phonenumber: BuiltType._str({ coerce: true }),
  status: BuiltType._str({ coerce: true }),
});

/**
 * Individual client type definition
 */
export type IndividualClientType = TypeOf<typeof IndividualClient>;

/**
 * Moral client type definition
 */
export type MoralClientType = TypeOf<typeof MoralClient>;
