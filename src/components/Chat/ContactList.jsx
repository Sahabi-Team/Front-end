import React from 'react';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Badge, Typography } from '@mui/material';

const ContactList = ({ contacts, selectedId, onSelect }) => {
  return (
    <Box sx={{width: '25%', mr: 2, overflow: 'auto', '@media (max-width:900px)': {width: '100%', mr: 0}}}>
      <List>
        {contacts.map(contact => (
          <ListItem
            key={contact.id}
            button
            selected={contact.id === selectedId}
            onClick={() => onSelect(contact.id)}
            sx={{
              mb: 1,
              borderRadius: '12px',
              backgroundColor: contact.id === selectedId ? '#4caf50' : 'inherit',
              '&:hover': {
                backgroundColor: contact.id === selectedId ? '#4caf50' : '#f0f0f0'
            }
          }}
          >
            <ListItemAvatar>
              <Badge
                color="secondary"
                variant="dot"
                invisible={!contact.unread}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Avatar src={contact.profilePicture} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography fontWeight={contact.unread ? 'bold' : 'normal'} sx={{textWrap: "nowrap"}}>
                  {contact.name}
                </Typography>
              }
              secondary={contact.lastMessage}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ContactList;