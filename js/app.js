// All Budget Selector 
let addBudget = document.getElementById('add-budget')
let budgetValue = document.getElementById('budget-value')
let budget = document.getElementById('budget')
let balance = document.getElementById('balance')

// call Show 
ShowBudget()
showExpense()

// ============
addBudget.addEventListener('click', () => {
    let getBudgetValue = budgetValue.value
    if (getBudgetValue != "") {
        addLocalStorage(getBudgetValue)
    }
    else {
        alert('Enter Number')
        budgetValue.value = ''
    }
})

// localStorage 
function addLocalStorage(value) {
    let getItem = JSON.parse(localStorage.getItem('budgetObj'))

    let budgetObj = {
        budget: value,
        balance: value,
    }
    if (getItem == null) {

        localStorage.setItem('budgetObj', JSON.stringify(budgetObj))
    }
    else {
        let budgetAdd = Number(getItem.budget) + Number(budgetObj.budget)
        let balanceAdd = Number(getItem.balance) + Number(budgetObj.balance)
        budgetObj = {
            budget: budgetAdd,
            balance: balanceAdd,
        }
        localStorage.setItem('budgetObj', JSON.stringify(budgetObj))

    }
    budgetValue.value = ''
    ShowBudget()

}
// Show from localStorage
function ShowBudget() {
    let budgetObj = JSON.parse(localStorage.getItem('budgetObj'))
    if (budgetObj == null) {
        balanceVal = 0
        budgetVal = 0
    }
    else {
        balanceVal = budgetObj.balance
        budgetVal = budgetObj.budget
    }

    budget.innerText = '$' + budgetVal
    balance.innerText = '$' + balanceVal
}


//===================== Budget //=========================
let expenseTitleName = document.getElementById('expense-title-name')
let expenseValue = document.getElementById('expense-value')
let addExpense = document.getElementById('add-expense')

let expenseTitle = document.getElementById('expense-title')



addExpense.addEventListener('click', () => {
    let getExpenseTitleName = expenseTitleName.value
    let getExpenseValue = expenseValue.value
    if (getExpenseTitleName != "" && getExpenseValue != '') {
        addExpenseLocalStorage(getExpenseTitleName, getExpenseValue)
    }
    else {
        alert('Enter Number')
        expenseTitleName.value = ''
        expenseValue.value = ''
    }
})


function addExpenseLocalStorage(ExpenseTile, ExpenseValue) {

    let getItem = JSON.parse(localStorage.getItem('ExpenseObj'))
    let getCost = Number(localStorage.getItem('cost'))
    let getBudgetObj = JSON.parse(localStorage.getItem('budgetObj'))
    let getBalance = Number(getBudgetObj.balance) - ExpenseValue
    let BudgetObj = {
        budget: getBudgetObj.budget,
        balance: getBalance,
    }
    console.log(BudgetObj);

    let ExpenseObj = [
        {
            key: Math.floor(Math.random() * 1000000000000000),
            ExpenseName: ExpenseTile,
            ExpenseValue: ExpenseValue,
        }
    ]
    if (getItem == null) {

        localStorage.setItem('ExpenseObj', JSON.stringify(ExpenseObj))
        localStorage.setItem('cost', ExpenseValue);
        localStorage.setItem('budgetObj', JSON.stringify(BudgetObj));
        location.reload()

    }
    else {
        getItem.push(ExpenseObj[0])
        getCost = getCost + Number(ExpenseObj[0].ExpenseValue)

        localStorage.setItem('ExpenseObj', JSON.stringify(getItem))
        localStorage.setItem('cost', getCost)
        localStorage.setItem('budgetObj', JSON.stringify(BudgetObj));
        location.reload()

    }
    expenseTitleName.value = ''
    expenseValue.value = ''

    showExpense()


}

function showExpense() {
    let ExpenseObj = JSON.parse(localStorage.getItem('ExpenseObj'))
    let cost = localStorage.getItem('cost')
    if (ExpenseObj == null) {
        return
    }
    else {
        let expense = document.getElementById('expenses')
        expense.innerText = '$' + cost
        let html = ''

        ExpenseObj.forEach(Expense => {
            html += `   <tr>
       <td><h4 id="expense-title">${Expense.ExpenseName}</h4></td>
       <td><h4 id="expense">${Expense.ExpenseValue}</h4></td>
       <td><button onclick="deleteItem(${Expense.key})">Delete</button></td>
   </tr>
       `
        });
        let expenseComplete = document.querySelector('.expenseComplete')
        expenseComplete.innerHTML = html

    }


}

// Delete 
function deleteItem(key) {
    let getItem = JSON.parse(localStorage.getItem('ExpenseObj'))
    let getBudgetObject = JSON.parse(localStorage.getItem('budgetObj'))
    let getBudget = Number(getBudgetObject.budget)

    let deletedItem = getItem.filter(item => {

        return item.key != key
    })
    let costing = 0;
    deletedItem.forEach(el => {
        costing += Number(el.ExpenseValue)

    })
    let getCurrentBalance = getBudget - costing
    let makeNweBudgetObj = {
        budget: getBudget,
        balance: getCurrentBalance
    }
    console.log(makeNweBudgetObj);
    localStorage.setItem('ExpenseObj', JSON.stringify(deletedItem))
    localStorage.setItem('cost', costing)
    localStorage.setItem('budgetObj', JSON.stringify(makeNweBudgetObj))
    location.reload()
}

// Clear All Data 

function clearStorage() {
  localStorage.clear()
  location.reload()
}