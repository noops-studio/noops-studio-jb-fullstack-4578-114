"use strict";

(() => {
    const arr = [100, 99, 78, 87, 65, 66, 64, 99, 92, 80];
    const arr2 = [64, 65, 66, 78, 80, 87, 92, 99, 99, 100];

    const search1 = parseInt(prompt('Enter a number to search in the first array (unsorted):'), 10);
    const search2 = parseInt(prompt('Enter a number to search in the second array (sorted):'), 10);

    try {
        const hashMap = {};
        arr.forEach((value, index) => {
            if (hashMap[value] === undefined) hashMap[value] = [];
            hashMap[value].push(index); 
        });

        if (hashMap[search1] !== undefined) {
            alert(`Found ${search1} in the first array (arr) at indices ${hashMap[search1].join(', ')}`);
        } else {
            alert(`${search1} not found in the first array (arr)`);
        }
    } catch (error) {
        console.error('Error searching in the first array (arr):', error);
    }

    try {
        const binarySearch = (array, target) => {
            let left = 0;
            let right = array.length - 1;
            let indices = [];

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (array[mid] === target) {
                    indices.push(mid);

                    let i = mid - 1;
                    while (i >= 0 && array[i] === target) {
                        indices.push(i);
                        i--;
                    }
                    i = mid + 1;
                    while (i < array.length && array[i] === target) {
                        indices.push(i);
                        i++;
                    }

                    return indices.sort((a, b) => a - b); 
                } else if (array[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return null;
        };

        const indices = binarySearch(arr2, search2);
        if (indices) {
            alert(`Found ${search2} in the second array (arr2) at indices ${indices.join(', ')}`);
        } else {
            alert(`${search2} not found in the second array (arr2)`);
        }
    } catch (error) {
        console.error('Error searching in the second array (arr2):', error);
    }
})();
