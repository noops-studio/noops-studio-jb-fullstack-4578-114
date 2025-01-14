import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import FollowButton from "../follow/FollowButton";

interface FollowersProps {
  followers: { id: string; name: string; isFollowing: boolean }[];
  onUpdate: () => void; // Callback to refresh the list
}

const Followers: React.FC<FollowersProps> = ({ followers, onUpdate }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, maxHeight: "200px", overflowY: "auto" }}>
      <Grid container direction="column" spacing={2}>
        {followers.map(({ id, name, isFollowing }) => (
          <Grid item xs={12} key={id}>
            <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 2 }}>
                {name[0].toUpperCase()}
              </Avatar>
              <CardContent>
                <Typography variant="h6" component="div">
                  {name}
                </Typography>
                <FollowButton
                  userId={id}
                  isFollowing={isFollowing}
                  onUpdate={onUpdate}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Followers;
