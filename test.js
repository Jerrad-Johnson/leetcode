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
        let arr = nums;
        let tempArr = [];
        let reverseArr = [];
        let forwardArr = [];

        for (let i = 0; i < arr.length; i++){
            for (let j = arr.length-1; j >= i; j--){
                reverseArr.push(arr[j]);

            }
            tempArr.push(reverseArr);
            reverseArr = [];

            for (let k = i; k < arr.length; k++){
                forwardArr.push(arr[k]);
            }
/*            tempArr.push(forwardArr);
            forwardArr = [];*/
        }

        let sums = [];

cc(tempArr)
        for (let i = 0; i < tempArr.length; i++){
            let sum = tempArr[i].reduce((a, b) => a + b);
            sums.push(sum);
        }

        let max = sums.reduce((a, b) => a > b ? a : b)

        return max
    }
}

let leetcode = new LeetcodeChallenges;
cc(leetcode.maximumSubArray([-2,1,-3,4,-1,2,1,-5,4]));


/*
cc(leetcode.maxProfit([7,1,5,3,6,4]));
cc(leetcode.twoSum([1, 3, 5, 7, 9, 11], 8))
cc(leetcode.containsDuplicate([1,2,3]))
cc(leetcode.productExceptSelf([-1,1,0,-3,3]))
cc(leetcode.productExceptSelfV2([-1,1,0,-3,3]))

*/
