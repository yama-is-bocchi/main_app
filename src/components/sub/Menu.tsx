import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
} from "@mui/material/";
import { useNavigate,useLocation } from "react-router-dom";
import {
  check_token
} from "../../common/api/inter_process.js";
import theme from "../theme/theme.tsx";
import React, { useEffect } from "react";

const Menu = () => {
  let normal = false;
  let ans_japanese = false;
  var token;
  const location = useLocation();
  const navigate = useNavigate();

  //通常モード選択
  const normalclick = () => {
    normal = true;
    mode_selected();
  };

  //学習型モード選択
  const learnclick = () => {
    normal = false;
    mode_selected();
  };

  //モード選択共通メソッド
  const mode_selected = () => {
    var elm = document.getElementById("menu_tag");
    elm.style.display = "none";
    elm = document.getElementById("language_tag");
    elm.style.display = "";
  };

  //戻るクリック
  const exit_click = () => {
    var elm = document.getElementById("menu_tag");
    elm.style.display = "";
    elm = document.getElementById("language_tag");
    elm.style.display = "none";
  };

  //日本語モード選択
  const japanese_click = () => {
    ans_japanese = true;
    language_selected();
  };

  //英語モード選択
  const english_click = () => {
    ans_japanese = false;
    language_selected();
  };



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

  //トークンチェック
  useEffect(() => {
    checktoken();
  }, []);

    //言語選択共通メソッド
    //画面遷移メソッド
    const language_selected = () => {
      //対象のモードに画面遷移
      if(normal===true){
        //通常モードで日本語解答
        if(ans_japanese===true){
          navigate("/Menu/Normal_japanese",{state: {message: token}});

        }
        else//通常モードで英語解答
        {
          navigate("/Menu/Normal_english",{state: {message: token}});
        }
      }else{
        //学習モードで日本語解答
        if(ans_japanese===true){

          navigate("/Menu/Learn_japanese",{state: {message: token}});

        }
        else//学習モードで英語解答
        {
          navigate("/Menu/Learn_english",{state: {message: token}});
        }
      }
    };

  return (
    <Container maxWidth="xl">
      <Paper elevation={8}>
        <Typography sx={theme.Big_label}>メニュー画面</Typography>
      </Paper>
      <h1 id="menu_tag" style={{ display: "" }}>
        <Box sx={{ textAlign: "center", margin: "150px" }}>
          <Box sx={{ textAlign: "center", margin: "100px" }} display="flex">
            <Button
              sx={{ margin: "30px", width: "150vh" }}
              variant="contained"
              color="primary"
              onClick={normalclick}
            >
              <Typography sx={theme.Big_label}>通常モード</Typography>
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", margin: "100px" }} display="flex">
            <Button
              sx={{ margin: "30px", width: "150vh" }}
              variant="contained"
              color="primary"
              onClick={learnclick}
            >
              <Typography sx={theme.Big_label}>学習型サービス</Typography>
            </Button>
          </Box>
        </Box>
      </h1>
      <h2 id="language_tag" style={{ display: "none" }}>
        <Button
          sx={{ margin: "30px", width: "10vh" }}
          variant="contained"
          color="primary"
          onClick={exit_click}
        >
          戻る
        </Button>
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ textAlign: "center", margin: "50px" }} display="flex">
            <Button
              sx={{ margin: "30px", width: "150vh" }}
              variant="contained"
              color="primary"
              onClick={japanese_click}
            >
              <Typography sx={theme.Big_label}>日本語を解答</Typography>
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", margin: "50px" }} display="flex">
            <Button
              sx={{ margin: "30px", width: "150vh" }}
              variant="contained"
              color="primary"
              onClick={english_click}
            >
              <Typography sx={theme.Big_label}>英語を解答</Typography>
            </Button>
          </Box>
        </Box>
      </h2>
    </Container>
  );
};

export default Menu;
