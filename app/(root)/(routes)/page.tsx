'use client';


import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
  //const storeModal = useStoreModal(); -- when using useEffect, it doesn't work properly.
  const onOpen = useStoreModal((state)=>state.onOpen);
  const isOpen = useStoreModal((state)=>state.isOpen);

  useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
  }, [isOpen, onOpen]);
  
  return null;
}

export default SetupPage;
