import { BrowserRouter, Link, Route, Routes,useNavigate } from "react-router-dom";
import {Button,Typography,Paper,Container,Box} from "@mui/material/";
import theme from "../theme/theme.tsx";
import Login from "../sub/Login.tsx";
import Sign_up from "../sub/Sign_up.tsx";



const Top = () => {

  const navigate= useNavigate();


  const Login_click=() =>{
      navigate("/Login")
  };

  const Sign_up_click=() =>{
    navigate("/Sign_up")
};

  return (
    
    <Container maxWidth="xl" >
      <Paper  elevation={8}>
        <Typography sx={theme.Big_label}>学習型英単語サービス</Typography>
        </Paper>
        <Box sx={{textAlign:"center",margin:"80px"}}>
    <Button sx={{margin:"80px",width:"100vh"}} variant="contained" color="primary" onClick={Login_click}>
    <Typography sx={theme.Big_label}>ログイン</Typography>
    </Button>
    <Button sx={{margin:"80px",width:"100vh"}} variant="contained" color="primary" onClick={Sign_up_click}>
    <Typography sx={theme.Big_label}>サインアップ</Typography>
    </Button>
    </Box>
  </Container>
  
  )
 };
 export default Top;
