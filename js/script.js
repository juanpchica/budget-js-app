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
  }

  totalExpenses() {
    return 400;
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
  });

  expenseList.addEventListener("click", function () {});
}

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
