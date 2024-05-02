import { Button, Typography, Paper, Container, Box } from "@mui/material/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  check_token,
  admin_get_token_list,
  delete_user
} from "../../../common/api/inter_process.js";
import theme from "../../theme/theme.tsx";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mui_normal_theme from "../../theme/muitheme.tsx";

const Admin_token_list = () => {
  var token;
  const location = useLocation();
  const navigate = useNavigate();
  const [token_list, set_token_list] = useState([]);
  const messagestate = location.state as MessageState;
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
 //誤解答リスト取得
  const get_tokenlist = async () => {
    const messagestate = location.state as MessageState;
    set_token_list(await admin_get_token_list(messagestate.message));
  };

  useEffect(() => {
    checktoken();
    //ユーザーリスト取得
    get_tokenlist();
  }, []);

  return (
    <ThemeProvider theme={mui_normal_theme}>
      <Container maxWidth="md">
        <Paper elevation={8}>
          <Typography sx={theme.Big_label}>トークンリスト</Typography>
        </Paper>
        <Box sx={{ margin: "10px", textAlign: "center" }}>
        <Typography sx={theme.Midiam_label}>
            利用者ID   :   トークン  :   日時
        </Typography>
        </Box>
        {token_list.map((element) => {
          return (
            <Box sx={{ margin: "10px", textAlign: "center" }}>
              <Typography sx={theme.S_Small_label}>
               {element.user_id}  :  {element.token}   :  {element.access_datetime}

              </Typography>
            </Box>
          );
        })}
      </Container>
    </ThemeProvider>
  );
};
export default Admin_token_list;
