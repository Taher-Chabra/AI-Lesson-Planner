import { formInputs } from "@/pages/LessonInput";

// Saving Form Data to Local Storage
export const saveFormDataInStorage = (formData: formInputs) => {
  try {
    localStorage.setItem('aiLessonPlanFormData', JSON.stringify(formData));
  } catch (e) {
    console.error('Failed to save the form data:', e);
  }
};

// Retrieving Form Data from Local Storage
export const loadFormDataFromStorage = () => {
  try {
    const formData: string | null = localStorage.getItem('aiLessonPlanFormData');
    return formData ? JSON.parse(formData) : undefined;
  } catch (e) {
    console.error('Failed to load the form data:', e);
  }
};

// Clearing Form Data from Local Storage
export const clearFormDataFromStorage = () => {
  try {
    localStorage.removeItem('aiLessonPlanFormData');
  } catch (e) {
    console.error('Failed to clear the form data:', e);
  }
};

// Saving the response
export const saveResponseInStorage = (response: string) => {
  try {
    localStorage.setItem('aiLessonPlan', response);
  } catch (e) {
    console.error('Failed to save the lesson plan:', e);
  }
};

// Retrieving the response
export const loadResponseFromStorage = () => {
  try {
    return localStorage.getItem('aiLessonPlan') || '';
  } catch (e) {
    console.error('Failed to load the lesson plan:', e);
    return '';
  }
};

// Clearing the response
export const clearResponseFromStorage = () => {
  try {
    localStorage.removeItem('aiLessonPlan');
  } catch (e) {
    console.error('Failed to clear the lesson plan:', e);
  }
};