import Link from "next/link";
import { dinero, add, toDecimal } from "dinero.js";
import { GBP } from "@dinero.js/currencies";
import { Button, Box } from "@/components/mui";
import Paragraph from "@/components/Paragraph";
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { formatPrice } from "@/lib/utils/formatters";

const BasketTotal = ({}) => {
  const { data: basket } = useUserBasket();
  const basketTotal = basket.items.reduce((total, item) => {
    console.log(total, item);
    return add(total, dinero({ amount: item.price, currency: GBP }));
  }, dinero({ amount: 0, currency: GBP }));

  return (
    <>
      {basket.items.length ? (
        <>
          <Box sx={{textAlign: "center"}}>
          <Button component={Link} href="/checkout" variant="contained" sx={{p: 2, mb: 1}}>
            Checkout
          </Button>
          <Paragraph sx={{mb: 1, fontWeight: "bold", color: "#021691"}}>Total: {formatPrice(toDecimal(basketTotal))}</Paragraph>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default BasketTotal;