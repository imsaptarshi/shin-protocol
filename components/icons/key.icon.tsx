import { Icon } from "@chakra-ui/react";

export default function KeyIcon({ ...props }: any) {
  return (
    <Icon
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M22.6667 11.9999C22.6666 11.3175 22.4063 10.6351 21.8856 10.1144C21.3649 9.59368 20.6825 9.33333 20 9.33333M20 20C24.4183 20 28 16.4183 28 12C28 7.58172 24.4183 4 20 4C15.5817 4 12 7.58172 12 12C12 12.3649 12.0244 12.7241 12.0717 13.076C12.1496 13.6549 12.1885 13.9443 12.1623 14.1275C12.135 14.3182 12.1003 14.421 12.0063 14.5892C11.916 14.7507 11.7569 14.9097 11.4388 15.2278L4.62484 22.0418C4.39424 22.2724 4.27894 22.3877 4.19648 22.5223C4.12337 22.6416 4.0695 22.7716 4.03684 22.9077C4 23.0611 4 23.2242 4 23.5503V25.8667C4 26.6134 4 26.9868 4.14532 27.272C4.27316 27.5229 4.47713 27.7268 4.72801 27.8547C5.01323 28 5.3866 28 6.13333 28H9.33333V25.3333H12V22.6667H14.6667L16.7722 20.5612C17.0903 20.2431 17.2493 20.084 17.4108 19.9937C17.579 19.8997 17.6818 19.865 17.8725 19.8377C18.0557 19.8115 18.3451 19.8504 18.924 19.9283C19.2759 19.9756 19.6351 20 20 20Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Icon>
  );
}