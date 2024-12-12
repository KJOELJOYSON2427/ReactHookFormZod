import { Slider, Typography } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label:string
};

export default function RHFSlide<T extends FieldValues>({ name, label }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            control={control}
            name={name}
            render={({field})=>(
                <>
                <Typography>{label}</Typography>
                <Slider{...field} valueLabelDisplay="auto"/>
                </>
            )}
        />
    );
}