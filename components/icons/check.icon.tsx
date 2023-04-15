import { Icon } from "@chakra-ui/react";

export default function CheckIcon({ ...props }: any) {
  return (
    <Icon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_8_106)">
        <path
          d="M18.3334 9.23811V10.0048C18.3323 11.8018 17.7504 13.5503 16.6745 14.9896C15.5985 16.4289 14.0861 17.4818 12.3628 17.9914C10.6395 18.5009 8.79774 18.4397 7.11208 17.8169C5.42642 17.1942 3.98723 16.0432 3.00915 14.5357C2.03108 13.0281 1.56651 11.2448 1.68475 9.4517C1.80299 7.65858 2.49769 5.95171 3.66525 4.58567C4.83281 3.21962 6.41068 2.26759 8.16351 1.87156C9.91635 1.47553 11.7502 1.65672 13.3917 2.38811M18.3334 3.33334L10 11.675L7.50002 9.17501"
          stroke="#DDE2F7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8_106">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
}
