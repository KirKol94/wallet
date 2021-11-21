import React, {useState} from "react";
import maTextChange from "../helpers/onChangeText";
import onChangeText from "../helpers/onChangeText";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export default function Accounting(props) {

	const [currentValue, setCurrentValue] = useState(0)

	const [name, setName] = useState('')
	const [showNameInput, setShowNameInput] = useState(false)
	const [showSettings, setShowSetting] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState(null)

	const inputStyle = {
		margin: '8px 0',
		padding: '16px',
		width: '100%',
		borderRadius: '8px'
	}

	function addToCommonCount() {
		props.setCommonCount(+props.commonCount + +currentValue)
	}

	function addNewCategory(id) {
		let newCategory = {
			id, name, count: 0
		}
		props.setCategories([newCategory, ...props.categories])
	}

	function addToSelectedCategory(selectedId, selectedCount, selectedName) {
		let editedCategoty = {
			name: selectedName,
			count: selectedCount + +currentValue,
			id: generateUniqueID()
		}

		props.setCategories([editedCategoty, ...props.categories.filter(i => i.id !== selectedId)])
	}

	function deleteCategory(selectedId, selectedCount) {
		if (window.confirm('Удалить категорию?')) {
			props.setCommonCount(+props.commonCount - +selectedCount)
			props.setCategories([...props.categories].filter(i => i.id !== selectedId))
		} else {
			setShowSetting(false)
		}
	}

	function editNameCategory(selectedId, selectedCount, SelectedName) {
		let newName = window.prompt('Новое название категории')
		let editedCategoty = {
			name: newName ? newName : SelectedName,
			count: selectedCount,
			id: generateUniqueID()
		}

		props.setCategories([editedCategoty, ...props.categories.filter(i => i.id !== selectedId)])
	}

	return (
		<div className="text-white text-center">

			<h1>{props.pageName} {props.commonCount > 0 ? ":" + props.commonCount : null}</h1>

			<input
				onChange={e => maTextChange(e, setCurrentValue)}
				onBlur={(e) => {
					e.target.value = ''
				}}
				placeholder="Внести в доход"
				// autoFocus={true}
				style={inputStyle}
				type='tel'/>

			{currentValue > 0 && <h2>{currentValue}₽ в категорию:</h2>}

			<h2>Добавьте в категорию или <span onClick={() => {
				setShowNameInput(true)
			}} className='text-info'>создайте новую</span></h2>

			{showNameInput && <input
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
				placeholder="Новая категория"
				autoFocus={true}
				style={inputStyle}
				type="text"/>}

			<div className="row mb-5">
				{props.categories.sort((a, b) => a.count - b.count).reverse().map(e => {
					return (
						<div key={e.id} className="col-sm-6 col-lg-4 mt-2 bg-dark"
								 onClick={() => {
									 setSelectedCategoryId(e.id)
									 if (currentValue !== 0) {
										 addToSelectedCategory(e.id, e.count, e.name)
										 addToCommonCount()
										 setCurrentValue(0)
									 } else {
										 setShowSetting(prevState => !prevState)
									 }
								 }}>
							<h2>{e.name}</h2>
							<h2>{e.count}</h2>

							{(showSettings && selectedCategoryId === e.id) && <div>
								<div className="w-100 mb-2">
									<button className="btn btn-primary w-50"
													onClick={() => {
														editNameCategory(e.id, e.count, e.name)
													}}>
										изменить
									</button>
									<button className="btn btn-outline-danger w-50"
													onClick={() => deleteCategory(e.id, e.count)}>
										удалить
									</button>
								</div>

							</div>}

						</div>
					)
				})}
			</div>

		</div>
	)
}