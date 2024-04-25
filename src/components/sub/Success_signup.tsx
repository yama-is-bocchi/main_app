import { useNavigate, Link } from "react-router-dom";
import theme from "../theme/theme.tsx";
import {
  Button,
  Typography,
  Paper,
  Container,
  Box,
  TextField,
} from "@mui/material/";

const Success_signup = () => {
  return( <Container maxWidth="xl">
<Paper elevation={8}>
        <Typography sx={theme.Big_label}>学習型英単語サービス</Typography>
      </Paper>
      <Box sx={{margin:"100px",textAlign:"center"}}>
      <Typography sx={theme.Midiam_label}>作成が完了しました!</Typography>
        </Box>
        <Box sx={{margin:"100px",textAlign:"center"}}>
        <Typography sx={theme.Midiam_label}>以下のリンクからログインを完了してください<br />
        <Link to="/Login">ログイン画面</Link>
        </Typography>
        </Box>
  </Container>
  )
};

export default Success_signup;
