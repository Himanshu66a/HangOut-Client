import "./Topbar.css";
import {
  Chat,
  Group,
 Person
} from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import CloseFriend from "./closeFriend/CloseFriend";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const AU = process.env.REACT_APP_URI;


export default function Topbar({ setblur }) {
  const navigate = useNavigate()
  const sidemenu = useRef();
  const [users, setuser] = useState([]);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(AU + 'users/all');
      setuser(res.data);
    };
    fetchUser();
  }, [])

  const showSidebar = (e) => {
    console.log('called');
    if (sidemenu.current.style.display == 'block') {
      sidemenu.current.style.display = 'none';
      setblur(false)
    } else {
      sidemenu.current.style.display = 'block';

      setblur(true)

    }
  }


  return (
    <>
      <div className="topbarContainer">
      <div className="ham">
            <MenuIcon className="hamicon" onClick={showSidebar} />
          </div>
        <div className="topbarLeft">
          
          <div className="logo-container" onClick={() => navigate('/')} >
            <div className="logo-img">
              <img src={PF + 'Logo.png'} alt="" />
            </div>
            <span>HangOut</span>
          </div>


        </div>
        <div className="top-sidebar" ref={sidemenu}  >
          <CloseIcon className="close" onClick={showSidebar} />
          <div className="top-sidebarWrapper">           
            <div className="top-recommend">
              <Group className="top-sidebarIcon" />
              Recommended Users

            </div>
             <hr className="top-sidebarHr" />
            <ul className="top-sidebarFriendList">
              {users.map((user) => (
                <CloseFriend key={user._id} user={user} showSidebar={showSidebar} />
              ))}
            </ul>
          </div>
        </div>
        <div className="topbarCenter">
          <div className="top-home" onClick={() => navigate('/')}>
            <HomeIcon />
            <span>Homepage</span>
          </div>
          <div className="top-profile" onClick={() => navigate(`/profile/${user.username}`)}>
            <Person />
            <span>Profile</span>
          </div>
          <div className="top-messages" onClick={() => navigate(`/messenger`)}>
            <Chat />
            <span>Messenger</span>
          </div>
        </div>


        <div className="hidden-msg">
        <div className="top-messages" onClick={() => navigate(`/messenger`)}>
            <Chat />
            <span>Messenger</span>
          </div>
        </div>

        <div className="topbarRight">
          <div className="topbarimgcontainer">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="topbarImg"
              />
            </Link>
          </div>

        </div>
      </div>





    </>
  );
}