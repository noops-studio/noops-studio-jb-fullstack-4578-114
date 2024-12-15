"use strict";

(() => {
    const grades = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    let max = 0;
    for (const grade of grades){
        if (grade > max){
            max = grade;
        }

        let min = Infinity;
        for (const grade of grades){
            if (grade < min){
                min = grade;
            }
        }

        grades.reduce


    }
})();