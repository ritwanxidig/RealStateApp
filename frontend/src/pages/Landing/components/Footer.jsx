import { Box, Typography } from "@mui/material";
import Logo from '../../../components/logo/Logo'
import { Link } from "react-router-dom";
import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconWorld, IconX } from "@tabler/icons-react";
import { useSelector } from "react-redux";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const IconContainer = ({ children }) => {
  const { darkMode } = useSelector(state => state.theme)
  return (
    <Typography className="opacity-80 transition-opacity hover:opacity-100" sx={{ p: 1, backgroundColor: darkMode ? 'primary.800' : 'primary.100', color: 'primary.main', borderRadius: '5px' }}>
      {children}
    </Typography>
  )
}

const currentYear = new Date().getFullYear();

function Footer() {
  const { darkMode } = useSelector(state => state.theme)
  return (
    <Box className="relative w-full mt-4" sx={{ backgroundColor: darkMode ? "grey.800" : "grey.100", py: 2 }}>
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6">
            <Logo />
          </Typography>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  fontFamily="Plus Jakarta Sans"
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as={Link}
                      href="#"
                      color="gray"
                      sx={{ fontFamily: 'Plus Jakarta Sans' }}
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            sx={{ fontFamily: 'Plus Jakarta Sans' }}
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear} <Link to="/">Ritwan Abdirashit</Link>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <IconContainer>
              <IconBrandFacebook />
            </IconContainer>
            <IconContainer >
              <IconBrandInstagram />
            </IconContainer>
            <IconContainer>
              <IconBrandGithub />
            </IconContainer>
            <IconContainer>
              <IconWorld />
            </IconContainer>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Footer