import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../Usersw/types/option";
import { FormControl, FormControlLabel, Radio,FormLabel,RadioGroup,  } from "@mui/material";

type Props<T extends FieldValues> = {
    name: Path<T>;
    options?: Option[];
    label:string
};

export default function RHFRadioButton<T extends FieldValues>({ name, options ,label}: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            control={control}
            name={name}
            render={({field,fieldState:{error}})=>(
                <FormControl {...field} error={!!error}>
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup>
                     {options?.map((option)=>(
                        <FormControlLabel value={option.id} key={option.id}
                        control={<Radio checked={field.value==option.id}/>}
                        label={option.label}/>
                     ))}
                    </RadioGroup>
                </FormControl>
    )}
        />
    );
}
