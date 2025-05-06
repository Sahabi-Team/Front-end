<Box
sx={{
  mt: "3rem",
  px: 2,
  display: "flex",
  justifyContent: "center",
}}
>
<Stack
  direction={{ xs: "column", sm: "row" }}
  spacing={{ xs: 3, sm: 3, md: 10, lg: 20, xl: 40 }}
  justifyContent="center"
  alignItems="center"
  sx={{
    width: "100%",
    maxWidth: 1200,
    textAlign: "center",
  }}
>
  {/* Item 1 - Programs */}
  <Box
    sx={{
      minWidth: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        mb: 1,
        ...responsiveFontSize,
      }}
    >
      <AnimatedCounter end={total_wp} duration={5} />
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          ...responsiveFontSize,
        }}
      >
        برنامه نوشته شده
      </Typography>
      <FitnessCenterIcon
        sx={{
          color: "success.light",
          ...responsiveFontSize,
          mr: 1,
        }}
      />
    </Box>
  </Box>

  {/* Item 2 - Users */}
  <Box
    sx={{
      minWidth: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        mb: 1,
        ...responsiveFontSize,
      }}
    >
      <AnimatedCounter end={total_clients} duration={10} />
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          ...responsiveFontSize,
        }}
      >
        کاربر
      </Typography>
      <PersonIcon
        sx={{
          color: "info.main",
          ...responsiveFontSize,
          mr: 1,
        }}
      />
    </Box>
  </Box>

  {/* Item 3 - Coaches */}
  <Box
    sx={{
      minWidth: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        mb: 1,
        ...responsiveFontSize,
      }}
    >
      <AnimatedCounter end={total_trainers} duration={5} />
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          ...responsiveFontSize,
        }}
      >
        مربی آماده
      </Typography>
      <StarBorderIcon
        sx={{
          color: "warning.main",
          ...responsiveFontSize,
          mr: 1,
        }}
      />
    </Box>
  </Box>
</Stack>
</Box>