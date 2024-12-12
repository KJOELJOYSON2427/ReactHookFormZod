import {FormProvider,useForm }  from "react-hook-form";
import {Users} from "../Usersw/components/user" 
import {zodResolver} from "@hookform/resolvers/zod";
import {defaultValues, Schema,schema } from "../Usersw/types/schema";
import {DevTool} from "@hookform/devtools"
export function UserProvider(){
    const methods = useForm<Schema>({
        mode: 'all',
        resolver:zodResolver(schema),
        defaultValues:defaultValues
      },
    
    );
    return(
        <FormProvider {...methods}>
            <Users/>
            <DevTool control={methods.control}/>
        </FormProvider>
    )
}
