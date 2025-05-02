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

  // Mock data 
  const students = [
    { id: 1, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 2, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 3, name: 'امیرمحمد نیلی', status: 'در انتظار', avatar: '/api/placeholder/35/35' },
    { id: 4, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 5, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 6, name: 'امیرمحمد نیلی', status: 'در انتظار', avatar: '/api/placeholder/35/35' },
    { id: 7, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 8, name: 'امیرمحمد نیلی', status: 'در انتظار ', avatar: '/api/placeholder/35/35' },
    { id: 9, name: 'مهدی محمدی', status: 'تکمیل شده', avatar: '/api/placeholder/35/35' },
    { id: 10, name: 'امیرمحمد نیلی', status: 'در انتظار ', avatar: '/api/placeholder/35/35' },
  ];

  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
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
            flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, row on desktop
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' }, // Stretch on mobile, center on desktop
            gap: { xs: 2, sm: 0 }, // Add gap on mobile
            mt: 2,
            mb: 3
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#000',
                mb: { xs: 1, sm: 0 }, // Bottom margin only on mobile
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
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
                bgcolor: 'white',
                width: '100%',
                maxWidth: { xs: '100%', sm: '500px' }, // Full width on mobile
                minWidth: { xs: 'unset', sm: '300px' }, // Remove min-width on mobile
                border: '1px solid #ddd'
              }}
            >
              <InputBase
                placeholder="دنبال کی هستی؟"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                sx={{
                  px: { xs: 1.5, sm: 2 }, // Smaller padding on mobile
                  py: 1.2,
                  fontSize: { xs: '14px', sm: '15px' }, // Smaller font on mobile
                  color: '#555',
                }}
              />

              <Box
                sx={{
                  backgroundColor: '#009961',
                  px: { xs: 1.5, sm: 2 }, // Smaller padding on mobile
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
                  fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Smaller icon on mobile
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
          <Box sx={{
            mx: 2  // Add horizontal margin
          }}>
            {filteredStudents.map((student, index) => (
              <React.Fragment key={student.id}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 2,
                  px: 1,  // Add horizontal padding to the student box
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.01)'  // Subtle hover effect
                  }
                }}>
                  {/* Student info with avatar on right */}
                  <Box sx={{ display: 'flex',alignItems: 'center' }}>
                    <Avatar 
                      src={student.avatar} 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        mr: 2,
                        border: '1px solid #00AF66',
                        padding: '2px',
                        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', // Stronger shadow
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
                          borderRadius: 2,
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  {/* Action icons on left */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5  ,
                    marginRight: '20px'
                  }}>
                    {student.status === "تکمیل شده" ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          backgroundColor: '#F5F5F5',
                          borderRadius: '20px',
                          padding: '6px 16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: '#e8f5e9',
                            '& .icon, & .text': {
                              color: '#00AF66'
                            }
                          }
                        }}
                      >
                        <EditIcon className="icon" sx={{ fontSize: '1.2rem', color: '#757575' }} />
                        <Typography className="text" sx={{ fontSize: '0.875rem', color: '#757575' }}>
                          ویرایش برنامه
                        </Typography>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          backgroundColor: '#F5F5F5',
                          borderRadius: '20px',
                          padding: '6px 16px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: '#e8f5e9',
                            '& .icon, & .text': {
                              color: '#00AF66'
                            }
                          }
                        }}
                      >
                        <AddCircleIcon className="icon" sx={{ fontSize: '1.2rem', color: '#757575' }} />
                        <Typography className="text" sx={{ fontSize: '0.875rem', color: '#757575' }}>
                          نوشتن برنامه
                        </Typography>
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        backgroundColor: '#F5F5F5',
                        borderRadius: '20px',
                        padding: '6px 16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: '#e8f5e9',
                          '& .icon, & .text': {
                            color: '#00AF66'
                          }
                        }
                      }}
                    >
                      <EmailIcon className="icon" sx={{ fontSize: '1.2rem', color: '#757575' }} />
                      <Typography className="text" sx={{ fontSize: '0.875rem', color: '#757575' }}>
                        پیام
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {index < filteredStudents.length - 1 && <Divider sx={{ mx: 1 }} />}  {/* Add margin to divider */}
              </React.Fragment>
            ))}
          </Box>
        </ContentContainer>
      </Box>
    </Box>
  );
};

export default TrainerStudentsPage;