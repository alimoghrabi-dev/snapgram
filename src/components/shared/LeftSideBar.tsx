import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAcountMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";

const LeftSideBar = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { user } = useUserContext();

  const { mutate: signOut, isSuccess } = useSignOutAcountMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-7">
        <Link to="/" className="flex gap-3 items-start">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <div className="w-full bg-dark-4 h-px" />
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt="profile"
            className="w-14 h-14 rounded-full"
          />
          <div className="flex flex-col gap-1">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-3.5">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = link.route === pathname;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="shad-button_ghost"
        onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSideBar;
