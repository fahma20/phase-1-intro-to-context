function createEmployeeRecord(data) {
    const [firstName, familyName, title, payPerHour] = data;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
 
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
 
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === date);
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100; // Convert to hours
    }
    return 0;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
  }
  
 
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(e => e.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  }
  
 
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
  }
  