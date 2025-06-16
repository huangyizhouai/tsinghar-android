import { LogIn } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LoginPromptProps {
  trigger: React.ReactNode;
  feature?: string;
}

export default function LoginPrompt({ trigger, feature = "this feature" }: LoginPromptProps) {
  const { t } = useLanguage();

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background-card border-background-primary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-primary flex items-center">
            <LogIn className="h-5 w-5 mr-2" />
            {t('loginRequired')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-text-secondary">
            {t('loginRequiredDesc', { feature })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-background-primary text-text-secondary">
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleLogin}
            className="bg-primary hover:bg-primary-light text-white"
          >
            <LogIn className="h-4 w-4 mr-2" />
            {t('login')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}