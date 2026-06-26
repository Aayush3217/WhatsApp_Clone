import React, { useState } from 'react'
import useLayoutStore from '../../store/layoutStore';
import userThemeStore from '../../store/themeStore';
import UserStore from '../../store/useUserStore';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion'
import formatTimestamp from '../../utils/formatTime';

const ChatList = ({ contacts }) => {

  const setSelectedContact = useLayoutStore((state) => state.setSelectedContact);
  const selectedContact = useLayoutStore(state => state.selectedContact);
  const { theme } = userThemeStore();
  const { user } = UserStore();
  const [searchTerm, setSearchTerm] = useState("");
  // const filteredContacts = contacts?.filter((contact) => contact?.username?.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredContacts = contacts?.filter((contact) => {
    const name =
      contact?.username ||
      contact?.phoneNumber ||
      contact?.email ||
      "";

    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log(filteredContacts)

  return (
    <div className={`w-full border-r h-screen ${theme === "dark" ? "bg-[rgb(17,27,33)] border-gray-600" : "bg-white border-gray-200"}`}>
      <div className={`p-4 flex justify-between ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        <h2 className='text-xl font-semibold'>
          Chats
        </h2>
        <button className='p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors'>
          <FaPlus />
        </button>
      </div>
      <div className='p-2'>
        <div className='relative'>
          <FaSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-800"}`}
          />
          <input
            type='text'
            placeholder='Search or start new chat'
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${theme === "dark" ? "bg-gray-800 text-white border-gray-700 placeholder-gray-500" : "bg-gray-100 text-black border-gray-200 placeholder-gray-400"}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='overflow-y-auto h-[calc(100vh-120px)]'>
        {filteredContacts.map((contact) => (
          <motion.div
            key={contact._id}
            onClick={() => setSelectedContact(contact)}
            className={`p-3 flex items-center cursor-pointer ${theme === "dark" ? selectedContact?._id === contact?._id ? "bg-gray-700" : "hover:bg-gray-900" : selectedContact?._id === contact?._id ? "bg-gray-200" : "hover:bg-gray-100"}`}
          >

            <img
              src={contact?.profilePicture}
              alt={contact?.username}
              className='w-12 h-12 rounded-full'
            />

            {/* <img
              src={
                contact?.profilePicture ||
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(
                  contact?.username ||
                  contact?.phoneNumber ||
                  contact?.email ||
                  "User"
                )
              }
              alt={
                contact?.username ||
                contact?.phoneNumber ||
                contact?.email
              }
              className="w-12 h-12 rounded-full"
            /> */}

            <div className='ml-3 flex-1'>
              <div className='flex justify-between items-baseline'>
                <h2 className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {contact?.username || contact?.phoneNumber || contact?.email}
                </h2>
                {contact?.conversation && (
                  <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {formatTimestamp(contact?.conversation?.lastMessage?.createdAt)}
                  </span>
                )}
              </div>
              <div className='flex justify-between items-baseline'>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"} truncate`}>
                  {contact?.conversation?.lastMessage?.content}
                </p>
                <p>
                  {contact?.conversation && contact?.conversation?.unreadCount > 0 && contact?.conversation?.lastMessage?.receiver === user?._id && (
                    <p className={`text-sm font-semibold w-6 h-6 flex items-center justify-center bg-yellow-500 ${theme === "dark" ? "text-gray-800" : "text-gray-500"} rounded-full truncate`}>
                      {contact?.conversation?.unreadCount}
                    </p>
                  )}
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  )
}

export default ChatList






// import React, { useMemo, useState } from "react";
// import useLayoutStore from "../../store/layoutStore";
// import userThemeStore from "../../store/themeStore";
// import UserStore from "../../store/useUserStore";
// import { FaPlus, FaSearch } from "react-icons/fa";
// import { motion } from "framer-motion";
// import formatTimestamp from "../../utils/formatTime";

// const ChatList = ({ contacts = [] }) => {
//   const setSelectedContact = useLayoutStore(
//     (state) => state.setSelectedContact
//   );
//   const selectedContact = useLayoutStore(
//     (state) => state.selectedContact
//   );

//   const { theme } = userThemeStore();
//   const { user } = UserStore();

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredContacts = useMemo(() => {
//     return contacts.filter((contact) => {
//       const name =
//         contact.username ||
//         contact.phoneNumber ||
//         contact.email ||
//         "";

//       return name
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//     });
//   }, [contacts, searchTerm]);

//   console.log("Contacts:", contacts);
//   console.log("Filtered:", filteredContacts);

//   return (
//     <div
//       className={`w-full border-r h-screen ${
//         theme === "dark"
//           ? "bg-[rgb(17,27,33)] border-gray-600"
//           : "bg-white border-gray-200"
//       }`}
//     >
//       <div
//         className={`p-4 flex justify-between ${
//           theme === "dark"
//             ? "text-white"
//             : "text-gray-800"
//         }`}
//       >
//         <h2 className="text-xl font-semibold">Chats</h2>

//         <button className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
//           <FaPlus />
//         </button>
//       </div>

//       <div className="p-2">
//         <div className="relative">
//           <FaSearch
//             className={`absolute left-3 top-1/2 -translate-y-1/2 ${
//               theme === "dark"
//                 ? "text-gray-400"
//                 : "text-gray-700"
//             }`}
//           />

//           <input
//             type="text"
//             placeholder="Search or start new chat"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 ${
//               theme === "dark"
//                 ? "bg-gray-800 border-gray-700 text-white"
//                 : "bg-gray-100 border-gray-200 text-black"
//             }`}
//           />
//         </div>
//       </div>

//       <div className="overflow-y-auto h-[calc(100vh-120px)]">
//         {filteredContacts.length === 0 && (
//           <div className="text-center mt-10 text-gray-500">
//             No Contacts Found
//           </div>
//         )}

//         {filteredContacts.map((contact) => {
//           const displayName =
//             contact.username ||
//             contact.phoneNumber ||
//             contact.email ||
//             "Unknown User";

//           const avatar =
//             contact.profilePicture ||
//             `https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
//               displayName
//             )}`;

//           return (
//             <motion.div
//               key={contact._id}
//               whileHover={{ scale: 1.01 }}
//               onClick={() => setSelectedContact(contact)}
//               className={`p-3 flex items-center cursor-pointer ${
//                 theme === "dark"
//                   ? selectedContact?._id === contact._id
//                     ? "bg-gray-700"
//                     : "hover:bg-gray-900"
//                   : selectedContact?._id === contact._id
//                   ? "bg-gray-200"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <img
//                 src={avatar}
//                 alt={displayName}
//                 className="w-12 h-12 rounded-full object-cover"
//               />

//               <div className="ml-3 flex-1">
//                 <div className="flex justify-between">
//                   <h2
//                     className={`font-semibold ${
//                       theme === "dark"
//                         ? "text-white"
//                         : "text-black"
//                     }`}
//                   >
//                     {displayName}
//                   </h2>

//                   {contact.conversation?.lastMessage && (
//                     <span
//                       className={`text-xs ${
//                         theme === "dark"
//                           ? "text-gray-400"
//                           : "text-gray-500"
//                       }`}
//                     >
//                       {formatTimestamp(
//                         contact.conversation.lastMessage.createdAt
//                       )}
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <p
//                     className={`text-sm truncate ${
//                       theme === "dark"
//                         ? "text-gray-400"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {contact.conversation?.lastMessage?.content ||
//                       "No messages yet"}
//                   </p>

//                   {contact.conversation?.unreadCount > 0 &&
//                     contact.conversation.lastMessage?.receiver ===
//                       user?._id && (
//                       <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
//                         {contact.conversation.unreadCount}
//                       </div>
//                     )}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ChatList;