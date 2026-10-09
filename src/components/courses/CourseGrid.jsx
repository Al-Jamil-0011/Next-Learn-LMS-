import CourseCard from './CourseCard.jsx';

export default function CourseGrid({ courses, className = 'grid g3', id }) {
  return (
    <div className={className} id={id}>
      {courses.map((c, i) => (
        <CourseCard key={c.id} course={c} index={i} />
      ))}
    </div>
  );
}
