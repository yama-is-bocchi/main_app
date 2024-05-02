import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
  TextField,
} from "@mui/material/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  check_token,
  get_user_list,
  update_user_pass
} from "../../../../common/api/inter_process.js";
import theme from "../../../theme/theme.tsx";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mui_normal_theme from "../../../theme/muitheme.tsx";
import { editvalidation_check } from "../../../method/methods.tsx";


const Admin_edit_user = () => {
  var token;
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const messages = location.state as ToastData;

  //トークンチェックをする
  const checktoken = async () => {
    if (location.state === null) {
      navigate("/login");
    }
    const state = location.state as ToastData;
    if ((await check_token(state.toast.message)) !== 200) {
      navigate("/login");
    } else {
      token = state.toast.message;
    }
  };
  //元々のパスワードを入力
  const set_pass=()=>{
    var elm = document.getElementById("field");
    elm.value = messages.toast.password;
  }
  //変更データを送信
  const submit_click= async () =>{
    var t_password
  if(password===""){
    t_password=messages.toast.password;
  }else{
    t_password=password;
  }
  if(await editvalidation_check(t_password)===0){
   if( await update_user_pass(messages.toast.user_id,t_password,messages.toast.message)===200){
    navigate("/Admin_menu/Admin_user_list",{state: {message: messages.toast.message}});
   }else{
    var elm = document.getElementById("400code");
    elm.style.display = '';
   }
  }else{
    var elm = document.getElementById("400code");
    elm.style.display = '';
  }
}
  useEffect(() => {
    checktoken();
    //ユーザーリスト取得
    set_pass();
  }, []);
  return (
    <ThemeProvider theme={mui_normal_theme}>
      <Container maxWidth="md">
        <Paper elevation={8}>
          <Typography sx={theme.Big_label}>パスワードを変更</Typography>
        </Paper>
        <Typography sx={{ color:"red",fontSize:"2em"}}>
           <span id="400code"  style={{display:"none"}}>※サーバーエラーまたはパスワードが脆弱です</span>
          </Typography>
        <Box sx={{ textAlign: "center", margin: "100px" }}>
          <Typography sx={theme.Midiam_label}>
            利用者ID:{messages.toast.user_id}
          </Typography>
        </Box>
        <Box sx={{ margin: "50px", textAlign: "center" }} display="flex">
          <TextField
            sx={{ width: "100vh", margin: "40px" }}
            label="変更パスワード"
            variant="outlined"
            size="large"
            id="field"
            onChange={(e) => {
                setPassword(e.target.value);
              }}
          />
        </Box>
        <Box sx={{ margin: "50px", textAlign: "center" }}>
          <Button
            sx={{ width: "30vh" }}
            variant="contained"
            color="primary"
            onClick={submit_click}
          ><Typography sx={theme.Midiam_label}>
            送信
            </Typography>
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Admin_edit_user;
