import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DynamicInputList from "@/components/ui/multiInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { loadFormDataFromStorage, loadResponseFromStorage, saveFormDataInStorage } from "@/utils/handleSavedResponse";
import { toast } from "sonner";
import StoredResponseDialog from "@/components/StoredResponseDialog";

export type formInputs = {
  topic: string;
  gradeLevel: string;
  concepts: string[]; // Includes both the main concept & subtopics
  materialsNeeded: string[];
  learningObjectives: string[];
};

const initialState: formInputs = {
  topic: "",
  gradeLevel: "",
  concepts: [""],
  materialsNeeded: [""],
  learningObjectives: [""],
};

const LessonInput: React.FC = () => {
  const [formData, setFormData] = React.useState<formInputs>(initialState);
  const [response, setResponse] = React.useState<string>("");
  const [showDialog, setShowDialog] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.values(formData).forEach((value) => {
      if (value === "") {
        toast.error("Please fill in all fields");
        return;
      }
    });
    saveFormDataInStorage(formData);
    navigate("/lesson-input/response");
  };

  const handleShowResponse = () => {
    setShowDialog(false);
    setResponse(loadResponseFromStorage());
    setFormData(loadFormDataFromStorage());
  }

  useEffect(() => {
    const savedResponse = loadResponseFromStorage();
    if (!savedResponse) return
    setShowDialog(true)
  }, []);

  useEffect(() => {
    if (response && location.pathname !== "/lesson-input/response") {
      navigate("/lesson-input/response");
    }
  }, [response]);

  return (
    <div className="h-full m-4">
      { showDialog && <StoredResponseDialog onShowResponse={handleShowResponse} />}
      <div className="w-full sm:w-4/5 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Lesson Plan Form</CardTitle>
            <CardDescription className="text-center text-gray-700 dark:text-gray-300">
              Complete the form below to generate an AI-assisted lesson plan
              outline.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleFormSubmit}
              className="grid grid-cols-2 w-full gap-4"
              id="lessonInputForm"
            >
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="topic">Topic</label>
                <Input
                  type="text"
                  id="topic"
                  placeholder="enter the topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="gradeLevel">Grade</label>
                <Select
                  value={formData.gradeLevel}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gradeLevel: value })
                  }
                >
                  <SelectTrigger id="gradeLevel">
                    <SelectValue placeholder="select grade" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="1">1st Grade</SelectItem>
                    <SelectItem value="2">2nd Grade</SelectItem>
                    <SelectItem value="3">3rd Grade</SelectItem>
                    <SelectItem value="4">4th Grade</SelectItem>
                    <SelectItem value="5">5th Grade</SelectItem>
                    <SelectItem value="6">6th Grade</SelectItem>
                    <SelectItem value="7">7th Grade</SelectItem>
                    <SelectItem value="8">8th Grade</SelectItem>
                    <SelectItem value="9">9th Grade</SelectItem>
                    <SelectItem value="10">10th Grade</SelectItem>
                    <SelectItem value="11">11th Grade</SelectItem>
                    <SelectItem value="12">12th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <label htmlFor="mainConcept&subtopics">
                  Main Concept & Subtopics
                </label>
                <DynamicInputList
                  type="text"
                  id="mainConcept&subtopics"
                  placeholder="concept & subtopics"
                  required={true}
                  value={formData.concepts}
                  onChange={(value) =>
                    setFormData({ ...formData, concepts: value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <DynamicInputList
                  type="text"
                  id="materialsNeeded"
                  placeholder="material"
                  required={true}
                  value={formData.materialsNeeded}
                  onChange={(value) =>
                    setFormData({ ...formData, materialsNeeded: value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="learningObjectives">Learning Objectives</label>
                <DynamicInputList
                  type="text"
                  id="learningObjectives"
                  placeholder="objective"
                  required={true}
                  value={formData.learningObjectives}
                  onChange={(value) =>
                    setFormData({ ...formData, learningObjectives: value })
                  }
                />
              </div>
              <div className="col-span-2 flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setFormData(initialState);
                  }}
                  className="text-sm xs:text-[1rem]"
                >
                  clear all
                </Button>
                <Button
                  type="submit"
                  className="text-wrap text-sm xs:text-[1.1rem]"
                >
                  Generate Lesson Plan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="my-8 text-center">
        <Outlet context={{ formData, response, setResponse }} />
      </div>
    </div>
  );
};

export default LessonInput;
