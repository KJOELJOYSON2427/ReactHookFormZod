import { TextField, Stack, Typography, Button, Container, List, ListSubheader, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { SubmitHandler, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { defaultValues, schema, Schema } from '../types/schema';
import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { Fragment, useEffect } from 'react';
import { useGenders, useLanguages, useSkills, useStates, useUsers } from '../../services/queries';
import RHFToggleButton from '../../components/RHFToggleButton';
import RHFRadioButton from '../../components/RHFRadiobutton';
import { RHFCheckbox } from '../../components/RHFCheckBox';
import RHFDateTimePicker from '../../components/RHFDateTimePicker';
import RHFDateRangePicker from '../../components/RHFDateRangePicker';
import RHFSlide from '../../components/RHFSlider';
import RHFSwitchI from '../../components/RHFSwitch';
import RHFTextField from '../../components/RHFTextField';
import { useUser } from '../../services/useuser';
import { useCreateUser, useEditor } from '../../services/mutations';

export function Users() {
  const statesQuery = useStates();
  const Languages = useLanguages();
  const gender = useGenders();
  const skills = useSkills();
  const { formState: { errors }, getValues,control, unregister, reset, setValue,handleSubmit } = useFormContext<Schema>();
  const isTeacher = useWatch({ control, name: "isTeacher" });
  const usersQuery = useUsers();
  const editUserMutation=useEditor()

  const id = useWatch({ control, name: 'id' });
  const userQuery=useUser(id)
  const variant=useWatch({control,name:"variant"})
  // Track form changes with useEffect
  const handleUserClick = (id:string) => {
    setValue('id', id);
    console.log('User clicked with ID:', id);  // Logs the ID when clicked
  };

  useEffect(() => {
    console.log('Selected ID:', id);  // Logs the 'id' value whenever it changes
  }, [id]);

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students"
  });

  useEffect(() => {
    console.log('isTeacher:', isTeacher);  
    if (!isTeacher) {
      replace([]); 
      unregister('students'); 
    }
  }, [isTeacher, replace, unregister]);

  useEffect(()=>{
    if(userQuery.data){
      reset(userQuery.data)
    }
  },[userQuery.data,reset])

  const handleReset = () => {
    reset(defaultValues);
  };
  const formValues = useWatch({ control });
  console.log(formValues);
  const newUserCreate= useCreateUser()
  const onSubmit:SubmitHandler<Schema>=(data)=>{
       if(variant==='create'){
            newUserCreate.mutate(data)
       }else{
        //variant-edit
        editUserMutation.mutate(data)
       }
  }
  return (
    <Container component="form" maxWidth="sm" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{flexDirection:"row",gap:2}}>
      <List subheader={<ListSubheader>Users</ListSubheader>}>
        {usersQuery.data?.map((user) => (
          <ListItem disablePadding key={user.id}>
            <ListItemButton onClick={() => handleUserClick(user.id)}
              selected={id==user.id}
              >
             <ListItemText primary={user.label}/>
            </ListItemButton>
              
          </ListItem>
        ))}
      </List>

      <Stack>
        <RHFTextField<Schema> name="name" label="Name" />
        <RHFTextField<Schema> name="email" label="Email" />
        
        <RHFAutocomplete<Schema> name="states" label="States" options={statesQuery.data} />
        <RHFToggleButton<Schema> name="languagesSpoken" options={Languages.data} />
        <RHFRadioButton<Schema> name="gender" options={gender.data} label="Gender" />
        <RHFCheckbox<Schema> name="skills" options={skills.data} label="Skills" />
        <RHFDateTimePicker<Schema> name="registrationDateAndTime" label="Registration Date & Time" />
        
        <Typography>Former Employment Period</Typography>
        <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" />
        
        <RHFSlide<Schema> name="salaryRange" label="Salary Range" />
        <RHFSwitchI<Schema> name="isTeacher" label="Is he a Teacher?" />

        {isTeacher && (
          <Button onClick={() => append({ name: '' })} type="button">
            Add new Student
          </Button>
        )}

        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <RHFTextField<Schema> name={`students.${index}.name`} label="Name" />
            <Button color="error" onClick={() => remove(index)} type="button">
              Remove
            </Button>
          </Fragment>
        ))}
      </Stack>

      <Stack sx={{ flexDirection: "rows", justifyContent: "space-between" }}>
        <Button type="submit">{variant==="create"?"New User":"Edit User"}</Button>
        <Button onClick={handleReset}>Reset</Button>
        <button onClick={()=>schema.parse(getValues())}>parse</button>
      </Stack>
      </Stack>
    </Container>
  );
}
