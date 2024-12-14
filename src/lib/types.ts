export interface Dream {
  id?: string;
  userId: string;
  title: string;
  content: string;
  interpretation?: string | null;
  mood?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type DreamInterpretation = {
  interpretation: string;
  mood?: string;
}

export type DreamFormProps = {
  onDreamInterpreted: (dream: Dream) => void;
  onInterpretationError: (error: string) => void;
}

export type DreamDisplayProps = {
  dream: Dream;
}

export type Profile = {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  displayName: string | null;
  bio: string | null;
  role: string | null;
  profileImage: string | null;
  createdAt: Date | null;
};

export type ProfileStats = {
  totalDreams: number;
  interpretationsUsed: number;
  subscriptionStatus: string;
  joinedDate: Date;
};