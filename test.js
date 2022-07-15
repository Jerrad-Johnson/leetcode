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

    topKFrequentV2(nums, k){
        let map = {};

        for (let num of nums){
            map[num] > 0 ? map[num] += 1 : map[num] = 1;
        }

        let counts = Object.values(map)
        let solutionsValues = [];

        for (let i = 0; i < k; i++){
            let solution = Math.max(...counts);
            let solutionPosition = counts.indexOf(solution);
            solutionsValues.push(+solution);
            counts.splice(solutionPosition, 1);
        }

        let solutionKey = [];

        for (let i = 0; i < solutionsValues.length; i++){
            let tempKey = Object.keys(map).find(entry => map[entry] === solutionsValues[i]);
            solutionKey.push(+tempKey);
            delete map[tempKey];
        }

        return solutionKey;
    }

    isValidSudoku(board) {
        let columns = [];
        let blocks = [];

        for (let i = 0; i < board.length; i++){
            columns[i] = [];
            for (let j = 0; j < board.length; j++){
                columns[i][j] = board[j][i]
            }
        }

        let horizontalCounter = 0;
        let verticalCounter = 0;
        let iteration = 0;

        for (; iteration < board.length; ){
            blocks.push(getBlockValues(iteration, horizontalCounter, board));
            verticalCounter++;
            horizontalCounter += 3;
            if (horizontalCounter === 9) horizontalCounter = 0;
            if (verticalCounter === 3) { iteration += 3; verticalCounter = 0; }
        }

        function getBlockValues(vertical, horizontal, board){
            let tempArr = [];
            let counter = 0;

            for (let i = vertical; i < vertical+3; i++){
                for (let h = horizontal; h < horizontal+3; h++){
                    tempArr[counter] = board[i][h]
                    counter++;
                }
            }
            return tempArr;
        }

        let dataset = [...board, ...columns, ...blocks]

        function checkEntries(dataset) {
            let rowIteration = 0;
            let rowMap = [];
            for (let row of dataset) {
                rowMap[rowIteration] = {}

                for (let i = 0; i < row.length; i++) {
                    if (!rowMap[rowIteration][row[i]] && row[i] !== ".") {
                        rowMap[rowIteration][row[i]] = 1;
                    } else if (rowMap[rowIteration][row[i]] && row[i] !== ".") {
                        return false;
                    }
                }
                rowIteration++;
            }
            return true;
        }

        return checkEntries(dataset)
    }

    longestConsecutive(nums){
        if (nums.length === 0) return 0;
        let sequence = nums.sort((a, b) => a - b);
        let longestSequence = [sequence[0]];
        let currentSequence = [sequence[0]];
        let last = sequence[0];

        for (let i = 1; i < sequence.length; i++) {
            if (sequence[i] === last) continue
            if (sequence[i] === last + 1) {
                currentSequence.push(sequence[i]);
            } else {
                currentSequence = [sequence[i]];
            }

            if (currentSequence.length > longestSequence.length) longestSequence = currentSequence;
            last = sequence[i];
        }

        return longestSequence.length;
    }

    isPalindrome(s) {
        return s.replace(/[^a-z0-9]/gi,'').toLowerCase() === s.replace(/[^a-z0-9]/gi,'').toLowerCase().split("").reverse().join("")
    }

    twoSumII(numbers, target){
        let last;

        for (let i = 0; i < numbers.length; i++){
            if (numbers[i] === last) continue
            last = numbers[i];
            for (let j = i+1; j < numbers.length; j++){
                if (last + numbers[j] === target) return [i+1, j+1];
            }
        }
    }

    twoSumIIV2(numbers, target){
        let last;
        let memo = [];

        for (let i = 0; i < numbers.length; i++){
            if (memo[numbers[i]]) continue
            last = numbers[i];
            memo[numbers[i]] = 1;
            cc(memo)
            for (let j = i+1; j < numbers.length; j++){
                if (last + numbers[j] === target) return [i+1, j+1];
            }
        }
    }




}

let leetcode = new LeetcodeChallenges;
cc(leetcode.twoSumIIV2([2,7,11,15], 26));

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
cc(leetcode.topKFrequent([1,1,1,2,2,3], 2));
cc(leetcode.topKFrequentV2([1, 2], 2));
cc(leetcode.isValidSudoku([
     ["5","3",".",".","7",".",".",".","."]
    ,["6",".",".","1","9","5",".",".","."]
    ,[".","9","8",".",".",".",".","6","."]
    ,["8",".",".",".","6",".",".",".","3"]
    ,["4",".",".","8",".","3",".",".","1"]
    ,["7",".",".",".","2",".",".",".","6"]
    ,[".","6",".",".",".",".","2","8","."]
    ,[".",".",".","4","1","9",".",".","5"]
    ,[".",".",".",".","8",".",".","7","9"]]));
cc(leetcode.longestConsecutive([1,2,0,1]));
cc(leetcode.isPalindrome("A man, a plan, a canal: Panama"))
*/
