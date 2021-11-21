import React, {useState} from 'react'
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

export default function Categories(props) {

	const [showSettings, setShowSetting] = useState(false)
	const [selectedCategoryId, setSelectedCategoryId] = useState(null)

	function addToCommonCount() {
		props.setCommonCount(+props.commonCount + +props.currentValue)
	}

	function addToSelectedCategory(selectedId, selectedCount, selectedName) {
		let editedCategory = {
			name: selectedName,
			count: selectedCount + +props.currentValue,
			id: generateUniqueID()
		}

		props.setCategories([editedCategory, ...props.categories.filter(i => i.id !== selectedId)])
	}

	function deleteCategory(selectedId, selectedCount) {
		if (window.confirm('Удалить категорию?')) {
			props.setCommonCount(+props.commonCount - selectedCount)
			props.setCategories([...props.categories].filter(i => i.id !== selectedId))
		} else {
			setShowSetting(false)
		}
	}

	function editNameCategory(selectedId, selectedCount, SelectedName) {
		let newName = window.prompt('Новое название категории')
		let editedCategory = {
			name: newName ? newName : SelectedName,
			count: selectedCount,
			id: generateUniqueID()
		}

		props.setCategories([editedCategory, ...props.categories.filter(i => i.id !== selectedId)])
	}

	return <>
		{props.categories.sort((a, b) => a.count - b.count).reverse().map(e => {
			return (
				<div key={e.id} className="col-12 col-lg-4 m-2 bg-dark"
						 onClick={() => {
							 setSelectedCategoryId(e.id)
							 if (!props.currentValue) {
								 setShowSetting(prevState => !prevState)
							 } else {
								 addToSelectedCategory(e.id, e.count, e.name)
								 addToCommonCount()
								 props.setCurrentValue(0)
							 }
						 }}>
					<div style={{display: 'flex', justifyContent: 'space-between', margin: '16px 0'}}>
						<h2>{e.name}</h2>
						<h2>{e.count}</h2>
					</div>

					{(showSettings && selectedCategoryId === e.id) && <div>
						<div className="w-100 mb-3">
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
	</>
}