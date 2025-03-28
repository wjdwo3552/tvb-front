import React, { useState } from "react";
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Typography, Box } from '@mui/material';
import './Login.css';
import { getDesignTokens, inputsCustomizations } from './customTheme';
import axios from "axios";
import {useAuth} from "../../components/Api/Auth/AuthProvider";
import {useNavigate} from "react-router-dom";

const providers = [
    { id: 'github', name: 'GitHub' },
    { id: 'google', name: 'Google' },
    { id: 'credentials', name: 'Email and Password' },
];

const Login = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const mode = 'dark';
  const brandingDesignTokens = getDesignTokens(mode);


  const theme = createTheme({
      ...brandingDesignTokens,
      palette: {
          ...brandingDesignTokens.palette,
          mode: mode,
      },
      components: {
          ...inputsCustomizations,
          MuiButton: {
              ...inputsCustomizations.MuiButton,
              styleOverrides: {
                  ...inputsCustomizations.MuiButton.styleOverrides,
                  root: ({ theme }) => ({
                      ...inputsCustomizations.MuiButton.styleOverrides.root({ theme }),
                      '&.Mui-disabled': {
                          opacity: 0.5,
                          color: 'inherit',
                          backgroundColor: 'inherit',
                          backgroundImage: 'inherit',
                      },
                  }),
              },
          },
      },
  });

  const signIn = async (provider) => {
    if (provider.id === 'credentials') {
      if (!formState.email || !formState.password) {
        return { error: '이메일과 비밀번호를 모두 입력해주세요.' };
      }

      try {
        const prod_url = "https://api.tvsbox.click"
        const loca_url = "http://localhost:8080"
        const path = prod_url + "/api/v1/auth/login";


        const requestData = {
          user: {
            userId: formState.email
          },
          password: {
            password: formState.password
          }
        };
        const response = await axios.post(path, requestData, { withCredentials: true });
        const {accessToken} = response.data;

        setAccessToken(accessToken);
        navigate("/");
      } catch (error) {
        //console.error('로그인 에러:', error);
        return { error: '서버 연결에 실패했습니다.' };
      }
    }

    // 소셜 로그인 처리
    if (provider.id === 'github') {
      window.location.href = '/oauth2/authorization/github';
    } else if (provider.id === 'google') {
      window.location.href = '/oauth2/authorization/google';
    }

    return { error: '지원하지 않는 로그인 방식입니다.' };
  };

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    // const signIn = async (provider) => {
    //     if (provider.id === 'credentials') {
    //         if (!formState.email || !formState.password) {
    //             return { error: '이메일과 비밀번호를 모두 입력해주세요.' };
    //         }
    //     }
    //     const promise = new Promise((resolve) => {
    //         setTimeout(() => {
    //             console.log(`Sign in with ${provider.id}`, formState);
    //             resolve({ error: 'This is a mock error message.' });
    //         }, 500);
    //     });
    //     return promise;
    // };

    const handleInputChange = (field) => (event) => {
        setFormState((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    return (
        <div className="G12H62">
            <AppProvider theme={theme}>
                <CssBaseline />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    width: '100%'
                }}>
                    <Box sx={{ width: '100%', maxWidth: '450px' }}>
                        <SignInPage
                            signIn={signIn}
                            providers={providers}
                            sx={{
                                '& form > .MuiStack-root': {
                                    marginTop: '2rem',
                                    rowGap: '0.5rem',
                                    width: '100%',
                                    maxWidth: '450px'
                                },
                                '& form': {
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                },
                                '& .MuiTextField-root': {
                                    width: '100%'
                                },
                                '& .MuiButton-root': {
                                    width: '100%'
                                },
                                '& .MuiBox-root': {
                                    width: '100%',
                                    marginTop: '1rem'
                                }
                            }}
                            slotProps={{
                                form: {
                                    noValidate: true,
                                    onChange: (event) => {
                                        const field = event.target.name;
                                        handleInputChange(field)(event);
                                    },
                                    className: 'Z84S96'
                                },
                                submitButton: {
                                    disabled: !formState.email || !formState.password,
                                    children: 'Sign In'
                                },
                                divider: {
                                    children: null
                                },
                                socialButtons: {
                                    children: null
                                },
                                footer: {
                                    children: null
                                }
                            }}
                        />
                        <Box sx={{ mt: -16, textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Don't have an account?{' '}
                                <Button
                                    variant="text"
                                    color="primary"
                                    onClick={() => window.location.href = '/signup'}
                                    sx={{
                                        textTransform: 'none',
                                        p: 0,
                                        minWidth: 'auto',
                                        color: 'primary.main',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Typography>
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => window.location.href = '/'}
                                sx={{
                                    textTransform: 'none',
                                    color: 'text.secondary',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                ← Back to Main
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </AppProvider>
        </div>
    );
};

export default Login;