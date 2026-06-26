// import React, { useEffect, useState } from 'react'
// import Layout from './Layout'
// import {motion} from 'framer-motion'
// import ChatList from '../pages/chatSection/ChatList'
// import useLayoutStore from '../store/layoutStore'
// import { getAllUsers } from '../services/userServices'
// import ChatWindow from '../pages/chatSection/ChatWindow'
// import { FaCalendar } from 'react-icons/fa'

// const HomePage = () => {
  
//   const [allUsers, setAllUsers] = useState([]);

//   const getAllUser = async() => {
//     try {
//       const result = await getAllUsers();
//       if(result.status === 'success'){
//         console.log("All Users:", result.data);
//         setAllUsers(result.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getAllUser();
//   },[])

//   // console.log(allUsers);

//   return (
//       <Layout>
//         <motion.div
//         initial = {{opacity:0}}
//         animate = {{opacity:1}}
//         transition = {{duration:0.5}}
//         className='h-full'
//         >
//           <ChatList contacts={allUsers}/>
          
//         </motion.div>
//       </Layout>
//   )
// }

// export default HomePage






import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import ChatList from "../pages/chatSection/ChatList";
import { getAllUsers } from "../services/userServices";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUser = async () => {
    try {
      console.log("========== GET ALL USERS ==========");

      const result = await getAllUsers();

      console.log("Full API Response:", result);

      if (result.status === "success") {
        console.log("Users received from backend:");
        console.table(result.data);

        result.data.forEach((user, index) => {
          console.log(`User ${index + 1}`);
          console.log("ID:", user._id);
          console.log("Username:", user.username);
          console.log("Email:", user.email);
          console.log("Phone:", user.phoneNumber);
          console.log("-----------------------------");
        });

        setAllUsers(result.data);
      } else {
        console.log("API Error:", result.message);
      }
    } catch (error) {
      console.error("GET ALL USERS ERROR");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <ChatList contacts={allUsers} />
      </motion.div>
    </Layout>
  );
};

export default HomePage;