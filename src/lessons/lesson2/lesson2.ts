console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9

function sum(a: number) {
    return function (b: number) {
        return a + b
    }
}

console.log(`Task 01 - ` + sum(3)(6))

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

function makeCounter() {
    let count = 0
    return function () {
        return ++count
    }
}

let counter = makeCounter()
let counter2 = makeCounter()
console.log(`Task 02.1 - ` + counter())
console.log(`Task 02.1 - ` + counter())
console.log(`Task 02.2 - ` + counter2())
console.log(`Task 02.1 - ` + counter())

// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;

function makeCounter2(count: number) {
    return {
        count: count,
        increase(): number {
            return ++count
        },
        decrease(): number {
            return --count
        },
        reset() {
            return count = 0
        },
        set(c: number) {
            return count = c
        }
    }
}

let count = makeCounter2(5)
console.log(`Task 03 объект - ` + count.count)
console.log(`Task 03 increase - ` + count.increase())
console.log(`Task 03 decrease - ` + count.decrease())
console.log(`Task 03 reset - ` + count.reset())
console.log(`Task 03 set 7 - ` + count.set(7))

// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore


function Sum(a: number, b: number, c: number, d: number) {
    return a + b + c + d
}

function curr(f: any) {
    return function curried(...args: number[]) {
        if (args.length >= f.length) {
            return f(...args)
        } else {
            return function (...args2: number[]) {
                return curried(...args, ...args2)
            }
        }

    }
}

let currSum = curr(Sum)

//console.log(`Task 04.1 - ${currSum(0)}`)
console.log(`Task 04.2 - ${currSum(3)(2)(5)(3)}`)
console.log(`Task 04.3 - ${currSum(3)(2)(5, 3)}`)
console.log(`Task 04.4 - ${currSum(3)(2)(5)(3)}`)
console.log(`Task 04.5 - ${currSum(3)(2)(5)(3)}`)
console.log(`Task 04.6 - ${currSum(3)(2)(5)(3)}`)

// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion

//Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
function sumTo(n: number): number {
    if (n < 1) {
        return 0
    } else {
        return n + sumTo(n - 1)
    }
}

console.log(`Task 05 sumTo- ${sumTo(4)}`)

//Факториал натурального числа – это число, умноженное на "себя минус один", затем на "себя минус два", и так далее до 1. Факториал n обозначается как n!
function factorial(n: number): number {
    if (n < 1) {
        return n
    } else {
        return n * factorial(n - 1)
    }
}

console.log(`Task 05 factorial- ${factorial(5)}`)

//Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2. То есть, следующее число получается как сумма двух предыдущих.
// Первые два числа равны 1, затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....
function fib(n: number): number {
    if (n <= 1) {
        return n
    } else {
        return fib(n - 1) + fib(n - 2)
    }

}

console.log(`Task 05 fib - ${fib(7)}`)

//Напишите функцию printList(list), которая выводит элементы списка по одному.
//Сделайте два варианта решения: используя цикл и через рекурсию.
let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

function printList(list: any): any {
    console.log(`Task 05 printList - ` + list.value)
    if (list.next) {
        printList(list.next)
    }
}

printList(list)

function printList2(list: any): any {
    let temp = list
    while (temp) {
        console.log(`Task 05.2 printList2 - ` + temp.value)
        temp = temp.next
    }
}

printList2(list)

//Выведите односвязный список из предыдущего задания в обратном порядке.
//Сделайте два варианта решения: используя цикл и через рекурсию.

function reversePrintList(list: any): any {
    if (list.next) {
        reversePrintList(list.next)
    }
    console.log(`Task 05 reverseList - ` + list.value)
}

reversePrintList(list)

function reversePrintList2(list: any): any {
    let temp = list
    let arr: any = []
    while (temp) {
        arr.push(temp.value)
        temp = temp.next
    }
    arr.reverse()
    console.log(`Task 05.2 printList2 - ` + arr)
}

reversePrintList2(list)

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.

const funcFlat = (arr: any, count: number = 1) => {
    let newArr: any = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]) && count !== 0) {
            count -= 1;
            newArr = [...newArr, ...funcFlat(arr[i], count)]
        } else if (Array.isArray(arr[i]) && count === 0) {
            newArr = [...newArr, funcFlat(arr[i], 0)]
        } else if (arr[i] === undefined) {
        } else {
            newArr = [...newArr, arr[i]]
        }
    }
    return newArr
}
console.log(funcFlat([1, 2, [3, [3.1, 3.2], 4, [5, 6, [7, 8]]]]))
console.log(funcFlat([1, 2, , 4, 5]))
console.log(funcFlat([1, [2, [3, [4]]]], 2))


// just a plug
export default () => {
};