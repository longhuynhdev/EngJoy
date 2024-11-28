import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationPopoverProps {
  title: string;
  message: string;
  onConfirm: () => void;
}

export function DeleteConfirmationPopover({
  title,
  message,
  onConfirm,
}: DeleteConfirmationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
