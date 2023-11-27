import { nanoid } from "nanoid";
import { dinero, add, toDecimal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";
import {
  Paper,
  // List,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Typography,
} from "@/components/mui";
// import Product from "@/components/Product";
// import Paragraph from "@/components/Paragraph";
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { formatPrice } from "@/lib/utils/formatters";

const BasketList = () => {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce((total, item) => {
    console.log(total, item);
    return add(total, dinero({ amount: item.price, currency: GBP }));
  }, dinero({ amount: 0, currency: GBP }));

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#ffeb6b"}}>
      <Table sx={{ minWidth: 650 }} aria-label="Order Details">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#021691" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#021691" }}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map(({ title, price }) => (
            <TableRow
              key={nanoid()}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "#021691" }}>
                {title}
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold", color: "#021691" }}>
                {formatPrice(
                  toDecimal(dinero({ amount: price, currency: GBP }))
                )}
              </TableCell>
              {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" component="th" scope="row">
              <Typography sx={{ fontWeight: "bold", color: "#021691" }}>Total</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontWeight: "bold", color: "#021691" }}>{formatPrice(toDecimal(basketTotal))}</Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default BasketList;