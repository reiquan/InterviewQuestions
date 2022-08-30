const now = Date.now()

const log = (string, func) => console.log(string, func)

log('now', now)

let jobData = {
  "jobMeta": [
    {
      "job": "Hospital - Painter",
      "rate": 31.25,
      "benefitsRate": 1
    },
    {
      "job": "Hospital - Laborer",
      "rate": 20.0,
      "benefitsRate": 0.5
    },
    {
      "job": "Shop - Laborer",
      "rate": 16.25,
      "benefitsRate": 1.25
    }
  ],
  "employeeData": [
    {
      "employee": "Steve",
      "timePunch": [
        {
          "job": "Hospital - Painter",
          "start": "2022-02-18 06:02:35",
          "end": "2022-02-18 11:28:54",
          "total": 123.33
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-18 12:31:06",
          "end": "2022-02-18 15:00:11"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-19 07:03:41",
          "end": "2022-02-19 10:00:45"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-19 10:24:58",
          "end": "2022-02-19 12:00:19"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-19 13:22:13",
          "end": "2022-02-19 17:16:32"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-20 05:56:00",
          "end": "2022-02-20 11:33:23"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-20 12:18:45",
          "end": "2022-02-20 17:48:41"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-21 06:02:28",
          "end": "2022-02-21 12:22:19"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-21 13:04:01",
          "end": "2022-02-21 17:52:06"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-22 06:00:58",
          "end": "2022-02-22 11:02:55"
        },
        {
          "job": "Hospital - Painter",
          "start": "2022-02-22 12:18:04",
          "end": "2022-02-22 17:48:41"
        }
      ]
    },
    {
      "employee": "Alex",
      "timePunch": [
        {
          "job": "Shop - Laborer",
          "start": "2022-02-18 06:05:55",
          "end": "2022-02-18 11:18:14"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-18 11:30:09",
          "end": "2022-02-18 14:00:01"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-19 07:18:22",
          "end": "2022-02-19 11:07:45"
        },
        {
          "job": "Hospital - Laborer",
          "start": "2022-02-19 12:04:18",
          "end": "2022-02-19 14:00:19"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-20 06:06:00",
          "end": "2022-02-20 10:13:23"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-20 12:18:45",
          "end": "2022-02-20 16:58:21"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-21 06:08:08",
          "end": "2022-02-21 12:20:55"
        },
        {
          "job": "Shop - Laborer",
          "start": "2022-02-21 12:54:30",
          "end": "2022-02-21 16:45:20"
        },
        {
          "job": "Hospital - Laborer",
          "start": "2022-02-22 06:09:14",
          "end": "2022-02-22 11:30:11"
        },
        {
          "job": "Hospital - laborer",
          "start": "2022-02-22 12:00:29",
          "end": "2022-02-22 17:59:55"
        }
      ]
    }
  ]
};
function analyzeEmployeeData(jobData){
  let employees= [];
  JSON.stringify(jobData);
  // console.log(jobData);
  jobData.employeeData.forEach((employee) => {
    // console.log(employee.timePunch)
     let hours = evaluateHours(employee.employee, employee.timePunch, jobData.jobMeta);
            console.log(hours);
    employees.push(hours);
  });
  console.log(employees);
  return employees;
}

function evaluateHours(employee, timePunch, jobMeta){
  // console.log(timePunch)
  //totalHours variable
  let total = 0;
  //make regularHours variable
  let regular = 0;
  // overtimeHours variable
  let overtime = 0;
  //doubletimeHours variable
  let doubletime= 0;
  // benefits variable
  let benefits = 0;
  // make totalWages variable
  let totalWages = 0;
    // timePunch.forEach((time) => {
      for (const [key, time] of Object.entries(timePunch)) {
        // console.log(time)
        for (const [key, job] of Object.entries(jobMeta)) {
         if(job.job == time.job ){
            // startDate
            let startDate = new Date(time.start);
            //endDate
            let endDate = new Date(time.end);
            //diffInHours
            let diffInHours = (endDate - startDate)/ 3600000;
            // console.log(job)
            
            benefits += job.benefitsRate * diffInHours;
            //grab hours from that time punch and add to total hours
            total += diffInHours;

            // console.log(total);

                  //if total Hours are greater than 40
                    if(total > 40){

                      if(total > 48){
                        //if total Hours are greater than 48
                        job.rate += 2;
                        totalWages += job.rate * diffInHours;
                      //add hours to overtimeHours variable e.g overtimeHours = 40 - totalHours
                        doubletime += total - 48;
                        // job.rate -= 2;
                      } else {
                      
                         //add hours to overtimeHours variable e.g overtimeHours = 40 - totalHours
                          job.rate += 1.5;
                          overtime += total - 40;
                          // job.rate -= 1.5;
                      }
                    } else {
                      regular = total
                    }
            totalWages += job.rate * diffInHours;
              
        }
    };
  };
  let newTotal = total.toFixed(2);
  // console.log(newTotal);
      
  let itemizedHours = {
        // "total" : newTotal,
        "employee" : employee,
        "regular" : regular.toFixed(2),
        "overtime" : overtime.toFixed(2),
        "doubletime" : doubletime.toFixed(2),
        "wageTotal" : totalWages.toFixed(2),
        "benefitsTotal" : benefits.toFixed(2),
  }
  // evaluateWages(itemizedHours);
  return itemizedHours
}

let parse = jobData;
analyzeEmployeeData(parse);
// console.log(parse);