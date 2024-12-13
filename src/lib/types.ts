export type Dream = {
  id?: string;
  userId: string;
  title: string;
  content: string;
  interpretation?: string | null; // Allow null
  mood?: string;
  createdAt?: Date;
  updatedAt?: Date;
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