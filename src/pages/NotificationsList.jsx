import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Button, Avatar, Badge, CssBaseline, Divider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/AddRounded';
import Header from '../components/Header';
import Sidebar from '../components/TrainerSidebar';
import ContentContainer from '../components/ContentContainer';
import axios from 'axios';
import config from '../config';
export default function NotificationsList() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try
      {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`${config.API_BASE_URL}/api/notifications/notifications/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotifications(response.data);
        setLoading(false);
      }
      catch (error)
      {
        console.error('Error fetching notifications:', error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);
  
  const handleWriteProgram = async (notif) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(`${config.API_BASE_URL}/api/notifications/notifications/${notif.id}/mark_as_read/`, 
        {
          user: notif.user,
          mentorship: notif.mentorship,
          message: notif.message,
          is_read: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      navigate(`/write-program/${notif.trainee_info.user_id}`);
    }
    catch (error) {
      console.error('Error for making the notification mark as read:', error);
    }
  };


  return (
    <Box sx={{ minHeight: "100vh", display: "flex"}}>
      <Sidebar />
      <CssBaseline enableColorScheme />

      <Box sx={{flexGrow: 1}}>
        <Header pageTitle="صفحه مربی" />
        <ContentContainer>
          <Typography variant="h6" fontSize={21} fontWeight={600} sx={{mx: 1, mb: 2, textAlign: 'left'}}>
            لیست اعلانات
          </Typography>

          {loading ? (
            <>
              <Typography fontSize={20}>در حال بارگذاری ...</Typography>
              <CircularProgress />
            </>
          ) : (
            <>
              <Typography variant="body2" color="textSecondary" sx={{mx: 1, mb: 1, textAlign: 'left'}}>
                {notifications.filter(n => !n.is_read).length.toLocaleString('fa-IR')} اعلان خوانده نشده
              </Typography>
              <Divider sx={{ mx: 1, width: '15%'}} />

              <List sx={{mx: 1}}>
                {notifications.map((notif, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{my: 1, justifyContent: 'space-between'}}>
                      <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Badge variant="dot" color="secondary" invisible={notif.is_read} />
                        <Avatar src={notif.trainee_info?.profile_picture || ''} sx={{width: 45, height: 45, mx: 2, border: '1px solid #00AF66', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}} />
                        <Box>
                          <Typography variant="body1">{"شما از طرف " + notif.trainee_info?.name + " درخواست نوشتن برنامه دارید."}</Typography>
                          <Typography variant="caption" color="textSecondary" sx={{mt: 0.5}}>{notif.created_at.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])}</Typography>
                        </Box>
                      </Box>
                      {!notif.is_read && <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleWriteProgram(notif)} sx={{borderRadius: 2, height: 28, textWrap: "nowrap"}}>نوشتن برنامه</Button>}
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </>
          )}
        </ContentContainer>
      </Box>
    </Box>
  );
}
