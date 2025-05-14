import React, { useState } from 'react';
import { Box, Typography, Rating, TextField, Button, Divider, Pagination } from '@mui/material';

const allCommentsMock = Array.from({ length: 7 }, (_, i) => ({
  name: 'حبیب پینه چی',
  date: '۳ روز پیش',
  rating: 4,
  text: ' سلام خیلی عالیه همه چی کاش بیشتر هم بهم توجه کنید تا مشتری هاتون راضی باشند. من برنامه تمرینی مربوط به بدنسازی رو دریافت کردم و ظرف ۳ ماه تونستم ۱۲ کیلو اضافه کنم و به تناسب اندامی که می‌خواستم رسیدم'
}));

const CommentSection = () => {
  const [comments, setComments] = useState(allCommentsMock);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 4;
  const pageCount = Math.ceil(comments.length / perPage);
  const currentComments = comments.slice((page - 1) * perPage, page * perPage);

  const handleSubmit = () => {
    if (!newComment || newRating === 0) return;

    const comment = {
      name: 'کاربر ناشناس',
      date: 'همین الان',
      rating: newRating,
      text: newComment
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setNewRating(0);
    setPage(1); // برو به صفحه اول
  };

  return (
    <Box mt={8} mb={5}>
      {/* بخش ارسال نظر */}
      <Typography fontSize={20} fontWeight="bold" mb={2}>امتیاز شما :</Typography>
      <Rating value={newRating} size="large" onChange={(e, newValue) => setNewRating(newValue)}/>
      <TextField fullWidth multiline rows={2} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="نظر خود را بنویسید..." sx={{mt: 2, '& .MuiOutlinedInput-root': {borderRadius: 3}}}/>
      <Button variant="contained" sx={{mt: 2, borderRadius: 2}} onClick={handleSubmit}>ارسال</Button>

      {/* لیست نظرات */}
      <Box mt={5}>
        {currentComments.map((comment, index) => (
          <Box key={index} mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>
                <Typography component="span" fontWeight="medium">
                  {comment.name}
                </Typography>
                <Typography component="span" variant="caption" color="text.secondary" ml={2}>
                  {comment.date}
                </Typography>
              </Typography>
              <Rating value={comment.rating} readOnly size="small" />
            </Box>

            <Typography fontSize={14} textAlign="left" mt={1.5} mx={1} lineHeight={2}>
              {comment.text}
            </Typography>

            {index < currentComments.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}

        {/* pagination */}
        {pageCount > 1 && (
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
          />
        )}
      </Box>
    </Box>
  );
};

export default CommentSection;