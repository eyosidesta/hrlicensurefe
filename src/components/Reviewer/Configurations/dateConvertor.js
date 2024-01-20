const { eg, ge } = require("ethiopic-calendar");

const getMonthName = (monthNumber) => {
    switch (monthNumber) {
      case 1:
        return "መስከረም";
      case 2:
        return "ጥቅምት";
      case 3:
        return "ሕዳር";
      case 4:
        return "ታኅሣሥ";
      case 5:
        return "ጥር";
      case 6:
        return "የካቲት";
      case 7:
        return "መጋቢት";
      case 8:
        return "ሚያዝያ";
      case 9:
        return "ግንቦት";
      case 10:
        return "ሰኔ";
      case 11:
        return "ሐምሌ";
      case 12:
        return "ነሐሴ";
      default:
        return monthNumber;
    }
  };

  export const toGregorian = (year, month, date) => {
    const gregorian = eg(parseInt(year), parseInt(month), parseInt(date));
    return `${gregorian.year}-${
      gregorian.month < 10 ? `0${gregorian.month}` : gregorian.month
    }-${gregorian.day < 10 ? `0${gregorian.day}` : gregorian.day}T03:00:00.000Z`;
  };

  export const toEthiopian = (gregorian, withMonthNumber) => {
    const gregDate = gregorian.split("T")[0].split("-");
    gregDate[2] = gregDate[2].substring(0, 2);
    const numberGregDate = gregDate.map((el) => parseInt(el));
    const { day, month, year } = ge(
      numberGregDate[0],
      numberGregDate[1],
      numberGregDate[2]
    );
    return withMonthNumber
      ? `${day}-${month}-${year} E.C`
      : `${getMonthName(month)} ${day},${year}`;
  };
  