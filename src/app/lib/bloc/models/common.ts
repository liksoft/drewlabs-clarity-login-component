// #region Configuration model definitions

export interface TimeStampsAware {
  createdAt: string;
  updatedAt: string;
}
export interface Configurable extends TimeStampsAware {
  id: number;
  label: string;
}
export interface Place extends Configurable {
  code: string | number;
  parent: number;
}

// Clients civil state type definitions
export interface CivilState extends Configurable {}

// Clients Sex(M|F) type definitions
export interface Gender extends Configurable {}

// Clients marital status type definitions
export interface MaritalStatus extends Configurable {}

// Clients document types type definitions
export interface FileType extends Configurable {}

export interface BusinessLink extends Configurable {}

export interface MemberType extends Configurable {
  disabled: boolean;
}

export interface MembershipStatus extends Configurable {
  accountStatusId?: number;
}

export interface ActivitySector extends Configurable {}
// #endregion
