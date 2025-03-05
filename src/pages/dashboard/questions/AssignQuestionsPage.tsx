import BackButton from "@/components/common/BackButton";
import AddQuestionsToLesson from "@/components/AddQuestionsToLesson";

const AssignQuestionPage = () => {
  return (
    <>
      <BackButton link="/dashboard/lessons" text="Back to Lesssons" />
      <AddQuestionsToLesson />
    </>
  );
};

export default AssignQuestionPage;
