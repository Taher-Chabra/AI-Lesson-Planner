import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useOutletContext } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { formInputs } from "./LessonInput";
import generateContent from "@/utils/generateAIResponse";
import formatResponse from "@/utils/formatResponse";
import { saveResponseInStorage } from "@/utils/handleSavedResponse";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";

type outletContext = {
  formData: formInputs;
  response: string;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
};

export default function Response() {
  const { formData, response, setResponse } = useOutletContext<outletContext>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const generatedResponse = await generateContent(formData);
        const formattedResponse = formatResponse(generatedResponse);
        console.log(formattedResponse);
        setResponse(formattedResponse);
        saveResponseInStorage(formattedResponse);
      } catch (error) {
        toast.error("Failed to generate response");
        console.error(error);
      }
    };

    if (response) toast.success("Showing previously generated lesson plan");
    else fetchResponse();
  }, [response]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {response ? (
          <Button
            variant="outline"
            className="text-sm xs:text-[1.1rem] text-green-700 dark:text-green-200 bg-neutral-100/50 dark:bg-neutral-600/50"
            onClick={() => setOpen(true)}
          >
            Open AI generated Lesson Plan
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-sm xs:text-[1.1rem] text-green-700 dark:text-green-200 bg-neutral-100/50 dark:bg-neutral-600/50"
          >
            <Spinner />
            Generating Lesson Plan
            <ArrowRight className="inline ml-0.5 mb-1 size-4" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-xl overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-center">
            Lesson Plan Outline
          </SheetTitle>
        </SheetHeader>
        <div className="p-2 md:p-4 mt-3 md:mt-5">
          {response ? (
            <div className="text-sm md:text-base">
              <div dangerouslySetInnerHTML={{ __html: response }} />
            </div>
          ) : (
            <div className="flex flex-col space-y-5 md:space-y-6 items-center justify-center">
              {[...Array(4)].map((_, index) => (
                <React.Fragment key={index}>
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-1 w-full" />
                  ))}
                  <span></span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => setOpen(false)}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
