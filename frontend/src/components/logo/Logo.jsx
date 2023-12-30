import { Link } from "react-router-dom";
import { Typography, styled } from "@mui/material";
import { IconHome } from "@tabler/icons-react";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
}));

const LogoIcon = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: 'white',
  width: "44px",
  height: "44px",
  borderRadius: "16%",
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(1),
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <LogoIcon >
        <IconHome size={30} />
      </LogoIcon>
      <span className="font-semibo tracking-widest text-2xl">RealState</span>
    </LinkStyled>
  );
};

export default Logo;
