export type Lang = 'en' | 'bn';
export type Theme = 'delta' | 'sunrise' | 'night';

export interface District {
  id: string;
  en: string;
  bn: string;
  division: string;
}

export interface Food {
  id: string;
  en: string;
  bn: string;
  note_en: string;
  note_bn: string;
}

export interface DistrictFoods {
  district: string;
  items: Food[];
}

export interface QuizQuestion {
  id: string;
  text_bn: string;
  text_en: string;
  answers: string[];
  decoys: string[];
  note_bn: string;
  note_en: string;
  verified: boolean;
}
