import { Icon } from "@chakra-ui/react";

export default function ClockIcon({ ...props }: any) {
  return (
    <Icon
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32.1583 16.2917L29.3258 19.125L26.4916 16.2917M29.6722 18.4167C29.7236 17.9515 29.75 17.4788 29.75 17C29.75 9.95837 24.0416 4.25 17 4.25C9.95837 4.25 4.25 9.95837 4.25 17C4.25 24.0416 9.95837 29.75 17 29.75C21.0053 29.75 24.5792 27.9031 26.9167 25.0146M17 9.91667V17L21.25 19.8333"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
}
