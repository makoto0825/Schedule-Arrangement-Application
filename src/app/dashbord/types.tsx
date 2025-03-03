import { ReactNode } from 'react';

export type Event = {
  id: number;
  title: string;
  date: string;
  respondents: number;
  upcoming: boolean;
};

export type CardProps = {
  children: ReactNode;
  highlight?: boolean;
};
