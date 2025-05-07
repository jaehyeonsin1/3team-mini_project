// YYYY-MM-DD
export function getFormattedDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

// 화면에 표시될 날짜 계산
export function calDates(today, currentDate) {
  const result = [];
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const td = today.toDateString();

  const startDay = date.getDay();

  const lastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const prevLastDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  ).getDate();

  for (let i = startDay - 1; i >= 0; i--) {
    let d = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      prevLastDate - i
    );

    result.push({
      date: d,
      isToday: td === d.toDateString(),
      isCurrentMonth: currentDate.getMonth() === d.getMonth(),
    });
  }

  for (let i = 1; i <= lastDate; i++) {
    let d = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    result.push({
      date: d,
      isToday: td === d.toDateString(),
      isCurrentMonth: currentDate.getMonth() === d.getMonth(),
    });
  }

  for (let i = 1; result.length < 42; i++) {
    let d = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);
    result.push({
      date: d,
      isToday: td === d.toDateString(),
      isCurrentMonth: currentDate.getMonth() === d.getMonth(),
    });
  }

  return result;
}
