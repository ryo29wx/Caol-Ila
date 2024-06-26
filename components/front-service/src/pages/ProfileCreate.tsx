import React, { useState, ChangeEvent} from 'react';
import { Box, Container, TextField, Button, Tooltip } from '@mui/material';


type ImageUploadState = {
    file: File | null;
    previewUrl: string | null;
};

const ProfileCreate = () => {
  const [user, setUser] = useState({
    nick_name: '',
    sex: 0,
    age: 0,
    title: '',
    company: '',
    company_email: '',
    main_image: '',
    detail: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_ADDITEM_API;

    try {
      const response = await fetch(`${apiUrl}/v1/profile/create`, {
        method: 'POST',
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log(data); // Success handling
    } catch (error) {
      console.error(error); // Error handling
    }
  };

  const [imageUpload, setImageUpload] = useState<ImageUploadState>({ file: null, previewUrl: null });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImageUpload({
        file: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <h2>プロフィール作成</h2>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="nick_name"
          label="表示名(ニックネーム)"
          name="nick_name"
          autoComplete="nick_name"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="sex"
          label="性別"
          name="sex"
          autoComplete="sex"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="age"
          label="表示年齢"
          name="age"
          autoComplete="age"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="職業"
          name="title"
          autoComplete="title"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          id="company"
          label="会社名"
          name="company"
          autoComplete="company"
          autoFocus
          onChange={handleChange}
        />
        <Tooltip title="認証に使います">
          <TextField
            margin="normal"
            fullWidth
            id="company_email"
            label="会社のメールアドレス"
            name="company_email"
            autoComplete="company email"
            autoFocus
            onChange={handleChange}
          />
        </Tooltip>
        <TextField
          margin="normal"
          fullWidth
          id="detail"
          label="自己紹介"
          name="detail"
          autoComplete="detail"
          autoFocus
          onChange={handleChange}
        />
        <div>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {imageUpload.previewUrl && <img src={imageUpload.previewUrl} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
        </div>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileCreate;