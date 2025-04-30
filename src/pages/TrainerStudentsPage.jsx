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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock data - replace with your actual data
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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Header pageTitle="صفحه مربی" />
        <ContentContainer isSidebarOpen={isSidebarOpen}>
          {/* Header with title and search */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'right',
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
          <Typography variant="body2" sx={{ color: '#666', mb: 2  , textAlign: 'left'}}>
            ۲۵ نفر پیدا شد
          </Typography>

          {/* Students List */}
          <Box>
            {students.map((student, index) => (
              <React.Fragment key={student.id}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 2,
                }}>
                  {/* Student info with avatar on right */}
                  <Chip
                        label={student.status}
                        size="small"
                        sx={{
                          height: '24px',
                          bgcolor: student.status === "تکمیل شده" ? "#e8f5e9" : "#fff8e1",
                          color: student.status === "تکمیل شده" ? "#2e7d32" : "#f57c00",
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}
                      />
                      <Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#000000',
                          fontWeight: 500,
                          mb: 0.5
                        }}
                      >
                        {student.name}
                      </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Avatar 
                      src={student.avatar} 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        mr: 2 // Margin right for RTL
                    
                      }} 
                    />
                    
                    </Box>
                  </Box>
                  
                  {/* Action icons on left */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small">
                      <EmailIcon fontSize="small" sx={{ color: '#757575' }} />
                    </IconButton>
                    {student.status === "تکمیل شده" ? (
                      <IconButton size="small">
                        <EditIcon fontSize="small" sx={{ color: '#757575' }} />
                      </IconButton>
                    ) : (
                      <IconButton size="small">
                        <AddCircleIcon fontSize="small" sx={{ color: '#757575' }} />
                      </IconButton>
                    )}
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