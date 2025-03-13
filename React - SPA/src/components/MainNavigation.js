import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
//NavLink can be a replacement for Link
//NavLink takes a className prop
//  which takes
//            --> a function parameter
//  which takes
//            --> an object parameter
//  which takes
//            --> an isActive parameter

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              //   style = {({isActive}) => ({
              //     textAlign: isActive ? 'center' : 'left'
              //   })}

              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
