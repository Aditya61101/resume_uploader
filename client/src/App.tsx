import { ChangeEvent, useEffect, useState } from 'react';
import {
  AlertColor,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar
} from '@mui/material';
import { styled } from "@mui/material/styles";
import states from "./assets/states.json";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Profile } from './typings';

function App() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dob, setDob] = useState<Date | null>(null);
  const [st, setState] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [pjl, setPjl] = useState<string[]>([]);
  const [profileImg, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({});
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ status: boolean; msg: string; type: string }>({
    status: false,
    msg: "",
    type: ""
  });

  const Input = styled('input')({
    display: 'none',
  });

  const getProfiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://express-resume-uploader.onrender.com/api/resumes");
      const result = await res.json();
      if(result.profiles) setProfiles(result.profiles);
      else setProfiles(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getProfiles();
  }, []);
  const getLocations = (e: ChangeEvent<HTMLInputElement>) => {
    const data = [...pjl];
    if (e.target.checked) {
      data.push(e.target.value);
    } else {
      const index = data.indexOf(e.target.value);
      if (index !== -1) {
        data.splice(index, 1);
      }
    }
    setPjl(data);
  }

  const resetForm = () => {
    setName('');
    setEmail('');
    setDob(null);
    setState('');
    setGender('');
    setPjl([]);
    setProfileImage(null);
    setResume(null);

    const updatedState: { [key: string]: boolean } = {};
    Object.keys(checkboxState).forEach((key: string) => {
      updatedState[key] = false;
    });
    setCheckboxState(updatedState);

    const form: HTMLFormElement | null = document.getElementById('resume-form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('dob', dob?.toISOString().split('T')[0] ?? '')
    data.append('state', st)
    data.append('gender', gender)
    pjl.forEach(item => data.append('location', item))
    if (profileImg) {
      data.append('image', profileImg)
    }
    if (resume) {
      data.append('resume', resume)
    }

    if (name && email) {
      try {
        const res = await fetch("https://express-resume-uploader.onrender.com/api/resume-upload", {
          method: "POST",
          body: data
        })
        console.log(res.status);
        const result = await res.json();
        console.log(result);
        if (res.status >= 200 && res.status < 300) {
          setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
          getProfiles();
          return;
        }
        setError({ status: true, msg: "Something went wrong", type: 'error' })
      } catch (error) {
        console.log(error);
        setError({ status: true, msg: "Something went wrong", type: 'error' })
      } finally {
        resetForm();
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }

  return (
    <>
      <Box display="flex" justifyContent={"center"} sx={{ backgroundColor: 'success.light', padding: 2 }}>
        <Typography variant='h2' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
          Resume Uploader
        </Typography>
      </Box>
      <Grid container justifyContent={"center"}>
        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>
            <TextField id="name" name="name" required fullWidth margin='normal' label='Name' onChange={(e) => setName(e.target.value)} />
            <TextField id="email" name="email" required fullWidth margin='normal' label='Email' onChange={(e) => setEmail(e.target.value)} />
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue: Date | null) => { setDob(newValue) }}
                />
              </LocalizationProvider>
            </Box>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select labelId='state-select-label' id='state-select' value={st} label='st' onChange={(e) => { setState(e.target.value as string) }}>
                {Object.values(states).map((state, index) => {
                  return <MenuItem key={index} value={state}>{state}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl component='fieldset' fullWidth margin='normal'>
              <FormLabel component='legend'>Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <FormControl component='fieldset' fullWidth margin='normal'>
              <FormLabel component='legend'>Preferred Job Location</FormLabel>
              <FormGroup row>
                {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata'].map((item, index) => {
                  return <FormControlLabel key={index} control={<Checkbox checked={!!checkboxState[item]}
                    onChange={(e) => {
                      const updatedState = { ...checkboxState };
                      updatedState[item] = e.target.checked;
                      setCheckboxState(updatedState);
                      getLocations(e);
                    }} />} label={item} value={item}
                  />
                })}
              </FormGroup>
            </FormControl>
            <Stack direction="row" alignItems="center" spacing={4} >
              <label htmlFor='profile-photo'>
                <Input accept="image/*" id="profile-photo" type="file" onChange={(e) => {
                  if (e.target.files) setProfileImage(e.target.files[0]);
                }} />
                <Button variant='contained' component='span'>Upload Photo</Button>
              </label>
              <label htmlFor="resume-file">
                <Input accept=".doc,.docx,.pdf" id="resume-file" type="file" onChange={(e) => { if (e.target.files) setResume(e.target.files[0]) }} />
                <Button variant="contained" component="span">Upload Resume</Button>
              </label>
            </Stack>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="success">Submit</Button>
            {error.status ? <Alert severity={error.type as AlertColor}>{error.msg}</Alert> : null}
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'info.light', padding: 1 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}> List of Candidates</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Preferred Locations</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Resume File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? <TableRow><TableCell colSpan={7} align="center">Loading...</TableCell></TableRow> : profiles.map((profile, index) => {
                  return <TableRow key={index}>
                    <TableCell align="center">{profile.name}</TableCell>
                    <TableCell align="center">{profile.email}</TableCell>
                    { profile.dob.includes('T') ? <TableCell align="center">{profile.dob.split('T')[0]}</TableCell> : <TableCell align="center">{profile.dob}</TableCell> }
                    <TableCell align="center">{profile.state}</TableCell>
                    <TableCell align="center">{profile.gender}</TableCell>
                    <TableCell align="center">{profile?.location?.join(", ")}</TableCell>
                    <TableCell align="center"><Avatar src={profile.image_cloudinary_url} /></TableCell>
                    <TableCell align='center'> <a href={profile.resume_cloudinary_url} target='_blank' referrerPolicy='no-referrer'>Resume file</a></TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
export default App;