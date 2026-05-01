export type OutreachType = 'recruiter' | 'coffee-chat';

export type CharacterLimit = '200' | '300' | 'unlimited';

export interface RecruiterForm {
  linkedinUrl: string;
  role: string;
  whyFit: string;
  ask: string;
}

export interface CoffeeChatForm {
  linkedinUrl: string;
  whyReachOut: string;
  chatTopic: string;
  ask: string;
}

export interface Contact {
  id: string;
  outreachType: OutreachType;
  linkedinUrl: string;
  parsedName: string;
  parsedRole: string;
  parsedCompany: string;
  generatedMessage: string;
  createdAt: string;
  formMetadata: RecruiterForm | CoffeeChatForm;
}

export interface GenerationRequest {
  type: OutreachType;
  limit: CharacterLimit;
  data: RecruiterForm | CoffeeChatForm;
}
