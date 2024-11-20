import LessonCard from "./LessonCard";
import lessons from "@/data/lessons"; 
import "./ListLessons.css"; 

const ListLessons = () => {
  return (
    <div className="grid-container">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          title={lesson.title}
          body={lesson.body}
          difficulty={lesson.difficulty}
          category={lesson.category}
        />
      ))}
    </div>
  );
};

export default ListLessons;