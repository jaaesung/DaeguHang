import { useState, useEffect } from "react";

export const useSchedule = (startDate, endDate) => {
  const [scheduleItemsByDate, setScheduleItemsByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState(startDate || "");

  // 날짜 범위 계산
  const calculateDateRange = (start, end) => {
    const dateArray = [];
    let currentDate = new Date(start);

    // 하루 추가 (하루만 선택된 경우 제외)
    const adjustedEnd = new Date(end);
    if (startDate !== endDate) {
      adjustedEnd.setDate(adjustedEnd.getDate() + 1);
    }

    while (currentDate <= adjustedEnd) {
      dateArray.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  // 일정 초기화
  useEffect(() => {
    if (startDate && endDate) {
      const allDates = calculateDateRange(startDate, endDate);
      const initializedSchedule = allDates.reduce(
        (acc, date) => ({ ...acc, [date]: [] }),
        {}
      );
      setScheduleItemsByDate(initializedSchedule);
      setSelectedDate(startDate);
    }
  }, [startDate, endDate]);

  // 이전 날짜로 이동
  const handlePreviousDate = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    const newDate = previousDate.toISOString().split("T")[0];
    if (previousDate >= new Date(startDate)) {
      setSelectedDate(newDate);
    }
  };

  // 다음 날짜로 이동
  const handleNextDate = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    const newDate = nextDate.toISOString().split("T")[0];

    // Allow navigation to endDate + 1 if multiple days are selected
    const adjustedEnd = new Date(endDate);
    if (startDate !== endDate) {
      adjustedEnd.setDate(adjustedEnd.getDate() + 1);
    }

    if (nextDate <= adjustedEnd) {
      setSelectedDate(newDate);
    }
  };

  // 일정 추가
  const handleAddToPlan = (place) => {
    const dateKey = selectedDate.split("T")[0];
    const existingSchedule = scheduleItemsByDate[dateKey] || [];
    let startTime = 10;

    if (existingSchedule.length > 0) {
      const lastItem = existingSchedule[existingSchedule.length - 1];
      startTime = lastItem.startTime + lastItem.duration;
    }

    if (startTime >= 24) {
      alert(
        "Cannot add more plans for this date. The start time exceeds 24:00."
      );
      return;
    }

    const newScheduleItem = {
      ...place,
      startTime,
      duration: 2,
    };

    setScheduleItemsByDate((prev) => ({
      ...prev,
      [dateKey]: [...existingSchedule, newScheduleItem],
    }));
  };

  // 일정 삭제
  const handleRemoveItem = (index) => {
    const dateKey = selectedDate.split("T")[0];
    const updatedSchedule = [...(scheduleItemsByDate[dateKey] || [])];
    updatedSchedule.splice(index, 1);
    setScheduleItemsByDate((prev) => ({
      ...prev,
      [dateKey]: updatedSchedule,
    }));
  };

  // 일정 업데이트
  const handleUpdateDuration = (index, newDuration) => {
    const dateKey = selectedDate.split("T")[0];
    const updatedSchedule = [...(scheduleItemsByDate[dateKey] || [])];
    updatedSchedule[index].duration = newDuration;
    setScheduleItemsByDate((prev) => ({
      ...prev,
      [dateKey]: updatedSchedule,
    }));
  };

  return {
    scheduleItemsByDate,
    selectedDate,
    handlePreviousDate,
    handleNextDate,
    handleAddToPlan,
    handleRemoveItem,
    handleUpdateDuration,
  };
};
