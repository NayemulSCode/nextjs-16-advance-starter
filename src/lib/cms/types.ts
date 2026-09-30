import type { Data } from '@puckeditor/core';
import type { Props, RootProps } from '@/puck/config';

export type PageData = Data<Props, RootProps>;

export type PageRecord = {
  path: string;
  data: PageData;
  updatedAt?: string;
};
