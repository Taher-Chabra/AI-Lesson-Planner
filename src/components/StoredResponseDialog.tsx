import { useEffect, useState } from "react";
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
import { clearFormDataFromStorage, clearResponseFromStorage } from "@/utils/handleSavedResponse";

type StoredResponseDialogProps = {
  onShowResponse: () => void;
};

export default function StoredResponseDialog({ onShowResponse }: StoredResponseDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // Open dialog on mount
    setTimeout(() => setOpen(true), 1000);
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Found Previous Response in Storage!
          </AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to see previously generated lesson plan?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-around">
          <AlertDialogCancel
            onClick={() => onShowResponse()}
          >Show me</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              clearResponseFromStorage();
              clearFormDataFromStorage();
            }}
          >Clear response</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
