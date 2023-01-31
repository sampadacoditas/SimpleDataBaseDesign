import { PropsWithChildren } from "react";

export interface IAppContextProps extends PropsWithChildren { }


export interface IStoreArrayProps {
  id: number | string
  name: string
  type: string
  data: IDataObjectsProps[]
}

export interface IDataObjectsProps {
  created_at?: string
  deletedAt?: string
  id?: string | undefined
  modifiedBy?: string
  name: string
  projectName?: string
  type: string
  updated_at?: string
  userId?: string
}

export interface IDataProps {
  data: IDataObjectsProps[]
  type: string | undefined
}