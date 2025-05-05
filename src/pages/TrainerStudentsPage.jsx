import React, { useState, useEffect } from 'react';
import { Box, InputBase, Typography, Avatar, Divider, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import Sidebar from '../components/TrainerSidebar';

const TrainerStudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch trainees from API
  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const token = localStorage.getItem("access_token");
        
        if (!token) {
          setError('لطفا وارد شوید');
          setLoading(false);
          // Redirect to login page if needed
          // navigate('/signin');
          return;
        }

        // Create axios instance with required headers
        const api = axios.create({
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Fetch trainees data
        const response = await api.get('http://84.234.29.28:8000/api/trainer/my-trainees/');
        
        // Transform the data to match our component's expected format
        const formattedTrainees = response.data.map(trainee => ({
          id: trainee.trainee_id,
          name: trainee.user.name,
          status: trainee.status || 'در انتظار',
          avatar: trainee.user.profile_picture || '/api/placeholder/35/35'
        }));

        setStudents(formattedTrainees);
        setFilteredStudents(formattedTrainees);
        setLoading(false);
      } catch (err) {
        console.error('API Error:', err);
        if (err.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('access_token');
          setError('لطفا مجددا وارد شوید');
          // navigate('/signin');
        } else {
          setError('خطا در دریافت اطلاعات');
        }
        setLoading(false);
      }
    };

    fetchTrainees();
  }, []);

  // Filter students based on search query
  useEffect(() => {
    if (students.length > 0) {
      const filtered = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F5F5' }}>
      <Sidebar />
      
      <Box sx={{ flexGrow: 1 }}>
        <Header pageTitle="صفحه مربی" />
        <ContentContainer>
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
            <Typography variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'left' }}>
              {loading ? 'در حال بارگذاری...' : 
               error ? 'خطا در بارگذاری' :
               filteredStudents.length.toLocaleString('fa-IR')} {!loading && !error && 'نفر پیدا شد'}
            </Typography>
            <Divider sx={{ 
              width: '15%', 
              borderColor: '#ddd', 
              alignSelf: 'flex-start' 
            }} />
          </Box>
          
          {/* Error message */}
          {error && (
            <Box sx={{ textAlign: 'center', my: 4, color: 'error.main' }}>
              <Typography>{error}</Typography>
            </Box>
          )}
          
          {/* Loading message */}
          {loading && (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography>در حال بارگذاری...</Typography>
            </Box>
          )}

          {/* Students List */}
          {!loading && !error && (
            <Box sx={{ mx: 2 }}>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
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
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                              fontSize: '0.75rem',
                              alignSelf: 'flex-start'
                            }}
                          />
                        </Box>
                      </Box>
                      
                      {/* Action icons on left */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
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
                    {index < filteredStudents.length - 1 && <Divider sx={{ mx: 1 }} />}
                  </React.Fragment>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', my: 4 }}>
                  <Typography>هیچ شاگردی پیدا نشد</Typography>
                </Box>
              )}
            </Box>
          )}
        </ContentContainer>
      </Box>
    </Box>
  );
};

export default TrainerStudentsPage;