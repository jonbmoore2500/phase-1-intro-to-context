// Your code here
const testObj = {
    firstName: 'Frodo',
    familyName: 'Baggins',
    title: 'Ringbearer',
    payPerHour: 25,
    timeInEvents: [
        {
            type: 'TimeIn',
            hour: 1200,
            date: '2022-01-01'
        }, 
        {
            type: 'TimeIn',
            hour: 1300,
            date: '2022-01-02'
        }
    ],
    timeOutEvents: [
        {
            type: 'TimeOut',
            hour: 1500,
            date: '2022-01-01'
        },
        {
            type: 'TimeOut',
            hour: 1700,
            date: '2022-01-02'
        }
    ]
}


function createEmployeeRecord(emplArr) {
    // creates a record object for a new employee, assigns identifying info and 
    // sets up empty arrays for time in and time out events
    let recordObj = {}
    recordObj.firstName = emplArr[0];
    recordObj.familyName = emplArr[1];
    recordObj.title = emplArr[2];
    recordObj.payPerHour = emplArr[3];
    recordObj.timeInEvents = []
    recordObj.timeOutEvents = []
    return recordObj
}

function createEmployeeRecords(employeesArr) {
    // creates full set of employee records by .mapping array of new employees
    // using createEmployeeRecord function
    const empsRecordsArr = employeesArr.map(employeesArr => createEmployeeRecord(employeesArr))
    return empsRecordsArr
}

function createTimeInEvent(empObj, clockInStamp) {
    // creates a timeIn object, pushes to timeInEvents arr in given employee obj
    let clockInObj = {}
    
    clockInObj.type = 'TimeIn'
    clockInObj.hour = parseInt(clockInStamp.slice(-4))
    clockInObj.date = clockInStamp.slice(0, 10)
    
    empObj.timeInEvents.push(clockInObj)
    return empObj
}
function createTimeOutEvent(empObj, clockOutStamp) {
    let clockOutObj = {}
    
    clockOutObj.type = 'TimeOut'
    clockOutObj.hour = parseInt(clockOutStamp.slice(-4))
    clockOutObj.date = clockOutStamp.slice(0, 10)
    
    empObj.timeOutEvents.push(clockOutObj)
    return empObj
}

function hoursWorkedOnDate(empObj, dateStamp) {
    // locates timeIn and timeOut values for a given employee on given day,
    // returns hours worked (difference between timeIn and timeOut)
    let timeIn
    let timeOut
    
    for (let eventId = 0; eventId < empObj.timeInEvents.length; eventId++) {
        if (empObj.timeInEvents[eventId].date === dateStamp) {
            timeIn = parseInt(empObj.timeInEvents[eventId].hour)/100
        }
        if (empObj.timeInEvents[eventId].date === dateStamp) {
            timeOut = parseInt(empObj.timeOutEvents[eventId].hour)/100
        }
    }
    return timeOut-timeIn
}

function wagesEarnedOnDate(empObj, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(empObj, dateStamp)
    let payRate = empObj.payPerHour
    return hoursWorked*payRate
}

function allWagesFor(empObj) {
    // populates array with all dates worked by given employee
    // maps the total daily pay into new array, reduces for total value
    let datesWorked = []
    empObj.timeInEvents.forEach(clockEvent => {
        datesWorked.push(clockEvent.date)
    })
    let wagesArr = datesWorked.map(dateStamp => wagesEarnedOnDate(empObj, dateStamp))
    return wagesArr.reduce((previous, current) => {
        return previous + current
    }, 0)
}

function calculatePayroll(empsArr) {
    let totalPayPerEmpArr = empsArr.map(empObj => allWagesFor(empObj))
    return totalPayPerEmpArr.reduce((previous, current) => {
        return previous + current
    }, 0)
}



//console.log(allWagesFor(testObj))

//createEmployeeRecords([['John', 'Smith', 'Manager', 30], ['Steve', 'Griffin', 'Assistant', 20]])