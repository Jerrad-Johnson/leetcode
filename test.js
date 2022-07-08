let cc = console.log;

class LeetcodeChallenges {

    maxProfit(prices) {
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

    twoSum(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = 0; j < nums.length; j++) {
                if (nums[i] + nums[j] == target && i !== j) {
                    return [i, j];
                }
            }
        }
    }

    containsDuplicate(nums) {
        let arr = [...nums];
        for (let i = 0; i < arr.length; i++){
            let count = arr.filter((e) => e === arr[i]);
            if (count.length > 1) return true;
        }
        return false;
    }


}

let leetcode = new LeetcodeChallenges;


/*
cc(leetcode.maxProfit([7,1,5,3,6,4]));
cc(leetcode.twoSum([1, 3, 5, 7, 9, 11], 8))
cc(leetcode.containsDuplicate([1,2,3]))

*/
