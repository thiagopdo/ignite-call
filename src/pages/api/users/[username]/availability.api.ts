import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const username = String(req.query.username);
  const { date } = req.query;

  if (!date) return res.status(400).json({ message: "Missing date" });

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) return res.status(400).json({ message: "User does not exist" });

  // Check if date is in the past
  const referenceDate = dayjs(String(date));
  const isPastDate = referenceDate.endOf("day").isBefore(new Date());

  // If date is in the past, return no availability
  if (isPastDate) return res.json({ possibleTimes: [], availableTimes: [] });

  // Check if user has availability for the selected date
  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get("day"),
    },
  });

  // If user has no availability, return no availability
  if (!userAvailability)
    return res.json({ possibleTimes: [], availableTimes: [] });

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability;

  const startHour = Math.floor(time_start_in_minutes / 60);
  const endHour = Math.floor(time_end_in_minutes / 60);

  const possibleTimes = Array.from(
    { length: endHour - startHour },
    (_, index) => {
      return startHour + index;
    }
  );

  // Check if user has blocked times for the selected date
  const blockedTimes = await prisma.scheduling.findMany({
    select: { date: true },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set("hour", startHour).toDate(),
        lte: referenceDate.set("hour", endHour).toDate(),
      },
    },
  });

  // Filter out blocked times from possible times
  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time
    );

    const isTimeInPast = referenceDate.set("hour", time).isBefore(new Date());

    return !isTimeBlocked && !isTimeInPast;
  });
  return res.json({ possibleTimes, availableTimes });
}
