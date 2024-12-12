import React, { useState,useEffect } from 'react';
import {
  TextField,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import { RemoteRegister } from '../apiinterface';
import { AlartLabel, HeadingLabel, MainContainer, RegBtn, RegBtnContainer, TopContainer } from './RemoteSystemRegStyle';
import { RemoteRegMessage } from '../CommonMessage';

interface FormData {
  remoteUserName?: string;
  remoteId?: string;
  id?:number |null;
}

interface RemoteSystemRegisterProps {
  initialData?: FormData;
  mode: 'register' | 'edit';
}

const RemoteSystemRegister = ({ initialData, mode }:RemoteSystemRegisterProps) => {
  const [formData, setFormData] = useState<FormData>({
      remoteUserName: "",
      remoteId: "",
      id:null,
   });

   const [errors, setErrors] = useState<Partial<FormData>>({});
   const [statusMessage, setStatusMessage] = useState<string>("");
   const [Reg, setReg] = useState<boolean>(false);

   useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        remoteUserName: initialData.remoteUserName || '',
        remoteId: initialData.remoteId || '',
        id:initialData.id || null,
      });
    } else {
      setFormData({
        remoteUserName: '',
        remoteId: '',
        id:null,
      });
    }
  }, [mode, initialData]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" })); 
    };

    const validateForm = (): boolean => {
      const newErrors: Partial<FormData> = {};
      if (!formData.remoteUserName?.trim()) newErrors.remoteUserName = RemoteRegMessage.E0001;
      if (!formData.remoteId?.trim()) newErrors.remoteId = RemoteRegMessage.E0002;
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!validateForm()) return; 

    const requestBody: Record<string, any> = {
      remoteUserName: formData.remoteUserName,
      remoteId: formData.remoteId,
      mode: mode,
    };
  
    if (mode === 'edit' && formData.id !== null) {
      requestBody.id = formData.id; 
    }

    fetch(RemoteRegister, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          if (data.success) {
            setStatusMessage(data.data);
            if(data.data === "Remote System Registered successfully.") {
              setFormData({remoteUserName: "",  remoteId: ""});
              setReg(true);
            }
            else if(data.data === "Remote System User Name Updated Successfully") {
              setReg(true);
            }
          }
        })
        .catch(error => console.error('Error:', error));
    };

  return (
    <TopContainer>
      <MainContainer>
        <HeadingLabel variant ="h4">
          {mode === 'register' ? 'Remote System Register':'Remote System Edit'}
        </HeadingLabel>
        {statusMessage && (
            <AlartLabel
                variant="body1"
                sx={{ color: Reg ? 'Green':'Red'}}>
                {statusMessage}
            </AlartLabel>
        )}
          <TextField
            fullWidth
            label="Remote User Name"
            name='remoteUserName'
            variant="outlined"
            margin="normal"
            value={formData.remoteUserName}
            onChange={handleChange}
            placeholder='Please Enter Remote User Name'
            error={!!errors.remoteUserName}
            helperText={errors.remoteUserName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Remote ID"
            variant="outlined"
            name='remoteId'
            margin="normal"
            value={formData.remoteId}
            onChange={handleChange}
            placeholder='Please Enter Remote ID'
            error={!!errors.remoteId}
            helperText={errors.remoteId}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DesktopWindowsIcon />
                </InputAdornment>
              ),
            }}
          />
           <RegBtnContainer>
          <RegBtn variant="contained" onClick={handleSubmit}>
            {mode === 'register' ? 'Register' : 'Update'} 
          </RegBtn>
          </RegBtnContainer>
      </MainContainer>
    </TopContainer>
  );
};

export default RemoteSystemRegister;
