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
    update_word
  } from "../../../../common/api/inter_process.js";
  import theme from "../../../theme/theme.tsx";
  import React, { useEffect, useState } from "react";
  import { ThemeProvider } from "@mui/material/styles";
  import mui_normal_theme from "../../../theme/muitheme.tsx";
  import { editvalidation_check } from "../../../method/methods.tsx";
  
  
  const Admin_edit_word = () => {
    var token;
    const location = useLocation();
    const navigate = useNavigate();
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
      if ((await check_token(state.toast.message)) !== 200) {
        navigate("/login");
      } else {
        token = state.toast.message;
      }
    };
    //元々のパスワードを入力
    const set_word=()=>{
      var elm = document.getElementById("mean");
      elm.value = messages.toast.mean;
      elm = document.getElementById("speech");
      elm.value = messages.toast.speech;
      elm = document.getElementById("level");
      elm.value = messages.toast.level;
    }

    //変更データを送信
    const submit_click= async () =>{
        var t_mean,t_speech,t_level;
        if(mean===""){
            t_mean= messages.toast.mean;
        }else{
            t_mean=mean;
        }
        if(speech===""){
            t_speech= messages.toast.speech;
        }else{
            t_speech=speech;
        }
        if(mean===""){
            t_level= messages.toast.level;
        }else{
            t_level=level;
        }
     if( await update_word(messages.toast.word,t_mean
        ,t_speech,t_level,messages.toast.message)===200){
      navigate("/Admin_menu/Admin_word_list",{state: {message: messages.toast.message}});
     }else{
      var elm = document.getElementById("400code");
      elm.style.display = '';
     }
  }
    useEffect(() => {
      checktoken();
      //ユーザーリスト取得
      set_word();
    }, []);
    return (
      <ThemeProvider theme={mui_normal_theme}>
        <Container maxWidth="md">
          <Paper elevation={8}>
            <Typography sx={theme.Big_label}>ワードを修正</Typography>
          </Paper>
          <Typography sx={{ color:"red",fontSize:"2em"}}>
             <span id="400code"  style={{display:"none"}}>※サーバーエラーまたは制約違反です</span>
            </Typography>
          <Box sx={{ textAlign: "center", margin: "50px" }}>
            <Typography sx={theme.Midiam_label}>
              ワード:{messages.toast.word}
            </Typography>
          </Box>
          <Box sx={{ margin: "20px", textAlign: "center" }} display="flex">
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
          </Box>
          <Box sx={{ margin: "20px", textAlign: "center" }} display="flex">
            <TextField
              sx={{ width: "20vh", margin: "40px" }}
              label="レベル"
              variant="outlined"
              size="large"
              id="level"
              onChange={(e) => {
                setlevel(e.target.value);
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
  export default Admin_edit_word;