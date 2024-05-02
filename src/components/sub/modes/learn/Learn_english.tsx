import {
  FormGroup,
  Button,
  Typography,
  Paper,
  Container,
  Box,
} from "@mui/material/";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  check_token,
  post_answear_data,
  get_user_id,
  get_word_list,
  get_learn_word_list
} from "../../../../common/api/inter_process.js";
import theme from "../../../theme/theme.tsx";

import mui_learn_theme from "../../../theme/Learn_theme.tsx";
import React, { useEffect, useState } from "react";
import { editvalidation_check, get_random,loading_st,loading_end } from "../../../method/methods.tsx";

const Learn_english = () => {
  var token; //トークン
  var word_array = new Array(4);
  var ans_num = get_random(0, 3);
  const location = useLocation();
  const navigate = useNavigate();
  const [word_list, set_word_list] = useState([]);
  const [ans, setans] = useState("");
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

  //単語リスト取得をする
  const get_word = async () => {
    const messagestate = location.state as MessageState;
    var user_id=await get_user_id(messagestate.message);
    set_word_list(await get_learn_word_list(user_id,messagestate.message));
    
    
  };


  //トークンチェック
  useEffect(() => {
    (async () => {
      await checktoken();
      await get_word();
      loading_end();
    })();
  }, []);

  const change_quetion = (label: String) => {
    var element = document.getElementById("question");
    element.textContent = label;
  };

  //スタートボタンクリック
  const game_start = async() => {
    (async () => {
      //単語リスト取得
      await change_quetion(word_list[ans_num].eng_word_mean);
      var element = document.getElementById("stand_by_body");
      element.style.display = "none";
      element = document.getElementById("game_body");
      element.style.display = "";
    })();
  };

  //次の問題
  const next_question = () => {
    (async () => {
      //単語リスト取得
      await loading_st();
      await change_quetion(word_list[ans_num].eng_word_mean);
      var element = document.getElementById("correct_body");
      element.style.display = "none";
      var element = document.getElementById("incorrect_body");
      element.style.display = "none";
      element = document.getElementById("game_body");
      element.style.display = "";
      loading_end();
    })();
  };

  //単語ボタンクリック
  const word_btn_click = async (e) => {
    await loading_st();
    for (let i = 0; i < 4; i++) {
      word_array[i] = word_list[i].eng_word;
    }
    let selected_btn_num = word_array.indexOf(e.target.textContent);
    if (selected_btn_num === ans_num) {
      //正解の時
      var element = document.getElementById("correct_body");
      element.style.display = "";
      element = document.getElementById("game_body");
      element.style.display = "none";
      element = document.getElementById("correct_span");
      element.textContent =
        word_list[ans_num].eng_word + ":" + word_list[ans_num].eng_word_mean;
    } else {
      //不正解の時
      const messagestate = location.state as MessageState;
      var element = document.getElementById("incorrect_body");
      element.style.display = "";
      element = document.getElementById("game_body");
      element.style.display = "none";
      //本当の答え
      element = document.getElementById("right_correct_span");
      element.textContent =
        word_list[ans_num].eng_word + ":" + word_list[ans_num].eng_word_mean;
      //間違えた問題
      element = document.getElementById("incorrect_span");
      element.textContent =
        word_list[selected_btn_num].eng_word +
        ":" +
        word_list[selected_btn_num].eng_word_mean;
      //トークンからIDを取得する
      //サーバーに送信
      await post_answear_data(
        await get_user_id(messagestate.message),
        word_list[selected_btn_num].eng_word,
        messagestate.message
      );
    }
    await get_word();
    ans_num = await get_random(0, 3);
    loading_end();
  };

  return (
    <ThemeProvider theme={mui_learn_theme}>
      <Container maxWidth="xl">
        <body id="loading" style={{ display: "none" }}>
          <body id="stand_by_body" style={{ display: "" }}>
            <Box sx={{ margin: "370px" }}>
              <Button
                sx={theme.Button_game}
                variant="contained"
                color="primary"
                onClick={game_start}
              >
                <Typography sx={theme.Big_label}>
                  <span>スタート</span>
                </Typography>
              </Button>
            </Box>
          </body>
          <body id="game_body" style={{ display: "none" }}>
            <Box sx={{ margin: "30px" }}>
              <Paper elevation={10}>
                <Typography sx={theme.Big_label}>
                  <span id="question"></span>
                </Typography>
              </Paper>
            </Box>
            <FormGroup>
              {word_list.map((element) => {
                return (
                  <Box sx={{ margin: "10px", textAlign: "center" }}>
                    <Button
                      sx={theme.Button_game}
                      variant="contained"
                      color="primary"
                      onClick={word_btn_click}
                    >
                      <Typography sx={theme.L_Midiam_label}>
                        <span>{element.eng_word}</span>
                      </Typography>
                    </Button>
                  </Box>
                );
              })}
            </FormGroup>
          </body>
          <body id="correct_body" style={{ display: "none" }}>
            <Box sx={{ margin: "50px" }}>
              <Typography sx={theme.Big_label} color={{ color: "#ff0000" }}>
                <span>正解〇</span>
              </Typography>
            </Box>
            <Box sx={{ margin: "50px" }}>
              <Typography sx={theme.Big_label}>
                <span id="correct_span"></span>
              </Typography>
              <Box sx={{ margin: "10px", textAlign: "center" }}>
                <Button
                  sx={theme.Button_game}
                  variant="contained"
                  color="primary"
                  onClick={next_question}
                >
                  <Typography sx={theme.L_Midiam_label}>
                    <span>次の問題</span>
                  </Typography>
                </Button>
              </Box>
            </Box>
          </body>
          <body id="incorrect_body" style={{ display: "none" }}>
            <Box sx={{ margin: "50px" }}>
              <Typography sx={theme.Big_label} color={{ color: "#0000ff" }}>
                <span>不正解×</span>
              </Typography>
            </Box>
            <Box sx={{ margin: "50px" }}>
              <Typography sx={theme.Big_label}>
                <span id="right_correct_span"></span>
              </Typography>
              <Typography sx={theme.Big_label}>
                <span id="incorrect_span"></span>
              </Typography>
              <Box sx={{ margin: "10px", textAlign: "center" }}>
                <Button
                  sx={theme.Button_game}
                  variant="contained"
                  color="primary"
                  onClick={next_question}
                >
                  <Typography sx={theme.L_Midiam_label}>
                    <span>次の問題</span>
                  </Typography>
                </Button>
              </Box>
            </Box>
          </body>
        </body>
      </Container>
    </ThemeProvider>
  );
};

export default Learn_english;