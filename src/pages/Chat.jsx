import React, { useState, useRef, useEffect } from 'react';
import { Box, Divider, CssBaseline, CircularProgress, Typography, IconButton, Avatar } from '@mui/material';
import moment from 'jalali-moment';
import ContactList from '../components/Chat/ContactList';
import ChatBox from '../components/Chat/ChatBox';
import Header from '../components/Header';
import Sidebar from '../components/TrainerSidebar';
import ContentContainer from '../components/ContentContainer';
import ErrorModal from "../components/modals/ErrorModal";
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';


const ChatApp = () => {
  const messageEndRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [mobileView, setMobileView] = useState('contactsList'); // 'contactsList' | 'chatbox'
  const [currentUserId, setCurrentUserId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isSelectedMentorshipActive, setIsSelectedMentorshipActive] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setErrorMessage("لطفاً ابتدا وارد حساب کاربری خود شوید.");
          setOpenErrorModal(true);
          console.error("کاربر وارد نشده است.");
          setLoading(false);
          return;
        }

        // 1. تشخیص نوع کاربر (trainer یا trainee)
        const whoamiResponse = await axios.get(`${config.API_BASE_URL}/api/auth/whoami/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const usertype = whoamiResponse.data.usertype; //"trainer" یا "trainee"
        setCurrentUserId(whoamiResponse.data.id); // ذخیره آیدی کاربر وارد شده

        // 2. گرفتن لیست منتورشیپ‌ها
        const mentorshipsResponse = await axios.get(`${config.API_BASE_URL}/api/mentorship/mentorships/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // 3. ساختن لیست مخاطبین بر اساس نقش
        const contacts_list = mentorshipsResponse.data.map((mentorship) => {
          const targetUser = usertype === "trainer" ? mentorship.trainee?.user : mentorship.trainer?.user;
          return {
            id: mentorship.id,
            name: targetUser?.name,
            profilePicture: targetUser?.profile_picture,
            is_active: mentorship.is_active,
            lastMessage: '', // بعداً می‌تونی آخرین پیام رو اینجا بیاری
            unread: false,
          };
        });

        setContacts(contacts_list);
        if (contacts_list.length > 0) {
          const firstContact = contacts_list[0];
          setSelectedContactId(firstContact.id); // اولین مخاطب به عنوان پیش‌فرض انتخاب شه
          setIsSelectedMentorshipActive(firstContact.is_active) 
        }

        setLoading(false);
      }

      catch (error)
      {
        setErrorMessage("خطا در گرفتن لیست مخاطبین");
        setOpenErrorModal(true);
        console.error('خطا در گرفتن لیست منتورشیپ‌ها:', error);
        if (error.response?.status === 404)
          navigate("/404");
        if (error.response?.status === 500)
          navigate("/500");
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);


  useEffect(() => {
    if (!selectedContactId) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      setErrorMessage("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      setOpenErrorModal(true);
      console.error("کاربر وارد نشده است.");
      setLoading(false);
      return;
    }

    const fetchChatHistory = async () => {
      //setLoading(true);
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/chat/${selectedContactId}/history/`,
          {
            headers:
            {
              Authorization: `Bearer ${token}`
            },
            params:
            {
              start: "2000-01-01T00:00:00",
              end: "2030-01-01T00:00:00",
            }
          }
        );
        
        const history = response.data.map(msg => ({
          fromMe: msg.fromMe,
          text: msg.text,
          date: moment(msg.date, "YYYY-MM-DD").locale("fa"),
          time: moment(`${msg.date} ${msg.time}`, "YYYY-MM-DD HH:mm:ss").locale("fa").format("HH:mm")
        }));

        setMessages(prev => ({
          ...prev,
          [selectedContactId]: history
        }));

        //setLoading(false);
      }
      catch (error)
      {
        setErrorMessage("خطا در دریافت تاریخچه گفت‌وگو");
        setOpenErrorModal(true);
        console.error("خطا در دریافت تاریخچه چت:", error);
        if (error.response?.status === 404)
          navigate("/404");
        if (error.response?.status === 500)
          navigate("/500");
        //setLoading(false);
      }
    }
    fetchChatHistory();

    //Connect to WebSocket
    const ws = new WebSocket(`ws://45.144.50.12:8000/ws/chat/${selectedContactId}/?token=${token}`);
    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws); // فقط بعد از اتصال موفق ذخیره می‌شود
    };
    
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const newMsg = {
        fromMe: data.sender === currentUserId,
        text: data.message,
        date: moment(),
        time: moment().format('HH:mm')
      };

      setMessages(prev => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), newMsg]
      }));
    };
    ws.onclose = () => console.log("WebSocket disconnected!");

    return () => {
      ws.close(); // بستن اتصال قبلی هنگام تغییر selectedId
    };
  }, [selectedContactId]);



  const handleSelect = (id) => {
    setSelectedContactId(id);
    const selected = contacts.find(c => c.id === id);
    setIsSelectedMentorshipActive(selected?.is_active ?? false);
    if (isMobile)
      setMobileView('chat');

    // خوانده شدن پیام
    setContacts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, unread: false } : c
      )
    );
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    if (!socket || socket.readyState !== WebSocket.OPEN)
    {
      setErrorMessage("اتصال برقرار نیست! دوباره تلاش کنید");
      setOpenErrorModal(true);
      console.warn("🚫 WebSocket is not open.");
      return;
    }

    socket.send(JSON.stringify({ message: newMessage }));
    setNewMessage('');
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectedContact = contacts.find(contact => contact.id === selectedContactId);
  return (
    <Box sx={{ minHeight: "100vh", display: "flex"}}>
      <Sidebar />
      <CssBaseline enableColorScheme />

      <Box sx={{flexGrow: 1}}>
        <Header pageTitle="صفحه مربی" />
        <ContentContainer>
          {loading ? (
            <>
              <CircularProgress />
              <Typography fontSize={20} mt={2}>در حال دریافت پیام ها...</Typography>
            </>
          ) : contacts.length === 0 ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
              <Typography fontSize={32}>هیچ گفت‌وگویی وجود ندارد!</Typography>
            </Box>
          ) : (
            <Box display="flex" height="90vh">
              {/*Desktop Mode*/}
              {!isMobile && (
              <>
                <ContactList
                  contacts={contacts}
                  selectedId={selectedContactId}
                  onSelect={handleSelect}
                />
                <Divider orientation="vertical" flexItem />
                <ChatBox
                  messages={messages[selectedContactId] || []}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  handleSend={handleSend}
                  isActive={isSelectedMentorshipActive}
                />
              </>
              )}

              {/*Mobile Mode: Contacts List*/}
              {isMobile && mobileView === 'contactsList' && (
                <ContactList
                  contacts={contacts}
                  selectedId={selectedContactId}
                  onSelect={handleSelect}
                />
              )}

              {/*Mobile Mode: Chat Box*/}
              {isMobile && mobileView === 'chat' && selectedContact && (
                <Box display="flex" flexDirection="column" width="100%" height="100%">
                  {/*Contact Information*/}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row-reverse"
                    px={2}
                    py={1}
                    borderBottom="1px solid #ddd"
                    sx={{position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#fff'}}
                  >
                    <IconButton onClick={() => setMobileView('contactsList')}>
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography fontWeight="bold">{selectedContact.name}</Typography>
                    <Avatar src={selectedContact.profilePicture} />
                  </Box>

                  {/*Chat*/}
                  <ChatBox
                    messages={messages[selectedContactId] || []}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    handleSend={handleSend}
                    isActive={isSelectedMentorshipActive}
                  />
                </Box>
              )}
            </Box>
          )}
        </ContentContainer>
        
        <ErrorModal open={openErrorModal} onClose={() => {setOpenErrorModal(false); if(errorMessage === "لطفاً ابتدا وارد حساب کاربری خود شوید."){navigate("/signin")} }} errorMessage={errorMessage} />
      </Box>
    </Box>
    
  );
};

export default ChatApp;