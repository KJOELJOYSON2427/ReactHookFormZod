import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../Usersw/types/option";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
    name: Path<T>;
    options?: Option[];
};

export default function RHFToggleButton<T extends FieldValues>({ name, options }: Props<T>) {
    const { control } = useFormContext<T>();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ...restField } }) => (
                <ToggleButtonGroup
                    {...restField} // Spread other props from React Hook Form
                    value={value.length ? value : [options?.[0].id]} // Default value fallback
                    onChange={(_, newValue) => {
                        if (newValue.length) {
                            onChange(newValue); // Update the form value when newValue is selected
                        }
                    }}
                >
                    {
                        options?.map((option)=>(
                            <ToggleButton value={option.id} key={option.id}>
                                {option.label}
                            </ToggleButton>
                        ))
                    }
                </ToggleButtonGroup>
            )}
        />
    );
}
