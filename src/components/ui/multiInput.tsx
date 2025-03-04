import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

type DynamicInputListProps = {
  type: string;
  id: string;
  placeholder: string;
  required: boolean;
  value: string[];
  onChange: (value: string[]) => void;
};

export default function DynamicInputList({
  type,
  id,
  placeholder,
  required,
  value,
  onChange,
}: DynamicInputListProps) {
  const handleChange = (index: number, newValue: string) => {
    const updatedMultiInput = [...value];
    updatedMultiInput[index] = newValue;
    onChange(updatedMultiInput);
  };

  const addField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value[value.length - 1] === "") {
      toast.error("Please fill out the current field before adding another.");
      return;
    }
    onChange([...value, ""]);
  };

  const isLastInputField = (index: number) => index === value.length - 1;

  const removeField = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const updatedMultiInput = value.filter((_, i) => i !== index);
    onChange(updatedMultiInput);
  };

  return (
    <div className="space-y-2 border border-gray-500/50 dark:border-gray-500 p-2 rounded-md">
      {value.map((input, index) => (
         <div key={index} className="mx-0.5">
            <div className="w-full flex items-center gap-2">
               <Input
                  type={type}
                  id={id}
                  value={input}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`${placeholder} ${index + 1}`}
                  required={required}
                  className="flex-1 min-w-0"
               />
               {isLastInputField(index) && (
               <Button
                  variant="outline"
                  onClick={addField}
                  className="p-0 size-8"
               >
                  <Plus className="size-4" />
               </Button>
               )}
               <Button
                  variant="destructive"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                     removeField(index, e)
                  }
                  disabled={value.length === 1}
                  className="p-0 size-8"
               >
                  <X className="size-4" />
               </Button>
            </div>
         </div>
      ))}
    </div>
  );
}
