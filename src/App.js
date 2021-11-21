import React from "react";
import Accounting from "./pages/Accounting";
import useLocalStorage from "./helpers/useLocalStorage";


export const App = () => {

	const [incomeCount, setIncomeCount] = useLocalStorage('incomeCount', 0)
	const [incomeCategories, setIncomeCategories] = useLocalStorage('incomeCategories', [])

	const [expenseCount, setExpenseCount] = useLocalStorage('expenseCount', 0)
	const [expenseCategories, setExpenseCategories] = useLocalStorage('expenseCategories', [])

	return (

		<div className="container-fluid bg-dark bg-gradient text-white min-vh-100 vw-100">
			<div className="container min-vh-100">

				<Accounting pageName="Доход"
										categories={incomeCategories}
										setCategories={setIncomeCategories}
										commonCount={incomeCount}
										setCommonCount={setIncomeCount}/>

				<Accounting pageName="Расход"
										categories={expenseCategories}
										setCategories={setExpenseCategories}
										commonCount={expenseCount}
										setCommonCount={setExpenseCount}/>


			</div>
		</div>
	)
}