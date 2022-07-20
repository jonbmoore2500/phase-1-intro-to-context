// Your code here

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

//console.log("YYYY-MM-DD HHMM".slice(-4, -2))
//console.log(createEmployeeRecords([['John', 'Smith', 'Manager', 30], ['Steve', 'Griffin', 'Assistant', 20]]))