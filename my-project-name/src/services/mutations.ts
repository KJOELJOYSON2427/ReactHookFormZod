import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Schema } from "../Usersw/types/schema";
import { omit } from "lodash";
import { mapData } from "../Usersw/services/ApiCreateEdit";



export function useCreateUser(){
    const queryClient=useQueryClient()

    return useMutation({
        mutationFn:async(data:Schema)=>{
            await axios.post(
                'http://localhost:8080/users',omit(mapData(data),'variant')

            )
            
        },
        onSuccess:async ()=>{
            await queryClient.invalidateQueries({queryKey:['users']});
            alert("User Created!")
        }
    })
}
export function useEditor(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async(data:Schema)=>{
            if(data.variant==="edit"){
                await axios.put(`http://localhost:8080/users/${data.id}`,
                omit(mapData(data),'variant'))
         alert('User edited Successfully!');
            } 
        },
        onSuccess:async(_,variables)=>{
            await queryClient.invalidateQueries({queryKey:['users']});

            if(variables.variant==='edit'){
                await queryClient.invalidateQueries({
                    queryKey:['user',{id:variables.id}]
                })
            }
        }
    })
}