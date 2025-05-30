export const updateStatus = (subtasks: any, dueDate: any) => {
  let status = "";
  if (subtasks.length > 0) {
    const allNotStarted = subtasks.every(
      (sub: any) => sub.status === "Not Started"
    );
    const allDone = subtasks.every((sub: any) => sub.status === "Done");
    const hasInProgressOrDone = subtasks.some(
      (sub: any) => sub.status === "In Progress" || sub.status === "Done"
    );

    if (allDone) {
      status = "Done";
    } else if (allNotStarted) {
      status = "Not Started";
    } else if (hasInProgressOrDone) {
      status = "In Progress";
    }
  } else {
    return "Not Started";
  }

  // Tambahan: kalau overdue dan bukan Done/Late, jadi Late
  if (dueDate < new Date() && status !== "Done" && status !== "Late") {
    status = "Late";
  }

  return status;
};
