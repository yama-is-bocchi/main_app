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
  add_word,
} from "../../../../common/api/inter_process.js";
import theme from "../../../theme/theme.tsx";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mui_normal_theme from "../../../theme/muitheme.tsx";
import { editvalidation_check } from "../../../method/methods.tsx";

const Admin_add_word = () => {
  var token;
  const location = useLocation();
  const navigate = useNavigate();
  const [word, setword] = useState("");
  const [mean, setmean] = useState("");
  const [speech, setspeech] = useState("");
  const [level, setlevel] = useState("");
  const messages = location.state as ToastData;

  //トークンチェックをする
  const checktoken = async () => {
    if (location.state === null) {
      navigate("/login");
    }
    const state = location.state as ToastData;
    if ((await check_token(state.message)) !== 200) {
      navigate("/login");
    } else {
      token = state.message;
    }
  };

  //ワードを送信
  const submit_click = async () => {
    if (word !== "" && mean !== "" && speech !== "" && level !== "") {
      //サーバーに送信
      if (
        (await add_word(word, mean, speech, level, messages.message)) === 200
      ) {
        var elm = document.getElementById("word");
        elm.value = "";
        elm = document.getElementById("mean");
        elm.value = "";
        elm = document.getElementById("speech");
        elm.value = "";
        elm = document.getElementById("level");
        elm.value = "";
      }else{
        //サーバーエラー
        var elm = document.getElementById("400code");
        elm.style.display = "";
      }
    } else {
      //フィールドに空白がある
      var elm = document.getElementById("400code");
      elm.style.display = "";
    }
  };
  useEffect(() => {
    checktoken();
  }, []);

  return (
    <ThemeProvider theme={mui_normal_theme}>
      <Container maxWidth="xl">
        <Paper elevation={8}>
          <Typography sx={theme.Big_label}>ワードを追加</Typography>
        </Paper>
        <Typography sx={{ color: "red", fontSize: "2em" }}>
          <span id="400code" style={{ display: "none" }}>
            ※サーバーエラーまたは空白があります
          </span>
        </Typography>
        <Box sx={{ margin: "150px", textAlign: "center" }} />
        <Box sx={{ margin: "20px", textAlign: "center" }} display="flex">
          <TextField
            sx={{ width: "100vh", margin: "40px" }}
            label="英単語"
            variant="outlined"
            size="large"
            id="word"
            onChange={(e) => {
              setword(e.target.value);
            }}
          />

          <TextField
            sx={{ width: "100vh", margin: "40px" }}
            label="意味"
            variant="outlined"
            size="large"
            id="mean"
            onChange={(e) => {
              setmean(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ margin: "20px", textAlign: "center" }} display="flex">
          <TextField
            sx={{ width: "100vh", margin: "40px" }}
            label="品詞"
            variant="outlined"
            size="large"
            id="speech"
            onChange={(e) => {
              setspeech(e.target.value);
            }}
          />
          <TextField
            sx={{ width: "100vh", margin: "40px" }}
            label="レベル"
            variant="outlined"
            size="large"
            id="level"
            onChange={(e) => {
              setlevel(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ margin: "100px", textAlign: "center" }}>
          <Button
            sx={{ width: "30vh" }}
            variant="contained"
            color="primary"
            onClick={submit_click}
          >
            <Typography sx={theme.Midiam_label}>送信</Typography>
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Admin_add_word;
