export interface ISingleContraint {
    id:number,
    created_at: string,
    updated_at: string,
    modifiedBy: string,
    deletedAt: string | null,
    constraintParameterId: number,
    columnId: number,
    tableId: number
}

export interface ISingleColumnTable {
    id?: number,
    created_at?: string,
    updated_at?: string,
    modifiedBy?: string
    deletedAt?: string | null ,
    fieldName: string,
    tableId?: number,
    datatype: number,
    datatypeSize: number | string,
    constraints:ISingleContraint[] 
}


export interface IConstraint {
    value:number,
    name:string
}


export interface IConstraintData {
    id:number,
    name:string,
    created_at:string,
    deletedAt:string | null,
    modifiedBy:string,
    updated_at:string,
}

export interface IDatatypeData {
    id : number,
    name : string,
    created_at:string,
    deletedAt:string | null,
    updated_at : string,
    modifiedBy : string,
}

export interface ITableData {
    tableId: number,
    columns: ISingleColumnTable[], 
    modifiedBy: string
}

export interface IFieldData{
    id?: number,
    created_at?: string,
    updated_at?: string,
    modifiedBy?: string
    deletedAt?: string | null ,
    fieldName: string,
    tableId?: number,
    datatype: number,
    datatypeSize: number | string,
    constraints:number[] 
}
export interface IDatatype extends IConstraint {}