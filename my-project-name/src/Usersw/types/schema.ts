import { z } from 'zod';
import {patterns} from "../../cons"

export const schema=z.intersection(z.object({
    name: z.string().min(1,{message:'REQUIRED'}),
    email:z.string().min(1,{message:"Email is Required"}).refine(
        (email)=>{

            return patterns.email.test(email)
        },{
            message:"Email not valid"
        }
    ),
    states:z.array(z.string()).min(1).max(2),
    languagesSpoken:z.array(z.string()),
    gender:z.string().min(1),
    skills:z.array(z.string()).max(2,{message:"Not more than two"}),
    registrationDateAndTime:z.date(),
    formerEmploymentPeriod:z.array(z.date()).min(2).max(2),
    salaryRange:z.array(z.number()).max(2),
    
    
}),z.discriminatedUnion('variant',[
    z.object({variant:z.literal('create')}),
    z.object({variant:z.literal("edit"),id:z.string()})
])
).and(
    z.union([
        z.object({isTeacher:z.literal(false)}),
        z.object({
            isTeacher:z.literal(true),
            students:z.array(z.object(
                {
                    name:z.string().min(4),
                }
            ))
        })
    ])
)

export type Schema= z.infer<typeof schema>
export const defaultValues: Schema={
    variant:'create',
    email:'',
    name:'',
    states:[],
    languagesSpoken:[],
    gender:'',
    skills:[],
    registrationDateAndTime:new Date(),
    formerEmploymentPeriod:[new Date(),new Date()],
    salaryRange:[0,2000],
    isTeacher:false,
    

}