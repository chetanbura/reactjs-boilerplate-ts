import { ReactNode } from 'react';

export type TNavMeta = {
  path: string;
  title: string;
  component: string;
  index?: boolean;
  isPrivate?: boolean;
  subNav?: TNavMeta[];
};

export type TLogType = {
  type: string;
  body?: string;
  subject: string;
  action: string;
};

export interface IErrorBoundaryState {
  hasError: boolean;
}

export interface IErrorBoundaryProps {
  children?: ReactNode;
  fallBack?: ReactNode;
}
