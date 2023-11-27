import Image from "next/image";
import Link from "next/link";
import { dinero, toDecimal } from "dinero.js";
import { GBP } from '@dinero.js/currencies';
import {
  Typography,
  List,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  EditIcon,
  DeleteIcon,
  Button,
  Box,
} from "@/components/mui";
import Heading from "@/components/Heading";
import { slugify, formatPrice } from "@/lib/utils/formatters";
import { useUser } from "@auth0/nextjs-auth0/client";

const ProductDisplay = ({
  product: { _id, title, image, price, quantity } = {},
  deleteHandler = () => {
    console.log("no delete handler supplied");
  },
  addToBasket = (id) => {
    console.log("no addToBasket handler supplied", id);
  },
  headingLevel = 2,
  canUpdate = false,
  canRemove = false,
  canBuy=false,
  showViewButton = true
}) => {
  const { user } = useUser();
  return (
    <Card variant="outlined" sx={{ width: "100%", ':hover': {borderColor: "rgba(37,41,88,1)", boxShadow: 3} }}>
      <CardMedia sx={{ display: "grid", placeItems: "center", borderBottom: "dashed", borderColor: "rgba(37,41,88,1)"   }}>
        <Image alt={title} src={image} width="500" height="500" />
      </CardMedia>
      <CardContent>
        <Heading component={`h${headingLevel}`} sx={{ textAlign: "center", mb: 2, color: "#021691", ':hover': {textDecoration: "underline"} }}>
          {title}
        </Heading>
        <List
          component="dl"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1em",
          }}
        >
          <Typography component="dt" sx={{ textAlign: "right", color: "#021691" }}>
            Price:
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold", color: "#021691" }}>
            {formatPrice(toDecimal(dinero({ amount: price, currency: GBP})))}
          </Typography>
          <Typography component="dt" sx={{ textAlign: "right", color: "#021691" }}>
            Quantity:
          </Typography>
          <Typography component="dd" sx={{ fontWeight: "bold", color: "#021691" }}>
            {quantity} remaining
          </Typography>
        </List>
      </CardContent>
      <CardActions sx={{ display: "grid", placeItems: "center" }}>
        <Box>
        {user ? (
          <>
          {showViewButton && (
          <Button variant="contained" sx={{p: 1.5, m: 1.5}} href={`/products/${slugify(title, _id)}`} component={Link}>
            View
          </Button>
          )}
          </>
        ) : (
          <Typography sx={{ color: "#021691", textAlign: "center" }}>
            Please login to buy products
          </Typography>
        )}
          {canUpdate && (
            <IconButton
              aria-label="update"
              component={Link}
              href={`/admin/products/update/${_id}`}
            >
              <EditIcon />
            </IconButton>
          )}
          {canRemove && (
            <IconButton aria-label="delete" onClick={() => deleteHandler(_id)}>
              <DeleteIcon />
            </IconButton>
          )}
          {canBuy && (
            <Button variant="contained" sx={{p: 1.5, m: 1.5}} onClick={addToBasket}>
              Add to Basket
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProductDisplay;