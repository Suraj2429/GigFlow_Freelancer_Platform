
export const GigStatus = {
  OPEN: "open",
  ASSIGNED: "assigned"
} as const;

export type GigStatus = typeof GigStatus[keyof typeof GigStatus];

export const BidStatus = {
  PENDING: "pending",
  HIRED: "hired",
  REJECTED: "rejected"
} as const;

export type BidStatus = typeof BidStatus[keyof typeof BidStatus];

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Gig = {
  id: string;
  title: string;
  description: string;
  budget: number;
  ownerId: string;
  ownerName: string;
  status: GigStatus;
  createdAt: number;
};

export type Bid = {
  id: string;
  gigId: string;
  freelancerId: string;
  freelancerName: string;
  message: string;
  price: number;
  status: BidStatus;
  createdAt: number;
};

export type Notification = {
  id: string;
  message: string;
  read?: boolean;
};
