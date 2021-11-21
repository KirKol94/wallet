import React, {useState} from "react";
import onChangeText from "../helpers/onChangeText";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import Categories from "../components/Categories";
import TextField from "@mui/material/TextField";

export default function Accounting(props) {

	const [currentValue, setCurrentValue] = useState(0)

	const [name, setName] = useState('')
	const [showNameInput, setShowNameInput] = useState(false)

	function addNewCategory(id) {
		let newCategory = {
			id, name, count: 0
		}
		props.setCategories([newCategory, ...props.categories])
	}

	return (
		<div className="text-white text-center w-100">

			<h1>{props.pageName} {props.commonCount > 0 ? props.commonCount : null}</h1>

			{props.categories.length !== 0 && <TextField
				onChange={e => {
					if (e.target.value > 0) {
						setCurrentValue(+e.target.value)
					}
				}}
				onBlur={e => {
					e.target.value = ''
				}}
				label={"Вневсти сумму"}
				InputProps={{
					className: "InputLabelClass"
				}}
				InputLabelProps={{
					className: "InputLabelClass"
				}}
				autoFocus={true}
				fullWidth={true}
				type='tel'/>}

			{currentValue > 0 && <h2>{currentValue}₽ в категорию:</h2>}

			<h2>{props.categories.length !== 0 && 'Добавьте в категорию или'}<span onClick={() => {
				setShowNameInput(true)
			}} className='text-info'>создайте {props.categories.length === 0 ? 'новую категорию' : 'новую'}</span></h2>

			{(showNameInput || props.categories.length === 0) && < TextField
				fullWidth={true}
				onChange={e => onChangeText(e, setName)}
				onBlur={(e) => {
					if (e.target.value.trim('')) {
						setShowNameInput(false)
						let id = generateUniqueID()
						addNewCategory(id)
						e.target.value = ''
						setName('')
					} else {
						setShowNameInput(false)
					}
				}}
				label="Название"
				InputProps={{
					className: "InputLabelClass"
				}}
				InputLabelProps={{
					className: "InputLabelClass"
				}}
				autoFocus={true}
				type="text"/>}

			<div className="row mb-5">
				<Categories
					setCommonCount={props.setCommonCount}
					commonCount={props.commonCount}
					setCategories={props.setCategories}
					categories={props.categories}
					setCurrentValue={setCurrentValue}
					currentValue={currentValue}/>
			</div>

		</div>
	)
}