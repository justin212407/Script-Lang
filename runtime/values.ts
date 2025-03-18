export type valueType = "null" | "number";

export interface RuntimeVal {
    type: valueType;
}

export interface NullVal extends RuntimeVal {
    type: "null";
    value: "null";
}

export interface NumberVal extends RuntimeVal {
    type: "number";
    value: number;
}