import { Button, Typography, Paper, Container, Box } from "@mui/material/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  check_token,
  get_lock_list,
  admin_defuse_lock
} from "../../../common/api/inter_process.js";
import theme from "../../theme/theme.tsx";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mui_normal_theme from "../../theme/muitheme.tsx";

const Admin_lock_list = () => {
  var token;
  const location = useLocation();
  const navigate = useNavigate();
  const [lock_list, set_lock_list] = useState([]);
  //トークンチェックをする
  const checktoken = async () => {
    if (location.state == null) {
      navigate("/login");
    }
    const messagestate = location.state as MessageState;
    if ((await check_token(messagestate.message)) !== 200) {
      navigate("/login");
    } else {
      token = messagestate.message;
    }
  };
 //ユーザーリスト取得
  const get_locklist = async () => {
    const messagestate = location.state as MessageState;
    set_lock_list(await get_lock_list(messagestate.message));
  };


  //ユーザー削除
  const defuse_lock_click=async (e)=>{
    const messagestate = location.state as MessageState;
    if(await admin_defuse_lock(e.target.id,messagestate.message)===200){
      //成功
      window.location.reload();
    }else{
      //失敗
      alert("リクエストの処理に失敗しました");
    }
  }
  useEffect(() => {
    checktoken();
    //ユーザーリスト取得
    get_locklist();
  }, []);
  return (
    <ThemeProvider theme={mui_normal_theme}>
      <Container maxWidth="md">
        <Paper elevation={8}>
          <Typography sx={theme.Big_label}>ロックリスト</Typography>
        </Paper>
        <Box sx={{ margin: "10px", textAlign: "center" }}>
        <Typography sx={theme.Midiam_label}>
            利用者ID  
        </Typography>
        </Box>
        {lock_list.map((element) => {
          return (
            <Box sx={{ margin: "10px", textAlign: "center" }}>
              <Typography sx={theme.L_Small_label}>
               {element.user}  :
                <Button 
                  variant="contained"
                  color="primary"
                  id={element.user}
                  onClick={defuse_lock_click}>
                  解除
                  </Button>
              </Typography>
            </Box>
          );
        })}
      </Container>
    </ThemeProvider>
  );
};
export default Admin_lock_list;