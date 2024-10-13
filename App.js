
function isFriday(date) {
    return date.getDay() === 5; // 5 is Friday
}

function getWorkingDaysInMonth(year, month, excludeDays) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let workingDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        if (!excludeDays.includes(date.getDay())) {
            workingDays++;
        }
    }
    return workingDays;
}

function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    const excludeDays = [5]; // Exclude Fridays
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
    
    let totalValidDays = 0;

    // Iterate through each month in the date range
    for (let year = startYear; year <= endYear; year++) {
        const startMonth = year === startYear ? start.getMonth() : 0;
        const endMonth = year === endYear ? end.getMonth() : 11;

        for (let month = startMonth; month <= endMonth; month++) {
            const totalDaysInMonth = getWorkingDaysInMonth(year, month, excludeDays);
            daysExcludingFridays.push(totalDaysInMonth);

            let workedDaysInMonth = 0;

            // Calculate working days actually worked in the range
            for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
                const date = new Date(year, month, day);
                if (date >= start && date <= end && !excludeDays.includes(date.getDay())) {
                    workedDaysInMonth++;
                }
            }
            daysWorkedExcludingFridays.push(workedDaysInMonth);
            totalValidDays += workedDaysInMonth;

            // Calculate monthly target
            if (totalDaysInMonth > 0) {
                const monthlyTarget = (workedDaysInMonth / totalDaysInMonth) * (totalAnnualTarget / totalValidDays);
                monthlyTargets.push(monthlyTarget);
            } else {
                monthlyTargets.push(0);
            }
        }
    }

    const totalTarget = monthlyTargets.reduce((acc, curr) => acc + curr, 0);

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget
    };
}

// Example usage
console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));





