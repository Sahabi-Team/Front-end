// components/ChatBox.js
import React, { useRef, useEffect } from 'react';
import {
  Box, TextField, IconButton, Typography, Paper, Divider,
	InputAdornment
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBox = ({ messages, newMessage, setNewMessage, handleSend }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box flex={1} display="flex" flexDirection="column">
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          height: 'calc(100vh - 64px - 64px)'
        }}
      >
        {messages.map((msg, idx) => (
          <Box
						key={idx}
						mb={2}
						alignSelf={msg.fromMe ? 'flex-start' : 'flex-end'}
						display="flex"
						flexDirection="column"
						alignItems={msg.fromMe ? 'flex-start' : 'flex-end'}
						
					>
						<Typography variant="caption" color="textSecondary" alignSelf={"center"}>
							{msg.date.locale('fa').format('jD jMMMM jYYYY')}
						</Typography>
            <Box
              component={Paper}
              elevation={1}
              sx={{
                p: 1.5,
                maxWidth: '60%',
                bgcolor: msg.fromMe ? '#4caf50' : '#e0f2f1',
                color: msg.fromMe ? '#fff' : '#000',
                borderRadius: msg.fromMe ? "12px 12px 12px 0px" : "12px 12px 0px 12px",
                textAlign: 'right',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              <Typography variant="body1" textAlign="left">{msg.text}</Typography>
              <Typography variant="caption" display="block" textAlign="right" mt={1} sx={{ direction: 'ltr' }}>
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}
        <div ref={messageEndRef} />
      </Box>

      <Box display="flex" alignItems="center" p={1} bgcolor="#fff" height="64px">
        <TextField
          fullWidth
          placeholder="پیامی بنویسید ..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          variant="outlined"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton color="primary" onClick={handleSend} edge="end">
									<SendIcon sx={{ transform: 'rotate(180deg)' }} />
								</IconButton>
							</InputAdornment>
						)
					}}
        />
      </Box>
    </Box>
  );
};

export default ChatBox;
