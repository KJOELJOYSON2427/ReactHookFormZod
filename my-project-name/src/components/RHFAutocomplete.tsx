import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { Autocomplete, TextField, Checkbox, Box } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Option } from "../Usersw/types/option"; // Adjust path as needed

type Props<T> = {
    name: Path<T>;        // Form field name
    options?: Option[];    // Dropdown options
    label: string;        // Input field label
};

export function RHFAutocomplete<T extends FieldValues>({ name, options, label }: Props<T>) {
    const { control } = useFormContext<T>(); // Access form control for integration with react-hook-form

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                <Autocomplete
                    options={options || []}
                    value={options?.filter((option) => value.includes(option.id))} // Ensure correct value mapping
                    getOptionLabel={(option) =>
                        option.label ?? ''
                    }
                    isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
                    onChange={(_, newValue) => {
                        onChange(newValue.map((item) => item.id)); // Send IDs back to form state
                    }}
                    multiple
                    disableCloseOnSelect
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            inputRef={ref}
                            error={!!error}
                            helperText={error?.message}
                            label={label}
                        />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <Box component="li" {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                                checked={selected} // Marks the checkbox based on selected status
                            />
                            {option.label}
                        </Box>
                    )}
                />
            )}
        />
    );
}
