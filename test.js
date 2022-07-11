let cc = console.log;

class LeetcodeChallenges {

    maxProfit(prices){
        let difference = 0;

        for (let i = 0; i < prices.length; i++) {
            for (let j = i + 1; j < prices.length; j++) {
                if ((prices[j] - prices[i]) > difference) {
                    difference = prices[j] - prices[i];
                }
            }
        }
        return difference;
    }

    twoSum(nums, target){
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; j < nums.length; j++) {
                if (nums[i] + nums[j] == target && i !== j) {
                    return [i, j];
                }
            }
        }
    }

    containsDuplicate(nums){
        let arr = [...nums];
        for (let i = 0; i < arr.length; i++){
            let count = arr.filter((e) => e === arr[i]);
            if (count.length > 1) return true;
        }
        return false;
    }

    productExceptSelf(nums){
        let arr = [...nums];
        let finalArr = [];

        for (let i = 0; i < arr.length; i++){
            let tempArr = [...arr]
            let output = 1;
            tempArr.splice(i, 1)
            for (let j = 0; j < tempArr.length; j++){
                output *= tempArr[j]
            }
            if (output === -0) output = 0
        finalArr.push(output)
        }

        return finalArr;
    }

    productExceptSelfV2(nums){
        let arr = [...nums];
        let memo = [];
        let product = 1;
        let response = [];

        arr.forEach((item, index, array) => {
            if (memo[item] === undefined){
                let tempArr = [...arr]
                tempArr.splice(index, 1)
                product = tempArr.reduce((a, b) => a * b);
                response.push(product)
                memo[item] = product;
            } else {
                response.push(memo[item])
            }
        });
        return response;
    }

    maximumSubArray(nums){
        let testSum = 0;
        let largestFoundSum = -Infinity;

        for (let i = 0; i < nums.length; i++){
            testSum = Math.max(testSum + nums[i], nums[i]);
            if (testSum > largestFoundSum) largestFoundSum = +testSum;
        }
        return largestFoundSum;
    }

    isAnagram(s, t){
        let splitOne = s.split("").sort().join("");
        let splitTwo = t.split("").sort().join("");

        return splitOne === splitTwo;
    }

    groupAnagrams(strs){ // Does not meet requirements due to rearranging letters.
        let newArr = [];
        let tempArr = [];
        let entries = strs;

        for (let i = 0; i < entries.length; i++){
            entries[i] = entries[i].split("").sort().join("");
        }

        let groupedEntries = [];
        let iteration = -1;

        while (entries.length > 0){
            let findThis = entries[0];
            iteration++;
            groupedEntries[iteration] = [];
            for (let i = 0; i < entries.length; i++){
                if (JSON.stringify(findThis) === JSON.stringify(entries[i])){
                    groupedEntries[iteration].push(entries[i]);
                    entries.splice(i, 1);

                }
            }
        }
        return groupedEntries;
    }

    groupAnagramsV2(strs){
        let newArr = [];
        let tempArr = [];
        let entries = [...strs];
        let unsortedEntries = [...strs];

        for (let i = 0; i < entries.length; i++){
            entries[i] = entries[i].split("").sort().join("");
        }

        let groupedEntries = [];
        let iteration = -1;

        while (entries.length > 0){
            let findThis = entries[0];
            iteration++;
            groupedEntries[iteration] = [];
            for (let i = 0; i < entries.length; i++){
                if (JSON.stringify(findThis) === JSON.stringify(entries[i])){
                    groupedEntries[iteration].push(unsortedEntries[i]);
                    entries.splice(i, 1);
                    unsortedEntries.splice(i, 1);
                    i--
                }
            }
        }
        return groupedEntries;
    }

    topKFrequent(nums, k){ // This finds the count of the most frequent entries, not the value of the most frequent entries... Mistake.
        let map = {};

        for (let num of nums){
            map[num] > 0 ? map[num] += 1 : map[num] = 1;
        }

        let counts = Object.keys(map)
        counts = counts.map((a) => +a);

        let solutions = [];

        for (let i = 0; i < k; i++){
            let solution = Math.max(...counts);
            let solutionPosition = counts.indexOf(solution);
            solutions.push(+solution);
            counts.splice(solutionPosition, 1);
        }

        return solutions;
    }

}

let leetcode = new LeetcodeChallenges;
cc(leetcode.topKFrequent([1,1,1,2,2,3], 2));

/*
cc(leetcode.maxProfit([7,1,5,3,6,4]));
cc(leetcode.twoSum([1, 3, 5, 7, 9, 11], 8))
cc(leetcode.containsDuplicate([1,2,3]))
cc(leetcode.productExceptSelf([-1,1,0,-3,3]))
cc(leetcode.productExceptSelfV2([-1,1,0,-3,3]))
cc(leetcode.maximumSubArray([5,4,-1,7,8]));
cc(leetcode.isAnagram("anagram", "nagaram"));
cc(leetcode.groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
cc(leetcode.groupAnagramsV2(["eat","tea","tan","ate","nat","bat"]));
*/
