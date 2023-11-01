import { createBrowserRouter } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Signup from "../src/components/Signup";
import EmailSignin from "./components/EmailSignin";
import Password from "./components/Password";
import CreateNote from "../src/components/CreateNote";
import AllNotes from "../src/components/AllNotes";
import Home from "../src/components/Home";
import Recovery from "../src/components/Recovery";
import Reset from "../src/components/Reset";
import Profile from "../src/components/Profile";
import ProfileUpdate from "../src/components/ProfileUpdate";
import ShowNote from "../src/components/ShowNote";
import UpdateNote from "../src/components/UpdateNote";
import { RequiredAuth } from "./components/RequiredAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <Signup />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Navbar />
        <EmailSignin />
      </>
    ),
  },
  {
    path: "/password",
    element: (
      <>
        <Navbar />
        <Password />
      </>
    ),
  },
  {
    path: "/createnote",
    element: (
      <>
        <Navbar />
        <RequiredAuth>
          <CreateNote />
        </RequiredAuth>
      </>
    ),
  },
  {
    path: "/editnote/:id",
    element: (
      <>
        <Navbar />
        <RequiredAuth>
          <UpdateNote />
        </RequiredAuth>
      </>
    ),
  },
  {
    path: "/allnotes",
    element: (
      <>
        <Navbar />
        <RequiredAuth>
          <AllNotes />
        </RequiredAuth>
      </>
    ),
  },
  {
    path: "/shownote/:id",
    element: (
      <>
        <Navbar />
        <RequiredAuth>
          <ShowNote />
        </RequiredAuth>
      </>
    ),
  },
  {
    path: "/recovery",
    element: (
      <>
        <Navbar />
        <Recovery />
      </>
    ),
  },
  {
    path: "/reset",
    element: (
      <>
        <Navbar />
        <Reset />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <RequiredAuth>
          <Profile />
        </RequiredAuth>
      </>
    ),
  },
  {
    path: "/profileupdate",
    element: (
      <>
        <Navbar />
        <RequiredAuth>
          <ProfileUpdate />
        </RequiredAuth>
      </>
    ),
  },
]);
