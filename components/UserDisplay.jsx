import Image from "next/image";
import { 
  Typography, 
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  List, 
} from "@/components/mui";

import Heading from "@/components/Heading";

const UserDisplay = ({user}) => {
  const { nickname, name, picture, email, sub } = user;
  return (
    <>
      <Card>
        <CardMedia sx={{ display: 'grid', placeContent: 'center'}}>
          {/* <Avatar alt={nickname} src={picture} referrerpolicy="no-referrer" /> */}
          <Image
            alt={nickname}
            src={picture}
            width="200"
            height="200"
            style={{ borderRadius: "50%" }}
          />
        </CardMedia>
        <CardContent>
          <List
            component="dl"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1em",
            }}
          >
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Name
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Email
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {email}
            </Typography>
            <Typography component="dt" sx={{ textAlign: "right" }}>
              Sub
            </Typography>
            <Typography component="dd" sx={{ fontWeight: "bold" }}>
              {sub}
            </Typography>
          </List>
        </CardContent>
        {/* <CardActions></CardActions> */}
      </Card>
    </>
  );
};

export default UserDisplay;