import { Icon } from "@chakra-ui/react";

export default function AsterickIcon({ ...props }: any) {
  return (
    <Icon
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 2.5V27.5M23.8389 6.16116L6.16116 23.8389M27.5 15H2.5M23.8389 23.8389L6.16116 6.16116"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
}
