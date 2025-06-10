import React, { useState, useRef, useEffect } from 'react';
import { Box, Divider, CssBaseline, CircularProgress, Typography } from '@mui/material';
import moment from 'jalali-moment';
import ContactList from '../components/Chat/ContactList';
import ChatBox from '../components/Chat/ChatBox';
import Header from '../components/Header';
import Sidebar from '../components/TrainerSidebar';
import ContentContainer from '../components/ContentContainer';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router';



const initialContacts = [
  { id: 1, name: 'پویا تراشی', lastMessage: '۵ دقیقه پیش', unread: false },
  { id: 2, name: 'علیرضا رحمی', lastMessage: '۲ روز پیش', unread: true },
  { id: 3, name: 'سید امیرمحمد میرشمس', lastMessage: '۱۴۰۳/۱۲/۲۰', unread: false },
  { id: 4, name: 'رضا محمدی', lastMessage: '۱۴۰۳/۱۰/۱۳', unread: true }
];

const initialMessages = {
  1: [
    {
      fromMe: true,
      text: 'سلام استاد - حال شما چطوره ؟',
      date: moment('1403/12/19', 'jYYYY/jMM/jDD'),
      time: '۱۰:۲۷'
    },
    {
      fromMe: false,
      text: 'عالیم! تو چطوری بی عرضه؟',
      date: moment('1403/12/19', 'jYYYY/jMM/jDD'),
      time: '11:37'
    }
  ],
  2: [{
      fromMe: true,
      text: 'سلام استاد خیلی افتضاحی!',
      date: moment('1403/12/19', 'jYYYY/jMM/jDD'),
      time: '۱۰:۲۷'
    },],
  3: [],
  4: []
};

const ChatApp = () => {
  const messageEndRef = useRef(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState({});
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isSelectedMentorshipActive, setIsSelectedMentorshipActive] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          //setErrorMessage("لطفاً ابتدا وارد حساب کاربری خود شوید.");
          //setOpenErrorModal(true);
          console.error("کاربر وارد نشده است.");
          //setLoading(false);
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

      catch (error) {
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
      //setErrorMessage("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      //setOpenErrorModal(true);
      console.error("کاربر وارد نشده است.");
      //setLoading(false);
      return;
    }

    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/chat/${selectedContactId}/history/`,
          {
            headers:
            {
              Authorization: `Bearer ${token}`
            },
            params:
            {
              start: "2024-01-01T00:00:00",
              end: "2026-01-01T00:00:00",
            }
          }
        );
        
        const history = response.data.map(msg => ({
          fromMe: msg.fromMe,
          text: msg.text,
          date: moment(msg.date, "YYYY-MM-DD").locale("fa"), // برای نمایش تاریخ به جلالی
          time: moment(`${msg.date} ${msg.time}`, "YYYY-MM-DD HH:mm:ss")
            .locale("fa")
            .format("HH:mm") // فقط ساعت و دقیقه
        }));

        const formatted = response.data.map(msg => ({
          ...msg,
          date: moment(msg.date), // تبدیل رشته تاریخ به moment object
        }));

        setMessages(prev => ({
          ...prev,
          [selectedContactId]: response.data
        }));

        setLoading(false);
      }
      catch (error) {
        console.error("خطا در دریافت تاریخچه چت:", error);
        if (error.response?.status === 404)
          navigate("/404");
        if (error.response?.status === 500)
          navigate("/500");
        setLoading(false);
      }
    }
    fetchChatHistory();

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
      console.warn("🚫 WebSocket is not open.");
      return;
    }

    socket.send(JSON.stringify({ message: newMessage }));
    setNewMessage('');
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
            <Box display="flex" height="100vh">
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
            </Box>
          )}
        </ContentContainer>
      </Box>
    </Box>
    
  );
};

export default ChatApp;