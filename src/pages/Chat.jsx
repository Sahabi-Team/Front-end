import React, { useState, useRef, useEffect } from 'react';
import {
  Box, TextField, IconButton, Avatar, Typography, List, ListItem, ListItemAvatar,
  ListItemText, Paper, Divider,
  CssBaseline
} from '@mui/material';
import moment from 'jalali-moment';
import ContactList from '../components/Chat/ContactList';
import ChatBox from '../components/Chat/ChatBox';
import Header from '../components/Header';
import Sidebar from '../components/TrainerSidebar';
import ContentContainer from '../components/ContentContainer';
import axios from 'axios';
import config from '../config';



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
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          //setErrorMessage("لطفاً ابتدا وارد حساب کاربری خود شوید.");
          //setOpenErrorModal(true);
          console.error("کاربر وارد نشده است.");
          return;
        }

        const response = await axios.get(`${config.API_BASE_URL}/api/mentorship/mentorships/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        

        // فرض می‌کنیم هر آیتم یه trainee داره
        const data = response.data.map((item) => ({
          id: item.id, // اینجا می‌تونه همون mentorshipId باشه
          name: item.trainee?.user?.name || 'بدون نام',
          profilePicture: item.trainee?.user?.profile_picture || null,
          lastMessage: '', // اگه لازم شد از پیام آخر هم پر می‌کنی
          unread: false,
        }));

        setContacts(data);
        if (data.length > 0)
          setSelectedId(data[0].id); // اولین مخاطب به عنوان پیش‌فرض انتخاب شه

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


  const handleSelect = (id) => {
    setSelectedId(id);
    // خوانده شدن پیام
    setContacts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, unread: false } : c
      )
    );
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const now = moment();
    const time = now.format('HH:mm');
    const newMsg = {
      fromMe: true,
      text: newMessage,
      date: now,
      time
    };

    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg]
    }));
    setNewMessage('');

    setTimeout(() => {
      const reply = {
        fromMe: false,
        text: 'ممنون از پیام‌تون! در خدمتم.',
        date: moment(),
        time: moment().format('HH:mm')
      };
      setMessages(prev => ({
        ...prev,
        [selectedId]: [...prev[selectedId], reply]
      }));

    }, 1500);
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
          <Box display="flex" height="100vh">
            <ContactList
              contacts={contacts}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
            <Divider orientation="vertical" flexItem />
            <ChatBox
              messages={messages[selectedId] || []}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSend={handleSend}
            />
          </Box>
        </ContentContainer>
      </Box>
    </Box>
    
  );
};

export default ChatApp;