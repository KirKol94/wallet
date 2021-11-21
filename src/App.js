import React, {useState} from "react";
import Accounting from "./pages/Accounting";
import useLocalStorage from "./helpers/useLocalStorage";
import SimpleBottomNavigation from "./components/SimpleBottomNavigator";
import CommonPage from "./pages/CommonPage";


export const App = () => {

	const [incomeCount, setIncomeCount] = useLocalStorage('incomeCount', 0)
	const [incomeCategories, setIncomeCategories] = useLocalStorage('incomeCategories', [])
	const [showIncome, setShowIncome] = useState(false)

	const [expenseCount, setExpenseCount] = useLocalStorage('expenseCount', 0)
	const [expenseCategories, setExpenseCategories] = useLocalStorage('expenseCategories', [])
	const [showExpense, setShowExpense] = useState(false)

	const [showCommonPage, setShowCommonPage] = useState(true)

	return (

		<div className="container-fluid bg-dark bg-gradient text-white min-vh-100 vw-100">
			<div className="container min-vh-100">

				{showIncome && <Accounting pageName="Доход"
																	 categories={incomeCategories}
																	 setCategories={setIncomeCategories}
																	 commonCount={incomeCount}
																	 setCommonCount={setIncomeCount}/>}

				{showExpense && <Accounting pageName="Расход"
																		categories={expenseCategories}
																		setCategories={setExpenseCategories}
																		commonCount={expenseCount}
																		setCommonCount={setExpenseCount}/>}

				{showCommonPage && <CommonPage incomeCount={incomeCount}
																			 expenseCount={expenseCount}/>}

				<SimpleBottomNavigation setShowCommonPage={setShowCommonPage}
																setShowIncome={setShowIncome}
																setShowExpense={setShowExpense}/>

			</div>
		</div>
	)
}