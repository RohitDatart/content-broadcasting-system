const prisma = require("../config/prisma");

const createContent = async (data) => {
  return await prisma.content.create({
    data,
  });
};

const approveContent = async (contentId, principalId) => {
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    throw new Error("Content not found");
  }

  if (content.status !== "PENDING") {
    throw new Error("Content already processed");
  }

  return await prisma.content.update({
    where: { id: contentId },
    data: {
      status: "APPROVED",
      approved_by: principalId,
      approved_at: new Date(),
      rejection_reason: null,
    },
  });
};

const rejectContent = async (contentId, principalId, reason) => {
  const content = await prisma.content.findUnique({
    where: { id: contentId },
  });

  if (!content) {
    throw new Error("Content not found");
  }

  if (content.status !== "PENDING") {
    throw new Error("Content already processed");
  }

  return await prisma.content.update({
    where: { id: contentId },
    data: {
      status: "REJECTED",
      approved_by: principalId,
      approved_at: new Date(),
      rejection_reason: reason,
    },
  });
};

const getContentByStatus = async (status, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return await prisma.content.findMany({
    where: { status },
    skip,
    take: parseInt(limit),
    orderBy: { created_at: "desc" },
  });
};

const getApprovedContent = async (subject) => {
  return await prisma.content.findMany({
    where: {
      status: "APPROVED",
      ...(subject && { subject }),
    },
    select: {
      id: true,
      title: true,
      description: true,
      file_path: true,
      file_type: true,
      subject: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

module.exports = {
  createContent,
  approveContent,
  rejectContent,
  getContentByStatus,
  getApprovedContent,
};
