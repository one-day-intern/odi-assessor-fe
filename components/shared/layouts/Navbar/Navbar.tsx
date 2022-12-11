import { Dropdown } from "@components/shared/elements/Dropdown";
import { OdiLogo } from "@components/shared/svg/OdiLogo";
import { useAuthContext } from "@context/Authentication";
import { useLogout } from "@hooks/Logout";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";

import styles from "./Navbar.module.css";
import { NotificationGroup } from "./NotificationGroup";

interface Dropdowns {
  id: number;
  name: string;
  isOpen: boolean;
}

const initialDropdownState: Dropdowns[] = [
  {
    id: 1,
    name: "modules",
    isOpen: false,
  },
  {
    id: 2,
    name: "profile",
    isOpen: false,
  },
];

const Navbar = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [dropdownState, setDropdownState] =
    useState<Dropdowns[]>(initialDropdownState);
  const [routerPath, setRouterPath] = useState("");

  useEffect(() => {
    setRouterPath(router.pathname);
  }, [router.pathname]);

  const profileDropdown = useMemo(
    () => [
      {
        id: 1,
        reactElement: () => (
          <button className={styles["button--logout"]} onClick={logout}>
            <p className={styles["dropdown__text"]}>Logout</p>
          </button>
        ),
      },
    ],
    [logout]
  );

  const moduleDropdown = useMemo(
    () => [
      {
        id: 1,
        reactElement: () => (
          <Link href="/assignment/create">
            <div className={`${styles["button--logout"]}`}>
              <p className={styles["dropdown__text"]}>Assignment</p>
            </div>
          </Link>
        ),
      },
      {
        id: 2,
        reactElement: () => (
          <Link href="/responsetest/create">
            <div className={`${styles["button--logout"]}`}>
              <p className={styles["dropdown__text"]}>Response Test</p>
            </div>
          </Link>
        ),
      },
    ],
    []
  );

  const setGlobalDropdownState =
    (id: number, state: boolean): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.stopPropagation();
      if (!state) {
        setDropdownState((prev) =>
          prev.map((dropdown) => ({
            ...dropdown,
            isOpen: dropdown.id === id ? state : dropdown.isOpen,
          }))
        );
        return;
      }

      setDropdownState((prev) =>
        prev.map((dropdown) => ({
          ...dropdown,
          isOpen: dropdown.id === id ? state : false,
        }))
      );
    };

  useEffect(() => {
    const closeAllDropdowns = () => {
      setDropdownState((prev) =>
        prev.map((dropdown) => ({
          ...dropdown,
          isOpen: false,
        }))
      );
    };

    window.addEventListener("click", closeAllDropdowns);
    return () => window.removeEventListener("click", closeAllDropdowns);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className={styles["navbar"]} data-testid="navbar">
      <Link href="/">
        <a>
          <OdiLogo width={55} height={60} />
        </a>
      </Link>

      <ul className={styles["navbar__links"]}>
        <li>
          <Link href="/">
            <a
              className={`${styles["navbar__link"]} ${
                routerPath === "/" && styles["navbar__link--selected"]
              }`}
            >
              My Assessments
            </a>
          </Link>
        </li>
        <li>
          <Dropdown
            isOpened={dropdownState[0].isOpen}
            setOpened={setGlobalDropdownState(1, !dropdownState[0].isOpen)}
            dropdownElements={moduleDropdown}
          >
            <p data-testid="dropdown-1" className={styles["navbar__link"]}>
              Modules
            </p>
          </Dropdown>
        </li>
        <li>
          <Link href="/testflow/create">
            <a
              className={`${styles["navbar__link"]} ${
                routerPath === "/testflow/create" &&
                styles["navbar__link--selected"]
              }`}
            >
              Flow Builder
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles["navbar__link"]}>Candidates</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className={styles["navbar__link"]}>About Us</a>
          </Link>
        </li>
      </ul>

      <div className={styles["user-group"]}>
        <NotificationGroup count={11} />
        <Dropdown
          style={{
            color: "black",
            opacity: 1,
          }}
          isOpened={dropdownState[1].isOpen}
          setOpened={setGlobalDropdownState(2, !dropdownState[1].isOpen)}
          dropdownElements={profileDropdown}
        >
          <p data-testid="dropdown-2" className={styles["user-info"]}>{`${
            user?.first_name ?? ""
          } ${user?.last_name ?? ""}`}</p>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
