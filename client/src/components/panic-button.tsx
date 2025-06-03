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
      className="w-full py-8 bg-destructive hover:bg-opacity-90 rounded-xl font-medium text-lg text-white flex items-center justify-center"
    >
      <AlertTriangle className="h-6 w-6 mr-2" />
      {t("panicButton")}
    </Button>
  );
}
