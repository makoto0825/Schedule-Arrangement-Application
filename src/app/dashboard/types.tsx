import { ReactNode } from 'react';

export type CardProps = {
  children: ReactNode;
  color: 'upcoming' | 'past';
};
