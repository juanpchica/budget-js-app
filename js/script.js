class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  submitBudgetForm() {
    const value = this.budgetInput.value;

    if (value <= 0 || value === "") {
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`;
      setTimeout(() => {
        this.budgetFeedback.classList.remove("showItem");
      }, 3000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = "";
      this.showBalance();
    }
  }

  showBalance() {
    const expenses = this.totalExpenses();
    const totalBalance = parseInt(this.budgetAmount.textContent) - expenses;
    this.balanceAmount.textContent = totalBalance;

    if (totalBalance < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    } else if (totalBalance > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    } else if (totalBalance == 0) {
      this.balance.classList.remove("showRed", "showGreen");
      this.balance.classList.add("showBlack");
    }
  }

  submitExpenseForm() {
    const valueExpenseInput = this.expenseInput.value;
    const valueExpenseAmount = this.amountInput.value;

    if (
      valueExpenseAmount <= 0 ||
      valueExpenseInput === "" ||
      valueExpenseAmount === ""
    ) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`;
      setTimeout(() => {
        this.expenseFeedback.classList.remove("showItem");
      }, 3000);
    } else {
      let amount = parseInt(valueExpenseAmount);
      this.expenseInput.value = "";
      this.amountInput.value = "";

      const newExpense = {
        ID: this.itemID,
        title: valueExpenseInput,
        amount: amount,
      };

      this.itemID++;
      this.itemList.push(newExpense);

      this.addExpense(newExpense);
      this.showBalance();
    }
  }

  totalExpenses() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, crr) => {
        acc += crr.amount;
        return acc;
      }, 0);
    }

    this.expenseAmount.textContent = total;
    return total;
  }

  addExpense(expense) {
    const tr = document.createElement("tr");
    tr.classList.add("expense-item");
    tr.innerHTML = `
                    <td><h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6></td>
                    <td><h5 class="expense-amount mb-0 list-item">${expense.amount}</h5></td>
                    <td>
                        <div class="expense-icons list-item">
                            <a href="#" class="edit-icon mx-2" data-id="${expense.ID}">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="#" class="delete-icon" data-id="${expense.ID}">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </td>`;
    this.expenseList.appendChild(tr);
  }

  editExpense(e) {
    const id = parseInt(e.dataset.id);

    //Remove element from DOM
    let parent = e.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);

    const expense = this.itemList.filter((expense) => {
      return expense.ID === id;
    });

    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    const newItemList = this.itemList.filter(function (expense) {
      return expense.ID !== id;
    });

    this.itemList = newItemList;
    this.showBalance();
  }

  deleteExpense(e) {
    const id = parseInt(e.dataset.id);

    //Remove element from DOM
    let parent = e.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);

    const newItemList = this.itemList.filter(function (expense) {
      return expense.ID !== id;
    });

    this.itemList = newItemList;
    this.showBalance();
  }
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  //Instance of UI Class
  const ui = new UI();
  console.log(ui);

  budgetForm.addEventListener("submit", function (e) {
    e.preventDefault();
    ui.submitBudgetForm();
  });

  expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    ui.submitExpenseForm();
  });

  expenseList.addEventListener("click", function (e) {
    if (e.target.parentElement.classList.contains("edit-icon")) {
      ui.editExpense(e.target.parentElement);
    } else if (e.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(e.target.parentElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
