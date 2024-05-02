import { Button, Typography, Paper, Container, Box } from "@mui/material/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  check_token,
  get_user_list,
  delete_user
} from "../../../common/api/inter_process.js";
import theme from "../../theme/theme.tsx";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mui_normal_theme from "../../theme/muitheme.tsx";

const Admin_user_list = () => {
  var token;
  const location = useLocation();
  const navigate = useNavigate();
  const [user_list, set_user_list] = useState([]);
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
  const get_userlist = async () => {
    const messagestate = location.state as MessageState;
    set_user_list(await get_user_list(messagestate.message));
  };



  //ユーザーパスワード変更
  const edit_user_password_click=(e)=>{
    //修正画面へ遷移
    const messagestate = location.state as MessageState;
    navigate("/Admin_menu/Admin_user_list/edit_user",{
        state: {
          toast: { user_id: e.target.id,password:e.target.textContent, message: messagestate.message},
        },
      });
  }
  //ユーザー削除
  const delete_user_click=async (e)=>{
    const messagestate = location.state as MessageState;
    if(await delete_user(e.target.id,messagestate.message)===200){
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
    get_userlist();
  }, []);
  return (
    <ThemeProvider theme={mui_normal_theme}>
      <Container maxWidth="md">
        <Paper elevation={8}>
          <Typography sx={theme.Big_label}>ユーザーリスト</Typography>
        </Paper>
        <Box sx={{ margin: "10px", textAlign: "center" }}>
        <Typography sx={theme.Midiam_label}>
            利用者ID   :   パスワード
        </Typography>
        </Box>
        {user_list.map((element) => {
          return (
            <Box sx={{ margin: "10px", textAlign: "center" }}>
              <Typography sx={theme.Midiam_label}>
               {element.user_id}  :
                <Button
                  sx={{ width: "20vh" }}
                  variant="contained"
                  color="primary"
                  id={element.user_id}
                  onClick={edit_user_password_click}
                >
                {element.password}
                </Button>:
                <Button 
                  variant="contained"
                  color="primary"
                  id={element.user_id}
                  onClick={delete_user_click}>
                    削除
                  </Button>
              </Typography>
            </Box>
          );
        })}
      </Container>
    </ThemeProvider>
  );
};
export default Admin_user_list;
