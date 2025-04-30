import React, { useState, useEffect } from 'react';
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
  const [filteredStudents, setFilteredStudents] = useState([]);
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

  // Filter students when search query changes
  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    // You can add additional search logic here if needed
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <Sidebar />
      
      <Box sx={{ flexGrow: 1 }}>
        <Header pageTitle="صفحه مربی" />
        <ContentContainer isSidebarOpen={isSidebarOpen}>
          {/* Header with title and search */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'space-between',
            textAlign: 'center',
            alignItems: 'center',
            mt: 2,
            mb: 3
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#000',
                mb: 2,
                ml: 2

              }}
            >
              لیست شاگرد ها
            </Typography>
            
            {/* Search Box */}
            <Box
              component="form"
              onSubmit={(e) => e.preventDefault()}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                bgcolor: 'white',
                width: '100%',
                maxWidth: '500px',
              }}
            >
              <InputBase
                placeholder="دنبال کی هستی؟"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  px: 2,
                  py: 1.2,
                  fontSize: '15px',
                  color: '#555',
                }}
              />

              <Box
                sx={{
                  backgroundColor: '#009961',
                  px: 2,
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#007d4f',
                  }
                }}
              >
                <SearchIcon sx={{ 
                  color: 'white',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }} />
              </Box>
            </Box>

          </Box>
          
          {/* Count of students */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ color: '#666', mb: 2  , textAlign: 'left'}}>
            {filteredStudents.length.toLocaleString('fa-IR')} نفر پیدا شد
          </Typography>
          <Divider sx={{ 
            width: '15%', 
            borderColor: '#ddd', 
            alignSelf: 'flex-start' 
            }} />
          </Box>
          {/* Students List */}
          <Box>
            {filteredStudents.map((student, index) => (
              <React.Fragment key={student.id}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 2,
                }}>
                  {/* Student info with avatar on right */}
                  <Box sx={{ display: 'flex',alignItems: 'center' }}>
                    <Avatar 
                      src={student.avatar} 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        mr: 2
                      }} 
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#000000',
                          fontWeight: 500
                        }}
                      >
                        {student.name}
                      </Typography>
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
                    </Box>
                  </Box>
                  
                  {/* Action icons on left */}
                  <Box sx={{ alignItems: 'center', gap: 1 }}>
                    {student.status === "تکمیل شده" ? (
                        <IconButton size="small" sx={{ 
                        '&:hover': { 
                            backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                        } 
                        }}>
                        <EditIcon fontSize="small" sx={{ 
                            color: '#757575',
                            fontSize: '1.4rem', 
                            '&:hover': {
                            color: '#4CAF50', 
                            }
                        }} />
                        </IconButton>
                    ) : (
                        <IconButton size="small" sx={{ 
                        '&:hover': { 
                            backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                        } 
                        }}>
                        <AddCircleIcon fontSize="small" sx={{ 
                            color: '#757575',
                            fontSize: '1.4rem', 
                            '&:hover': {
                            color: '#4CAF50', 
                            }
                        }} />
                        </IconButton>
                    )}
                    <IconButton size="small" sx={{ 
                        '&:hover': { 
                        backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                        } 
                    }}>
                        <EmailIcon fontSize="small" sx={{ 
                        color: '#757575',
                        fontSize: '1.4rem', 
                        '&:hover': {
                            color: '#4CAF50', 
                        }
                        }} />
                    </IconButton>
                    </Box>
                </Box>
                {index < filteredStudents.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Box>
        </ContentContainer>
      </Box>
    </Box>
  );
};

export default TrainerStudentsPage;