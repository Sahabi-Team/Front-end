import React, { useState } from 'react';
import { Box, InputBase, IconButton, Typography, Avatar, Divider, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Sidebar from '../components/TrainerSidebar';

const TrainerStudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with your actual data, expanded to match the image
  const students = [
    { id: 1, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 2, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 3, name: 'امیرمحمد نیلی', status: 'در انتظار تکمیل', avatar: '/api/placeholder/35/35' },
    { id: 4, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 5, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 6, name: 'امیرمحمد نیلی', status: 'در انتظار تکمیل', avatar: '/api/placeholder/35/35' },
    { id: 7, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 8, name: 'امیرمحمد نیلی', status: 'در انتظار تکمیل', avatar: '/api/placeholder/35/35' },
    { id: 9, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 10, name: 'امیرمحمد نیلی', status: 'در انتظار تکمیل', avatar: '/api/placeholder/35/35' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5', direction: 'rtl' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, ml: 4 }}> {/* Changed marginRight to marginLeft for RTL */}
        <Header pageTitle="صفحه مربی" />
        <ContentContainer>
          {/* Header with title and search */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h6" fontWeight="medium">لیست شاگرد ها</Typography>
            
            {/* Search Box */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              padding: '4px 12px',
            }}>
              <InputBase
                placeholder="دنبال شخص خاصی میگردی؟"
                sx={{ flex: 1, ml: 1 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton size="small">
                <SearchIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          {/* Count of students */}
          <Typography variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'right' }}>
            ۲۵ نفر پیدا شد
          </Typography>

          {/* Students List */}
          <Box>
            {students.map((student, index) => (
              <React.Fragment key={student.id}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 2,
                }}>
                  {/* Student info */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={student.avatar} sx={{ ml: 2 }} />
                    <Typography variant="body1">{student.name}</Typography>
                  </Box>
                  
                  {/* Status and actions */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label={student.status}
                      size="small"
                      sx={{
                        ml: 2,
                        bgcolor: student.status === "تکمیل شده" ? "#e8f5e9" : "#fff8e1",
                        color: student.status === "تکمیل شده" ? "#2e7d32" : "#f57c00",
                        borderRadius: 1,
                      }}
                    />
                    <Box>
                      <IconButton size="small">
                        <EmailIcon fontSize="small" />
                      </IconButton>
                      {student.status === "تکمیل شده" ? (
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      ) : (
                        <IconButton size="small">
                          <AddCircleIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>
                {index < students.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Box>
        </ContentContainer>
      </Box>
    </Box>
  );
};

export default TrainerStudentsPage;