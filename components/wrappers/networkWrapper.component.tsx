import { useNetworkMismatch } from "@thirdweb-dev/react";
import ChangeNetwork from "../modals/network.component";

export default function NetworkWrapper({ children }: any) {
  const isMismatched = useNetworkMismatch();

  return (
    <>
      {isMismatched && (
        <ChangeNetwork isOpen={isMismatched} onClose={() => {}} />
      )}
      {children}
    </>
  );
}
