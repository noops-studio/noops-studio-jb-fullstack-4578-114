import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';

interface FollowingProps {
  names: string[];
}

const Following: React.FC<FollowingProps> = ({ names }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, maxHeight: '200px', overflowY: 'auto' }}>
      <Grid container direction="column" spacing={2}>
        {names.map((name, index) => (
          <Grid item xs={12} key={index}>
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
              <Avatar
                sx={{ bgcolor: deepPurple[500], marginRight: 2 }}
                aria-label="follower-avatar"
              >
                {name[0].toUpperCase()}
              </Avatar>
              <CardContent>
                <Typography variant="h6" component="div">
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Following;
