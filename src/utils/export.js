export function exportToExcel(students) {
  const headers = ["Full Name", "Email", "Age", "Grade", "Status"];
  const rows = students.map(s => [s.name, s.email, s.age, s.grade, s.status]);
  const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "students_export.csv";
  link.click();
  URL.revokeObjectURL(url);
}
