import { Button, Typography, Paper, Container, Box } from "@mui/material/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  check_token,
  admin_get_word_list,
  delete_word,
  
} from "../../../common/api/inter_process.js";
import theme from "../../theme/theme.tsx";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mui_normal_theme from "../../theme/muitheme.tsx";

const Admin_word_list = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [word_list, set_word_list] = useState([]);
  const messagestate = location.state as MessageState;
  var token;

  //トークンチェックをする
  const checktoken = async () => {
    if (location.state == null) {
      navigate("/login");
    }
    if ((await check_token(messagestate.message)) !== 200) {
      navigate("/login");
    } else {
      token = messagestate.message;
    }
  };
 //ワードリスト取得
  const get_wordlist = async () => {
    set_word_list(await admin_get_word_list(messagestate.message));
  };

  //ワード編集クリック
  const word_list_click=(e)=>{
    const element=word_list.find(el=>el.eng_word===e.target.id)
    navigate("/Admin_menu/Admin_word_list/edit_word",{
        state: {
          toast: { word: e.target.id,mean:element.eng_word_mean,speech:element.eng_part_of_speech,level:element.eng_level, message: messagestate.message},
        },
      });
  }
  //ワード削除
  const delete_word_click=async (e)=>{
    const messagestate = location.state as MessageState;
    if(await delete_word(e.target.id,messagestate.message)===200){
      //成功
      window.location.reload();
    }else{
      //失敗
      alert("リクエストの処理に失敗しました");
    }
  }
  //ワード追加クリック
  const add_word=()=>{
    navigate("/Admin_menu/Admin_word_list/add_word",{state: {message:messagestate.message}});
  }


  useEffect(() => {
    checktoken();
    //ワードリスト取得
    get_wordlist();
  }, []);
  return (
    <ThemeProvider theme={mui_normal_theme}>
      <Container maxWidth="md">
        <Paper elevation={8}>
          <Typography sx={theme.Big_label}>ワードリスト</Typography>
        </Paper>
        <Box sx={{ margin: "10px", textAlign: "center" }}>
        <Typography sx={theme.Midiam_label}>
            英単語 <Button variant="contained" color="primary" onClick={add_word}>追加</Button>
        </Typography>
        </Box>
        {word_list.map((element) => {
          return (
            <Box sx={{ margin: "10px", textAlign: "center" }}>
                <Button
                  sx={{ width: "75vh" }}
                  variant="contained"
                  color="primary"
                  id={element.eng_word}
                  onClick={word_list_click}
                >
                <Typography sx={theme.L_Small_label}
                id={element.eng_word}
                onClick={word_list_click}>
                {element.eng_word},{element.eng_word_mean}
                ,{element.eng_part_of_speech},レベル:{element.eng_level}
                </Typography>
                </Button>:
                <Button 
                  variant="contained"
                  color="primary"
                  id={element.eng_word}
                  onClick={delete_word_click}>
                    <Typography sx={theme.L_Small_label}
                    id={element.eng_word}>
                    削除
                    </Typography>
                  </Button>
              
            </Box>
          );
        })}
      </Container>
    </ThemeProvider>
  );
};
export default Admin_word_list;