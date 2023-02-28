import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "contexts/auth";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";

export const MainListItems = () => {
  const router = useRouter();

  const pageCurrent = useMemo(() => {
    return router.asPath.split("#")[1] ?? "";
  }, [router]);

  return (
    <>
      <ListItemButton
        onClick={() =>
          router.push({
            pathname: "/upax",
            hash: "employees",
          })
        }
        selected={pageCurrent === "employees"}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="EMPLOYEES" />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          router.push({
            pathname: "/upax",
            hash: "upload",
          })
        }
        selected={pageCurrent === "upload"}
      >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="UPLOAD" />
      </ListItemButton>
    </>
  );
};

export const SecondaryListItems = () => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <>
      <ListItemButton onClick={() => logoutUser()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItemButton>
    </>
  );
};
