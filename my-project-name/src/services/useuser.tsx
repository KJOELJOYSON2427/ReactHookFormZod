import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Apiget } from "../types/Apitypes";
import { Schema } from "../Usersw/types/schema";

export function useUser(id:string){
    return useQuery({
        queryKey:['user',{id}],
        queryFn:async (): Promise<Schema> =>{
            const {data}=await axios.get<Apiget>(
                `http://localhost:8080/users/${id}`
            );
            return{
                variant:'edit',
                id:data.id.toString(),
                name:data.name,
                email:data.email,
                formerEmploymentPeriod: [
                    new Date (data.formerEmploymentPeriod[0]),
                    new Date (data.formerEmploymentPeriod[1]),
                  ]
                  ,
                gender:data.gender,
                languagesSpoken:data.languagesSpoken,
                registrationDateAndTime:new Date(data.registrationDateAndTime),
                salaryRange:[data.salaryRange[0],data.salaryRange[1]],
                skills:data.skills,
                states:data.states,
                students:data.students,
                isTeacher:data.isTeacher
            }
            
            
         
        },enabled:!!id
    });
    
}