const prisma = require("../config/prisma");

const createSchedule = async ({
  contentId,
  subject,
  duration,
  startTime,
  endTime,
}) => {
  // 1. Validate content
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) throw new Error("Content not found");

  if (content.status !== "APPROVED") {
    throw new Error("Only approved content allowed");
  }

  // 2. Prevent duplicate scheduling
  const existing = await prisma.contentSchedule.findFirst({
    where: {
      content_id: contentId,
      subject,
    },
  });

  if (existing) {
    throw new Error("Content already scheduled for this subject");
  }

  // 3. Prevent overlapping schedules
  const conflict = await prisma.contentSchedule.findFirst({
    where: {
      subject,
      start_time: { lt: new Date(endTime) },
      end_time: { gt: new Date(startTime) },
    },
  });

  if (conflict) {
    throw new Error("Time slot conflict");
  }

  // 4. Rotation logic
  const last = await prisma.contentSchedule.findFirst({
    where: { subject },
    orderBy: { rotation_order: "desc" },
  });

  const nextOrder = last ? last.rotation_order + 1 : 1;

  // 5. Create schedule
  return await prisma.contentSchedule.create({
    data: {
      content_id: contentId,
      subject,
      duration,
      rotation_order: nextOrder,
      start_time: new Date(startTime),
      end_time: new Date(endTime),
    },
  });
};

const getCurrentContent = async (subject) => {
  const now = new Date();

  const schedule = await prisma.contentSchedule.findFirst({
    where: {
      subject,
      start_time: { lte: now },
      end_time: { gte: now },
    },
    include: {
      content: true,
    },
  });

  if (!schedule) {
    return null;
  }

  return {
    subject: schedule.subject,
    startTime: schedule.start_time,
    endTime: schedule.end_time,
    content: {
      id: schedule.content.id,
      title: schedule.content.title,
      description: schedule.content.description,
      file: schedule.content.file_path,
      type: schedule.content.file_type,
    },
  };
};

const getAllSchedules = async () => {
  return await prisma.contentSchedule.findMany({
    include: {
      content: true,
    },
    orderBy: {
      start_time: "asc",
    },
  });
};

const getSchedulesBySubject = async (subject) => {
  return await prisma.contentSchedule.findMany({
    where: { subject },
    include: {
      content: true,
    },
    orderBy: {
      start_time: "asc",
    },
  });
};
module.exports = {
  createSchedule,
  getCurrentContent,
  getAllSchedules,
  getSchedulesBySubject,
};
