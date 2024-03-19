---
title: Leetcode热门100题
---

## 题型分类

## 顺序列表

### 1 两数之合

[https://leetcode.cn/problems/two-sum/](https://leetcode.cn/problems/two-sum/)

```javascript fold title="哈希/对撞指针"
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/**
 * 1. 利用哈希表 O(n)
 * 执行用时: 68 ms  73%
 * 内存消耗: 41.7 MB 51%
 */
var twoSum = function(nums, target) {
    var hash = {}
    for(var i = 0, len = nums.length; i < len; i++) {
        var cur = nums[i]
        if(hash[target - cur] > -1) {
            return [i, hash[target - cur]]
        }
        hash[cur] = i
    }
};

/**
 * 2. 对撞指针  O(n平方)
 * 执行用时: 96 ms 46.17%
 * 内存消耗: 41.4 MB 72.43%
 */
var twoSum = function(nums, target) {
    for(var i = 0, len = nums.length; i < len; i++) {
        for(var j = len - 1; j > i; j--) {
            if(nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
};
```

### 2-两数相加-medium

[https://leetcode.cn/problems/add-two-numbers/](https://leetcode.cn/problems/add-two-numbers/)

考察单向链表

```javascript fold
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

/**
 * 执行用时：112 ms, 在所有 JavaScript 提交中击败了17.51%的用户
 * 内存消耗：46.4 MB, 在所有 JavaScript 提交中击败了24.80%的用户
 */
var addTwoNumbers = function(l1, l2) {
    var list = new ListNode()
    var curL = list, cur1 = l1, cur2 = l2
    while(true) {
        var val = curL.val + cur2.val + cur1.val
        curL.val = val % 10

        var next = new ListNode()
        if(val > 9) {
            next.val = 1
        }
        curL.next = next
        if(cur1.next || cur2.next) {
            cur1 = cur1.next || { val: 0 }
            cur2 = cur2.next || { val: 0 }
            curL = next
        } else {
            if(next.val === 0) {
                curL.next = null
            }
            break
        }
    }
    return list
};
/**
 *
 */
var addTwoNumbers = function(l1, l2) {

}
/**
 * 递归，内存减少但时间增大
 * 执行用时：96 ms, 在所有 JavaScript 提交中击败了66.04%的用户
 * 内存消耗：46 MB, 在所有 JavaScript 提交中击败了54.58%的用户
 */
var addTwoNumbers = function(l1, l2) {
    var fn = function(node, a, b) {
        var val = node.val + a.val + b.val
        node.val = val % 10
        var next = new ListNode(val > 9? 1: 0)

        if(a.next || b.next) {
            node.next = fn(next, a.next || { val: 0 }, b.next || { val: 0 })
        } else if(next.val === 1) {
            node.next = next
        }
        return node
    }
    return fn(new ListNode(), l1, l2)
}
/**
 * 递归优化1
 * 执行用时：92 ms, 在所有 JavaScript 提交中击败了79.88%的用户
 * 内存消耗：45.7 MB, 在所有 JavaScript 提交中击败了77.48%的用户
 */
var addTwoNumbers = function(l1, l2) {
    var fn = function(node, a, b) {
        var val = node.val + (a && a.val || 0 ) + (b && b.val || 0)
        node.val = val % 10
        var next = new ListNode(val > 9? 1: 0)

        if(a && a.next || b && b.next) {
            node.next = fn(next, a && a.next, b && b.next)
        } else if(next.val === 1) {
            node.next = next
        }
        return node
    }
    return fn(new ListNode(), l1, l2)
}
```

### 3-无重复字符的最长子串-medium

[https://leetcode.cn/problems/longest-substring-without-repeating-characters/](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

暴力解法

```javascript
/**
 * @param {string} s
 * @return {number}
 * 执行用时：652 ms, 在所有 JavaScript 提交中击败了5.01%的用户
 * 内存消耗：68.9 MB, 在所有 JavaScript 提交中击败5.00%的用户
 */
var lengthOfLongestSubstring = function(s) {
    var maxLen = 0
    for(var i = 0; i < s.length; i++) {
        var currMap = {}, len = 1
        currMap[s[i]] = i + 1

        for(var j = i + 1; j < s.length; j++) {
            if(currMap[s[j]]) {
                break
            } else {
                currMap[s[j]] = j + 1
            }
        }
        len = Object.keys(currMap).length

        maxLen = maxLen > len? maxLen: len
    }

    return maxLen
};
```

滑动窗口解法

```javascript
/**
 * @param {string} s
 * @return {number}
 *
 * 执行用时：108 ms, 在所有 JavaScript 提交中击败了22.15%的用户
 * 内存消耗：46.6 MB, 在所有 JavaScript 提交中击败了32.46%的用户
 */
var lengthOfLongestSubstring = function(s) {
    var hash = {}, len = 0, p = 0
    for(var i = 0; i < s.length; i++) {
        var curr = s[i]
        if(hash[curr] && hash[curr] > p) {
            var leni = i - p
            len = leni > len? leni: len
            p = hash[curr]
        } else if(i === s.length - 1) {
            var leni = i - p + 1
            len = leni > len? leni: len
        }
        hash[curr] = i + 1
    }

    return len || s.length
};
```

### 4-寻找两个正序数组的中位数-hard

[https://leetcode.cn/problems/median-of-two-sorted-arrays/](https://leetcode.cn/problems/median-of-two-sorted-arrays/)

时间复杂度得是 $O(log(m+n))$

```javascript fold title="首解"
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

/**
 * 1. 暴力解法
 * 执行用时：108 ms, 在所有 JavaScript 提交中击败了28.73%的用户
 * 内存消耗：46.6 MB, 在所有 JavaScript 提交中击败了37.87%的用户
 * 排序：插入的时候逐一对比
 *
 * 错 没看清题目，这是两个正序的数组，不需要考虑排序
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var list = []
    function insert(arr) {
        for(var i = 0, len = arr.length; i< len; i++) {
            var cur = arr[i]
            if(!list.length) {
                list.push(cur)
                continue
            }
            for(var j = 0, len2 = list.length; j < len2; j++) {
                if(cur > list[j]) {
                    if(j === len2 -1) {
                        list.push(cur)
                        break
                    } else if(cur <= list[j + 1]) {
                        list.splice(j + 1, 0, cur)
                        break
                    }
                } else {
                    list.splice(j, 0, cur)
                    break
                }
            }
        }
    }

    insert(nums1)
    insert(nums2)

    var lenTotal = list.length
    if(lenTotal % 2 === 0) {
        var t = lenTotal / 2
        return (list[t-1] + list[t]) / 2
    } else {
        return list[Math.floor(list.length / 2)]
    }
};
```

```javascript fold title="解1 O(m+n)"
/**
 * 执行用时：108 ms, 在所有 JavaScript 提交中击败了28.73%的用户
 * 内存消耗：45.4 MB, 在所有 JavaScript 提交中击败了75.51%的用户
 *
 * 把里面的list.push(xxx) 换成 list[i] = xxx
 * 执行用时：92 ms, 在所有 JavaScript 提交中击败了74.56%的用户
 */
// 用两个指针分别指向两个数组，比较指针下的元素大小，一共移动次数为 (m+n + 1)/2
var findMedianSortedArrays = function(nums1, nums2) {
    var list = []
    var lenTotal = nums1.length + nums2.length
    var a = 0, b = 0;
    for(var i = 0; i < lenTotal; i++) {
        if(a === nums1.length) {
            list.push(nums2[b])
            b++
        } else if(b === nums2.length) {
            list.push(nums1[a])
            a++
        } else if(nums1[a] < nums2[b]) {
            list.push(nums1[a])
            a++
        } else {
            list.push(nums2[b])
            b++
        }
    }

    var t = lenTotal / 2
    if(lenTotal % 2 === 0) {
        return (list[t-1] + list[t]) / 2
    } else {
        return list[Math.floor(t)]
    }
};

// 上面解法优化  (m + n + 1)/2次
var findMedianSortedArrays = function(nums1, nums2) {
    var list = []
    var lenTotal = nums1.length + nums2.length
    var a = 0, b = 0, tIndex = Math.ceil((lenTotal + 1) / 2);

    for(var i = 0; i < lenTotal; i++) {
        if(i === tIndex) {
            break
        } if(a === nums1.length) {
            list[i] = nums2[b]
            b++
        } else if(b === nums2.length) {
            list[i] = nums1[a]
            a++
        } else if(nums1[a] < nums2[b]) {
            list[i] = nums1[a]
            a++
        } else {
            list[i] =nums2[b]
            b++
        }
    }
    var t = lenTotal / 2
    if(lenTotal % 2 === 0) {
        return (list[t-1] + list[t]) / 2
    } else {
        return list[Math.floor(t)]
    }
};
/**
 * 执行用时：92 ms, 在所有 JavaScript 提交中击败了74.56%的用户
 * 内存消耗：44.9 MB, 在所有 JavaScript 提交中击败了95.17%的用户
 * 减少了内存消耗
 */
```

### 5-最长回文子串-medium]

[https://leetcode.cn/problems/longest-palindromic-substring/](https://leetcode.cn/problems/longest-palindromic-substring/)

动态规划

```javascript
/**
 * @param {string} s
 * @return {string}
 * 执行用时：1080 ms, 在所有 JavaScript 提交中击败了12.08%的用户
 * 内存消耗：72.3 MB, 在所有 JavaScript 提交中击败了12.51%
 */
var longestPalindrome = function(s) {
    var dp = [], maxLen = 0, left = 0, right = 0
    for(var i = 0; i < s.length; i++) {
        dp[i] = []
        dp[i][i] = true
    }
    // 计算dp[i][j]时 dp[i+1][j-1] 可能没算，需要倒叙
    for(var i = s.length - 1; i >=0 ; i--) {
        for(var j = s.length - 1; j >= 0; j--) {
            if(s[i] === s[j]) {
                if(j - i <= 1) {
                    dp[i][j] = true // aa的情况
                } else {
                    dp[i][j] = dp[i+1][j-1] // dp的关键
                }
            } else {
                dp[i][j] === false
            }

            if(dp[i][j] && maxLen < j - i + 1) {
                maxLen = j - i + 1
                left = i
                right = j
            }
        }
    }
    return s.substring(left, right + 1) // 或 s.substr(left, maxLen)
};
```

动态规划的空间复杂度偏高的，可以使用中心扩散法

```javascript
/**
 * @param {string} s
 * @return {string}
 * 执行用时：88 ms, 在所有 JavaScript 提交中击败了66.39%的用户
 * 内存消耗：42.5 MB, 在所有 JavaScript 提交中击败了80.02%的用户
 */
var longestPalindrome = function(s) {
    var maxLen = 0, left = 0, right = 0

    for(var i = 0; i < s.length; i++) {
        extend(i, i)
        extend(i, i + 1) // 回文字符串可能是偶数长度
    }

    function extend(start, end) {
        while(start >= 0 && end < s.length && s[start] === s[end]) {
            if(end - start + 1 > maxLen) {
                left = start
                right = end
                maxLen = end - start + 1
            }
            start--
            end++
        }
    }

    return s.substring(left, right + 1)
};
```

### 20-有效的括号-easy

[https://leetcode.cn/problems/valid-parentheses/](https://leetcode.cn/problems/valid-parentheses/)

利用一定存在相邻匹配的括号，用 `replace` 不断去掉一对，判断是否能清空

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    var len = s.length / 2
    for(var i = 0; i < len; i++) {
        s = s.replace('()', '').replace('{}', '').replace('[]', '')
    }
    return s.length === 0
};
```

利用 `栈` 的数据结构

```javascript
/**
 * 执行用时：60 ms, 在所有 JavaScript 提交中击败了86.48%的用户
 * 内存消耗：41.4 MB, 在所有 JavaScript 提交中击败了72.66%的用户
 */
var isValid = function(s) {
    var stack = []
    for(var i = 0; i <s.length; i++) {
        var curr = s[i]
        if(curr === '[') stack.push(']')
        else if(curr === '{') stack.push('}')
        else if(curr === '(') stack.push(')')
        else if(!stack.length || curr !== stack[stack.length - 1]) return false
        else stack.pop()
    }
    return stack.length === 0
};
```

### 21-合并两个有序链表-easy

[https://leetcode.cn/problems/merge-two-sorted-lists/](https://leetcode.cn/problems/merge-two-sorted-lists/)

注意如果有一条链表为空时，直接当前节点的 `next` 指向另一节点

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 * 执行用时：68 ms, 在所有 JavaScript 提交中击败了65.83%的用户
 * 内存消耗：43.1 MB, 在所有 JavaScript 提交中击败了80.44%的用户
 */
var mergeTwoLists = function(list1, list2) {
    var listHead = new ListNode(), listCurr = listHead
    while(list1 && list2) {
        var val
        if(list1.val < list2.val) {
            val = list1.val
            list1 = list1.next
        } else {
            val = list2.val
            list2 = list2.next
        }
        var newList =  new ListNode(val)
        listCurr.next = newList
        listCurr = newList
    }
    listCurr.next = list1? list1: list2
    return listHead.next
};
```

### 70-爬楼梯-easy

[https://leetcode.cn/problems/climbing-stairs](https://leetcode.cn/problems/climbing-stairs)

```javascript
/* 动态规划五部曲：
* 1.确定dp[i]的下标以及dp值的含义： 爬到第i层楼梯，有dp[i]种方法；
* 2.确定动态规划的递推公式：dp[i] = dp[i-1] + dp[i-2];
* 3.dp数组的初始化：因为提示中，1<=n<=45 所以初始化值，dp[1] = 1, dp[2] = 2;
* 4.确定遍历顺序：分析递推公式可知当前值依赖前两个值来确定，所以递推顺序应该是从前往后；
* 5.打印dp数组看自己写的对不对；
*/
// f(n) = f(n-1) + f(n-2)

// 递归 会超时
var climbStairs = function(n) {
    if(n === 1) return  1
    if(n === 2) return 2
    return climbStairs(n-1) + climbStairs(n-2)
};

/**
 * 执行用时：64 ms, 在所有 JavaScript 提交中击败了35.55%的用户
 * 内存消耗：40.8 MB, 在所有 JavaScript 提交中击败了63.06%的用户
 */
var climbStairs = function(n) {
    var list = []
    list[0] = 1
    list[1] = 2
    for(var i = 2; i < n; i++) {
        list[i] = list[i-1] + list[i-2]
    }
    return list[n-1]
};
// XXXX 优化内存? 把数组换成这样并没有优化
// 执行用时：64 ms, 在所有 JavaScript 提交中击败了 35.55%的用户
// 内存消耗：40.9 MB, 在所有 JavaScript 提交中击败了57.89%的用户
var climbStairs = function(n) {
    if(n === 1) return 1
    var p = 1, t = 2
    for(var i = 2; i < n; i++) {
        var temp = t
        t = p + t
        p = temp
    }
    return t
};
/**
 * 执行用时：60 ms, 在所有 JavaScript 提交中击败了60.05%的用户
 * 内存消耗：40.8 MB, 在所有 JavaScript 提交中击败了60.07%的用户
 */
var climbStairs = function(n) {
    var p = 1, t = 2, cur = 2
    for(var i = 2; i < n; i++) {
        cur = t + p
        p = t
        t = cur
    }
    return n > 1? cur: 1
};
```

### 75-颜色分类-medium

[https://leetcode.cn/problems/sort-colors/](https://leetcode.cn/problems/sort-colors/)

遍历数组，`n0/n1/n2` 三个指针分别指向三个区的尾部

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 执行用时：56 ms, 在所有 JavaScript 提交中击败了88.09%的用户
 * 内存消耗：41.2 MB, 在所有 JavaScript 提交中击败了39.40%的用户
 */
var sortColors = function(nums) {
    var n0 = 0, n1 = 0, n2 = 0
    for(var i = 0; i < nums.length; i++) {
        var curr = nums[i]
        if(curr === 0) {
            nums[n2++] = 2
            nums[n1++] = 1
            nums[n0++] = 0
        } else if(curr === 1) {
            nums[n2++] = 2
            nums[n1++] = 1
        } else if(curr === 2) {
            nums[n2++] = 2
        }
    }
};
```

双指针，表示区域的边界

```javascript
/**
 * 执行用时：72 ms, 在所有 JavaScript 提交中击败了13.99%的用户
 * 内存消耗：41.1 MB, 在所有 JavaScript 提交中击败了63.22%的用户
 */
var sortColors = function(nums) {
    var n0 = 0, n1 = nums.length - 1
    for(var i = 0; i < nums.length; i++) {
        // 如果当前位置是2，则与2边界处的值交换位置，并且更新边界值
        while(nums[i] === 2 && i < n1) {
            var t = nums[n1]
            nums[i] = nums[n1]
            nums[n1] = 2
            n1--
        }
        // 如果当前位置是0，则与1边界处的值交换位置，并且更新边界值
        if(nums[i] === 0) {
            var t = nums[n0]
            nums[n0] = 0
            nums[i] = t
            n0++
        }
    }
};
```

### 128-最长连续序列-medium

[https://leetcode.cn/problems/longest-consecutive-sequence](https://leetcode.cn/problems/longest-consecutive-sequence)

哈希表解法，先把每个数加入哈希表，然后判断 `hash[n-1]` 不存在的情况下，用 `while` 不断试探 `hash[n+1]` 是否存在，并更新比较得到最大长度

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 * 执行用时：248 ms, 在所有 JavaScript 提交中击败了31.09%的用户
 * 内存消耗：74 MB, 在所有 JavaScript 提交中击败了5.01%的用户
 */
var longestConsecutive = function(nums) {
    var hash = {}, maxLen = 0
    for(var i = 0; i < nums.length; i++) {
        hash[nums[i]] = i + 1
    }
    for(var i = 0; i < nums.length; i++) {
        var n = nums[i]
        if(!hash[n-1]) {
            var len = 0
            while(hash[n]) {
                delete hash[n]
                len++
                n++
            }
            if(len > maxLen) {
                maxLen = len
            }
        }
    }
    return maxLen
};
```

使用 `ES6` 的 `set` 可以优化性能

```javascript
/**
 * 执行用时：96 ms, 在所有 JavaScript 提交中击败了82.92%的用户
 * 内存消耗：60.6 MB, 在所有 JavaScript 提交中击败了16.44%的用户
 */
var longestConsecutive = function(nums) {
    var hash = new Set(nums), maxLen = 0
    for(var n of hash) {
        if(!hash.has(n-1)) {
            var len = 0
            while(hash.has(n)) {
                hash.delete(n)
                len++
                n++
            }
            maxLen = Math.max(maxLen, len)
        }
    }
    return maxLen
};
```

### 136-只出现一次的数字-easy

[https://leetcode.cn/problems/single-number/](https://leetcode.cn/problems/single-number/)

使用哈希表

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 * 执行用时：76 ms, 在所有 JavaScript 提交中击败了39.20%的用户
 * 内存消耗：45.5 MB, 在所有 JavaScript 提交中击败了16.59%的用户
 */
var singleNumber = function(nums) {
    var hash = {}
    for(var i = 0; i < nums.length; i++) {
        if(hash[nums[i]]) {
            delete hash[nums[i]]
        } else {
            hash[nums[i]] = i + 1
        }
    }
    return Number(Object.keys(hash)[0])
};
```

不需要额外空间的方法，使用位运算，按位异或

```javascript
/**
 * 任何数与0 异或等于任何数
 * n与n异或等于0
 * 结合律：a^b^c = a^(b^c)
 */
var singleNumber = function(nums) {
    var a = 0
    for(var i = 0; i < nums.length; i++) {
        a = a ^ nums[i]
    }
    return a
}
```

### 139-单词拆分-medium

[https://leetcode.cn/problems/word-break/](https://leetcode.cn/problems/word-break/)

使用动态规划：

1. `dp[i]` 下标 `i` 表示 `i` 长度的字符串
2. `dp[i]` 为 `true` 的条件是：`[j, j + i)` 为合格单词且 `dp[j]` 为 `true`

```javascript
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 * 执行用时：72 ms, 在所有 JavaScript 提交中击败了42.51%的用户
 * 内存消耗：42.9 MB, 在所有 JavaScript 提交中击败了48.41%的用户
 */
var wordBreak = function(s, wordDict) {
    var dp = [true]
    for(var i = 1; i <= s.length; i++) {
        for(var j = 0; j < i; j++) {
            dp[i] = wordDict.includes(s.substr(j, i - j)) && !!dp[j]
            if(dp[i]) break
        }
    }
    return dp[s.length]
};
```

### 206-反转链表-easy

[https://leetcode.cn/problems/reverse-linked-list/](https://leetcode.cn/problems/reverse-linked-list/)

遍历

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * 执行用时：60 ms, 在所有 JavaScript 提交中击败了86.44%的用户
 * 内存消耗：42.8 MB, 在所有 JavaScript 提交中击败了77.49%的用户
 */
var reverseList = function(head) {
    var node = null
    while(head) {
        var newNode = new ListNode(head.val, node)
        node = newNode
        head = head.next
    }
    return node
};
```

迭代

```javascript
var reverseList = function(head) {
    if(!head || !head.next) return head
    var last = reverseList(head.next)
    head.next.next = head
    head.next = null
    return last
};
```

### 234-回文链表-easy

[https://leetcode.cn/problems/palindrome-linked-list/](https://leetcode.cn/problems/palindrome-linked-list/)

先遍历用栈存链表的值或者反转链表，再原链表值进行对比

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 * 执行用时：148 ms, 在所有 JavaScript 提交中击败了71.47%的用户
 * 内存消耗：70.7 MB, 在所有 JavaScript 提交中击败了22.90%的用户
 */
var isPalindrome = function(head) {
    var list = [], curr = head
    while(curr) {
        list.push(curr.val)
        curr = curr.next
    }
    for(var i = list.length - 1; i > -1; i--) {
        if(list[i] !== head.val) return false
        head = head.next
    }
    return true
};
```

或者把链表转成字符串，再判断回文字符串

### 283-移动零-easy

[https://leetcode.cn/problems/move-zeroes/](https://leetcode.cn/problems/move-zeroes/)

遍历，如果遇到 `0` 则往后找一个非 `0` 数字交换位置

```javascript
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 执行用时：116 ms, 在所有 JavaScript 提交中击败了26.51%的用户
 * 内存消耗：45.3 MB, 在所有 JavaScript 提交中击败了86.24%的用户
 */
var moveZeroes = function(nums) {
    for(var i = 0; i < nums.length; i++) {
        if(!nums[i]) {
            for(var j = i + 1; j < nums.length; j++) {
                if(nums[j]) {
                    nums[i] = nums[j]
                    nums[j] = 0
                    break
                }
            }
        }
    }
    return nums
};
```

利用 `javascript` 的 `sort` 方法

```javascript
/**
 * 执行用时：80 ms, 在所有 JavaScript 提交中击败了85.55%的用户
 * 内存消耗：45.2 MB, 在所有 JavaScript 提交中击败了92.97%的用户
 */
var moveZeroes = function(nums) {
    nums = nums.sort((a, b) => {
        if(!a) return 1
        if(!b) return -1
    })
};
```

### 338-比特位计数-easy

[https://leetcode.cn/problems/counting-bits/](https://leetcode.cn/problems/counting-bits/)

类似 [461-汉明距离-easy](https://leetcode.cn/problems/hamming-distance/) 使用按位右移计算

```javascript
/**
 * @param {number} n
 * @return {number[]}
 * 执行用时：84 ms, 在所有 JavaScript 提交中击败了50.35%的用户
 * 内存消耗：48 MB, 在所有 JavaScript 提交中击败了39.96%的用户
 */
var countBits = function(n) {
    var result = []
    for(var i = 0; i <= n; i++) {
        var t = i, count = 0
        while(t) {
            if(t % 2) count++
            t >>= 1
        }
        result.push(count)
    }
    return result
};
```

另一种位运算思路

```javascript
/**
 * 执行用时：80 ms, 在所有 JavaScript 提交中击败了65.83%的用户
 * 内存消耗：47.8 MB, 在所有 JavaScript 提交中击败了54.31%
 */
var countBits = function(n) {
    var result = [0]
    for(var i = 1; i <= n; i++) {
        // 先右移再加最后一位是否为 1
        result[i] = result[i >> 1] + (i & 1)
    }
    return result
};
```

利用动态规划，判断奇偶数

```javascript
/**
 * 执行用时：84 ms, 在所有 JavaScript 提交中击败了50.35%的用户
 * 内存消耗：48 MB, 在所有 JavaScript 提交中击败了42.86%的用户
 */
var countBits = function(n) {
    var result = [0]
    for(var i = 1; i <= n; i++) {
        if(i % 2) {
            // 奇数最末尾加1
            result[i] = result[i - 1] + 1
        } else {
            // 偶数，相当于右边多加个0
            result[i] = result[i / 2]
        }
    }
    return result
};
```

### 300-最长递增子序列-medium

[https://leetcode.cn/problems/longest-increasing-subsequence/](https://leetcode.cn/problems/longest-increasing-subsequence/)

动态规划 $O(n^2)$

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 * 执行用时：124 ms, 在所有 JavaScript 提交中击败了78.25%的用户
 * 内存消耗：42.8 MB, 在所有 JavaScript 提交中击败了27.91%的用户
 */
var lengthOfLIS = function(nums) {
    var maxLen = 0, dp = []
    for(var i = 0; i < nums.length; i++) {
        dp[i] = 1
        for(var j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = Math.max(dp[j] + 1, dp[i])
            }
        }
        if(dp[i] > maxLen) {
            maxLen = dp[i]
        }
    }

    return maxLen
};
```

二分查找法??

### 448-找到所有数组中消失的数字-easy

[https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/)

使用哈希表或者 `Set`，遍历 `1~n` 获取不在哈希表的数字

```javascript
/**
 * @param {number[]} nums
 * @return {number[]}
 * 执行用时：112 ms, 在所有 JavaScript 提交中击败了49.59%的用户
 * 内存消耗：51.6 MB, 在所有 JavaScript 提交中击败了38.57%的用户
 */
var findDisappearedNumbers = function(nums) {
    var map = new Set(nums)
    var result = []
    for(var i = 0; i < nums.length; i++) {
        if(!map.has(i+1)) {
            result.push(i+1)
        }
    }
    return result
};
```

进阶方法要求不使用额外的空间，将出现的值的对应下标位置的值置为负数，那么保留正数的下标位置就是没出现的值

原始数组：`[4,3,2,7,8,2,3,1]`<br>
重置后为：`[-4,-3,-2,-7,8,2,-3,-1]`

```javascript
var findDisappearedNumbers = function(nums) {
    var result = []
    for(var i = 0; i < nums.length; i++) {
        nums[Math.abs(nums[i]) - 1] = -Math.abs(nums[Math.abs(nums[i]) - 1])
    }
    for(var i = 0; i < nums.length; i++) {
        if(nums[i] > 0) {
            result.push(i+1)
        }
    }
    return result
};
```

### 461-汉明距离-easy

[https://leetcode.cn/problems/hamming-distance/](https://leetcode.cn/problems/hamming-distance/)

考察位运算

```javascript
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 * 执行用时：52 ms, 在所有 JavaScript 提交中击败了95.75%的用户
 * 内存消耗：41.1 MB, 在所有 JavaScript 提交中击败了62.94%的用户
 */
var hammingDistance = function(x, y) {
    var z = x ^ y // 按位异或，将二进制位不同的位置赋1，只要计算1的个数
    var count = 0
    while(z) {
        if(z % 2) count++ // 最后一位是1
        z >>= 1 // z = z >> 1
    }
    return count
};
```

### 647-回文子串-medium

[https://leetcode.cn/problems/palindromic-substrings/submissions/](https://leetcode.cn/problems/palindromic-substrings/submissions/)

类似 [5-最长回文子串-medium](https://leetcode.cn/problems/longest-palindromic-substring/)

中心扩散法

```javascript
/**
 * @param {string} s
 * @return {number}
 * 执行用时：76 ms, 在所有 JavaScript 提交中击败了69.59%的用户
 * 内存消耗：41.6 MB, 在所有 JavaScript 提交中击败了84.82%的用户
 */
var countSubstrings = function(s) {
    var count = 0
    for(var i = 0; i < s.length; i++) {
        check(i, i)
        check(i, i + 1)
    }
    function check(left, right) {
        while(left >= 0 && right < s.length && s[left] === s[right]) {
            count++
            left--
            right++
        }
    }
    return count
}
```
