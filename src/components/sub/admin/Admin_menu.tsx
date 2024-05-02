import { Button, Typography, Paper, Container, Box } from "@mui/material/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  check_token,
  get_user_list,
} from "../../../common/api/inter_process.js";
import theme from "../../theme/theme.tsx";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mui_normal_theme from "../../theme/muitheme.tsx";

const Admin_menu = () => {
  var token;
  const location = useLocation();
  const navigate = useNavigate();
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

  //ユーザーリストクリック
  const get_user_list_click = () => {
    navigate("/Admin_menu/Admin_user_list", { state: { message: token } });
  };
  //ワードリストクリック
  const get_word_list_click = () => {
    navigate("/Admin_menu/Admin_word_list", { state: { message: token } });
  };
  //誤解答リストクリック
  const get_answer_list_click = () => {
    navigate("/Admin_menu/Admin_answer_list", { state: { message: token } });
  };
  //トークンリストクリック
  const get_token_list_click = () => {
    navigate("/Admin_menu/Admin_token_list", { state: { message: token } });
  };
  //ミスリストクリック
  const get_miss_list_click = () => {
    navigate("/Admin_menu/Admin_miss_list", { state: { message: token } });
  };
  //ロックリストクリック
  const get_lock_list_click = () => {
    navigate("/Admin_menu/Admin_lock_list", { state: { message: token } });
  };
  useEffect(() => {
    checktoken();
  }, []);
  return (
    <ThemeProvider theme={mui_normal_theme}>
      <Container maxWidth="md">
        <Paper elevation={8}>
          <Typography sx={theme.Big_label}>管理者画面</Typography>
        </Paper>
        <Box sx={{ margin: "20px" }}>
          <Box sx={{ margin: "60px" }} display="flex">
            <Button
              sx={{ width: "70vh" }}
              variant="contained"
              color="primary"
              onClick={get_user_list_click}
            >
              <Typography sx={theme.Midiam_label}>
                ユーザーパスワード変更/削除
              </Typography>
            </Button>
          </Box>

          <Box sx={{ margin: "60px" }} display="flex">
            <Button
              sx={{ width: "70vh" }}
              variant="contained"
              color="primary"
              onClick={get_word_list_click}
            >
              <Typography sx={theme.Midiam_label}>
                ワードリスト編集/追加/削除
              </Typography>
            </Button>
          </Box>

          <Box sx={{ margin: "60px" }} display="flex">
            <Button
              sx={{ width: "70vh" }}
              variant="contained"
              color="primary"
              onClick={get_answer_list_click}
            >
              <Typography sx={theme.Midiam_label}>誤解答リスト</Typography>
            </Button>
          </Box>
          <Box sx={{ margin: "60px" }} display="flex">
            <Button
              sx={{ width: "70vh" }}
              variant="contained"
              color="primary"
              onClick={get_token_list_click}
            >
              <Typography sx={theme.Midiam_label}>トークンリスト</Typography>
            </Button>
          </Box>
          <Box sx={{ margin: "60px" }} display="flex">
            <Button
              sx={{ width: "70vh" }}
              variant="contained"
              color="primary"
              onClick={get_miss_list_click}
            >
              <Typography sx={theme.Midiam_label}>
                ミステーブルリスト
              </Typography>
            </Button>
          </Box>
          <Box sx={{ margin: "60px" }} display="flex">
            <Button sx={{ width: "70vh" }} variant="contained" color="primary" onClick={get_lock_list_click}>
              <Typography sx={theme.Midiam_label}>ロックリスト編集</Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Admin_menu;
