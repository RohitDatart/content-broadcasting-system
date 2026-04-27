const validateSchedule = ({
  contentId,
  subject,
  duration,
  startTime,
  endTime,
}) => {
  if (!contentId) return "contentId is required";
  if (!subject) return "subject is required";
  if (!duration || duration <= 0) return "valid duration required";

  if (!startTime || !endTime) return "startTime and endTime required";

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (isNaN(start) || isNaN(end)) {
    return "Invalid date format";
  }

  if (start >= end) {
    return "startTime must be before endTime";
  }

  if (start < new Date()) {
    return "Cannot schedule in the past";
  }

  return null;
};

module.exports = { validateSchedule };
