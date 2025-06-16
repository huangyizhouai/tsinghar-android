import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

type PanicButtonProps = {
  onClick: () => void;
};

export default function PanicButton({ onClick }: PanicButtonProps) {
  const { t } = useLanguage();
  
  return (
    <Button
      onClick={onClick}
      className="w-full py-4 bg-red-900/80 hover:bg-red-900/90 border border-red-600/50 rounded-full font-medium text-lg text-white flex items-center justify-center backdrop-blur-sm"
    >
      <AlertTriangle className="h-5 w-5 mr-2" />
      {t("panicButton")}
    </Button>
  );
}
