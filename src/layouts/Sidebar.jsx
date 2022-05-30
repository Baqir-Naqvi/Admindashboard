import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const user = "user";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Rooms",
    href: `/table`,
    icon: "bi bi-layout-split",
  },
  {
    title: "Add Room",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Users",
    href: `/table/${user}`,
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Add Users",
    href: "/newuser",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },
];

function Sidebar() {
  let navigate = useNavigate();
  const routeChange = () => {
    localStorage.clear();
    let path = `/`;
    navigate(path);
    window.location.reload();
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          {
            localStorage.getItem("token") ? (
              <Button
              color="danger"
              target="_blank"
              className="mt-3"
              onClick={() => routeChange()}
            >
              Logout
            </Button>) : (null)
          }
         
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
