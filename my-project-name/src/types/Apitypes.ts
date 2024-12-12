type Create={
    variant:"create"
}
type Edit={
    variant:"edit",
    id:string
}

export type Apicommon={
    email:string,
    name:string,
    states:string[],
    gender:string,
    languagesSpoken:string[],
    skills:string[],
    registrationDateAndTime:string,
    formerEmploymentPeriod:[string,string];
    salaryRange:[number,number],
    isTeacher:boolean,
    students:{
        name:string
    }[]
}
export type Apiget=Edit & Apicommon
export type ApiCreateEdit=Apicommon & (Create | Edit)