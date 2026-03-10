import { useState, useMemo } from "react";
import { initialStudents } from "../data/students";

let nextId = initialStudents.length + 1;

const COLORS = ["#a18cd1","#4facfe","#f093fb","#43e97b","#fa709a","#f6d365","#a1c4fd","#fd7eb4","#30cfd0","#667eea","#ffecd2","#a8edea"];

function getInitials(name) {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2);
}

export function useStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      const matchGrade = gradeFilter === "All" || s.grade === gradeFilter;
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchGrade && matchStatus;
    });
  }, [students, search, gradeFilter, statusFilter]);

  const simulate = (fn) => {
    setLoading(true);
    setTimeout(() => {
      fn();
      setLoading(false);
    }, 600);
  };

  const addStudent = (data) => {
    simulate(() => {
      const color = COLORS[nextId % COLORS.length];
      setStudents(prev => [...prev, { ...data, id: nextId++, avatar: getInitials(data.name), color }]);
    });
  };

  const updateStudent = (id, data) => {
    simulate(() => {
      setStudents(prev => prev.map(s => s.id === id ? { ...s, ...data, avatar: getInitials(data.name) } : s));
    });
  };

  const deleteStudent = (id) => {
    simulate(() => {
      setStudents(prev => prev.filter(s => s.id !== id));
    });
  };

  return { students, filtered, search, setSearch, gradeFilter, setGradeFilter, statusFilter, setStatusFilter, loading, addStudent, updateStudent, deleteStudent };
}
