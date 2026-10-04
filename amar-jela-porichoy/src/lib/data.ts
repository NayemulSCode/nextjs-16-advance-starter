import districtsJson from '@/data/districts.json';
import foodsJson from '@/data/foods.json';
import mapJson from '@/data/map.json';
import quizJson from '@/data/quiz.json';
import type { District, DistrictFoods, QuizQuestion } from './types';

export const districts = districtsJson as District[];
export const districtById = new Map(districts.map((d) => [d.id, d]));
export const divisions = [...new Set(districts.map((d) => d.division))];

export const foodsByDistrict = new Map(
  (foodsJson as DistrictFoods[]).map((f) => [f.district, f.items])
);
export const allFoodIds = (foodsJson as DistrictFoods[]).flatMap((f) =>
  f.items.map((i) => i.id)
);

export const mapData = mapJson as {
  viewBox: string;
  width: number;
  height: number;
  paths: Record<string, string>;
};

export const quiz = quizJson as QuizQuestion[];
