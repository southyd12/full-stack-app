import { Typography } from "@/components/mui";

const Paragraph = ({ children, ...props }) => {
  return (
    <Typography sx={{ color: "#021691" }} paragraph {...props}>
      {children}
    </Typography>
  );
};

export default Paragraph;