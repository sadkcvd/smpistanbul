import { prisma } from "@/lib/prisma";

export const appointmentRepo = {
  findAll() {
    return prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  create(data: {
    name: string;
    phone: string;
    city: string;
    hairLossType: string;
    preferredDate: Date;
    message: string;
  }) {
    return prisma.appointment.create({
      data: {
        ...data,
        status: "pending",
      },
    });
  },

  updateStatus(id: string, status: string) {
    return prisma.appointment.update({
      where: { id },
      data: { status },
    });
  },

  delete(id: string) {
    return prisma.appointment.delete({
      where: { id },
    });
  },
};